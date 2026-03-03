import Image from 'next/image'

type BannerProps = {
  text: string
  banner: any
}

export const AuctionBanner = ({ text, banner }: BannerProps) => {
  return (
    <>
      <section className=' w-full '>
        <h2 className='sr-only'>{text}</h2>
        <div className='relative h-40 w-full overflow-hidden sm:h-48 md:h-56 lg:h-64 xl:h-72'>
          <Image
            src={banner}
            alt={text || 'Auction banner'}
            fill
            priority
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px'
            className='object-cover'
          />
        </div>
      </section>
    </>
  )
}
