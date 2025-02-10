'use client'
import React,{Fragment, useState} from 'react'
import {transactions} from '@/app/static-data'
import Cookies from 'js-cookie'
import { useGetDatanew } from '@/hooks/useGetData'

export const RecentTransaction = () => {




    const userToken = (Cookies.get("token") as string) || "";

     const url = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/recent_transactions/`;

  const { data: recenttransdata, isLoading: recenttransLoading } = useGetDatanew(
    url,
    "get_recent_transactions",
    userToken || " ",
  );

   const [allTransaction, setAllTransaction]=useState(recenttransdata?.results?.data?.slice(0,5) || [])

  // console.log(recenttransdata?.results?.data, 'benedata')





  return (
    <section className='my-10 rounded bg-[#F6F6F6] p-7 '>
      <div className='rounded border-2 border-[#f25e26] p-4'>
        <div className='flex justify-between'>
          <h3 className='text-xl font-semibold'> Recent Transaction</h3>
          <p
            className={`'text-[#F25E26] cursor-pointer '${allTransaction?.length === recenttransdata?.results?.data ? 'pointer-events-none opacity-50 hidden' : ''}`}
            onClick={() => {
              setAllTransaction(recenttransdata?.results?.data)
            }}
          >
            View all
          </p>
        </div>
        <div className='my-4 flex flex-col  gap-4'>
          {allTransaction?.map((val: { description: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; time: any; amount: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }, index: React.Key | null | undefined) => (
            <Fragment key={index}>
              <div className=' mr-4 flex cursor-pointer items-center justify-between rounded bg-[#FCDFD480] p-4 hover:shadow-md'>
                <div className='flex '>
                  <div>{/* logo */}</div>
                  <div className='flex flex-col'>
                    <p className='font-semibold'>{val?.description}</p>
                    <p>{val.time || 'NA'}</p>
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
