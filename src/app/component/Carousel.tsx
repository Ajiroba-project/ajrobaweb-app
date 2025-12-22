'use client'
import Image from 'next/image'
import carousel from '../asset/image/carousel.png'
import buyticket from '../asset/image/buy_ticket.png'
import auction_one from '../asset/image/auction_one.png'
import auction_and_win from '../asset/image/enter_and_win_main_demo.webp'
import rafledraw from '../asset/image/raffle_draw.png'
import recharge_and_win from '../asset/image/recharge_and_win.png'
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
import { CarouselSkeleton } from './LoadingSkeleton'

export const CarouselSwiper = () => {

  const slideHeights =
  "relative w-full h-[220px] sm:h-[280px] md:h-[360px] lg:h-[500px]";
  
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
      className="h-[220px] sm:h-[280px] md:h-[360px] lg:h-[500px]"
    >
      <SwiperSlide>
        {/* Mobile: default size */}
        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] block lg:hidden">
          <Image src={auction_one} alt="carousel" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
        {/* Desktop: fill container */}
        <div className="relative w-full h-[500px] hidden lg:block">
          <Image src={auction_one} alt="carousel" fill priority sizes="(min-width: 1024px) 100vw, 100vw" style={{ objectFit: 'cover' }} />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] block lg:hidden">
          <Image src={buyticket} alt="carousel" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="relative w-full h-[500px] hidden lg:block">
          <Image src={buyticket} alt="carousel" fill sizes="(min-width: 1024px) 100vw, 100vw" style={{ objectFit: 'cover' }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] block lg:hidden">
          <Image src={auction_and_win} alt="carousel" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="relative w-full h-[500px] hidden lg:block">
          <Image src={auction_and_win} alt="carousel" fill sizes="(min-width: 1024px) 100vw, 100vw" style={{ objectFit: 'cover' }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] block lg:hidden">
          <Image src={rafledraw} alt="carousel" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="relative w-full h-[500px] hidden lg:block">
          <Image src={rafledraw} alt="carousel" fill sizes="(min-width: 1024px) 100vw, 100vw" style={{ objectFit: 'cover' }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] block lg:hidden">
          <Image src={recharge_and_win} alt="carousel" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="relative w-full h-[500px] hidden lg:block">
          <Image src={recharge_and_win} alt="carousel" fill sizes="(min-width: 1024px) 100vw, 100vw" style={{ objectFit: 'cover' }} />
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export const Carousel = ({ isLoading = false }: { isLoading?: boolean }) => {
  if (isLoading) {
    return <CarouselSkeleton />
  }

  return (
    <div className='relative h-[220px] sm:h-[280px] md:h-[360px] lg:h-[500px]'>
      <CarouselSwiper />
      <div className='swiper-button-next  !w-[35px]  rounded-full bg-[#fcdfd4] !p-[10px] !text-[15px] !h-auto !text-[#f25e26] after:!text-[15px]'></div>
      <div className='swiper-button-prev  !w-[35px]  rounded-full border-2 border-white bg-transparent !p-[10px] !text-[15px] !text-white after:!text-[15px] !h-auto'></div>
    </div>
  )
}
