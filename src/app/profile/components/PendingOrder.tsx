// import React from 'react'
// import { CiMenuKebab } from 'react-icons/ci'

// type transacProps = {
//   transac: any[]
// }

// export const PendingOrder = ({ transac }: transacProps) => {
//   return transac.map((val, index) => (
//     <tr key={index} className=' relative border-b  text-sm'>
//       <td className='p-6 text-left tracking-wide  text-sm'>1221389</td>
//       <td className='p-6 text-left tracking-wide  text-sm'>{val.title}</td>
//       <td className='p-6 text-left tracking-wide  text-sm'>₦ {val.amount}</td>
//       <td className='p-6 text-left tracking-wide  text-sm'>{val.time}</td>
//       {val.status.map((val: string) => (
//         <td key={val} className={`text-xs p-6`}>
//           <span
//             className={` ${val === 'pending' ? 'bg-gray-200 text-gray-800' : ' bg-green-200 text-emerald-800'} rounded-full px-3 py-1 capitalize`}
//           >
//             {val}
//           </span>
//         </td>
//       ))}
//       <td className='absolute right-3 top-2 cursor-pointer rounded-md border p-2  text-sm'>
//         <CiMenuKebab />
//       </td>
//     </tr>
//   ))
// }



import React from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import Dropdown from './Dropdown';

type Product = {
  name: string;
};

type Order = {
  order_id: string;
  products: Product[];
  total_price: string;
  order_date: string;
  delivery_status: string;
};

type transacProps = {
  transac: Order[];
};

export const PendingOrder = ({ transac }: transacProps) => {
  console.log(transac, 'transss');

  const handleOptionClick = (option: string, transaction: Order) => {
    // Handle the option click here
    // For example, you can show a confirmation dialog for "Delete"
    console.log(`${option} clicked for transaction:`, transaction);
  };

  return transac?.map((val, index) => (
    <tr key={index} className='relative border-b'>
      <td className='p-6 text-left text-sm tracking-wide text-[12px] text-[#344054] font-Poppins font-medium'>{val?.order_id}</td>
      <td className='p-6 text-left text-sm tracking-wide text-[12px] text-[#344054] font-Poppins font-medium'>
        {val.products.map((product, idx) => (
          <span key={idx}>{product.name}{idx < val.products.length - 1 ? ', ' : ''}</span>
        ))}
      </td>
      <td className='p-6 text-left text-sm tracking-wide text-[12px] text-[#344054] font-Poppins font-medium'>₦ {val.total_price}</td>
      <td className='p-6 text-left text-sm tracking-wide text-[12px] text-[#344054] font-Poppins font-medium'>{new Date(val.order_date).toLocaleString()}</td>
      <td className='p-6 text-left text-sm tracking-wide text-[12px] text-[#344054] font-Poppins font-medium'>
        <span
          className={`text-[12px] text-[#344054] font-Poppins font-medium ${
            val.delivery_status.toLowerCase() === 'pending' ? 'bg-[#D0D5DD] text-gray-800' :
            val.delivery_status.toLowerCase() === 'completed' ? 'bg-green-200 text-emerald-800' :
            val.delivery_status.toLowerCase() === 'delivered' ? 'bg-lime-200 text-emerald-800' : 'bg-green-200 text-emerald-800'
          } rounded-full px-3 py-1 capitalize`}
        >
          {val.delivery_status}
        </span>
      </td>
      <td className='absolute right-3 top-5 cursor-pointer rounded-md border text-sm'>
        <Dropdown onOptionClick={(option) => handleOptionClick(option, val)} />
      </td>
    </tr>
  ));
};


