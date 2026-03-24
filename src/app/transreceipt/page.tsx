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
import { formatCurrency } from '@/utils/formatCurrency';

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

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/transaction_receipt/${order_id}/`, requestOptions)
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
    if (!productInfo) {
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

      pdf.save(`ajiroba_transaction_receipt.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };


  if (loading) return <div className='flex min-h-screen items-center justify-center font-Poppins text-sm text-gray-500'>Loading...</div>;
  if (productError) return <div className='flex min-h-screen items-center justify-center font-Poppins text-sm text-red-500'>{productError}</div>;

  return (
    <section>
      <div id="receipt-container" className="bg-white min-h-screen">
        {/* Header */}
        <Header />
        <div className='h-24 md:h-28 lg:h-32 bg-gray-100'></div>

        {/* Transaction Amount */}
        <div className='flex flex-col items-center py-6 sm:py-8'>
          <p className='font-Poppins text-xs text-[#A09F9F]'>Transaction Amount</p>
          <p className='mt-1 text-2xl sm:text-3xl font-semibold font-Poppins text-[#1B1B1A]'>
            {formatCurrency(productInfo?.data[0]?.amount)}
          </p>
        </div>

        {/* Receipt Details */}
        <section>
          {productInfo?.data ? <ReceiptTable Data={productInfo.data} /> : <p className='text-center text-sm text-gray-400 py-8'>No data available</p>}
        </section>

        {/* App Download & Actions */}
        <section className='mx-auto w-[92%] sm:w-[90%] py-6 sm:py-8'>
          <p className='text-sm font-semibold font-Poppins text-[#1B1B1A]'>Download our mobile App on:</p>

          <div className='flex justify-center gap-3 mt-4'>
            <Image src={androidstore} alt='android' width={190} height={60} className='cursor-pointer w-[140px] sm:w-[190px] h-auto' />
            <Image src={applestore} alt='apple' width={190} height={60} className='cursor-pointer w-[140px] sm:w-[190px] h-auto' />
          </div>

          <p className='text-center text-[11px] sm:text-xs text-[#A09F9F] mt-8 sm:mt-12 font-Poppins leading-relaxed'>
            This electronically generated receipt is provided for informational purposes only and is not a legally binding document.
          </p>

          <div className='flex justify-center mt-6'>
            <DefaultButton
              text='Download Receipt'
              type='button'
              handleClick={handleDownloadReceipt}
              className='w-full sm:w-auto rounded-lg bg-[#FCDFD4] text-[#2A2A2A] p-3 sm:p-4 px-8 sm:px-10 text-sm font-medium hover:bg-[#F25E26] hover:text-white transition-colors'
            />
          </div>
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
