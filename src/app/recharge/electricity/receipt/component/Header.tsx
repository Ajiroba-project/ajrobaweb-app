'use client'
import React from 'react'
import Image from 'next/image'
import Brand from '../../../../asset/logo.svg'
import {useRouter} from "next/navigation"
import {userNavStore} from "@/store/store"

export const Header = () => {
  const userNav = userNavStore(state => state.userNav)
  const router = useRouter()
  return (
    <section className='flex flex-col'>
      <div className='flex items-center justify-between gap-3'>
        <Image src={Brand} alt='brand-logo' className='h-8 w-auto sm:h-10' />
        <h2 className='font-Poppins text-sm font-normal text-[#2A2A2A] capitalize sm:text-base md:text-xl'>
          {userNav === "Data" ? 'data subscription' : userNav === "Airtime" ? 'airtime recharge' : userNav === "Electricity" ? "electricity bill" : userNav === "Cable Subscription" ? "cable subscription" : 'Electricity Subscription'}
        </h2>
      </div>
      <p className="brand1 cursor-pointer py-3 font-Poppins text-sm underline" onClick={() => router.back()}>Back</p>
    </section>
  )
}
