'use client'
import { AuctionBanner } from '../component/AuctionBanner'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { Fragment, Suspense, useEffect } from 'react'
import { RechargeCategory } from './components/RechargeCategory'
import { RecentTransaction } from './components/RecentTransaction'
import { userNavStore, useAuthStore, AirtimePurchase } from '@/store/store'
import { useRouter } from 'next/navigation'
import { SideMenu } from './components/SideMenu'
import { DataContent } from './components/DataContent'
import { LuMenuSquare } from 'react-icons/lu'
import banner from '../asset/image/recharge-banner.png'
import TitleText from '../component/TitleText'


const Reroute =()=>{
  const router = useRouter()
   router.push('/signin')

   return null
}

const RechargePage = () => {

    const setAirtimeStepper = AirtimePurchase(state => state.setAirtimeStepper)

  const { userNavMenu, sidebar, toggleSidebar } = userNavStore(state => ({
    userNavMenu: state.userNav,
    sidebar: state.sidebar,
    toggleSidebar: state.toggleSidebar
  }))

  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn
  }))



  useEffect(() => {

       setAirtimeStepper(0)
  }, []);

  return (
    <Fragment>
      <header className='fixed z-50 w-full'>
        <Header />
      </header>


       <main className='container '>
         <section className='pt-[20vh]'>
            <TitleText text='Ajiroba Recharge'  />
          </section>

          <section className='py-8'>
            <AuctionBanner text='Ajiroba Recharge' banner={banner} />
          </section>

           <section className=''>
            <RechargeCategory />
          </section>


        {/*   <section className='mt-4'>
            <RechargeCategory />
          </section> */}
          <section>
            <RecentTransaction />
          </section>
        </main>

    {/*   {userNavMenu === '' ? (
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
      )} */}
       <Footer />
    </Fragment>
  )
}

export default function Searchbar() {
  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn
  }))

  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
  { !isLoggedIn ?  <Reroute/> : <RechargePage />}
    </Suspense>
  )
}
