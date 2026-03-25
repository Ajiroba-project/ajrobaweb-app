'use client'
import { Header } from '../../component/Header'
import { Footer } from '../../component/Footer'
import { Fragment, Suspense, useEffect, useState } from 'react'
import {
  userNavStore,
  useAuthStore,
  DataPurchase,
  CablePurchase,
  AirtimePurchase,
  ElectricityPurchase
} from '@/store/store'
import { useRouter } from 'next/navigation'
import { SideMenu } from '../components/SideMenu'
import { LuMenu } from 'react-icons/lu'
import { stepperList } from '@/app/static-data'
import { AirtimeDetails } from '../components/AirtimeDetails'
import { AirtimePayment } from '../components/AirtimePayment'
import { Receipt } from '../components/Receipt'
import Loading from '@/app/component/Loading'
import { DataDetails } from '../components/DataDetails'
import { CablePayment } from '../components/CablePayment'
import { DataPayment } from '../components/DataPayment'
import { DataReceipt } from '../components/DataReceipt'

const Reroute = () => {
  const router = useRouter()
  router.push('/signin')

  return null
}

const DataPage = () => {
  //   const {setCableStepper } =
  //     CablePurchase(state => ({

  //       setCableStepper: state.CableStepper,

  //     }))

  const { setDataStepper } = DataPurchase(state => ({
    setDataStepper: state.setDataStepper // ✅ This correctly references the function
  }))

  const [isClient, setIsClient] = useState(false)
  const { userNavMenu, sidebar, toggleSidebar } = userNavStore(state => ({
    userNavMenu: state.userNav,
    sidebar: state.sidebar,
    toggleSidebar: state.toggleSidebar
  }))

  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn
  }))

  const stepper = DataPurchase(state => state.stepper)
  const DataStepper = DataPurchase(state => state.DataStepper)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <Loading />
  }

  // const Step = ({ props }: any) => {
  //   return (
  //     <div className='mt-14 flex w-full flex-row gap-4 py-4 md:w-full md:flex-row lg:w-3/12 lg:flex-col xl:w-3/12 xl:flex-col 2xl:w-3/12 2xl:flex-col'>
  //       {stepperList.map((val, index) => (
  //         <div
  //           key={index}
  //           className={`flex items-center gap-2 rounded-md border p-4 px-6 font-Poppins text-[#A09F9F] ${index === props || index <= props ? 'cursor-pointer border-2 border-[#F25E26] bg-[#FCDFD4] text-[#E84526]' : 'border-2 opacity-50'} border-[#A09F9F] `}
  //         >
  //           <div>{val.icons}</div>
  //           <p
  //             className='w-max font-Poppins text-sm'
  //             onClick={() => setDataStepper(val.step)}
  //           >
  //             {val.name}
  //           </p>
  //         </div>
  //       ))}
  //     </div>
  //   )
  // }


  const Step = ({ props }: any) => {
    return (
      <div className='mt-2 w-full py-2 lg:w-64 lg:flex-none'>
        <div className='flex gap-3 overflow-x-auto pr-1 lg:flex-col lg:overflow-visible'>
          {stepperList.map((val, index) => (
            <div
              key={index}
              onClick={() => setDataStepper(val.step)}
              className={`${index === props || index <= props ? 'border-[#F25E26] bg-[#FCDFD4] text-[#E84526]' : 'border-[#A09F9F] text-[#A09F9F]'} flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border-2 px-4 py-3 font-Poppins lg:w-full lg:shrink`}
            >
              <div>{val.icons}</div>
              <span className='text-sm'>{val.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const DataContentNew = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <section className='flex flex-col gap-4 md:flex-col lg:flex-row xl:flex-row 2xl:flex-row'>
          <Step props={DataStepper} />

          <div className='w-full lg:flex-1 xl:flex-1 2xl:flex-1'>
            {DataStepper === 0 ? (
              <DataDetails />
            ) : DataStepper === 1 ? (
              <DataPayment />
            ) : (
              <DataReceipt />
            )}
          </div>
        </section>
      </Suspense>
    )
  }

  return (
    <Fragment>
      <Header />

      {/* Spacer to offset fixed header height on small/medium screens */}
      <div className='h-24 md:h-28 lg:h-32'></div>

      {/* <main className='content-container relative flex pt-[20vh]'>
        <section
          className={`${sidebar ? 'absolute h-full bg-[#F6F6F6]' : 'absolute'} z-20 -mt-8  lg:relative`}
        >
          <div
            className={`${sidebar ? 'absolute  h-full bg-[#F6F6F6] p-6 shadow-md lg:block lg:w-max lg:shadow-none' : 'h-full shrink-0 self-stretch bg-[#F6F6F6] p-6 shadow-md lg:block lg:w-max lg:shadow-none'} `}
          >
            <SideMenu />
          </div>

    

          {sidebar && (
            <div
              className='fixed inset-0 z-50 lg:hidden'
              role='dialog'
              aria-modal='true'
            >
              <div
                className='absolute inset-0 bg-black/40'
                onClick={() => toggleSidebar(false)}
              ></div>
              <div className='absolute left-0 top-0 h-full w-80 max-w-[90vw] overflow-y-auto bg-[#F6F6F6] px-6 pb-6 pt-28 shadow-2xl'>
                <SideMenu />
              </div>
            </div>
          )}

          <div
            className=' absolute left-4 top-5 cursor-pointer text-[#f25e26] lg:hidden'
            onClick={() => toggleSidebar(!sidebar)}
          >
            <LuMenu className='text-3xl' />
          </div>
        </section>

        <section className='container -mt-8 h-full'>
          {!isLoggedIn ? <Reroute /> : <DataContentNew />}
        </section>
      </main> */}


<main className='content-container container my-4'>
        {/* Mobile menu trigger */}
        <div className='mb-4 lg:hidden'>
          <button
            className='inline-flex items-center gap-2 rounded-md border border-[#F25E26] px-3 py-2 text-[#F25E26]'
            onClick={() => toggleSidebar(!sidebar)}
            aria-label='Open menu'
          >
            <LuMenu className='text-2xl' />
            <span className='font-Poppins text-sm'>Menu</span>
          </button>
        </div>

        {/* Responsive layout: sidebar on desktop, content on right */}
        <section className='flex flex-col gap-6 lg:flex-row'>
          {/* Desktop static sidebar */}
          <aside className='hidden w-72 shrink-0 self-stretch lg:block'>
            <div className='h-full rounded-md bg-[#F6F6F6] p-6 shadow-none'>
              <SideMenu />
            </div>
          </aside>

          {/* Main content */}
          <div className='min-w-0 flex-1'>
            {!isLoggedIn ? <Reroute /> : <DataContentNew />}
          </div>
        </section>
      </main>

      {/* Mobile overlay sidebar */}
      {sidebar && (
        <div
          className='fixed inset-0 z-50 lg:hidden'
          role='dialog'
          aria-modal='true'
        >
          <div
            className='absolute inset-0 bg-black/40'
            onClick={() => toggleSidebar(false)}
          ></div>
          <div className='absolute left-0 top-0 h-full w-65 max-w-[90vw] overflow-y-auto bg-[#F6F6F6] px-6 pb-6 pt-16 shadow-2xl'>
            <SideMenu />
          </div>
        </div>
      )}

      <div className=''>
        <Footer />
      </div>
    </Fragment>
  )
}

export default function Searchbar() {
  return (
    <Suspense>
      <DataPage />
    </Suspense>
  )
}
