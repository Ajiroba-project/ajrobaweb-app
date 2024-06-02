import { useEffect } from 'react'
import { useAuthStore } from '@/store/store'

const useAuth = (router: any) => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      // If the token cookie is not present, redirect to the sign-in page
      router.push('/signin')
      
    }else{
      router.push('/profile')
    }
  }, [isLoggedIn, router])

  return
}

export default useAuth
