'use client'


import React from 'react'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { ArrowBigLeft } from 'lucide-react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Autoplay } from 'swiper/modules';




export default function MainSlider() {
    return (
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="container mx-auto px-4">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 120,
              modifier: 1.5,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3 !mx-2',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !scale-125'
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="main-slider !pb-16"
          >
            <SwiperSlide className="!w-full max-w-6xl">
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image loading='eager' priority src="/Silder/0001.jpg" alt="slider-images" fill sizes='100vw' className='object-cover'/>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-1/2 left-8 md:left-16 lg:left-24 transform -translate-y-1/2 w-full max-w-xl">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-lg">Welcome to our website</h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-6 text-white/90 drop-shadow-md">We are here to help you find amazing products</p>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">Shop Now <ArrowBigLeft className="ml-2" /></Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
  
            <SwiperSlide className="!w-full max-w-6xl">
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image loading='eager' src="/Silder/0002.jpg" alt="slider-images" fill sizes='100vw' className='object-cover'/>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-1/2 left-8 md:left-16 lg:left-24 transform -translate-y-1/2 w-full max-w-xl">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent drop-shadow-lg">Discover New Collections</h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-6 text-white/90 drop-shadow-md">Explore our latest trending products</p>
                    <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 px-8 py-4 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">Shop Now <ArrowBigLeft className="ml-2" /></Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
  
            <SwiperSlide className="!w-full max-w-6xl">
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image loading='eager' src="/Silder/0003.png" alt="slider-images" fill sizes='100vw' className='object-cover'/>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-1/2 left-8 md:left-16 lg:left-24 transform -translate-y-1/2 w-full max-w-xl">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-red-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg">Premium Quality</h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-6 text-white/90 drop-shadow-md">Experience the best quality products</p>
                    <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 px-8 py-4 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">Shop Now <ArrowBigLeft className="ml-2" /></Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
  
            <SwiperSlide className="!w-full max-w-6xl">
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image loading='eager' src="/Silder/0004.jpg" alt="slider-images" fill sizes='100vw' className='object-cover'/>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"></div>
                <div className="absolute top-1/2 left-8 md:left-16 lg:left-24 transform -translate-y-1/2 w-full max-w-xl">
                  <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/30 shadow-2xl">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-2xl">Special Offers</h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-6 text-white/90 drop-shadow-md">Don&apos;t miss our exclusive deals</p>
                    <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-8 py-4 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">Shop Now <ArrowBigLeft className="ml-2" /></Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
  
            <SwiperSlide className="!w-full max-w-6xl">
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image loading='eager' src="/Silder/0005.png" alt="slider-images" fill sizes='100vw' className='object-cover'/>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-purple-900/20 to-transparent"></div>
                <div className="absolute top-1/2 left-8 md:left-16 lg:left-24 transform -translate-y-1/2 w-full max-w-xl">
                  <div className="bg-purple-900/20 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-purple-300/30 shadow-2xl">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">Luxury Collection</h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-6 text-white/90 drop-shadow-md">Indulge in our premium selection</p>
                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-4 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">Shop Now <ArrowBigLeft className="ml-2" /></Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
  
            <SwiperSlide className="!w-full max-w-6xl">
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image loading='eager' src="/Silder/0006.webp" alt="slider-images" fill sizes='100vw' className='object-cover'/>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-purple-900/20 to-transparent"></div>
                <div className="absolute top-1/2 left-8 md:left-16 lg:left-24 transform -translate-y-1/2 w-full max-w-xl">
                  <div className="bg-purple-900/20 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-purple-300/30 shadow-2xl">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">Trending Now</h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-6 text-white/90 drop-shadow-md">Get the hottest items today</p>
                    <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-8 py-4 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">Shop Now <ArrowBigLeft className="ml-2" /></Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
  
          </Swiper>
          
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full blur-xl"></div>
        </div>
      </div>
    )
  }


// export default function MainSilder() {
//   return (
//     <>
//       <div className="container mx-auto">
//       <Swiper
//         effect={'coverflow'}
//         grabCursor={true}
//         centeredSlides={true}
//         slidesPerView={'auto'}
//         coverflowEffect={{
//           rotate: 50,
//           stretch: 0,
//           depth: 100,
//           modifier: 1,
//           slideShadows: true,
//         }}
//         pagination={true}
//         modules={[EffectCoverflow, Pagination]}
//         className="mySwiper"
//       >
//         <SwiperSlide>
//             <div className="relative h-[700px] w-full">
//                 <Image loading='eager' priority src="/Silder/0001.jpg" alt="slider-images" fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className='object-cover'/>
//                 <div className="absolute top-[400px] left-[100px] w-[500px] ">
//                     <h1 className="text-4xl font-bold my-6 text-transparent bg-gradient-to-r from-black to-white bg-clip-text">Welcome to our website</h1>
//                     <p className="text-2xl my-5 text-transparent bg-gradient-to-r from-black to-white bg-clip-text">We are here to help you</p>
//                     <Button className="bg-black px-10 py-6 text-white">Shop Now <ArrowBigLeft className="ml-2" />{" "}</Button>
//                 </div>
//             </div>
//         </SwiperSlide>

//         <SwiperSlide>
//             <div className="relative h-[700px] w-full">
//                 <Image loading='eager' src="/Silder/0002.jpg" alt="slider-images" fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className='object-cover'/>
//                 <div className="absolute top-[400px] left-[100px] w-[500px] ">
//                     <h1 className="text-4xl font-bold my-6 text-transparent bg-gradient-to-r from-black to-white bg-clip-text">Welcome to our website</h1>
//                     <p className="text-2xl my-5 text-transparent bg-gradient-to-r from-black to-white bg-clip-text">We are here to help you</p>
//                     <Button className="bg-black px-10 py-6 text-white">Shop Now <ArrowBigLeft className="ml-2" />{" "}</Button>
//                 </div>
//             </div>
//         </SwiperSlide>


//         <SwiperSlide>
//             <div className="relative h-[700px] w-full">
//                 <Image loading='eager' src="/Silder/0003.png" alt="slider-images" fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className='object-cover'/>
//                 <div className="absolute top-[400px] left-[100px] w-[500px] ">
//                     <h1 className="text-4xl font-bold my-6 text-transparent bg-gradient-to-r from-green-600 to-red-600 bg-clip-text">Welcome to our website</h1>
//                     <p className="text-2xl my-5 text-transparent bg-gradient-to-r from-green-600 to-red-600 bg-clip-text">We are here to help you</p>
//                     <Button className="bg-black px-10 py-6 text-white">Shop Now <ArrowBigLeft className="ml-2" />{" "}</Button>
//                 </div>
//             </div>
//         </SwiperSlide>

//         <SwiperSlide>
//             <div className="relative h-[700px] w-full">
//                 <Image loading='eager' src="/Silder/0004.jpg" alt="slider-images" fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className='object-cover'/>
//                 <div className="absolute top-[400px] left-[100px] w-[500px] ">
//                     <h1 className="text-4xl font-bold my-6 text-transparent bg-gradient-to-r from-white to-white bg-clip-text">Welcome to our website</h1>
//                     <p className="text-2xl my-5 text-transparent bg-gradient-to-r from-white to-white bg-clip-text">We are here to help you</p>
//                     <Button className="bg-black px-10 py-6 text-white">Shop Now <ArrowBigLeft className="ml-2" />{" "}</Button>
//                 </div>
//             </div>
//         </SwiperSlide>


//         <SwiperSlide>
//             <div className="relative h-[700px] w-full">
//                 <Image loading='eager' src="/Silder/0005.png" alt="slider-images" fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className='object-cover'/>
//                 <div className="absolute top-[400px] left-[100px] w-[500px] ">
//                     <h1 className="text-4xl font-bold my-6 text-transparent bg-gradient-to-r from-purple-600 to-indigo-800 bg-clip-text">Welcome to our website</h1>
//                     <p className="text-2xl my-5 text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">We are here to help you</p>
//                     <Button className="bg-black px-10 py-6 text-white">Shop Now <ArrowBigLeft className="ml-2" />{" "}</Button>
//                 </div>
//             </div>
//         </SwiperSlide>


//         <SwiperSlide>
//             <div className="relative h-[700px] w-full">
//                 <Image loading='eager' src="/Silder/0006.webp" alt="slider-images" fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className='object-cover'/>
//                 <div className="absolute top-[400px] left-[100px] w-[500px] ">
//                     <h1 className="text-4xl font-bold my-6 text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">Welcome to our website</h1>
//                     <p className="text-2xl my-5 text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">We are here to help you</p>
//                     <Button className="bg-black px-10 py-6 text-white">Shop Now <ArrowBigLeft className="ml-2" />{" "}</Button>
//                 </div>
//             </div>
//         </SwiperSlide>

//       </Swiper>
        
//       </div>
//     </>
//   )
// }
