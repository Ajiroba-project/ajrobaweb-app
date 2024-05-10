import React,{Fragment} from 'react'
import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import {HeadingText} from "../component/Heading"
import Image from "next/image"
const Page = () => {
  return (
    <Fragment>
      <Header />
      <main className='container my-10'>
        <div className='flex flex-col items-center justify-center'>
          <HeadingText title='Contact us' />
          <p className='py-2 text-center text-[#6E6E6E]'>
            Our customer support team is available during regular business hours
            to provide assistance and ensure your experience with us is smooth
            and enjoyable. We look forward to hearing from you
          </p>
        </div>

        <div className='flex'>
          <div>
            <p>Phone Number</p>
          </div>
          <div>
            <p>Location</p>
          </div>
          <div>
            <p>Email Address</p>
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

export default Page