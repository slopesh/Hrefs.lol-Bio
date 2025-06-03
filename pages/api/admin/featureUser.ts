import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Get the user session
  const session = await getSession({ req });

  // Check if the user is authenticated and is an admin
  if (!session || !session.user || !(session.user as any).isAdmin) {
    return res.status(403).json({ message: 'Forbidden - Not an administrator' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isFeatured: true,
      },
    });
    res.status(200).json({ message: 'User featured successfully', user: updatedUser });
  } catch (error) {
    console.error('Error featuring user:', error);
    res.status(500).json({ message: 'Failed to feature user' });
  }
} 