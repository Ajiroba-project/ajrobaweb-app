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
import { FaLinkedinIn, FaPinterestP, FaEnvelope, FaWhatsapp, FaTwitter, FaFacebookF, FaLink } from 'react-icons/fa'

const ReferralPage = () => {
    const setAirtimeStepper = AirtimePurchase(state => state.setAirtimeStepper)
    const { userNavMenu, sidebar, toggleSidebar } = userNavStore(state => ({
        userNavMenu: state.userNav,
        sidebar: state.sidebar,
        toggleSidebar: state.toggleSidebar
    }))
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [friendInput, setFriendInput] = useState('')
    const [referralLink] = useState('http://ajiroba/aff/5236780')
    const [copied, setCopied] = useState(false)

    // Social share icons (using react-icons)
    const socialIcons = [
        { icon: <FaLinkedinIn />, color: '#0077b5', label: 'LinkedIn' },
        { icon: <FaPinterestP />, color: '#e60023', label: 'Pinterest' },
        { icon: <FaEnvelope />, color: '#0072c6', label: 'Email' },
        { icon: <FaWhatsapp />, color: '#25d366', label: 'WhatsApp' },
        { icon: <FaTwitter />, color: '#1da1f2', label: 'Twitter' },
        { icon: <FaFacebookF />, color: '#1877f3', label: 'Facebook' },
    ]

    useEffect(() => {
        setAirtimeStepper(0)
        setIsLoading(false)
    }, [setAirtimeStepper])

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    const handleRefer = () => {
        // Implement refer logic here
        alert(`Referral sent to: ${friendInput}`)
        setFriendInput('')
    }

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

            <main className='container mx-auto px-4'>
                <section className='pt-[20vh]'>
                    <TitleText text='Refer And Earn' />
                </section>

                {/* Banner Card */}
                <section className='py-8'>
                    <AuctionBanner text='Refer And Earn' banner={banner} />
                </section>

                {/* Refer Input */}
                <section className="flex flex-col items-center gap-4 mt-8 mb-8">
                    <div className="w-full max-w-2xl flex flex-col md:flex-row gap-2">
                        <input
                            type="text"
                            value={friendInput}
                            onChange={e => setFriendInput(e.target.value)}
                            placeholder="Enter your friend's email or phone number"
                            className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button
                            onClick={handleRefer}
                            className="bg-[#FF6B00] text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition"
                        >
                            Refer A Friend
                        </button>
                    </div>
                    <div className="my-2 text-gray-500 font-semibold">OR</div>
                    {/* Referral Link */}
                    <div className="w-full max-w-2xl flex gap-2 items-center flex-wrap">
                        <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md flex-1 px-4 py-3">
                            <span className="mr-2 text-orange-500"><FaLink /></span>
                            <input
                                type="text"
                                value={referralLink}
                                readOnly
                                className="bg-transparent flex-1 outline-none text-gray-700"
                            />
                        </div>
                        <button
                            onClick={handleCopy}
                            className="bg-[#FCDFD4] border border-[#000000] text-sm text-[#131313] px-6 py-3 rounded-md font-semibold hover:bg-[#FCDFD4] transition min-w-[90px]"
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </section>

                {/* Social Share */}
                <section className="flex flex-col items-center mt-12 mb-8">
                    <div className="text-orange-600 font-semibold mb-1">Share your link</div>
                    <div className="text-gray-500 text-sm mb-3">Use the buttons below to share on any of the platforms</div>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 w-full max-w-md">
                        {socialIcons.map((item, idx) => (
                            <a
                                key={idx}
                                href="#"
                                aria-label={item.label}
                                className="rounded-full border border-gray-200 shadow-md bg-white w-12 h-12 flex items-center justify-center text-2xl transition-transform duration-200 hover:scale-110 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                style={{ color: item.color }}
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>
                    <button className="bg-[#FCDFD4]  text-[#131313] text-sm px-8 py-3 rounded-md font-semibold hover:bg-orange-200 transition shadow-md w-full max-w-xs mt-2">
                        View Referral Activities
                    </button>
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
