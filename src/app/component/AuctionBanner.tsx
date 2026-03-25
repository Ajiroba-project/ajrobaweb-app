import Image from 'next/image'
import rechargebannermobile from '../asset/image/recharge-banner_mobile.png'

type BannerProps = {
  text: string
  banner: any
}

export const AuctionBanner = ({ text, banner }: BannerProps) => {
  return (
    <section className='w-full'>
      <h2 className='sr-only'>{text}</h2>
      {/* Mobile: natural aspect ratio, edge-to-edge */}
      <div className='sm:hidden'>
        <Image
          src={rechargebannermobile}
          alt={text || 'Auction banner'}
          priority
          sizes='100vw'
          className='h-auto w-full'
        />
      </div>
      {/* Desktop: fixed height with cover */}
      <div className='relative hidden overflow-hidden sm:block sm:h-48 md:h-56 lg:h-64 xl:h-72'>
        <Image
          src={banner}
          alt={text || 'Auction banner'}
          fill
          priority
          sizes='(max-width: 1024px) 100vw, 1200px'
          className='object-cover'
        />
      </div>
    </section>
  )
}
