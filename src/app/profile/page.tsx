'use client'
import React from 'react'
import { Header } from '../component/Header'
import { Profile } from './components/Profile'
import {PhotoUpload} from "./components/PhotoUpload"
import {userProfile} from "@/store/store"
import { useRouter } from 'next/navigation'
import useAuthMiddleware from '@/hooks/useAuth'

const Page = () => {
  const router = useRouter()
  useAuthMiddleware(router)
  const profile = userProfile(state=>state.profile)
  
  return (
    <section>
      <header className="z-50">
        <Header />
      </header>

      <main className='container '>
        <Profile />
      </main>

      {profile && <PhotoUpload />}

    </section>
  )
}

export default Page
