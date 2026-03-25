import React from 'react'
import { userNavStore } from '@/store/store'

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
   Data: TransactionData[];
}

const ReceiptRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className='flex flex-col gap-0.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-2'>
    <span className='font-Poppins text-xs sm:text-sm font-medium capitalize text-[#F25E26]'>
      {label}
    </span>
    <span className='font-Poppins text-sm sm:text-base font-semibold text-[#2A2A2A] break-words text-left sm:text-right sm:max-w-[60%]'>
      {value}
    </span>
  </div>
);

export const ReceiptTable: React.FC<DataProps> = ({ Data }) => {
  const formattedDate = Data[0]?.date_created
    ? new Date(Data[0].date_created).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    : '';

  return (
    <div>
      <div className='divide-y divide-gray-200 rounded-xl border border-gray-100 bg-white px-4 sm:px-6 sm:border-0 sm:rounded-none sm:bg-transparent'>
        <ReceiptRow label="Beneficiary" value={Data[0]?.beneficiary} />
        <ReceiptRow label="Sender" value={Data[1]?.sender} />
        <ReceiptRow label="Transaction Type" value={Data[0]?.channel} />
        <ReceiptRow label="Transaction Date" value={formattedDate} />
        <ReceiptRow label="Transaction Status" value={Data[0]?.status} />
        <ReceiptRow label="Description" value={Data[0]?.description} />
        <ReceiptRow label="Transaction Reference" value={Data[0]?.reference} />
      </div>
    </div>
  )
}
