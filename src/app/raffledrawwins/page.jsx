"use client";
import React, { Suspense, useRef } from "react";
import { Header } from "../component/Header";
import { Profile } from "../../app/profile/components/Profile";
import { useAuthStore, userProfile } from "@/store/store";
import { useRouter } from "next/navigation";
import { useAuthOrders } from "@/hooks/useAuthOrders";
import { Footer } from "../component/Footer";
import { Title } from "../component/Title";
import purchasecheck from "@/app/asset/purchasecheck.svg";
import Image from "next/image";
import { MdOutlineFileDownload } from "react-icons/md";
import ricesample from "@/app/asset/image/rice_sample.jpg";
import payment_method from "@/app/asset/image/payment_method.svg";
import { useGetOrderData, useGetOrderWinsData, useGetProductData } from "@/hooks/useGetData";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import GoogleTicket from "../component/Googleticket";
import raffledraw from "@/app/asset/image/ticketdraw.png";
import RaffleTicket from "../component/RaffleTicket";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "./style.css";
import { formatCurrency } from "@/utils/formatCurrency";

const WrappedPage = () => {
  const router = useRouter();
  const contentRef = useRef(null);

  useAuthOrders(router);
  const searchParams = useSearchParams();
  const order_id = searchParams.get("orderId");
  const profile = userProfile((state) => state.profile);
  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));
  
  const userToken = token;

  const handleDownload = async () => {
    if (!contentRef.current) return;

    try {
      const node = contentRef.current;

      // Create a temporary container with fixed positioning
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.top = '-9999px';
      tempContainer.style.left = '0';
      tempContainer.style.width = node.offsetWidth + 'px';
      tempContainer.style.backgroundColor = '#ffffff';
      tempContainer.style.fontFamily = window.getComputedStyle(node).fontFamily;
      
      // Clone the content
      const clonedContent = node.cloneNode(true);
      
      // Fix skewed elements for PDF generation
      const skewedElements = clonedContent.querySelectorAll('[style*="skewY"]');
      skewedElements.forEach(element => {
        const currentStyle = element.getAttribute('style');
        
        // Extract positioning values
        const leftMatch = currentStyle.match(/left:\s*([^;]+)/);
        const bottomMatch = currentStyle.match(/bottom:\s*([^;]+)/);
        const widthMatch = currentStyle.match(/width:\s*([^;]+)/);
        const heightMatch = currentStyle.match(/height:\s*([^;]+)/);
        
        let leftValue = leftMatch ? leftMatch[1].trim() : '0';
        let bottomValue = bottomMatch ? bottomMatch[1].trim() : '0';
        let widthValue = widthMatch ? widthMatch[1].trim() : '200px';
        let heightValue = heightMatch ? heightMatch[1].trim() : '3px';
        
        // Adjust positioning for PDF to compensate for transform issues
        let adjustedBottomValue = bottomValue;
        if (bottomValue.includes('px')) {
          const pxValue = parseFloat(bottomValue);
          // Different adjustments based on original position
          if (pxValue === -16) {
            adjustedBottomValue = (pxValue + -40) + 'px'; // -16 - 12 = -28px
          } else if (pxValue === -8) {
            adjustedBottomValue = (pxValue + -24) + 'px'; // -8 - 4 = -12px
          } else {
            adjustedBottomValue = (pxValue + -32) + 'px'; // Default adjustment
          }
        }
        
        // Create replacement element with adjusted positioning
        const replacement = document.createElement('div');
        replacement.style.position = 'absolute';
        replacement.style.left = leftValue;
        replacement.style.bottom = adjustedBottomValue;
        replacement.style.width = widthValue;
        replacement.style.height = heightValue;
        replacement.style.backgroundColor = '#000000';
        replacement.style.zIndex = '0';
        replacement.style.transform = 'skewY(-8deg)';
        replacement.style.transformOrigin = 'left bottom';
        
        // Replace the problematic element
        element.parentNode.replaceChild(replacement, element);
      });
      
      tempContainer.appendChild(clonedContent);
      document.body.appendChild(tempContainer);

      // Wait for fonts and images to load
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Ensure all images are loaded
      const images = tempContainer.querySelectorAll('img');
      await Promise.all(Array.from(images).map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
          setTimeout(resolve, 2000);
        });
      }));

      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: tempContainer.offsetWidth,
        height: tempContainer.offsetHeight,
        foreignObjectRendering: false,
      });

      // Clean up temp container
      document.body.removeChild(tempContainer);

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      if (imgHeight > 297) { // A4 height in mm
        const pageCount = Math.ceil(imgHeight / 297);
        for (let i = 1; i < pageCount; i++) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, -(297 * i), imgWidth, imgHeight);
        }
      }

      pdf.save(`auction-win-${filteredItems[0]?.ticket_number}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };



  const userToken_ = Cookies.get("token")

  const {
    data: auctioninfo,
    isLoading: auctionLoading,
    error: ordererror,
  } = useGetOrderWinsData(
    "/api/auctionwins",
    "get_auctionwins_details",
    userToken_,
  );

  const filteredItems = auctioninfo?.data?.data?.all?.filter(item => item.id === order_id);

  // console.log(filteredItems, "filteredItems")
  // console.log(filteredItems[0]?.start_date, "filteredItems")

  /*  console.log(productinfo?.data?.data, "productinfo") */

  // console.log(producterror, "producterror")

  //   console.log(auctioninfo?.data?.data?.all, 'auctioninfo')

  // Display loading spinner or text while fetching data
  if (auctionLoading) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </section>
    );
  }

  // Display error message if data fetch fails
  if (ordererror) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-lg font-semibold">{ordererror?.response?.data?.error} </p>
      </section>
    );
  }

  // Display "No Data Available" if productinfo is empty
  if (!auctioninfo || !auctioninfo.data || !auctioninfo?.data?.data?.all?.length) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <p className="text-gray-700 text-lg font-semibold">No Data Available</p>
      </section>
    );
  }

  return (
    <section className="bg-[#F6F6F6] min-h-screen">
      <header className="z-50">
        <Header />
      </header>

      <section className="bg-[#F6F6F6] container">
        <div className="">
          <div onClick={() => router.back()}>
            <div className="cursor-pointer container flex justify-start mt-8">
              <p className="text-[#E84526] text-base">Back</p>
            </div>
          </div>
        </div>
      </section>

      <main className="container bg-white py-8" ref={contentRef}>
        <div className="container">
          <div className="py-4 mb-8">
            <p className="text-center  2xl:text-[20px] lg:text-[20px] md:text-[20px] xl:text-[20px]  font-Poppins text-sm text-[#504D4D] font-extrabold">{'Purchase Order Details'}</p>
          </div>
        </div>
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
            <div className="flex items-center gap-4">
              <div className="w-[40px] h-[40px] rounded-full bg-[#F25E26] flex items-center justify-center">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3334 4L6.00008 11.3333L2.66675 8"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="font-Poppins text-base text-[#2A2A2A] font-medium">
                  Your Purchase Order is successful! 
                </p>
              </div>
            </div>

           

            <div className="group flex items-center gap-2 border border-[#F25E26] p-2 hover:bg-[#F25E26] hover:text-white cursor-pointer">
              <div>
                <MdOutlineFileDownload className="text-[#F25E26] group-hover:text-white" size={12} />
              </div>
              <div>
                <p
                  className="font-Poppins text-sm font-medium"
                  onClick={handleDownload}
                >
                  Download
                </p>
              </div>
            </div>
          </div>

          <div
            style={{ borderBottom: ".5px solid #6E6E6E", paddingBottom: ".3rem" }}
            className="flex justify-between mt-8"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <div>
                <p className="font-Poppins text-sm text-[#504D4D] font-medium">
                  Product Details
                </p>
              </div>
            </div>

          
          </div>
        </div>

        <section
          className="container mx-auto px-4 md:px-6 lg:px-8 mb-8"
          style={{
            width: "100%",
            maxWidth: "1200px"
          }}
        >
          <div className="flex flex-col md:flex-row justify-between mt-4 md:mt-8 items-center border px-4 md:px-8 py-4 md:py-8 rounded-md w-full">
            <div className="w-full md:w-[55%] flex flex-col md:flex-row items-center gap-4 md:gap-2">
              <div className="w-24 md:w-auto">
                <Image
                  width={100}
                  height={100}
                  src={filteredItems[0]?.auction[0]?.images[0] ? `${process.env.NEXT_PUBLIC_BASE_URL_IMG}${filteredItems[0]?.auction[0]?.images[0]}` : ''}
                  alt="product_image"
                  className="object-contain w-full h-auto"
                />
              </div>

              <div className="flex flex-col gap-2 w-full text-center md:text-left">
                <div>
                  <p className="text-[#353131] text-sm md:text-base font-Poppins">
                    {filteredItems[0]?.auction[0]?.name}
                  </p>
                </div>
                <div>
                  <p className="text-[#A09F9F] text-[10px] md:text-[12px] font-Poppins font-normal">
                    {filteredItems[0]?.auction[0]?.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[35%] mt-4 md:mt-0 flex items-center gap-2 border rounded-sm border-[#6E6E6E] px-3 md:px-4 py-2">
              <div
                className="flex flex-col items-baseline gap-3 md:gap-4 w-full"
              /*  style={{
                 borderBottom: "1px solid #6E6E6E",
                 paddingBottom: ".5rem",
               }} */
              >
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-between w-full">
                  <div>
                    <p className="text-[#6E6E6E] font-Poppins text-xs md:text-sm">
                      Ticket Price:
                    </p>
                  </div>
                  <div>
                    <p className="font-Poppins text-[#353131] text-sm md:text-base font-medium">
                      {/*       N {filteredItems[0]?.ticket_price} */}
                      {formatCurrency(filteredItems[0]?.ticket_price)}

                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-between w-full">
                  <div>
                    <p className="text-[#6E6E6E] font-Poppins text-xs md:text-sm">
                      Ticket Number:
                    </p>
                  </div>
                  <div>
                    <p className="font-Poppins text-[#353131] text-sm md:text-base font-medium">
                      {filteredItems[0]?.ticket_number}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*   <GoogleTicket /> */}

        <RaffleTicket
          ticket_number={filteredItems[0]?.ticket_number || 'N/A'}
          ticket_price={filteredItems[0]?.ticket_price || 'N/A'}
          purchase_date={filteredItems[0]?.date_created || 'N/A'}
          product={filteredItems[0]?.auction[0]?.name || 'N/A'}
          raffle_date={filteredItems[0]?.start_date || 'N/A'}
          raffle_time={filteredItems[0]?.start_time || 'N/A'}
        />

        <section
          style={{
            margin: "0 auto",
            width: "95%",
            marginTop: "3rem",
          }}
          className="border rounded-md px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6"
        >
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-Poppins text-[#353131] font-medium text-sm sm:text-base">
                  Payment Method
                </p>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <div>
                  <Image
                    width={16}
                    height={16}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    src={payment_method}
                    alt="purchasecheck"
                  />
                </div>
                <div>
                  <p className="font-Poppins text-xs sm:text-sm text-[#2A2A2A] font-normal">
                    {filteredItems[0]?.payment_method}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-Poppins text-[#353131] font-medium text-sm sm:text-base">
                  Ticket Price
                </p>
              </div>

              <div className="flex items-center">
                <div>
                  <p className="font-Poppins text-sm sm:text-base text-[#2A2A2A] font-semibold">
                    {formatCurrency(filteredItems[0]?.ticket_price)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-Poppins text-[#353131] font-medium text-sm sm:text-base">
                  Discount
                </p>
              </div>

              <div className="flex items-center">
                <div>
                  <p className="font-Poppins text-sm sm:text-base text-[#2A2A2A] font-semibold">
                    {formatCurrency(0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 sm:pt-3 border-t border-gray-200">
              <div>
                <p className="font-Poppins text-[#353131] font-medium text-sm sm:text-base">
                  Total
                </p>
              </div>

              <div className="flex items-center">
                <div>
                  <p className="font-Poppins text-sm sm:text-base text-[#2A2A2A] font-semibold">
                    {formatCurrency(filteredItems[0]?.ticket_price)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

<div className='r'>
  <Footer />
</div>
    </section>
  );
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
 <div className='content-container'>
  <WrappedPage />
 </div>
  </Suspense>
);

export default Page;