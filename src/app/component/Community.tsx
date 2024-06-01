import React from 'react'
import { CustomizeButton } from '../component/Button'
import { MdOutlineArrowOutward } from 'react-icons/md'

export const Community = () => {
  return (
    <div className='flex justify-center lg:p-[10rem]'>
      <div className='border-3 container mx-4 my-5 flex flex-col gap-6 border-[#6E6E6E] px-[3rem] py-[4rem] shadow-xl lg:w-2/3'>
        <h1 className='text-center text-3xl font-semibold text-[#2A2A2A] lg:leading-3'>
          Join Our Community
        </h1>
        <p className='text-center text-[#6E6E6E]'>
          Become a part of a part of Ajiroba’s Community where we keep you up to
          date on important topics and update about our platform.
        </p>
        <div className='flex justify-center '>
          <CustomizeButton
            className='w-fit rounded-lg bg-[#F25E26] p-2 px-4 text-white hover:shadow'
            handleClick={() => {}}
            type={'button'}
          >
            <div className='flex items-center gap-2'>
              <p>Join</p>
              <MdOutlineArrowOutward className='text-xl' />
            </div>
          </CustomizeButton>
        </div>
      </div>
    </div>
  )
}
