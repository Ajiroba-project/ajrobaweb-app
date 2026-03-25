'use client'
import React from 'react'
import { Header } from '../../component/Header'
import { Profile } from './Profile'
import { PhotoUpload } from './PhotoUpload'
import { userProfile } from '@/store/store'
import { useRouter } from 'next/navigation'
import AuthMiddleware from '@/hooks/useAuthAuctionwins'

const ProfileAuctionwinsContent = () => {
    const router = useRouter()
    AuthMiddleware(router)

    const profile = userProfile(state => state.profile)

    return (
        <section>
            <Header />
            <div className='h-24 md:h-28 lg:h-32'></div>

            <main className='content-container'>
                <Profile />
            </main>

            {profile && <PhotoUpload />}
        </section>
    )
}

export default ProfileAuctionwinsContent
