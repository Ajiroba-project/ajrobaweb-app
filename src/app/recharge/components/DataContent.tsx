'use client'
import React, { useState } from 'react'
import { userNavStore } from '@/store/store'
import { DataDetails } from './DataDetails'
import { AirtimeDetails } from './AirtimeDetails'
import {CableDetails} from './CableDetails'
import {ElectricityDetails} from './ElectricityDetails'
import { DataPayment } from './DataPayment'
import {AirtimePayment} from './AirtimePayment'
import {CablePayment} from './CablePayment'
import {ElectricityPayment} from './ElectricityPayment'
import {
  DataPurchase,
  AirtimePurchase,
  CablePurchase,
  ElectricityPurchase
} from '@/store/store'
import { stepperList } from '@/app/static-data'
import { Receipt } from './Receipt'
export const DataContent = () => {
  const stepper = DataPurchase(state => state.stepper)
  const CableStepper = CablePurchase(state => state.CableStepper)
  const AirtimeStepper = AirtimePurchase(state => state.AirtimeStepper)
  const ElectricityStepper = ElectricityPurchase(state => state.ElectricityStepper)

  const userNavMenu = userNavStore(state => state.userNav)
  
  
  return (
    <section className='flex flex-col-reverse gap-4 lg:flex-row '>
      <div className='my-[4.5rem] flex flex-col gap-4'>
        {stepperList.map((val, index) => (
          <div
            key={index}
            className={` flex items-center gap-2 rounded-md border p-4 px-10 text-[#A09F9F] ${index === stepper || index <= stepper ? 'cursor-pointer border-2 border-[#F25E26] bg-[#FCDFD4] text-[#f25e26]' : index === AirtimeStepper || index <= AirtimeStepper ? 'cursor-pointer border-2 border-[#F25E26] bg-[#FCDFD4] text-[#f25e26]' : 'border-2 opacity-50'} border-[#A09F9F] `}
          >
            <div>{val.icons}</div>
            <p className='w-max'>{val.name}</p>
          </div>
        ))}
      </div>
      {userNavMenu === 'Data' && (
        <div className='container'>
          {stepper === 0 ? (
            <DataDetails />
          ) : stepper === 1 ? (
            <DataPayment />
          ) : (
            <Receipt />
          )}
        </div>
      )}
      {userNavMenu === 'Airtime' && (
        <div className='container'>
          {AirtimeStepper === 0 ? (
            <AirtimeDetails />
          ) : AirtimeStepper === 1 ? (
            <AirtimePayment />
          ) : (
            <Receipt />
          )}
        </div>
      )}
      {userNavMenu === 'Cable Subscription' && (
        <div className='container'>
          {CableStepper === 0 ? (
            <CableDetails />
          ) : CableStepper === 1 ? (
            <CablePayment />
          ) : (
            <Receipt />
          )}
        </div>
      )}
      {userNavMenu === 'Electricity' && (
        <div className='container '>
          {ElectricityStepper === 0 ? (
            <ElectricityDetails />
          ) : ElectricityStepper === 1 ? (
            <ElectricityPayment />
          ) : (
            <Receipt />
          )}
        </div>
      )}
    </section>
  )
}
