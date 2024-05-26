import React, { useState } from 'react'
import Image from 'next/image'
import paystackbrand from '../../asset/image/paystack-icon.png'
import { DefaultButton } from '../../component/Button'

type depositeProps = {
  handleClick: any
}

export const Deposite = ({ handleClick }: depositeProps) => {
  const suggestions = ['200', '300', '500']
  const [value, setValue] = useState<string>('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <section className='fixed left-0 top-0 z-50 flex h-full w-screen items-center justify-center bg-[#000000d1] p-4'>
      <div className='xs:w-[15em]  flex h-auto w-[20em] flex-col  gap-6 rounded-md bg-white p-6 md:w-[25em] lg:w-[30em]'>
        <div className='flex flex-col items-center justify-center pt-3 text-center'>
          <p className=''>Payment Gateway</p>
          <Image src={paystackbrand} alt={'icon'} />
        </div>
        {/* input */}
        <div className='my-2 w-full justify-start'>
          <label className='text-left'>Deposite Amount</label>
          <input
            type='text'
            onChange={handleChange}
            value={value}
            className='w-full rounded-md border border-[#656565] p-3 '
            placeholder='Enter an Amount and press "Next"'
          />
          {/* suggestions */}
          <p className='mt-3 capitalize'>suggestions</p>
          <div className='mt-2 flex gap-3'>
            {suggestions.map((val, index) => (
              <div
                className='flex cursor-pointer  rounded-md bg-gray-300 px-2 py-1'
                key={index}
                onClick={() => setValue(val)}
              >
                <p className='text-sm'>{val}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='flex w-full gap-5'>
          <DefaultButton
            text='Cancel'
            type='button'
            className='w-full rounded-md border-2 border-[#E84526] p-3 text-[#E84526]'
            handleClick={() => handleClick(false)}
          />
          <DefaultButton
            text='Next'
            type='button'
            className='w-full rounded-md bg-[#E84526] p-3 text-white'
            handleClick={() => handleClick(false)}
          />
        </div>
      </div>
    </section>
  )
}
