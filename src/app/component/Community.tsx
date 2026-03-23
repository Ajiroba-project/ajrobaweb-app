import React from 'react'
import { CustomizeButton } from '../component/Button'
import { MdOutlineArrowOutward } from 'react-icons/md'
import { useRouter } from 'next/navigation';

export const Community = () => {

  const router = useRouter();
  return (
    <div className='content-container flex justify-center py-8 md:py-12 lg:py-16'>
      <div className='border-3 flex w-full max-w-2xl flex-col gap-6 px-6 py-10 shadow-xl sm:px-10 lg:py-16'>
        <h1 className='text-center text-2xl font-Poppins font-semibold text-[#2A2A2A] lg:leading-3'>
          Join Our Community
        </h1>
        <p className='text-center text-sm font-Poppins font-normal text-[#6E6E6E]'>
          Become a part of Ajiroba&apos;s Community where we keep
          you up to date on important topics and update about our platform.
        </p>
        <div className='flex justify-center'>
          <CustomizeButton
            className='w-fit rounded-lg bg-[#F25E26] p-2 px-4 text-white hover:shadow'
            handleClick={() => router.push('/community')}
            type={'button'}
          >
            <div className='flex items-center gap-2 rounded-lg'>
              <p className='font-Poppins font-normal'>Join</p>
              <MdOutlineArrowOutward className='text-xl' />
            </div>
          </CustomizeButton>
        </div>
      </div>
    </div>
  )
}
