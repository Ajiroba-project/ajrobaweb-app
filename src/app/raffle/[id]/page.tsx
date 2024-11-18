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


interface ProductData {
  id?: string;
  name?: string;
  price?: number;
  data?: any;
  // Add other properties as needed
}

const Page = ({ params }: any) => {
  const router = useRouter();
  const [data, setData] = useState<any>(
    raffle.filter((val) => val.host === params.id),
  );
  const [playState, setPlayState] = useState<boolean>(true); // Start as playing
  const iframeRef = useRef<HTMLIFrameElement>(null);

    const userToken = (Cookies.get("token") as string) || "";

  const product_id = params.slug;

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
      setProductDataNew(result); // Update state with result
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
    </section>
  );
};

export default Page;
