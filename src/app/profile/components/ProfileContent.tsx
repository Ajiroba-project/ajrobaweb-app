import React from 'react'
import { userProfile } from '@/store/store'
import { ProfileDetails } from './ProfileDetails'
import { AuctionDetails } from './AuctionDetails'
import { OrderDetails } from './OrderDetails'
import { WalletDetails } from './WalletDetails'

export const ProfileContent = () => {
  const activeMenu = userProfile(state => state.activeMenu)
  // const menu = ['my profile', 'auction win', 'my order', 'wallet', 'community']

  return (
    <section className='w-full'>
      {activeMenu === 'my profile' ? (
        <ProfileDetails />
      ) : activeMenu === 'auction win' ? (
        <AuctionDetails />
      ) : activeMenu === 'my order' ? (
        <OrderDetails />
      ) : activeMenu === 'wallet' ? (
        <WalletDetails />
      ) : (
        ''
      )}
    </section>
  )
}
