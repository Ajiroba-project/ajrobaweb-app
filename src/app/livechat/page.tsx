'use client'
import React, { Fragment, Suspense, useState } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { HeadingText } from '../component/Heading'
import { FaInstagram, FaFacebook, FaWhatsapp, FaTiktok, FaFacebookF, FaYoutube } from 'react-icons/fa6'
import { useRouter } from "next/navigation";
import livechathome from '@/app/asset/image/livechathome.svg'
import Image from 'next/image'

import mesager from '@/app/asset/image/messager.png'
import ing from '@/app/asset/image/instagram.png'
import gmail from '@/app/asset/image/gmail.png'
import Link from 'next/link'

const LiveChatPage = () => {

  const router = useRouter();

  return (
    <Fragment>
      <Header />
      <main className=" content-container">
        <div className=" bg-[#F6F6F6] py-4">
          <div className="">
            <p
              onClick={() => router.back()}
              className="text-[#F25E26] underline "
              style={{
                margin: "0 auto",
                width: "90%",
                maxWidth: "100%",
              }}
            >
              Back
            </p>
            <div className="text-center">
              <HeadingText title="Self Help" />
            </div>
          </div>
        </div>

        <div style={{
          margin: "0 auto",
          width: "94%",
          maxWidth: "100%",
        }} className=" flex justify-center items-center bg-gray-50 ">
          <div className="bg-white  gap-12 flex flex-col md:flex-row items-center p-8 w-full ">

            <div className="md:w-1/2 w-full mb-6 md:mb-0 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-Poppins font-semibold mb-3 text-[#111111]">
                We&apos;re Here to Help:
              </h1>
              <h2 className="text-base font-semibold font-Poppins text-[#E84526] mb-4">
                Ajiroba Technologies Self Help
              </h2>
              <p className="text-[#353131] text-sm font-Poppins mb-6 leading-relaxed">
                For immediate assistance, click the &apos;Chat Now&apos; button below to connect
                with one of our support representatives or check out our comprehensive
                self-help resources. We &apos; re here to help with any questions or issues you may have.
              </p>

              <div className="flex justify-center md:justify-start flex-wrap space-x-4">
                {/* <button onClick={() => { router.push("/mainlivechat") }}
                  className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:bg-[#F25E26] hover:text-white text-[#2A2A2A] font-semibold font-Poppins rounded"
                >
                  Chat Now
                </button> */}
                <button onClick={() => { router.push("/selfhelp") }}
                  className=" mt-4 font-Poppins px-12 py-2 text-sm border border-[#E84526]  bg-[#ffffff] hover:bg-[#F25E26] hover:text-white text-[#2A2A2A]  font-semibold rounded"
                >
                  Self Help
                </button>
              </div>

              <div className="flex justify-center md:justify-start space-x-4 mt-6">
               {/*  <a href="/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <FaWhatsapp color='#60d669' className="h-8 w-8" />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Messenger">
                  <Image src={mesager} alt="livechathome" className="h-8 w-8" />
                </a>
                <a href="/e" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Image src={ing} alt="livechathome" className="h-6 w-6 mt-1" />
                </a>
                <a href="/" aria-label="Gmail">
                  <Image src={gmail} alt="livechathome" className="h-8 w-8" />
                </a> */}

<div className='header-socials flex gap-3'>
              <Link href='https://www.facebook.com/share/1BvVA6ERkU/'>
                <FaFacebook className='rounded-full bg-white p-2  text-4xl text-black hover:bg-[#F25E26]' />
              </Link>
              <Link href='https://www.youtube.com/@AjirobaMedia'>
                <FaYoutube className='rounded-full bg-white p-2  text-4xl text-black hover:bg-[#F25E26]' />
              </Link>
              <Link href='https://www.tiktok.com/@ajiroba.tech?_t=ZS-8yexHRqXwIs&_r=1'>
                <FaTiktok className='rounded-lg bg-white p-2  text-4xl text-black hover:bg-[#F25E26]' />
              </Link>
              <Link href='https://www.instagram.com/ajirobatech?utm_source=qr&igsh=ODY5NWZtcmE0dDNk'>
                <FaInstagram className='rounded-xl text-2xl mt-2  hover:text-[#F25E26]' />
              </Link>
            </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 w-full flex justify-center">


              <Image src={livechathome} alt="livechathome" className="livechathome " />
            </div>
          </div>
        </div>


      </main>
      <div className='content-container'>
        <Footer />
      </div>
    </Fragment>
  )
}

export default function Searchbar() {
  return (
    <Suspense>
      <LiveChatPage />
    </Suspense>
  )
}

