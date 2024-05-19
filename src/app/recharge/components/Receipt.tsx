import React, {useState} from 'react'
import verify from '../../asset/verify.svg'
import Image from 'next/image'
import { Formtitle } from './Formtitle'
import { DefaultButton } from '../../component/Button'
import { useRouter } from 'next/navigation'
import {FaToggleOn, FaToggleOff} from 'react-icons/fa'

export const Receipt = () => {
  const router = useRouter()
  const [toggle, setToggle]=useState(false)
  return (
    <section className='p-5 '>
      <div className='my-5 flex flex-col items-center justify-center gap-4 rounded-sm bg-[#F6F6F6] pt-[5em]'>
        <div>
          <Image src={verify} alt='successfully' />
        </div>
        <div className='w-content'>
          <Formtitle
            title='Successfully'
            subtitle={`you have successfully make a payment`}
          />
          <DefaultButton
            text='View Reciept'
            type='button'
            className=' my-5 w-full rounded-lg bg-[#FCDFD4] py-2 hover:bg-[#F25E26] hover:text-white'
            handleClick={() => router.push('transaction-receipt')}
          />
        </div>
      </div>
      <div
        className='flex items-center justify-center gap-2'
        onClick={() => setToggle(!toggle)}
      >
        <p>Save as beneficiary</p>
        {toggle ? (
          <FaToggleOn className='text-[#F25E26] cursor-pointer text-3xl' />
        ) : (
          <FaToggleOff className='cursor-pointer text-3xl text-gray-300' />
        )}
      </div>
    </section>
  )
}
