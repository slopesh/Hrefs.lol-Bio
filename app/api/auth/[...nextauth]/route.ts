import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma"; // Import the shared prisma client instance

// Explicitly type the AuthOptions based on next-auth v5
import type { AuthOptions } from "next-auth";
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null; // No credentials provided
        }

        const { identifier, password } = credentials;

        // Find the user by username or email
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: identifier },
              { username: identifier },
            ],
          },
        });

        // If user not found or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          return null; // Indicate authentication failure
        }

        // Return user object on success with necessary fields including username
        // This object is used to create the session and JWT
        return { id: user.id, name: user.username, email: user.email, username: user.username };
      }
    })
  ],
  session: {
    strategy: "jwt", // Using JWT for session management
  },
  pages: {
    signIn: '/login', // Specify our custom login page
    error: '/login', // Redirect to login page on errors
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // User object is available the first time the JWT callback is called on sign in
        token.id = user.id; // Assign id from the authenticated user
        token.username = user.username; // Assign username from the authenticated user
        
        // Fetch the user from the database to get the isAdmin field
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id as string },
          select: { isAdmin: true },
        });

        if (dbUser) {
          token.isAdmin = dbUser.isAdmin; // Add isAdmin to the token
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Session is created from the JWT token
      // Ensure session.user exists and assign properties from the token
      if (token && session.user) {
         session.user.id = token.id; // Assign id from the token
         session.user.username = token.username; // Assign username from the token
      }
      return session;
    },
  },
};

// The route handler for Next.js App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };