"use client"
import React, { useState, useEffect } from "react";
import { useWishlist } from "@/app/context/WishlistContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Sparkles, Package, ArrowRight, X, Eye, Share2, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserCart } from "@/app/context/CartContext";

export default function WishlistPage() {
    const { items, isLoading, remove, count } = useWishlist();
    const { add: addToCart } = useUserCart();
    const router = useRouter();
    const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
    const [addingItems, setAddingItems] = useState<Set<string>>(new Set());
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<'recent' | 'price-low' | 'price-high'>('recent');
    
    // Animate items on mount
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle remove with animation
    const handleRemove = async (id: string) => {
        setRemovingItems(prev => new Set(prev).add(id));
        setTimeout(() => {
            remove(id);
            setRemovingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }, 300);
    };

    const handleViewDetails = (id: string) => {
        router.push(`/Products/${id}`);
    };

    const handleAddToCart = async (id: string) => {
        setAddingItems(prev => new Set(prev).add(id));
        try {
            await addToCart(id);
        } finally {
            setAddingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };

    // Sort items
    const sortedItems = [...items].sort((a: WishlistItem, b: WishlistItem) => {
        const priceA = a.price || a?.product?.price || 0;
        const priceB = b.price || b?.product?.price || 0;
        
        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        return 0;
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-pink-200 rounded-full animate-pulse"/>
                    <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-pink-500 rounded-full animate-spin"/>
                    <Heart className="absolute inset-0 m-auto w-8 h-8 text-pink-500 animate-pulse" />
                </div>
            </div>
        );
    }

    if (count === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md mx-auto">
                    <div className="mb-8 relative">
                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center animate-pulse">
                            <Heart className="w-16 h-16 text-pink-400" />
                        </div>
                        <Sparkles className="absolute top-0 right-12 w-6 h-6 text-yellow-400 animate-pulse" />
                        <Sparkles className="absolute bottom-4 left-10 w-5 h-5 text-purple-400 animate-pulse delay-75" />
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Your Wishlist is Empty
                    </h1>
                    <p className="text-gray-600 mb-8 text-lg">
                        Start exploring and save your favorite items for later!
                    </p>
                    
                <Link href="/">
                        <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                            <Package className="mr-2 w-5 h-5" />
                            Explore Products
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                </Link>
            </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                                    <Heart className="w-8 h-8" fill="white" />
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
                            </div>
                            <p className="text-pink-100 text-lg">
                                {count} {count === 1 ? 'item' : 'items'} saved for later
                            </p>
                        </div>
                        
                        {/* View Controls */}
                        <div className="flex items-center gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 flex">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-4 py-2 rounded-md transition-all ${
                                        viewMode === 'grid' 
                                            ? 'bg-white text-pink-600' 
                                            : 'text-white hover:bg-white/10'
                                    }`}
                                >
                                    Grid
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-4 py-2 rounded-md transition-all ${
                                        viewMode === 'list' 
                                            ? 'bg-white text-pink-600' 
                                            : 'text-white hover:bg-white/10'
                                    }`}
                                >
                                    List
                                </button>
                            </div>
                            
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'recent' | 'price-low' | 'price-high')}
                                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                            >
                                <option value="recent" className="text-gray-900">Recently Added</option>
                                <option value="price-low" className="text-gray-900">Price: Low to High</option>
                                <option value="price-high" className="text-gray-900">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid/List */}
            <div className="container mx-auto px-4 py-8">
                <div className={
                    viewMode === 'grid' 
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        : "space-y-4 max-w-5xl mx-auto"
                }>
                    {sortedItems.map((item: WishlistItem, index: number) => {
                        const id = item._id || item?.product?._id;
                        const title = item.title || item?.product?.title || "Product";
                        const price = item.price || item?.product?.price || 0;
                        const image = item.imageCover || item?.product?.imageCover;
                        const isRemoving = removingItems.has(id);
                        const isHovered = hoveredItem === id;
                        
                        if (viewMode === 'grid') {
                            return (
                                <div
                                    key={id}
                                    className={`
                                        group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl
                                        transform transition-all duration-500 hover:-translate-y-2
                                        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                                        ${isRemoving ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
                                    `}
                                    style={{ 
                                        transitionDelay: `${index * 50}ms`,
                                        animation: mounted ? `fadeInUp 0.5s ease-out ${index * 50}ms` : ''
                                    }}
                                    onMouseEnter={() => setHoveredItem(id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    {/* Badge */}
                                    <div className="absolute -top-2 -right-2 z-10">
                                        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                            <Heart className="w-3 h-3" fill="white" />
                                            Saved
                                        </div>
                                    </div>
                                    
                                    {/* Image Container */}
                                    <div className="relative h-64 overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-100 to-gray-50">
                                        <Image 
                                            src={image} 
                                            alt={title}
                                            fill 
                                            className={`object-cover transition-transform duration-700 ${
                                                isHovered ? 'scale-110' : 'scale-100'
                                            }`}
                                        />
                                        
                                        {/* Overlay Actions */}
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4 transition-opacity duration-300 ${
                                            isHovered ? 'opacity-100' : 'opacity-0'
                                        }`}>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleViewDetails(id)} className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
                                                    <Eye className="w-5 h-5 text-gray-700" />
                                                </button>
                                                <button onClick={() => handleAddToCart(id)} disabled={addingItems.has(id)} className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform disabled:opacity-60">
                                                    <ShoppingCart className="w-5 h-5 text-gray-700" />
                                                </button>
                                                <button className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
                                                    <Share2 className="w-5 h-5 text-gray-700" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-5">
                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                            <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                                        </div>
                                        
                                        <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors">
                                            {title}
                                        </h3>
                                        
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                                    {price.toLocaleString()} 
                                                </span>
                                                <span className="text-sm text-gray-500 ml-1">EGP</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-green-600 text-sm">
                                                <TrendingUp className="w-4 h-4" />
                                                <span>In Stock</span>
                                            </div>
                        </div>
                                        
                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <Button 
                                                onClick={() => handleAddToCart(id)}
                                                disabled={addingItems.has(id)}
                                                className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all disabled:opacity-60"
                                            >
                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                {addingItems.has(id) ? 'Adding...' : 'Add to Cart'}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => handleRemove(id)}
                                                className="border-pink-200 hover:bg-pink-50 hover:border-pink-300 transition-all"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                            </div>
                        </div>
                    </div>
                            );
                        } else {
                            // List View
                            return (
                                <div
                                    key={id}
                                    className={`
                                        bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6
                                        transform transition-all duration-500
                                        ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                                        ${isRemoving ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
                                    `}
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Image */}
                                        <div className="relative w-full md:w-48 h-48 flex-shrink-0 overflow-hidden rounded-xl">
                                            <Image 
                                                src={image} 
                                                alt={title}
                                                fill 
                                                className="object-cover hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                        {title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                            ))}
                                                        </div>
                                                        <span className="text-sm text-gray-500">(4.8 • 234 reviews)</span>
                                                        <span className="text-green-600 text-sm flex items-center gap-1">
                                                            <TrendingUp className="w-4 h-4" />
                                                            In Stock
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                                        {price.toLocaleString()}
                                                    </div>
                                                    <div className="text-sm text-gray-500">EGP</div>
                                                </div>
                                            </div>
                                            
                                            <p className="text-gray-600 mb-4 line-clamp-2">
                                                Premium quality product with excellent features and modern design. 
                                                Perfect for your daily needs and lifestyle.
                                            </p>
                                            
                                            {/* Actions */}
                                            <div className="flex flex-wrap gap-3">
                                                <Button 
                                                    onClick={() => handleAddToCart(id)}
                                                    disabled={addingItems.has(id)}
                                                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all disabled:opacity-60"
                                                >
                                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                                    {addingItems.has(id) ? 'Adding...' : 'Add to Cart'}
                                                </Button>
                                                <Button variant="outline" className="border-gray-300" onClick={() => handleViewDetails(id)}>
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View Details
                                                </Button>
                                                <Button variant="outline" className="border-gray-300">
                                                    <Share2 className="w-4 h-4 mr-2" />
                                                    Share
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleRemove(id)}
                                                    className="border-pink-200 hover:bg-pink-50 hover:border-pink-300 ml-auto"
                                                >
                                                    <X className="w-4 h-4 mr-2" />
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
            </div>
        </div>
                            );
                        }
                    })}
                </div>
                
                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <Link href="/">
                        <Button 
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            <Sparkles className="w-5 h-5 mr-2" />
                            Discover More Products
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}