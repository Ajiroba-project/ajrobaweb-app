import React from 'react'
import {Data} from '../data'
import { userNavStore } from '@/store/store'

export const Tables = () => {
  const userNav =userNavStore( state =>state.userNav)

  return (
    <div className='container flex flex-col items-center justify-center overflow-x-auto'>
      <table className=' min-w-full  '>
        <tbody>
          {userNav === 'Data' ? (
            <tr className='flex flex-col divide-y divide-gray-300'>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  payment
                </span>
                <span className='font-semibold'>{Data.payment}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  customer Name
                </span>
                <span className='font-semibold'>{Data.customerName}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  address
                </span>
                <span className='font-semibold'>{Data.address}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  phone Number
                </span>
                <span className='font-semibold'>{Data.phone}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  network Provider
                </span>
                <span className='font-semibold'>{Data.network}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  data bundle
                </span>
                <span className='font-semibold'>{Data.network}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>amount</span>
                <span className='font-semibold'>₦ {Data.amount}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  transaction
                </span>
                <span className='font-semibold'>{Data.transaction}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  date of transaction
                </span>
                <span className='font-semibold'>{Data.date}</span>
              </td>
            </tr>
          ) : userNav === 'Airtime' ? (
            <tr className='flex flex-col divide-y divide-gray-300'>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  Recharge Method
                </span>
                <span className='font-semibold'>{Data.payment}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  customer Name
                </span>
                <span className='font-semibold'>{Data.customerName}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  address
                </span>
                <span className='font-semibold'>{Data.address}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  phone Number
                </span>
                <span className='font-semibold'>{Data.phone}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  network provider
                </span>
                <span className='font-semibold'>{Data.network}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>amount</span>
                <span className='font-semibold'>₦ {Data.amount}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  transaction
                </span>
                <span className='font-semibold'>{Data.transaction}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  date of transaction
                </span>
                <span className='font-semibold'>{Data.date}</span>
              </td>
            </tr>
          ) : userNav === 'Electricity' ? (
            <tr className='flex flex-col divide-y divide-gray-300'>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  payment method
                </span>
                <span className='font-semibold'>{Data.payment}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  customer Name
                </span>
                <span className='font-semibold'>{Data.customerName}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  address
                </span>
                <span className='font-semibold'>{Data.address}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  phone number
                </span>
                <span className='font-semibold'>{Data.phone}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>disco</span>
                <span className='font-semibold'>{Data.network}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  meter number
                </span>
                <span className='font-semibold'>{Data.network}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>unit</span>
                <span className='font-semibold'>{Data.network}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>token amount</span>
                <span className='font-semibold'>₦ {Data.amount}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>tax amount</span>
                <span className='font-semibold'>₦ {Data.amount}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>total payable</span>
                <span className='font-semibold'>₦ {Data.amount}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  transaction ID
                </span>
                <span className='font-semibold'>{Data.transaction}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  date of transaction
                </span>
                <span className='font-semibold'>{Data.date}</span>
              </td>
            </tr>
          ) : userNav === 'Cable Subscription' ? (
            <tr className='flex flex-col divide-y divide-gray-300'>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  payment method
                </span>
                <span className='font-semibold'>{Data.payment}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  customer name
                </span>
                <span className='font-semibold'>{Data.customerName}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  address
                </span>
                <span className='font-semibold'>{Data.address}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  phone number
                </span>
                <span className='font-semibold'>{Data.phone}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  Operator
                </span>
                <span className='font-semibold'>{Data.network}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>amount</span>
                <span className='font-semibold'>₦ {Data.amount}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  package
                </span>
                <span className='font-semibold'>{Data.network}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  IUC number
                </span>
                <span className='font-semibold'>{Data.network}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  transaction ID
                </span>
                <span className='font-semibold'>{Data.transaction}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                  date of transaction
                </span>
                <span className='font-semibold'>{Data.date}</span>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  )
}
