'use client'
import { useState } from 'react'
import { Poppins } from 'next/font/google'
import { FaStar } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { FaHeart } from "react-icons/fa";
import { useAuthStore } from '@/store/store'
import Image from 'next/image'
import Link from 'next/link'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '900'] })

interface cardDetails {
  cardInfo: Array<any>
  currentPage?: number
  cardsNum?: number
}

export const ProductCard = ({ cardInfo }: cardDetails) => {
  const [hoverState, setHoverState] = useState<string>('')
  const [cardCartState, setCardCartState] = useState<boolean>(false)
  const [cardAddCartState, setCardAddCartState] = useState<any>()
  const {isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn
  }))

  const handleCartNotification = (value:any) => {
    setCardAddCartState(value.name)

    setCardCartState(!cardCartState)
    const timeoutID = setTimeout(() => {
      setCardCartState(false)
    }, 5000)

    return () => clearTimeout(timeoutID)
  }


  return (
    <>
      <div
        className={`${poppins.className} lg:full my-4 grid h-fit w-72 cursor-pointer  grid-cols-1 gap-4 md:w-full md:grid-cols-2 lg:grid-cols-4`}
      >
        {cardInfo.map((value: any, index: number) => (
          <div
            className=' relative w-full rounded bg-[#F6F6F6] shadow-md'
            key={index}
            onMouseEnter={() => setHoverState(value.name)}
            onMouseLeave={() => setHoverState('')}
          >
            <div className='relative h-min rounded pt-2 transition delay-200 duration-200 hover:bg-[#0000002a] hover:transition-all'>
              <div className='z-auto flex items-center justify-center'>
                <Image
                  src={value.image}
                  alt='product'
                  className='w-fit bg-contain '
                />
              </div>
              {/* cart */}
              {hoverState === value.name ? (
                <>
                  <IoCartOutline
                    className='absolute right-2 top-2  rounded-full bg-white p-2 text-4xl text-black '
                    onClick={() => handleCartNotification(value)}
                  />
                  {isLoggedIn && (
                    <FaHeart className='absolute right-14 top-2 rounded-full  bg-white p-2 text-4xl text-gray-300 hover:text-[#E84526] ' />
                  )}
                </>
              ) : (
                ''
              )}
              {/* alertMessage */}
              <>
                {cardCartState && (
                  <div
                    className={`${cardAddCartState === value.name ? 'absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-end bg-[#0000002a] pb-6 text-center align-bottom text-white' : 'hidden'}`}
                  >
                    <div className='bottom-0 mx-4 rounded-md bg-[#08B504] p-2 px-3 text-sm font-medium'>
                      <p>{value.name}</p>
                      <p>Has been added to cart</p>
                    </div>
                  </div>
                )}
              </>

              <hr />
              <div className='z-10 h-fit bg-[#F6F6F6] py-3 shadow-inner'>
                <div className='flex flex-col gap-2 px-2'>
                  <div className='flex  w-full items-center justify-between gap-3 capitalize'>
                    {/* product name */}
                    <div className=''>
                      <p className='w-max text-pretty text-base font-normal'>
                        {value.name}
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-between '>
                    {/* price */}
                    <div className='justify-start'>
                      <p className='w-max text-xl font-medium'>
                        ₦&nbsp;{value.price}
                        <span className=' '></span>
                      </p>
                    </div>
                    {/* stars */}
                    <p className='flex justify-end text-left'>
                      {[0, 1, 2, 3, 4].map((_, index) => (
                        <span key={index}>
                          <FaStar className='text-[#F25E26]' />
                        </span>
                      ))}
                    </p>
                  </div>
                  <p className='text-sm font-normal text-gray-500 line-through '>
                    ₦&nbsp;{value.previousPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export const CategoryCard = ({ cardInfo }: cardDetails) => {
  return (
    <>
      <div
        className={`${poppins.className}  grid w-72 cursor-pointer grid-cols-1 gap-6 md:w-full md:grid-cols-2 lg:grid-cols-4`}
      >
        {cardInfo?.map((value, index) => (
          <div
            className='cursor-pointer rounded-2xl shadow-md hover:shadow-lg'
            key={index}
          >
            <div className='rounded-t-2xl bg-[#F6F6F6]'>
              <div className='flex items-center justify-center'>
                <Image
                  src={value.image}
                  alt='product'
                  className='h-[200px] w-fit '
                />
              </div>
            </div>

            <div className='rounded-b-2xl bg-white py-2'>
              <div className='flex flex-col gap-2 p-2'>
                <div className='capitalize'>
                  <p className='text-lg text-[#353131]'>{value.name}</p>{' '}
                </div>
                <div className='flex flex-col items-center'>
                  <p className='text-[#A09F9F]'>{value.description}</p>
                  <Link
                    href={value.path}
                    className='my-4 w-full bg-[#FCDFD4] p-2 text-center text-[#111111]'
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export const AuctionCard = ({ cardInfo }: cardDetails) => {
  return (
    <>
      <div className='lg:full grid w-72 cursor-pointer grid-cols-1 gap-6 md:w-full md:grid-cols-2 lg:grid-cols-4'>
        {cardInfo.map((value, index) => (
          <div
            className=' w-full rounded bg-[#F6F6F6] shadow-md hover:-translate-y-2.5 hover:scale-105 hover:shadow-xl'
            key={index}
          >
            <div className='relative'>
              <div className='flex items-center justify-between p-4'>
                <p className='text-sm text-[#A09F9F]'>On Auction </p>
                <p className='cursor-pointer rounded-md bg-[#FCFCFC] p-1.5 text-sm font-semibold shadow-md transition delay-150 duration-200 ease-in-out hover:bg-[#E84526] hover:text-white'>
                  Bid{' '}
                </p>
              </div>

              <div className='flex items-center justify-center'>
                <Image src={value.image} alt='product' className='w-fit' />
              </div>
            </div>

            <hr />
            <div className='py-3 shadow-inner'>
              <div className='flex flex-col gap-2 px-2'>
                <div className='flex  w-full items-center justify-between gap-3 capitalize'>
                  {/* product name */}
                  <div className=' text-sm font-normal'>
                    <p className='w-max text-pretty text-sm'>{value.name}</p>
                  </div>
                  {/* price */}
                  <div className=''>
                    <p className='w-max text-xs font-normal '>
                      ticket price:
                      <span className=' text-pretty text-base font-medium text-[#F25E26]'>
                        ₦200.00
                      </span>
                    </p>
                  </div>
                </div>

                {/* stars */}
                <p className='flex justify-end text-left'>
                  {[0, 1, 2, 3, 4].map((val, index) => (
                    <span key={index}>
                      <FaStar className='text-[#F25E26]' />
                    </span>
                  ))}
                </p>
                {/* time left */}
                <div className='mb-3'>
                  <p className='text-xs capitalize '>
                    <span className='font-medium'>2</span>:hr{' '}
                    <span className='font-medium'>45</span>:min{' '}
                    <span className='font-medium'>left</span>
                  </p>
                  <div className='border-gray h-2.5 w-full rounded-full border '>
                    <div className='h-2 w-[45%] rounded-full bg-[#F25E26]'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export const CategoryFeatureCard = ({ cardInfo }: cardDetails) => {
  return (
    <>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {cardInfo?.map((value, index) => (
          <div
            className='cursor-pointer gap-2 gap-y-3 rounded hover:scale-110'
            key={index}
          >
            <div className='relative flex items-center justify-center '>
              <Image
                src={value.image2}
                alt='product'
                className='h-auto w-fit bg-contain hover:shadow-xl'
              />

              <div className='absolute flex flex-col items-center justify-between gap-3 p-4'>
                <Image
                  src={value.svg}
                  alt='product'
                  className='w-fit bg-contain'
                />
                <p className='text-sm text-white'>{value.name} </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
