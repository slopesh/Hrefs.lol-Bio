import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to calculate percentage change
function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) {
    return current > 0 ? 100 : 0; // If previous was 0 and current is > 0, it's a 100% increase (or more, but 100 is a reasonable representation). If current is also 0, change is 0.
  }
  const change = ((current - previous) / previous) * 100;
  return parseFloat(change.toFixed(2)); // Round to 2 decimal places
}

export async function GET(request: Request) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const lastWeek = new Date(today); // Start of today, a week ago
    lastWeek.setDate(today.getDate() - 7);

    // Fetch current stats
    const totalUsers = await prisma.user.count();

    const newUsersToday = await prisma.user.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    const transactionsTodayResult = await prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: today,
        },
      },
    });
    const transactionsToday = transactionsTodayResult._sum.amount || 0;

    // Fetch previous period stats
    const newUsersYesterday = await prisma.user.count({
      where: {
        createdAt: {
          gte: yesterday,
          lt: today,
        },
      },
    });

    const transactionsYesterdayResult = await prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: yesterday,
          lt: today,
        },
      },
    });
    const transactionsYesterday = transactionsYesterdayResult._sum.amount || 0;

    const totalUsersLastWeek = await prisma.user.count({
      where: {
        createdAt: {
          lt: lastWeek // Count users created before the start of last week
        },
      },
    });

    // Fetch non-users today (users without any payments ever)
    const usersWithPaymentsToday = await prisma.payment.findMany({
      select: {
        userId: true
      },
      distinct: ['userId']
    });
    const userIdsWithPaymentsToday = usersWithPaymentsToday.map((payment) => payment.userId);

    const nonUsersToday = await prisma.user.count({
      where: {
        id: {
          notIn: userIdsWithPaymentsToday
        }
      },
    });

    // Fetch non-users yesterday (users without any payments up to the end of yesterday)
    const usersWithPaymentsYesterday = await prisma.payment.findMany({
      select: {
        userId: true
      },
      distinct: ['userId'],
      where: {
        createdAt: {
          lt: today // Payments created before the start of today (i.e., up to the end of yesterday)
        }
      }
    });
    const userIdsWithPaymentsYesterday = usersWithPaymentsYesterday.map((payment) => payment.userId);

    const nonUsersYesterday = await prisma.user.count({
      where: {
        id: {
          notIn: userIdsWithPaymentsYesterday
        }
      },
    });

    // Calculate percentage changes
    const newUsersPercentageChange = calculatePercentageChange(newUsersToday, newUsersYesterday);
    const totalUsersPercentageChange = calculatePercentageChange(totalUsers, totalUsersLastWeek);
    const transactionsPercentageChange = calculatePercentageChange(transactionsToday, transactionsYesterday);
    const nonUsersPercentageChange = calculatePercentageChange(nonUsersToday, nonUsersYesterday);

    const stats = {
      newUsersToday,
      totalUsers,
      transactionsToday,
      nonUsers: nonUsersToday, // Return today's non-users
      newUsersPercentageChange,
      totalUsersPercentageChange,
      transactionsPercentageChange,
      nonUsersPercentageChange,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard statistics' }, { status: 500 });
  }
} 