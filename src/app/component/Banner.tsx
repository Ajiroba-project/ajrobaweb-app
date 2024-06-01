
import {useRouter} from "next/navigation"
import Image from 'next/image'
import banner from '../asset/image/banner.png'
import { DefaultButton } from '../component/Button'
import { Poppins } from 'next/font/google'
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] })

export const Banner = () => {
  const router = useRouter()

  return (
    <div className={`${poppins.className}flex items-center justify-center`}>
      <div className='container flex flex-col items-center justify-between pt-[2rem] md:flex-row lg:flex-row'>
        <div className='flex flex-col items-center justify-center gap-4 py-6 text-white md:items-start md:justify-start md:py-0 lg:w-1/3 lg:items-start lg:justify-start lg:py-0 w-'>
          <h3 className='text-center text-4xl md:text-left lg:text-left font-semibold min-w-96'>
            Ajiroba... Your passport to premium Bids!
          </h3>
          <p className='text-center md:text-left lg:text-left font-normal text-2xl'>
            Pack your excitement and Bid your way to exclusive treasures.
          </p>
          <div className='pb-4'>
            <DefaultButton
              text='join now'
              className='w-fit rounded-lg bg-[#FCDFD4] p-2 px-5 text-black '
              handleClick={() => router.push("/auction")}
              type={'button'}
            />
          </div>
        </div>
        <Image src={banner} alt='img' className='w-[50%]' />
      </div>
    </div>
  )
}
