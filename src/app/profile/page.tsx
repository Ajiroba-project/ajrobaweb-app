'use client'
import React from 'react'
import { Header } from '../component/Header'
import { Profile } from './components/Profile'
import {PhotoUpload} from "./components/PhotoUpload"
import {userProfile} from "@/store/store"

const Page = () => {
  const profile = userProfile(state=>state.profile)
  return (
    <section>
      <header className="z-50">
        <Header />
      </header>
      <main className='container'>
        <Profile />
      </main>
      <div className={`${profile ? 'absolute left-0 top-0 z-50  h-screen w-full':'hidden'}`}>
        <PhotoUpload />
      </div>
    </section>
  )
}

export default Page
