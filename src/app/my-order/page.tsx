'use client'
import React, { Suspense } from 'react'
import { Header } from '../component/Header'
import { Profile } from './components/Profile'
import { PhotoUpload } from "./components/PhotoUpload"
import { userProfile } from "@/store/store"
import { useRouter } from 'next/navigation'
// import useAuthMiddleware from '@/hooks/useAuth'
import AuthMiddleware from '@/hooks/useAuthmyorder'

const MyOrder = () => {
    const router = useRouter()

    /*  useAuthMiddleware(router) */
    AuthMiddleware(router)

    const profile = userProfile(state => state.profile)

    return (
        <section>
            <header className="z-50">
                <Header />
            </header>

            <main className='container ' style={{
                width: '95%',
                maxWidth: '100%',
                margin: '0 auto',
                marginTop: '20px'
            }}>
                <Profile />
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
            <MyOrder />
        </Suspense>
    )
}
