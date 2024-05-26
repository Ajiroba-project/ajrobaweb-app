import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'

type transacProps = {
  transac: any[]
}

export const PendingOrder = ({ transac }: transacProps) => {
  return transac.map((val, index) => (
    <tr key={index} className=' relative border-b  text-sm'>
      <td className='p-6 text-left tracking-wide  text-sm'>1221389</td>
      <td className='p-6 text-left tracking-wide  text-sm'>{val.title}</td>
      <td className='p-6 text-left tracking-wide  text-sm'>₦ {val.amount}</td>
      <td className='p-6 text-left tracking-wide  text-sm'>{val.time}</td>
      {val.status.map((val: string) => (
        <td key={val} className={`text-xs p-6`}>
          <span
            className={` ${val === 'pending' ? 'bg-gray-200 text-gray-800' : ' bg-green-200 text-emerald-800'} rounded-full px-3 py-1 capitalize`}
          >
            {val}
          </span>
        </td>
      ))}
      <td className='absolute right-3 top-2 cursor-pointer rounded-md border p-2  text-sm'>
        <CiMenuKebab />
      </td>
    </tr>
  ))
}
