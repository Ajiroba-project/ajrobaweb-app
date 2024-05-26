import React from 'react'
import { transactions } from '@/app/static-data'
import { GoArrowDownLeft, GoArrowUpRight } from 'react-icons/go'

export const WalletTransaction = () => {
  const TransactionTemplate = () => {
    return (
      <div>
        {transactions.map((val, index) => (
          <>
            <div
              key={index}
              className='flex w-full  flex-col items-start justify-around gap-6  py-5 lg:flex-row'
            >
              <div className='flex items-center gap-3 lg:flex-row flex-col w-full'>
                {val.type === 'purchase' ? (
                  <div className='flex w-fit items-center lg:justify-center rounded-full bg-emerald-200 p-2'>
                    <GoArrowUpRight className='text-lg font-semibold text-green-700' />
                  </div>
                ) : (
                  <div className='flex w-fit items-center lg:justify-center rounded-full bg-amber-200 p-2'>
                    {' '}
                    <GoArrowDownLeft className='text-lg font-semibold text-amber-700' />
                  </div>
                )}
                <div className='flex w-full flex-col  justify-center items-center lg:justify-start lg:items-start'>
                  <p className='line-clamp-1 cursor-pointer truncate text-ellipsis text-pretty'>
                    {val.title}
                  </p>
                  <p className='text-sm '>{val.brand}</p>
                </div>
              </div>
              {/*  */}
              <div className="flex flex-col justify-center items-center lg:items-baseline  lg:justify-start w-full lg:w-max">
                <p className='font-medium text-lg w-max'>₦ {val.amount}</p>
                <p>{val.time}</p>
                <p className='brand1 w-max cursor-pointer pt-4 text-xs capitalize underline'>
                  view receipt
                </p>
              </div>
            </div>
            <hr />
          </>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start">
        <p className='text-lg lg:text-xl font-semibold capitalize leading-relaxed'>
        recent transactions
      </p>
      <p className='date-history'>january 2024</p>
      </div>
      <div className="py-2">
        <TransactionTemplate />
      </div>
    </div>
  )
}
