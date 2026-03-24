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
        'We always promise what we can deliver and deliver what we promise. Our transactions are conducted without any form of basic in all our processes.'
    },
    {
      name: 'Customer-Centric',
      description:
        'Our awareness of and response to customers\u2019 needs and feed back is second to none. We place premium on anything that has to do with our customers because we know that we are the business mainly because of our customers.'
    }
  ]

  return (
    <Fragment>
      <Header />
      <div className='h-24 md:h-28 lg:h-32'></div>
      <main className='mx-auto w-[92%] py-8 sm:w-[90%] sm:py-12 lg:w-[80%]'>
        <DefaultBreadCrumb paths={decodedPaths} />

        {/* About Us */}
        <section className='py-6 sm:py-8'>
          <div className='mb-4 sm:mb-8 sm:text-center'>
            <HeadingText title='About us' />
          </div>
          <p className='font-Poppins text-sm leading-relaxed text-[#6E6E6E] sm:text-center sm:text-base lg:mx-auto lg:w-4/5'>
            Ajiroba Technologies Ltd (&ldquo;Ajiroba&rdquo;) is a royal name that is
            connected to a KING, which means the person that a KING will see
            first of all as the KING wakes up. Going by our royal name, we see
            all our customers as kings and queens who must have access to their
            basic daily needs regardless of their financial position or
            challenging economic terrain. Therefore, Ajiroba is designed as a
            raffle draw platform that will appear by default to our customers,
            each time they wake up, as a trusted one-stop shop for buying their
            basic daily needs by raffle so that they can continue to live like
            kings and queens.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className='py-6 sm:py-10'>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mx-auto lg:w-4/5'>
            {about.map((val, index) => (
              <div
                className='flex flex-col items-center gap-3 rounded-xl bg-[#F6F6F6] p-6 text-center sm:gap-4 sm:p-8'
                key={index}
              >
                <Image src={val.icon} alt={val.name} />
                <h3 className='font-Poppins text-lg font-semibold text-[#2A2A2A] sm:text-xl'>
                  {val.name}
                </h3>
                <p className='font-Poppins text-sm text-[#6E6E6E] sm:text-base'>
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className='py-6 sm:py-10'>
          <div className='mb-4 sm:mb-8 sm:text-center'>
            <HeadingText title='Why Choose us' />
          </div>
          <p className='mb-8 font-Poppins text-sm leading-relaxed text-[#6E6E6E] sm:text-center sm:text-base lg:mx-auto lg:w-4/5'>
            At Ajiroba, we&apos;re passionate about creating unforgettable
            moments of joy and anticipation. Our journey began with a simple
            idea: to provide a platform where individuals can participate in
            fair and transparent raffle draws for a chance to win amazing
            prizes.
          </p>

          <div className='grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3'>
            {whyChooseUs.map((val, index) => (
              <div key={index} className='flex gap-3'>
                <div className='mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#F25E26] sm:h-8 sm:w-8'>
                  <FaCheck className='text-xs text-white' />
                </div>
                <div className='flex flex-col gap-1.5'>
                  <h3 className='font-Poppins text-sm font-semibold text-[#2A2A2A] sm:text-base'>{val.name}</h3>
                  <p className='font-Poppins text-xs leading-relaxed text-[#808080] sm:text-sm'>{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className='fixed bottom-10'>
          <ChatBox isOpen={isOpen} />
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

export default function Page() {
  return (
    <Suspense>
      <AboutUsPage />
    </Suspense>
  )
}
