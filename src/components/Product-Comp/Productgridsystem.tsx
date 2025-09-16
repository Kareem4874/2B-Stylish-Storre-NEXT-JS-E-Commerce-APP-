import React from 'react'
import { getProducts } from '@/app/actions/product.action'
import Productdisplay from './Productdisplay'
import { Product } from '@/app/Type/Product.model'
import { userCart } from '@/app/context/CartContext'


export default async function ProductGridSystem({products}: {products: Product[]}) {
   
  return (
    <>
    {/* Premium Animated Background Container */}
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
      
      {/* Floating Animated Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-500/15 to-rose-500/15 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-ping"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-yellow-500/8 to-orange-500/8 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-56 h-56 bg-gradient-to-r from-violet-500/12 to-purple-500/12 rounded-full blur-3xl animate-bounce"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.1)_1px,_transparent_0)] bg-[size:50px_50px] animate-pulse opacity-30"></div>
      
      {/* Moving Light Rays */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent transform rotate-12 animate-pulse"></div>
      <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-pink-500/15 to-transparent transform -rotate-12 animate-ping"></div>
      
      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400 rounded-full animate-bounce opacity-60 shadow-lg shadow-cyan-500/50"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-pink-500 rounded-full animate-ping opacity-50 shadow-lg shadow-pink-500/50"></div>
      <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-emerald-400 rounded-full animate-pulse opacity-70 shadow-lg shadow-emerald-500/50"></div>
      <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-80 shadow-lg shadow-yellow-500/50"></div>
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-violet-400 rounded-full animate-ping opacity-60 shadow-lg shadow-violet-500/50"></div>
      
      {/* Holographic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-pink-500/5 animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white/5 to-transparent animate-ping opacity-50"></div>
      
      {/* Original Container with Enhanced Background */}
      <div className="container mx-auto relative z-10 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
                <Productdisplay key={product?._id} product={product}/>
            ))}
        </div>
      </div>
      
      {/* Bottom Cosmic Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/50 via-indigo-900/30 to-transparent animate-pulse"></div>
      
      {/* Side Light Beams */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent animate-pulse"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-pink-500/10 via-purple-500/5 to-transparent animate-bounce"></div>
    </div>
    </>
  )
}