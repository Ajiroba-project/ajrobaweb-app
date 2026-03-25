'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { Header } from '../component/Header'

const ProfileAuctionwins = dynamic(() => import('./components/ProfileAuctionwinsContent'), {
    ssr: false,
    loading: () => (
        <section>
            <Header />
            <div className='h-24 md:h-28 lg:h-32'></div>
            <main className='content-container'>
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F25E26]"></div>
                </div>
            </main>
        </section>
    ),
})

export default function Page() {
    return <ProfileAuctionwins />
}
