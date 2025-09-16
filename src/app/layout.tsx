import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar-Comp/Navbar";
import SplashCursor from '@/components/SplashCursor';
import { Authprovider } from "@/app/context/AuthProvider";
import CartContextProvider from "@/app/context/CartContext";
import Toaster from "@/components/ui/Toaster";
import { WishlistProvider } from "@/app/context/WishlistContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2B Stylish | Premium Store",
  description: "This my best 2B Stylish APP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Authprovider>
        <CartContextProvider>
        <WishlistProvider>
        <Navbar/>
        {children}
        <Toaster/>
        </WishlistProvider>
        </CartContextProvider>
        </Authprovider>
      </body>
    </html>
  );
}
