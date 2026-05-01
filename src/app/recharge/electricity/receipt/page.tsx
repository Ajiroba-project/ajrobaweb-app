"use client";
import React, { Suspense, useRef } from "react";
import { Header as ReceiptHeader } from "./component/Header";
import { Header as AppHeader } from "@/app/component/Header";
import { useRouter } from "next/navigation";
import Image from "next/image";
import applestore from "../../../asset/image/apple.png";
import androidstore from "../../../asset/image/android.png";
import { useAuthOrders } from "@/hooks/useAuthOrders";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/store";
import { useGetDatanew } from "@/hooks/useGetData";
import Cookies from "js-cookie";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { formatCurrency } from "@/utils/formatCurrency";

const WrappedPage = () => {
  const router = useRouter();
  useAuthOrders(router);

  const searchParams = useSearchParams();
  const order_id = searchParams.get("transId") || ""; // Get the order ID from the URL params

  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

  const userToken = (Cookies.get("token") as string) || "";

  const reference = searchParams.get("ref") || "";

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/view_recent_transaction/?reference=${reference}`;

  const { data: transdata, isLoading: transLoading } = useGetDatanew(
    url,
    "get_receipt",
    userToken || " ",
  );

  // console.log(transdata, 'trAS')

  if (transLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }




  const imageToBase64 = (img: HTMLImageElement): Promise<string> => {
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
    if (!transdata) {
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
      const imagePromises = Array.from(images).map(async (img: HTMLImageElement) => {
        return new Promise<void>((resolve, reject) => {
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
      await new Promise<void>(resolve => setTimeout(resolve, 500));

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

      pdf.save(`electricity_receipt_${reference}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // console.log()

  return (
    <section className="min-h-screen bg-gray-50">
      <AppHeader />
      <div className="h-24 md:h-28 lg:h-32"></div>

      <div id="receipt-container" className="content-container max-w-2xl mx-auto bg-white py-6 sm:py-8 px-4 sm:px-8 shadow-sm">
        <ReceiptHeader />

        <div className="flex flex-col items-center py-6 sm:py-8 border-b border-gray-200 mb-4">
          <p className="font-Poppins text-xs text-[#A09F9F] mb-1">Transaction Amount</p>
          <p className="text-2xl font-bold font-Poppins text-[#1B1B1A] sm:text-3xl">
            {transdata?.data?.total_amount 
              ? formatCurrency(transdata?.data?.total_amount) 
              : formatCurrency(transdata?.data?.amount)}
          </p>
        </div>

        <div className="space-y-0">
          {[
            { label: "Token", value: transdata?.data?.token || "NA" },
            { label: "Payment Method", value: transdata?.data?.payment_method || "NA" },
            { label: "Customer Name", value: transdata?.data?.name || "NA" },
            { label: "Phone Number", value: transdata?.data?.phoneNumber || transdata?.data?.number || "NA" },
            { label: "Disco", value: transdata?.data?.biller || "NA" },
            { label: "Meter Number", value: transdata?.data?.meter_number || transdata?.data?.customer_id || "NA" },
            { label: "Units", value: transdata?.data?.units ? `${transdata?.data?.units} Kwh` : "NA" },
            { label: "Token Amount", value: transdata?.data?.amount ? formatCurrency(transdata?.data?.amount) : "NA" },
            { label: "Tax Amount", value: transdata?.data?.tax_amount ? formatCurrency(transdata?.data?.tax_amount) : "N 0.00" },
            { label: "Total Payable", value: transdata?.data?.total_amount 
              ? formatCurrency(transdata?.data?.total_amount) 
              : transdata?.data?.amount 
                ? formatCurrency(transdata?.data?.amount) 
                : "NA" },
            { label: "Transaction ID", value: transdata?.data?.reference || transdata?.data?.id || "NA" },
            { label: "Date of Transaction", value: transdata?.data?.date_created ? (() => {
              const date = new Date(transdata?.data?.date_created);
              const day = date.getDate();
              const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
              const formattedDate = `${day}${suffix} ${date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`;
              const formattedTime = date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true });
              return `${formattedDate}. ${formattedTime}`;
            })() : "NA" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-200 last:border-b-0"
            >
              <span className="text-sm text-[#F25E26] mb-1 sm:mb-0">{item.label}</span>
              <span className="text-sm font-semibold text-gray-900 sm:text-right break-all">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10">
          <p className="text-sm font-semibold font-Poppins text-[#1B1B1A]">Download our mobile App on:</p>
          <div className="flex justify-center gap-3 mt-4">
            <Image src={androidstore} alt="android" width={190} height={60} className="cursor-pointer w-[140px] sm:w-[190px] h-auto" />
            <Image src={applestore} alt="apple" width={190} height={60} className="cursor-pointer w-[140px] sm:w-[190px] h-auto" />
          </div>
        </div>

        <p className="text-center text-[11px] sm:text-xs text-[#A09F9F] mt-8 sm:mt-12 font-Poppins leading-relaxed">
          This electronically generated receipt is provided for informational
          purposes only and is not a legally binding document.
        </p>

        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={handleDownloadReceipt}
            className="w-full sm:w-auto rounded-lg bg-[#FCDFD4] text-[#2A2A2A] p-3 sm:p-4 px-8 sm:px-10 text-sm font-medium hover:bg-[#F25E26] hover:text-white transition-colors"
          >
            Download Receipt
          </button>
        </div>
      </div>
    </section>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <WrappedPage />
    </Suspense>
  );
}
