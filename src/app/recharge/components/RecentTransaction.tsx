'use client'
import React,{Fragment, useState} from 'react'

export const RecentTransaction = () => {
    const transac = [
      {
        logo: '',
        title: 'You just Bought ₦200 MTN Airtime',
        amount: '200',
        time: '3:15'
      },
      {
        logo: '',
        title: 'You just Bought 3000 unit',
        amount: '1000',
        time: '3:15'
      },
      {
        logo: '',
        title: 'You just Bought ₦200 MTN Airtime',
        amount: '200',
        time: '3:15'
      }
    ]
    const [allTransaction, setAllTransaction]=useState(transac.slice(0,2))


  return (
    <section className='my-10 rounded bg-[#F6F6F6] p-7 '>
      <div className='rounded border-2 border-[#f25e26] p-4'>
        <div className='flex justify-between'>
          <h3 className='text-xl font-semibold'> Recent Transaction</h3>
          <p
            className={`'text-[#F25E26] cursor-pointer '${allTransaction.length === transac.length ? 'pointer-events-none opacity-50 hidden' : ''}`}
            onClick={() => {
              setAllTransaction(transac)
            }}
          >
            View all
          </p>
        </div>
        <div className='my-4 flex flex-col  gap-4'>
          {allTransaction.map((val, index) => (
            <Fragment key={index}>
              <div className=' mr-4 flex cursor-pointer items-center justify-between rounded bg-[#FCDFD480] p-4 hover:shadow-md'>
                <div className='flex '>
                  <div>{/* logo */}</div>
                  <div className='flex flex-col'>
                    <p className='font-semibold'>{val.title}</p>
                    <p>{val.time}</p>
                  </div>
                </div>
                <div>
                  <p className='text-xl font-semibold'>₦{val.amount}</p>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
