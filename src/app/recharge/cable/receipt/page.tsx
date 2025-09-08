"use client";
import React, { Suspense, useEffect, useState, useRef } from "react";
import { Header } from "./component/Header";
import { useRouter } from "next/navigation";
import Image from "next/image";
import applestore from "../../../asset/image/apple.png";
import androidstore from "../../../asset/image/android.png";
import useAuthMiddleware from "@/hooks/useAuth";
import { useAuthOrders } from "@/hooks/useAuthOrders";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/store";
import { useGetDatanew, useGetProductData } from "@/hooks/useGetData";
import { error } from "console";
import verify from "@/app/asset/verify.svg";
import Cookies from "js-cookie";

import { BlobProviderParams, PDFDownloadLink } from "@react-pdf/renderer";
import Receipt from "./receiptpdf/Receipt";
import ReceiptPDF from "./receiptpdf/Receipt";
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


  // console.log(transdata, "transdata")

  if (transLoading) {
    return <div className="text-center">Loading...</div>;
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

      pdf.save(`cable_receipt_${reference}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <section>
      <div id="receipt-container" >

        <div className="bg-gray-100 py-8">
          <div style={{ margin: "0 auto", width: "90%" }}>
            <Header />
          </div>
        </div>
        <div className="flex flex-col items-center py-8">
          <p className="brand3 text-[#A09F9F] font-Poppins text-[12px]">
            Transaction Amount
          </p>
          <p className="text-2xl font-semibold font-Poppins">
            {formatCurrency(transdata?.data?.amount)}
          </p>
        </div>
        <section style={{ margin: "0 auto", width: "90%" }}>
          <div className=" bg-gray-100">
            <div className="w-full p-6 bg-white ">
              <div className="space-y-4">
                {[
                  { label: "Biller", value: transdata?.data?.biller || "NA" },
                  {
                    label: "Customer Id",
                    value: transdata?.data?.customer_id || "NA",
                  },
                  {
                    label: "Date of Transaction",
                    value: transdata?.data?.date_created || "NA",
                  },
                  {
                    label: "Transaction I.D",
                    value: transdata?.data?.id || "NA",
                  },
                  {
                    label: "Customer Name",
                    value: transdata?.data?.name || "NA",
                  },
                  { label: "Number", value: transdata?.data?.number || "NA" },
                  { label: "Package", value: transdata?.data?.package || "NA" },
                  {
                    label: "Payment Method",
                    value: transdata?.data?.payment_method || "NA",
                  },
                  {
                    label: "Phone Number",
                    value: transdata?.data?.phoneNumber || "NA",
                  },

                  {
                    label: "Reference",
                    value: transdata?.data?.reference || "NA",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 2xl:grid-cols-2 grid-cols-1 2xl:gap-[45rem] xl:gap-[45rem] lg:gap-[2rem] md:gap-[2rem] gap-[2rem]  border-b pb-2"
                  >
                    <span className="text-sm font-medium text-[#F25E26]">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 text-left">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container my-8 flex flex-col items-center gap-8 ">
          <div className="flex justify-center gap-3">
            <div>
              <Image
                src={androidstore}
                alt="android"
                width={190}
                className="cursor-pointer"
              />
            </div>
            <div>
              <Image
                src={applestore}
                alt="apple"
                width={190}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div>
            <p className="brand3 container text-center font-medium text-[12px] text-[#A09F9F] mt-12 font-Poppins">
              This electronically generated receipt is provided for informational
              purposes only and is not a legally binding document.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadReceipt}
            className="my-6 rounded-lg bg-[#FCDFD4] text-[#2A2A2A] p-4 px-10 hover:bg-[#F25E26] hover:text-white text-base"
          >
            Download Receipt
          </button>

        </section>

      </div>


    </section>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WrappedPage />
    </Suspense>
  );
}
