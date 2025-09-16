'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { useSession, signOut } from 'next-auth/react'
import { 
  ShoppingCart, Store, Menu, X, Home, Package, 
  Grid3X3, Tag, Search, User, Heart, LogIn, 
  UserPlus, LogOut, Sparkles, TrendingUp,
  Zap, Crown, Star
} from 'lucide-react'
import { Badge } from '../ui/badge'
import { useUserCart } from '@/app/context/CartContext'
import { useWishlist } from '@/app/context/WishlistContext'
import MiniCart from '@/components/cart-comps/MiniCart'
import MobileCartSheet from '@/components/cart-comps/MobileCartSheet'

const navItems = [
  { href: '/', label: 'Home', icon: Home, color: 'from-purple-500 to-pink-500' },
  { href: '/Products', label: 'Products', icon: Package, color: 'from-blue-500 to-cyan-500' },
  { href: '/Categories', label: 'Categories', icon: Grid3X3, color: 'from-green-500 to-teal-500' },
  { href: '/Brands', label: 'Brands', icon: Tag, color: 'from-orange-500 to-red-500' }
]

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [miniCart, setMiniCart] = useState(false)
  const [mobileSheet, setMobileSheet] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const cartTimer = useRef<NodeJS.Timeout | null>(null)
  
  const { cart, logout: clearCart } = useUserCart()
  const wishlist = useWishlist()
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    clearCart()
    await signOut({ redirect: false })
    router.replace("/Login")
  }

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-700 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-2xl shadow-2xl py-2' 
          : 'bg-gradient-to-b from-white via-white/95 to-white/90 backdrop-blur-xl py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Ultra Modern Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 p-2.5 rounded-2xl group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <Store className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Crown className="w-4 h-4 text-yellow-500 animate-bounce" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    2B Stylish
                  </span>
                  <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" />
                </div>
                <span className="text-[10px] font-semibold text-transparent bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  PREMIUM EXPERIENCE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with Floating Effect */}
            <nav className="hidden lg:flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-gray-50/50 to-white/50 rounded-full backdrop-blur-lg">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2.5 overflow-hidden rounded-xl transition-all duration-500 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <div className="relative flex items-center gap-2">
                    <item.icon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" />
                    <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </Link>
              ))}
            </nav>

            {/* Futuristic Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className={`relative w-full group ${searchFocused ? 'scale-105' : ''} transition-transform duration-300`}>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative flex items-center">
                  <Search className={`absolute left-4 w-5 h-5 transition-all duration-300 ${
                    searchFocused ? 'text-purple-600' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="Discover amazing products..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50/80 backdrop-blur-lg border-2 border-transparent hover:border-purple-200 focus:border-purple-400 focus:bg-white rounded-2xl transition-all duration-500 outline-none text-sm font-medium placeholder-gray-400"
                  />
                  {searchFocused && (
                    <div className="absolute right-3 flex items-center gap-1">
                      <span className="text-xs text-purple-600 font-semibold animate-pulse">AI Search</span>
                      <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons with Glass Effect */}
            <div className="flex items-center gap-3">
              {/* Wishlist with Heartbeat */}
              <Link 
                href="/wishlist" 
                aria-label="Open wishlist"
                className="relative p-3 bg-gradient-to-br from-pink-50 to-red-50 hover:from-pink-100 hover:to-red-100 rounded-2xl transition-all duration-500 group hidden sm:block"
              >
                <Heart className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse" />
                {wishlist.count > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 border-0 text-white font-bold animate-bounce">
                    {wishlist.count}
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </Link>

              {/* Cart with Floating Effect */}
              <div 
                className="relative"
                onMouseEnter={() => {
                  if (cartTimer.current) clearTimeout(cartTimer.current)
                  setMiniCart(true)
                }}
                onMouseLeave={() => {
                  cartTimer.current = setTimeout(() => setMiniCart(false), 200)
                }}
              >
                <button 
                  aria-label="Open cart"
                  onClick={() => window.innerWidth < 768 ? setMobileSheet(true) : router.push("/Cart")}
                  className="relative p-3 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl transition-all duration-500 group"
                >
                  <ShoppingCart className="w-5 h-5 text-blue-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  {cart && cart.numOfCartItems && cart.numOfCartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-500 border-0 text-white font-bold animate-bounce">
                      {cart.numOfCartItems}
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                </button>
                {miniCart && (
                  <div className="absolute right-0 mt-3 z-50 hidden md:block animate-fadeIn">
                    <MiniCart />
                  </div>
                )}
              </div>

              {/* User Menu with Avatar */}
              <div className="relative hidden sm:block">
                <button
                  aria-label="Toggle user menu"
                  onClick={() => setUserMenu(!userMenu)}
                  className="relative p-3 bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 rounded-2xl transition-all duration-500 group"
                >
                  <User className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                  {session && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  )}
                </button>
                
                {userMenu && (
                  <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-purple-100 overflow-hidden animate-fadeIn">
                    <div className="p-2">
                      {session ? (
                        <>
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900">Welcome back!</p>
                            <p className="text-xs text-gray-500 mt-1">{session.user?.email}</p>
                          </div>
                          <button
                            onClick={handleLogout}
                            className="w-full mt-2 px-4 py-3 text-left hover:bg-red-50 rounded-xl flex items-center gap-3 text-red-600 transition-all duration-300 group"
                          >
                            <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            <span className="font-semibold">Logout</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <Link 
                            href="/Login" 
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 group"
                          >
                            <LogIn className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                            <span className="font-semibold text-gray-700">Sign In</span>
                          </Link>
                          <Link 
                            href="/Register" 
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-300 group"
                          >
                            <UserPlus className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold text-gray-700">Create Account</span>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                aria-label="Toggle mobile menu"
                onClick={() => setMobileMenu(!mobileMenu)}
                className="lg:hidden relative p-3 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-2xl transition-all duration-500 group"
              >
                <div className="relative w-5 h-5">
                  <Menu className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${mobileMenu ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`} />
                  <X className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${mobileMenu ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Slide Panel */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
        mobileMenu ? 'visible' : 'invisible'
      }`}>
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            mobileMenu ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenu(false)}
        />
        
        <div className={`absolute left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-2xl shadow-2xl transform transition-all duration-700 ${
          mobileMenu ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Mobile Header */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-violet-50 to-purple-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="w-7 h-7 text-purple-600" />
                <span className="text-xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  2B Stylish
                </span>
              </div>
              <button
                aria-label="Close mobile menu"
                onClick={() => setMobileMenu(false)}
                className="p-2 hover:bg-white/50 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="p-6 space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white rounded-2xl transition-all duration-300 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`p-2 bg-gradient-to-br ${item.color} rounded-xl group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-700">{item.label}</span>
              </Link>
            ))}
            
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />
            
            <Link 
              href="/wishlist" 
              onClick={() => setMobileMenu(false)} 
              aria-label="Open wishlist"
              className="flex items-center justify-between px-4 py-3 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 rounded-2xl transition-all"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-semibold">Wishlist</span>
              </div>
              {wishlist.count > 0 && <Badge className="bg-red-500">{wishlist.count}</Badge>}
            </Link>
            
            <Link 
              href="/Cart" 
              onClick={() => setMobileMenu(false)} 
              aria-label="Open cart"
              className="flex items-center justify-between px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-2xl transition-all"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Cart</span>
              </div>
              {cart && cart.numOfCartItems && cart.numOfCartItems > 0 && <Badge className="bg-blue-500">{cart.numOfCartItems}</Badge>}
            </Link>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

            {session ? (
              <button
                onClick={() => { setMobileMenu(false); handleLogout() }}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            ) : (
              <div className="space-y-2">
                <Link 
                  href="/Login" 
                  onClick={() => setMobileMenu(false)} 
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
                >
                  <LogIn className="w-5 h-5" />
                  Sign In
                </Link>
                <Link 
                  href="/Register" 
                  onClick={() => setMobileMenu(false)} 
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
                >
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-xs text-gray-600">Premium Shopping Experience</p>
            </div>
          </div>
        </div>
      </div>

      <MobileCartSheet open={mobileSheet} onClose={() => setMobileSheet(false)} />
      
      {/* Spacer */}
      <div className={`${scrolled ? 'h-16' : 'h-20'} transition-all duration-500`} />

      {/* Add CSS for custom animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  )
}