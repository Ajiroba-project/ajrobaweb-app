'use client'
import { Header } from '../../component/Header'
import { Footer } from '../../component/Footer'
import { Fragment, Suspense, useEffect, useState } from 'react'
import { userNavStore, useAuthStore, AirtimePurchase } from '@/store/store'
import { useRouter } from 'next/navigation'
import { SideMenu } from '../components/SideMenu'
import { stepperList } from '@/app/static-data'
import { AirtimeDetails } from '../components/AirtimeDetails'
import { AirtimePayment } from '../components/AirtimePayment'
import { Receipt } from '../components/Receipt'
import Loading from '@/app/component/Loading'
import { LuMenu } from 'react-icons/lu'

const Reroute = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/signin')
  }, [router])

  return null
}

const Step = ({ activeStep, onStepClick }: { activeStep: number; onStepClick: (step: number) => void }) => {
  return (
    <div className='mt-2 w-full py-2 lg:w-64 lg:flex-none'>
      <div className='flex gap-3 overflow-x-auto pr-1 lg:flex-col lg:overflow-visible'>
        {stepperList.map((val, index) => (
          <div
            key={index}
            onClick={() => onStepClick(val.step)}
            className={`${index <= activeStep ? 'border-[#F25E26] bg-[#FCDFD4] text-[#E84526]' : 'border-[#A09F9F] text-[#A09F9F]'} flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border-2 px-4 py-3 font-Poppins lg:w-full lg:shrink`}
          >
            <div>{val.icons}</div>
            <span className='text-sm'>{val.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const DataContentNew = ({ stepper, onStepClick }: { stepper: number; onStepClick: (step: number) => void }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className='flex flex-col gap-6 lg:flex-row'>
        <Step activeStep={stepper} onStepClick={onStepClick} />

        <div className='w-full lg:flex-1 xl:flex-1 2xl:flex-1'>
          {stepper === 0 ? (
            <AirtimeDetails />
          ) : stepper === 1 ? (
            <AirtimePayment />
          ) : (
            <Receipt />
          )}
        </div>
      </section>
    </Suspense>
  )
}

const Airtime = () => {
  const { setAirtimeStepper } = AirtimePurchase(state => ({
    setAirtimeStepper: state.setAirtimeStepper
  }))

  const [isClient, setIsClient] = useState(false)
  const { sidebar, toggleSidebar } = userNavStore(state => ({
    sidebar: state.sidebar,
    toggleSidebar: state.toggleSidebar
  }))

  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn
  }))

  const AirtimeStepper = AirtimePurchase(state => state.AirtimeStepper)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <Loading />
  }

  return (
    <Fragment>
      <Header />

      <div className='h-24 md:h-28 lg:h-32' />

      <main className='content-container container my-4'>
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

        <section className='flex flex-col gap-6 lg:flex-row'>
          <aside className='hidden w-72 shrink-0 self-stretch lg:block'>
            <div className='h-full rounded-md bg-[#F6F6F6] p-6 shadow-none'>
              <SideMenu />
            </div>
          </aside>

          <div className='min-w-0 flex-1'>
            {!isLoggedIn ? (
              <Reroute />
            ) : (
              <DataContentNew stepper={AirtimeStepper} onStepClick={setAirtimeStepper} />
            )}
          </div>
        </section>
      </main>

      {sidebar && (
        <div
          className='fixed inset-0 z-50 lg:hidden'
          role='dialog'
          aria-modal='true'
        >
          <div
            className='absolute inset-0 bg-black/40'
            onClick={() => toggleSidebar(false)}
          />
          <div className='absolute left-0 top-0 h-full w-65 max-w-[90vw] overflow-y-auto bg-[#F6F6F6] p-6 shadow-2xl'>
            <SideMenu />
          </div>
        </div>
      )}

      <div className='content-container'>
        <Footer />
      </div>
    </Fragment>
  )
}

export default function Searchbar() {
  return (
    <Suspense>
      <Airtime />
    </Suspense>
  )
}
