'use client'
import React from 'react'
import { Header } from './component/Header'
import { Tables } from './component/Tables'
import { DefaultButton } from '../component/Button'
import {useRouter} from "next/navigation"
import Image from 'next/image'
import applestore from '../asset/image/apple.png'
import androidstore from '../asset/image/android.png'
import useAuthMiddleware from '@/hooks/useAuth'

const Page = () => {
    const router = useRouter()
    useAuthMiddleware(router)
    
  return (
    <section>
      <div className='bg-gray-100 py-8'>
        <Header />
      </div>
      <div className='flex flex-col items-center py-8'>
        <p className='brand3'>Transaction Amount</p>
        <p className='text-xl font-bold'>₦0.00</p>
      </div>
      <section className=''>
        <div>
          <Tables />
        </div>
      </section>
      <div className="container">
        <h3 className='text-left'>Download our mobile app on</h3>
      </div>

      <section className='container my-8 flex  flex-col items-center gap-8 '>

        <div className='flex justify-center gap-3'>
          <div>
            <Image
              src={androidstore}
              alt='android'
              width={190}
              className='cursor-pointer'
            />
          </div>
          <div>
            <Image
              src={applestore}
              alt='apple'
              width={190}
              className='cursor-pointer'
            />
          </div>
        </div>

        <div>
          <p className='brand3 container text-center'>
            This electronically generated receipt is provided for informational
            purposes only and is not a legally binding document.
          </p>
        </div>
        <DefaultButton
          text='Download Receipt'
          type='button'
          handleClick={() => {}}
          className='my-6 rounded-lg bg-[#FCDFD4] p-4 px-10 hover:bg-[#F25E26] hover:text-white'
        />
      </section>
    </section>
  )
}

export default Page
