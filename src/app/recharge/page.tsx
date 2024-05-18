'use client'
import { AuctionBanner } from '../component/AuctionBanner'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { Fragment } from 'react'
import { RechargeCategory } from './components/RechargeCategory'
import { RecentTransaction } from './components/RecentTransaction'
import { userNavStore } from '@/store/store'
import { SideMenu } from './components/SideMenu'
import { DataContent } from './components/DataContent'
import banner from '../asset/image/recharge-banner.png'
const Page = () => {
  const userNavMenu = userNavStore(state => state.userNav)

  return (
    <Fragment>
      <Header />
      {userNavMenu === '' ? (
        <main className='container'>
          <section className=''>
            <AuctionBanner text='Ajiroba Recharge' banner={banner} />
          </section>
          <section className='mt-4'>
            <RechargeCategory />
          </section>
          <section>
            <RecentTransaction />
          </section>
        </main>
      ) : (
        <main className='relative flex '>
          {/* sidemenu */}
          <section className='-mt-8 h-full  w-[30%] bg-[#F6F6F6] p-6 lg:w-[20%]'>
            <SideMenu />
          </section>
          <section className='container -mt-8 h-full'>
            <DataContent />
          </section>
        </main>
      )}
      <Footer />
    </Fragment>
  )
}

export default Page
