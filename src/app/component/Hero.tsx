'use client'
// import { useState } from 'react'
// import { SideMenu, MobileSideMenu } from './SideMenu'
import Image from 'next/image'
import { Carousel } from './Carousel'
import { marqueeInfo } from '../static-data'
import { AuctionMarquee } from './Auction-Marquee'
// import { FiMenu } from 'react-icons/fi'
// import { IoClose } from 'react-icons/io5'
// import { useQueryData } from '@/hooks/useQueryData'
import phoneOne from '../asset/whyusphoneone.png'
import phoneTwo from '../asset/whyusphonetwo.png'
import phoneThree from '../asset/whyusphonethree.png'
import appleStoreBadge from '../asset/appleplayone.png'
import googleStoreBadge from '../asset/googleplayicon.png'
import qualityIcon from '../asset/qualityicon.png'
import timelyIcon from '../asset/timelyicon.png'
import affordabilityIcon from '../asset/affordabilityicon.png'
import consistencyIcon from '../asset/consistencyicon.png'
import credibilityIcon from '../asset/credibilityicon.png'

// type menuprops = boolean | null

export const Hero = () => {
  // const [active, setActive] = useState<menuprops>(false)
  
  // Add loading state for categories (used in SideMenu)
  // const { isLoading: categoriesLoading } = useQueryData(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`, 
  //   ["get categories_and_subcategories"], 
  //   true
  // )

  return (
    <>
      <section className='flex flex-col mt-4 md:mt-0'>
        <div className='container mx-auto flex flex-col px-4 sm:px-6 md:px-8 lg:px-12'>
          <div className='w-full lg:h-[500px]'>
            <Carousel isLoading={false} />
          </div>
        </div>

        {/* <div className='flex flex-col items-center bg-[#F6F6F6] lg:hidden '>
          <div
            style={{
              zIndex: 21,
            }}
            className='w-full relative py-3 px-4'
          >
            <div className='z-40 flex items-center gap-3'>
              <FiMenu className='w-2xl cursor-pointer' />
              <p className='cursor-pointer text-sm font-medium'>Categories</p>
            </div>
            <div className='absolute left-0 right-0 mt-2 rounded-md shadow-lg border border-gray-200 bg-white z-50'>
              <MobileSideMenu />
            </div>
          </div>
        </div> */}

        {/* <div className='hidden bg-[#F6F6F6] lg:block lg:h-[500px]'>
          <SideMenu />
        </div> */}

        <div className='my-4 bg-[#F25E26] p-4 text-white '>
          <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-12'>
            <AuctionMarquee info={marqueeInfo} isLoading={false} />
          </div>
        </div>
      </section>

      <section className='relative overflow-hidden bg-[#FCE2D6] pb-20 pt-16 sm:pt-20 lg:pt-24'>
        <div className='container relative z-10 mx-auto grid grid-cols-1 gap-12 px-4 sm:px-6 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:px-12'>
          <div className='flex flex-col justify-center text-[#2A2A2A] max-w-2xl'>
            <h2 className='text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#F25E26] leading-tight'>
              Why Ajiroba?
            </h2>
            <p className='mt-6 text-base leading-relaxed text-[#4B4848] sm:text-lg'>
              At Ajiroba, we&apos;re passionate about creating unforgettable moments of joy and anticipation. Our journey
              began with a simple idea: to provide a platform where individuals can participate in fair and transparent
              raffle draws for a chance to win amazing prizes so they can continue to live like kings and queens.
            </p>
            {/* <p className='mt-4 text-base leading-relaxed text-[#4B4848] sm:text-lg'>
              From sign up to live raffle reveals, every step is simple, secure, and rewarding. Create your profile,
              fund your wallet, place a bid, and join the live draw — we&apos;ll notify you instantly when you win.
            </p> */}
          </div>

          <div className='flex items-center justify-center'>
            <div className='relative flex w-full max-w-[760px] flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-8 lg:gap-2'>
              <Image
                src={phoneOne}
                alt='About us screen'
                className='w-[200px] sm:w-[190px] md:w-[210px] lg:w-[220px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]'
                priority
              />
              <Image
                src={phoneTwo}
                alt='Raffle draw procedure screen'
                className='w-[180px] sm:w-[190px] md:w-[210px] lg:w-[220px] drop-shadow-[0_28px_55px_rgba(0,0,0,0.2)]'
                priority
              />
              <Image
                src={phoneThree}
                alt='How the raffle draw works screen'
                className='w-[200px] sm:w-[190px] md:w-[210px] lg:w-[220px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]'
                priority
              />
            </div>
          </div>
        </div>

        <div className='container relative z-20 mx-auto mt-12 px-4 sm:px-6 md:px-8 lg:px-12'>
          <div className='flex flex-col justify-center sm:justify-end items-center sm:items-center gap-4 sm:flex-row sm:gap-6'>
            <p className='text-center text-sm font-medium text-[#4B4848] sm:text-base'>
              You can download our mobile app on:
            </p>
            <div className='flex items-center gap-3 sm:gap-4'>
              <a href='#' aria-label='Get it on Google Play' className='inline-flex'>
                <Image src={googleStoreBadge} alt='Google Play Store' className='h-10 w-auto' priority />
              </a>
              <a href='#' aria-label='Download on the App Store' className='inline-flex'>
                <Image src={appleStoreBadge} alt='Apple App Store' className='h-10 w-auto' priority />
              </a>
            </div>
          </div>
        </div>

        <div className='absolute inset-x-0 bottom-0 h-24 sm:h-28 lg:h-32 overflow-hidden'>
          <svg
            className='h-full w-full text-white'
            viewBox='0 0 1440 200'
            preserveAspectRatio='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0 135L120 128C240 121 480 107 720 112C960 117 1200 141 1320 153L1440 165V200H0V135Z'
              fill='currentColor'
            />
          </svg>
        </div>
      </section>

      <section className='bg-white py-16 sm:py-20 lg:py-24'>
        <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-12'>
          <div className='text-center'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-[#F25E26]'>Our Key Attribute</h2>
            <p className='mt-2 text-sm sm:text-base text-[#4B4848]'>Our key attributes are:</p>
          </div>

          <div className='mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-12'>
            <div className='flex flex-col items-center text-center space-y-3 transition-transform duration-200 hover:scale-105'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-black transition-colors duration-200 hover:bg-[#F25E26]'>
                <Image src={qualityIcon} alt='Quality icon' className='h-10 w-10' priority />
              </div>
              <p className='text-sm font-medium text-[#2A2A2A] sm:text-base'>Quality</p>
            </div>

            <div className='flex flex-col items-center text-center space-y-3 transition-transform duration-200 hover:scale-105'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-black transition-colors duration-200 hover:bg-[#F25E26]'>
                <Image src={timelyIcon} alt='Timely Delivery icon' className='h-10 w-10' priority />
              </div>
              <p className='text-sm font-medium text-[#2A2A2A] sm:text-base'>Timely Delivery</p>
            </div>

            <div className='flex flex-col items-center text-center space-y-3 transition-transform duration-200 hover:scale-105'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-black transition-colors duration-200 hover:bg-[#F25E26]'>
                <Image src={affordabilityIcon} alt='Affordability icon' className='h-10 w-10' priority />
              </div>
              <p className='text-sm font-medium text-[#2A2A2A] sm:text-base'>Affordability</p>
            </div>

            <div className='flex flex-col items-center text-center space-y-3 transition-transform duration-200 hover:scale-105'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-black transition-colors duration-200 hover:bg-[#F25E26]'>
                <Image src={consistencyIcon} alt='Consistency icon' className='h-10 w-10' priority />
              </div>
              <p className='text-sm font-medium text-[#2A2A2A] sm:text-base'>Consistency</p>
            </div>

            <div className='flex flex-col items-center text-center space-y-3 transition-transform duration-200 hover:scale-105 sm:col-span-2 sm:justify-self-center lg:col-span-1'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-black transition-colors duration-200 hover:bg-[#F25E26]'>
                <Image src={credibilityIcon} alt='Credibility icon' className='h-10 w-10' priority />
              </div>
              <p className='text-sm font-medium text-[#2A2A2A] sm:text-base'>Credibility</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
