import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface MonthlyTransactionData {
  month: string;
  volume: number;
}

export async function GET(request: Request) {
  try {
    // Calculate the date 12 months ago from the start of the current month
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setDate(1); // Set to the first day of the current month
    twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1); // Subtract 1 year
    twelveMonthsAgo.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    // Fetch payments within the last 12 months
    const payments = await prisma.payment.findMany({
      where: {
        createdAt: {
          gte: twelveMonthsAgo,
        },
        status: 'COMPLETED', // Assuming only completed payments count as transactions
      },
      select: {
        amount: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Aggregate payments by month
    const monthlyDataMap = new Map<string, number>();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    payments.forEach(payment => {
      const date = new Date(payment.createdAt);
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;

      const currentVolume = monthlyDataMap.get(monthYear) || 0;
      monthlyDataMap.set(monthYear, currentVolume + payment.amount);
    });

    // Generate data for the last 12 months, including months with no transactions
    const transactionData: MonthlyTransactionData[] = [];
    let currentDate = new Date(twelveMonthsAgo);

    for (let i = 0; i < 12; i++) {
        const month = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();
        const monthYear = `${month} ${year}`;
        const volume = monthlyDataMap.get(monthYear) || 0;
        transactionData.push({ month: monthYear, volume });

        // Move to the next month
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return NextResponse.json(transactionData);
  } catch (error) {
    console.error('Error fetching monthly transaction overview:', error);
    return NextResponse.json({ error: 'Failed to fetch transaction overview data' }, { status: 500 });
  }
} 