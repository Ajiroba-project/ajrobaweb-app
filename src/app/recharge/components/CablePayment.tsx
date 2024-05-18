import React from 'react'
import { Formtitle } from './Formtitle'
import { CablePurchase } from '@/store/store'
import { DefaultButton } from '../../component/Button'

export const CablePayment = () => {
  const CableDetails = CablePurchase(state => state.CableDetails)
  const setCableStepper = CablePurchase(state => state.setCableStepper)

  return (
    <div className='my-5 mt-[4rem] flex  flex-col gap-4 rounded'>
      <p className='brand1 cursor-pointer' onClick={() => setCableStepper(0)}>
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
            <h3 className='text-[#6E6E6E]'>Name</h3>
            <p>{CableDetails?.name}</p>
          </div>
          <div>
            <h3 className='text-[#6E6E6E]'>Operator</h3>
            <p>{CableDetails?.network}</p>
          </div>

          <div>
            <h3 className='text-[#6E6E6E]'>Package</h3>
            <p>{CableDetails?.netpackage}</p>
          </div>
          <div>
            <h3 className='text-[#6E6E6E]'>SmartCard/IUC Number</h3>
            <p className='font-semibold'>{CableDetails?.smartcard}</p>
          </div>
          <div>
            <h3 className='text-[#6E6E6E]'>Amount</h3>
            <p className='font-semibold'>1234567</p>
          </div>
          <div className='my-5 flex w-full items-center justify-center gap-8'>
            <DefaultButton
              type='button'
              text='Pay with Wallet'
              className='rounded-lg bg-[#f25e26] px-8 py-3 text-white '
              handleClick={() => {
                setCableStepper(2)
              }}
            />
            <DefaultButton
              type='button'
              text='Pay Online'
              className='rounded-lg border-2 border-[#f25e26] px-8 py-3 text-[#f25e26]'
              handleClick={() => setCableStepper(2)}
            />
            <DefaultButton
              type='button'
              text='USSD'
              className='rounded-lg border-2 border-[#f25e26] px-8 py-3 text-[#f25e26]'
              handleClick={() => setCableStepper(2)}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
