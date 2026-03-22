'use client'
import React, { Fragment, Suspense, useState } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { HeadingText } from '../component/Heading'
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa6'
import { useRouter } from "next/navigation";
import Image from 'next/image'
import Link from 'next/link'
import Brand from '@/app/asset/logo.svg'
import { IoIosClose } from 'react-icons/io'
import { LivechatModal } from '../profile/components/livechatModal'

const LiveChatPage = () => {
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

  const handleClick = (data: any) => {
    if (data === 'contactus') {
      router.push('/contactushelp')
    } else if (data === 'Complaint') {
      router.push('/complaintandresolution')
    } else if (data === 'GettingStarted') {
      setModalOpenget(!isModalOpenget)
    } else if (data === 'AuctionDetails') {
      setModalOpenauc(!isModalOpenauc)
    } else if (data === 'Howto') {
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
        className="w-full rounded-lg bg-[#eeeceb] px-4 py-3 text-left font-Poppins text-sm font-medium text-[#504D4D] hover:bg-[#FCDFD4]">
        {text}
      </button>
    );
  };

  return (
    <Fragment>
      <Header />
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
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
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
                  onClick={() => router.back()}
                  className="rounded-md border border-[#E84526] bg-white px-10 py-3 font-Poppins text-sm font-semibold text-[#2A2A2A] transition-colors hover:bg-[#F25E26] hover:text-white sm:px-12"
                >
                  Go Back
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
                <div className="bg-gray-300 py-4 text-center">
                  <h1 className="font-Poppins text-base font-semibold text-[#2A2A2A]">
                    Ajiroba Self Help
                  </h1>
                </div>

                <div className="space-y-4 bg-[#fef9f6] p-6">
                  {helpOptions.map((option, index) => (
                    <SelfHelpOption
                      key={index}
                      text={option.text}
                      onClick={() => handleClick(option.action)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {isModalOpenget && (
          <LivechatModal
            icon={""}
            isOpen={isModalOpenget}
            onClose={handleCloseModal}
            title=""
            handleEvent={handleCloseModal}
          >
            <div
              className="cursor-pointer"
              onClick={handleCloseModal}
              style={{
                backgroundImage: "url('/ajirobabg.svg')",
                backgroundSize: "33.33%",
                backgroundPosition: "center",
                backgroundRepeat: "repeat-x",
              }}
            >
              <div className="bg-[#F6F6F6] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <Link href={"/"}>
                    <Image src={Brand} alt="" />
                  </Link>
                  <IoIosClose size={32} />
                </div>
                <h1 className="mt-4 text-center font-Poppins text-base font-semibold text-[#111111]">
                  Getting Started With Ajiroba
                </h1>
                <p className="mt-2 text-center font-Poppins text-sm text-[#2A2A2A]">
                  Published by Ajiroba Technologies - 30 days ago
                </p>
              </div>

              <div className="flex flex-col gap-5 p-6 sm:p-8">
                <p className="font-Poppins text-sm leading-relaxed text-[#2A2A2A]">
                  To register on Ajiroba Technologies, first, visit our website
                  and click on the &ldquo;Register&rdquo; or &ldquo;Sign Up&rdquo;
                  button. Fill in your details, including your name, email, and
                  password. After submitting your information, you will receive a
                  verification email. Click on the link in the email to verify
                  your account. Once verified, log in to your new account and
                  complete your profile by adding your contact information and
                  preferred payment methods
                </p>

                <p className="font-Poppins text-sm leading-relaxed text-[#2A2A2A]">
                  To buy a product, navigate to the &ldquo;Shop&rdquo; section on
                  our website. Use the search bar or browse through categories to
                  find the product you want to purchase. Click on the product for
                  more details, select the desired quantity, and click &ldquo;Add
                  to Cart.&quot; Once you&lsquo;ve added all your items to the
                  cart, go to your cart and review your selections. Click
                  &ldquo;Checkout,&rdquo; enter your shipping information, and
                  select a payment method. Confirm your order and place it. You
                  will receive an email confirmation with your order details and
                  tracking information once your item is shipped.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <p className="font-Poppins text-sm text-[#2A2A2A]">
                    Was this helpful?
                  </p>
                  <div className="flex items-center gap-1">
                    <FaRegThumbsUp /> <span>0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRegThumbsDown className="mt-1" /> <span>0</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => router.push("/mainlivechat")}
                    className="mt-4 rounded-md bg-[#FCDFD4] px-12 py-2 font-Poppins text-sm font-semibold text-[#2A2A2A] transition-colors hover:bg-[#F25E26] hover:text-white"
                  >
                    Chat Now
                  </button>
                </div>
              </div>
            </div>
            <div></div>
          </LivechatModal>
        )}

        {isModalOpenauc && (
          <LivechatModal
            icon={""}
            isOpen={isModalOpenauc}
            onClose={handleCloseModalAuc}
            title=""
            handleEvent={handleCloseModalAuc}
          >
            <div
              className="cursor-pointer"
              onClick={handleCloseModalAuc}
              style={{
                backgroundImage: "url('/ajirobabg.svg')",
                backgroundSize: "33.33%",
                backgroundPosition: "center",
                backgroundRepeat: "repeat-x",
              }}
            >
              <div className="bg-[#F6F6F6] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <Link href={"/"}>
                    <Image src={Brand} alt="" />
                  </Link>
                  <IoIosClose size={32} />
                </div>
                <h1 className="mt-4 text-center font-Poppins text-base font-semibold text-[#111111]">
                  Details About Auction
                </h1>
                <p className="mt-2 text-center font-Poppins text-sm text-[#2A2A2A]">
                  Published by Ajiroba Technologies - 30 days ago
                </p>
              </div>

              <div className="flex flex-col gap-5 p-6 sm:p-8">
                <p className="font-Poppins text-sm leading-relaxed text-[#2A2A2A]">
                  To participate in an auction, visit the &quot;Auctions&quot; section of our website.
                  Browse the available auctions and select the one you are interested in.
                  Review the auction details and place your bid by entering the amount and clicking &quot;Place Bid.&quot;
                  Monitor the auction to see if you are the highest bidder. If you win the auction,
                  you will receive an email notification with further instructions on how to complete the purchase.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <p className="font-Poppins text-sm text-[#2A2A2A]">
                    Was this helpful?
                  </p>
                  <div className="flex items-center gap-1">
                    <FaRegThumbsUp /> <span>0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRegThumbsDown className="mt-1" /> <span>0</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => router.push("/mainlivechat")}
                    className="mt-4 rounded-md bg-[#FCDFD4] px-12 py-2 font-Poppins text-sm font-semibold text-[#2A2A2A] transition-colors hover:bg-[#F25E26] hover:text-white"
                  >
                    Chat Now
                  </button>
                </div>
              </div>
            </div>
            <div></div>
          </LivechatModal>
        )}

        {isModalOpenhow && (
          <LivechatModal
            icon={""}
            isOpen={isModalOpenhow}
            onClose={handleCloseModalhow}
            title=""
            handleEvent={handleCloseModalhow}
          >
            <div
              className="cursor-pointer"
              onClick={handleCloseModalhow}
              style={{
                backgroundImage: "url('/ajirobabg.svg')",
                backgroundSize: "33.33%",
                backgroundPosition: "center",
                backgroundRepeat: "repeat-x",
              }}
            >
              <div className="bg-[#F6F6F6] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <Link href={"/"}>
                    <Image src={Brand} alt="" />
                  </Link>
                  <IoIosClose size={32} />
                </div>
                <h1 className="mt-4 text-center font-Poppins text-base font-semibold text-[#111111]">
                  How to Participate in Raffle Draws
                </h1>
                <p className="mt-2 text-center font-Poppins text-sm text-[#2A2A2A]">
                  Published by Ajiroba Technologies - 30 days ago
                </p>
              </div>

              <div className="flex flex-col gap-5 p-6 sm:p-8">
                <p className="font-Poppins text-sm leading-relaxed text-[#2A2A2A]">
                  To participate in a raffle draw, first ensure you have purchased the product
                  or ticket associated with the raffle. Follow the instructions provided with
                  the product or ticket to enter the raffle. Once entered, wait for the draw date.
                  If you win, you will be notified via email with details on how to claim your prize.
                  By following these steps, you can easily register, purchase products and tickets,
                  participate in auctions, and enter raffle draws on Ajiroba Technologies.
                  If you need further assistance, our support team is always here to help.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <p className="font-Poppins text-sm text-[#2A2A2A]">
                    Was this helpful?
                  </p>
                  <div className="flex items-center gap-1">
                    <FaRegThumbsUp /> <span>0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRegThumbsDown className="mt-1" /> <span>0</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => router.push("/mainlivechat")}
                    className="mt-4 rounded-md bg-[#FCDFD4] px-12 py-2 font-Poppins text-sm font-semibold text-[#2A2A2A] transition-colors hover:bg-[#F25E26] hover:text-white"
                  >
                    Chat Now
                  </button>
                </div>
              </div>
            </div>
            <div></div>
          </LivechatModal>
        )}
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
