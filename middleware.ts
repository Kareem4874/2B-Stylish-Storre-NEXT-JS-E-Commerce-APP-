import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check for all possible token locations
    const token =
        request.cookies.get("__Secure-next-auth.session-token")?.value ||
        request.cookies.get("next-auth.session-token")?.value ||
        request.cookies.get("_vercel_jwt")?.value

    // Get the path from the URL
    const path = request.nextUrl.pathname

    // If we're already on the login page and have a token, redirect to home
    if (path === '/Login' && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If we don't have a token and we're not on the login or register page, redirect to login
    if (!token && !['/Login', '/Register'].includes(path)) {
        const response = NextResponse.redirect(new URL('/Login', request.url))
        
        // Clear any existing auth cookies to ensure clean state
        response.cookies.delete('next-auth.session-token')
        response.cookies.delete('__Secure-next-auth.session-token')
        response.cookies.delete('_vercel_jwt')
        
        return response
    }

    return NextResponse.next()
}
export const config = {
    matcher: [
        '/',
        '/products/:path*',
        '/Products/:path*',
        '/brands/:path*',
        '/Brands/:path*',
        '/categories/:path*',
        '/Categories/:path*',
        '/cart/:path*',
        '/Cart/:path*',
        '/wishlist/:path*',
        '/Wishlist/:path*',
        '/checkout/:path*',
        '/allorders/:path*',
        '/Login',  // Add login to handle redirect when already logged in
    ],
}






