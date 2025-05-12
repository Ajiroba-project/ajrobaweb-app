'use client'
import React, { useState, useEffect } from 'react'
import { AllAuction } from './AllAuction'
import { OpenAuction } from './OpenAuction'
import { CloseAuction } from './CloseAuction'
import { Products } from '@/app/static-data'
import { Pipeline } from './Pipeline'
import { useGetOrderWinsData } from '@/hooks/useGetData'
import Cookies from 'js-cookie'

export const AuctionDetails = () => {
  const auctionSwitch = ['all', 'open', 'close']
  const [pipeline, setPipeline] = useState<string>('all')
  const [openFilter, setOpenFilter] = useState<any>()
  const [closeFilter, setCloseFilter] = useState<any>()
  const Filtered = Products.filter(val => val.tag)

  useEffect(() => {
    const filteredOpen = Products.filter(val => val.tag?.includes('open'))
    setOpenFilter(filteredOpen)
    const filteredClose = Products.filter(val => val.tag?.includes('close'))
    setCloseFilter(filteredClose)
  }, [])


  // const userToken = token;
  const userToken = Cookies.get('token') as string;

  const tkn_: string = Cookies.get('token') as string;

  const { data: auctioninfo, isLoading: auctionLoading, error: ordererror } = useGetOrderWinsData('/api/auctionwins', "get_auctionwins_details", userToken);

  // console.log(auctioninfo, "auctioninfo")


  return (
    /*   <section className='mb-6  flex w-full flex-col  lg:w-[50dvw] '> */
    <section className='mb-6  flex  flex-col  w-full lg:w-[50dvw]'>
      <Pipeline props={auctionSwitch} setProps={setPipeline} start={pipeline} />
      <div className='mt-6 rounded-md  border-2 p-4'>
        {pipeline === auctionSwitch[0] ? (
          <AllAuction product={auctioninfo?.data?.data?.all} />
        ) : pipeline === auctionSwitch[1] ? (
          <OpenAuction product={openFilter} />
        ) : (
          <CloseAuction product={closeFilter} />
        )}
      </div>

    </section>
  )
}
