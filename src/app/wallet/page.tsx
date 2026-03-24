'use client'
import React, { Suspense } from 'react'
import { Header } from '../component/Header'
import { Profile } from './components/Profile'
import { PhotoUpload } from "./components/PhotoUpload"
import { userProfile } from "@/store/store"
import { useRouter } from 'next/navigation'
// import useAuthMiddleware from '@/hooks/useAuth'
import AuthMiddleware from '@/hooks/useAuthWallet'

const WalletePage = () => {
    const router = useRouter()

    /*  useAuthMiddleware(router) */
    AuthMiddleware(router)

    const profile = userProfile(state => state.profile)

    return (
        <section>
            <Header />
            <div className='h-24 md:h-28 lg:h-32'></div>

<main style={{}}>

                <div className='content-container'>
                    <Profile />
                </div>
            </main>

            {profile && <PhotoUpload />}

        </section>
    )
}

// export default Page

export default function Page() {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <WalletePage />
        </Suspense>
    )
}
