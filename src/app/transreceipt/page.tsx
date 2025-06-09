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
import html2canvas from 'html2canvas';

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

    fetch(`https://staging.ajiroba.ng/v1/user/transaction_receipt/${order_id}/`, requestOptions)
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

  const handleDownloadReceipt = async () => {
    if (!productInfo) {
      console.error('No product info available');
      return;
    }

    // Get the receipt container element
    const receiptElement = document.getElementById('receipt-container');
    if (!receiptElement) {
      console.error('Receipt container not found');
      return;
    }

    try {
      // Store original styles
      const originalStyles = {
        width: receiptElement.style.width,
        height: receiptElement.style.height,
        overflow: receiptElement.style.overflow,
        position: receiptElement.style.position,
        backgroundColor: receiptElement.style.backgroundColor,
      };

      // Set fixed dimensions for capture
      receiptElement.style.width = '1200px';
      receiptElement.style.height = 'auto';
      receiptElement.style.overflow = 'visible';
      receiptElement.style.position = 'relative';
      receiptElement.style.backgroundColor = '#ffffff';

      // Create canvas from the receipt element
      const canvas = await html2canvas(receiptElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS for images
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200,
        windowHeight: receiptElement.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure all images are loaded in the cloned document
          const images = clonedDoc.getElementsByTagName('img');
          return Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
              img.onload = resolve;
              img.onerror = resolve;
            });
          }));
        }
      });

      // Restore original styles
      receiptElement.style.width = originalStyles.width;
      receiptElement.style.height = originalStyles.height;
      receiptElement.style.overflow = originalStyles.overflow;
      receiptElement.style.position = originalStyles.position;
      receiptElement.style.backgroundColor = originalStyles.backgroundColor;

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

      // Save the PDF with a meaningful name
      const fileName = `ajiroba_transaction_receipt_${order_id}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  if (loading) return <div className='text-center'>Loading...</div>;
  if (productError) return <div className='text-center text-red-500'>{productError}</div>;

  return (
    <section>
      <div id="receipt-container" className="bg-white">
        <div className='bg-gray-100 py-8'>
          <div style={{ margin: '0 auto', width: '90%' }}>
            <Header />
          </div>
        </div>
        <div className='flex flex-col items-center py-8'>
          <p className='brand3 text-[#A09F9F] font-Poppins text-[12px]'>Transaction Amount</p>
          <p className='text-2xl font-semibold font-Poppins'>₦{Number(productInfo?.data[0]?.amount).toLocaleString('en-NG')}</p>
        </div>
        <section>
          <div>
            {productInfo?.data ? <ReceiptTable Data={productInfo.data} /> : <p>No data available</p>}
          </div>
        </section>

        <section className='container py-8' style={{
          margin: '0 auto',
          width: '90%'
        }} >
          <p className='text-sm font-semibold font-Poppins'>Download our mobile App on:</p>
        </section>

        <section className='container my-4 flex flex-col items-center gap-8'>
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
