import React from 'react'
import ProductGridSystem from '@/components/Product-Comp/Productgridsystem'
import { getProducts } from '@/app/actions/product.action'
import { getUserCart } from '@/app/actions/cart.action'


export default async function page() {
    const response = await getProducts()
    const products = response?.data


     await getUserCart()
    
  return (
    <div className='my-7 '>
        <h1 className="text-3xl font-bold text-center text-red-600 relative">
          Our Products
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-red-500" />
        </h1>
        <p className="text-center text-gray-500 mt-6 mb-5">Check out our latest products and discover the <span className="text-red-600 font-semibold">best quality</span> products</p>

              <ProductGridSystem products={products} />
        
    </div>
  )
}
