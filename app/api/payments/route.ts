import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPayment, checkPaymentStatus } from '@/lib/cryptomus';
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

// Handle POST requests to create a new payment
export async function POST(request: Request) {
  try {
    const session = await NextAuth(authOptions).auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { amount, currency = 'USD' } = body;

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    const payment = await createPayment({
      amount,
      currency,
      userId: session.user.id,
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}

// Handle GET requests to check payment status
export async function GET(request: Request) {
  try {
    const session = await NextAuth(authOptions).auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    const status = await checkPaymentStatus(paymentId);
    return NextResponse.json(status);
  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
} 