import { NextResponse, NextRequest } from 'next/server'

// Public pages that don't require authentication
const publicPages = ['/Login', '/Register']

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    
    // If it's a public page, allow access
    if (publicPages.some(page => path.startsWith(page))) {
        return NextResponse.next()
    }

    // Check all possible token locations
    const hasToken = request.cookies.has("__Secure-next-auth.session-token") ||
                    request.cookies.has("next-auth.session-token") ||
                    request.cookies.has("_vercel_jwt")

    // For all protected routes, verify token exists
    if (!hasToken) {
        // Create response with redirect
        const response = NextResponse.redirect(new URL('/Login', request.url))
        
        // Ensure all auth cookies are cleared
        const cookiesToClear = [
            'next-auth.session-token',
            '__Secure-next-auth.session-token',
            '_vercel_jwt',
        ]
        
        cookiesToClear.forEach(cookieName => {
            // Delete cookie with default options
            response.cookies.delete(cookieName)
            
            // Delete cookie with root path
            response.cookies.set(cookieName, '', { 
                path: '/',
                expires: new Date(0),
                maxAge: 0
            })
        })

        // Set Cache-Control header to prevent caching
        response.headers.set(
            'Cache-Control',
            'no-store, no-cache, must-revalidate, proxy-revalidate'
        )
        response.headers.set('Pragma', 'no-cache')
        response.headers.set('Expires', '0')
        
        return response
    }

    const response = NextResponse.next()
    
    // Add cache control headers to prevent caching of protected routes
    response.headers.set(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, proxy-revalidate'
    )
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
}
export const config = {
    matcher: [
        // Match all paths
        '/:path*',
        // But exclude public paths like static files, api routes, etc
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}






