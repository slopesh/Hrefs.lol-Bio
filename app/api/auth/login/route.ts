import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs'; // Assuming bcryptjs is installed for password comparison
import { z } from 'zod'; // Assuming zod is installed for validation

const prisma = new PrismaClient();

// Define a schema for validating the request body
const loginSchema = z.object({
  identifier: z.string().min(1, 'Username or email is required'), // Can be username or email
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body using the schema
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ message: 'Invalid input', errors: validationResult.error.errors }, { status: 400 });
    }

    const { identifier, password } = validationResult.data;

    // 1. Find the user by username or email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier },
        ],
      },
    });

    // If user not found
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // 2. Compare the provided password with the hashed password in the database
    const passwordMatch = await compare(password, user.password);

    // If passwords don't match
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // TODO: Implement session management or token generation here
    // For now, returning a success message and basic user info

    // Return success response (excluding sensitive data)
    return NextResponse.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    // In a production environment, avoid sending detailed error info to the client
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 