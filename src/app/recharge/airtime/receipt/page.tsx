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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { BlobProviderParams, PDFDownloadLink } from "@react-pdf/renderer";
import Receipt from "./receiptpdf/Receipt";
import ReceiptPDF from "./receiptpdf/Receipt";

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

  const handleDownloadReceipt = async () => {
    if (!transdata) {
      console.error('No transaction data available');
      return;
    }

    // Get the receipt container element
    const receiptElement = document.getElementById('receipt-container');
    if (!receiptElement) {
      console.error('Receipt container not found');
      return;
    }

    try {
      // Create canvas from the receipt element
      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: receiptElement.scrollWidth,
        height: receiptElement.scrollHeight,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('receipt-container');
          if (clonedElement) {
            clonedElement.style.width = '100%';
            clonedElement.style.height = 'auto';
            clonedElement.style.position = 'relative';
            clonedElement.style.backgroundColor = '#ffffff';
          }
        }
      });

      // Create PDF with the same dimensions as the canvas
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');

      // Add the image to the PDF
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight
      );

      // If content is too long, add it to multiple pages
      if (imgHeight > 297) { // A4 height in mm
        const pageCount = Math.ceil(imgHeight / 297);
        for (let i = 1; i < pageCount; i++) {
          pdf.addPage();
          pdf.addImage(
            canvas.toDataURL('image/png'),
            'PNG',
            0,
            -(297 * i),
            imgWidth,
            imgHeight
          );
        }
      }

      // Save the PDF
      pdf.save(`airtime_receipt_${reference}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (transLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <section>
      <div id="receipt-container" className="bg-white min-h-screen">
        <div className="bg-gray-100 py-8">
          <div style={{ margin: "0 auto", width: "90%" }}>
            <Header />
          </div>
        </div>
        <div className="flex flex-col items-center py-8">
          <p className="brand3 text-[#A09F9F] font-Poppins text-[16px]">
            Transaction Amount
          </p>
          <p className="text-3xl font-semibold font-Poppins">
            ₦{transdata?.data?.amount || 0}
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
                    value: transdata?.data?.date_created ? new Date(transdata?.data?.date_created).toLocaleString('en-US', {
                      weekday: 'short',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    }) : "NA",
                  },
                  {
                    label: "Transaction I.D",
                    value: transdata?.data?.id || "NA",
                  },
                  {
                    label: "Customer Name",
                    value: transdata?.data?.name || "NA",
                  },
                  { label: "Beneficiary Number", value: transdata?.data?.number || "NA" },
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
                    <span className="text-base font-medium text-[#F25E26]">
                      {item.label}
                    </span>
                    <span className="text-base font-semibold text-gray-900 text-left">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className='py-8' style={{
          margin: '0 auto',
          width: '86%'
        }} >
          <p className='text-base font-semibold font-Poppins'>Download our mobile App on:</p>
        </section>

        <section className="container my-8 flex flex-col items-center gap-8 ">
          <div className="flex justify-center gap-3">
            <div>
              <Image
                src={androidstore}
                alt="android"
                width={220}
                height={70}
                className="cursor-pointer"
              />
            </div>
            <div>
              <Image
                src={applestore}
                alt="apple"
                width={220}
                height={70}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div>
            <p className="brand3 container text-center font-medium text-[14px] text-[#A09F9F] mt-12 font-Poppins">
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
