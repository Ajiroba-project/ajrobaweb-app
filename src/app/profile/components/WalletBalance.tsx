import { FaRegEye } from 'react-icons/fa6'
import { FaRegEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { DefaultButton, IconButton } from '@/app/component/Button'
import { FaPlus } from 'react-icons/fa6'

export const WalletBalance = () => {
  const [showBalance, setShowBalance] = useState<boolean>(false)
  const [newPin, setNewPin] = useState<boolean>(false)
  return (
    <div className='flex flex-col px-2'>
      {/* balance */}
      <div className='flex items-center justify-between'>
        <p className='capitalize'>available balance</p>
        <div onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? <FaRegEyeSlash /> : <FaRegEye />}
        </div>
      </div>
      <div className='balance pt-1'>
        <p className='text-2xl font-semibold  slashed-zero  leading-normal'>
          {showBalance ? '₦ 20,000.00' : '*****'}
        </p>
      </div>
      {/* pin */}
      <div className='wallet-pin flex items-center justify-between'>
        <div className='flex items-center gap-8  '>
          <p>{newPin ? '1234' : '*****'}</p>
          <div
            onClick={() => setNewPin(!newPin)}
            className='justify-center text-sm'
          >
            {newPin ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        </div>
        <p className='cursor-pointer justify-end text-end text-sm capitalize'>
          create pin
        </p>
      </div>
      {/* points */}
      <div className='flex justify-between py-4'>
        <div className='flex flex-col'>
          <p className='text-sm capitalize leading-snug'>ajiroba point</p>
          <p className='text-sm font-semibold slashed-zero'>
            ₦ 150
          </p>
        </div>
        <p className='cursor-pointer text-sm capitalize'>view</p>
      </div>
      {/* buttons */}
      <div className='mt-10 flex  justify-between gap-4 flex-col w-full md:flex-row lg:flex-row '>
        <IconButton
          text='add money'
          type='button'
          className='flex lg:w-max items-center justify-self-center justify-center gap-1 rounded-lg bg-[#f25e26] p-2 text-xs capitalize text-white'
          icon={<FaPlus />}
        />
        <DefaultButton
          text='change pin'
          type='button'
          className='lg:w-max rounded-lg border-2 border-[#f25e26] p-2 text-xs capitalize text-[#f25e26]'
        />
      </div>
    </div>
  )
}
