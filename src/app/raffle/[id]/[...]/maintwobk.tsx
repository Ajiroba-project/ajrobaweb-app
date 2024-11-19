


'use client'
import React, { useEffect, useState } from 'react'
import { raffleWinner } from '@/app/static-data'
import { DefaultButton } from '@/app/component/Button'
import { useRouter } from 'next/navigation'
import { HeadingText } from '@/app/component/Heading'
import useAuthMiddleware from '@/hooks/useAuth'
import './style.css'
import Cookies from "js-cookie";
import { Header } from '@/app/component/Header'
import { Footer } from '@/app/component/Footer'

interface ProductData {
  id?: string;
  name?: string;
  price?: number;
  data?: any;
  starts_in?: any;
  // Add other properties as needed
}

const Page = ({ params }: any) => {
  const product_id = params?.id;
  const userToken = (Cookies.get("token") as string) || "";

     const router = useRouter()
   // useAuthMiddleware(router)

  const [productdatanew, setProductDataNew] = useState<ProductData | null>(null);
  const [loadingdata, setLoadingData] = useState(false);
  const [showWinners, setShowWinners] = useState(false); // New state to control the display

  console.log(productdatanew, 'productnewwww')

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
      setProductDataNew(result);
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
        `https://ajiroba.onrender.com/v1/auction/auction_tickets/?auction_id=${product_id}`
      );
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [product_id]);

  // Set a timer to display winners after 1 minute
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWinners(true);
    }, 60000); // 1 minute

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const thead = ["SN", "Product", `Ticket Number`, "Phone Number"];

  const renderRows = () => {
    if (!showWinners) {
      // Render animating counters
      return (
       <>
  {productdatanew?.data?.map((val: any, index: number) => (
      <tr className="h-2 text-white" key={index}>
        {/* Serial Number */}
        <td className="w-1 cursor-pointer rounded-br-[20px] rounded-tl-[30px] bg-gradient-to-r from-[#E84526] to-[#EA7000] text-center">
          <p className="text-lg font-semibold">{index + 1}</p>
        </td>

        {/* Product Name */}
        <td className="w-1 text-center">
          <p className="custom-shape mx-4 w-[247px] cursor-pointer rounded-l-2xl bg-gradient-to-r from-[#E84526] to-[#EA7000] py-4 text-xl font-semibold">
            {productdatanew?.data?.[index]?.product || "Loading..."}
          </p>
        </td>

        {/* Ticket Number */}
     {/*    <td className="h-1 w-[278px] bg-gradient-to-r from-[#E84526] to-[#EA7000] text-center text-lg font-semibold">
          <p
            className={`p-rd mx-2 flex w-fit cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 px-2 py-1 text-center text-lg tracking-[0.5em] text-black ${
              showWinners ? "" : "animate-number"
            }`}
          >
            {showWinners
              ?  val.product || "No Ticket"
              : ""}
          </p>
        </td> */}
        <td className="h-1 w-[278px] bg-gradient-to-r from-[#E84526] to-[#EA7000] text-center text-lg font-semibold">
  <p
    className={`p-rd mx-2 my-4 flex w-fit cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 px-2 py-1 text-center text-lg tracking-[0.5em] text-black ${
      showWinners ? "" : "animate-number"
    }`}
  >
    {showWinners ? val.product || "No Ticket" : ""}
  </p>
</td>


        {/* Phone Number */}
        <td className="h-1 rounded-tr-[39px] bg-gradient-to-l from-[#E84526] to-[#EA7000] text-center">
         {/*  <p className="p-rd cursor-pointer px-2 py-1 text-lg font-semibold tracking-wider"> */}
          <p className="custom-shape mx-4 w-[247px] cursor-pointer rounded-l-2xl bg-gradient-to-r from-[#E84526] to-[#EA7000] py-4 text-xl font-semibold">
      {/*       {showWinners ? val.phone_number || "N/A" : ""} */}
          { showWinners ? productdatanew?.data?.[index]?.phone_number || "N/A" : ""}
          </p>
        </td>
      </tr>
    ))}
</>

      );
    } else {
      // Render actual winners
      return (
        <>
          {productdatanew?.data?.map((val: any, index: number) => (
            <tr className="h-2 text-white" key={index}>

              <td className="w-1 cursor-pointer rounded-br-[20px] rounded-tl-[30px] bg-gradient-to-r from-[#E84526] to-[#EA7000] text-center">
                <p className="text-lg font-semibold">{index + 1}</p>
              </td>
              <td className="w-1 text-center">
                <p className="custom-shape mx-4 w-[247px] cursor-pointer rounded-l-2xl bg-gradient-to-r from-[#E84526] to-[#EA7000] py-4 text-xl font-semibold">
                  {val.product}
                </p>
              </td>
              <td className="h-1 mb-12 w-[278px] bg-gradient-to-r from-[#E84526] to-[#EA7000] gap-12 text-center text-lg font-semibold">
                <p className="mx-2 flex w-fit cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 px-2 py-1 text-center text-lg tracking-[0.5em] text-black">
                  {val.ticket_number}
                </p>
              </td>
              <td className="h-1 rounded-tr-[39px] bg-gradient-to-l from-[#E84526] to-[#EA7000] text-center">
                <p className="cursor-pointer px-2 py-1 text-lg font-semibold tracking-wider">
                  {val.phone_number}
                </p>
              </td>
            </tr>
          ))}
        </>
      );
    }
  };

  return (
    <>
      <header className="fixed z-50 w-full">
        <Header />
      </header>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full bg-[#F6F6F6] lg:pt-[23vh] md:pt-[20vh] pt-[20vh]">
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
        <div className="my-8 flex flex-col items-center justify-center overflow-x-auto rounded-2xl p-4 bg-black">
          <table className="mb-6 table-auto min-w-full">
            <thead className="bg-white pt-5 text-[#F25E26]">
              <tr className="tracking-wide">
                {thead.map((index) => (
                  <th
                    className={`${
                      index === "SN"
                        ? "rounded-bl-3xl"
                        : index === "Ticket Price"
                        ? "rounded-br-3xl"
                        : index === `Winner's Number`
                        ? " text-left"
                        : "text-center"
                    } text-pretty p-3 text-2xl font-semibold capitalize tracking-wide lg:w-max`}
                    key={index}
                  >
                    {index}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </table>
        </div>
        <div className="flex flex-col justify-center mb-8">
          <DefaultButton
            handleClick={() => router.push("/auction")}
            text="Back to Auction"
            type="button"
            className="h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
