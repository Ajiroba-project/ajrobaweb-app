'use client'
import React from 'react'
import Image from 'next/image'
import Brand from '../../asset/logo.svg'
import {useRouter} from "next/navigation"
import {userNavStore} from "@/store/store"

type HeaderProps = {
  type: string
}

export const Header = () => {
  const userNav = userNavStore(state =>state.userNav)
    const router =useRouter()
  return (
    <section className='container flex flex-col '>
      <div className='flex justify-between items-center'>
        <Image src={Brand} alt='brand-logo' />
        <h2 className=' font-Poppins text-[#2A2A2A] font-normal   lg:text-xl md:text-xl leading-3 capitalize'>{userNav === "Data" ? 'data subscription':userNav === "Airtime"? 'airtime recharge':userNav ==="Electricity"?"electricity bill": userNav ==="Cable Subscription"? "cable subscription":'Transaction Receipts' }</h2>
      </div>
      <p className="brand1 py-4 cursor-pointer font-Poppins text-sm underline"  onClick={()=>router.back()}>Back</p>
    </section>
  )
}
