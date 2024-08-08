import React from 'react'
// import {Data} from '../data'
import { userNavStore } from '@/store/store'
// import { userNavStore } from '@/store/store'


interface TransactionData {
  beneficiary: string;
  sender: string;
  transactionType: string;
  transactionDate: string;
  transactionStatus: string;
  description: string;
  transactionReference: string;
  channel: string;
  date_created: string;
  status: string;
  reference: string
}

interface DataProps {
  Data: {
    data: TransactionData[];
  };
}

export const Tables: React.FC<DataProps> = ({ Data }) => {
  const userNav =userNavStore( state =>state.userNav)

  console.log(Data)

//   console.log(userNav)

console.log(Data?.data[1]?.sender)

  return (
    <div style={{
        margin: '0 auto',
        width: '90%'
      }}  className='container flex flex-col items-center justify-center overflow-x-auto'>
      <table className=' min-w-full  '>
        <tbody>
          {
        /*   userNav === 'Data' ? ( */
            <tr className='flex flex-col divide-y divide-gray-300'>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1 font-medium text-sm capitalize font-Poppins text-[#F25E26]'>
              Beneficiary
                </span>
                <span className='font-semibold text-[#2A2A2A] font-Poppins text-base'>{Data?.data[0]?.beneficiary}</span>
              </td>
             <td className='flex items-center justify-between py-2'>
                <span className='brand1 font-medium text-sm capitalize font-Poppins text-[#F25E26]'>
              Sender
                </span>
             <span className='font-semibold text-[#2A2A2A] font-Poppins text-base'>{Data?.data[1]?.sender}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1 font-medium text-sm capitalize font-Poppins text-[#F25E26]'>
                  Transaction Type
                </span>
   <span className='font-semibold text-[#2A2A2A] font-Poppins text-base'>{Data?.data[0]?.channel}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1 font-medium text-sm capitalize font-Poppins text-[#F25E26]'>
                 Transaction Date
                </span>
  <span className='font-semibold text-[#2A2A2A] font-Poppins text-base'>{Data?.data[0]?.date_created}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1 font-medium text-sm capitalize font-Poppins text-[#F25E26]'>
                Transaction Status
                </span>
 <span className='font-semibold text-[#2A2A2A] font-Poppins text-base'>{Data?.data[0]?.status}</span>
              </td>
              <td className='flex items-center justify-between py-2'>
                <span className='brand1 font-medium text-sm capitalize font-Poppins text-[#F25E26]'>
                Description
                </span>
 <span className='font-semibold text-[#2A2A2A] font-Poppins text-base'>{Data?.data[0]?.description}</span>
              </td>
             {/*   <td className='flex items-center justify-between py-2'>
                <span className='brand1 font-medium text-sm capitalize font-Poppins text-[#F25E26]'>
                Description
                </span>

              </td> */}
              <td className='flex items-center justify-between py-2'>
                <span className='brand1  font-semibold capitalize'>
                Transaction Reference
                </span>
                 <span className='font-semibold text-[#2A2A2A] font-Poppins text-base'>{Data?.data[0]?.reference}</span>
                {/* <span className='font-semibold'>{Data.transaction}</span> */}
              </td>

            </tr>


          }
        </tbody>
      </table>
    </div>
  )
}
