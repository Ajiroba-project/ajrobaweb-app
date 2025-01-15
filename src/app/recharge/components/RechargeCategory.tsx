import { Fragment } from 'react'
import airtime from '../../asset/image/airtime.png'
import data from '../../asset/image/data.png'
import cable from '../../asset/image/cable.png'
import electricity from '../../asset/image/electricity.png'
import { userNavStore } from '@/store/store'
import { FaSquarePhone } from 'react-icons/fa6'
import { CgData } from 'react-icons/cg'
import { PiTelevisionSimple } from 'react-icons/pi'
import { RiLightbulbFlashFill } from 'react-icons/ri'
import Image from 'next/image'
import { useRouter } from "next/navigation";


export const RechargeCategory = () => {
const setUserNav = userNavStore(state => state.setUserNav)

const router = useRouter();

  const category = [
    {
      name: 'Airtime',
      image: airtime,
      icon: <FaSquarePhone className='text-3xl' />,
      path: '/airtime'
    },
    {
      name: 'Data',
      image: data,
      icon: <CgData className='text-3xl' />,
      path: '/data'
    },
    {
      name: 'Cable Subscription',
      image: cable,
      icon: <PiTelevisionSimple className='text-3xl' />,
      path: '/cable'
    },
    {
      name: 'Electricity',
      image: electricity,
      icon: <RiLightbulbFlashFill className='text-3xl' />,
      path: '/electricity'
    }
  ]



  return (
    <Fragment>
      <section className='my-4 flex flex-col gap-4'>
        <div className='flex justify-center lg:justify-start'>
          <p className='font-semibold font-Poppins'>
            {' '}
            Welcome lets get you{' '}
            <span className='text-[#E84526]'>connected</span> today.
          </p>
        </div>
        <div
          className={` mb-4 flex flex-col place-content-center items-center justify-center gap-4 lg:flex-row md:flex-row lg:justify-start flex-wrap`}
        >
          {category.map((value, index) => (
            <div
              className='cursor-pointer '
              key={index}
          /*     onClick={() => setUserNav(value.name)} */
          onClick={()=> router.push(`/recharge${value.path}`)}
            >
              <div className='relative flex w-fit items-center  hover:shadow-2xl'>
                <Image
                  src={value.image}
                  alt='product'
                  className='h-[200px] w-fit '
                />
                <div className='absolute top-0 flex h-full w-full flex-col  justify-center gap-2 p-2 text-white hover:text-[#F25E26]'>
                  <div className='absolute top-4'>{value.icon}</div>
                  <div className='flex items-center justify-center capitalize'>
                    <p className='text-center text-lg '>{value.name}</p>{' '}
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2 p-2'>
                <div
                  className='text-center capitalize'
             /*      onClick={() => setUserNav(value.name)} */
             onClick={()=> router.push(`/recharge${value.path}`)}
                >
                  <p className='text-lg '>{value.name}</p>{' '}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  )
}
