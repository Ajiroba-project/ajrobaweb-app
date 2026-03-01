'use client'
import React, { Fragment, Suspense, useState } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { HeadingText } from '../component/Heading'
import { FaPlus, FaMinus, FaInstagram, FaRegMessage, FaWhatsapp } from 'react-icons/fa6'
import { faq } from '@/app/static-data'
import {ChatBox} from "../component/ChatBox"
import livechathome from '@/app/asset/image/livechathome.svg'
import Image from 'next/image'
import { FaMailBulk } from 'react-icons/fa'
import { LiaFacebookMessenger } from "react-icons/lia";
import { SiGmail } from "react-icons/si";
import mesager from '@/app/asset/image/messager.png'
import ing from '@/app/asset/image/instagram.png'
import gmail from '@/app/asset/image/gmail.png'
import Input from '../component/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import InputContact from '../component/InputContact'
import { DefaultButton } from '../component/Button'


const LiveChatPage = () => {
  const [active, setActive] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  })





  const helpOptions = [
    { text: "Contact Us", action: 'contactus' },
    { text: "Complaint / Resolution", action: 'Complaint' },
    { text: "Getting Started With Ajiroba", action: 'GettingStarted' },
    { text: "Details About Auction", action: 'AuctionDetails' },
    { text: "How To Participate In Raffle Draws", action: 'Howto' },
  ];

const SelfHelpOption = ({ text, onClick }: {
    text: string;
    onClick: () => void;
}) => {
  return (
   <div>



 <button
      onClick={onClick}
      className="w-full px-4 py-3 bg-[#eeeceb] text-[#504D4D] font-medium text-left rounded-lg hover:bg-[#FCDFD4] text-sm">

      {text}
    </button>

   </div>
  );
};

  return (
  <Fragment>
      <Header />
      <main className="">
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
              <HeadingText title="Live Chat" />
            </div>
          </div>
        </div>







 <div    style={{
 margin: "0 auto",
     width: "94%",
     maxWidth: "100%",
   }} className=" flex justify-center items-center bg-gray-50 ">
      <div className="bg-white  gap-12 flex flex-col md:flex-row  p-8 w-full ">

        {/* Left Section */}
        <div className="md:w-1/2 w-full mb-6 md:mb-0 text-center md:text-left mt-24">
          <h1 className="text-3xl md:text-4xl font-Poppins font-semibold mb-3 text-[#111111]">
            We &apos; re Here to Help:
          </h1>
          <h2 className="text-base font-semibold font-Poppins text-[#E84526] mb-4">
            Ajiroba Technologies Live Chat
          </h2>
          <p className="text-[#353131] text-sm font-Poppins mb-6 leading-relaxed">
            For immediate assistance, click the &apos;Chat Now&apos; button below to connect
            with one of our support representatives or check out our comprehensive
            self-help resources. We &apos; re here to help with any questions or issues you may have.
          </p>



          {/* Buttons */}
          <div className="flex justify-center md:justify-start flex-wrap space-x-4">
             <button onClick={() => {
                    router.push("/mainlivechat");
                  }}
            className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-semibold font-Poppins rounded"
          >
            Chat Now
          </button>
                     <button onClick={() => router.push('/selfhelp')}
            className=" mt-4 font-Poppins px-12 py-2 text-sm border border-[#E84526]  bg-[#ffffff] hover:bg-[#F25E26] hover:text-white text-[#2A2A2A]  font-semibold rounded"
          >
           Self Help
          </button>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start space-x-4 mt-6">
            <a href="#" aria-label="WhatsApp">

              <FaWhatsapp color='#60d669'   className="h-8 w-8"/>
            </a>
            <a href="#" aria-label="Messenger">

               <Image src={mesager} alt="livechathome" className="h-8 w-8" />
            </a>
            <a href="#" aria-label="Instagram">
              <Image src={ing} alt="livechathome" className=" h-6 w-6 mt-1" />
            </a>
            <a href="#" aria-label="Gmail">
        <Image src={gmail} alt="livechathome" className=" h-8 w-8" />
            </a>
          </div>
        </div>

        {/* Right Section */}
   <div className="md:w-1/2 w-full flex justify-center">

  <div className="  flex justify-center items-center ">
    <div className="bg-white shadow-md rounded-lg w-full max-w-lg">
      {/* Header */}



     {/*  <div className="bg-gray-300 text-center py-4 rounded-t-lg">
        <h1 className="text-base font-semibold font-Poppins text-[#2A2A2A]">
          Contact Us
        </h1>
      </div> */}



    <div className="bg-gray-300 relative py-4 px-4 rounded-t-lg flex items-center">
  {/* Back Arrow */}
  <button onClick={() => router.back()} className="absolute left-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5 text-[#E84526]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  </button>

  {/* Centered Header Text */}
  <h1 className="text-base font-semibold font-Poppins text-[#2A2A2A] mx-auto">
    Contact Us
  </h1>
</div>



      {/* Self Help Options */}

      <div className='px-2 py-4 bg-[#fef9f6]'>

         <div className="p-6 space-y-4  ">
  <small className='flex items-center text-center justify-center font-semibold text-[#353131] font-Poppins'>Send Us A Message</small>
  <p className='flex justify-center items-center text-[#6E6E6E] font-Poppins text-center text-sm' >Have a question, suggestion, or just want to say hello? We &lsquo; d love to hear from you!</p>




            <form action="">

  <div className='flex flex-col'>
               <InputContact
              name='full_name'
              placeholder='Your Name'
              register={register}
              errors={errors.full_name}
              type='text'
              className='bg-[#F6F6F6] text-[#504D4D] w-full'
            />

               <div className='text-xs text-red-700'>
                {errors?.['full_name']?.message}
              </div>
           </div>


            <div className='flex flex-col py-6'>
             <InputContact
              name='email'
              placeholder='Your Email'
              register={register}
              errors={errors.email}
              type='email'
              className='bg-[#F6F6F6] text-[#504D4D] w-full'
            />
             <div className='text-xs text-red-700'>
                {errors?.['email']?.message}
              </div>
           </div>

             <div className='flex flex-col '>
              <InputContact
              name='phone'
              placeholder='Phone number'
              register={register}
              errors={errors.phone}
              type='text'
              className='bg-[#F6F6F6] text-[#504D4D] w-full'
            />
              <div className='text-xs text-red-700'>
                {errors?.['phone']?.message}
              </div>

            </div>



              <div className='py-6'>
              <InputContact
              name='subject'
              placeholder='Subject'
              register={register}
              errors={errors.subject}
              type='text'
              className='bg-[#F6F6F6] text-[#504D4D] w-full'
            />
            <div className='text-xs text-red-700'>
                {errors?.['subject']?.message}
              </div>
          </div>


           <div className='md:col-span-2 lg:col-span-2'>
              <textarea
                placeholder='Message'
                rows={3}
                className='w-full resize-none border bg-[#F6F6F6] px-8 py-4 text-[#504D4D] focus:text-[#504D4D]'
                {...register('message', { required: true })}
              ></textarea>
              <div className='text-xs text-red-700'>
                {errors?.['message']?.message}
              </div>
            </div>


             <div className='w-full '>


                 <button
            className=" mt-4 px-12 w-full py-2 text-sm bg-[#E84526] hover:[#FCDFD4] text-[#ffffff] font-semibold font-Poppins rounded"
          >
 {/*           {status === 'pending' ? 'Sending...' : 'Send Message'} */}
           Send Message
          </button>
            </div>


            </form>




      </div>

      </div>

    </div>
  </div>
</div>;

      </div>
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
      <LiveChatPage  />
    </Suspense>
  )
}


