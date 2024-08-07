import { useEffect } from 'react';
import { useAuthStore } from '@/store/store';

const useAuthOrders = (router: any, orderId?: string) => {
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
    }

    // else {
    //   // Redirect to the purchase order page with the order ID
    //   // router.push(`/purchaseorder?orderId=${orderId}`);
    //   router.push(`/purchaseorder`);
    // }
  }, [isLoggedIn, user, orderId, router]);

  return null;
};

export { useAuthOrders };


