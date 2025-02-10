'use client'
import { AuctionBanner } from '../component/AuctionBanner'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { Fragment, Suspense, useEffect, useState } from 'react'
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
const router = useRouter()

    const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true) // Ensure component is mounted before rendering
      setAirtimeStepper(0)
    if (!isLoggedIn) {
      router.push('/signin') // Redirect after mount
    }
  }, [isLoggedIn, router])

  // ✅ Prevent rendering before hydration
  if (!mounted) {
    return <div>Loading...</div>
  }



  // useEffect(() => {

  //      setAirtimeStepper(0)
  // }, []);

  return (
    <Fragment>
      <section className='fixed z-50 w-full'>
        <Header />
      </section>


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

          <section>
            <RecentTransaction />
          </section>
        </main>


       <Footer />
    </Fragment>
  )
}

export default function Searchbar() {
  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn
  }))

  /* return (
    <Suspense fallback={<div>Loading...</div>}>
  { !isLoggedIn ?  <Reroute/> : <RechargePage />}
    </Suspense>
  ) */
  return isLoggedIn ? <RechargePage /> : null
}
