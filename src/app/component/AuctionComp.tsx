"use clients";

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import { motion } from "framer-motion"
import './style.css'
import ModalComponent from "./ModalComponent";
import { useMutateData } from "@/hooks/useMutateDataBid";
import Cookies from "js-cookie";
import { Axios } from "axios";
import axios from "axios";
import { toast } from "react-toastify";
import rice from '../asset/image/rice2.jpeg'

interface cardDetails {
  cardInfo: Array<{
    name: string;
    image: Array<{ image?: string }>;
    ticket_price: any;
    reviews: number;
    starts_in: string | undefined;
    images: any;
    id: string;
  }>;
  currentPage: number;
  cardsNum: number;
}


// Utility function to parse time remaining from a string
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

// Countdown Timer component
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
      setTimeLeft((prev) => Math.max(prev - 1, 0)); // Decrease time left, but don't go below 0
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutesLeft = timeLeft % 60;
  const hoursLeft = Math.floor(timeLeft / 60) % 24;
  const daysLeft = Math.floor(timeLeft / 1440);

  // Progress should be 0% when timeLeft is 0 or when the total time is 0
  const progress = initialTotalMinutes > 0 ? (timeLeft / initialTotalMinutes) * 100 : 0;

  return (
    <div className="mb-3">
      <p className="text-xs capitalize mb-2 ">
         <span className="font-medium">{daysLeft}</span> dy:{" "}
        <span className="font-medium">{hoursLeft}</span> Hr:{" "}
        <span className="font-medium">{minutesLeft}</span> Min{" "}
        <span className="font-medium">Left</span>
      </p>
      <div className="border-[#B7B7B7] h-2.5 w-full rounded-full border ">
        <div
          className="h-2 rounded-full bg-[#F25E26]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};


// Auction Component
export const AuctionComp = ({ cardInfo }: any) => {
  const router = useRouter();

    const userToken =  Cookies.get('token') as string;

  const [bidopen, setbidopen] = useState(false)

  const [bidData, setBidData] = useState(null);



// Handle API success
  const handleSuccess = (data?: any) => {
    if (data.status === 200 || data.status === 201) {
      setBidData(data?.data); // Store the API response in bidData for modal usage
      setbidopen(true); // Open modal after successful API response
    } else {
      // Handle other statuses if needed
      setbidopen(false);
    }
  };

  // Handle API error
  const handleError = (error?: any) => {
    console.log(error, "Error occurred during bid");
    setbidopen(false);
  };

  // Initialize the mutation hook
  const { mutate } = useMutateData("bidinfo", handleSuccess, handleError);


  // Function to handle bid button click
//   const handleBidClick = async (productId: any) => {


// try {
//    /*  const response = await axios.get('https://ajiroba.onrender.com/v1/auction/bid_info/', {
//         headers: {
//             Authorization: `token ${userToken}`,
//         },
//         params: JSON.stringify({
//             auction_id: productId
//         })
//     }); */


//     const axios = require('axios');
// let data = JSON.stringify({
//   "auction_id": productId
// });

// let config = {
//   method: 'get',
//   maxBodyLength: Infinity,
//   url: 'https://ajiroba.onrender.com/v1/auction/bid_info/',
//   headers: {
//     'Authorization': `token ${userToken}`,
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

// axios.request(config)
// .then((response: { data: any; }) => {
//   console.log(JSON.stringify(response.data));

//       // Handle success
//     if (response.status === 200 || response.status === 201) {
//         console.log('Data retrieved successfully:', response.data);
//             setBidData(response?.data);

//     } else {
//         console.error('Unexpected response status:', response.status);
//     }
// })
// .catch((error) => {
//   console.log(error);

//    if (axios.isAxiosError(error)) {
//           setbidopen(false);
//         const errorMessage = error.response?.data?.message || "Error!.";
//     toast.error(`${errorMessage}`, {
//         position: 'top-right',
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'light'
//       })

//     } else {
//         // Handle other types of errors that may not be Axios-specific
//         console.error('An unexpected error occurred:', error);
//     }
// });



// }




//   };



const handleBidClick = async (productId: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "token f6264d7fad27137261803f6b4ab85df2701d1e5ea3049d433409958f6da044f2");
  myHeaders.append("Content-Type", "application/json");

  // Construct the URL with query parameters
  const url = new URL("https://ajiroba.onrender.com/v1/auction/bid_info/");
  url.searchParams.append("auction_id", productId); // Add auction_id as a URL parameter

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch(url, requestOptions);

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); // Parse the JSON response
    console.log(result); // Handle the result as needed

    // You can set the bid data or handle success here
    setBidData(result); // Assuming setBidData is a function to store the result
  } catch (error) {
    console.error("Error fetching bid info:", error);
    // Handle error (e.g., show a toast notification)
    setbidopen(true)
    toast.error("Failed to retrieve bid info. Please try again later.", {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    });
  }
};



  return (
    <>
      {cardInfo && (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cardInfo?.map((value: { id: any; images: { image: any; }[]; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; ticket_price: { toLocaleString: () => string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; reviews: any; starts_in: string | undefined; }, index: Key | null | undefined) => (
              <motion.div
                key={index}
               /*  className="rounded-lg bg-[#FFFFFF] border border-[#F6F6F6] cursor-pointer" */
                className="rounded-lg bg-[#fdfdfd] border border-[#F6F6F6] cursor-pointer"

                whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="border-b-4 pb-4">
                  <div className="flex justify-between items-center py-2 p-4">
                    <div>
                      <p className="text-[#A09F9F] text-sm font-medium font-Poppins">
                        On Auction
                      </p>
                    </div>
                    <div>
                      <button onClick={() => handleBidClick(value.id)} className="cursor-pointer rounded-md bg-[#FCFCFC] px-2 py-1 text-sm font-Poppins font-medium shadow-md transition duration-200 ease-in-out hover:bg-[#E84526] hover:text-white">
                        Bid
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center items-center m-3" onClick={() => router.push(`/auction/productdetails/${value.id}`)}>
                    <div className="bg-transparent p-0">
                      <Image
                        src={`https://ajiroba.onrender.com/media/${value?.images[0]?.image}`}
                        width={100}
                        height={100}
                        alt="human hair"
                        className=""
                      />
                    </div>
                  </div>
                </div>

              <div>

                  <div className="bg-[#F6F6F6] px-4 py-4 ">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-Poppins text-[#000000] text-pretty text-sm font-normal">
                        {value?.name}
                      </p>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                      <div>
                        <p className="text-xs font-normal font-Poppins text-[#000000]">
                          Ticket Price:
                        </p>
                      </div>
                      <div>
                        <p className="text-pretty text-base font-Poppins font-medium text-[#F25E26]">
                          &#8358;{value?.ticket_price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

               {/*  <div className="bg-[#F6F6F6] px-4"> */}
                    <div className="bg-[#f6f6f6] px-4">
                  <p className="flex justify-end text-left gap-1">
                    {Array.from({ length: value?.reviews }, (_, index) => (
                      <span key={index}>
                        <FaStar className="text-[#F25E26]" />
                      </span>
                    ))}
                  </p>
                </div>

           {/*      <div className="bg-[#F6F6F6] px-4 "> */}
                 <div className="bg-[#f6f6f6] px-4 ">
                  <CountdownTimer startsIn={value?.starts_in} />
                </div>
              </div>
              </motion.div>
            ))}
          </div>

      {/*   <ModalComponent
            content={
              <div className="flex flex-col justify-center">
                <div className="flex justify-center items-center flex-col">
                  <p className="text-[#2A2A2A] font-bold text-xl font-Poppins">Wallet Pin</p>
                  <small className="text-[#504D4D] text-lg font-Poppins">Kindly enter your wallet pin</small>
                  {bidData ? (
                    <div className="mt-4">
                      <p className="text-gray-700">Bid Amount: {bidData}</p>
                      <p className="text-gray-700">Message: {bidData}</p>
                    </div>
                  ) : (
                    <p>Loading bid information...</p>
                  )}
                </div>
              </div>
            }
            isModalOpen={bidopen}
            showModal={() => setbidopen(!bidopen)}
            handleOk={() => setbidopen(false)}
            handleCancel={() => setbidopen(false)}
          /> */}

<ModalComponent
  content={
 <div className="flex flex-col  px-6 py-4">
  <div className="self-start text-red-500 font-Poppins cursor-pointer mb-4">
    Back
  </div>

<div className="flex justify-between flex-wrap py-2" >

  <div>
   <div className="flex  space-x-2 text-gray-700 text-sm mb-4">
    <span className="font-Poppins">Foodstuffs</span>
    <span>|</span>
    <span className="font-Poppins font-medium">Rice</span>
  </div>
 </div>

 <div>
   <span className="font-Poppins font-medium">Raffle Draw</span>
 </div>
</div>

  <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-4">
    <div className="w-full lg:w-1/2 flex justify-center mb-4 lg:mb-0">
      <div className="relative w-48 h-60 bg-gray-200 rounded-md flex justify-center items-center">
        <Image
          src={rice}
          width={100}
          height={100}
          alt="human hair"
          className=""
        />
        <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <div className="bg-orange-500 p-3 rounded-lg text-center">
            <span className="text-sm block">Raffle Ticket</span>
            <span className="text-xl font-bold">₦ 200</span>
          </div>
        </div>
      </div>
    </div>

    <div className="w-full lg:w-1/2 flex flex-col space-y-4">
      <div>
        <label className="font-Poppins text-gray-700">Product</label>
        <input
          type="text"
          value="Rice"
          readOnly
          className="w-full border border-gray-300 p-2 rounded mt-1 font-Poppins"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-col items-center w-full sm:w-1/2">
          <label className="font-Poppins text-gray-700">Ticket Price </label>
          <div className="flex items-center">
            <button className="px-2 py-1 bg-gray-200 rounded">-</button>
            <span className="mx-4 font-bold text-lg">200</span>
            <button className="px-2 py-1 bg-gray-200 rounded">+</button>
          </div>
        </div>


        <div className="flex flex-col items-center w-full sm:w-1/2">
          <label className="font-Poppins text-gray-700">No of Ticket</label>
          <div className="flex items-center">
            <button className="px-2 py-1 bg-gray-200 rounded">-</button>
            <span className="mx-4 font-bold text-lg">5</span>
            <button className="px-2 py-1 bg-orange-500 text-white rounded">
              +
            </button>
          </div>
          <a href="#" className="text-orange-500 font-Poppins text-xs mt-1">
            View Ticket
          </a>
        </div>


      </div>

      <div>
        <label className="font-Poppins text-gray-700">Amount (₦)</label>
        <input
          type="text"
          value="1,000"
          readOnly
          className="w-full border border-gray-300 p-2 rounded mt-1 font-Poppins text-center font-bold"
        />
      </div>

      <button className="w-full py-3 bg-orange-200 text-gray-800 font-Poppins rounded">
        Proceed
      </button>
    </div>
  </div>
</div>

  }
  isModalOpen={bidopen}
  showModal={() => setbidopen(!bidopen)}
  handleOk={() => setbidopen(false)}
  handleCancel={() => setbidopen(false)}
/>

        </section>
      )}
    </>
  );
};

// export const AuctionComp = ({ cardInfo }: cardDetails) => {

//   function parseStartsIn(startsIn = "0 Days, 0 Hr: 3 Mins Left") {
//     const daysMatch = startsIn.match(/(\d+)\s*Days/);
//     const hoursMatch = startsIn.match(/(\d+)\s*Hr/);
//     const minutesMatch = startsIn.match(/(\d+)\s*Mins/);

//     const daysLeft = daysMatch ? parseInt(daysMatch[1], 10) : 0;
//     const hoursLeft = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
//     const minutesLeft = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

//     return {
//       totalMinutes: daysLeft * 24 * 60 + hoursLeft * 60 + minutesLeft,
//       daysLeft,
//       hoursLeft,
//       minutesLeft,
//     };
//   }

//   const CountdownTimer = ({ startsIn = "0 Days, 0 Hr: 3 Mins Left" }) => {
//     const {
//       totalMinutes: initialTotalMinutes,
//       daysLeft: initialDaysLeft,
//       hoursLeft: initialHoursLeft,
//       minutesLeft: initialMinutesLeft,
//     } = parseStartsIn(startsIn);

//     const [timeLeft, setTimeLeft] = useState(initialTotalMinutes);

//     useEffect(() => {
//       const timer = setInterval(() => {
//         setTimeLeft((prev) => Math.max(prev - 1, 0));
//       }, 1000);

//       return () => clearInterval(timer);
//     }, []);

//     const minutesLeft = timeLeft % 60;
//     const hoursLeft = Math.floor(timeLeft / 60) % 24;
//     const daysLeft = Math.floor(timeLeft / 1440);

//     const progress = (timeLeft / initialTotalMinutes) * 100;

//     console.log(progress, 'progresss')

//     return (
//       <div className="mb-3">
//         <p className="text-xs capitalize ">
//           <span className="font-medium">{hoursLeft}</span> Hr:{" "}
//           <span className="font-medium">{minutesLeft}</span> Min{" "}
//           <span className="font-medium">Left</span>
//         </p>
//         <div className="border-gray h-2.5 w-full rounded-full border ">
//           <div
//             className="h-2 rounded-full bg-[#F25E26]"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//       </div>
//     );
//   };

//   const router = useRouter();

//   return (
//     <>

//     {
//       cardInfo &&  <section className="">

//  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {cardInfo?.map((value, index) => (

//        <motion.div
//           key={index}
//           className="rounded-lg bg-[#FFFFFF]  border border-[#F6F6F6] cursor-pointer"
//           onClick={() => router.push(`/categories/productdetails/${value.id}`)}
//           whileHover={{ scale: 1.05, boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)' }}
//           whileTap={{ scale: 0.95 }}
//           initial={{ scale: 1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.3, ease: 'easeOut' }}
//         >
//           <div className="border-b-4 pb-4">
//             <div className="flex justify-between items-center py-2 p-4">
//               <div>
//                 <p className="text-[#A09F9F] text-sm font-medium font-Poppins">
//                   On Auction
//                 </p>
//               </div>
//               <div>
//                 <button className="cursor-pointer rounded-md bg-[#FCFCFC] px-2 py-1 text-sm font-Poppins font-medium shadow-md transition duration-200 ease-in-out hover:bg-[#E84526] hover:text-white">
//                   Bid
//                 </button>
//               </div>
//             </div>

//             <div className="flex justify-center items-center m-3">
//               <div className="bg-transparent p-0">
//                 <Image
//                   src={`https://ajiroba.onrender.com/media/${value?.images[0]?.image}`}
//                   width={100}
//                   height={100}
//                   alt="human hair"
//                   className=""
//                 />
//               </div>
//             </div>
//           </div>

//           <div className=" bg-[#F6F6F6]  p-4">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="font-Poppins text-[#000000] text-pretty text-sm font-normal">
//                   {value?.name}
//                 </p>
//               </div>

//               <div className="flex justify-center items-center gap-2">
//                 <div>
//                   <p className="text-xs font-normal font-Poppins text-[#000000]">
//                     Ticket Price:
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-pretty text-base font-Poppins font-medium text-[#F25E26]">
//                     &#8358;{value?.ticket_price.toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//              <div className=" bg-[#F6F6F6] px-4">
//             <p className="flex justify-end text-left gap-1">
//               {Array.from({ length: value?.reviews }, (_, index) => (
//                 <span key={index}>
//                   <FaStar className="text-[#F25E26]" />
//                 </span>
//               ))}
//             </p>
//           </div>

//      <div className=" bg-[#F6F6F6] px-4">
//             <CountdownTimer startsIn={value?.starts_in} />
//           </div>
//         </motion.div>
//       ))}
//     </div>




//       </section>
//     }

//     </>
//   );
// };
