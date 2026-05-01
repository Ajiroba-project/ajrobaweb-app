'use client'
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Header } from '../component/Header'
import { PhotoUpload } from "./components/PhotoUpload"
import { userProfile } from "@/store/store"
import { useRouter } from 'next/navigation'
// import useAuthMiddleware from '@/hooks/useAuth'
import AuthMiddleware from '@/hooks/useAuthWallet'

const WalletProfile = dynamic(
  () => import('./components/Profile').then(m => ({ default: m.Profile })),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex min-h-[260px] w-full animate-pulse flex-col gap-4 rounded-lg bg-[#f6f6f6] p-4"
        aria-hidden
      />
    ),
  }
)

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
                    <WalletProfile />
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
