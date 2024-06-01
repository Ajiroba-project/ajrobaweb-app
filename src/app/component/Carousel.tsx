'use client'
import Image from 'next/image'
import carousel from '../asset/image/carousel.png'
import {
  Navigation,
  Pagination,
  A11y,
  EffectFade,
  Autoplay
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export const CarouselSwiper = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, A11y, EffectFade, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false
      }}
      loop={true}
      pagination={{ clickable: true }}
      effect='fade'
      fadeEffect={{ crossFade: true }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        disabledClass: 'swiper-button-disabled'
      }}
    >
      <SwiperSlide>
        <Image src={carousel} alt='carousel' />
      </SwiperSlide>

      <SwiperSlide>
        {' '}
        <Image src={carousel} alt='carousel' />
      </SwiperSlide>
      <SwiperSlide>
        {' '}
        <Image src={carousel} alt='carousel' />
      </SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  )
}

export const Carousel = () => {
  return (
    <div className='relative '>
      <CarouselSwiper />
      <div className='swiper-button-next  !w-[35px]  rounded-full bg-[#fcdfd4] !p-[10px] !text-[15px] !h-auto !text-[#f25e26] after:!text-[15px]'></div>
      <div className='swiper-button-prev  !w-[35px]  rounded-full border-2 border-white bg-transparent !p-[10px] !text-[15px] !text-white after:!text-[15px] !h-auto'></div>
    </div>
  )
}
