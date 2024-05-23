import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'

type transacProps = {
  transac: any[]
}

export const AllOrder = ({ transac }: transacProps) => {

  return transac.map((val, index) => (
    <tr key={index} className=' relative border-b '>
      <td className='p-6 text-left text-sm tracking-wide'>1221389</td>
      <td className='p-6 text-left text-sm tracking-wide'>{val.title}</td>
      <td className='p-6 text-left text-sm tracking-wide'>₦ {val.amount}</td>
      <td className='p-6 text-left text-sm tracking-wide'>{val.time}</td>
      {val.status.map((val: string) => (
        <td key={val} className={`p-6 text-xs`}>
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
