'use client'
import React from 'react'
import { Formtitle } from './Formtitle'
import { DataPurchase, userNavStore } from '@/store/store'
import { DefaultButton } from '../../component/Button'
import { WalletPin } from './WalletPin'

export const DataPayment = () => {
  const dataDetails = DataPurchase(state => state.dataDetails)
  const walletModal = userNavStore(state => state.walletModal)
  const setStepper = DataPurchase(state => state.setStepper)
  const setWalletModal = userNavStore(state => state.setWalletModal)

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
              handleClick={setWalletModal}
            />
            <DefaultButton
              type='button'
              text='Pay Online'
              className='rounded-lg border-2 border-[#f25e26] px-8 py-3 text-[#f25e26]'
              handleClick={() => setStepper(2)}
            />
          </div>
        </form>
      </div>
      <div
        className={`${walletModal ? 'absolute left-0 top-0 z-50 -mt-[9rem] h-screen w-full' : 'hidden'}`}
      >
        <WalletPin />
      </div>
    </div>
  )
}
