import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const email = req.cookies.get('email')?.value ?? null

  // Redirect root path to /dashboard if logged in, otherwise to /login
  if (pathname === '/') {
    const url = req.nextUrl.clone()
    url.pathname = email ? '/dashboard' : '/login'
    return NextResponse.redirect(url)
  }

  // Redirect logged-in users away from login page
  if (pathname.startsWith('/login')) {
    if (email) {
      const url = req.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Protect routes like /dashboard and /properties
  const protectedRoutes = ['/dashboard', '/properties']
  if (protectedRoutes.some(path => pathname.startsWith(path))) {
    if (!email) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  // Run middleware for app routes (excluding Next internals and static files)
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|eot)).*)',
  ],
}

