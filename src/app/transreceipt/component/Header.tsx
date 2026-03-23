'use client'
import React from 'react'
import Image from 'next/image'
import Brand from '../../asset/logo.svg'
import { useRouter } from "next/navigation"
import { userNavStore } from "@/store/store"

export const Header = () => {
  const userNav = userNavStore(state => state.userNav)
  const router = useRouter()

  const title = userNav === "Data" ? 'data subscription'
    : userNav === "Airtime" ? 'airtime recharge'
    : userNav === "Electricity" ? "electricity bill"
    : userNav === "Cable Subscription" ? "cable subscription"
    : 'Transaction Receipt';

  return (
    <section className='flex flex-col'>
      <div className='flex items-center justify-between gap-3'>
        <Image src={Brand} alt='brand-logo' className='h-8 w-auto sm:h-auto' />
        <h2 className='font-Poppins text-[#2A2A2A] font-normal text-sm sm:text-base md:text-xl capitalize text-right'>{title}</h2>
      </div>
      <p className="brand1 py-3 sm:py-4 cursor-pointer font-Poppins text-sm underline" onClick={() => router.back()}>Back</p>
    </section>
  )
}
