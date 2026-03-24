'use client'
import React, { Fragment, Suspense, useState } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { HeadingText } from '../component/Heading'
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import mesager from '@/app/asset/image/messager.png'
import ing from '@/app/asset/image/instagram.png'
import gmail from '@/app/asset/image/gmail.png'
import InputContact from '../component/InputContact'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'

const LiveChatPage = () => {
  const router = useRouter();

  const schema = yup.object().shape({
    full_name: yup.string().required('Name is required'),
    phone: yup.string().required('Phone Number is required'),
    subject: yup.string().required('Subject is required'),
    message: yup.string().required('Message is required'),
    email: yup
      .string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
        'Valid email is required'
      )
      .required('Email is required')
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  })

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
              <HeadingText title="Contact Us" />
            </div>
          </div>
        </div>

        <section className="mx-auto w-[92%] py-8 sm:w-[90%] sm:py-12 lg:w-[80%]">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <div className="w-full md:w-1/2">
              <h1 className="font-Poppins text-2xl font-semibold text-[#111111] sm:text-3xl md:text-4xl">
                We&apos;re Here to Help
              </h1>
              <h2 className="mt-3 font-Poppins text-sm font-semibold text-[#E84526] sm:text-base">
                Ajiroba Technologies Contact Us
              </h2>
              <p className="mt-4 font-Poppins text-sm leading-relaxed text-[#6E6E6E] sm:text-base">
                For immediate assistance, click the &apos;Chat Now&apos; button below to connect
                with one of our support representatives or check out our comprehensive
                self-help resources. We&apos;re here to help with any questions or issues you may have.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  onClick={() => router.push('/selfhelp')}
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

            <div className="w-full md:w-1/2">
              <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="relative flex items-center bg-gray-300 px-4 py-4">
                  <button onClick={() => router.back()} className="absolute left-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="h-5 w-5 text-[#E84526]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                  <h1 className="mx-auto font-Poppins text-base font-semibold text-[#2A2A2A]">
                    Contact Us
                  </h1>
                </div>

                <div className="bg-[#fef9f6] px-4 py-6 sm:px-6">
                  <div className="space-y-4">
                    <p className="text-center font-Poppins text-sm font-semibold text-[#353131]">
                      Send Us A Message
                    </p>
                    <p className="text-center font-Poppins text-sm text-[#6E6E6E]">
                      Have a question, suggestion, or just want to say hello? We&lsquo;d love to hear from you!
                    </p>

                    <form className="space-y-4">
                      <div className="flex flex-col">
                        <InputContact
                          name='full_name'
                          placeholder='Your Name'
                          register={register}
                          errors={errors.full_name}
                          type='text'
                          className='w-full bg-[#F6F6F6] text-[#504D4D]'
                        />
                        <div className='text-xs text-red-700'>
                          {errors?.['full_name']?.message}
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <InputContact
                          name='email'
                          placeholder='Your Email'
                          register={register}
                          errors={errors.email}
                          type='email'
                          className='w-full bg-[#F6F6F6] text-[#504D4D]'
                        />
                        <div className='text-xs text-red-700'>
                          {errors?.['email']?.message}
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <InputContact
                          name='phone'
                          placeholder='Phone number'
                          register={register}
                          errors={errors.phone}
                          type='text'
                          className='w-full bg-[#F6F6F6] text-[#504D4D]'
                        />
                        <div className='text-xs text-red-700'>
                          {errors?.['phone']?.message}
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <InputContact
                          name='subject'
                          placeholder='Subject'
                          register={register}
                          errors={errors.subject}
                          type='text'
                          className='w-full bg-[#F6F6F6] text-[#504D4D]'
                        />
                        <div className='text-xs text-red-700'>
                          {errors?.['subject']?.message}
                        </div>
                      </div>

                      <div>
                        <textarea
                          placeholder='Message'
                          rows={3}
                          className='w-full resize-none rounded-md border bg-[#F6F6F6] px-8 py-4 text-[#504D4D] focus:text-[#504D4D]'
                          {...register('message', { required: true })}
                        ></textarea>
                        <div className='text-xs text-red-700'>
                          {errors?.['message']?.message}
                        </div>
                      </div>

                      <button
                        className="w-full rounded-md bg-[#E84526] px-12 py-3 font-Poppins text-sm font-semibold text-white transition-colors hover:bg-[#d13d20]"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
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
