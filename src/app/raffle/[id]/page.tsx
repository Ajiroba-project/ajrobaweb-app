// "use client";
// import React, { useState, useEffect } from "react";

// import { raffle } from "@/app/static-data";

// import { useRouter } from "next/navigation";
// import { HeadingText } from "../../component/Heading";
// import { DefaultButton } from "../../component/Button";
// import Image from "next/image";

// const Page = ({ params }: any) => {
//   const router = useRouter();
//   const [data, setData] = useState<any>(
//     raffle.filter((val) => val.host === params.id),
//   );
//   const [playState, setPlayState] = useState<boolean>(false);
//   const [minTimeout, setMinTimeOut] = useState<boolean>(false);

//   const HandleTimer = () => {
//     setMinTimeOut(!minTimeout);

//     // const timeout = setTimeout(() => {
//     //   setMinTimeOut(!minTimeout)
//     // }, 3000)
//     // return clearTimeout(timeout)
//   };

//   useEffect(() => {
//     const filtered = raffle.filter((val) => val.host === params.id);
//     setData(filtered);
//   }, [params.id]);

//   return (
//     <section className="z-auto">
//       <div className="w-full bg-[#F6F6F6] pt-[13vh]">
//         <div className="container flex flex-col">
//           <p
//             onClick={() => router.back()}
//             className="cursor-pointer text-[#F25E26] underline"
//           >
//             Back
//           </p>
//           <div className="mb-3 text-center">
//             <HeadingText title="Live Raffle Draw" />
//           </div>
//         </div>
//       </div>
//       <section className="relative mb-[5rem] mt-7 flex flex-col items-center justify-center">
//         <div className="relative z-auto mb-4 w-full">
//           <div className="flex justify-center items-center ">
//             {/* Embed the YouTube video using iframe */}
//             <iframe
//               src="https://www.youtube.com/embed/A50B4AwxwsU"
//               width="800"
//               height="306"
//               // className="w-[100%] max-w-[1092px] rounded-lg"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>


//          <DefaultButton
//           text={`${!playState ? "Stop Video" : "Auction"}`}
//           className="h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all "
//           type="button"
//           handleClick={() =>
//             playState
//               ? HandleTimer
//               : router.push(`/raffle/${params.id}/winners`)
//           }
//         />

//        {/*  <DefaultButton
//           text={`${!playState ? "Stop Video" : "Auction"}`}
//           className="h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all "
//           type="button"
//           handleClick={() =>
//             playState
//               ? HandleTimer
//               : router.push(`/raffle/${params.id}/winners`)
//           }
//         /> */}
//       </section>
//     </section>
//   );
// };

// export default Page;




"use client";
import React, { useState, useEffect, useRef } from "react";
import { raffle } from "@/app/static-data";
import { useRouter } from "next/navigation";
import { HeadingText } from "../../component/Heading";
import { DefaultButton } from "../../component/Button";
import Cookies from "js-cookie";
import ModalComponent from "@/app/component/ModalComponent";


interface ProductData {
  id?: string;
  name?: string;
  price?: number;
  data?: any;
  starts_in?: any;
  // Add other properties as needed
}

const Page = ({ params }: any) => {
  const router = useRouter();
  const [data, setData] = useState<any>(
    raffle.filter((val) => val.host === params.id),
  );
  const [playState, setPlayState] = useState<boolean>(true); // Start as playing
  const iframeRef = useRef<HTMLIFrameElement>(null);
    const [viewCoundown, setViewCountdown] = useState(false);
    const [raffleended, setraffleended] = useState(false)

    const userToken = (Cookies.get("token") as string) || "";

  const product_id = params?.id

  console.log(product_id, "product_id")

  const [productdatanew, setProductDataNew] = useState<ProductData | null>(
    null,
  );
  const [loadingdata, setLoadingData] = useState(false);

  const fetchWithAuth = async (url: string) => {
    setLoadingData(true); // Indicate loading start

    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `token ${userToken}`, // Simplified header creation
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json(); // Parse JSON response

      console.log(result, "result");

      setProductDataNew(result?.data); // Update state with result
   setViewCountdown(true)

      if (result?.data?.starts_in === "Raffle Ended" ) {
        setraffleended(true)

      }
      setLoadingData(false); // Ensure loading is stopped
      if (result?.data) {

      }
      return result; // Return result for external use
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw for the caller to handle
    } finally {
      setLoadingData(false); // Ensure loading is stopped
    }
  };



    const fetchData = async () => {
    try {
      const data = await fetchWithAuth(
        `https://ajiroba.onrender.com/v1/auction/view_auction/${product_id}/`,
      );
      // console.log("Fetched data:", data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [product_id]); // Refetch whenever product_id changes




  useEffect(() => {
    const filtered = raffle.filter((val) => val.host === params.id);
    setData(filtered);
  }, [params.id]);

  const handleVideoControl = () => {
    if (iframeRef.current) {
      const iframeWindow = iframeRef.current.contentWindow;
      if (iframeWindow) {
        // Pause or play the video using YouTube Player API commands
        const action = playState ? "pauseVideo" : "playVideo";
        iframeWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: action,
            args: [],
          }),
          "*"
        );
      }
    }
    setPlayState(!playState); // Toggle play state
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
       {/*  <div className="border-[#B7B7B7] h-2.5 w-full rounded-full border ">
        <div
            className="h-2 rounded-full bg-[#F25E26]"
            style={{ width: `${progress}%` }}
          ></div>
        </div> */}

        <p className="mt-4 text-2xl font-bold text-gray-900 flex justify-center items-center gap-1 flex-wrap text-center ">
          <span className="font-medium">{daysLeft}</span> dy:{" "}
          <span className="font-medium">{hoursLeft}</span> Hr:{" "}
          <span className="font-medium">{minutesLeft}</span> Min{" "}
    {/*       <span className="font-medium">Left</span> */}
        </p>
      </div>
    );
  };

  return (
    <section className="z-auto">
      <div className="w-full bg-[#F6F6F6] pt-[13vh]">
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
            {/* Embed the YouTube video using iframe */}
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/A50B4AwxwsU?autoplay=1&enablejsapi=1"
              width="800"
              height="306"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <DefaultButton
          text={playState ? "Stop Video" : "Play Video"}
          className="h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all"
          type="button"
          handleClick={handleVideoControl}
        />
      </section>



          <ModalComponent
            content={
              <div className="flex flex-col  px-6 py-4">
                <div className="self-start text-red-500 font-Poppins cursor-pointer mb-4">
                  Back
                </div>

<div className="flex items-center justify-center  bg-gray-100">
      <div className="relative flex flex-col items-center justify-center w-64 h-72 rounded-xl bg-gradient-to-b from-[#FDECE9] to-white shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.1)] border-[4px] border-[#9C4DCC]">
        {/* Emoji or Image */}
        <div className="absolute -top-8 flex items-center justify-center w-16 h-16 rounded-full bg-[#FDECE9] border-[4px] border-white shadow-md">
          <span role="img" aria-label="emoji" className="text-3xl">
            😊
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-12 text-lg font-semibold text-gray-800">
          Raffle Draw
        </h3>

        {/* Subtitle */}
        <p className="mt-1 text-sm text-gray-500">starts in</p>

        {/* Countdown Number */}
          <CountdownTimer
                        startsIn={productdatanew?.starts_in}
                      />
      {/*   <span className="mt-4 text-5xl font-bold text-gray-900">1</span> */}
      </div>
    </div>

              </div>
            }
            isModalOpen={viewCoundown}
            showModal={() => setViewCountdown(!viewCoundown)}
            handleOk={() => setViewCountdown(false)}
            handleCancel={() => setViewCountdown(false)}
          />
    </section>
  );
};

export default Page;
