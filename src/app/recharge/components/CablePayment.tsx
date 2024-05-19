import React, {useState} from 'react'
import { Formtitle } from './Formtitle'
import { CablePurchase, userNavStore } from '@/store/store'
import { DefaultButton } from '../../component/Button'
import { WalletPin } from './WalletPin'
import {USSD} from './USSD'
export const CablePayment = () => {
  const CableDetails = CablePurchase(state => state.CableDetails)
  const setCableStepper = CablePurchase(state => state.setCableStepper)
  const walletModal = userNavStore(state => state.walletModal)
  const setWalletModal = userNavStore(state => state.setWalletModal)
  const [ussd, setUssd]=useState(false)

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
            <p className='font-semibold'>₦{CableDetails.amount}</p>
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
              handleClick={() => setCableStepper(2)}
            />
            <DefaultButton
              type='button'
              text='USSD'
              className='rounded-lg border-2 border-[#f25e26] px-8 py-3 text-[#f25e26]'
              handleClick={() => setUssd(!ussd)}
            />
          </div>
        </form>
      </div>
      <div
        className={`${walletModal ? 'absolute left-0 top-0 z-50 -mt-[9rem] h-screen w-full' : 'hidden'}`}
      >
        {<WalletPin />}
      </div>
      <div
        className={`${ussd ? 'absolute left-0 top-0 z-50 -mt-[9rem] h-screen w-full' : 'hidden'}`}
      >
        {<USSD close={()=>setUssd(!ussd)}/>}
      </div>
    </div>
  )
}
