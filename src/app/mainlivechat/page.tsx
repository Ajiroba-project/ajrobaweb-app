"use client";
import React, { Fragment, Suspense, useEffect } from "react";
import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import { HeadingText } from "../component/Heading";
import { FaWhatsapp } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Image from "next/image";
import mesager from "@/app/asset/image/messager.png";
import ing from "@/app/asset/image/instagram.png";
import gmail from "@/app/asset/image/gmail.png";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { profilePhoto, useAuthStore } from "@/store/store";
import { useGetDatanew } from "@/hooks/useGetData";

const LiveChatPage = () => {
  const router = useRouter();
  const userToken = (Cookies.get("token") as string) || "";

  const { setProfileurl } = profilePhoto((state) => ({
    setProfileurl: state.setProfileurl,
  }));

  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/admin_chat_info/`;

  const { data: userInfo } = useGetDatanew(
    url,
    "get_user_details",
    userToken || " ",
  );

  useEffect(() => {
    if (!userToken) {
      toast.error("Please log in to continue.");
      router.push("/livechat");
      return;
    }

    if (isLoggedIn && userInfo?.profile_image_url) {
      setProfileurl(userInfo.profile_image_url);
    }
  }, [isLoggedIn, userInfo, setProfileurl, userToken, router]);

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
          <div className="flex flex-col items-center text-center">
            <h1 className="font-Poppins text-2xl font-semibold text-[#111111] sm:text-3xl md:text-4xl">
              We&apos;re Here to Help
            </h1>
            <h2 className="mt-3 font-Poppins text-sm font-semibold text-[#E84526] sm:text-base">
              Ajiroba Technologies Self Help
            </h2>
            <p className="mt-4 font-Poppins text-sm leading-relaxed text-[#6E6E6E] sm:text-base lg:w-3/4">
              For immediate assistance, click the &apos;Chat Now&apos; button
              below to connect with one of our support representatives or
              check out our comprehensive self-help resources. We&apos;re
              here to help with any questions or issues you may have.
            </p>

            <div className="mt-6 flex w-full flex-wrap justify-center gap-4 sm:mt-8">
              <button
                onClick={() => router.push("/livechat")}
                className="rounded-md bg-[#FCDFD4] px-10 py-3 font-Poppins text-sm font-semibold text-[#2A2A2A] transition-colors hover:bg-[#F25E26] hover:text-white sm:px-12"
              >
                Go Back
              </button>
              <button
                onClick={() => router.push("/selfhelp")}
                className="rounded-md border border-[#E84526] bg-white px-10 py-3 font-Poppins text-sm font-semibold text-[#2A2A2A] transition-colors hover:bg-[#F25E26] hover:text-white sm:px-12"
              >
                Self Help
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-5">
              <a href="#" aria-label="WhatsApp" className="transition-opacity hover:opacity-80">
                <FaWhatsapp color="#60d669" className="h-8 w-8" />
              </a>
              <a href="#" aria-label="Messenger" className="transition-opacity hover:opacity-80">
                <Image src={mesager} alt="Messenger" className="h-8 w-8" />
              </a>
              <a href="#" aria-label="Instagram" className="transition-opacity hover:opacity-80">
                <Image src={ing} alt="Instagram" className="h-7 w-7" />
              </a>
              <a href="#" aria-label="Gmail" className="transition-opacity hover:opacity-80">
                <Image src={gmail} alt="Gmail" className="h-8 w-8" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default function Searchbar() {
  return (
    <Suspense>
      <LiveChatPage />
    </Suspense>
  );
}
