'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { Header } from '../component/Header'
import Loading from '../component/Loading'

const ProfilePageContent = dynamic(() => import('./ProfilePageContent'), {
  ssr: false,
  loading: () => <Loading />,
})

export default function Page() {
  return (
    <section>
      <Header />
      <div className='h-24 md:h-28 lg:h-32'></div>
      <ProfilePageContent />
    </section>
  )
}
