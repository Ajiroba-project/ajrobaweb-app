'use client'
import React, { Suspense, useEffect, useState, useRef  } from 'react'
import { Header } from './component/Header'
import { Tables } from './component/Tables'
import {useRouter} from "next/navigation"
import Image from 'next/image'
import applestore from '../../../asset/image/apple.png'
import androidstore from '../../../asset/image/android.png'
import useAuthMiddleware from '@/hooks/useAuth'
import { useAuthOrders } from '@/hooks/useAuthOrders'
import { useSearchParams } from "next/navigation";
import { useAuthStore } from '@/store/store'
import { useGetProductData } from '@/hooks/useGetData'
import { error } from 'console'
import verify from '@/app/asset/verify.svg'
import Cookies from 'js-cookie'

import { DefaultButton } from '@/app/component/Button'
import jsPDF from "jspdf";
import { PDFDownloadLink } from '@react-pdf/renderer';

import ReceiptPDF from './receiptpdf/Receipt'

const WrappedPage = () => {
  const router = useRouter();
  useAuthOrders(router);

  const searchParams = useSearchParams();
  const order_id = searchParams.get("transId") || "";  // Get the order ID from the URL params

  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

   const userToken = (Cookies.get("token") as string) || "";


    const purchasedetails = Cookies.get("atd") || "";

    const purchasedetailsnew = Cookies.get("atdnew") || "";



// Safe JSON parsing function
const safeJSONParse = (data: string) => {
  try {
    return data ? JSON.parse(data) : {}; // Return empty object if data is empty
  } catch (error) {
    console.error("Error parsing JSON:", error, "Raw data:", data);
    return {}; // Return empty object if parsing fails
  }
};

const parsedDetails = safeJSONParse(purchasedetails);
const parsedDetailsnew = safeJSONParse(purchasedetailsnew);

    //  console.log(parsedDetails, 'cabbbbbb')
    //  console.log(parsedDetailsnew, 'cckkkk')

const combinedDetails = {
  ...parsedDetails,
  ...parsedDetailsnew,
  data: {
    ...parsedDetails?.data,  // Keep existing data properties
    disco: parsedDetailsnew?.disco,
    payerName: parsedDetailsnew?.payerName,
    customerId: parsedDetailsnew?.customerId,
    meterType: parsedDetailsnew?.meterType,
    phoneNumber: parsedDetailsnew?.phoneNumber,
  }
};



  const [isModalOpen, setModalOpen] = useState(false);

  const handleReviewClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


//   if (productLoading) {
//     return <div className='text-center'>Loading...</div>;
//   }

  return (
    <section >
      <div className='bg-gray-100 py-8' >
        <div style={{ margin: '0 auto', width: '90%' }}>
          <Header />
        </div>
      </div>
      <div className='flex flex-col items-center py-8'>
        <p className='brand3 text-[#A09F9F] font-Poppins text-[12px]'>Transaction Amount</p>
        <p className='text-2xl font-semibold font-Poppins'>₦{parsedDetails?.data?.amount || 0}</p>
      </div>
      <section style={{ margin: '0 auto', width: '90%' }}>


        <div className=" bg-gray-100">
      <div className="w-full p-6 bg-white ">

        <div className="space-y-4">
          {[
             { label: "Extras", value: parsedDetails?.data?.disco_token || 'NA' },
            { label: "Payment Method", value: parsedDetails?.data?.payment_method || 'NA' },
            { label: "Customer Name", value: parsedDetailsnew?.payerName || 'NA' },
            { label: "Address", value: parsedDetails?.data?.address || 'NA' },
            { label: "Phone Number", value: parsedDetailsnew?.phoneNumber || 'NA' },
             { label: "Disco", value: parsedDetailsnew?.disco || 'NA' },
            { label: "Reference", value: parsedDetails?.data?.reference || 'NA' },
            { label: "Meter Number", value: parsedDetailsnew?.customerId || 'NA'},
             { label: "Units", value: parsedDetails?.data?.disco_token || 'NA'},
            { label: "Token Amount", value:  `₦ ${parsedDetailsnew?.amount || 0}` },
            { label: "Tax Amount", value:  `₦ ${parsedDetailsnew?.tax_amount || 0}` },
            { label: "Total Payable", value:  `₦ ${parsedDetailsnew?.total_payable || 0}` },
            { label: "Transaction I.D", value: parsedDetails?.data?.id || 'NA' },
            { label: "Date of Transaction", value: parsedDetails?.data?.date || 'NA' },
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

      <section className='container my-8 flex flex-col items-center gap-8 '>
        <div className='flex justify-center gap-3'>
          <div>
            <Image
              src={androidstore}
              alt='android'
              width={190}
              className='cursor-pointer'
            />
          </div>
          <div>
            <Image
              src={applestore}
              alt='apple'
              width={190}
              className='cursor-pointer'
            />
          </div>
        </div>

        <div>
          <p className='brand3 container text-center font-medium text-[12px] text-[#A09F9F] mt-12 font-Poppins'>
            This electronically generated receipt is provided for informational
            purposes only and is not a legally binding document.
          </p>
        </div>

           <PDFDownloadLink document={<ReceiptPDF dataone={parsedDetails} datatwo={parsedDetailsnew} />} fileName={`receipt`}>
          {({ blob, url, loading, error }) =>
            loading ?
              'Loading...' :
              <div>
                <button
                  type='button'
                  onClick={close}
                  className={`my-6 rounded-lg bg-[#FCDFD4] text-[#2A2A2A] p-4 px-10 hover:bg-[#F25E26] hover:text-white `}>
                  Download
                </button>
              </div>
          }
        </PDFDownloadLink>


      </section>


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