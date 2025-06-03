import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { z } from 'zod'

const prisma = new PrismaClient()

const registerSchema = z.object({
  username: z.string().min(3, 'Username is too short').max(50, 'Username is too long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  inviteCode: z.string().min(1, 'Invite code is required'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the request body using the schema
    const validationResult = registerSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({ message: 'Invalid input', errors: validationResult.error.errors }, { status: 400 })
    }

    const { username, email, password, inviteCode } = validationResult.data

    // 1. Validate the invite code
    const foundInviteCode = await prisma.inviteCode.findUnique({
      where: {
        code: inviteCode,
      },
    })

    if (!foundInviteCode) {
      return NextResponse.json({ message: 'Invalid invite code' }, { status: 400 })
    }

    if (foundInviteCode.isUsed) {
      return NextResponse.json({ message: 'Invite code already used' }, { status: 400 })
    }

    // Optional: Check if invite code is expired
    if (foundInviteCode.expiresAt && new Date() > foundInviteCode.expiresAt) {
      return NextResponse.json({ message: 'Invite code expired' }, { status: 400 })
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json({ message: 'User with this email or username already exists' }, { status: 409 })
    }

    // 3. Hash the password
    const hashedPassword = await hash(password, 10) // 10 is the salt rounds

    // 4. Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        usedInviteCode: {
          connect: { id: foundInviteCode.id }
        }
      },
    })

    // 5. Mark the invite code as used
    await prisma.inviteCode.update({
      where: {
        id: foundInviteCode.id
      },
      data: {
        isUsed: true,
        usedById: newUser.id // Link the invite code to the new user
      }
    })

    // Return success response (excluding sensitive data like password hash)
    return NextResponse.json({ message: 'Registration successful', user: { id: newUser.id, username: newUser.username, email: newUser.email } }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    // In a production environment, avoid sending detailed error info to the client
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

// You can also add other HTTP methods like GET, PUT, DELETE if needed for this route
// export async function GET(request: Request) {} 