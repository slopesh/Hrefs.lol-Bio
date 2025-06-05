import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Add paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/api/auth',
  '/examples',
  '/_next',
  '/favicon.ico',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Check if the path is a public profile
  if (pathname.match(/^\/[^/]+$/)) {
    return NextResponse.next()
  }

  // Get the token
  const token = await getToken({ req: request })

  // Redirect to login if no token
  if (!token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  // Check if user is suspended
  if (token.isSuspended) {
    return NextResponse.redirect(new URL('/suspended', request.url))
  }

  // Allow access to admin routes only for admins
  if (pathname.startsWith('/admin') && !token.isAdmin) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const isDashboardRoute = pathname.startsWith('/dashboard')

  if (isDashboardRoute) {
    // Check if user has valid invite code
    const hasValidInvite = token.inviteCode && token.inviteCodeVerified
    if (!hasValidInvite) {
      return NextResponse.redirect(new URL('/auth/invite', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 