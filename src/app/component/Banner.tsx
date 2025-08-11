
import {useRouter} from "next/navigation"
import Image from 'next/image'
import banner from '../asset/image/banner.png'
import { DefaultButton } from '../component/Button'
import { Poppins } from 'next/font/google'
import footerbanner from '../asset/image/footerbanner.png'
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] })

export const Banner = () => {
  const router = useRouter()

  return (
    <div className={`${poppins.className}flex items-center justify-center`}

     style={{
    backgroundImage: `url('/footerbanner.svg')`,
    backgroundSize: 'cover', // or 'contain', 'auto', depending on your needs
    backgroundPosition: 'center', // Adjust the position as needed
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    width: '100%', // Adjust the width as needed
    height: '', // Full viewport height, adjust as needed
  }}
    >


      <div className='px-4 md:px-8 lg:px-12 container flex flex-col-reverse md:flex-row items-center justify-between pt-8'>
  <div className='flex flex-col items-center md:items-start justify-center gap-4 py-6 text-white md:justify-start lg:w-1/3'>
    <h3 className='text-center md:text-left font-semibold text-3xl lg:text-[36px] font-Poppins'>
      Ajiroba... Your passport to premium Bids!
    </h3>
    <p className='text-center md:text-left font-normal text-lg lg:text-[18px] font-Poppins'>
      Pack your excitement and Bid your way to exclusive treasures.
    </p>
    <div className='pb-4'>
      <DefaultButton
        text='Start Bid'
        className='w-fit font-Poppins font-normal hover:bg-[#E84526] hover:text-white hover:shadow-lg rounded-lg bg-[#FCDFD4] p-2 px-8 text-black'
        handleClick={() => router.push("/auction")}
        type={'button'}
      />
    </div>
  </div>
 {/*  <div className='w-full md:w-1/2 lg:w-[50%] flex justify-center md:justify-end'>
    <Image src={banner} alt='img' className='w-[80%] md:w-[70%] lg:w-[50%]' />
  </div> */}

       <Image src={banner} alt='img' className='w-[50%]' />
</div>


    </div>
  )
}
