import React from 'react'
import { Formtitle } from './Formtitle'
import { DataPurchase } from '@/store/store'
import {DefaultButton} from '../../component/Button'


export const DataPayment = () => {
  const dataDetails  = DataPurchase(state => state.DataPurchase)
  const setStepper = DataPurchase(state => state.DataPurchase)
  
  return (
    <div className='my-5 mt-[4rem] flex  flex-col gap-4 rounded'>
      <p className='brand1 cursor-pointer' onClick={() => setStepper(0)}>
        Back
      </p>
      <div className='flex items-center justify-center '>
        <Formtitle
          title='Payment'
          subtitle='you can make your payment with any of the payment option below '
        />
      </div>

      <div className='flex'>
        <form className='flex w-full flex-col items-start justify-start gap-4 py-10 '>
          <div>
            <h3 className='text-[#6E6E6E]'>Network Provider</h3>
            <p>{dataDetails?.network}</p>
          </div>
          <div>
            <h3 className='text-[#6E6E6E]'>Phone Number</h3>
            <p>{dataDetails?.phone}</p>
          </div>
          <div>
            <h3 className='text-[#6E6E6E]'>Data Bundle</h3>
            <p>{dataDetails?.data}</p>
          </div>

          <div>
            <h3 className='text-[#6E6E6E]'>Amount</h3>
            <p>{dataDetails?.amount}</p>
          </div>
          <div>
            <h3 className='text-[#6E6E6E]'>Tranction ID</h3>
            <p className='font-semibold'>1234567</p>
          </div>
          <div className='my-5 flex w-full items-center justify-center gap-8'>
            <DefaultButton
              type='button'
              text='Pay with Wallet'
              className='rounded-lg bg-[#f25e26] px-8 py-3 text-white '
              handleClick={() => {}}
            />
            <DefaultButton
              type='button'
              text='Pay Online'
              className='rounded-lg border-2 border-[#f25e26] px-8 py-3 text-[#f25e26]'
              handleClick={() => {}}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
