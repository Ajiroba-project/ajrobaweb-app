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
import { FaLinkedinIn, FaPinterestP, FaEnvelope, FaWhatsapp, FaTwitter, FaFacebookF, FaLink, FaInstagram, FaTiktok } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import Cookies from 'js-cookie'
import { generateReferralLink } from '@/utils/getBaseUrl'
import { ReferralPointsModal } from '../wallet/components/ViewPoint'

const ReferralPage = () => {
    const setAirtimeStepper = AirtimePurchase(state => state.setAirtimeStepper)

    const { user } = useAuthStore(state => ({
        user: state.user
    }))

    // console.log(user, 'user')

    const cookieUser = Cookies.get('user')



    const userData = JSON.parse(cookieUser || '{}')

    // console.log(userData?.data, 'userData')

    const { userNavMenu, sidebar, toggleSidebar } = userNavStore(state => ({
        userNavMenu: state.userNav,
        sidebar: state.sidebar,
        toggleSidebar: state.toggleSidebar
    }))
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [friendInput, setFriendInput] = useState('')
    const [referralLink, setReferralLink] = useState('')
    const [copied, setCopied] = useState(false)
    const [viewReferralActivities, setViewReferralActivities] = useState(false)

    // Social share icons (using react-icons)
    const socialIcons = [
        { icon: <FaLinkedinIn />, color: '#0077b5', label: 'LinkedIn' , link: 'https://www.linkedin.com/company/108669858/admin/dashboard/' },
        { icon: <FaInstagram />, color: '#e60023', label: 'Instagram', link: 'https://www.instagram.com/ajirobatech?utm_source=qr&igsh=ODY5NWZtcmE0dDNk' },
        // { icon: <FaEnvelope />, color: '#0072c6', label: 'Email' },
        // { icon: <FaWhatsapp />, color: '#25d366', label: 'WhatsApp' },
        {icon: <FaTiktok/>, color: '#e60023', label: 'TikTok', link: 'https://www.tiktok.com/@ajiroba.tech?_t=ZS-8yexHRqXwIs&_r=1'},
        { icon: <FaX />, color: '#1da1f2', label: 'X', link: 'https://x.com/AjirobaTech' },
        { icon: <FaFacebookF />, color: '#1877f3', label: 'Facebook', link: 'https://www.facebook.com/share/1BvVA6ERkU/' },
    ]

    useEffect(() => {
        setAirtimeStepper(0)
        setIsLoading(false)
        
        // Generate referral link with dynamic base URL
        if (userData?.data?.referral_code) {
            const link = generateReferralLink(userData.data.referral_code)
            setReferralLink(link)
        }
    }, [setAirtimeStepper, userData?.data?.referral_code])

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

    const handleViewReferralActivities = () => {
        setViewReferralActivities(true)
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
                    {/* <div className="w-full max-w-2xl flex flex-col md:flex-row gap-2">
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
                    <div className="my-2 text-gray-500 font-semibold">OR</div> */}
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
                                href={item.link}
                                aria-label={item.label}
                                className="rounded-full border border-gray-200 shadow-md bg-white w-12 h-12 flex items-center justify-center text-2xl transition-transform duration-200 hover:scale-110 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                style={{ color: item.color }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>
                    <button 
                        onClick={handleViewReferralActivities}
                        className="bg-[#FCDFD4]  text-[#131313] text-sm px-8 py-3 rounded-md font-semibold hover:bg-orange-200 transition shadow-md w-full max-w-xs mt-2"
                    >
                        View Referral Activities
                    </button>
                </section>
            </main>

            <Footer />

            {/* Referral Activities Modal */}
            {viewReferralActivities && (
                <ReferralPointsModal
                    isOpen={viewReferralActivities}
                    setIsOpen={setViewReferralActivities}
                    referralData={userData?.data}
                />
            )}
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
