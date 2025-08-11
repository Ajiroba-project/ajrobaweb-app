'use client'
import Image from 'next/image'
import carousel from '../asset/image/carousel.png'
import buyticket from '../asset/image/buy_ticket.svg'
import auction_one from '../asset/image/auction_one.svg'
import auction_and_win from '../asset/image/enter_and_win.png'
import rafledraw from '../asset/image/raffle_draw.svg'
import recharge_and_win from '../asset/image/recharge_and_win.svg'
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
        {/* Mobile: default size */}
        <div className="relative w-auto h-auto block lg:hidden">
          <Image src={auction_one} alt="carousel" />
        </div>
        {/* Desktop: fill container */}
        <div className="relative w-full aspect-[16/6] hidden lg:block">
          <Image src={auction_one} alt="carousel" fill style={{ objectFit: 'cover' }} />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative w-auto h-auto block lg:hidden">
          <Image src={buyticket} alt="carousel" />
        </div>
        <div className="relative w-full aspect-[16/6] hidden lg:block">
          <Image src={buyticket} alt="carousel" fill style={{ objectFit: 'cover' }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-auto h-auto block lg:hidden">
          <Image src={auction_and_win} alt="carousel" />
        </div>
        <div className="relative w-full aspect-[16/6] hidden lg:block">
          <Image src={auction_and_win} alt="carousel" fill style={{ objectFit: 'cover' }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-auto h-auto block lg:hidden">
          <Image src={rafledraw} alt="carousel" />
        </div>
        <div className="relative w-full aspect-[16/6] hidden lg:block">
          <Image src={rafledraw} alt="carousel" fill style={{ objectFit: 'cover' }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-auto h-auto block lg:hidden">
          <Image src={recharge_and_win} alt="carousel" />
        </div>
        <div className="relative w-full aspect-[16/6] hidden lg:block">
          <Image src={recharge_and_win} alt="carousel" fill style={{ objectFit: 'cover' }} />
        </div>
      </SwiperSlide>
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
