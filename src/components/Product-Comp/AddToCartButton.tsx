"use client"
import React, { useState } from "react";
import { useUserCart } from "@/app/context/CartContext";

export default function AddToCartButton({ productId, className, children }:{ productId: string; className?: string; children?: React.ReactNode }){
    const { add } = useUserCart();
    const [isLoading, setIsLoading] = useState(false);

    const handleAdd = async () => {
        try {
            setIsLoading(true);
            await add(productId);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button disabled={isLoading} onClick={handleAdd} className={`${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
            {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding...</span>
                </div>
            ) : (
                children ?? "Add to Cart"
            )}
        </button>
    );
}


