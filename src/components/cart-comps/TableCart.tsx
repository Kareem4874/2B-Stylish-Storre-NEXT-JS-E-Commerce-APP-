"use client"
import React from 'react'
import Image from 'next/image'
import { useUserCart } from '@/app/context/CartContext'
import { Trash2, Plus, Minus, ShoppingBag} from 'lucide-react'
import Link from 'next/link'

export default function TableCart() {
    const { cart, isLoading, updateQty, remove, clear } = useUserCart()
    
    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[40vh]">
            <div className="w-10 h-10 border-3 border-slate-200 border-t-slate-800 rounded-full animate-spin"/>
        </div>
    )

    const isEmpty = !cart?.data?.products?.length
    
    if (isEmpty) return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] p-8">
            <ShoppingBag className="w-16 h-16 text-slate-300 mb-4"/>
            <h2 className="text-xl font-semibold text-slate-800">Your cart is empty</h2>
            <p className="text-slate-500 mt-1 text-sm">Start shopping to add items</p>
        </div>
    )

    const { products, totalCartPrice } = cart.data

    return (
        <div className="max-w-6xl mx-auto p-4 lg:p-6">
            {/* Desktop View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border">
                <div className="grid grid-cols-12 gap-4 p-6 border-b font-medium text-slate-600 text-sm">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                </div>
                
                <div className="divide-y">
                    {products.map((item) => (
                        <div key={item._id} className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-slate-50 transition-colors">
                            <div className="col-span-6 flex items-center gap-4">
                                <div className="relative group">
                                    <Image 
                                        src={item.product.imageCover} 
                                        alt={item.product.title}
                                        width={80} 
                                        height={80}
                                        className="rounded-lg object-cover"
                                    />
                                    <button 
                                        onClick={() => remove(item.product._id)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-3 h-3"/>
                                    </button>
                                </div>
                                <h3 className="font-medium text-slate-800 line-clamp-2">{item.product.title}</h3>
                            </div>
                            
                            <div className="col-span-2 text-center text-slate-600">
                                {item.price.toLocaleString()} EGP
                            </div>
                            
                            <div className="col-span-2 flex justify-center">
                                <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                                    <button 
                                        onClick={() => updateQty(item.product._id, Math.max(1, item.count - 1))}
                                        className="p-1 hover:bg-white rounded transition-colors"
                                    >
                                        <Minus className="w-4 h-4"/>
                                    </button>
                                    <span className="w-8 text-center font-medium">{item.count}</span>
                                    <button 
                                        onClick={() => updateQty(item.product._id, item.count + 1)}
                                        className="p-1 hover:bg-white rounded transition-colors"
                                    >
                                        <Plus className="w-4 h-4"/>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="col-span-2 text-right font-semibold text-slate-800">
                                {(item.price * item.count).toLocaleString()} EGP
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="p-6 bg-slate-50 rounded-b-xl">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-lg text-slate-600">Total Amount</span>
                        <span className="text-2xl font-bold text-slate-800">
                            {totalCartPrice?.toLocaleString()} EGP
                        </span>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <button 
                            onClick={clear}
                            className="px-6 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-100 transition-all font-medium"
                        >
                            Clear Cart
                        </button>
                        <button className="px-8 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-medium">
                            <Link href="/checkout">Checkout</Link>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-3">
                {products.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg p-4 shadow-sm border">
                        <div className="flex gap-3 mb-3">
                            <Image 
                                src={item.product.imageCover} 
                                alt={item.product.title}
                                width={60} 
                                height={60}
                                className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-slate-800 line-clamp-2">
                                    {item.product.title}
                                </h3>
                                <p className="text-sm text-slate-600 mt-1">
                                    {item.price.toLocaleString()} EGP
                                </p>
                            </div>
                            <button 
                                onClick={() => remove(item.product._id)}
                                className="text-red-500 p-1 h-fit"
                            >
                                <Trash2 className="w-4 h-4"/>
                            </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                                <button 
                                    onClick={() => updateQty(item.product._id, Math.max(1, item.count - 1))}
                                    className="p-1"
                                >
                                    <Minus className="w-3 h-3"/>
                                </button>
                                <span className="w-6 text-center text-sm">{item.count}</span>
                                <button 
                                    onClick={() => updateQty(item.product._id, item.count + 1)}
                                    className="p-1"
                                >
                                    <Plus className="w-3 h-3"/>
                                </button>
                            </div>
                            <span className="font-semibold text-slate-800">
                                {(item.price * item.count).toLocaleString()} EGP
                            </span>
                        </div>
                    </div>
                ))}
                
                <div className="bg-white rounded-lg p-4 shadow-sm border sticky bottom-0">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-600">Total</span>
                        <span className="text-xl font-bold text-slate-800">
                            {totalCartPrice?.toLocaleString()} EGP
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            onClick={clear}
                            className="py-2.5 border border-slate-300 rounded-lg text-sm font-medium"
                        >
                            Clear
                        </button>
                        <button className="py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium">
                            <Link href="/checkout">Checkout</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}