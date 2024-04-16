import { SideMenu } from './SideMenu'
import { Carousel } from './Carousel'
import { marqueeInfo } from '../static-data'
import { AuctionMarquee } from './Auction-Marquee'

export const Hero = () => {
  return (
    <>
      <section className='flex flex-col'>
        <div className='flex  '>
            <div className='p-12 bg-[#F6F6F6]'>
              <SideMenu />
            </div>
            <div className='flex-auto'>
              <Carousel />
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
