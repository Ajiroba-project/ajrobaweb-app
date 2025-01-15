import Image from 'next/image'

type BannerProps = {
  text: string
  banner: any
}

export const AuctionBanner = ({ text, banner }: BannerProps) => {
  return (
    <>




      <section className=" ">
       {/*  <div className='flex justify-center text-center   py-8'>
          <h1 className='lg:text-3xl capitalize md:text-xl text-base font-Poppins text-[#2A2A2A] '>{text}</h1>
        </div> */}
        {/* <div className="pt-[20vh]"> */}
                <div className="">
          <Image src={banner} alt='image' className="bg-cover w-full h-full object-cover"/>
        </div>
      </section>
    </>
  )
}
