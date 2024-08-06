'use client'
import React from 'react'
import { Header } from '../component/Header'
import { Profile } from '../../app/profile/components/Profile'

import { userProfile } from "@/store/store"
import { useRouter } from 'next/navigation'
// import useAuthMiddleware from '@/hooks/useAuth'
import { useAuthOrders } from '@/hooks/useAuthOrders'
import { Footer } from '../component/Footer'
import { Title } from '../component/Title'

const Page = () => {
  const router = useRouter()

  /*  useAuthMiddleware(router) */
  useAuthOrders(router)

  const profile = userProfile(state => state.profile)

  return (
    <section>
      <header className="z-50">
        <Header />
      </header>

      <main className='container '>
        {/* <Profile /> */}
        <div onClick={() => router.back()}>
          <div className=" cursor-pointer container  flex justify-start">
            <p className="text-[#E84526] text-base">Back</p>
          </div>
        </div>


        <section style={{
          margin: '0 auto',
          width: '80%'
        }}  >


          <Title title="Purchase Order Details" />


        </section>
      </main>


      <Footer />
    </section>
  )
}

export default Page
