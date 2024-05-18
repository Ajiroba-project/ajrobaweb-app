import React from 'react'
import { Formtitle } from './Formtitle'
import { AirtimePurchase } from '@/store/store'
import { DefaultButton } from '../../component/Button'

export const AirtimePayment = () => {
  const AirtimeDetails = AirtimePurchase(state => state.AirtimeDetails)
  const setAirtimeStepper = AirtimePurchase(state => state.setAirtimeStepper)

  return (
    <div className='my-5 mt-[4rem] flex  flex-col gap-4 rounded'>
      <p className='brand1 cursor-pointer' onClick={() => setAirtimeStepper(0)}>
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
            <p>{AirtimeDetails?.network}</p>
          </div>
          <div>
            <h3 className='text-[#6E6E6E]'>Phone Number</h3>
            <p>{AirtimeDetails?.phone}</p>
          </div>
          
          <div>
            <h3 className='text-[#6E6E6E]'>Amount</h3>
            <p>{AirtimeDetails?.amount}</p>
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
              handleClick={() => {
                setAirtimeStepper(2)
              }}
            />
            <DefaultButton
              type='button'
              text='Pay Online'
              className='rounded-lg border-2 border-[#f25e26] px-8 py-3 text-[#f25e26]'
              handleClick={() => setAirtimeStepper(2)}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
