import React from 'react'
import {Data} from '../data'

export const Tables = () => {
    const Datathead = [
      'payment method',
      'customer name',
      'address',
      'phone number',
      "network provider", 
      "amount", 
      "tansaction ID",
      "date of transaction"
    ]
  return (
    <div className='overflow-x-auto flex container flex-col justify-center items-center'>
      <table className=' min-w-full  '>
        <tbody>
          <tr className='flex flex-col divide-y divide-gray-300'>
            <td className='flex items-center justify-between py-2'>
              <span className='brand1  capitalize font-semibold'>payment</span>
              <span className='font-semibold'>{Data.payment}</span>
            </td>
            <td className='flex items-center justify-between py-2'>
              <span className='brand1  capitalize font-semibold'>customerName</span>
              <span className='font-semibold'>{Data.customerName}</span>
            </td>
            <td className='flex items-center justify-between py-2'>
              <span className='brand1  capitalize font-semibold'>address</span>
              <span className='font-semibold'>{Data.address}</span>
            </td>
            <td className='flex items-center justify-between py-2'>
              <span className='brand1  capitalize font-semibold'>phone</span>
              <span className='font-semibold'>{Data.phone}</span>
            </td>
            <td className='flex items-center justify-between py-2'>
              <span className='brand1  capitalize font-semibold'>network</span>
              <span className='font-semibold'>{Data.network}</span>
            </td>
            <td className='flex items-center justify-between py-2'>
              <span className='brand1  capitalize font-semibold'>amount</span>
              <span className='font-semibold'>₦ {Data.amount}</span>
            </td>
            <td className='flex items-center justify-between py-2'>
              <span className='brand1  capitalize font-semibold'>transaction</span>
              <span className='font-semibold'>{Data.transaction}</span>
            </td>
            <td className='flex items-center justify-between py-2'>
              <span className='brand1  capitalize font-semibold'>date of transaction</span>
              <span className='font-semibold'>{Data.date}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
