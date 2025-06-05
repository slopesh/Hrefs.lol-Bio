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
        links: {
          where: {
            isActive: true
          },
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Group links by type (social media, website, etc.)
    const connections = {
      social: user.links.filter(link => 
        link.url.includes('twitter.com') || 
        link.url.includes('instagram.com') || 
        link.url.includes('linkedin.com') ||
        link.url.includes('github.com')
      ),
      websites: user.links.filter(link => 
        !link.url.includes('twitter.com') && 
        !link.url.includes('instagram.com') && 
        !link.url.includes('linkedin.com') &&
        !link.url.includes('github.com')
      ),
      total: user.links.length
    };

    return NextResponse.json(connections);
  } catch (error) {
    console.error('Error fetching connections:', error);
    return NextResponse.json({ error: 'Failed to fetch connections' }, { status: 500 });
  }
} 