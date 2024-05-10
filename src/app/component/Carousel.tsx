'use client'
import Image from 'next/image'
import carousel from '../asset/image/carousel.png'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export const CarouselSwiper = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    //   scrollbar={{ draggable: true }}
    //   onSwiper={(swiper) => console.log(swiper)}
    //   onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        <Image src={carousel} alt="carousel" />
      </SwiperSlide>

      <SwiperSlide> <Image src={carousel} alt="carousel" /></SwiperSlide>
      <SwiperSlide> <Image src={carousel} alt="carousel" /></SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  )
}

export const Carousel = () => {
  return (
    <div className="">
      <CarouselSwiper />
    </div>
  )
}
