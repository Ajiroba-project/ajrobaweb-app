'use client'

import React, { Fragment, Suspense, useState } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { ChatBox } from '../component/ChatBox'
import { DefaultBreadCrumb } from '../component/Breadcrumb'
import { HeadingText } from '../component/Heading'
import { usePathName } from '@/hooks/usePathname'
import { FaCheck } from 'react-icons/fa'

import mission from '../asset/image/mission.png'
import vision from '../asset/image/vision.png'
import Image from 'next/image'

const AboutUsPage = () => {
  const decodedPaths = usePathName()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const about = [
    {
      name: 'Mission',
      icon: mission,
      description:
        'We are here to be a firm of choice for all consumers in making their purchase of basice daily needs'
    },
    {
      name: 'Vision',
      icon: vision,
      description:
        'We pride ourselves to be the foremost raffle draw firm that provides the basic consumer needs irrespective of their financial position.'
    }
  ]
  const whyChooseUs = [
    {
      name: 'Reliable',
      description:
        'We consistently conduct our business in a manner that makes our customers and stakeholders trust us why holding ourselves reliable for all our actions.'
    },
    {
      name: 'Transparent',
      description:
        'We always promise what we can deliver and deliver what we promise.  Our transactions are conducted without any form of basic in all our processes.'
    },
    {
      name: 'Customer-Centric',
      description:
        'Our awareness of and response to customers’ needs and feed back is second to none. We place premium on anything that has to do with our customers because we know that we are the business mainly because of our customers.'
    }
  ]

  return (
    <Fragment>
      <Header />
      <main className={` container my-12 `}>
        <DefaultBreadCrumb paths={decodedPaths} />
        <div className='flex flex-col items-center justify-center py-2'>
          <div className='mb-8'>
            {' '}
            <HeadingText title='About us' />
          </div>
          <p className='w-4/5 items-center py-2 text-center text-[#6E6E6E]   '>
            Ajiroba Technologies Ltd (“Ajiroba”) is a royal name that is
            connected to a  KING, which means the person that a KING will see
            first of all as the KING wakes up. Going by our royal name, we see
            all our customers as kings and queens who must have access to their
            basic daily needs regardless of their financial position or
            challenging economic terrain. Therefore, Ajiroba is designed as a
            raffle draw platform that will appear by default to our customers,
            each time they wake up, as a trusted one-stop shop for  buying their
            basic daily needs by raffle so that they can continue to live like
            kings and queens.
          </p>
        </div>
        <div className='m-[4rem] flex flex-col place-content-center items-center justify-center gap-2 lg:flex-row'>
          <div className=' flex w-auto flex-col items-center justify-center gap-12 md:w-auto lg:w-3/5 lg:flex-row xl:w-3/5 2xl:w-3/5'>
            {about.map((val, index) => (
              <div
                className='flex  flex-col items-center justify-center gap-4  bg-[#F6F6F6] p-8 text-center'
                key={index}
              >
                <Image src={val.icon} alt='mission' />
                <h3 className='font-Poppins text-xl font-semibold text-[#2A2A2A]'>
                  {val.name}
                </h3>
                <p className='font-Poppins text-base text-[#6E6E6E]'>
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/*  */}

        <div className='flex flex-col items-center justify-center py-2'>
          <div className='mb-8'>
            {' '}
            <HeadingText title='Why Choose us' />
          </div>
          <p className='w-4/5 items-center py-2 text-center text-[#6E6E6E]   '>
            At Ajiroba, we{`'`}re passionate about creating unforgettable
            moments of joy and anticipation. Our journey began with a simple
            idea: to provide a platform where individuals can participate in
            fair and transparent raffle draws for a chance to win amazing
            prizes.
          </p>
        </div>

        <div className='container mt-16 flex items-center justify-center '>
          <div className=' mx-12 flex flex-col justify-between gap-12 px-12  lg:flex-row'>
            {whyChooseUs.map((val, index) => (
              <div key={index} className='flex justify-start gap-2'>
                <div className=' mx-2 h-fit rounded-full bg-[#F25E26] p-2'>
                  <FaCheck className='text-white' />
                </div>

                <div className='flex flex-col  gap-2 '>
                  <h3 className='font-semibold'>{val.name}</h3>
                  <p className='text-sm text-[#808080]  '>{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={'fixed bottom-10'}>
          <ChatBox isOpen={isOpen} />
        </div>
      </main>
      ;
      <Footer />
    </Fragment>
  )
}

// export default Page

export default function Page() {
  return (
    <Suspense>
      <AboutUsPage />
    </Suspense>
  )
}
