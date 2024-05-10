import React from 'react'
import { DefaultButton } from '../component/Button'

export const Community = () => {
  return (
    <div className='flex justify-center lg:p-[10rem]'>
      <div className='border-3 container mx-4 my-5 flex lg:w-2/3 flex-col gap-6 border-[#6E6E6E] px-[3rem] py-[4rem] shadow-xl'>
        <h1 className='text-center text-2xl font-semibold lg:leading-3'>
          Join Our Community
        </h1>
        <p className='text-center text-[#6E6E6E]'>
          Become a part of a part of Ajiroba’s Community where we keep you up to
          date on important topics and update about our platform.
        </p>
        <div className='flex justify-center'>
          <DefaultButton
            text='join now'
            className='w-fit rounded-lg bg-[#F25E26] p-2 text-white'
            handleClick={() => {}}
            type={'button'}
          />
        </div>
      </div>
    </div>
  )
}
