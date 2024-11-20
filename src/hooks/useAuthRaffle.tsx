import { useEffect } from 'react';
import { useAuthStore } from '@/store/store';

const useAuthRaffle = (router: any, orderId?: string) => {
  const { isLoggedIn, user } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user
  }));

  useEffect(() => {
    if (typeof isLoggedIn === 'undefined' || typeof user === 'undefined') {
      return;
    }

    if (!isLoggedIn || !user) {
      router.push('/signin');
    }


  }, [isLoggedIn, user, orderId, router]);

  return null;
};

// export { useAuthRaffle };
export default useAuthRaffle;


