import Image from 'next/image'

type BannerProps = {
  text: string
  banner: any
}

export const AuctionBanner = ({ text, banner }: BannerProps) => {
  return (
    <>
      <section className=" pt-[20vh]">
        <div className='flex justify-center text-center mb-4'>
          <h1 className='lg:text-4xl capitalize md:text-2xl text-lg'>{text}</h1>
        </div>
        <div className="">
          <Image src={banner} alt='image' className="bg-cover"/>
        </div>
      </section>
    </>
  )
}
