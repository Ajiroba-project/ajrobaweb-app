/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { raffleWinner } from "@/app/static-data";
import { DefaultButton } from "@/app/component/Button";
import { useRouter } from "next/navigation";
import { HeadingText } from "@/app/component/Heading";
import useAuthMiddleware from "@/hooks/useAuthRaffle";
import "./style.css";
import Cookies from "js-cookie";
import { Header } from "@/app/component/Header";
import { Footer } from "@/app/component/Footer";
import { useQueryData } from "@/hooks/useQueryData";
import { useGetDatanew } from "@/hooks/useGetData";

interface ProductData {
  id?: string;
  name?: string;
  price?: number;
  data?: any;
  starts_in?: any;
}

interface CardInfoItem {
  weight: string;
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  name?: string;
  image?: string;
  price?: string;
  images?: { id: string; product: string; image: string }[];
  discount?: string;
  reviews?: string;
  message?: string;
  category?: string;
  delivery_estimation: string;
  related_products: [];
  ticket_price?: string;
  auction_reviews?: any;
  starts_in?: any;
  category_name?: any;
  subcategory_name?: any;
}

interface AuctionResponse {
  message: any;
  data: CardInfoItem;
  category?: any;
  subcategory?: any;
}

const RaffleWinnersPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: product_id } = use(params);
  const userToken = (Cookies.get("token") as string) || "";

  const router = useRouter();
  useAuthMiddleware(router);

  const [productdatanew, setProductDataNew] = useState<ProductData | null>(
    null,
  );
  const [loadingdata, setLoadingData] = useState(false);
  const [showWinners, setShowWinners] = useState(false);
  const [postRollCountdown, setPostRollCountdown] = useState<number | null>(null);
  const [isThanksOpen, setIsThanksOpen] = useState(false);
  const [redirectCancelled, setRedirectCancelled] = useState(false);

  // Delay before showing the thanks modal so users can view winners, and countdown length
  const winnersViewDelayMs = 10000; // 10s after winners appear
  const countdownSeconds = 5; // 5s countdown once modal appears
  const reminderDelayMs = 30000; // Reopen modal 30s after user chooses to stay

  // Refs for timers so we can reliably clear/cancel them
  const showModalTimeoutRef = useRef<number | null>(null);
  const redirectTimeoutRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  const clearAllTimers = () => {
    if (showModalTimeoutRef.current) window.clearTimeout(showModalTimeoutRef.current);
    if (redirectTimeoutRef.current) window.clearTimeout(redirectTimeoutRef.current);
    if (countdownIntervalRef.current) window.clearInterval(countdownIntervalRef.current);
  };

  const openModalWithCountdown = () => {
    if (redirectCancelled) return;
    setIsThanksOpen(true);
    setPostRollCountdown(countdownSeconds);
    countdownIntervalRef.current = window.setInterval(() => {
      setPostRollCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    }, 1000);
    redirectTimeoutRef.current = window.setTimeout(() => {
      if (redirectCancelled) return;
      router.push(`/raffleended`);
    }, countdownSeconds * 1000);
  };

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auction/auction_tickets/?auction_id=${product_id}`;

  const {
    data: ticketInfo,
    isLoading: ticketLoading,
    error: ticketError,
  } = useGetDatanew(url, "ticket_details", userToken, {
    cacheTime: 0,
    staleTime: 0,
  });



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
      /*  console.log(result, "result"); */
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/auction/auction_tickets/?auction_id=${product_id}`,
      ).then((data) => {
        /*  setProductDataNew(data); */
        // console.log(data, "data");

      /*   console.log("data") */
      })

      /*   console.log(data, "data"); */
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [product_id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWinners(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  // After winners appear, wait a bit, then show a dismissible countdown modal
  useEffect(() => {
    if (!showWinners) return;
    if (redirectCancelled) return;

    showModalTimeoutRef.current = window.setTimeout(() => {
      if (redirectCancelled) return;
      openModalWithCountdown();
    }, winnersViewDelayMs);

    return () => {
      clearAllTimers();
    };
  }, [showWinners, router, product_id, redirectCancelled]);

  const handleStayHere = () => {
    setRedirectCancelled(true);
    setIsThanksOpen(false);
    setPostRollCountdown(null);
    clearAllTimers();

    // Reopen the modal after a short reminder delay
    showModalTimeoutRef.current = window.setTimeout(() => {
      // Allow redirect again on next showing
      setRedirectCancelled(false);
      openModalWithCountdown();
    }, reminderDelayMs);
  };

  const handleWatchRecap = () => {
    router.push(`/raffleended`);
  };

  const thead = ["S/N", "Product", `Ticket Number`, "Phone Number"];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Set the number of items per page

  // Determine which dataset to show: all tickets while rolling, only winners after
  const displayedData = useMemo(() => {
    const list = (productdatanew?.data as any[]) || [];
    if (!showWinners) return list;
    return list.filter((t: any) => t?.won === true || t?.won === "true");
  }, [productdatanew?.data, showWinners]);

  // Reset page when switching view
  useEffect(() => {
    setCurrentPage(1);
  }, [showWinners]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayedData?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil((displayedData?.length || 0) / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  function maskPhone(phone: string) {
    if (!phone) return "N/A";
  
    // Keep only digits
    const digits = phone.replace(/\D/g, '');
    const len = digits.length;
  
    if (len <= 4) {
      // Too short to mask meaningfully
      return digits;
    }
  
    const first = digits.slice(0, Math.min(5, len));
    const afterFirst = digits.slice(first.length);

    if (!afterFirst.length) {
      return first;
    }

    const maskedLength = Math.min(3, afterFirst.length);
    const masked = '*'.repeat(maskedLength);
    const remaining = afterFirst.slice(maskedLength);

    if (!remaining.length) {
      return first + masked;
    }

    if (remaining.length <= 3) {
      return first + masked + remaining;
    }

    const middle = remaining.slice(0, remaining.length - 3);
    const last = remaining.slice(-3);

    return first + masked + middle + last;
  }
  



//   const renderRows = () => {
//     if (!showWinners) {
//       return (
//         <>
//           {


//             <table className="w-full border-separate border-spacing-y-4">
//               <thead className="bg-white text-[#F25E26]">
//                 <tr className="tracking-wide">
//                   {thead.map((header) => (
//                     <th
//                       className={`${header === "S/N"
//                         ? "rounded-bl-3xl"
//                         : header === "Ticket Price"
//                           ? "rounded-br-3xl"
//                           : header === `Phone Number`
//                             ? "rounded-br-3xl  text-left"
//                             : "text-center"
//                         } p-3 text-2xl font-semibold capitalize lg:w-max`}
//                       key={header}
//                     >
//                       {header === "Ticket Number" ? (
//                         <div className="flex flex-col items-center">
//                            <span className="text-2xl text-[#F25E26] font-normal">(Winner)</span>
//                           <span>{header} </span>
                         
//                         </div>
//                       ) : (
//                         header
//                       )}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems?.map((val: any, index: number) => (
//                   <tr className="text-white h-1" key={index}>
//                     <td className="rounded-tl-[30px] rounded-br-[20px]  relative flex items-center justify-center h-16 w-10 bg-gradient-to-b from-[#E84526] to-[#EA7000]  text-white font-bold">
//                       <p className="text-lg font-semibold">
//                         {indexOfFirstItem + index + 1}
//                       </p>
//                     </td>

//                     <td className=" text-center h-[16px]">
//                       <p className="custom-shape pt-3 pb-8 mx-4 w-[247px] cursor-pointer rounded-l-2xl bg-gradient-to-r from-[#E84526] to-[#EA7000]  text-xl font-semibold">
//                         {val?.product || "Loading..."}
//                       </p>
//                     </td>
                  
//                     <td className="pl-6 p-0 h-[16px] w-[278px] bg-gradient-to-r from-[#E84526] to-[#EA7000] text-center text-lg font-semibold">
//                       <p className="p-rd mx-2 flex w-[200px] cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 px-2 text-center text-lg tracking-[0.5em] text-black">
//                         {/* Counter animation */}
//                       </p>
//                     </td>
//                       <td className="h-[16px] rounded-tr-[39px] bg-gradient-to-l from-[#E84526] to-[#EA7000] text-center">
//                         <p className="cursor-pointer px-2 py-1 text-lg font-semibold tracking-wider">
//                           {showWinners 
//                             ? val?.phone_number ? maskPhone(val.phone_number) : "N/A"
//                             : "*********"}
//                         </p>
//                       </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           }
//           <div className="flex justify-center mt-4">
//             <button
//               onClick={handlePrevPage}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 mx-2 rounded-lg ${currentPage === 1
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-[#F25E26] hover:bg-[#EA7000]"
//                 } text-white`}
//             >
//               Previous
//             </button>

//             <span className="mx-4 text-lg text-white">
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 mx-2 rounded-lg ${currentPage === totalPages
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-[#F25E26] hover:bg-[#EA7000]"
//                 } text-white`}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       );
//     } else {
//       return (
//         <>
//           {
//             <table className="w-full border-separate border-spacing-y-4">
//               <thead className="bg-white text-[#F25E26]">
//                 <tr className="tracking-wide">
//                   {thead.map((header) => (
//                     <th
//                       className={`${header === "S/N"
//                         ? "rounded-bl-3xl"
//                         : header === "Ticket Price"
//                           ? "rounded-br-3xl"
//                           : header === `Phone Number`
//                             ? "rounded-br-3xl  text-left"
//                             : "text-center"
//                         } p-3 text-2xl font-semibold capitalize lg:w-max`}
//                       key={header}
//                     >
//                      {header === "Ticket Number" ? (
//                         <div className="flex flex-col items-center">
//                            <span className="text-xs text-[#F25E26] font-normal">(Winner)</span>
//                           <span>{header} </span>
                         
//                         </div>
//                       ) : (
//                         header
//                       )}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems?.map((val: any, index: number) => (
//                   <tr className="text-white h-1" key={index}>
//                     <td className="rounded-tl-[30px] rounded-br-[20px]  relative flex items-center justify-center h-16 w-10 bg-gradient-to-b from-[#E84526] to-[#EA7000]  text-white font-bold">
//                       <p className="text-lg font-semibold">
//                         {indexOfFirstItem + index + 1}
//                       </p>
//                     </td>

//                     <td className=" text-center h-[16px]">
//                       <p className="custom-shape pt-3 pb-8 mx-4 w-[247px] cursor-pointer rounded-l-2xl bg-gradient-to-r from-[#E84526] to-[#EA7000]  text-xl font-semibold">
//                         {val.product}
//                       </p>
//                     </td>
//                     <td className="pl-6 p-0 h-[16px]  w-[278px] bg-gradient-to-r from-[#E84526] to-[#EA7000] text-center text-lg font-semibold ">
//                       <p className="  mx-2 flex w-fit cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 px-2  text-center text-lg tracking-[0.5em] text-black">
//                         {val.ticket_number}
//                       </p>
//                     </td>
//                     <td className="h-[16px] rounded-tr-[39px] bg-gradient-to-l from-[#E84526] to-[#EA7000] text-center">
//                       <p className="cursor-pointer px-2 py-1 text-lg font-semibold tracking-wider">

                     

// {
//   val?.phone_number ? maskPhone(val.phone_number) : "N/A"
// }

//                       </p>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           }

//           <div className="flex justify-center mt-4">
//             <button
//               onClick={handlePrevPage}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 mx-2 rounded-lg ${currentPage === 1
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-[#F25E26] hover:bg-[#EA7000]"
//                 } text-white`}
//             >
//               Previous
//             </button>

//             <span className="mx-4 text-lg text-white">
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 mx-2 rounded-lg ${currentPage === totalPages
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-[#F25E26] hover:bg-[#EA7000]"
//                 } text-white`}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       );
//     }
//   };


const renderRows = () => {
  if (!showWinners) {
    return (
      <>
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full border-separate border-spacing-y-4 min-w-[520px]">
            <thead className="bg-white text-[#F25E26]">
              <tr className="tracking-wide">
                {thead.map((header) => (
                  <th
                    className={`${header === "S/N"
                      ? "rounded-bl-3xl"
                      : header === "Ticket Price"
                        ? "rounded-br-3xl"
                        : header === `Phone Number`
                          ? "rounded-br-3xl text-left"
                          : "text-center"
                      } p-2 sm:p-3 text-sm sm:text-xl lg:text-2xl font-semibold capitalize whitespace-nowrap`}
                    key={header}
                  >
                    {header === "Ticket Number" ? (
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-xl lg:text-2xl text-[#F25E26] font-normal">(Winner)</span>
                        <span>{header}</span>
                      </div>
                    ) : (
                      header
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((val: any, index: number) => (
                <tr className="text-white h-1" key={index}>
                  <td className="rounded-tl-[20px] sm:rounded-tl-[30px] rounded-br-[14px] sm:rounded-br-[20px] relative flex items-center justify-center h-12 sm:h-16 w-8 sm:w-10 bg-gradient-to-b from-[#E84526] to-[#EA7000] text-white font-bold">
                    <p className="text-sm sm:text-lg font-semibold">
                      {indexOfFirstItem + index + 1}
                    </p>
                  </td>
                  <td className="text-center h-[16px]">
                    <p className="custom-shape pt-2 sm:pt-3 pb-6 sm:pb-8 mx-1 sm:mx-2 lg:mx-4 w-[120px] sm:w-[180px] lg:w-[247px] cursor-pointer rounded-l-2xl bg-gradient-to-r from-[#E84526] to-[#EA7000] text-sm sm:text-lg lg:text-xl font-semibold truncate">
                      {val?.product || "Loading..."}
                    </p>
                  </td>
                  <td className="pl-2 sm:pl-4 lg:pl-6 p-0 h-[16px] w-[130px] sm:w-[200px] lg:w-[278px] bg-gradient-to-r from-[#E84526] to-[#EA7000] text-center text-sm sm:text-lg font-semibold">
                    <p className="p-rd mx-1 sm:mx-2 flex w-[100px] sm:w-[150px] lg:w-[200px] cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 px-1 sm:px-2 text-center text-xs sm:text-base lg:text-lg tracking-[0.3em] sm:tracking-[0.5em] text-black">
                      {/* Counter animation */}
                    </p>
                  </td>
                  <td className="h-[16px] rounded-tr-[28px] sm:rounded-tr-[39px] bg-gradient-to-l from-[#E84526] to-[#EA7000] text-center">
                    <p className="cursor-pointer px-1 sm:px-2 py-1 text-xs sm:text-base lg:text-lg font-semibold tracking-wider whitespace-nowrap">
                      {showWinners 
                        ? val?.phone_number ? maskPhone(val.phone_number) : "N/A"
                        : "*********"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-3">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`w-full sm:w-auto px-6 py-2 rounded-lg ${currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#F25E26] hover:bg-[#EA7000]"
              } text-white font-semibold transition-colors`}
          >
            Previous
          </button>

          <span className="text-base sm:text-lg text-white font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`w-full sm:w-auto px-6 py-2 rounded-lg ${currentPage === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#F25E26] hover:bg-[#EA7000]"
              } text-white font-semibold transition-colors`}
          >
            Next
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full border-separate border-spacing-y-4 min-w-[520px]">
            <thead className="bg-white text-[#F25E26]">
              <tr className="tracking-wide">
                {thead.map((header) => (
                  <th
                    className={`${header === "S/N"
                      ? "rounded-bl-3xl"
                      : header === "Ticket Price"
                        ? "rounded-br-3xl"
                        : header === `Phone Number`
                          ? "rounded-br-3xl text-left"
                          : "text-center"
                      } p-2 sm:p-3 text-sm sm:text-xl lg:text-2xl font-semibold capitalize whitespace-nowrap`}
                    key={header}
                  >
                    {header === "Ticket Number" ? (
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] sm:text-xs text-[#F25E26] font-normal">(Winner)</span>
                        <span>{header}</span>
                      </div>
                    ) : (
                      header
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((val: any, index: number) => (
                <tr className="text-white h-1" key={index}>
                  <td className="rounded-tl-[20px] sm:rounded-tl-[30px] rounded-br-[14px] sm:rounded-br-[20px] relative flex items-center justify-center h-12 sm:h-16 w-8 sm:w-10 bg-gradient-to-b from-[#E84526] to-[#EA7000] text-white font-bold">
                    <p className="text-sm sm:text-lg font-semibold">
                      {indexOfFirstItem + index + 1}
                    </p>
                  </td>
                  <td className="text-center h-[16px]">
                    <p className="custom-shape pt-2 sm:pt-3 pb-6 sm:pb-8 mx-1 sm:mx-2 lg:mx-4 w-[120px] sm:w-[180px] lg:w-[247px] cursor-pointer rounded-l-2xl bg-gradient-to-r from-[#E84526] to-[#EA7000] text-sm sm:text-lg lg:text-xl font-semibold truncate">
                      {val.product}
                    </p>
                  </td>
                  <td className="pl-2 sm:pl-4 lg:pl-6 p-0 h-[16px] w-[130px] sm:w-[200px] lg:w-[278px] bg-gradient-to-r from-[#E84526] to-[#EA7000] text-center text-sm sm:text-lg font-semibold">
                    <p className="mx-1 sm:mx-2 flex w-fit cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 px-1 sm:px-2 text-center text-xs sm:text-base lg:text-lg tracking-[0.3em] sm:tracking-[0.5em] text-black">
                      {val.ticket_number}
                    </p>
                  </td>
                  <td className="h-[16px] rounded-tr-[28px] sm:rounded-tr-[39px] bg-gradient-to-l from-[#E84526] to-[#EA7000] text-center">
                    <p className="cursor-pointer px-1 sm:px-2 py-1 text-xs sm:text-base lg:text-lg font-semibold tracking-wider whitespace-nowrap">
                      {val?.phone_number ? maskPhone(val.phone_number) : "N/A"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-3">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`w-full sm:w-auto px-6 py-2 rounded-lg ${currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#F25E26] hover:bg-[#EA7000]"
              } text-white font-semibold transition-colors`}
          >
            Previous
          </button>

          <span className="text-base sm:text-lg text-white font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`w-full sm:w-auto px-6 py-2 rounded-lg ${currentPage === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#F25E26] hover:bg-[#EA7000]"
              } text-white font-semibold transition-colors`}
          >
            Next
          </button>
        </div>
      </>
    );
  }
};


  if (ticketError) {
    return <><p className="flex justify-center items-center text-center text-red-500 font-bold py-40">{'Auction bid tickets not ready.'}</p></>
  }

  return (
    <>
      <header className="fixed z-50 w-full">
        <Header />
      </header>
      <div className="flex flex-col justify-center items-center content-container">
        <div className="w-full bg-[#F6F6F6] lg:pt-[23vh] md:pt-[20vh] pt-[20vh]">
          <div className="container flex flex-col">
            <p
              onClick={() => router.back()}
              className="cursor-pointer text-[#F25E26] underline"
            >
              Back
            </p>
            <div className="mb-3 text-center p-4">
              <HeadingText title="Raffle Draw Winners" />
            </div>
          </div>
        </div>

        
          <div className="w-full sm:w-8/12 md:w-6/12 lg:w-4/12 mx-auto flex justify-center items-center gap-2 mt-4">
            <div className="border border-orange-300 px-4 py-2 rounded">
              <p className="text-black font-bold text-center whitespace-nowrap text-sm sm:text-base">Total Winners</p>
            </div>
            <div className="border border-orange-300 px-4 py-2 rounded">
              <p className="text-black font-bold text-center">{ showWinners ? displayedData?.length : 0}</p>
            </div>
          </div>


        {loadingdata ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F25E26]"></div>
            <p className="mt-4 text-gray-600">Loading raffle winners...</p>
          </div>
        ) : (
          <>
            <div className="my-8 rounded-2xl 2xl:w-auto xl:w-auto lg:w-auto md:w-auto w-full overflow-y-scroll p-4 bg-black">
              {renderRows()}
            </div>

            <div className="flex flex-col justify-center mb-8">
              <DefaultButton
                handleClick={() => router.push("/raffledraw")}
                text="Back to Auction"
                type="button"
                className="h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all"
              />
            </div>

            {postRollCountdown !== null && isThanksOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="relative flex flex-col items-center justify-center w-80 h-96 rounded-xl bg-gradient-to-b from-[#FDECE9] to-white shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.1)] border-[4px] border-[#EA7000]">
                  <div className="absolute -top-8 flex items-center justify-center w-16 h-16 rounded-full bg-[#FDECE9] border-[4px] border-white shadow-md">
                    <span role="img" aria-label="emoji" className="text-3xl">👍</span>
                  </div>
                  <h3 className="mt-12 text-lg font-semibold text-gray-800">Thanks for Joining</h3>
                  <p className="mt-1 text-sm text-gray-500">Redirecting to recap in</p>
                  <div className="text-7xl font-bold text-[#1B1B1A] mt-4">{postRollCountdown}</div>
                  <div className="mt-6 flex gap-3">
                    <button onClick={handleStayHere} className="rounded-lg border border-[#EA7000] text-[#EA7000] px-3 py-2 text-sm hover:bg-[#FDECE9]">Stay here</button>
                    <button onClick={handleWatchRecap} className="rounded-lg bg-[#EA7000] text-white px-3 py-2 text-sm hover:bg-[#F25E26]">Watch recap</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
     
       <div className='content-container'>
        <Footer />
       </div>
    </>
  );
};

const Page = dynamic(() => Promise.resolve(RaffleWinnersPage), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F25E26]"></div>
    </div>
  ),
});

export default Page;
