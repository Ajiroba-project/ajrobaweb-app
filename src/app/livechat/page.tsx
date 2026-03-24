'use client'
import React, { Fragment, Suspense } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { HeadingText } from '../component/Heading'
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa6'
import { useRouter } from "next/navigation";
import livechathome from '@/app/asset/image/livechathome.svg'
import Image from 'next/image'
import Link from 'next/link'

const LiveChatPage = () => {
  const router = useRouter();

  return (
    <Fragment>
      <Header />
      <div className='h-24 md:h-28 lg:h-32'></div>
      <main>
        <div className="bg-[#F6F6F6] py-4">
          <div className="mx-auto w-[92%] sm:w-[90%] lg:w-[80%]">
            <button
              onClick={() => router.back()}
              className="cursor-pointer font-Poppins text-sm text-[#F25E26] underline"
            >
              Back
            </button>
            <div className="mt-2 sm:text-center">
              <HeadingText title="Self Help" />
            </div>
          </div>
        </div>

        <section className="mx-auto w-[92%] py-8 sm:w-[90%] sm:py-12 lg:w-[80%]">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12">
            <div className="w-full md:w-1/2">
              <h1 className="font-Poppins text-2xl font-semibold text-[#111111] sm:text-3xl md:text-4xl">
                We&apos;re Here to Help
              </h1>
              <h2 className="mt-3 font-Poppins text-sm font-semibold text-[#E84526] sm:text-base">
                Ajiroba Technologies Self Help
              </h2>
              <p className="mt-4 font-Poppins text-sm leading-relaxed text-[#6E6E6E] sm:text-base">
                For immediate assistance, click the &apos;Chat Now&apos; button below to connect
                with one of our support representatives or check out our comprehensive
                self-help resources. We&apos;re here to help with any questions or issues you may have.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  onClick={() => router.push("/selfhelp")}
                  className="rounded-md border border-[#E84526] bg-white px-10 py-3 font-Poppins text-sm font-semibold text-[#2A2A2A] transition-colors hover:bg-[#F25E26] hover:text-white sm:px-12"
                >
                  Self Help
                </button>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <Link href='https://www.facebook.com/share/1BvVA6ERkU/'>
                  <FaFacebook color="#1877F2" className='rounded-full bg-white p-2 text-4xl hover:opacity-80' />
                </Link>
                <Link href='https://www.youtube.com/@AjirobaMedia'>
                  <FaYoutube color="#FF0000" className='rounded-full bg-white p-2 text-4xl hover:opacity-80' />
                </Link>
                <Link href='https://www.tiktok.com/@ajiroba.tech?_t=ZS-8yexHRqXwIs&_r=1'>
                  <FaTiktok color="#000000" className='rounded-full bg-white p-2 text-4xl hover:opacity-80' />
                </Link>
                <Link href='https://www.instagram.com/ajirobatech?utm_source=qr&igsh=ODY5NWZtcmE0dDNk'>
                  <FaInstagram color="#E4405F" className='rounded-full bg-white p-2 text-4xl hover:opacity-80' />
                </Link>
              </div>
            </div>

            <div className="flex w-full justify-center md:w-1/2">
              <Image src={livechathome} alt="Live chat illustration" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
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
