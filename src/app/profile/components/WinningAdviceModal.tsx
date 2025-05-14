import React from "react";
import Image from "next/image";
import Brand from "@/app/asset/logo.svg";
import WinningAdviceBg from "@/app/asset/image/winningadvicebg.svg";
import Barcode from "@/app/asset/image/barcode.svg";
import { IoMdClose } from "react-icons/io";

// You can add winner image if needed
// import WinnerImg from "@/app/asset/image/winner.png";

export type WinningAdviceModalProps = {
    isOpen: boolean;
    onClose: () => void;
    adviceData: {
        date: string;
        name: string;
        prize: string;
        drawDate: string;
        ticketNumber: string;
        // barcode?: string;
    };
};

const WinningAdviceModal: React.FC<WinningAdviceModalProps> = ({
    isOpen,
    onClose,
    adviceData,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2 py-4 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-[700px] rounded-xl shadow-2xl overflow-hidden bg-white"
                style={{
                    backgroundImage: `url(${'/winningadvicebg.svg'}) center/cover no-repeat, #fff`,
                }}

                /*  style={{
                     backgroundImage: "url('/winningadvicebg.svg')",  // Add your image path here
                      backgroundSize: "33.33%",
                     backgroundPosition: "center",
                     backgroundRepeat: "repeat-x",

                 }} */
                onClick={e => e.stopPropagation()}
            >
                {/* Close Icon */}
                <button
                    className="absolute top-4 right-4 z-10 text-2xl text-gray-500 hover:text-[#F25E26] transition"
                    onClick={onClose}
                    aria-label="Close"
                    type="button"
                >
                    <IoMdClose />
                </button>

                {/* Header */}
                <div className="flex items-center justify-between px-8 pt-6 pb-2">
                    <Image src={Brand} alt="Ajiroba Logo" width={120} height={40} />
                    <div className="text-right">
                        <div className="text-xs text-gray-500 font-medium">Ajiroba Auction</div>
                        <div className="text-lg font-bold text-gray-800">Winning Advice</div>
                    </div>
                </div>

                {/* Winning Title */}
                <div className="flex items-center justify-between px-8 pt-2 pb-0">
                    <div>
                        <span className="block text-[2.5rem] font-extrabold text-[#F25E26] leading-none tracking-tight drop-shadow-sm">
                            Winning
                        </span>
                        <span className="block text-lg font-semibold text-gray-700 -mt-2">
                            Advice
                        </span>
                    </div>
                    <div style={{
                        backgroundImage: "url('/winningadvicebg.svg')",  // Add your image path here
                        backgroundSize: "100%",
                        backgroundPosition: "center",
                        backgroundRepeat: "repeat-x",

                    }} className="">
                        {/* Replace with your winner image if available */}

                    </div>
                </div>

                {/* Main Content */}
                <div className="px-8 py-2">
                    <div className="flex justify-between items-center mt-2 mb-4">
                        <div className="text-sm text-gray-700 font-medium">
                            Date: <span className="font-semibold">{adviceData.date}</span>
                        </div>
                        <button
                            className="bg-[#F25E26] text-white px-5 py-1.5 rounded font-semibold text-sm shadow"
                            onClick={onClose}
                        >
                            Print
                        </button>
                    </div>

                    <div className="text-lg font-bold text-gray-800 mb-2 flex flex-wrap items-center gap-2">
                        <span className="font-cursive text-2xl text-[#F25E26]">Congratulations!</span>
                        <span className="font-mono underline text-xl">{adviceData.name}</span>
                    </div>

                    <div className="text-base text-gray-700 mb-2">
                        You have won <span className="font-bold underline">{adviceData.prize}</span> in our draw which took place on <span className="font-bold underline">{adviceData.drawDate}</span> with your ticket number <span className="font-bold underline">{adviceData.ticketNumber}</span>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                        <span className="italic">
                            Kindly log in to your dashboard to specify your preferred mode of redemption.<br />
                            Thank you for your patronage
                        </span>
                    </div>

                    <div className="flex justify-between items-end mt-6">
                        <div>
                            <div className="font-bold text-gray-800">Ayoola Ayodele</div>
                            <div className="text-xs text-gray-600">MD/CEO & Yeye Ajiroba</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-600 mb-1">Bar Code</span>
                            <Image src={Barcode} alt="Barcode" width={70} height={30} />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-[#F25E26] text-white text-xs flex justify-between items-center px-8 py-2 mt-4">
                    <span>www.ajiroba.com</span>
                    <span>ajiroba@gmail.com</span>
                    <span>08123940496</span>
                </div>
            </div>
        </div>
    );
};

export default WinningAdviceModal;