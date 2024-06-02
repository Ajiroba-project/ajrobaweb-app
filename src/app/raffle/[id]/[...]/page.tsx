'use client'
import React from 'react'
import { raffleWinner } from '@/app/static-data'
import { DefaultButton } from '@/app/component/Button'
import { useRouter } from 'next/navigation'
import { HeadingText } from '@/app/component/Heading'
import useAuthMiddleware from '@/hooks/useAuth'


 const Page = () => {

  const router = useRouter()
  // useAuthMiddleware(router)
  const thead = ['SN', 'Product', `Winner's Number`, 'Ticket Price']
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-full bg-[#F6F6F6] lg:pt-[13vh] md:pt-[13vh] pt-[10vh]'>
        <div className='container flex flex-col'>
          <p
            onClick={() => router.back()}
            className='cursor-pointer text-[#F25E26] underline'
          >
            Back
          </p>
          <div className='mb-3 text-center'>
            <HeadingText title='Live Raffle Draw' />
          </div>
        </div>
      </div>
      <div className='container my-8 flex flex-col items-center justify-center overflow-x-auto rounded-2xl p-4 bg-black '>
        <table className='mb-6 table-auto min-w-full'>
          <thead className=' bg-white pt-5 text-[#F25E26] '>
            <tr className='tracking-wide'>
              {thead.map(index => (
                <th
                  className={` ${index === 'SN' ? 'rounded-bl-3xl' : index === 'Ticket Price' ? 'rounded-br-3xl' : index === `Winner's Number` ? ' text-left' : 'text-center'} text-pretty p-3  text-2xl  font-semibold capitalize tracking-wide lg:w-max`}
                  key={index}
                >
                  {index}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=''>
            <tr className='h-2'></tr>
            {/* spacer */}
            {raffleWinner.map((val, index) => (
              <>
                <tr className='h-2 text-white' key={index}>
                  <td className='w-1 cursor-pointer rounded-br-[20px] rounded-tl-[30px] bg-gradient-to-r from-[#E84526] to-[#EA7000] text-center'>
                    <p className=' text-lg font-semibold'>{val.sn}</p>
                  </td>
                  <td className='w-1 text-center'>
                    <p className='custom-shape mx-4 w-[247px] cursor-pointer rounded-l-2xl bg-gradient-to-r from-[#E84526] to-[#EA7000]  py-4 text-xl font-semibold '>

                       {val.product}

                    </p>
                  </td>

                  <td className='h-1 w-[278px] bg-gradient-to-r from-[#E84526]   to-[#EA7000]   text-center text-lg font-semibold'>
                    <p className=' mx-2 flex w-fit cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 px-2 py-1 text-center text-lg tracking-[0.5em] text-black'>
                      08032****111
                    </p>
                  </td>
                  <td className='h-1 rounded-tr-[39px]  bg-gradient-to-l from-[#E84526] to-[#EA7000] text-center'>
                    <p className='cursor-pointer px-2 py-1 text-lg font-semibold tracking-wider'>
                      {' '}
                      ₦{val.ticket}
                    </p>
                  </td>
                  {/* spacer */}
                </tr>
                <tr className='h-4 space-y-4'></tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col justify-center mb-8">
        <DefaultButton

        handleClick={()=>router.push('/')}
        text='Back to Auction'
        type='button'
        className='h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all '
      />

      </div>
    </div>
  )
}
export default Page