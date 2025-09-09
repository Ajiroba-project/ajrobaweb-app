"use client";
import React, { Suspense } from "react";
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
import { useGetOrderData, useGetProductData } from "@/hooks/useGetData";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const WrappedPage = () => {
  const router = useRouter();
  useAuthOrders(router);
  const searchParams = useSearchParams();
  const order_id = searchParams.get("orderId");
  const profile = userProfile((state) => state.profile);
  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));


  const userToken = Cookies.get('token')





  const {
    data: productinfo,
    isLoading: productLoading,
    error: producterror,
  } = useGetProductData(
    "/api/productdetailsbyid",
    userToken,
    order_id,
    "get_product_details"
  );


  // console.log(producterror, "producterror")


  // Display loading spinner or text while fetching data
  if (productLoading) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </section>
    );
  }

  // Display error message if data fetch fails
  if (producterror) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-lg font-semibold">{producterror?.response?.data?.error} </p>
      </section>
    );
  }

  // Display "No Data Available" if productinfo is empty
  if (!productinfo || !productinfo.data || !productinfo.data.data?.length) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <p className="text-gray-700 text-lg font-semibold">No Data Available</p>
      </section>
    );
  }


  // Helper function to convert image to base64
  const imageToBase64 = (img) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get 2D context from canvas'));
        return;
      }

      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;

      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    });
  };

  const handleDownloadReceipt = async () => {
    if (!productinfo) {
      console.error('No transaction data available');
      return;
    }

    const receiptElement = document.getElementById('receipt-container');
    if (!receiptElement) {
      console.error('Receipt container not found');
      return;
    }

    try {
      // Convert all images to base64 first
      const images = receiptElement.querySelectorAll('img');
      const imagePromises = Array.from(images).map(async (img) => {
        return new Promise((resolve, reject) => {
          if (!img.complete || img.naturalWidth === 0) {
            img.onload = async () => {
              try {
                const base64 = await imageToBase64(img);
                img.src = base64;
                resolve();
              } catch (error) {
                console.error('Error converting image to base64:', error);
                resolve(); // Continue even if one image fails
              }
            };
            img.onerror = () => resolve(); // Continue even if image fails to load
          } else {
            imageToBase64(img).then(base64 => {
              img.src = base64;
              resolve();
            }).catch(error => {
              console.error('Error converting image to base64:', error);
              resolve(); // Continue even if conversion fails
            });
          }
        });
      });

      await Promise.all(imagePromises);

      // Wait a bit for the base64 images to load
      await new Promise(resolve => setTimeout(resolve, 500));

      // Now capture with html2canvas
      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true, // Allow tainted canvas since we're using base64
        logging: false,
        backgroundColor: '#ffffff',
        width: receiptElement.scrollWidth,
        height: receiptElement.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc, element) => {
          element.style.width = receiptElement.scrollWidth + 'px';
          element.style.height = 'auto';
          element.style.overflow = 'visible';
          element.style.backgroundColor = '#ffffff';

          // Ensure images maintain their size
          const clonedImages = element.querySelectorAll('img');
          clonedImages.forEach((img, index) => {
            const originalImg = images[index];
            if (originalImg) {
              img.style.width = originalImg.offsetWidth + 'px';
              img.style.height = originalImg.offsetHeight + 'px';
              img.style.objectFit = 'contain';
            }
          });
        }
      });

      // Create PDF
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', imgHeight > 297 ? [imgWidth, imgHeight] : 'a4');

      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight
      );

      pdf.save(`purchase_order_receipt_${order_id}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };


  return (



    <section className="bg-[#F6F6F6] min-h-screen">
      <div id="receipt-container">
        <header className="z-50">
          <Header />
        </header>

        <section className="bg-[#F6F6F6] container mx-auto px-4 md:px-0">
          <div onClick={() => router.back()} className="cursor-pointer flex justify-start mb-4">
            <p className="text-[#E84526] text-base">Back</p>
          </div>

          <section className="w-full md:w-[80%] text-[#111111] mx-auto font-extrabold">
            <Title title="Purchase Order Details" />
          </section>
        </section>

        <main className="container bg-white py-8 px-4 sm:px-6 mx-auto">
          <div className="flex flex-col gap-6">

            {/* Success Message and Download */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <Image width={30} height={30} src={purchasecheck} alt="purchasecheck" />
                <p className="font-Poppins text-base text-[#2A2A2A] font-medium">
                  Your Purchase Order is successful! 
                </p>
              </div>

              <div className="flex items-center gap-2 cursor-pointer" onClick={handleDownloadReceipt}>
                <MdOutlineFileDownload color="red" size={12} />
                <p className="font-Poppins text-sm text-[#504D4D] font-medium">Download</p>
              </div>
            </div>

            {/* Header Row */}
            <div className="flex flex-col md:flex-row justify-between border-b border-[#6E6E6E] pb-2">
              <p className="font-Poppins text-sm text-[#504D4D] font-medium">Product Details</p>

              <div className="flex flex-wrap items-center gap-2">
                <p className="font-Poppins text-sm text-[#6E6E6E] font-medium">Order Code:</p>
                <p className="font-Inter text-base text-[#111111] font-bold">
                  {productinfo?.data?.data?.[1].order_id}
                </p>
              </div>
            </div>

            {/* Product Cards */}
            <div className="flex flex-col gap-6">
              {productinfo?.data?.data?.[0]?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between items-center border px-4 py-6 rounded-md w-full"
                >
                  {/* Product Image and Info */}
                  <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-[55%]">
                    <Image
                      width={100}
                      height={100}
                      src={`https://staging.ajiroba.ng/media/${item.product?.images[0]?.image}`}
                      alt="product_image"
                      className="object-contain"
                    />
                    <div className="flex flex-col gap-2 w-full text-center md:text-left">
                      <p className="text-[#353131] text-base font-Poppins">{item.product?.name}</p>
                      <p className="text-[#A09F9F] text-[12px] font-Poppins font-normal">
                        {item.product?.description}
                      </p>
                    </div>
                  </div>

                  {/* Price Info */}
                  <div className="flex flex-col gap-4 w-full md:w-[35%] border rounded-sm border-[#6E6E6E] px-4 py-4 mt-4 md:mt-0">
                    <div className="flex justify-between">
                      <p className="text-[#6E6E6E] font-Poppins text-sm">Unit Price:</p>
                      <p className="font-Poppins text-[#353131] font-medium">
                        ₦ {Number(item?.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-[#6E6E6E] font-Poppins text-sm">Qty:</p>
                      <p className="font-Poppins text-[#353131] font-medium">{item?.quantity}</p>
                    </div>

                    <div className="flex justify-between border-t pt-2 border-[#6E6E6E]">
                      <p className="text-[#6E6E6E] font-Poppins text-sm">Price:</p>
                      <p className="font-Poppins text-[#353131] font-medium">
                        ₦ {Number(item?.sub_total).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <section className="w-full max-w-[95%] md:max-w-3xl mx-auto mt-12 border rounded-md px-4 py-6">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between">
                  <p className="font-Poppins text-[#353131] font-medium text-base">Payment Method</p>
                  <div className="flex items-center gap-2">
                    <Image width={20} height={20} src={payment_method} alt="payment_method" />
                    <p className="font-Poppins text-sm text-[#2A2A2A]">
                      {productinfo?.data?.data[1]?.payment_method}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <p className="font-Poppins text-[#353131] font-medium text-base">Ticket Price</p>
                  <p className="font-Poppins text-base text-[#2A2A2A] font-semibold">
                    ₦ {Number(productinfo?.data?.data[1]?.cost_price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="font-Poppins text-[#353131] font-medium text-base">Discount</p>
                  <p className="font-Poppins text-base text-[#2A2A2A] font-semibold">
                    ₦ {Number(productinfo?.data?.data[1]?.discount_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="font-Poppins text-[#353131] font-medium text-base">Total</p>
                  <p className="font-Poppins text-base text-[#2A2A2A] font-semibold">
                    ₦ {Number(productinfo?.data?.data[1]?.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </section>

  );
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <WrappedPage />
  </Suspense>
);

export default Page;