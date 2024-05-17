'use client'
import React from 'react'
import Image from 'next/image'
import Brand from '../../asset/logo.svg'
import {useRouter} from "next/navigation"

type HeaderProps = {
  type: string
}

export const Header = () => {
    const router =useRouter()
  return (
    <section className='container flex flex-col '>
      <div className='flex justify-between items-center'>
        <Image src={Brand} alt='brand-logo' />
        <h2 className='text-2xl leading-3'>Data Recharge</h2>
      </div>
      <p className="brand1 py-4 cursor-pointer" onClick={()=>router.back()}>Back</p>
    </section>
  )
}
