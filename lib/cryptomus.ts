import { config } from './config';
import { prisma } from '@/lib/prisma';
import { PaymentStatus, PaymentType } from '@prisma/client';

// Example function to create a payment
export async function createPayment(userId: string, amount: number, currency: string) {
  try {
    // Create a payment method if it doesn't exist
    let paymentMethod = await prisma.paymentMethod.findFirst({
      where: {
        userId,
        type: PaymentType.CRYPTO,
        isActive: true
      }
    });

    if (!paymentMethod) {
      paymentMethod = await prisma.paymentMethod.create({
        data: {
          userId,
          type: PaymentType.CRYPTO,
          name: 'Cryptomus Wallet',
          details: {
            merchantId: config.cryptomus.merchantId
          }
        }
      });
    }

    // Create the payment record
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount,
        currency,
        status: PaymentStatus.PENDING,
        paymentMethodId: paymentMethod.id,
        metadata: {
          merchantId: config.cryptomus.merchantId
        }
      }
    });

    // Here you would use the Cryptomus SDK to create the actual payment
    // This is just an example structure
    const paymentData = {
      amount,
      currency,
      merchantId: config.cryptomus.merchantId,
      paymentId: payment.id
    };

    // Create initial payment history
    await prisma.paymentHistory.create({
      data: {
        paymentId: payment.id,
        status: PaymentStatus.PENDING,
        message: 'Payment initiated'
      }
    });
    
    return {
      success: true,
      message: 'Payment created successfully',
      data: {
        ...paymentData,
        paymentId: payment.id
      }
    };
  } catch (error) {
    console.error('Error creating payment:', error);
    return {
      success: false,
      message: 'Failed to create payment',
      error
    };
  }
}

// Example function to check payment status
export async function checkPaymentStatus(paymentId: string) {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        history: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    if (!payment) {
      return {
        success: false,
        message: 'Payment not found'
      };
    }

    // Here you would use the Cryptomus SDK to check the actual payment status
    // This is just an example structure
    const currentStatus = payment.history[0]?.status || payment.status;

    return {
      success: true,
      status: currentStatus,
      paymentId: payment.id,
      amount: payment.amount,
      currency: payment.currency
    };
  } catch (error) {
    console.error('Error checking payment status:', error);
    return {
      success: false,
      message: 'Failed to check payment status',
      error
    };
  }
}

// Function to update payment status
export async function updatePaymentStatus(paymentId: string, status: PaymentStatus, message?: string) {
  try {
    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status,
        history: {
          create: {
            status,
            message
          }
        }
      }
    });

    return {
      success: true,
      payment
    };
  } catch (error) {
    console.error('Error updating payment status:', error);
    return {
      success: false,
      message: 'Failed to update payment status',
      error
    };
  }
} 