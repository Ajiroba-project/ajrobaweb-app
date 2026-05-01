'use client'
import React from 'react'
import Image from 'next/image'
import Brand from '../../../../asset/logo.svg'
import { useRouter, usePathname } from 'next/navigation'

/** Matches `/recharge/{segment}/...` — stable; global userNav is often unset (setUserNav unused). */
const TITLE_BY_SEGMENT: Record<string, string> = {
  electricity: 'electricity bill',
  airtime: 'airtime recharge',
  data: 'data subscription',
  cable: 'cable subscription',
}

export const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const segment = pathname?.split('/').filter(Boolean)[1]
  const title =
    segment && TITLE_BY_SEGMENT[segment] ? TITLE_BY_SEGMENT[segment] : 'electricity bill'

  return (
    <section className='flex flex-col'>
      <div className='flex items-center justify-between gap-3'>
        <Image src={Brand} alt='brand-logo' className='h-8 w-auto sm:h-10' />
        <h2 className='font-Poppins text-sm font-normal text-[#2A2A2A] capitalize sm:text-base md:text-xl'>
          {title}
        </h2>
      </div>
      <p className="brand1 cursor-pointer py-3 font-Poppins text-sm underline" onClick={() => router.back()}>Back</p>
    </section>
  )
}
