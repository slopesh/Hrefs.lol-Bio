import type { NextApiRequest, NextApiResponse } from 'next';
import { generateInviteCode } from '../../../lib/inviteCode';
import { sendInviteCodesEmail } from '../../../lib/sendInviteEmail';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, quantity = 1, codeOptions = {}, userId, amount, currency, paymentMethodId, transactionId } = req.body; // Assuming these are sent after payment confirmation

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (quantity < 1 || quantity > 10) {
    return res.status(400).json({ error: 'Quantity must be between 1 and 10' });
  }

  // TODO: Implement actual payment gateway integration here.
  // This part of the code should only run AFTER a successful payment is confirmed by your payment provider.
  // You would typically verify the payment details with the payment gateway.

  try {
    // Assuming payment was successful, record the transaction
    const payment = await prisma.payment.create({
      data: {
        userId: userId, // Make sure userId is available from your payment confirmation process
        amount: amount, // Make sure amount is available
        currency: currency, // Make sure currency is available
        status: 'COMPLETED', // Set status to completed upon successful payment confirmation
        paymentMethodId: paymentMethodId, // Make sure paymentMethodId is available
        transactionId: transactionId, // Optional: store the gateway's transaction ID
        metadata: { // Optional: store any relevant payment details
          email: email,
          quantity: quantity,
          // Add other payment gateway specific metadata here
        },
        history: {
          create: [
            {
              status: 'COMPLETED',
              message: 'Payment confirmed and processed.',
            },
          ],
        },
      },
    });

    console.log(`Recorded payment ${payment.id} for user ${userId}`);

    // Generate and send invite codes after successful payment recording
    const codes = Array.from({ length: quantity }, () =>
      generateInviteCode({ uses: 1, ...codeOptions, createdById: userId }) // Link generated codes to the user
    );

    // Create the invite codes in the database and link them to the payment and user
    await prisma.inviteCode.createMany({
      data: codes.map(code => ({
        code: code,
        createdById: userId,
        // Link to the payment? Add a paymentId field to InviteCode if needed
      })),
    });

    await sendInviteCodesEmail({ to: email, codes, quantity });

    return res.status(200).json({ success: true, codes });
  } catch (err) {
    console.error('Error processing invite code purchase and payment:', err);
    // In case of error *after* payment confirmation but during recording/code generation,
    // you might need a separate process to handle reconciliation or refund.
    return res.status(500).json({ error: 'Failed to process purchase and record payment' });
  }
} 