"use client"
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { addProductToWishlist, getUserWishlist, removeProductFromWishlist } from "@/app/actions/Wishlist.action";
import { toast } from "@/lib/utils";

type WishlistItem = {
    _id: string;
    title?: string;
    imageCover?: string;
    price?: number;
};

type WishlistContextValue = {
    items: WishlistItem[];
    isLoading: boolean;
    add: (productId: string) => Promise<void>;
    remove: (productId: string) => Promise<void>;
    has: (productId: string) => boolean;
    count: number;
    refresh: () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const load = useCallback(async () => {
        setIsLoading(true);
        const res = await getUserWishlist();
        const data = (res as { data?: { data?: WishlistItem[] } })?.data?.data ?? [];
        setItems(Array.isArray(data) ? data : []);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const add = useCallback(async (productId: string) => {
        try {
            await addProductToWishlist(productId);
            await load();
            toast({
                title: "Added to Wishlist",
                description: "Product has been added to your wishlist successfully",
                type: "success"
            });
        } catch (error) {
            toast({
                title: "Failed to Add",
                description: "Could not add product to wishlist",
                type: "error"
            });
        }
    }, [load]);

    const remove = useCallback(async (productId: string) => {
        // Update state immediately for instant UI feedback
        setItems(prevItems => prevItems.filter((item: WishlistItem) => 
            (item._id !== productId) && 
            (item?.product?._id !== productId) &&
            (item?.id !== productId)
        ));
        
        // Remove from server in background
        try {
            await removeProductFromWishlist(productId);
        } catch (error) {
            // If server request fails, reload to sync state
            console.error('Failed to remove from wishlist:', error);
            await load();
        }
    }, [load]);

    const has = useCallback((productId: string) => {
        return items.some((p: WishlistItem) => (p._id === productId) || (p?.id === productId) || (p?._id === productId) || (p?.product?._id === productId));
    }, [items]);

    const value = useMemo<WishlistContextValue>(() => ({
        items,
        isLoading,
        add,
        remove,
        has,
        count: items.length,
        refresh: load,
    }), [items, isLoading, add, remove, has, load]);

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
    return ctx;
}


