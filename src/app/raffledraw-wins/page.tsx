'use client'
import React, { Suspense } from 'react'
import { Header } from '../component/Header'
import { Profile } from './components/Profile'
import { PhotoUpload } from "./components/PhotoUpload"
import { userProfile } from "@/store/store"
import { useRouter } from 'next/navigation'
import AuthMiddleware from '@/hooks/useAuthAuctionwins'

const ProfileAuctionwins = () => {
    const router = useRouter()
    AuthMiddleware(router)

    const profile = userProfile(state => state.profile)

    return (
        <section>
            <header className="z-50">
                <Header />
            </header>

            <main className='content-container mt-8'>
                <Profile />
            </main>

            {profile && <PhotoUpload />}
        </section>
    )
}

export default function Page() {
    return (
        <Suspense>
            <ProfileAuctionwins />
        </Suspense>
    )
}
