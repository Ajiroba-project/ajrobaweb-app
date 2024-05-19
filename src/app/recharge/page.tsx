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
import { LuMenuSquare } from 'react-icons/lu'
import banner from '../asset/image/recharge-banner.png'

const Page = () => {
  const userNavMenu = userNavStore(state => state.userNav)
  const sidebar = userNavStore(state => state.sidebar)
  const toggleSidebar = userNavStore(state =>state.toggleSidebar)

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
          <section
            className={`${sidebar ? 'absolute h-screen bg-[#F6F6F6]' : 'absolute'} z-20 -mt-8  lg:relative`}
          >
            <div
              className={`${sidebar ? 'absolute  h-screen bg-[#F6F6F6] p-6 shadow-md lg:block lg:w-max lg:shadow-none' : 'hidden h-screen bg-[#F6F6F6] p-6 shadow-md lg:block lg:w-max lg:shadow-none'} `}
            >
              <SideMenu />
            </div>
            <div
              className=' absolute left-4 top-5 cursor-pointer text-[#f25e26] lg:hidden'
              onClick={() => toggleSidebar(!sidebar)}
            >
              <LuMenuSquare className='text-3xl' />
            </div>
          </section>
          <section className='container -mt-8 h-full'>
            {userNavMenu === 'Dashboard' ? 'Dashboard' : <DataContent />}
          </section>
        </main>
      )}
      <Footer />
    </Fragment>
  )
}

export default Page
