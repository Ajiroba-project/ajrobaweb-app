'use client'
import React,{Fragment, useState} from 'react'
import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import {HeadingText} from "../component/Heading"
import { FaPlus, FaMinus } from "react-icons/fa6";
import {faq} from "@/app/static-data"
const Page = () => {
    const [active, setActive] =useState<number>()
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
              <div key={index} className='flex flex-col  gap-4 ' >
                <div className='flex justify-between items-center bg-gray-50 p-5 mb-3 w-full rounded'>
                  <p className=' font-semibold  cursor-pointer '>{val.question} </p>
                  {active === index ? <FaMinus/> :<FaPlus/>}
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