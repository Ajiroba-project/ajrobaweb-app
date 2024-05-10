'use client'
import React,{Fragment, useState} from 'react'
import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import {HeadingText} from "../component/Heading"
import {faq} from "@/app/static-data"
const Page = () => {
    const [active, setActive] =useState<number>()
  return (
    <Fragment>
      <Header />
      <main className='container my-10'>
        <div className='flex items-center justify-center'>
          <HeadingText title='Frequently Asked Questions' />
        </div>

        <div className=''>
          <div className='my-4'>
            {faq.map((val, index) => (
              <div key={index} className='flex flex-col  gap-4 ' >
                <div className='flex justify-between items-center '>
                  <p className=' font-semibold bg-gray-50 p-5 cursor-pointer w-full mb-3 rounded'>{val.question} </p>
                </div>
                {active === index ? <p>{val.answer}</p> : null}
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