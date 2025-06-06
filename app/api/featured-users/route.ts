import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const featuredUsers = await prisma.user.findMany({
      where: {
        isFeatured: true,
      },
      select: {
        id: true,
        username: true,
        avatar: true,
      },
    });

    return NextResponse.json(featuredUsers, { status: 200 });
  } catch (error) {
    console.error('Error fetching featured users:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 