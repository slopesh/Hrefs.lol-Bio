import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// This would typically come from your database
const VALID_INVITE_CODES = ['V0-PREMIUM', 'EARLY-ACCESS'];

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { inviteCode } = await req.json();

    if (!inviteCode) {
      return new NextResponse('Invite code is required', { status: 400 });
    }

    const isValidCode = VALID_INVITE_CODES.includes(inviteCode);
    if (!isValidCode) {
      return new NextResponse('Invalid invite code', { status: 400 });
    }

    // Here you would typically:
    // 1. Update the user's record in your database
    // 2. Mark the invite code as used
    // 3. Set up any premium features/access

    return NextResponse.json({ 
      success: true,
      message: 'Invite code verified successfully'
    });
  } catch (error) {
    console.error('Error verifying invite code:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 