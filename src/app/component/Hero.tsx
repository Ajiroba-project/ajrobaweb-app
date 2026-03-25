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
import whyUsImage from '../asset/image/whyajirobaimg.png'
import appleStoreBadge from '../asset/appleplayone.png'
import googleStoreBadge from '../asset/googleplayicon.png'
import appleplay from '../asset/image/appleplay.png'
import googleplay from '../asset/image/googleplay.png'
import qualityIcon from '../asset/qualityicon.png'
import timelyIcon from '../asset/timelyicon.png'
import affordabilityIcon from '../asset/affordabilityicon.png'
import consistencyIcon from '../asset/consistencyicon.png'
import credibilityIcon from '../asset/credibilityicon.png'
import whyBg from '../asset/image/whybg.png'

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
      <section className='flex flex-col mt-4 md:mt-0 '>
        <div className=' flex flex-col content-container'>
          <div className='w-full lg:h-[620px]'>
            <Carousel isLoading={false} />
          </div>
        </div>

        <div className='my-4 bg-[#F25E26] p-4 text-white '>
          <div className='content-container'>
            <AuctionMarquee info={marqueeInfo} isLoading={false} />
          </div>
        </div>
      </section>

      <section className='relative overflow-hidden  pb-20 pt-16 sm:pt-20 lg:pt-24 '>
        {/* Background Image */}
        <div className='absolute inset-0 z-0'>
          <Image
            src={whyBg}
            alt='Why Ajiroba background'
            fill
            sizes="100vw"
            className='object-cover object-center'
            priority
            quality={90}
          />
        </div>

        <div className='content-container relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20'>
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

            <Image
              src={whyUsImage}
              alt='About us screen'
              className=' drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]'
              sizes=''
              priority
              quality={90}
            />
            
          </div>
        </div>

        <div className='content-container relative z-20 mt-12'>
          <div className='flex flex-col justify-center sm:justify-end items-center sm:items-center gap-4 sm:flex-row sm:gap-6'>
            <p className='text-center text-sm font-medium text-[#4B4848] sm:text-base'>
              You can download our mobile app on:
            </p>
            <div className='flex items-center gap-3 sm:gap-4'>
              {/* Google Play Store Button */}
              <a
                href='#'
                aria-label='Get it on Google Play'
                className='inline-flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors duration-200 h-12 sm:h-14'
              >
                {/* Google Play Triangle Icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM14.54 11.15L6.05 2.66L16.81 8.88L14.54 11.15Z"
                    fill="white"
                  />
                </svg>
                <div className='flex flex-col items-start leading-tight'>
                  <span className='text-white text-xs sm:text-sm font-medium'>Google Play Store</span>
                  {/* <span className='text-white text-center items-center justify-center text-xs sm:text-sm font-medium'>Store</span> */}
                </div>
              </a>

              {/* Apple App Store Button */}
              <a
                href='#'
                aria-label='Download on the App Store'
                className='inline-flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 h-12 sm:h-14'
              >

                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  width="24" 
                  height="24" 
                  fill="none" 
                  className="flex-shrink-0"
                >
                  <path 
                    stroke="black" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" 
                  />
                </svg>

                <span className='text-black text-xs sm:text-sm font-medium whitespace-nowrap'>Apple Store</span>
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
      <div className='flex items-start content-container flex-col'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-[#F25E26]'>Our Key Attribute</h2>
            <p className='mt-2 text-sm sm:text-base text-[#4B4848]'>Our key attributes are:</p>
          </div>
        <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1440px]'>
         

          <div className='mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-12'>
            <div className='flex flex-col items-center text-center space-y-3 transition-transform duration-200 hover:scale-105'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-black transition-colors duration-200 hover:bg-[#F25E26]'>
                <Image
                  src={qualityIcon}
                  alt='Quality icon'
                  width={40}
                  height={40}
                  className='h-10 w-10'
                  priority
                  quality={90}
                />
              </div>
              <p className='text-sm font-medium text-[#2A2A2A] sm:text-base'>Quality</p>
            </div>

            <div className='flex flex-col items-center text-center space-y-3 transition-transform duration-200 hover:scale-105'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-black transition-colors duration-200 hover:bg-[#F25E26]'>
                <Image
                  src={timelyIcon}
                  alt='Timely Delivery icon'
                  width={40}
                  height={40}
                  className='h-10 w-10'
                  priority
                  quality={90}
                />
              </div>
              <p className='text-sm font-medium text-[#2A2A2A] sm:text-base'>Timely Delivery</p>
            </div>

            <div className='flex flex-col items-center text-center space-y-3 transition-transform duration-200 hover:scale-105'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-black transition-colors duration-200 hover:bg-[#F25E26]'>
                <Image
                  src={affordabilityIcon}
                  alt='Affordability icon'
                  width={40}
                  height={40}
                  className='h-10 w-10'
                  priority
                  quality={90}
                />
              </div>
              <p className='text-sm font-medium text-[#2A2A2A] sm:text-base'>Affordability</p>
            </div>

            <div className='flex flex-col items-center text-center space-y-3 transition-transform duration-200 hover:scale-105'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-black transition-colors duration-200 hover:bg-[#F25E26]'>
                <Image
                  src={consistencyIcon}
                  alt='Consistency icon'
                  width={40}
                  height={40}
                  className='h-10 w-10'
                  priority
                  quality={90}
                />
              </div>
              <p className='text-sm font-medium text-[#2A2A2A] sm:text-base'>Consistency</p>
            </div>

            <div className='flex flex-col items-center text-center space-y-3 transition-transform duration-200 hover:scale-105 sm:col-span-2 sm:justify-self-center lg:col-span-1'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-black transition-colors duration-200 hover:bg-[#F25E26]'>
                <Image
                  src={credibilityIcon}
                  alt='Credibility icon'
                  width={40}
                  height={40}
                  className='h-10 w-10'
                  priority
                  quality={90}
                />
              </div>
              <p className='text-sm font-medium text-[#2A2A2A] sm:text-base'>Credibility</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
