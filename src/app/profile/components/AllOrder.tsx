import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import Dropdown from './DropDown'

type transacProps = {
  transac: any[]
}

export const AllOrder = ({ transac }: transacProps) => {

    const handleOptionClick = (option: string, transaction: any) => {
    // Handle the option click here
    // For example, you can show a confirmation dialog for "Delete"
    console.log(`${option} clicked for transaction:`, transaction);
  };

  return transac.map((val, index) => (
    <tr key={index} className=' relative border-b '>
      <td className='p-6 text-left text-sm tracking-wide text-[12px] text-[#344054] font-Poppins font-medium'>1221389</td>
      <td className='p-6 text-left text-sm tracking-wide text-[12px] text-[#344054] font-Poppins font-medium'>{val.title}</td>
      <td className='p-6 text-left text-sm tracking-wide text-[12px] text-[#344054] font-Poppins font-medium'>₦ {val.amount}</td>
      <td className='p-6 text-left text-sm tracking-wide text-[12px] text-[#344054] font-Poppins font-medium'>{val.time}</td>
      {val.status.map((val: string) => (
        <td key={val} className={`p-6 text-xs`}>
          {/* {console.log(val)} */}
          <span
            className={`text-[12px] text-[#344054] font-Poppins font-medium ${val === 'pending' ? 'bg-[#D0D5DD] text-gray-800' : val === "completed" ? ' bg-green-200 text-emerald-800'  : val === "delivered" ? ' bg-lime-200 text-emerald-800' : ' bg-green-200 text-emerald-800'} rounded-full px-3 py-1 capitalize`}
          >
            {val}
          </span>
        </td>
      ))}
    {/*   <td className='absolute right-3 top-2 cursor-pointer rounded-md border p-2  text-sm'>
        <CiMenuKebab />
      </td> */}
       <td className='absolute right-3 top-5 cursor-pointer rounded-md border   text-sm'>
            <Dropdown onOptionClick={(option) => handleOptionClick(option, val)} />
          </td>
    </tr>
  ))
}
