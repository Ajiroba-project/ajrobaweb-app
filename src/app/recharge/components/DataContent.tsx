'use client'
import React, {useState} from 'react'
import { RxFileText } from 'react-icons/rx'
import {IoReceiptOutline} from 'react-icons/io5'
import { BsCreditCard2Back } from 'react-icons/bs'
import {DataDetails} from "./DataDetails"
import { DataPayment } from './DataPayment'
import {DataPurchase} from '@/store/store'
export const DataContent = () => {
  const stepper= DataPurchase(state =>state.stepper)
  const lists = [
    {
      name: 'Enter Details',
      icons: <RxFileText/>
    },
    {
      name: 'Payment',
      icons: <BsCreditCard2Back/>
    },
    {
      name: 'Receipts',
      icons: <IoReceiptOutline/>
    }
  ]
  return (
    <section className='flex gap-4 lg:flex-row flex-col-reverse '>
      <div className='my-[4.5rem] flex flex-col gap-4'>
        {lists.map((val, index) => (
          <div
            key={index}
            className={` flex items-center gap-2 rounded-md border p-4 px-10 ${index === stepper || index <=stepper ? 'cursor-pointer border-2 border-[#F25E26] bg-[#FCDFD4] text-[#f25e26]' : 'border-2 border-[#A09F9F] text-[#A09F9F] opacity-50'} `}
          >
            <div>{val.icons}</div>
            <p className='w-max'>{val.name}</p>
          </div>
        ))}
      </div>
      <div className='container bg-[#F6F6F6]'>
        {stepper === 0 ? <DataDetails /> : stepper === 1 ? <DataPayment /> : ''}
      </div>
    </section>
  )
}
