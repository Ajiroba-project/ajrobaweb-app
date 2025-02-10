// 'use client'
// import React, { Suspense, useEffect, useState } from 'react'
// import { Header } from './component/Header'
// import { Tables } from './component/Tables'
// import { DefaultButton } from '../component/Button'
// import {useRouter} from "next/navigation"
// import Image from 'next/image'
// import applestore from '../asset/image/apple.png'
// import androidstore from '../asset/image/android.png'
// import useAuthMiddleware from '@/hooks/useAuth'
// import { useAuthOrders } from '@/hooks/useAuthOrders'
// // import { useAuthOrders } from '@/hooks/useAuthOrders'
// import { useSearchParams } from "next/navigation";
// import { useAuthStore } from '@/store/store'
// // import { useGetProductData } from '@/hooks/useGetData'
// import { error } from 'console'
// import { ModalProfile } from '../profile/components/ModalProfile'
// import verify from '@/app/asset/verify.svg'
// import Cookies from 'js-cookie'
// import jsPDF from 'jspdf';
// import { useGetProductData } from '@/hooks/useGetData'


// const WrappedPage = () => {
//   const router = useRouter();
//   useAuthOrders(router);

//   const searchParams = useSearchParams();
// const order_id = searchParams.get("transId") || "";

// // console.log(order_id)


//   // const userToken = token;

//    const userToken = Cookies.get("token") || ""
//   //  console.log("User Token:", userToken);


//     const {
//     data: productinfo,
//     isLoading: productLoading,
//     error: producterror,
//     refetch
//   } = useGetProductData(
//     "/api/productreceiptbyid",
//     userToken,
//     order_id,
//     "get_receipt"
//   );


// console.log(productinfo, "productinfo")


//   const [isModalOpen, setModalOpen] = useState(false);

//   const handleReviewClick = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   useEffect(() => {
//     refetch();
//   }, [order_id, refetch]);


//   // Function to generate PDF
//   const handleDownloadReceipt = () => {
//     const doc = new jsPDF();
//     // Add receipt details to the PDF
//     doc.setFontSize(22);
//     doc.text("Transaction Receipt", 20, 20);
//     doc.setFontSize(12);



//     // Add transaction details
//     doc.text(`Beneficiary: ${productinfo?.data?.data[0]?.beneficiary || ''}`, 20, 40);
//     doc.text(`Sender: ₦${productinfo?.data?.data[1]?.sender || ''}`, 20, 50);
//     doc.text(`Transaction Type: ${productinfo?.data?.data[0]?.channel || ''}`, 20, 60);
//     doc.text(`Transaction Date: ${productinfo?.data?.data[0]?.date_created || ''}`, 20, 70);
//     doc.text(`Transaction Status: ${productinfo?.data?.data[0]?.status || ''}`, 20, 80);
//     doc.text(`Description: ${productinfo?.data?.data[0]?.description || ''}`, 20, 90);
//     doc.text(`Transaction Reference: ${productinfo?.data?.data[0]?.reference || ''}`, 20, 100);
//     doc.text(`Transaction Amount: ${productinfo?.data?.data[0]?.amount || ''}`, 20, 110);
//     // Save the generated PDF
//     doc.save('transaction_receipt.pdf');
//   };

//   if (productLoading) {
//     return (
//       <section className="min-h-screen flex justify-center items-center">
//         <p className="text-gray-700 text-lg font-semibold">Loading...</p>
//       </section>
//     );
//   }
//   return (
//     <section>
//       <div className='bg-gray-100 py-8'>
//         <div style={{ margin: '0 auto', width: '90%' }}>
//           <Header />
//         </div>
//       </div>
//       <div className='flex flex-col items-center py-8'>
//         <p className='brand3 text-[#A09F9F] font-Poppins text-[12px]'>Transaction Amount</p>
//         <p className='text-2xl font-semibold font-Poppins'>₦{productinfo?.data?.data[0]?.amount}</p>
//       </div>
//       <section>
//         <div>
//           {productinfo?.data ? (
//             <Tables Data={productinfo.data} />
//           ) : producterror ? (
//             <p className='text-center'>Error fetching data: {producterror?.message}</p>
//           ) : (
//             <p>Loading or no data available</p>
//           )}
//         </div>
//       </section>

//       <section className='container my-8 flex flex-col items-center gap-8 '>
//         <div className='flex justify-center gap-3'>
//           <div>
//             <Image
//               src={androidstore}
//               alt='android'
//               width={190}
//               className='cursor-pointer'
//             />
//           </div>
//           <div>
//             <Image
//               src={applestore}
//               alt='apple'
//               width={190}
//               className='cursor-pointer'
//             />
//           </div>
//         </div>

//         <div>
//           <p className='brand3 container text-center font-medium text-[12px] text-[#A09F9F] mt-12 font-Poppins'>
//             This electronically generated receipt is provided for informational
//             purposes only and is not a legally binding document.
//           </p>
//         </div>
//         <DefaultButton
//           text='Download Receipt'
//           type='button'
//          handleClick={handleDownloadReceipt}
//           className='my-6 rounded-lg bg-[#FCDFD4] text-[#2A2A2A] p-4 px-10 hover:bg-[#F25E26] hover:text-white'
//         />
//       </section>


//     </section>
//   );
// };

// export default function Page() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <WrappedPage />
//     </Suspense>
//   );
// }




'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { Header } from './component/Header';
import { Tables } from './component/Tables';
import { DefaultButton } from '../component/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import applestore from '../asset/image/apple.png';
import androidstore from '../asset/image/android.png';
import Cookies from 'js-cookie';
import jsPDF from 'jspdf';
import { ReceiptTable } from './component/ReceiptTable';

const WrappedPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const order_id = searchParams.get('transId') || '';
  const userToken = (Cookies.get('token') as string) || '';

  const [productInfo, setProductInfo] = useState<any>(null);
  const [productError, setProductError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!order_id || !userToken) return;

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `token ${userToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow' as RequestRedirect,
    };

    fetch(`https://ajiroba.onrender.com/v1/user/transaction_receipt/${order_id}/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProductInfo(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setProductError('Failed to fetch data');
        setLoading(false);
      });
  }, [order_id, userToken]);



  const handleDownloadReceipt = () => {
    if (!productInfo) return;
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Transaction Receipt', 20, 20);
    doc.setFontSize(12);
    doc.text(`Beneficiary: ${productInfo?.data[0]?.beneficiary || ''}`, 20, 40);
    doc.text(`Sender: ₦${productInfo?.data[1]?.sender || ''}`, 20, 50);
    doc.text(`Transaction Type: ${productInfo?.data[0]?.channel || ''}`, 20, 60);
    doc.text(`Transaction Date: ${productInfo?.data[0]?.date_created || ''}`, 20, 70);
    doc.text(`Transaction Status: ${productInfo?.data[0]?.status || ''}`, 20, 80);
    doc.text(`Description: ${productInfo?.data[0]?.description || ''}`, 20, 90);
    doc.text(`Transaction Reference: ${productInfo?.data[0]?.reference || ''}`, 20, 100);
    doc.text(`Transaction Amount: ${productInfo?.data[0]?.amount || ''}`, 20, 110);
    doc.save('transaction_receipt.pdf');
  };

  if (loading) return <div className='text-center'>Loading...</div>;
  if (productError) return <div className='text-center text-red-500'>{productError}</div>;




  return (
    <section>
      <div className='bg-gray-100 py-8'>
        <div style={{ margin: '0 auto', width: '90%' }}>
          <Header />
        </div>
      </div>
      <div className='flex flex-col items-center py-8'>
        <p className='brand3 text-[#A09F9F] font-Poppins text-[12px]'>Transaction Amount</p>
        <p className='text-2xl font-semibold font-Poppins'>₦{productInfo?.data[0]?.amount}</p>
      </div>
      <section>
        <div>
          {productInfo?.data ? <ReceiptTable Data={productInfo.data} /> : <p>No data available</p>}
        </div>
      </section>
      <section className='container my-8 flex flex-col items-center gap-8 '>
        <div className='flex justify-center gap-3'>
          <Image src={androidstore} alt='android' width={190} className='cursor-pointer' />
          <Image src={applestore} alt='apple' width={190} className='cursor-pointer' />
        </div>
        <p className='brand3 container text-center font-medium text-[12px] text-[#A09F9F] mt-12 font-Poppins'>
          This electronically generated receipt is provided for informational purposes only and is not a legally binding document.
        </p>
        <DefaultButton
          text='Download Receipt'
          type='button'
          handleClick={handleDownloadReceipt}
          className='my-6 rounded-lg bg-[#FCDFD4] text-[#2A2A2A] p-4 px-10 hover:bg-[#F25E26] hover:text-white'
        />
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
