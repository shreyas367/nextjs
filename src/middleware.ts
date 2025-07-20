import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const url = request.nextUrl;

  const isAuthRoute =
    url.pathname === '/' ||
    url.pathname.startsWith('/sign-in') ||
    url.pathname.startsWith('/sign-up') ||
    url.pathname.startsWith('/verify');

  // if (token && isAuthRoute) {
  //   // Logged-in users shouldn't see auth pages
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  if (!token && url.pathname.startsWith('/dashboard')) {
    // Redirect unauthenticated users away from dashboard
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/verify/:path*',
    '/dashboard/:path*',
  ]
};
