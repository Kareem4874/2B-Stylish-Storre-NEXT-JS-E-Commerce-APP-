"use client"
import React from 'react'
import { Categories } from '@/app/Type/Category.model'
import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from 'next/image';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';    

export default function CategoriesSilder({categories}: {categories: Categories[]}) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-6 ">
      <h1 className="text-lg font-bold text-gray-800 mb-5 gap-2 pb-2 border-b border-gray-100 flex justify-center items-center text-center">
        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
        <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Categories</span>
      </h1>
      
      <Swiper 
        slidesPerView={1}
        spaceBetween={15}
        // إعدادات التشغيل التلقائي المستمر
        autoplay={{
          delay: 0, // بدون توقف - حركة مستمرة
          disableOnInteraction: false, // يستمر التشغيل بعد التفاعل
          pauseOnMouseEnter: true, // يتوقف عند وضع الماوس عليه
          reverseDirection: false, // اتجاه الحركة
        }}
        speed={3000} // سرعة الانتقال بطيئة (4 ثوانِ)
        // إعدادات النقاط
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-gray-300 !w-2 !h-2',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-red-500'
        }}
        // إعدادات الشاشات المختلفة
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: 20 },
          1536: { slidesPerView: 6, spaceBetween: 25 }
        }}
        // تكرار الشرائح للتشغيل المستمر
        loop={true}
        // جعل الحركة أكثر سلاسة
        allowTouchMove={true} // السماح بالسحب
        centeredSlides={false}
        // الوحدات المطلوبة
        modules={[Pagination, Autoplay]}
        className="categories-slider !pb-8"
      >
        {categories?.map((cat) => (
          <SwiperSlide key={cat._id}>
            <div className="group cursor-pointer hover:transform hover:scale-[1.02] transition-all duration-200">
              <div className="relative h-40 w-full rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 mb-3">
                <Image 
                  loading='eager' 
                  priority 
                  src={cat.image} 
                  alt={`${cat.name} category`}
                  fill 
                  sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw' 
                  className='object-cover group-hover:scale-105 transition-transform duration-300'
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-200"></div>
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors duration-200 truncate px-1">
                {cat.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}