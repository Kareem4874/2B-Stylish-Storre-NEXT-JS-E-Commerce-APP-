"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type OrderedItem = {
    _id: string;
    product: {
        _id: string;
        title: string;
        imageCover: string;
        price: number;
    };
    price: number;
    count: number;
}

export default function AllOrdersPage() {
    const [items, setItems] = useState<OrderedItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        try {
            const raw = typeof window !== 'undefined' ? window.sessionStorage.getItem('lastOrderItems') : null;
            if (raw) {
                setItems(JSON.parse(raw) as OrderedItem[])
            }
        } catch {}
        setIsLoading(false)
    }, [])

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.count), 0)
    const totalItems = items.reduce((sum, item) => sum + item.count, 0)

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Success Animation Circle */}
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Success Header */}
                    <div className="text-center mb-10 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                            Order Placed Successfully! 🎉
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Thank you for your purchase. Your order will be delivered within 3 days.
                        </p>
                    </div>

                    {items.length > 0 ? (
                        <>
                            {/* Order Summary Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                    <div className="p-4">
                                        <p className="text-sm text-gray-500 mb-1">Order Number</p>
                                        <p className="text-xl font-semibold text-gray-800">#{Date.now().toString().slice(-8)}</p>
                                    </div>
                                    <div className="p-4 border-t md:border-t-0 md:border-l md:border-r border-gray-200">
                                        <p className="text-sm text-gray-500 mb-1">Total Items</p>
                                        <p className="text-xl font-semibold text-gray-800">{totalItems}</p>
                                    </div>
                                    <div className="p-4 border-t md:border-t-0 border-gray-200">
                                        <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                                        <p className="text-xl font-semibold text-green-600">{totalAmount.toLocaleString()} EGP</p>
                                    </div>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {items.map((item, index) => (
                                        <div 
                                            key={item._id} 
                                            className="group hover:shadow-xl transition-all duration-300 rounded-xl p-5 border border-gray-100 hover:border-green-200 bg-gradient-to-b from-white to-gray-50"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <div className="relative overflow-hidden rounded-lg mb-4">
                                                <Image 
                                                    src={item.product.imageCover} 
                                                    alt={item.product.title} 
                                                    width={400}
                                                    height={192}
                                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    loading="lazy"
                                                />
                                                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                                    ✓ Confirmed
                                                </div>
                                            </div>
                                            
                                            <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2">
                                                {item.product.title}
                                            </h3>
                                            
                                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                                <div>
                                                    <p className="text-xs text-gray-500">Quantity</p>
                                                    <p className="font-semibold text-gray-700">{item.count}x</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500">Subtotal</p>
                                                    <p className="font-bold text-green-600 text-lg">
                                                        {(item.price * item.count).toLocaleString()} EGP
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Delivery Info */}
                            <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                                <div className="flex items-start space-x-3">
                                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold text-blue-900 mb-1">Delivery Information</h3>
                                        <p className="text-blue-700 text-sm">
                                            Your order will be delivered to your registered address within 3 business days. 
                                            You will receive a tracking number via email once your order is shipped.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                                <button onClick={() => router.push('/')} className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl">
                                    Continue Shopping
                                </button>
                                <button className="px-8 py-3 bg-white text-gray-700 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors">
                                    View Order History
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                                </svg>
                            </div>
                            <p className="text-gray-600 text-lg">No recent order items to display.</p>
                            <button className="mt-6 px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                Start Shopping
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}