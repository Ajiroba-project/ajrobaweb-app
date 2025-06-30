import React from 'react'
import {WalletBalance} from "./WalletBalance"
import { WalletTransaction } from './WalletTransaction'

export const WalletDetails = () => {
  return (
    <section className='md:full mb-6 flex w-full flex-col gap-4 lg:w-[60dvw] lg:flex-row '>
      <div className='border p-4  rounded-md flex-1 h-max grow'>
        <WalletBalance />
      </div>
      <div className="border rounded-md p-4  bg-white ">
        <WalletTransaction/>
      </div>
    </section>
  )
}
