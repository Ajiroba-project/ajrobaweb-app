'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/store'

interface ReferralPageProps {
  params: {
    referralCode: string
  }
}

export default function ReferralRedirectPage({ params }: ReferralPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn
  }))

  useEffect(() => {
    const referralCode = params.referralCode
    
    if (referralCode) {
      // If user is already logged in, redirect to home
      if (isLoggedIn) {
        router.push('/')
        return
      }

      // Redirect to signup with referral code as query parameter
      const currentUrl = new URL(window.location.href)
      const queryParams = new URLSearchParams(currentUrl.search)
      
      // Add referral code to query parameters
      queryParams.set('ref', referralCode)
      
      // Redirect to signup page with referral code
      router.push(`/signup?${queryParams.toString()}`)
    } else {
      // If no referral code, redirect to signup
      router.push('/signup')
    }
  }, [params.referralCode, isLoggedIn, router])

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to signup...</p>
      </div>
    </div>
  )
}
