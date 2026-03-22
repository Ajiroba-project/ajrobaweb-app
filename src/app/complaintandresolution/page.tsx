'use client'
import React, { Fragment, Suspense, useState } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { HeadingText } from '../component/Heading'
import { FaPlus, FaMinus, FaInstagram, FaRegMessage, FaWhatsapp, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa6'
import { faq } from '@/app/static-data'
import {ChatBox} from "../component/ChatBox"
import { useRouter } from "next/navigation";
import livechathome from '@/app/asset/image/livechathome.svg'
import Image from 'next/image'
import { FaMailBulk } from 'react-icons/fa'
import { LiaFacebookMessenger } from "react-icons/lia";
import { SiGmail } from "react-icons/si";
import mesager from '@/app/asset/image/messager.png'
import ing from '@/app/asset/image/instagram.png'
import gmail from '@/app/asset/image/gmail.png'
import Link from 'next/link'
import { LivechatModal } from '../profile/components/livechatModal'
import { IoIosClose } from 'react-icons/io'
import Brand from '@/app/asset/logo.svg'

const LiveChatPage = () => {
  const [active, setActive] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
       const [isModalOpentic, setModalOpentic] = useState(false);
   const [isModalOpence, setModalOpence] = useState(false);
     const [isModalOpendc, setModalOpendc] = useState(false);
     const [isModalOpenit, setModalOpenit] = useState(false);
     const [isModalOpenun, setModalOpenun] = useState(false);


    const router = useRouter();


const handleClick = (data: any) =>{


if (data === 'tickets') {
   setModalOpentic(!isModalOpentic)
  }else if (data === 'carterror') {
    setModalOpence(!isModalOpence)
  }else if (data === 'discrepancy') {
    setModalOpendc(!isModalOpendc)
  }else if (data === 'item') {
    setModalOpenit(!isModalOpenit)
  }else if (data === 'unable') {
    setModalOpenun(!isModalOpenun)
  }



}


      const handleCloseModaltic = () => {
    setModalOpentic(false);
  };


     const handleCloseModalce = () => {
    setModalOpence(false);
  };

  const handleClsoeModaldc = () => {
    setModalOpendc(false);
  };

  const handleCloseModalit = () => {
    setModalOpenit(false);
  };



    const handleCloseModalun = () => {
    setModalOpenun(false);
  };




  const helpOptions = [
    { text: "Tickets Purchasing Error", action: 'tickets' },
    { text: "Cart Error", action: 'carterror' },
    { text: "Discrepancy in auction bid amounts", action: 'discrepancy' },
    { text: "Item not received or damaged", action: 'item' },
    { text: "Unable to complete ticket purchase", action: 'unable' },
  ];

const SelfHelpOption = ({ text, onClick }: {
    text: string;
    onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-3 bg-[#eeeceb] text-[#504D4D] font-medium text-left rounded-lg hover:bg-[#FCDFD4] text-sm">

      {text}
    </button>
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
              <HeadingText title="Complaints / Resolution" />
            </div>
          </div>
        </div>







 <div    style={{
 margin: "0 auto",
     width: "94%",
     maxWidth: "100%",
   }} className=" flex justify-center items-center bg-gray-50 ">
      <div className="bg-white  gap-12 flex flex-col md:flex-row items-center p-8 w-full ">

        {/* Left Section */}
        <div className="md:w-1/2 w-full mb-6 md:mb-0 text-center md:text-left">
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
             {/* <button onClick={() => {
                    router.push("/mainlivechat");
                  }}
            className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-semibold font-Poppins rounded"
          >
            Chat Now
          </button> */}
                     <button onClick={() => router.back()}
            className=" mt-4 font-Poppins px-12 py-2 text-sm border border-[#E84526]  bg-[#ffffff] hover:[#FCDFD4] text-[#2A2A2A]  font-semibold rounded"
          >
            Go Back
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
   Complaints / Resolution
  </h1>
</div>

      {/* Self Help Options */}

      <div className='px-2 py-4 bg-[#fef9f6]'>

         <div className="p-6 space-y-4  ">


               {helpOptions.map((option, index) => (
            <SelfHelpOption
              key={index}
              text={option.text}
              onClick={()=>handleClick(option.action)}
            />
          ))}

      </div>

      </div>

    </div>
  </div>
</div>

      </div>
    </div>




{
  isModalOpentic && (
    <LivechatModal
      icon={""}
      isOpen={isModalOpentic}
      onClose={handleCloseModaltic}
      title=""
      handleEvent={handleCloseModaltic}
    >
      <div
        className=" cursor-pointer"
        onClick={handleCloseModaltic}
        style={{
          backgroundImage: "url('/ajirobabg.svg')", // Add your image path here
          backgroundSize: "33.33%",
          backgroundPosition: "center",
          backgroundRepeat: "repeat-x",
          /*       backgroundPosition: "top", */
        }}
      >
        <div className="bg-[#F6F6F6] items-center cursor-pointer p-8">
          <div className="flex justify-between items-center">
            <div className="">
              <Link href={"/"}>
                <Image src={Brand} alt="" />
              </Link>
            </div>

            <div>
              <IoIosClose size={32} />
            </div>
          </div>

          <h1 className="flex text-[#111111] font-semibold text-base font-Poppins justify-center items-center">
            Ticket Purchasing Error
          </h1>
          <p className="flex justify-center font-Poppins font-normal text-[#2A2A2A] text-base items-center">
       Published by Ajiroba Techologies - 30 days ago
          </p>
        </div>

        <div className="p-8 flex flex-col gap-5">
          <div>
            <div>
              <p className="text-sm font-Poppins text-[#2A2A2A] font-normal">
              Ensure that your payment information is correct and that there are no issues with your payment method.
               If the problem persists, clear your browser cache or try using a different browser.
                For further assistance, please chat with a support representative.
                 Ensure that your payment information
              is correct and that there are no issues with your payment method.
               If the problem persists, clear your browser cache or try using a different browser.
               For further assistance, please chat with a support representative.
              </p>
            </div>


          </div>

          <div className="mt-4 flex gap-2 items-center">
            <div>
              <p className="text-sm font-Poppins text-[#2A2A2A] font-normal">
                Was this helpful?
              </p>
            </div>

            <div className="flex gap-1">
              <FaRegThumbsUp /> <span>0</span>
            </div>
            <div className="flex gap-1">
              <FaRegThumbsDown className="mt-1" /> <span>0</span>
            </div>
          </div>

          <div className="flex justify-end">
            {/* <button
            onClick={() => {
                    router.push("/mainlivechat");
                  }}
              className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-semibold font-Poppins rounded"
            >
              Chat Now
            </button> */}
          </div>
        </div>
      </div>
      <div></div>
    </LivechatModal>
  )
}



{
  isModalOpence && (
    <LivechatModal
      icon={""}
      isOpen={isModalOpence}
      onClose={handleCloseModalce}
      title=""
      handleEvent={handleCloseModalce}
    >
      <div
        className=" cursor-pointer"
        onClick={handleCloseModalce}
        style={{
          backgroundImage: "url('/ajirobabg.svg')", // Add your image path here
          backgroundSize: "33.33%",
          backgroundPosition: "center",
          backgroundRepeat: "repeat-x",
          /*       backgroundPosition: "top", */
        }}
      >
        <div className="bg-[#F6F6F6] items-center cursor-pointer p-8">
          <div className="flex justify-between items-center">
            <div className="">
              <Link href={"/"}>
                <Image src={Brand} alt="" />
              </Link>
            </div>

            <div>
              <IoIosClose size={32} />
            </div>
          </div>

          <h1 className="flex text-[#111111] font-semibold text-base font-Poppins justify-center items-center">
            Cart Error
          </h1>
          <p className="flex justify-center font-Poppins font-normal text-[#2A2A2A] text-base items-center">
       Published by Ajiroba Techologies - 30 days ago
          </p>
        </div>

        <div className="p-8 flex flex-col gap-5">
          <div>
            <div>
              <p className="text-sm font-Poppins text-[#2A2A2A] font-normal">
          Ensure that your browser is up-to-date and that cookies are enabled. Try clearing your browser cache or using a different browser. If the issue persists,
          please contact our support team via chat for immediate assistance.
              </p>
            </div>


          </div>

          <div className="mt-4 flex gap-2 items-center">
            <div>
              <p className="text-sm font-Poppins text-[#2A2A2A] font-normal">
                Was this helpful?
              </p>
            </div>

            <div className="flex gap-1">
              <FaRegThumbsUp /> <span>0</span>
            </div>
            <div className="flex gap-1">
              <FaRegThumbsDown className="mt-1" /> <span>0</span>
            </div>
          </div>

          <div className="flex justify-end">
            {/* <button
             onClick={() => {
                    router.push("/mainlivechat");
                  }}
              className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-semibold font-Poppins rounded"
            >
              Chat Now
            </button> */}
          </div>
        </div>
      </div>
      <div></div>
    </LivechatModal>
  )
}

{
  isModalOpendc && (
    <LivechatModal
      icon={""}
      isOpen={isModalOpendc}
      onClose={handleClsoeModaldc}
      title=""
      handleEvent={handleClsoeModaldc}
    >
      <div
        className=" cursor-pointer"
        onClick={handleClsoeModaldc}
        style={{
          backgroundImage: "url('/ajirobabg.svg')", // Add your image path here
          backgroundSize: "33.33%",
          backgroundPosition: "center",
          backgroundRepeat: "repeat-x",
          /*       backgroundPosition: "top", */
        }}
      >
        <div className="bg-[#F6F6F6] items-center cursor-pointer p-8">
          <div className="flex justify-between items-center">
            <div className="">
              <Link href={"/"}>
                <Image src={Brand} alt="" />
              </Link>
            </div>

            <div>
              <IoIosClose size={32} />
            </div>
          </div>

          <h1 className="flex text-[#111111] font-semibold text-base font-Poppins justify-center items-center">
         Discrepancy in auction bid amounts
          </h1>
          <p className="flex justify-center font-Poppins font-normal text-[#2A2A2A] text-base items-center">
       Published by Ajiroba Techologies - 30 days ago
          </p>
        </div>

        <div className="p-8 flex flex-col gap-5">
          <div>
            <div>
              <p className="text-sm font-Poppins text-[#2A2A2A] font-normal">
       Double-check the bid history and ensure that your bid was submitted correctly.
        If you believe there is an error, please provide the auction ID and details to our support team via chat.
         Our team will investigate the discrepancy and work with you to resolve the issue.
              </p>
            </div>


          </div>

          <div className="mt-4 flex gap-2 items-center">
            <div>
              <p className="text-sm font-Poppins text-[#2A2A2A] font-normal">
                Was this helpful?
              </p>
            </div>

            <div className="flex gap-1">
              <FaRegThumbsUp /> <span>0</span>
            </div>
            <div className="flex gap-1">
              <FaRegThumbsDown className="mt-1" /> <span>0</span>
            </div>
          </div>

          <div className="flex justify-end">
            {/* <button
         onClick={() => {
                    router.push("/mainlivechat");
                  }}
              className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-semibold font-Poppins rounded"
            >
              Chat Now
            </button> */}
          </div>
        </div>
      </div>
      <div></div>
    </LivechatModal>
  )
}


{
  isModalOpenit && (
    <LivechatModal
      icon={""}
      isOpen={isModalOpenit}
      onClose={handleCloseModalit}
      title=""
      handleEvent={handleCloseModalit}
    >
      <div
        className=" cursor-pointer"
        onClick={handleCloseModalit}
        style={{
          backgroundImage: "url('/ajirobabg.svg')", // Add your image path here
          backgroundSize: "33.33%",
          backgroundPosition: "center",
          backgroundRepeat: "repeat-x",
          /*       backgroundPosition: "top", */
        }}
      >
        <div className="bg-[#F6F6F6] items-center cursor-pointer p-8">
          <div className="flex justify-between items-center">
            <div className="">
              <Link href={"/"}>
                <Image src={Brand} alt="" />
              </Link>
            </div>

            <div>
              <IoIosClose size={32} />
            </div>
          </div>

          <h1 className="flex text-[#111111] font-semibold text-base font-Poppins justify-center items-center">
        Item not received or damaged
          </h1>
          <p className="flex justify-center font-Poppins font-normal text-[#2A2A2A] text-base items-center">
       Published by Ajiroba Techologies - 30 days ago
          </p>
        </div>

        <div className="p-8 flex flex-col gap-5">
          <div>
            <div>
              <p className="text-sm font-Poppins text-[#2A2A2A] font-normal">
    Check the shipping status and estimated delivery date.
    If the item is damaged or not received, please contact our
    support team with your order number and details of the issue.
     We will assist you in getting a replacement or refund.
              </p>
            </div>


          </div>

          <div className="mt-4 flex gap-2 items-center">
            <div>
              <p className="text-sm font-Poppins text-[#2A2A2A] font-normal">
                Was this helpful?
              </p>
            </div>

            <div className="flex gap-1">
              <FaRegThumbsUp /> <span>0</span>
            </div>
            <div className="flex gap-1">
              <FaRegThumbsDown className="mt-1" /> <span>0</span>
            </div>
          </div>

          <div className="flex justify-end">
            {/* <button
            onClick={() => {
                    router.push("/mainlivechat");
                  }}
              className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-semibold font-Poppins rounded"
            >
              Chat Now
            </button> */}
          </div>
        </div>
      </div>
      <div></div>
    </LivechatModal>
  )
}


{
  isModalOpenun && (
    <LivechatModal
      icon={""}
      isOpen={isModalOpenun}
      onClose={handleCloseModalun}
      title=""
      handleEvent={handleCloseModalun}
    >
      <div
        className=" cursor-pointer"
        onClick={handleCloseModalun}
        style={{
          backgroundImage: "url('/ajirobabg.svg')", // Add your image path here
          backgroundSize: "33.33%",
          backgroundPosition: "center",
          backgroundRepeat: "repeat-x",
          /*       backgroundPosition: "top", */
        }}
      >
        <div className="bg-[#F6F6F6] items-center cursor-pointer p-8">
          <div className="flex justify-between items-center">
            <div className="">
              <Link href={"/"}>
                <Image src={Brand} alt="" />
              </Link>
            </div>

            <div>
              <IoIosClose size={32} />
            </div>
          </div>

          <h1 className="flex text-[#111111] font-semibold text-base font-Poppins justify-center items-center">
        Unable to complete ticket purchase
          </h1>
          <p className="flex justify-center font-Poppins font-normal text-[#2A2A2A] text-base items-center">
       Published by Ajiroba Techologies - 30 days ago
          </p>
        </div>

        <div className="p-8 flex flex-col gap-5">
          <div>
            <div>
              <p className="text-sm font-Poppins text-[#2A2A2A] font-normal">
Ensure that your payment information is correct and that there are no issues with your payment method.
If the problem persists, clear your browser cache or try using a different browser.
 For further assistance, please chat with a support representative.
              </p>
            </div>


          </div>

          <div className="mt-4 flex gap-2 items-center">
            <div>
              <p className="text-sm font-Poppins text-[#2A2A2A] font-normal">
                Was this helpful?
              </p>
            </div>

            <div className="flex gap-1">
              <FaRegThumbsUp /> <span>0</span>
            </div>
            <div className="flex gap-1">
              <FaRegThumbsDown className="mt-1" /> <span>0</span>
            </div>
          </div>

          {/* <div className="flex justify-end">
            <button
             onClick={() => {
                    router.push("/mainlivechat");
                  }}
              className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-semibold font-Poppins rounded"
            >
              Chat Now
            </button>
          </div> */}
        </div>
      </div>
      <div></div>
    </LivechatModal>
  )
}




      </main>
      <div className=''>
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


