import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RecentTransaction {
  id: string;
  userName: string;
  date: string; // Or Date type if preferred
  amount: number;
  type: 'credit' | 'debit'; // Or other relevant types
  userInitial: string; // Or a field for user avatar/icon
}

export async function GET(request: Request) {
  try {
    // Fetch recent payments, including related user data
    const payments = await prisma.payment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 5, // Limit to the 5 most recent transactions
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    // Map Prisma payments to RecentTransaction interface
    const recentTransactions: RecentTransaction[] = payments.map(payment => ({
      id: payment.id,
      userName: payment.user.username || 'N/A', // Use username, fallback to N/A
      date: payment.createdAt.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      amount: payment.amount,
      type: payment.amount >= 0 ? 'credit' : 'debit', // Determine type based on amount
      userInitial: payment.user.username ? payment.user.username.charAt(0).toUpperCase() : '-', // Get the first letter of username
    }));

    return NextResponse.json(recentTransactions);
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch recent transactions' }, { status: 500 });
  }
} 