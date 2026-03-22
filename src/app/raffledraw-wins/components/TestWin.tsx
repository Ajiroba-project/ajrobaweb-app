import React, { useRef } from 'react'
import { GlobeIcon, MailIcon, PhoneCall, SmartphoneIcon, X } from 'lucide-react'
import Image from 'next/image'
import Brand from '@/app/asset/logo.svg'
import { Phone, Mail, Instagram, Globe, Smartphone, Apple } from 'lucide-react'
import { BsApple, BsInstagram } from 'react-icons/bs'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useAuthStore } from '@/store/store'
import { useGetDatanew } from '@/hooks/useGetData'
import { formatCurrency } from '@/utils/formatCurrency'
import mrsajirobasignature from '@/app/asset/image/mrsajirobasignature.png'

export type WinningAdviceModalProps = {
  isOpen: boolean
  onClose: () => void
  adviceData: {
    date: string
    name: string
    prize: string
    drawDate: string
    ticketNumber: string
    productId?: string
    raffleDrawTime?: string
    estimated_value?: string
    start_date?: string
    product_no?: string
  }
}

const WinningAdviceModal: React.FC<WinningAdviceModalProps> = ({
  isOpen,
  onClose,
  adviceData
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const page2Ref = useRef<HTMLDivElement>(null)

  if (!isOpen) return null

  const handleDownload = async () => {
    if (!modalRef.current || !page2Ref.current) return

    try {
      // Create canvases for both pages
      const canvas1 = await html2canvas(modalRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      })

      const canvas2 = await html2canvas(page2Ref.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      })

      // Create PDF and derive scaling from page width
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const imgHeight1 = (canvas1.height * pageWidth) / canvas1.width
      const imgHeight2 = (canvas2.height * pageWidth) / canvas2.width

      // Add first page using exact content height to avoid extra spacing
      const pdfPageSize = pdf.internal.pageSize as unknown as {
        width: number
        height: number
        getWidth: () => number
        getHeight: () => number
      }

      pdfPageSize.width = pageWidth
      pdfPageSize.height = imgHeight1
      const imgData1 = canvas1.toDataURL('image/png')
      pdf.addImage(imgData1, 'PNG', 0, 0, pageWidth, imgHeight1)

      // Add second page with same width and tailored height
      pdf.addPage()
      pdfPageSize.width = pageWidth
      pdfPageSize.height = imgHeight2
      const imgData2 = canvas2.toDataURL('image/png')
      pdf.addImage(imgData2, 'PNG', 0, 0, pageWidth, imgHeight2)

      // Save the PDF
      pdf.save('winning-advice.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  return (
    <div
      className='fixed inset-0 z-50 flex flex-col items-center justify-start overflow-y-auto bg-black/40 p-2 sm:p-4'
      onClick={onClose}
    >
      <div className='sm:min-h-auto flex min-h-full w-full max-w-[850px] flex-col gap-2 sm:gap-4'>
        <div
          className='relative bg-white shadow-2xl'
          onClick={e => e.stopPropagation()}
        >
          {/* Download Button */}
          <button
            className='absolute -left-3 -top-3 z-10 rounded-full border bg-white p-2 text-xl text-gray-500 shadow-lg transition hover:text-[#F25E26]'
            onClick={handleDownload}
            aria-label='Download'
            type='button'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
              <polyline points='7 10 12 15 17 10' />
              <line x1='12' y1='15' x2='12' y2='3' />
            </svg>
          </button>

          {/* Close Icon */}
          <button
            className='absolute -right-3 -top-3 z-10 rounded-full border bg-white p-2 text-xl text-gray-500 shadow-lg transition hover:text-[#F25E26]'
            onClick={onClose}
            aria-label='Close'
            type='button'
          >
            <X size={16} />
          </button>

          {/* PAGE 1 */}
          <div
            ref={modalRef}
            className='relative mb-4 w-full overflow-hidden rounded-lg border-[6px] border-dotted border-[#F25E26] bg-white p-0 shadow-lg sm:mb-8'
          >
            {/* Background watermark */}
            <div
              className='pointer-events-none absolute inset-0 flex items-center justify-center'
              style={{
                opacity: 0.05,
                transform: 'rotate(-45deg)',
                fontSize: '120px',
                fontWeight: 'bold',
                color: '#F25E26',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              AJIROBA
            </div>

            <div className='relative z-10 p-3'>
              {/* Header with Logo */}
              <div className='mb-6 flex items-center'>
                <div className='flex items-center'>
                  <div className='relative z-10 flex items-center pb-2 pl-6 pt-6'>
                    <Image
                      src={Brand}
                      alt='Ajiroba Logo'
                      width={120}
                      height={40}
                      style={{ width: 120, height: 40 }}
                    />
                  </div>
                </div>
              </div>

              {/* Title with borders */}
              <div className='mb-6 border-b-2 border-t-2 border-black py-2'>
                <h1 className='text-center text-xl font-black tracking-wide text-black'>
                  RAFFLE WINNING ADVICE
                </h1>
              </div>

              {/* Date */}
              <div className='mb-4'>
                <p className='text-sm font-medium text-black'>
                  Date: {adviceData.date}
                </p>
              </div>

              {/* Dear Section */}
              <div className='mb-4'>
                <p className='text-sm text-black'>
                  Dear:{' '}
                  <span className='ml-1 inline-block min-w-[300px] border-b-2 border-dotted border-gray-500 pb-1'>
                    {' '}
                    {adviceData.name}
                  </span>
                </p>
              </div>

              {/* Main Content */}
              <div className='mb-4'>
                <p className='mb-4 text-sm leading-relaxed text-black'>
                  This is to confirm that you have won in our raffle draw. Below
                  are the details of your winning:
                </p>

                <div className='ml-2 flex flex-col space-y-2 sm:ml-4 md:ml-8'>
                  <div className='flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-0'>
                    <span className='min-w-[120px] text-xs text-black sm:min-w-[160px] sm:text-sm'>
                      Item Won:
                    </span>
                    <span className='font-b w-full border-b-2 border-dotted border-gray-500 pb-1 text-xs text-black sm:ml-1 sm:flex-1 sm:text-sm font-bold '>
                      {adviceData.prize}
                    </span>
                  </div>

                  <div className='flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-0'>
                    <span className='min-w-[120px] text-xs text-black sm:min-w-[160px] sm:text-sm'>
                      Product ID:
                    </span>
                    <span className='w-full border-b-2 border-dotted border-gray-500 pb-1 text-xs text-black sm:ml-1 sm:flex-1 sm:text-sm'>
                      {adviceData.product_no}
                    </span>
                  </div>

                  <div className='flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-0'>
                    <span className='min-w-[120px] text-xs text-black sm:min-w-[160px] sm:text-sm'>
                      Your Winning Ticket:
                    </span>
                    <span className='w-full border-b-2 border-dotted border-gray-500 pb-1 text-xs text-black sm:ml-1 sm:flex-1 sm:text-sm'>
                      {adviceData.ticketNumber}
                    </span>
                  </div>

                  <div className='flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-0'>
                    <span className='min-w-[120px] text-xs text-black sm:min-w-[160px] sm:text-sm'>
                      Raffle Draw Date:
                    </span>
                    <span className='w-full border-b-2 border-dotted border-gray-500 pb-1 text-xs text-black sm:ml-1 sm:flex-1 sm:text-sm'>
                      {adviceData.drawDate
                        ? (() => {
                            const dateObj = new Date(adviceData.drawDate)
                            if (isNaN(dateObj.getTime()))
                              return adviceData.drawDate
                            return dateObj.toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })
                          })()
                        : ''}
                    </span>
                  </div>

                  <div className='flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-0'>
                    <span className='min-w-[120px] text-xs text-black sm:min-w-[160px] sm:text-sm'>
                      Raffle Draw Time:
                    </span>
                    <span className='w-full border-b-2 border-dotted border-gray-500 pb-1 text-xs text-black sm:ml-1 sm:flex-1 sm:text-sm'>
                      {adviceData.raffleDrawTime}
                    </span>
                  </div>

                  <div className='flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-0'>
                    <span className='min-w-[120px] text-xs text-black sm:min-w-[180px] sm:text-sm'>
                      Estimated Market Value of Item:
                    </span>
                    <span className='w-full border-b-2 border-dotted border-gray-500 pb-1 text-xs text-black sm:ml-1 sm:flex-1 sm:text-sm font-bold'>
                      {formatCurrency(adviceData.estimated_value)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className='mb-4'>
                <p className='text-sm leading-relaxed text-black'>
                  Kindly proceed to your Ajiroba dashboard to redeem your winning{' '}
                  <span className="italic">(you can check page 2 of this letter for steps to redeem your winning)</span>
                </p>
              </div>


              <div className='mb-4'>
                <p className='text-sm leading-relaxed text-black'>
                   For any clarification, kindly contact us
                  via the channels at the bottom of this letter.
                </p>
              </div>

              <div className='mb-6'>
                <p className='text-sm leading-relaxed text-black'>
                  Thank you for patronising us.
              
                  <br />
               
                </p>
              </div>

              <div className=''>
                <p className='text-sm leading-relaxed text-black font-bold italic'>
                Keep buying tickets,keep winning!!!
                  <br />
                </p>
              </div>


              <div className='mb-6'>
                <p className='text-sm leading-relaxed text-black '>
              
                  <br />
                  <p>CONGRATULATIONS!!!</p>
                </p>
              </div>

              {/* Signature Section */}
              <div className='mb-8 flex items-end justify-between'>
                <div>
                  <div className='text-sm text-black'>
                    <div>
                      <strong>For:</strong> Ajiroba Technologies Ltd
                    </div>


                  <div className='my-4 flex items-center justify-start'>
                    <img
                      src={mrsajirobasignature.src}
                      alt='Signature of Mrs Ajiroba'
                      className='h-auto w-[160px] max-w-full'
                    />
                  </div>
                    <div className='my-5'>
                      <strong>CHIEF (MRS) AYOOLA. A</strong>
                    </div>
                    <div>
                      The Yeye Ajiroba and MD/CEO
                    </div>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-sm font-medium text-black'>Page 1</p>
                </div>
              </div>

           




              {/* Footer Contact Info */}
<div className='rounded-md bg-[#F1F1F1] p-3 text-xs'>
  {/* Contact: 2×2 grid on mobile, inline row on desktop */}
  <div className='grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-4'>
    <div className='flex items-center gap-1.5 sm:border-r sm:border-gray-400 sm:pr-4'>
      <PhoneCall size={12} className='flex-shrink-0 text-black' />
      <div className='flex flex-col leading-tight'>
        <span className='text-[10px] text-black underline underline-offset-2 sm:text-xs'>
          Customer careline
        </span>
        <span className='text-[10px] font-semibold text-[#2A2A2A] sm:text-xs'>
          07038809512
        </span>
      </div>
    </div>

    <div className='flex items-center gap-1.5 sm:border-r sm:border-gray-400 sm:pr-4'>
      <MailIcon size={12} className='flex-shrink-0 text-black' />
      <div className='flex flex-col leading-tight'>
        <span className='text-[10px] text-black underline underline-offset-2 sm:text-xs'>
          Email
        </span>
        <span className='text-[10px] font-semibold text-[#2A2A2A] sm:text-xs'>
          support@ajiroba.com
        </span>
      </div>
    </div>

    <div className='flex items-center gap-1.5 sm:border-r sm:border-gray-400 sm:pr-4'>
      <BsInstagram size={12} className='flex-shrink-0 text-black' />
      <div className='flex flex-col leading-tight'>
        <span className='text-[10px] text-black underline underline-offset-2 sm:text-xs'>
          Instagram
        </span>
        <span className='text-[10px] font-semibold text-[#2A2A2A] sm:text-xs'>
          @ajiroba.com
        </span>
      </div>
    </div>

    <div className='flex items-center gap-1.5'>
      <GlobeIcon size={12} className='flex-shrink-0 text-black' />
      <div className='flex flex-col leading-tight'>
        <span className='text-[10px] text-black underline underline-offset-2 sm:text-xs'>
          Website
        </span>
        <span className='text-[10px] font-semibold text-[#2A2A2A] sm:text-xs'>
          www.ajiroba.com
        </span>
      </div>
    </div>
  </div>

  {/* App Stores */}
  <div className='mt-3 flex justify-center gap-2 sm:mt-0 sm:justify-end'>
    <div className='flex items-center gap-1.5 rounded bg-black px-3 py-1.5'>
      <SmartphoneIcon size={14} className='flex-shrink-0 text-white' />
      <div className='flex flex-col leading-tight'>
        <span className='text-[7px] text-white opacity-80'>
          GET IT ON
        </span>
        <span className='text-[9px] font-semibold text-white'>
          Google Play
        </span>
      </div>
    </div>

    <div className='flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5'>
      <BsApple size={14} className='flex-shrink-0 text-black' />
      <div className='flex flex-col leading-tight'>
        <span className='text-[7px] text-black opacity-70'>
          Download on the
        </span>
        <span className='text-[9px] font-semibold text-black'>
          App Store
        </span>
      </div>
    </div>
  </div>
</div>



            </div>
          </div>
        </div>

        <div
          className='relative bg-white shadow-2xl'
          onClick={e => e.stopPropagation()}
        >
          {/* Close Icon */}
          <button
            className='absolute -right-3 -top-3 z-10 rounded-full border bg-white p-2 text-xl text-gray-500 shadow-lg transition hover:text-[#F25E26]'
            onClick={onClose}
            aria-label='Close'
            type='button'
          >
            <X size={16} />
          </button>

          {/* PAGE 2 */}
          <div
            ref={page2Ref}
            className='relative w-full overflow-hidden rounded-lg bg-white p-0 shadow-lg'
          >
            {/* Background watermark */}
            <div
              className='pointer-events-none absolute inset-0 flex items-center justify-center'
              style={{
                opacity: 0.05,
                transform: 'rotate(-45deg)',
                fontSize: '120px',
                fontWeight: 'bold',
                color: '#F25E26',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              AJIROBA
            </div>

            <div className='relative z-10 p-3'>
              {/* Header with Logo */}
              <div className='mb-6 flex items-center'>
                <div className='flex items-center'>
                  <div className='relative z-10 flex items-center pb-2 pl-6 pt-6'>
                    <Image
                      src={Brand}
                      alt='Ajiroba Logo'
                      width={120}
                      height={40}
                      style={{ width: 120, height: 40 }}
                    />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className='mb-6 sm:mb-8'>
                <h1 className='text-center text-lg font-black text-black sm:text-left sm:text-xl'>
                  STEPS FOR REDEEMING YOUR PRODUCT
                </h1>
              </div>

              {/* Steps */}
              <div className='mb-6 space-y-3 sm:mb-8 sm:space-y-4'>
                <div className='flex'>
                  <span className='mr-2 text-xs font-medium text-black sm:text-sm'>
                    1.
                  </span>
                  <span className='text-xs text-black sm:text-sm'>
                    Login to your dashboard.
                  </span>
                </div>
                <div className='flex'>
                  <span className='mr-2 text-xs font-medium text-black sm:text-sm'>
                    2.
                  </span>
                  <span className='text-xs text-black sm:text-sm'>
                    Click on profile under the account menu
                  </span>
                </div>

                <div className='flex'>
                  <span className='mr-2 text-xs font-medium text-black sm:text-sm'>
                    3.
                  </span>
                  <span className='text-xs text-black sm:text-sm'>
                    Click on Redeem item which is highlighted in the blue tab
                  </span>
                </div>

                <div className='flex'>
                  <span className='mr-2 text-xs font-medium text-black sm:text-sm'>
                    4.
                  </span>
                  <span className='text-xs text-black sm:text-sm'>
                    Select your preferred means of redemption (physical
                    delivery, gift voucher or cash transfer)
                  </span>
                </div>

                <div className='flex'>
                  <span className='mr-2 text-xs font-medium text-black sm:text-sm'>
                    5.
                  </span>
                  <span className='text-xs text-black sm:text-sm'>
                    Then follow the steps as directed by any of the redemption
                    options you choose.
                  </span>
                </div>
              </div>

              <div className='mt-4   bg-white p-1 text-xs text-black shadow-sm  sm:text-sm'>
                <h2 className='text-sm font-semibold text-black sm:text-base'>
                  Need further Support?
                </h2>
                <p className='mb-4 mt-2 text-xs text-black sm:text-sm'>
                  Contact our customer care below.
                </p>
                <div className='flex flex-col  gap-3 sm:flex-row sm:gap-6'>
                  <div>
                    <p className=' underline underline-offset-2 text-black font-bold'>
                      Customer Careline
                    </p>
                    <p className='text-xs text-black sm:text-sm'>07038809512</p>
                  </div>
                  <div>
                    <p className=' underline underline-offset-2 text-black font-bold'>
                      Email
                    </p>
                    <p className='text-xs text-black sm:text-sm'>support@ajiroba.com</p>
                  </div>
                </div>
              </div>

              {/* Minimal spacer before footer */}
              <div className='h-6 sm:h-8 md:h-10'></div>

              {/* Bottom quote */}
              <div className='mb-4 text-center sm:mb-6'>
                <p className='text-xs italic text-black sm:text-sm'>
                  ...The more ticket you buy, the more your chances of winning
                </p>
              </div>

              {/* Page number */}
              <div className='mb-4 flex justify-end'>
                <p className='text-sm font-medium text-black'>Page 2</p>
              </div>

            



              {/* Footer Contact Info */}
<div className='rounded-md bg-[#F1F1F1] p-3 text-xs'>
  {/* Contact: 2×2 grid on mobile, inline row on desktop */}
  <div className='grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-4'>
    <div className='flex items-center gap-1.5 sm:border-r sm:border-gray-400 sm:pr-4'>
      <PhoneCall size={12} className='flex-shrink-0 text-black' />
      <div className='flex flex-col leading-tight'>
        <span className='text-[10px] text-black underline underline-offset-2 sm:text-xs'>
          Customer careline
        </span>
        <span className='text-[10px] font-semibold text-[#2A2A2A] sm:text-xs'>
          07038809512
        </span>
      </div>
    </div>

    <div className='flex items-center gap-1.5 sm:border-r sm:border-gray-400 sm:pr-4'>
      <MailIcon size={12} className='flex-shrink-0 text-black' />
      <div className='flex flex-col leading-tight'>
        <span className='text-[10px] text-black underline underline-offset-2 sm:text-xs'>
          Email
        </span>
        <span className='text-[10px] font-semibold text-[#2A2A2A] sm:text-xs'>
          support@ajiroba.com
        </span>
      </div>
    </div>

    <div className='flex items-center gap-1.5 sm:border-r sm:border-gray-400 sm:pr-4'>
      <BsInstagram size={12} className='flex-shrink-0 text-black' />
      <div className='flex flex-col leading-tight'>
        <span className='text-[10px] text-black underline underline-offset-2 sm:text-xs'>
          Instagram
        </span>
        <span className='text-[10px] font-semibold text-[#2A2A2A] sm:text-xs'>
          @ajiroba.com
        </span>
      </div>
    </div>

    <div className='flex items-center gap-1.5'>
      <GlobeIcon size={12} className='flex-shrink-0 text-black' />
      <div className='flex flex-col leading-tight'>
        <span className='text-[10px] text-black underline underline-offset-2 sm:text-xs'>
          Website
        </span>
        <span className='text-[10px] font-semibold text-[#2A2A2A] sm:text-xs'>
          www.ajiroba.com
        </span>
      </div>
    </div>
  </div>

  {/* App Stores */}
  <div className='mt-3 flex justify-center gap-2 sm:mt-0 sm:justify-end'>
    <div className='flex items-center gap-1.5 rounded bg-black px-3 py-1.5'>
      <SmartphoneIcon size={14} className='flex-shrink-0 text-white' />
      <div className='flex flex-col leading-tight'>
        <span className='text-[7px] text-white opacity-80'>
          GET IT ON
        </span>
        <span className='text-[9px] font-semibold text-white'>
          Google Play
        </span>
      </div>
    </div>

    <div className='flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5'>
      <BsApple size={14} className='flex-shrink-0 text-black' />
      <div className='flex flex-col leading-tight'>
        <span className='text-[7px] text-black opacity-70'>
          Download on the
        </span>
        <span className='text-[9px] font-semibold text-black'>
          App Store
        </span>
      </div>
    </div>
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WinningAdviceModal
