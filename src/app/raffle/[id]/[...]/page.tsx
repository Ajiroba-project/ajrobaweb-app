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

    const product_id = params?.id

        const userToken = (Cookies.get("token") as string) || "";

  console.log(product_id, "product_id")



    const [productdatanew, setProductDataNew] = useState<ProductData | null>(
    null,
  );
  const [loadingdata, setLoadingData] = useState(false);

const fetchWithAuth = async (url: string, auctionId: string) => {
  setLoadingData(true); // Indicate loading start

  const requestOptions: RequestInit = {
    method: "GET", // Changed to POST
    headers: {
      "Content-Type": "application/json", // Specify JSON content type
      Authorization: `token ${userToken}`, // Simplified header creation
    },
    body: JSON.stringify({ auction_id: auctionId }), // Send auction ID in the body
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); // Parse JSON response

    console.log(result, "result----tickets");

    setProductDataNew(result?.data); // Update state with result
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
    const auctionId = product_id; // Replace with your actual auction ID
    const data = await fetchWithAuth(
      "https://ajiroba.onrender.com/v1/auction/auction_tickets/",
      auctionId, // Pass auction ID to the function
    );
    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};


  useEffect(() => {
    fetchData();
  }, [product_id]); // Refetch whenever product_id changes


  const router = useRouter()
  // useAuthMiddleware(router)
  const thead = ['SN', 'Product', `Winner's Number`, 'Ticket Price']
  return (
    <>
     <header className='fixed z-50 w-full'>
        <Header />
      </header>


    <div className='flex flex-col justify-center items-center'>
      <div className='w-full bg-[#F6F6F6] lg:pt-[23vh] md:pt-[20vh] pt-[20vh]'>
        <div className='container flex flex-col'>
          <p
            onClick={() => router.back()}
            className='cursor-pointer text-[#F25E26] underline'
          >
            Back
          </p>
          <div className='mb-3 text-center'>
            <HeadingText title='Live Raffle Draw' />
          </div>
        </div>
      </div>
      <div className=' my-8 flex flex-col items-center justify-center overflow-x-auto rounded-2xl p-4 bg-black '>
        <table className='mb-6 table-auto min-w-full'>
          <thead className=' bg-white pt-5 text-[#F25E26] '>
            <tr className='tracking-wide'>
              {thead.map(index => (
                <th
                  className={` ${index === 'SN' ? 'rounded-bl-3xl' : index === 'Ticket Price' ? 'rounded-br-3xl' : index === `Winner's Number` ? ' text-left' : 'text-center'} text-pretty p-3  text-2xl  font-semibold capitalize tracking-wide lg:w-max`}
                  key={index}
                >
                  {index}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=''>
            <tr className='h-2'></tr>
            {/* spacer */}
            {raffleWinner.map((val, index) => (
              <>
                <tr className='h-2 text-white' key={index}>
                  <td className='w-1 cursor-pointer rounded-br-[20px] rounded-tl-[30px] bg-gradient-to-r from-[#E84526] to-[#EA7000] text-center'>
                    <p className=' text-lg font-semibold'>{val.sn}</p>
                  </td>
                  <td className='w-1 text-center'>
                    <p className='custom-shape mx-4 w-[247px] cursor-pointer rounded-l-2xl bg-gradient-to-r from-[#E84526] to-[#EA7000]  py-4 text-xl font-semibold p-rd '>

                    {/*    {val.product} */}

                    </p>
                  </td>

                  <td className='h-1 w-[278px] bg-gradient-to-r from-[#E84526]   to-[#EA7000]   text-center text-lg font-semibold'>
                    <p className=' p-rd mx-2 flex w-fit cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 px-2 py-1 text-center text-lg tracking-[0.5em] text-black'>
                  {/*     08032****111 */}
                    </p>
                  </td>
                  <td className='h-1 rounded-tr-[39px]  bg-gradient-to-l from-[#E84526] to-[#EA7000] text-center'>
                    <p className=' p-rd cursor-pointer px-2 py-1 text-lg font-semibold tracking-wider'>
                      {' '}
                     {/*  ₦{val.ticket} */}
                    </p>
                  </td>
                  {/* spacer */}
                </tr>
                <tr className='h-4 space-y-4'></tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col justify-center mb-8">
        <DefaultButton

        handleClick={()=>router.push('/')}
        text='Back to Auction'
        type='button'
        className='h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all '
      />

      </div>
    </div>
          <Footer />
        </>
  )
}
export default Page