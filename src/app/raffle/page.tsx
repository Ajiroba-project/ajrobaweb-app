"use client";
import React, { Suspense } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import Image from 'next/image'
import raffle_img from '../asset/image/raffle_img.svg'
import { HeadingText } from '../component/Heading';
import { useRouter } from 'next/navigation';

const RafflePage = () => {

  const router = useRouter();
  return (
    <>
      <Header />

      <main className="w-full pt-[13vh] md:pt-[20vh] lg:pt-[20vh] content-container">
        <div className=" mx-auto  max-w-[1440px]">


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
              <HeadingText title="Raffle Draw Procedure" />
            </div>
          </div>
        </div>
          {/* <h1 className="text-center text-[28px] font-bold mb-16">Raffle Draw Procedure</h1> */}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-20 content-container">
            <div className="max-w-[600px]">
              <div className="space-y-6">
                <p className="text-[20px] leading-relaxed">
                  At <span className="text-[#F25E26] text-2xl font-bold">Ajiroba</span>, we believe in providing access to
                </p>
                <p className="text-[20px] leading-relaxed">
                  <span className="text-[#F25E26] text-2xl font-bold">basic daily</span> needs for everyone, regardless of their
                </p>
                <p className="text-[20px] leading-relaxed">
                  <span className="text-[#F25E26] text-2xl font-bold">financial position</span>, and by
                </p>
                <p className="text-[20px] leading-relaxed">
                  extension we put smiles on the faces of our <span className="text-[#F25E26] text-2xl font-bold">customers</span> who are our kings and queens
                </p>
              </div>
            </div>
            <div className="relative w-full lg:w-[500px] h-[400px]">
              <Image
                src={raffle_img}
                alt="Raffle illustration"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>

          <div className="mt-20 content-container">
            <h2 className="text-[24px] font-semibold mb-12 text-center lg:text-left">
              How does the raffle draw work on our platform?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  step: "1",
                  title: "Sign Up",
                  description: "Create Your Profile And Provide Basic KYC Information."
                },
                {
                  step: "2",
                  title: "Fund Wallet",
                  description: "Credit Your Wallet To Buy Your Ticket. Your Ticket Allows You To Bid For Any Product On Auction."
                },
                {
                  step: "3",
                  title: "Make Bid",
                  description: "Browse The List Of Items Available For Raffle And Bid Your Item Of Choice."
                },
                {
                  step: "4",
                  title: "Join Live Raffle",
                  description: "At The Specified Time, Watch The Live Draw Live. If Your Ticket Wins, You'll Be Notified Via Email And Dashboard"
                },
                {
                  step: "5",
                  title: "Prizes",
                  description: "Wondering About Prizes? When You Win, We'll Either Deliver The Actual Product To You Or Issue A Gift Voucher Equal To Its Value."
                },
                {
                  step: "6",
                  title: "Participant",
                  description: "You Can Participate From Anywhere In The World. Your Location Is Not A Barrier With Ajiroba."
                }
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[#F8F8F8] p-8 rounded-lg shadow-sm"
                >
                  {/* Step number: top center of card, circle with orange fill and white number */}
                  <div className="flex justify-center mb-4">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEDED8CC] text-2xl font-bold text-[#F25E26]"
                      aria-hidden
                    >
                      {item.step}
                    </span>
                  </div>
                 
                  <div className="text-center">
                    <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                    <p className="text-[#666666] text-[16px] leading-relaxed font-Poppins">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

<div className=''>
  <Footer />
</div>
    </>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RafflePage />
    </Suspense>
  )
}
