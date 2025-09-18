import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
const token =
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("_vercel_jwt")?.value

if (!token) {
    return NextResponse.redirect(new URL("/Login", request.url))
}

return NextResponse.next()
}
export const config = {
    matcher: [
    "/",
    "/products/:path*",
    "/brands/:path*",
    "/categories/:path*",
    "/cart/:path*",
    "/wishlist/:path*",
    ],
}

