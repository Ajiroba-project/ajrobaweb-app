'use client'
import { useState } from 'react'
import { SideMenu, MobileSideMenu } from './SideMenu'
import { Carousel } from './Carousel'
import { marqueeInfo } from '../static-data'
import { AuctionMarquee } from './Auction-Marquee'
import { FiMenu } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

type menuprops = boolean | null

export const Hero = () => {
  const [active, setActive] = useState<menuprops>(false)
  return (
    <>
      <section className='flex flex-col '>
        <div className=''>
          <div className='flex flex-col md:grid-cols-3 lg:grid lg:grid-cols-3'>
            <div className='flex flex-col items-center bg-[#F6F6F6] lg:hidden '>
              <div className='container relative py-4'>
                <div
                  className='z-40 flex items-center gap-4'
                  onClick={() => {
                    setActive(!active ? !active : null)
                  }}
                >
                  {active ? (
                    <IoClose className='w-2xl cursor-pointer' />
                  ) : (
                    <FiMenu className='w-2xl cursor-pointer' />
                  )}
                  <p className='cursor-pointer '> Categories </p>
                </div>

                {active && (
                  <div className='top-2.8 absolute left-0  z-30 h-full w-full'>
                    <MobileSideMenu />
                  </div>
                )}
              </div>
            </div>

            <div className='hidden bg-[#F6F6F6] lg:block '>
              <SideMenu />
            </div>

            <div className='col-span-3 lg:col-span-2  lg:mr-12'>
              <Carousel />
            </div>
          </div>
        </div>

        <div className='my-4 bg-[#F25E26] p-4 text-white '>
          <div className=' p-2 px-5'>
            <AuctionMarquee info={marqueeInfo} />
          </div>
        </div>
      </section>
    </>
  )
}
