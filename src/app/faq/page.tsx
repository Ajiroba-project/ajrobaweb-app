'use client'
import React,{Fragment, useState} from 'react'
import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import {HeadingText} from "../component/Heading"
import { FaPlus, FaMinus } from "react-icons/fa6";
import {faq} from "@/app/static-data"
const Page = () => {
    const [active, setActive] =useState<number|null >(null)
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
              <div key={index} className='flex flex-col  gap-4 '>
                <div className={`${active === index ? "shadow-lg" :""}mb-3 flex w-full items-center justify-between rounded bg-[#F7F7F7] p-5`} onClick={()=>setActive(index)}>
                  <p className=' cursor-pointer  font-semibold '>
                    {val.question}{' '}
                    <p className="py-4">{active === index ? <p>{val.answer}</p> : null}</p>
                  </p>
                  {active === index ? <FaMinus /> : <FaPlus />}
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