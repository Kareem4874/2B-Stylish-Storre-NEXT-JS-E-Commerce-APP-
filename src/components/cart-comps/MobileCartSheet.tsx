"use client"
import React from "react";
import Image from "next/image";
import { useUserCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function MobileCartSheet({ open, onClose }:{ open: boolean; onClose: () => void }){
    const { cart, remove, clear, isLoading } = useUserCart();
    const router = useRouter();

    return (
        <div className={`fixed inset-0 z-[1000] md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <div
              className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
              onClick={onClose}
            />
            <div
              className={`absolute left-0 right-0 bottom-0 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-full'}`}
            >
                <div className="h-1.5 w-12 bg-gray-300 rounded-full mx-auto my-3" />
                <div className="px-4 pb-4 max-h-[70vh] overflow-y-auto">
                    {isLoading ? (
                        <div className="py-10 flex items-center justify-center">
                            <div className="h-6 w-6 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
                        </div>
                    ) : !cart || !cart.data || !Array.isArray(cart.data.products) || cart.numOfCartItems === 0 ? (
                        <div className="py-10 text-center text-gray-600">Your cart is empty</div>
                    ) : (
                        <>
                            <div className="space-y-3">
                                {cart.data.products.map(item => (
                                    <div key={item._id} className="flex items-center gap-3">
                                        <Image src={item.product.imageCover} alt={item.product.title} width={56} height={56} className="rounded object-cover" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium line-clamp-2">{item.product.title}</p>
                                            <p className="text-xs text-gray-500">{item.count} x {item.price} EGP</p>
                                        </div>
                                        <button onClick={() => remove(item.product._id)} className="text-xs text-red-600 px-2 py-1">Remove</button>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-sm font-semibold">Total</span>
                                <span className="text-sm font-bold">{cart.data?.totalCartPrice ?? 0} EGP</span>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <button onClick={() => { onClose(); router.push('/Cart'); }} className="px-4 py-3 bg-blue-600 text-white rounded-lg active:scale-[.98]">View cart</button>
                                <button onClick={() => clear()} className="px-4 py-3 bg-gray-100 text-gray-800 rounded-lg active:scale-[.98]">Clear</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}



