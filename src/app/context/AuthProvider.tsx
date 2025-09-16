"use client"
import { SessionProvider } from "next-auth/react";
import CartContextProvider from "./CartContext";



export function Authprovider({children}: {children: React.ReactNode})
{
    return(
        <SessionProvider>
            <CartContextProvider>
            {children}
            </CartContextProvider>
        </SessionProvider>
    )
}