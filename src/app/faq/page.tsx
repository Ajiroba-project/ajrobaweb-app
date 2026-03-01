'use client'
import React, { Fragment, Suspense, useState } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { HeadingText } from '../component/Heading'
import { FaPlus, FaMinus } from 'react-icons/fa6'
import { faq } from '@/app/static-data'
import {ChatBox} from "../component/ChatBox"

const FAQPage = () => {
  const [active, setActive] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Fragment>
      <Header />
      <main className='container mb-[5rem] mt-8 '>
        <div className='flex items-center justify-center my-12 mt-12'>
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
                  className={` my-2 flex w-full  flex-col  rounded  bg-[#F7F7F7] `}
                >
                  <div
                    className={`${active === index ? 'p-5  shadow-xl' : ' p-5'} flex  cursor-pointer items-center justify-between font-semibold`}
                  >
                    <p>{val.question} </p>
                    {active === index ? (
                      <FaMinus className='cursor-pointer' />
                    ) : (
                      <FaPlus className='cursor-pointer' />
                    )}
                  </div>

                  {active === index && (
          <div className='py-5'>
          <ul>
              {Array.isArray(val.answer) ? (
                val.answer.map((item, i) => (
                  <li key={i} className='p-2 ml-4'>{item}</li>
                ))
              ) : (
                <li className='p-2 ml-4'>{val.answer}</li>
              )}
            </ul>
          </div>
        )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='fixed bottom-[1rem]'>
          <ChatBox
            isOpen={isOpen}

          />
        </div>
      </main>
      <div className='content-container'>
        <Footer />
      </div>
    </Fragment>
  )
}

// export default Page

export default function Searchbar() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <FAQPage />
    </Suspense>
  )
}
