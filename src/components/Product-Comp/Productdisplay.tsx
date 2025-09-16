"use client"
import React, { useEffect, useRef, useState } from "react"
import { Product } from "@/app/Type/Product.model"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { StarRating } from "react-flexible-star-rating"
import Link from "next/link"
import { Heart, ShoppingCart, ZoomIn } from "lucide-react"
// import ScrollReveal from "scrollreveal"
import { useUserCart } from "@/app/context/CartContext"
import { useWishlist } from "@/app/context/WishlistContext"



export default function Productdisplay({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { add } = useUserCart()
  const wishlist = useWishlist()
  const isWished = wishlist.has(product._id)
  const [isTogglingWish, setIsTogglingWish] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    try {
      setIsAdding(true)
      await add(product._id)
    } finally {
      setIsAdding(false)
    }
  }

  const handleToggleWishlist = async () => {
    try {
      setIsTogglingWish(true)
      if (isWished) {
        await wishlist.remove(product._id)
      } else {
        await wishlist.add(product._id)
      }
    } finally {
      setIsTogglingWish(false)
    }
  }

  // useEffect(() => {
  //   if (cardRef.current) {
  //     ScrollReveal().reveal(cardRef.current, {
  //       duration: 1000,
  //       origin: "bottom",
  //       distance: "40px",
  //       easing: "ease-in-out",
  //       reset: false, 
  //     })
  //   }
  // }, [])

  return (
    <div
      ref={cardRef}
      className="group perspective-1000 transform-gpu my-4 sm:my-6 md:my-8">
       <Card className='relative overflow-hidden border-0 bg-gradient-to-br from-rose-50 via-pink-50 to-violet-100 shadow-lg sm:shadow-xl hover:shadow-pink-500/30 transition-all duration-700 transform-gpu hover:-translate-y-2 sm:hover:-translate-y-4 hover:-rotate-1 hover:scale-102 rounded-2xl sm:rounded-3xl'>
          
          {/* Glassmorphism Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-pink-50/40 to-purple-100/60 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-300/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          {/* Minimalist Action Buttons - Mobile Responsive */}
          <div className="absolute z-30 flex flex-col transition-all duration-500 ease-out gap-2 top-2 sm:top-4 -right-10 sm:-right-12 group-hover:right-2 sm:group-hover:right-4 opacity-0 group-hover:opacity-100">
            <button disabled={isAdding} onClick={handleAddToCart} className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-md text-gray-600 hover:text-pink-600 hover:bg-white/90 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-pink-200/50 flex items-center justify-center ${isAdding ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {isAdding ? (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"/>
                )}
            </button>
            
            <button disabled={isTogglingWish} onClick={handleToggleWishlist} className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-md ${isWished ? 'text-red-600' : 'text-gray-600'} hover:text-red-500 hover:bg-white/90 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-pink-200/50 flex items-center justify-center ${isTogglingWish ? 'opacity-70 cursor-not-allowed' : ''}`}>
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"/>
            </button>
            
            <Link href={`/Products/${product._id}`} className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-md text-gray-600 hover:text-blue-600 hover:bg-white/90 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-pink-200/50 flex items-center justify-center'>
                <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"/>
            </Link>
          </div>

          {/* Elegant Badge - Mobile Responsive */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full shadow-lg opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
            New
          </div>

          <CardHeader className="relative p-3 sm:p-4 md:p-6 pb-2 sm:pb-3 md:pb-4 space-y-2 sm:space-y-3 z-10">
            <CardTitle className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 line-clamp-2 group-hover:text-gray-900 transition-colors duration-300 leading-tight">
                {product.title.split(" ").slice(0,3).join(" ")}
            </CardTitle>
            
            <CardDescription className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {product.description.split(" ").slice(0,6).join(" ")}
            </CardDescription>
          </CardHeader>

          <CardContent className="relative p-3 sm:p-4 md:p-6 pt-1 sm:pt-2">
            <div className="relative h-[180px] sm:h-[220px] md:h-[260px] lg:h-[280px] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
              
              <Image 
                  src={product.imageCover} 
                  alt={product.title} 
                  fill 
                  sizes="(max-width: 640px) 95vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" 
                  className="object-cover transition-all duration-500 group-hover:scale-105 rounded-xl sm:rounded-2xl"
              />
              
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
            </div>
          </CardContent>

          <CardFooter className='flex-col items-start gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 pt-2 sm:pt-3 md:pt-4 bg-white/50 backdrop-blur-md'>
            
            {/* Price Section - Mobile Responsive */}
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-0.5 sm:gap-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:block">Price</span>
                <span className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900'>
                    {product.price} EGP
                </span>
              </div>
              
              {/* Simple Buy Button - Mobile Responsive */}
              <button disabled={isAdding} onClick={handleAddToCart} className={`bg-pink-500 hover:bg-pink-600 text-white font-medium px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm ${isAdding ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {isAdding ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding...</span>
                  </div>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
            
            {/* Rating - Mobile Responsive */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <StarRating initialRating={Math.round(product.ratingsAverage)} dimension={12} />
                <span className="text-xs sm:text-sm text-gray-600">
                  ({product.ratingsAverage})
                </span>
              </div>
              
              <span className="text-xs text-green-600 font-medium">Available</span>
            </div>
          </CardFooter>
        </Card>
    </div>
  )
}


































// "use client"
// import React from 'react'
// import { Product } from '@/app/Type/Product.model'
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
//   } from "@/components/ui/card"
// import Image from 'next/image'
// import { StarRating } from 'react-flexible-star-rating'
// import Link from 'next/link'
// import { Heart, ShoppingCart, ZoomIn } from 'lucide-react'
// import ScrollReveal from "scrollreveal";

// export default function Productdisplay( {product}: {product: Product}) {
//   return (
    
//     <ScrollReveal
//   baseOpacity={0}
//   enableBlur={true}
//   baseRotation={5}
//   blurStrength={10}
// >
// <div className="group perspective-1000 transform-gpu my-4 sm:my-6 md:my-8">
//         <Card className='relative overflow-hidden border-0 bg-gradient-to-br from-rose-50 via-pink-50 to-violet-100 shadow-lg sm:shadow-xl hover:shadow-pink-500/30 transition-all duration-700 transform-gpu hover:-translate-y-2 sm:hover:-translate-y-4 hover:-rotate-1 hover:scale-102 rounded-2xl sm:rounded-3xl'>
          
//           {/* Glassmorphism Background */}
//           <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-pink-50/40 to-purple-100/60 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-300/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
//           {/* Minimalist Action Buttons - Mobile Responsive */}
//           <div className="absolute z-30 flex flex-col transition-all duration-500 ease-out gap-2 top-2 sm:top-4 -right-10 sm:-right-12 group-hover:right-2 sm:group-hover:right-4 opacity-0 group-hover:opacity-100">
//             <button className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-md text-gray-600 hover:text-pink-600 hover:bg-white/90 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-pink-200/50 flex items-center justify-center'>
//                 <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"/>
//             </button>
            
//             <button className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-md text-gray-600 hover:text-red-500 hover:bg-white/90 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-pink-200/50 flex items-center justify-center'>
//                 <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"/>
//             </button>
            
//             <Link href={`/Products/${product._id}`} className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-md text-gray-600 hover:text-blue-600 hover:bg-white/90 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-pink-200/50 flex items-center justify-center'>
//                 <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"/>
//             </Link>
//           </div>

//           {/* Elegant Badge - Mobile Responsive */}
//           <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full shadow-lg opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
//             New
//           </div>

//           <CardHeader className="relative p-3 sm:p-4 md:p-6 pb-2 sm:pb-3 md:pb-4 space-y-2 sm:space-y-3 z-10">
//             <CardTitle className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 line-clamp-2 group-hover:text-gray-900 transition-colors duration-300 leading-tight">
//                 {product.title.split(" ").slice(0,3).join(" ")}
//             </CardTitle>
            
//             <CardDescription className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
//                 {product.description.split(" ").slice(0,6).join(" ")}
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="relative p-3 sm:p-4 md:p-6 pt-1 sm:pt-2">
//             <div className="relative h-[180px] sm:h-[220px] md:h-[260px] lg:h-[280px] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
              
//               <Image 
//                   src={product.imageCover} 
//                   alt={product.title} 
//                   fill 
//                   sizes="(max-width: 640px) 95vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" 
//                   className="object-cover transition-all duration-500 group-hover:scale-105 rounded-xl sm:rounded-2xl"
//               />
              
//               {/* Subtle Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
//             </div>
//           </CardContent>

//           <CardFooter className='flex-col items-start gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 pt-2 sm:pt-3 md:pt-4 bg-white/50 backdrop-blur-md'>
            
//             {/* Price Section - Mobile Responsive */}
//             <div className="flex items-center justify-between w-full">
//               <div className="flex flex-col gap-0.5 sm:gap-1">
//                 <span className="text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:block">Price</span>
//                 <span className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900'>
//                     {product.price} EGP
//                 </span>
//               </div>
              
//               {/* Simple Buy Button - Mobile Responsive */}
//               <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm">
//                 Add to Cart
//               </button>
//             </div>
            
//             {/* Rating - Mobile Responsive */}
//             <div className="flex items-center justify-between w-full">
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <StarRating initialRating={Math.round(product.ratingsAverage)} dimension={12} />
//                 <span className="text-xs sm:text-sm text-gray-600">
//                   ({product.ratingsAverage})
//                 </span>
//               </div>
              
//               <span className="text-xs text-green-600 font-medium">Available</span>
//             </div>
//           </CardFooter>
//         </Card>
//     </div>
// </ScrollReveal>
    
//   )
// }