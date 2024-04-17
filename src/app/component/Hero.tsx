import { SideMenu } from './SideMenu'
import { Carousel } from './Carousel'
import { marqueeInfo } from '../static-data'
import { AuctionMarquee } from './Auction-Marquee'

export const Hero = () => {
  return (
    <>
      <section className='flex flex-col '>
        <div className="">
            <div className='grid grid-cols-3 '>
                <div className='bg-[#F6F6F6] lg:block hidden'>
                  <SideMenu />
                </div>
                <div className='lg:col-span-2 mr-12 col-span-3'>
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
