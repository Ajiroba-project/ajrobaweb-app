'use client'
import { useState } from 'react'
import { SideMenu, MobileSideMenu } from './SideMenu'
import { Carousel } from './Carousel'
import { marqueeInfo } from '../static-data'
import { AuctionMarquee } from './Auction-Marquee'
import { FiMenu } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { useQueryData } from '@/hooks/useQueryData'

type menuprops = boolean | null

export const Hero = () => {
  const [active, setActive] = useState<menuprops>(false)
  
  // Add loading state for categories (used in SideMenu)
  const { isLoading: categoriesLoading } = useQueryData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`, 
    ["get categories_and_subcategories"], 
    true
  )

  return (
    <>
      <section className='flex flex-col mt-4 md:mt-0 2xl:mt-0 lg:mt-0 xl:mt-0   '>
        <div className=''>
          <div className='flex flex-col md:grid-cols-3 lg:grid lg:grid-cols-3'>
            <div className='flex flex-col items-center bg-[#F6F6F6] lg:hidden '>
              <div style={{
                zIndex: 21
              }} className='container relative py-4'>
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
                  <div className='top-2.8 absolute left-0 h-full w-full'>
                     <MobileSideMenu />
                  </div>
                )}
              </div>
            </div>

            <div className='hidden bg-[#F6F6F6] lg:block '>
              <SideMenu />
            </div>

            <div className='col-span-3 lg:col-span-2  lg:mr-12'>
              <Carousel isLoading={false} />
            </div>
          </div>
        </div>

        <div className='my-4 bg-[#F25E26] p-4 text-white '>
          <div className=' p-2 px-5'>
            <AuctionMarquee info={marqueeInfo} isLoading={false} />
          </div>
        </div>
      </section>
    </>
  )
}
