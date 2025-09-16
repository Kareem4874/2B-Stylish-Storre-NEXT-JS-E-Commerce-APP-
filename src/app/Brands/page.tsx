'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import SplitText from '@/components/SplitText';
import { Brand, BrandsResponse } from '../Type/Brands.model';
import { getBrands } from '../actions/Brands.action';


interface MousePosition {
  x: number;
  y: number;
}

const handleAnimationComplete = () => {
  console.log('Text animation completed');
};

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Fetch brands data
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const result = await getBrands();
        if (result?.data) {
          setBrands(result.data);
        } else {
          setError('Failed to load brands. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        setError('Failed to load brands. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  // Mouse movement tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setMousePos({ x, y });

    // Update custom cursor
    if (cursorRef.current) {
      cursorRef.current.style.left = e.clientX + 'px';
      cursorRef.current.style.top = e.clientY + 'px';
    }
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
          
          {/* Animated grid */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
                style={{
                  top: `${i * 5}%`,
                  left: '0',
                  right: '0',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 border-2 border-white/20 rounded-full animate-spin">
                <div className="absolute top-0 left-0 w-20 h-20 border-2 border-transparent border-t-white rounded-full animate-pulse" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-light mb-4 animate-pulse">Loading Brands</h2>
            <div className="flex justify-center space-x-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20" />
        
        <div className="relative z-10 text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <div className="relative">
              <div className="w-24 h-24 border-2 border-red-500 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="absolute -inset-4 border border-red-500/20 rounded-full animate-ping" />
            </div>
          </div>
          
          <h1 className="text-3xl font-light mb-4">Something went wrong</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">{error}</p>
          
          <button 
            onClick={() => window.location.reload()}
            className="group relative px-8 py-3 bg-transparent border border-white/20 rounded-full font-light tracking-wider hover:border-white/40 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Try Again</span>
            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>
      </div>
    );
  }

  return (  
    
    <div className="min-h-screen bg-black text-white relative overflow-hidden" ref={containerRef}>
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full bg-white rounded-full scale-0 animate-pulse" 
            style={{ animation: 'cursor-pulse 2s infinite' }} />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Dynamic gradient based on mouse position */}
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
                        rgba(99, 102, 241, 0.1) 0%, 
                        rgba(168, 85, 247, 0.05) 25%, 
                        rgba(236, 72, 153, 0.05) 50%, 
                        transparent 70%)`
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-particle ${3 + Math.random() * 4}s infinite linear`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <SplitText
              text="Premium Brands"
              className="text-6xl md:text-8xl font-thin mb-6 tracking-tighter"
              delay={100}
              duration={1.5}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 100, rotateX: -90 }}
              to={{ opacity: 1, y: 0, rotateX: 0 }}
              threshold={0.1}
              rootMargin="-50px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
            
            <div className="relative">
              <p className="text-xl font-light text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover our carefully curated collection of premium brands that define excellence and innovation.
              </p>
              
              <div className="flex items-center justify-center space-x-8 mb-12">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <span className="text-sm font-light tracking-widest text-gray-500">
                  {brands.length} BRANDS
                </span>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex justify-center mb-8">
              <div className="relative p-1 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`relative px-6 py-2 rounded-full font-light text-sm transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'text-black bg-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`relative px-6 py-2 rounded-full font-light text-sm transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'text-black bg-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pb-20">
        <div className="container mx-auto px-6">
          {brands.length === 0 ? (
            <div className="text-center py-20">
              <div className="relative">
                <div className="w-32 h-32 border border-white/10 rounded-full mx-auto mb-8 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-gray-400 text-xl font-light">No brands available</p>
              </div>
            </div>
          ) : (
            <div className={`transition-all duration-500 ${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
                : 'space-y-6 max-w-4xl mx-auto'
            }`}>
              {brands.map((brand, index) => (
                <div
                  key={brand._id}
                  className={`group relative opacity-0 animate-fade-in-up ${
                    viewMode === 'list' ? 'flex items-center space-x-6 p-6' : ''
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                  onMouseEnter={() => setSelectedBrand(brand._id)}
                  onMouseLeave={() => setSelectedBrand(null)}
                >
                  {viewMode === 'grid' ? (
                    // Grid View
                    <div className="relative">
                      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-500">
                        <Image
                          src={brand.image}
                          alt={brand.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Hover Content */}
                        <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                          <div>
                            <h3 className="text-white font-light text-xl mb-2">{brand.name}</h3>
                            <div className="flex items-center text-white/70 text-sm">
                              <span>Explore Brand</span>
                              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        {/* Selection indicator */}
                        {selectedBrand === brand._id && (
                          <div className="absolute inset-0 border-2 border-white rounded-2xl animate-pulse" />
                        )}
                      </div>
                      
                      <div className="mt-4 text-center">
                        <h3 className="font-light text-lg group-hover:text-white transition-colors duration-300">
                          {brand.name}
                        </h3>
                      </div>
                    </div>
                  ) : (
                    // List View
                    <>
                      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <Image
                          src={brand.image}
                          alt={brand.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="96px"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-light mb-2 group-hover:text-white transition-colors">
                          {brand.name}
                        </h3>
                        <p className="text-gray-400 text-sm font-light">
                          Premium brand collection
                        </p>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-particle {
          0% {
            transform: translateY(100vh) rotate(0deg);
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
          }
        }
        
        @keyframes cursor-pulse {
          0%, 100% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(1);
            opacity: 0.5;
          }
        }
        
        @keyframes morph-1 {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            border-radius: 50%;
          }
          25% {
            transform: scale(1.2) rotate(90deg);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          50% {
            transform: scale(0.8) rotate(180deg);
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          }
          75% {
            transform: scale(1.1) rotate(270deg);
            border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%;
          }
        }
        
        @keyframes morph-2 {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          33% {
            transform: scale(1.3) rotate(120deg);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          66% {
            transform: scale(0.7) rotate(240deg);
            border-radius: 70% 30% 40% 60% / 40% 70% 60% 30%;
          }
        }
        
        @keyframes morph-3 {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%;
          }
          50% {
            transform: scale(1.4) rotate(180deg);
            border-radius: 60% 40% 40% 60% / 60% 60% 40% 40%;
          }
        }
        
        @keyframes morph-4 {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
          }
          25% {
            transform: scale(0.9) rotate(90deg);
            border-radius: 80% 20% 20% 80% / 80% 80% 20% 20%;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            border-radius: 20% 80% 80% 20% / 20% 20% 80% 80%;
          }
          75% {
            transform: scale(1.1) rotate(270deg);
            border-radius: 60% 40% 40% 60% / 40% 60% 60% 40%;
          }
        }
        
        @keyframes matrix-fall {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        @keyframes dna-rotate {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }
        
        @keyframes dna-connect {
          0%, 100% {
            transform: scaleX(0);
            opacity: 0;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
          }
        }
        
        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-morph-1 {
          animation: morph-1 6s ease-in-out infinite;
        }
        
        .animate-morph-2 {
          animation: morph-2 8s ease-in-out infinite;
        }
        
        .animate-morph-3 {
          animation: morph-3 10s ease-in-out infinite;
        }
        
        .animate-morph-4 {
          animation: morph-4 7s ease-in-out infinite;
        }
        
        .animate-matrix-fall {
          animation: matrix-fall 3s linear infinite;
        }
        
        .animate-dna-rotate {
          animation: dna-rotate 3s linear infinite;
        }
        
        .animate-dna-connect {
          animation: dna-connect 2s ease-in-out infinite;
        }
        
        .animate-typewriter {
          animation: typewriter 2s steps(20) infinite;
        }
        
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}