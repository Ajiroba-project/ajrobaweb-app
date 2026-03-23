'use client'
import Image from 'next/image'
import buyticket from '../asset/image/buy_ticket.webp'
import auction_one from '../asset/image/raffledraw.webp'
import auction_and_win from '../asset/image/enter_and_win_main_demo.webp'
import rafledraw from '../asset/image/raffle_draw.webp'
import recharge_and_win from '../asset/image/recharge_and_win.webp'
import {
  Navigation,
  Pagination,
  A11y,
  EffectFade,
  Autoplay
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { CarouselSkeleton } from './LoadingSkeleton'

const slides = [
  { src: auction_one, alt: 'Auction carousel' },
  { src: buyticket, alt: 'Buy ticket carousel' },
  { src: auction_and_win, alt: 'Enter and win carousel' },
  { src: rafledraw, alt: 'Raffle draw carousel' },
  { src: recharge_and_win, alt: 'Recharge and win carousel' },
]

const imageSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1440px"

export const CarouselSwiper = () => {
  return (
    <Swiper
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
      className="carousel-swiper w-full h-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.alt}>
          <div className="relative w-full h-full">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority
              quality={100}
              sizes={imageSizes}
              className="object-cover object-center"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export const Carousel = ({ isLoading = false }: { isLoading?: boolean }) => {
  if (isLoading) {
    return <CarouselSkeleton />
  }

  return (
    <div className='relative aspect-[2/1] sm:aspect-[2.4/1] md:h-[360px] md:aspect-auto lg:h-[620px] w-full'>
      <CarouselSwiper />
      <div className='swiper-button-next !w-[28px] sm:!w-[35px] rounded-full bg-[#fcdfd4] !p-[8px] sm:!p-[10px] !text-[12px] sm:!text-[15px] !h-auto !text-[#f25e26] after:!text-[12px] sm:after:!text-[15px]'></div>
      <div className='swiper-button-prev !w-[28px] sm:!w-[35px] rounded-full border-2 border-white bg-transparent !p-[8px] sm:!p-[10px] !text-[12px] sm:!text-[15px] !text-white after:!text-[12px] sm:after:!text-[15px] !h-auto'></div>
    </div>
  )
}
