'use client'
import React, { useState } from 'react'
import { AllAuction } from './AllAuction'
import { OpenAuction } from './OpenAuction'
import { CloseAuction } from './CloseAuction'
import { Pipeline } from './Pipeline'
import { useGetOrderWinsData } from '@/hooks/useGetData'
import Cookies from 'js-cookie'

const auctionSwitch = ['all', 'open', 'close']

export const AuctionDetails = () => {
  const [pipeline, setPipeline] = useState<string>('all')

  const userToken = Cookies.get('token') as string;

  const { data: auctioninfo } = useGetOrderWinsData('/api/auctionwins', "get_auctionwins_details", userToken);

  return (
    <section className='mb-6 flex flex-col w-full lg:w-[50dvw]'>
      <Pipeline props={auctionSwitch} setProps={setPipeline} start={pipeline} />
      <div className='mt-6 rounded-md border-2 p-4'>
        {pipeline === auctionSwitch[0] ? (
          <AllAuction product={auctioninfo?.data?.data?.all} />
        ) : pipeline === auctionSwitch[1] ? (
          <OpenAuction product={auctioninfo?.data?.data?.open} />
        ) : (
          <CloseAuction product={auctioninfo?.data?.data?.closed} />
        )}
      </div>
    </section>
  )
}
