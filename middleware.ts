import { NextResponse, NextRequest } from 'next/server'

// Public pages that don't require authentication
const publicPages = ['/Login', '/Register']

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // If it's a public page, allow access
  if (publicPages.some(page => path.startsWith(page))) {
    return NextResponse.next()
  }

  // Check all possible token locations
  const hasToken =
    request.cookies.has('__Secure-next-auth.session-token') ||
    request.cookies.has('next-auth.session-token') ||
    request.cookies.has('_vercel_jwt')

  if (!hasToken) {
    const response = NextResponse.redirect(new URL('/Login', request.url))

    // Clear possible auth cookies
    ;['next-auth.session-token', '__Secure-next-auth.session-token', '_vercel_jwt'].forEach(
    cookieName => {
        response.cookies.delete(cookieName)
        response.cookies.set(cookieName, '', {
        path: '/',
        expires: new Date(0),
        maxAge: 0,
        })
    }
    )

    response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
    )
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')

    return response
}

const response = NextResponse.next()
response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
)
response.headers.set('Pragma', 'no-cache')
response.headers.set('Expires', '0')

return response
}

export const config = {
matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
