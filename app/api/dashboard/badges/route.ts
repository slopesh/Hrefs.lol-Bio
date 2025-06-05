import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        badges: true,
        links: true,
        analytics: {
          take: 1000, // Get last 1000 analytics entries
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate achievements based on user activity
    const achievements = {
      totalViews: user.analytics.filter(a => a.type === 'view').length,
      totalClicks: user.analytics.filter(a => a.type === 'click').length,
      totalLinks: user.links.length,
      isVerified: user.isVerified,
      isFeatured: user.isFeatured,
      daysActive: Math.floor((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    };

    // Get premium status based on payment history
    const premiumStatus = await prisma.payment.findFirst({
      where: {
        userId: user.id,
        status: 'COMPLETED',
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)) // Last 30 days
        }
      }
    });

    return NextResponse.json({
      badges: user.badges,
      achievements,
      isPremium: !!premiumStatus,
      premiumExpiresAt: premiumStatus ? new Date(premiumStatus.createdAt.getTime() + 30 * 24 * 60 * 60 * 1000) : null
    });
  } catch (error) {
    console.error('Error fetching badges and achievements:', error);
    return NextResponse.json({ error: 'Failed to fetch badges and achievements' }, { status: 500 });
  }
} 