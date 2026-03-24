'use client'
import React from 'react'
import { Profile } from './components/Profile'
import { PhotoUpload } from "./components/PhotoUpload"
import { userProfile } from "@/store/store"
import { useRouter } from 'next/navigation'
import AuthMiddleware from '@/hooks/useAuth'

const ProfilePageContent = () => {
  const router = useRouter()
  AuthMiddleware(router)

  const profile = userProfile(state => state.profile)

  return (
    <>
      <main>
        <div className='content-container'>
          <Profile />
        </div>
      </main>
      {profile && <PhotoUpload />}
    </>
  )
}

export default ProfilePageContent
