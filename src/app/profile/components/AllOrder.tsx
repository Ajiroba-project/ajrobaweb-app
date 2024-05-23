import { validData } from '@hookform/resolvers/computed-types/src/__tests__/__fixtures__/data.js'
import React from 'react'

type transacProps = {
  transac: any[]
}

export const AllOrder = ({ transac }: transacProps) => {
  return transac.map((val, index) => (
    <tr key={index} className=' border-b'>
      <td className='px-6 py-6'>yeuryuer</td>
      <td className='px-6 py-6'>Smart Phone</td>
      <td className='px-6 py-6'>₦ {val.amount}</td>
      <td className='px-6 py-6'>{val.time}</td>
      {val.status.map((val: string) => (
        <td key={val} className='px-6 py-6'>
          <span>{val}</span>
        </td>
      ))}
    </tr>
  ))
}
