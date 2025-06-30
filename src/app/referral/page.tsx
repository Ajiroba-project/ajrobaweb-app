'use client'
import { AuctionBanner } from '../component/AuctionBanner'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { Fragment, Suspense, useEffect, useState } from 'react'

import { userNavStore, useAuthStore, AirtimePurchase } from '@/store/store'
import { useRouter } from 'next/navigation'

import { LuMenu } from 'react-icons/lu'
import banner from '../asset/image/referral.svg'
import TitleText from '../component/TitleText'

const ReferralPage = () => {
    const setAirtimeStepper = AirtimePurchase(state => state.setAirtimeStepper)
    const { userNavMenu, sidebar, toggleSidebar } = userNavStore(state => ({
        userNavMenu: state.userNav,
        sidebar: state.sidebar,
        toggleSidebar: state.toggleSidebar
    }))
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setAirtimeStepper(0)
        setIsLoading(false)
    }, [setAirtimeStepper])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <Fragment>
            <section className='fixed z-50 w-full'>
                <Header />
            </section>

            <main className='container'>
                <section className='pt-[20vh]'>
                    <TitleText text='Refer And Earn' />
                </section>

                <section className='py-8'>
                    <AuctionBanner text='Refer And Earn' banner={banner} />
                </section>


            </main>

            <Footer />
        </Fragment>
    )
}

export default function Searchbar() {
    const { isLoggedIn } = useAuthStore(state => ({
        isLoggedIn: state.isLoggedIn
    }))
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        if (!isLoggedIn) {
            router.push('/signin')
        }
    }, [isLoggedIn, router])

    // During SSR and initial client render, show nothing
    if (!isClient) {
        return null
    }

    // After hydration, if not logged in, show nothing (will redirect)
    if (!isLoggedIn) {
        return null
    }

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div>Loading...</div>
            </div>
        }>
            <ReferralPage />
        </Suspense>
    )
}
