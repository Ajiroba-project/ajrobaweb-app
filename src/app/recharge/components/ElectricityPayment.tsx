import React from 'react'
import { Formtitle } from './Formtitle'
import { ElectricityPurchase, userNavStore } from '@/store/store'
import { DefaultButton } from '../../component/Button'
import { WalletPin } from './WalletPin'

export const ElectricityPayment = () => {
  const ElectricityDetails = ElectricityPurchase(state => state.ElectricityDetails)
  const setElectricityStepper = ElectricityPurchase(state => state.setElectricityStepper)
  const walletModal = userNavStore(state => state.walletModal)
  const setWalletModal = userNavStore(state => state.setWalletModal)

  return (
    <div className='container my-5 mt-[4rem]  flex flex-col gap-4 rounded bg-[#F6F6F6]'>
      <p
        className='brand1 cursor-pointer'
        onClick={() => setElectricityStepper(0)}
      >
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
            <p>{ElectricityDetails?.name}</p>
            <p className='brand1 text-sm italic'>
              (Please make sure the name on the display matches the actual name
              on your meter.)
            </p>
          </div>
          <div>
            <h3 className='text-[#6E6E6E]'>Meter No</h3>
            <p>{ElectricityDetails?.meter_no}</p>
          </div>

          <div>
            <h3 className='text-[#6E6E6E]'>Disco</h3>
            <p>{ElectricityDetails?.disco}</p>
          </div>
          <div>
            <h3 className='text-[#6E6E6E]'>Address</h3>
            <p className='font-semibold'>tesing....</p>
          </div>
          <div>
            <h3 className='text-[#6E6E6E]'>Amount</h3>
            <p className='font-semibold'>{ElectricityDetails?.amount}</p>
          </div>
          <div className='my-5 flex w-full items-center justify-center gap-8'>
            <DefaultButton
              type='button'
              text='Pay with Wallet'
              className='rounded-lg bg-[#f25e26] px-8 py-3 text-white '
              handleClick={
                setWalletModal
              }
            />
            <DefaultButton
              type='button'
              text='Pay Online'
              className='rounded-lg border-2 border-[#f25e26] px-8 py-3 text-[#f25e26]'
              handleClick={() => setElectricityStepper(2)}
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
