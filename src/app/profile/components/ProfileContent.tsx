import React, { useEffect } from 'react'
import { userProfile } from '@/store/store'
import { ProfileDetails } from './ProfileDetails'
import { AuctionDetails } from './AuctionDetails'
import { OrderDetails } from './OrderDetails'
import { WalletDetails } from './WalletDetails'
import MainLayout from './CommunityDetails'
import { useSearchParams } from 'next/navigation'

// import { useAuthStore } from '@/store/store'
// import { useAuthStore } from '@/store/store'
// import { useAuthStore } from '@/store/store'

export const ProfileContent = () => {
  // const activeMenu = userProfile(state => state.activeMenu)
  // const menu = ['my profile', 'auction win', 'my order', 'wallet', 'community']

  const {
    activeMenu,
    setactiveMenu,

  } = userProfile((state) => ({
    activeMenu: state.activeMenu,
    setactiveMenu: state.setactiveMenu,

  }));

    const searchParams = useSearchParams()

  const query = searchParams.get('q')


  // useEffect(() => {

  //   console.log(query)

  // }, [])




  return (
    <section className='w-full' >
      {activeMenu === 'my profile' ? (
        <ProfileDetails />
      ) : activeMenu === 'auction win' ? (
        <AuctionDetails />
      ) : activeMenu === 'my order' ? (
        <OrderDetails />
      ) : activeMenu === 'wallet' ? (
        <WalletDetails />
      ) :  activeMenu === 'community' ? (
      /*   <CommunityDetails /> */
      <MainLayout/>
      ) :


      (
        ''
      )}
    </section>
  )
}