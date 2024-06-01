'use client'
import { AuctionBanner } from '../component/AuctionBanner'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { Fragment } from 'react'
import { RechargeCategory } from './components/RechargeCategory'
import { RecentTransaction } from './components/RecentTransaction'
import { userNavStore, useAuthStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import { SideMenu } from './components/SideMenu'
import { DataContent } from './components/DataContent'
import { LuMenuSquare } from 'react-icons/lu'
import banner from '../asset/image/recharge-banner.png'


const Reroute =()=>{
  const router = useRouter()
   router.push('/signin')

   return null
}

const Page = () => {
  
  const { userNavMenu, sidebar, toggleSidebar } = userNavStore(state => ({
    userNavMenu: state.userNav,
    sidebar: state.sidebar,
    toggleSidebar: state.toggleSidebar
  }))

  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn
  }))

  return (
    <Fragment>
      <header className='fixed z-50 w-full'>
        <Header />
      </header>

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
        <main className='relative flex pt-[23vh]'>
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
            {userNavMenu === 'Dashboard' && !isLoggedIn ?  <Reroute/> : <DataContent />}
          </section>
        </main>
      )}
      <Footer />
    </Fragment>
  )
}

export default Page
