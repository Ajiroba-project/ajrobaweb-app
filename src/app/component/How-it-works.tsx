'use client'
import walletImg from '../asset/image/wallet.png'
import winner_badge from '../asset/image/winner_badge.svg'
import raffle_image from '../asset/image/raffle_image.svg'
import Image from 'next/image'
import { useState, useEffect } from 'react'
type title = {
  text: string
}


// export const HIW = () => {
//   const [indicator, setIndicator] = useState<number>(0)
//   const Title = ({ text }: title) => (
//     <h3 className='py-2 text-xl font-bold text-[#F25E26]'>{text}</h3>
//   )
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndicator(prevIndicator =>
//         prevIndicator === 2 ? 0 : prevIndicator + 1
//       )
//     }, 5000)

//     // Clear the interval on component unmount
//     return () => clearInterval(interval)
//   }, [])
//   return (
//     <>
//       <div className='flex flex-col items-center gap-3 lg:flex-row'>
//         <div className='flex gap-2.5 relative mb-3'>
//           {/* indicator */}
//           <div className='relative h-auto  w-3 rounded-full border bg-[#D2C1C1]'>
//             {[0, 1, 2,].map((val, index) => (
//               <div
//                 key={index}
//                 className={`${indicator === val ? 'bg-[#E84526]' : indicator === val ? 'bg-amber-400' : indicator === val ? 'bg-emerald-400' : 'bg-transparent'} h-[35%] w-2.5 rounded-full relative`}
//               ></div>
//             ))}
//           </div>

//           <div className=' my-5 flex flex-col gap-3'>
//             <div className='lg:w-[50%] cursoe-pointer' onClick={() => setIndicator(0)}>
//               <Title text={'Ticket'} />
//               <p>
//                 Credit your wallet to buy your ticket. your ticket allows you to
//                 bid for any product on auction.
//               </p>
//             </div>
//             <div className='lg:w-[50%] cursor-pointer' onClick={() => setIndicator(1)}>
//               <Title text={'Raffle Draw'} />
//               <p>
//                 After allotted time frame, our live raffle draw begins where you
//                 can win the product you have put in for.
//               </p>
//             </div>
//             <div className='lg:w-[50%] cursor-pointer' onClick={() => setIndicator(2)}>
//               <Title text={'Win'} />
//               <p>
//                 During the live raffle draw, the winner gets announced and the
//                 item will be delivered to your door step.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <Image src={walletImg} alt='img' />
//         </div>
//       </div>
//     </>
//   )
// }


export const HIW = () => {
  const [indicator, setIndicator] = useState<number>(0)

  const indicatorColors = ['bg-[#E84526]', 'bg-amber-400', 'bg-emerald-400'];

  const Title = ({ text }: title) => (
    <h3 className='py-0.5 text-lg font-Poppins font-semibold text-[#F25E26]'>{text}</h3>
  )

  // Array of images to be displayed
  const images = [walletImg, raffle_image, winner_badge,];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndicator(prevIndicator =>
        prevIndicator === images.length - 1 ? 0 : prevIndicator + 1
      )
    }, 3000)

    // Clear the interval on component unmount
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <>
      <div className='flex flex-col items-center gap-3 lg:flex-row'>
        <div className='flex gap-2.5 relative mb-3'>
          {/* indicator */}
          <div className='relative h-auto w-3 rounded-full border bg-[#D2C1C1]'>
            {[0, 1, 2]?.map((val, index) => (
              <div
                key={index}
                className={`${indicator === val ? indicatorColors[val] : 'bg-transparent'
                  } h-[35%] w-2.0 rounded-full relative`}
              ></div>

            ))}
          </div>

          <div className='my-5 flex flex-col gap-3'>
            <div
              className='lg:w-[50%] cursor-pointer'
              onClick={() => setIndicator(0)}
            >
              <Title text={'Ticket'} />
              <p className='font-Poppins text-[#353131] text-base font-normal' >
                Credit your wallet to buy your ticket. Your ticket allows you to
                bid for any product on auction.
              </p>
            </div>
            <div
              className='lg:w-[50%] cursor-pointer'
              onClick={() => setIndicator(1)}
            >
              <Title text={'Raffle Draw'} />
            <p className='font-Poppins text-[#353131] text-base font-normal' >
                After the allotted time frame, our live raffle draw begins where
                you can win the product you have put in for.
              </p>
            </div>
            <div
              className='lg:w-[50%] cursor-pointer'
              onClick={() => setIndicator(2)}
            >
              <Title text={'Win'} />
             <p className='font-Poppins text-[#353131] text-base font-normal' >
                During the live raffle draw, the winner gets announced and the
                item will be delivered to your doorstep.
              </p>
            </div>
          </div>
        </div>


        <div>
          <Image src={images[indicator]} alt='indicator image' />
        </div>
      </div>
    </>
  )
}
