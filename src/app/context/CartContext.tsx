"use client"
import { createContext, useContext, useCallback, useEffect, useState } from "react";
import { 
    addProductToCart,
    clearUserCart,
    getUserCart,
    removeCartItem,
    updateCartProductQuantity
} from "@/app/actions/cart.action";
import { toast } from "@/lib/utils";

type CartProduct = {
    _id: string;
    product: {
        _id: string;
        title: string;
        imageCover: string;
        price: number;
    };
    price: number;
    count: number;
};

type CartResponse = {
    status: string;
    numOfCartItems: number;
    cartId?: string;
    data: {
        products: CartProduct[];
        totalCartPrice: number;
    };
};

type CartContextValue = {
    cart: CartResponse | null;
    isLoading: boolean;
    refresh: () => Promise<void>;
    add: (productId: string) => Promise<void>;
    updateQty: (productId: string, count: number) => Promise<void>;
    remove: (productId: string) => Promise<void>;
    clear: () => Promise<void>;
    logout: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export default function CartContextProvider({children}:{children :React.ReactNode}){
    const [cart, setCart] = useState<CartResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refresh = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await getUserCart();
            if (res.status === 200) {
                setCart(res.data as CartResponse);
            } else {
                setCart(null);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const add = useCallback(async (productId: string) => {
        try {
            const res = await addProductToCart(productId);
            if (res.status === 200 || res.status === 201) {
                toast({ title: "Added to cart", description: "The product was added successfully", type: "success" });
                setCart(prev => prev ? { ...prev, numOfCartItems: prev.numOfCartItems + 1 } : prev);
            } else {
                toast({ title: "Add failed", description: "Could not add product to cart", type: "error" });
            }
        } catch {
            toast({ title: "Add failed", description: "Could not add product to cart", type: "error" });
        } finally {
            await refresh();
        }
    }, [refresh]);

    const updateQty = useCallback(async (productId: string, count: number) => {
        try {
            const res = await updateCartProductQuantity(productId, count);
            if (res.status === 200) {
                setCart(res.data as CartResponse);
                toast({ title: "Cart updated", type: "success" });
            } else {
                toast({ title: "Error", description: "Failed to update cart", type: "error" });
            }
        } catch {
            toast({ title: "Error", description: "Failed to update cart", type: "error" });
        }
    }, []);

    const remove = useCallback(async (productId: string) => {
        try {
            const res = await removeCartItem(productId);
            if (res.status === 200) {
                // Update state directly from API response (no refresh)
                setCart(res.data as CartResponse);
                toast({ title: "Item removed", type: "success" });
            } else {
                toast({ title: "Error", description: "Failed to remove item", type: "error" });
            }
        } catch {
            toast({ title: "Error", description: "Failed to remove item", type: "error" });
        }
    }, []);

    const clear = useCallback(async () => {
        try {
            const res = await clearUserCart();
            if (res.status === 200) {
                // Ensure consistent empty cart shape regardless of API payload
                setCart({
                    status: "success",
                    numOfCartItems: 0,
                    data: { products: [], totalCartPrice: 0 },
                });
                toast({ title: "Cart cleared", type: "success" });
            } else {
                toast({ title: "Error", description: "Failed to clear cart", type: "error" });
            }
        } catch {
            toast({ title: "Error", description: "Failed to clear cart", type: "error" });
        }
    }, []);

    const logout = useCallback(() => {
        setCart(null);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <CartContext.Provider value={{ cart, isLoading, refresh, add, updateQty, remove, clear, logout }}>
            {children}
        </CartContext.Provider>
    );
}

export function useUserCart(){
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useUserCart must be used within CartContextProvider");
    }
    return ctx;
}