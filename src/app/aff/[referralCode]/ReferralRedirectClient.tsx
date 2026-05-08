'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/store'

export default function ReferralRedirectClient({
  referralCode,
}: {
  referralCode: string
}) {
  const router = useRouter()
  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }))

  useEffect(() => {
    if (referralCode) {
      if (isLoggedIn) {
        router.push('/')
        return
      }

      const currentUrl = new URL(window.location.href)
      const queryParams = new URLSearchParams(currentUrl.search)
      queryParams.set('ref', referralCode)
      router.push(`/signup?${queryParams.toString()}`)
    } else {
      router.push('/signup')
    }
  }, [referralCode, isLoggedIn, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500"></div>
        <p className="text-gray-600">Redirecting to signup...</p>
      </div>
    </div>
  )
}
