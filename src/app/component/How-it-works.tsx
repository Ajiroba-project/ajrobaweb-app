'use client'
import walletImg from '../asset/image/wallet.png'
import Image from 'next/image'
import { useState, useEffect } from 'react'
type title = {
  text: string
}
export const HIW = () => {
  const [indicator, setIndicator] = useState<number>(0)
  const Title = ({ text }: title) => (
    <h3 className='py-2 text-xl font-bold text-[#F25E26]'>{text}</h3>
  )
  useEffect(() => {
    const interval = setInterval(() => {
      setIndicator(prevIndicator =>
        prevIndicator === 2 ? 0 : prevIndicator + 1
      )
    }, 5000)

    // Clear the interval on component unmount
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <div className='flex flex-col items-center gap-3 lg:flex-row'>
        <div className='flex gap-2.5 relative mb-3'>
          {/* indicator */}
          <div className='relative h-auto  w-3 rounded-full border bg-[#D2C1C1]'>
            {[0, 1, 2,].map((val, index) => (
              <div
                key={index}
                className={`${indicator === val ? 'bg-[#E84526]' : indicator === val ? 'bg-amber-400' : indicator === val ? 'bg-emerald-400' : 'bg-transparent'} h-[35%] w-2.5 rounded-full relative`}
              ></div>
            ))}
          </div>

          <div className=' my-5 flex flex-col gap-3'>
            <div className='lg:w-[50%] cursoe-pointer' onClick={() => setIndicator(0)}>
              <Title text={'Ticket'} />
              <p>
                Credit your wallet to buy your ticket. your ticket allows you to
                bid for any product on auction.
              </p>
            </div>
            <div className='lg:w-[50%] cursor-pointer' onClick={() => setIndicator(1)}>
              <Title text={'Raffle Draw'} />
              <p>
                After allotted time frame, our live raffle draw begins where you
                can win the product you have put in for.
              </p>
            </div>
            <div className='lg:w-[50%] cursor-pointer' onClick={() => setIndicator(2)}>
              <Title text={'Win'} />
              <p>
                During the live raffle draw, the winner gets announced and the
                item will be delivered to your door step.
              </p>
            </div>
          </div>
        </div>

        <div>
          <Image src={walletImg} alt='img' />
        </div>
      </div>
    </>
  )
}
