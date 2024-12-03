"use client";
import React, { useState, useEffect, useRef } from "react";
import { raffle } from "@/app/static-data";
import { useRouter } from "next/navigation";
import { HeadingText } from "../../component/Heading";
import { DefaultButton } from "../../component/Button";
import Cookies from "js-cookie";
import ModalComponent from "@/app/component/ModalComponent";
import { Footer } from "@/app/component/Footer";
import { Header } from "@/app/component/Header";


import AuthMiddleware from "@/hooks/useAuth";
import useAuthMiddleware from "@/hooks/useAuthRaffle"

interface ProductData {
  id?: string;
  name?: string;
  price?: number;
  data?: any;
  starts_in?: any;
}

const Page = ({ params }: any) => {
  const router = useRouter();
  // AuthMiddleware(router);
    useAuthMiddleware(router);

  const [data, setData] = useState<any>(
    raffle.filter((val) => val.host === params.id),
  );
  const [playState, setPlayState] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewCoundown, setViewCountdown] = useState(false);
  const [raffleended, setraffleended] = useState(false);

  const userToken = (Cookies.get("token") as string) || "";

  const product_id = params?.id;

  const [productdatanew, setProductDataNew] = useState<ProductData | null>(
    null,
  );
  const [loadingdata, setLoadingData] = useState(false);

  const fetchWithAuth = async (url: string) => {
    setLoadingData(true);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `token ${userToken}`,
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setProductDataNew(result?.data);
      setViewCountdown(true);

      if (result?.data?.starts_in === "Raffle Ended") {
        setraffleended(true);
      }
      setLoadingData(false);
      if (result?.data) {
      }
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      setLoadingData(false);
    }
  };

  const fetchData = async () => {
    try {
      const data = await fetchWithAuth(
        `https://ajiroba.onrender.com/v1/auction/view_auction/${product_id}/`,
      );
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [product_id]);

  useEffect(() => {
    const filtered = raffle.filter((val) => val.host === params.id);
    setData(filtered);
  }, [params.id]);

  const handleVideoControl = () => {
    if (iframeRef.current) {
      const iframeWindow = iframeRef.current.contentWindow;
      if (iframeWindow) {
        const action = playState ? "pauseVideo" : "playVideo";
        iframeWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: action,
            args: [],
          }),
          "*",
        );
      }
    }
    setPlayState(!playState);
  };

  function parseStartsIn(startsIn = "0 Days, 0 Hr: 3 Mins Left") {
    const daysMatch = startsIn.match(/(\d+)\s*Days/);
    const hoursMatch = startsIn.match(/(\d+)\s*Hr/);
    const minutesMatch = startsIn.match(/(\d+)\s*Mins/);

    const daysLeft = daysMatch ? parseInt(daysMatch[1], 10) : 0;
    const hoursLeft = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutesLeft = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

    return {
      totalMinutes: daysLeft * 24 * 60 + hoursLeft * 60 + minutesLeft,
      daysLeft,
      hoursLeft,
      minutesLeft,
    };
  }

  const CountdownTimer = ({ startsIn = "0 Days, 0 Hr: 0 Mins Left" }) => {
    const {
      totalMinutes: initialTotalMinutes,
      daysLeft: initialDaysLeft,
      hoursLeft: initialHoursLeft,
      minutesLeft: initialMinutesLeft,
    } = parseStartsIn(startsIn);

    const [timeLeft, setTimeLeft] = useState(initialTotalMinutes);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const minutesLeft = timeLeft % 60;
    const hoursLeft = Math.floor(timeLeft / 60) % 24;
    const daysLeft = Math.floor(timeLeft / 1440);

    const progress =
      initialTotalMinutes > 0 ? (timeLeft / initialTotalMinutes) * 100 : 0;

    return (
      <div className="mb-3">
        <p className="mt-4 text-2xl font-bold text-gray-900 flex justify-center items-center gap-1 flex-wrap text-center ">
          <span className="font-medium">{daysLeft}</span> dy:{" "}
          <span className="font-medium">{hoursLeft}</span> Hr:{" "}
          <span className="font-medium">{minutesLeft}</span> Min{" "}
        </p>
      </div>
    );
  };

  return (
    <section className="z-auto">
      <header className="fixed z-50 w-full">
        <Header />
      </header>
      <div className="w-full bg-[#F6F6F6] pt-[20vh]">
        <div className="container flex flex-col">
          <p
            onClick={() => router.back()}
            className="cursor-pointer text-[#F25E26] underline"
          >
            Back
          </p>
          <div className="mb-3 text-center">
            <HeadingText title="Live Raffle Draw" />
          </div>
        </div>
      </div>
      <section className="relative mb-[5rem] mt-7 flex flex-col items-center justify-center">
        <div className="relative z-auto mb-4 w-full">
          <div className="flex justify-center items-center">
           {/*  <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/A50B4AwxwsU?autoplay=1&enablejsapi=1"
              width="800"
              height="306"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe> */}
            <video
   /*      ref={iframeRef} */
        width="800"
        height="306"
        controls
        autoPlay

        className="rounded-lg shadow-md"
      >
        <source src="/ajirobaadvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
          </div>
        </div>

        {productdatanew?.starts_in == "Raffle Ended" ? (
          <DefaultButton
            text="Watch Live Raffle"
            className="h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all"
            type="button"
            handleClick={() => {
              router.push(`/raffle/${product_id}/winners`);
            }}
          />
        ) : (
          <DefaultButton
            text={playState ? "Stop Video" : "Play Video"}
            className="h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all"
            type="button"
            handleClick={handleVideoControl}
          />
        )}
      </section>

      <ModalComponent
        content={
          <div className="flex flex-col  px-6 py-4">
            <div className="self-start text-red-500 font-Poppins cursor-pointer mb-4">
              Back
            </div>

            <div className="flex items-center justify-center  bg-gray-100">
              <div className="relative flex flex-col items-center justify-center w-64 h-72 rounded-xl bg-gradient-to-b from-[#FDECE9] to-white shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.1)] border-[4px] border-[#9C4DCC]">
                <div className="absolute -top-8 flex items-center justify-center w-16 h-16 rounded-full bg-[#FDECE9] border-[4px] border-white shadow-md">
                  <span role="img" aria-label="emoji" className="text-3xl">
                    😊
                  </span>
                </div>

                <h3 className="mt-12 text-lg font-semibold text-gray-800">
                  Raffle Draw
                </h3>

                <p className="mt-1 text-sm text-gray-500">    starts in</p>

                <CountdownTimer startsIn={productdatanew?.starts_in} />
              </div>
            </div>
          </div>
        }
        isModalOpen={viewCoundown}
        showModal={() => setViewCountdown(!viewCoundown)}
        handleOk={() => setViewCountdown(false)}
        handleCancel={() => setViewCountdown(false)}
      />
      <Footer />
    </section>
  );
};

export default Page;
