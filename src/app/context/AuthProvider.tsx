"use client"
import { SessionProvider } from "next-auth/react";


export function Authprovider({children}: {children: React.ReactNode})
{
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

