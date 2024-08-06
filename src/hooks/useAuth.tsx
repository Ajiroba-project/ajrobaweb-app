// import { useEffect } from 'react'
// import { useAuthStore } from '@/store/store'

// const useAuth = (router: any) => {
//   const isLoggedIn = useAuthStore(state => state.isLoggedIn)
//   console.log(isLoggedIn, 'islogggedinnnn')

//   useEffect(() => {
//     if (!isLoggedIn) {
//       // If the token cookie is not present, redirect to the sign-in page
//       router.push('/signin')

//     } else {
//       router.push('/profile')
//     }
//   }, [isLoggedIn, router])

//   return
// }

// export default useAuth


import { useEffect } from 'react';
import { useAuthStore } from '@/store/store';

const useAuth = (router: any) => {
  const { isLoggedIn, user } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user
  }));

  useEffect(() => {
    // Avoid redirecting if still checking the authentication status
    if (typeof isLoggedIn === 'undefined' || typeof user === 'undefined') {
      return;
    }

    if (!isLoggedIn || !user) {
      // If the token cookie or user data is not present, redirect to the sign-in page
      router.push('/signin');
    } else {
      router.push('/profile');
    }
  }, [isLoggedIn, user, router]);

  return null;
};

export default useAuth;

