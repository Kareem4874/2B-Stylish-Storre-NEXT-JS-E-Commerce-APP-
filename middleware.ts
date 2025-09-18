import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Public pages that don't require authentication
const publicPages = ['/Login', '/Register']

// Static files and API routes that should be accessible without auth
const publicPatterns = [
    '/api/',
    '/_next/',
    '/favicon.ico',
    '/public/',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.svg',
]

function addSecurityHeaders(response: NextResponse) {
    response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '-1')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    return response
}

function clearAuthCookies(response: NextResponse) {
    const cookiesToClear = [
        'next-auth.session-token',
        '__Secure-next-auth.session-token',
        '_vercel_jwt',
        'next-auth.csrf-token',
        'next-auth.callback-url',
        '__Secure-next-auth.callback-url',
        '__Host-next-auth.csrf-token'
    ]

    cookiesToClear.forEach(cookieName => {
        // Delete cookie with default options
        response.cookies.delete(cookieName)
        
        // Also try to delete with specific options
        response.cookies.set(cookieName, '', {
            path: '/',
            expires: new Date(0),
            maxAge: 0,
            secure: true,
            httpOnly: true,
            sameSite: 'lax'
        })
    })
}

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Skip middleware for public files
    if (publicPatterns.some(pattern => path.startsWith(pattern) || path.endsWith(pattern))) {
        return NextResponse.next()
    }

    // Allow access to public pages
    if (publicPages.some(page => path.startsWith(page))) {
        const response = NextResponse.next()
        return addSecurityHeaders(response)
    }

    // Special check for home and wishlist paths
    if (path === '/' || path.toLowerCase().includes('wishlist')) {
        try {
            const token = await getToken({ 
                req: request,
                secret: process.env.NEXTAUTH_SECRET
            })
            
            if (!token) {
                const response = NextResponse.redirect(new URL('/Login', request.url))
                clearAuthCookies(response)
                addSecurityHeaders(response)
                return response
            }
        } catch (error) {
            const response = NextResponse.redirect(new URL('/Login', request.url))
            clearAuthCookies(response)
            addSecurityHeaders(response)
            return response
        }
    }

    try {
        // Verify JWT token
        const token = await getToken({ 
            req: request,
            secret: process.env.NEXTAUTH_SECRET
        })

        if (!token) {
            console.log('No token found, redirecting to login')
            const response = NextResponse.redirect(new URL('/Login', request.url))
            clearAuthCookies(response)
            addSecurityHeaders(response)
            return response
        }

        // User is authenticated, proceed but add security headers
        const response = NextResponse.next()
        return addSecurityHeaders(response)

    } catch (error) {
        console.error('Auth verification failed:', error)
        const response = NextResponse.redirect(new URL('/Login', request.url))
        clearAuthCookies(response)
        addSecurityHeaders(response)
        return response
    }
}

export const config = {
    matcher: [
        // Protected routes that require authentication
        '/',
        '/wishlist',
        '/Wishlist',
        '/cart',
        '/Cart',
        '/products',
        '/Products',
        '/categories',
        '/Categories',
        '/brands',
        '/Brands',
        '/checkout',
        '/allorders',
        // Catch-all for any other routes
        '/((?!api|_next/static|_next/image|favicon.ico|public/|assets/).*)'
    ]
}