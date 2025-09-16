"use client"
import React from "react";
import Image from "next/image";
import { useUserCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function MiniCart(){
    const { cart, remove, clear, isLoading } = useUserCart();
    const router = useRouter();

    if (isLoading) {
        return (
            <div className="w-[90vw] max-w-sm md:w-80 p-3 md:p-4 bg-white rounded-xl shadow-2xl border border-gray-100">
                <div className="h-6 w-6 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin mx-auto" />
            </div>
        );
    }

    if (!cart || !cart.data || !Array.isArray(cart.data.products) || cart.numOfCartItems === 0) {
        return (
            <div className="w-[90vw] max-w-sm md:w-80 p-3 md:p-4 bg-white rounded-xl shadow-2xl border border-gray-100 text-center text-gray-600">
                Your cart is empty
            </div>
        );
    }

    return (
        <div className="w-[92vw] max-w-sm md:w-80 p-3 md:p-4 bg-white rounded-xl shadow-2xl border border-gray-100">
            <div className="max-h-56 md:max-h-64 overflow-y-auto space-y-3">
                {cart.data?.products?.slice(0, 6).map((item) => (
                    <div key={item._id} className="flex items-center gap-3">
                        <Image src={item.product.imageCover} alt={item.product.title} width={48} height={48} className="rounded object-cover" />
                        <div className="flex-1">
                            <p className="text-sm md:text-sm font-medium line-clamp-1">{item.product.title}</p>
                            <p className="text-xs md:text-xs text-gray-500">{item.count} x {item.price} EGP</p>
                        </div>
                        <button onClick={() => remove(item.product._id)} className="text-xs md:text-xs text-red-600 hover:underline px-2 py-1 rounded">Remove</button>
                    </div>
                ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm md:text-sm font-semibold">Total</span>
                <span className="text-sm md:text-sm font-bold">{cart.data?.totalCartPrice ?? 0} EGP</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
                <button onClick={() => router.push("/Cart")} className="px-3 py-2 text-sm md:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-[.98]">View cart</button>
                <button onClick={() => clear()} className="px-3 py-2 text-sm md:text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 active:scale-[.98]">Clear</button>
            </div>
        </div>
    );
}


