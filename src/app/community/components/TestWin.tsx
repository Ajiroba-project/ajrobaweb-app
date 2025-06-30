import React, { useRef } from "react";
import { GlobeIcon, MailIcon, PhoneCall, SmartphoneIcon, X } from "lucide-react";
import Image from "next/image";
import Brand from "@/app/asset/logo.svg";
import { Phone, Mail, Instagram, Globe, Smartphone, Apple } from 'lucide-react';
import { BsApple, BsInstagram } from "react-icons/bs";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAuthStore } from "@/store/store";
import { useGetDatanew } from "@/hooks/useGetData";

export type WinningAdviceModalProps = {
    isOpen: boolean;
    onClose: () => void;
    adviceData: {
        date: string;
        name: string;
        prize: string;
        drawDate: string;
        ticketNumber: string;
        productId?: string;
        raffleDrawTime?: string;
        estimated_value?: string;
        start_date?: string
    };
};




const WinningAdviceModal: React.FC<WinningAdviceModalProps> = ({
    isOpen,
    onClose,
    adviceData,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const page2Ref = useRef<HTMLDivElement>(null);

    if (!isOpen) return null;

    const handleDownload = async () => {
        if (!modalRef.current || !page2Ref.current) return;

        try {
            // Create canvases for both pages
            const canvas1 = await html2canvas(modalRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
            });

            const canvas2 = await html2canvas(page2Ref.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
            });

            // Create PDF with both pages
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas1.width, canvas1.height * 2] // Double height to accommodate both pages
            });

            // Add first page
            const imgData1 = canvas1.toDataURL('image/png');
            pdf.addImage(imgData1, 'PNG', 0, 0, canvas1.width, canvas1.height);

            // Add second page
            const imgData2 = canvas2.toDataURL('image/png');
            pdf.addImage(imgData2, 'PNG', 0, canvas1.height, canvas2.width, canvas2.height);

            // Save the PDF
            pdf.save('winning-advice.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    /*   const { isLoggedIn, user, token } = useAuthStore((state) => ({
          isLoggedIn: state.isLoggedIn,
          user: state.user,
          token: state.token,
      }));
   */


    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-black/40 px-2 py-4 overflow-y-auto"
            onClick={onClose}
        >
            <div className="flex flex-col gap-4 w-full max-w-[850px]">
                <div
                    ref={modalRef}
                    className="relative bg-white shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Download Button */}
                    <button
                        className="absolute -top-3 -left-3 z-10 bg-white rounded-full p-2 text-xl text-gray-500 hover:text-[#F25E26] transition shadow-lg border"
                        onClick={handleDownload}
                        aria-label="Download"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </button>

                    {/* Close Icon */}
                    <button
                        className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-2 text-xl text-gray-500 hover:text-[#F25E26] transition shadow-lg border"
                        onClick={onClose}
                        aria-label="Close"
                        type="button"
                    >
                        <X size={16} />
                    </button>

                    {/* PAGE 1 */}
                    <div className="bg-white rounded-lg shadow-lg mb-8 p-0" style={{ border: '6px dotted #F25E26' }}>
                        {/* Background watermark */}
                        <div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
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

                        <div className="relative z-10 p-6">
                            {/* Header with Logo */}
                            <div className="flex items-center mb-6">
                                <div className="flex items-center">
                                    <div className="flex items-center pt-6 pl-6 pb-2 z-10 relative">
                                        <Image src={Brand} alt="Ajiroba Logo" width={120} height={40} style={{ width: 120, height: 40 }} />
                                    </div>
                                </div>
                            </div>

                            {/* Title with borders */}
                            <div className="border-t-2 border-b-2 border-black py-2 mb-6">
                                <h1 className="text-xl font-black text-center text-black tracking-wide">
                                    RAFFLE DRAW WINNING ADVICE LETTER
                                </h1>
                            </div>

                            {/* Date */}
                            <div className="mb-4">
                                <p className="text-sm font-medium text-black">
                                    Date: {adviceData.date}
                                </p>
                            </div>

                            {/* Dear Section */}
                            <div className="mb-4">
                                <p className="text-sm text-black">
                                    Dear: <span className="border-b-2 border-dotted border-gray-500 inline-block min-w-[300px] pb-1 ml-1"> {adviceData.name}</span>
                                </p>
                            </div>

                            {/* Main Content */}
                            <div className="mb-4">
                                <p className="text-sm leading-relaxed mb-4 text-black">
                                    This is to confirm that you have won in our raffle draw. Below are the details of your winning:
                                </p>

                                <div className="space-y-2 ml-4 sm:ml-8 flex flex-col">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
                                        <span className="text-sm min-w-[160px] text-black">Item Won:</span>
                                        <span className="border-b-2 border-dotted border-gray-500 w-full sm:flex-1 pb-1 text-sm text-black sm:ml-1">{adviceData.prize}</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
                                        <span className="text-sm min-w-[160px] text-black">Product ID:</span>
                                        <span className="border-b-2 border-dotted border-gray-500 w-full sm:flex-1 pb-1 text-sm text-black sm:ml-1">{adviceData.productId}</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
                                        <span className="text-sm min-w-[160px] text-black">Your Winning Ticket:</span>
                                        <span className="border-b-2 border-dotted border-gray-500 w-full sm:flex-1 pb-1 text-sm text-black sm:ml-1">{adviceData.ticketNumber}</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
                                        <span className="text-sm min-w-[160px] text-black">Raffle Draw Date:</span>
                                        <span className="border-b-2 border-dotted border-gray-500 w-full sm:flex-1 pb-1 text-sm text-black sm:ml-1">{adviceData.drawDate}</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
                                        <span className="text-sm min-w-[160px] text-black">Raffle Draw Time:</span>
                                        <span className="border-b-2 border-dotted border-gray-500 w-full sm:flex-1 pb-1 text-sm text-black sm:ml-1">{adviceData.raffleDrawTime}</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
                                        <span className="text-sm min-w-[160px] text-black">Estimated Market Value of Item:</span>
                                        <span className="border-b-2 border-dotted border-gray-500 w-full sm:flex-1 pb-1 text-sm text-black sm:ml-1">{adviceData.estimated_value}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="mb-4">
                                <p className="text-sm leading-relaxed text-black">
                                    Kindly proceed to your Ajiroba dashboard to redeem your winning (you can check page 2 of this letter for steps to redeem your winning) For any clarification, kindly contact us via the channneels at the bottom of this letter.
                                </p>
                            </div>

                            <div className="mb-6">
                                <p className="text-sm leading-relaxed text-black">
                                    Thank you for patronising us. Keep buying tickets, keep winning!!!<br />
                                    <strong>CONGRATULATIONS!!</strong>
                                </p>
                            </div>

                            {/* Signature Section */}
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <p className="text-sm text-black">
                                        <strong>For:</strong> Ajiroba Technologies Ltd<br />
                                        <strong>MRS AYOOLA A</strong><br />
                                        The Yeye Ajiroba and MD/CEO
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-black">Page 1</p>
                                </div>
                            </div>

                            {/* Footer Contact Info */}
                            <div className="flex flex-wrap items-start gap-4 sm:gap-6 bg-[#F1F1F1] rounded-md p-3 text-xs">

                                {/* Customer careline */}
                                <div className="flex flex-col pr-4 sm:pr-6 border-r border-gray-400">
                                    <div className="flex items-center gap-1 mb-1">
                                        <PhoneCall size={12} className="text-black" />
                                        <span className="text-black underline underline-offset-2">Customer careline</span>
                                    </div>
                                    <div className="text-[#2A2A2A] font-semibold">07038808512</div>
                                </div>

                                {/* Email */}
                                <div className="flex flex-col pr-4 sm:pr-6 border-r border-gray-400">
                                    <div className="flex items-center gap-1 mb-1">
                                        <MailIcon size={12} className="text-black" />
                                        <span className="text-black underline underline-offset-2">Email</span>
                                    </div>
                                    <div className="text-[#2A2A2A] font-semibold">support@ajiroba.com</div>
                                </div>

                                {/* Instagram */}
                                <div className="flex flex-col pr-4 sm:pr-6 border-r border-gray-400">
                                    <div className="flex items-center gap-1 mb-1">
                                        <BsInstagram size={12} className="text-black" />
                                        <span className="text-black underline underline-offset-2">Instagram</span>
                                    </div>
                                    <div className="text-[#2A2A2A] font-semibold">@ajiroba.com</div>
                                </div>

                                {/* Website */}
                                <div className="flex flex-col pr-2 sm:pr-4">
                                    <div className="flex items-center gap-1 mb-1">
                                        <GlobeIcon size={12} className="text-black" />
                                        <span className="text-black underline underline-offset-2">Website</span>
                                    </div>
                                    <div className="text-[#2A2A2A] font-semibold">www.ajiroba.com</div>
                                </div>

                                {/* App Store Buttons */}
                                <div className="flex flex-col gap-1 ml-0 sm:ml-4 mt-4 sm:mt-0">
                                    {/* Google Play Store */}
                                    <div className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded text-[10px]">
                                        <SmartphoneIcon size={16} className="text-white" />
                                        <div className="flex flex-col leading-tight">
                                            <div className="text-[8px] opacity-80">GET IT ON</div>
                                            <div className="text-[10px] font-semibold">Google Play</div>
                                        </div>
                                    </div>

                                    {/* App Store */}
                                    <div className="flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded border border-gray-300 text-[10px]">
                                        <BsApple size={16} className="text-black" />
                                        <div className="flex flex-col leading-tight">
                                            <div className="text-[8px] opacity-70">Download on the</div>
                                            <div className="text-[10px] font-semibold">App Store</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div
                    ref={page2Ref}
                    className="relative bg-white shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close Icon */}
                    <button
                        className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-2 text-xl text-gray-500 hover:text-[#F25E26] transition shadow-lg border"
                        onClick={onClose}
                        aria-label="Close"
                        type="button"
                    >
                        <X size={16} />
                    </button>

                    {/* PAGE 2 */}
                    <div className="bg-white rounded-lg shadow-lg p-0" style={{ border: '6px dotted #F25E26' }}>
                        {/* Background watermark */}
                        <div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
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

                        <div className="relative z-10 p-6">
                            {/* Header with Logo */}
                            <div className="flex items-center mb-6">
                                <div className="flex items-center">
                                    <div className="flex items-center pt-6 pl-6 pb-2 z-10 relative">
                                        <Image src={Brand} alt="Ajiroba Logo" width={120} height={40} style={{ width: 120, height: 40 }} />
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="mb-8">
                                <h1 className="text-xl font-black text-black">
                                    STEPS FOR REDEEMING YOUR PRODUCT
                                </h1>
                            </div>

                            {/* Steps */}
                            <div className="space-y-4 mb-8">
                                <div className="flex">
                                    <span className="text-sm font-medium text-black mr-2">1.</span>
                                    <span className="text-sm text-black">Login to you dashboard.</span>
                                </div>
                                <div className="flex">
                                    <span className="text-sm font-medium text-black mr-2">2.</span>
                                    <span className="text-sm text-black">Proceed to your profile, and select &quot;Auction Wins&quot;</span>
                                </div>
                                <div className="flex">
                                    <span className="text-sm font-medium text-black mr-2">3.</span>
                                    <span className="text-sm text-black">Select &quot;download winning advice&quot; button to download your winning letter.</span>
                                </div>
                            </div>

                            {/* Spacer for content */}
                            <div style={{ height: '200px' }}></div>

                            {/* Bottom quote */}
                            <div className="text-center mb-6">
                                <p className="text-sm italic text-black">
                                    ...The more ticket you buy, the more your chances of winning
                                </p>
                            </div>

                            {/* Page number */}
                            <div className="flex justify-end mb-4">
                                <p className="text-sm font-medium text-black">Page 2</p>
                            </div>

                            {/* Footer Contact Info */}
                            <div className="flex flex-wrap items-start gap-4 sm:gap-6 bg-[#F1F1F1] rounded-md p-3 text-xs">

                                {/* Customer careline */}
                                <div className="flex flex-col pr-4 sm:pr-6 border-r border-gray-400">
                                    <div className="flex items-center gap-1 mb-1">
                                        <PhoneCall size={12} className="text-black" />
                                        <span className="text-black underline underline-offset-2">Customer careline</span>
                                    </div>
                                    <div className="text-[#2A2A2A] font-semibold">07038808512</div>
                                </div>

                                {/* Email */}
                                <div className="flex flex-col pr-4 sm:pr-6 border-r border-gray-400">
                                    <div className="flex items-center gap-1 mb-1">
                                        <MailIcon size={12} className="text-black" />
                                        <span className="text-black underline underline-offset-2">Email</span>
                                    </div>
                                    <div className="text-[#2A2A2A] font-semibold">support@ajiroba.com</div>
                                </div>

                                {/* Instagram */}
                                <div className="flex flex-col pr-4 sm:pr-6 border-r border-gray-400">
                                    <div className="flex items-center gap-1 mb-1">
                                        <BsInstagram size={12} className="text-black" />
                                        <span className="text-black underline underline-offset-2">Instagram</span>
                                    </div>
                                    <div className="text-[#2A2A2A] font-semibold">@ajiroba.com</div>
                                </div>

                                {/* Website */}
                                <div className="flex flex-col pr-4 sm:pr-6">
                                    <div className="flex items-center gap-1 mb-1">
                                        <GlobeIcon size={12} className="text-black" />
                                        <span className="text-black underline underline-offset-2">Website</span>
                                    </div>
                                    <div className="text-[#2A2A2A] font-semibold">www.ajiroba.com</div>
                                </div>

                                {/* App Store Buttons */}
                                <div className="flex flex-col gap-1 ml-0 sm:ml-4 mt-4 sm:mt-0">
                                    {/* Google Play Store */}
                                    <div className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded text-[10px]">
                                        <SmartphoneIcon size={16} className="text-white" />
                                        <div className="flex flex-col leading-tight">
                                            <div className="text-[8px] opacity-80">GET IT ON</div>
                                            <div className="text-[10px] font-semibold">Google Play</div>
                                        </div>
                                    </div>

                                    {/* App Store */}
                                    <div className="flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded border border-gray-300 text-[10px]">
                                        <BsApple size={16} className="text-black" />
                                        <div className="flex flex-col leading-tight">
                                            <div className="text-[8px] opacity-70">Download on the</div>
                                            <div className="text-[10px] font-semibold">App Store</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WinningAdviceModal;

