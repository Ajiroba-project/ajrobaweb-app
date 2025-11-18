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
import { ModalTerms } from '../profile/components/ModalProfile'
import Link from 'next/link'
import Brand from '@/app/asset/logo.svg'
import { IoIosClose } from 'react-icons/io'
import { LivechatModal } from '../profile/components/livechatModal'

const LiveChatPage = () => {
  const [active, setActive] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
   const [isModalOpenget, setModalOpenget] = useState(false);
  const [isModalOpenauc, setModalOpenauc] = useState(false);
   const [isModalOpenhow, setModalOpenhow] = useState(false);
    const router = useRouter();


      const handleCloseModal = () => {
    setModalOpenget(false);
  };

     const handleCloseModalAuc = () => {
    setModalOpenauc(false);
  };

     const handleCloseModalhow = () => {
    setModalOpenhow(false);
  };

const handleClick = (data: any) =>{
console.log(data, 'data')

// 


if (data === 'contactus') {
    router.push('/contactushelp')
  }else if (data === 'Complaint') {
    router.push('/complaintandresolution')
  }else if (data === 'GettingStarted') {
    setModalOpenget(!isModalOpenget)
  }else if (data === 'AuctionDetails') {
    /* router.push('/auctiondetails') */
    setModalOpenauc(!isModalOpenauc)
  }else if (data === 'Howto') {
    setModalOpenhow(!isModalOpenhow)
  }


}


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
              <HeadingText title="Self Help" />
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
            Ajiroba Technologies Self Help
          </h2>
          <p className="text-[#353131] text-sm font-Poppins mb-6 leading-relaxed">
            For immediate assistance, click the &apos;Chat Now&apos; button below to connect
            with one of our support representatives or check out our comprehensive
            self-help resources. We &apos; re here to help with any questions or issues you may have.
          </p>



          {/* Buttons */}
          <div className="flex justify-center md:justify-start flex-wrap space-x-4">
             {/* <button onClick={() => router.push('/mainlivechat')}
            className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-semibold font-Poppins rounded"
          >
            Self Help
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
      <div className="bg-gray-300 text-center py-4 rounded-t-lg">
        <h1 className="text-base font-semibold font-Poppins text-[#2A2A2A]">
          Ajiroba Self Help
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
  isModalOpenget && (
    <LivechatModal
      icon={""}
      isOpen={isModalOpenget}
      onClose={handleCloseModal}
      title=""
      handleEvent={handleCloseModal}
    >
      <div
        className=" cursor-pointer"
        onClick={handleCloseModal}
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
            Getting Started With Ajiroba
          </h1>
          <p className="flex justify-center font-Poppins font-normal text-[#2A2A2A] text-base items-center">
       Published by Ajiroba Techologies - 30 days ago
          </p>
        </div>

        <div className="p-8 flex flex-col gap-5">
          <div>
            <div>
              <p className="text-sm font-Poppins text-[#2A2A2A] font-normal">
                To register on Ajiroba Technologies, first, visit our website
                and click on the &ldquo;Register&ldquo; or &ldquo;Sign Up&ldquo;
                button. Fill in your details, including your name, email, and
                password. After submitting your information, you will receive a
                verification email. Click on the link in the email to verify
                your account. Once verified, log in to your new account and
                complete your profile by adding your contact information and
                preferred payment methods
              </p>
            </div>

            <div className="mt-12">
              <p className="text-sm font-Poppins text-[#2A2A2A] font-normal">
                To buy a product, navigate to the &ldquo;Shop&ldquo; section on
                our website. Use the search bar or browse through categories to
                find the product you want to purchase. Click on the product for
                more details, select the desired quantity, and click &ldquo;Add
                to Cart.&quot; Once you&lsquo;ve added all your items to the
                cart, go to your cart and review your selections. Click
                &ldquo;Checkout,&ldquo; enter your shipping information, and
                select a payment method. Confirm your order and place it. You
                will receive an email confirmation with your order details and
                tracking information once your item is shipped.
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
            <button
           onClick={() => {
                    router.push("/mainlivechat");
                  }}
              className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-semibold font-Poppins rounded"
            >
              Chat Now
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </LivechatModal>
  )
}



{
  isModalOpenauc && (
    <LivechatModal
      icon={""}
      isOpen={isModalOpenauc}
      onClose={handleCloseModalAuc}
      title=""
      handleEvent={handleCloseModalAuc}
    >
      <div
        className=" cursor-pointer"
        onClick={handleCloseModalAuc}
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
            Details About Auction
          </h1>
          <p className="flex justify-center font-Poppins font-normal text-[#2A2A2A] text-base items-center">
          Published by Ajiroba Techologies - 30 days ago
          </p>
        </div>

        <div className="p-8 flex flex-col gap-5">
          <div>
            <div>
              <p className="text-sm font-Poppins text-[#2A2A2A] font-normal">
              To participate in an auction, visit the &quot;Auctions&quot; section of our website.
              Browse the available auctions and select the one you are interested in.
              Review the auction details and place your bid by entering the amount and clicking &quot;Place Bid.&quot;
              Monitor the auction to see if you are the highest bidder. If you win the auction,
              you will receive an email notification with further instructions on how to complete the purchase.
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
            <button
           onClick={() => {
                    router.push("/mainlivechat");
                  }}
              className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-semibold font-Poppins rounded"
            >
              Chat Now
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </LivechatModal>
  )
}



{
  isModalOpenhow && (
    <LivechatModal
      icon={""}
      isOpen={isModalOpenhow}
      onClose={handleCloseModalhow}
      title=""
      handleEvent={handleCloseModalhow}
    >
      <div
        className=" cursor-pointer"
        onClick={handleCloseModalhow}
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
            How to Participate in Raffle Draws
          </h1>
          <p className="flex justify-center font-Poppins font-normal text-[#2A2A2A] text-base items-center">
          Published by Ajiroba Techologies - 30 days ago
          </p>
        </div>

        <div className="p-8 flex flex-col gap-5">
          <div>
            <div>
              <p className="text-sm font-Poppins text-[#2A2A2A] font-normal">
 To participate in a raffle draw, first ensure you have purchased the product
 or ticket associated with the raffle. Follow the instructions provided with
  the product or ticket to enter the raffle. Once entered, wait for the draw date.
   If you win, you will be notified via email with details on how to claim your prize.
By following these steps, you can easily register, purchase products and tickets,
 participate in auctions, and enter raffle draws on Ajiroba Technologies.
  If you need further assistance, our support team is always here to help.
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
            <button
            onClick={() => {
                    router.push("/mainlivechat");
                  }}
              className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-semibold font-Poppins rounded"
            >
              Chat Now
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </LivechatModal>
  )
}

      </main>
      <Footer />
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


