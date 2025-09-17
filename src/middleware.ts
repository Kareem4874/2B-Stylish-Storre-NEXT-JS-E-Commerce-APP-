import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token") || request.cookies.get("_vercel_jwt")
    if(!token){
        return NextResponse.redirect(new URL('/Login', request.url))
    }

    {
        return NextResponse.next()
    }
}

export const config = {
matcher: ["/Products","/","/Brands","/Categories","/Cart" ,"/Wishlist"],
}