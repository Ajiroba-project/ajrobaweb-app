import { useRouter } from 'next/navigation'
import Image from 'next/image'
import banner from '../asset/image/banner.png'
import { DefaultButton } from '../component/Button'
import { Poppins } from 'next/font/google'
import footerbanner from '../asset/image/footerbanner.png'
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] })

export const Banner = () => {
  const router = useRouter()

  return (
    <div
      className={`${poppins.className} flex min-h-[200px] w-full items-center justify-center`}
      style={{
        backgroundImage: `url('/footerbanner.svg')`,
        backgroundSize: 'cover', // or 'contain', 'auto', depending on your needs
        backgroundPosition: 'center', // Adjust the position as needed
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        width: '100%', // Adjust the width as needed
        height: '' // Full viewport height, adjust as needed
      }}
    >
      <div className='content-container flex flex-col-reverse items-center justify-between pb-8 pt-8 md:flex-row'>
        <div className=' flex flex-col items-center justify-center gap-4 py-6 text-white md:items-start md:justify-start lg:w-1/3'>
          <h3 className='text-center font-Poppins text-3xl font-semibold md:text-left lg:text-[26px]'>
            Ajiroba... Your foremost consumer raffle platform!
          </h3>
          <p className='text-center font-Poppins text-lg font-normal md:text-left lg:text-[18px]'>
            Pack your excitement and bid your way to exclusive treasures.
          </p>
          <div className='pb-4'>
            <DefaultButton
              text='Start Bid'
              className='w-fit rounded-lg bg-[#FCDFD4] p-2 px-8 font-Poppins font-normal text-black hover:bg-[#E84526] hover:text-white hover:shadow-lg'
              handleClick={() => router.push('/raffledraw')}
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
