"use client"
import {useState} from 'react'
import { SideMenu, MobileSideMenu } from './SideMenu'
import { Carousel } from './Carousel'
import { marqueeInfo } from '../static-data'
import { AuctionMarquee } from './Auction-Marquee'
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

type menuprops = boolean | null

export const Hero = () => {
  const [active, setActive] = useState<menuprops>(false);
  return (
    <>
      <section className='flex flex-col '>
        <div className="">
            <div className='lg:grid lg:grid-cols-3 md:grid-cols-3 flex flex-col'>

              <div className="lg:hidden md:hidden bg-[#F6F6F6] flex flex-col items-center ">
                    <div className="container py-4 relative"  >
                      <div className="flex items-center gap-4 z-40" onClick={()=>{setActive(!active ? !active :null)}}>
                        {active ? <IoClose className="w-2xl cursor-pointer"/> : <FiMenu className="w-2xl cursor-pointer" /> }
                        <p className="cursor-pointer "> Categories </p>
                      </div>

                      {active && <div className="absolute h-full z-30  left-0 top-2.8 w-full"><MobileSideMenu /></div>}

                    </div>
                </div>

                  <div className='bg-[#F6F6F6] lg:block hidden '>
                    <SideMenu />
                  </div>

                <div className='lg:col-span-2 lg:mr-12 md:mr-12 col-span-3'>
                  <Carousel />
                </div>

            </div>
        </div>
    
        <div className='my-4 bg-[#F25E26] p-4 text-white '>
          <div className='container p-2 '>
            <AuctionMarquee info={marqueeInfo} />
          </div>
        </div>
      </section>
    </>
  )
}
