'use client'
import React, { Fragment, useState } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { HeadingText } from '../component/Heading'
import { FaPlus, FaMinus } from 'react-icons/fa6'
import { faq } from '@/app/static-data'

const Page = () => {
  const [active, setActive] = useState<number | null>(null)
  return (
    <Fragment>
      <Header />
      <main className='container my-8 '>
        <div className='flex items-center justify-center'>
          <HeadingText title='Frequently Asked Questions' />
        </div>

        <div className=''>
          <div className='my-5'>
            {faq.map((val, index) => (
              <div
                key={index}
                className='flex flex-col  gap-4 '
                onClick={() => setActive(active === index ? null : index)}
              >
                <div
                  className={` my-2 flex w-full  flex-col  rounded  bg-[#F7F7F7] p-5`}
                >
                  <div
                    className={
                      ' flex  cursor-pointer justify-between font-semibold items-center'
                    }
                  >
                    <p>{val.question} </p>
                  {active === index ? (
                    <FaMinus className='cursor-pointer' />
                  ) : (
                    <FaPlus className='cursor-pointer' />
                  )}
                  </div>
                {/* answer */}
                {active === index ? (
                  <div className='py-5'>
                    <p>{val.answer}</p>
                  </div>
                ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

export default Page
