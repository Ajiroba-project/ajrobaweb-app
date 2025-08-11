"use client";
import React, { Suspense } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import Image from 'next/image'
import raffle_img from '../asset/image/raffle_img.svg'
import { HeadingText } from '../component/Heading';

const RafflePage = () => {
  return (
    <>
      <header className="fixed z-50 w-full">
        <Header />
      </header>

      <main className="w-full pt-[13vh] md:pt-[20vh] lg:pt-[20vh]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1440px]">
          <h1 className="text-center text-[28px] font-bold mb-16">Raffle Draw Procedure</h1>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-20">
            <div className="max-w-[600px]">
              <div className="space-y-6">
                <p className="text-[20px] leading-relaxed">
                  At <span className="text-[#F25E26]">Ajiroba</span>, we believe in providing access to
                </p>
                <p className="text-[20px] leading-relaxed">
                  <span className="text-[#F25E26]">basic daily</span> needs for everyone, regardless of their
                </p>
                <p className="text-[20px] leading-relaxed">
                  <span className="text-[#F25E26]">financial position</span>, and by
                </p>
                <p className="text-[20px] leading-relaxed">
                  extension we put smiles on the faces of our <span className="text-[#F25E26]">customers</span> who are our kings and queens
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

          <div className="mt-20">
            <h2 className="text-[24px] font-semibold mb-12 text-center lg:text-left">
              How does the raffle draw work on our platform?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div key={item.step} className="bg-[#F8F8F8] p-8 rounded-lg shadow-sm mb-12">
                  <div className="text-[#F25E26] font-bold text-2xl mb-4">{item.step}</div>
                  <h3 className="font-semibold text-xl mb-3">{item.title}</h3>

                  <p className="text-[#666666] text-[16px] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
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
