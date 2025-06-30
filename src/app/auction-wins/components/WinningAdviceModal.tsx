import React, { useState, useRef } from "react";
import Image from "next/image";
import Brand from "@/app/asset/logo.svg";
import { IoMdClose } from "react-icons/io";
import html2canvas from "html2canvas";

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

const footerLinks = [
    { label: "Customer careline", value: "07038809512" },
    { label: "Email", value: "support@ajiroba.com" },
    { label: "Instagram", value: "@ajiroba.com" },
    { label: "Website", value: "www.ajiroba.com" },
];

const WinningAdviceModal: React.FC<WinningAdviceModalProps> = ({
    isOpen,
    onClose,
    adviceData,
}) => {
    const [page, setPage] = useState(1);
    const printRef = useRef<HTMLDivElement>(null);

    if (!isOpen) return null;

    // Print/download logic
    const handlePrint = async () => {
        if (!printRef.current) return;
        const canvas = await html2canvas(printRef.current, {
            backgroundColor: "#fff",
            scale: 2,
            useCORS: true,
        });
        const link = document.createElement("a");
        link.download = `winning-advice-page${page}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2 py-4 overflow-y-auto"
            onClick={onClose}
        >
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;900&display=swap');
                .ajiroba-modal * {
                    font-family: 'Montserrat', Arial, sans-serif !important;
                }
            `}</style>
            <div
                className="relative w-full max-w-[540px] rounded-xl shadow-2xl overflow-visible"
                onClick={e => e.stopPropagation()}
                style={{ background: "none" }}
            >
                {/* Close Icon */}
                <button
                    className="absolute top-3 right-3 z-10 text-2xl text-gray-500 hover:text-[#F25E26] transition bg-white rounded-full border border-gray-200 shadow"
                    onClick={onClose}
                    aria-label="Close"
                    type="button"
                >
                    <IoMdClose />
                </button>
                {/* Navigation and Print/Download (not in print) */}
                <div className="flex justify-between items-center mt-3 px-2 pb-2 print:hidden">
                    <button
                        className={`rounded-md border-2 border-[#F25E26] px-4 py-1 text-[#F25E26] font-semibold transition ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F25E26]/10"}`}
                        type="button"
                        onClick={() => setPage(1)}
                        disabled={page === 1}
                    >
                        Back
                    </button>
                    <button
                        className="rounded-md bg-[#F25E26] px-4 py-1 text-white font-semibold shadow hover:bg-[#EA7000] transition"
                        type="button"
                        onClick={handlePrint}
                    >
                        Download
                    </button>
                    <button
                        className={`rounded-md border-2 border-[#F25E26] px-4 py-1 text-[#F25E26] font-semibold transition ${page === 2 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F25E26]/10"}`}
                        type="button"
                        onClick={() => setPage(2)}
                        disabled={page === 2}
                    >
                        Next
                    </button>
                </div>
                {/* Printable Content */}
                <div
                    ref={printRef}
                    className="ajiroba-modal bg-white relative mx-auto"
                    style={{
                        border: "4px dotted #F25E26",
                        borderRadius: 0,
                        width: 464,
                        height: 655,
                        minWidth: 464,
                        minHeight: 655,
                        maxWidth: 464,
                        maxHeight: 655,
                        margin: "0 auto",
                        boxSizing: "border-box",
                        background: "#fff",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    {/* Watermark */}
                    <div style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                        opacity: 0.08,
                        fontWeight: 900,
                        fontSize: 90,
                        letterSpacing: 2,
                        color: "#222",
                        userSelect: "none",
                    }}>
                        <Image src="/ajirobalogo.png" alt="Ajiroba watermark" width={320} height={320} style={{ opacity: 0.12, maxWidth: 320, maxHeight: 320 }} />
                        <span style={{
                            position: "absolute",
                            left: "50%",
                            top: "55%",
                            transform: "translate(-50%, -50%)",
                            fontSize: 64,
                            fontWeight: 900,
                            color: "#222",
                            opacity: 0.08,
                            letterSpacing: 2,
                            whiteSpace: "nowrap",
                        }}>AJÍRÓBA</span>
                    </div>
                    {/* Logo */}
                    <div className="flex items-center pt-6 pl-6 pb-2 z-10 relative">
                        <Image src={Brand} alt="Ajiroba Logo" width={120} height={40} style={{ width: 120, height: 40 }} />
                    </div>
                    {/* Page 1: Winning Advice Letter */}
                    {page === 1 && (
                        <div className="px-8 pt-2 pb-2 flex flex-col min-h-[600px] justify-between z-10 relative" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
                            <div>
                                <h2 className="text-center font-bold text-[1.35rem] tracking-wide mb-2 mt-2" style={{ borderBottom: '2px solid #222', paddingBottom: 6, letterSpacing: 0.5 }}>RAFFLE DRAW WINNING ADVICE LETTER</h2>
                                <div className="flex justify-between text-[0.95rem] text-gray-700 mb-2 mt-6">
                                    <span>Date: <span className="font-medium">{adviceData.date}</span></span>
                                </div>
                                <div className="mb-4 mt-2 text-[1rem]">
                                    <span className="font-medium">Dear: </span>
                                    <span className="inline-block border-b border-gray-400 min-w-[180px] align-middle" style={{ height: 24, verticalAlign: 'middle' }}></span>
                                </div>
                                <div className="text-[1rem] leading-7 text-gray-800 mb-4">
                                    This is to confirm that you have won in our raffle draw. Below are the details of your winning:
                                    <div className="mt-3 ml-2">
                                        <div className="mb-1">Item Won: <span className="inline-block border-b border-gray-400 min-w-[180px] align-middle"></span></div>
                                        <div className="mb-1">Product ID: <span className="inline-block border-b border-gray-400 min-w-[180px] align-middle"></span></div>
                                        <div className="mb-1">Your Winning Ticket: <span className="inline-block border-b border-gray-400 min-w-[180px] align-middle"></span></div>
                                        <div className="mb-1">Raffle Draw Date: <span className="inline-block border-b border-gray-400 min-w-[180px] align-middle"></span></div>
                                        <div className="mb-1">Raffle Draw Time: <span className="inline-block border-b border-gray-400 min-w-[180px] align-middle"></span></div>
                                        <div className="mb-1">Estimated Market Value of Item: <span className="inline-block border-b border-gray-400 min-w-[180px] align-middle"></span></div>
                                    </div>
                                </div>
                                <div className="text-[1rem] text-gray-800 mb-4">
                                    Kindly proceed to your Ajiroba dashboard to redeem your winning (you can check page 2 of this letter for steps to redeem your winning). For any clarification, kindly contact us via the channels at the bottom of this letter.
                                </div>
                                <div className="text-[1rem] text-gray-800 mb-4">
                                    Thank you for patronising us. Keep buying tickets, keep winning!!!<br />
                                    <span className="font-bold">CONGRATULATIONS!!</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 mt-4 mb-2">
                                <div className="text-[1rem] font-bold">For: Ajiroba Technologies Ltd</div>
                                <div className="font-bold text-[1rem]">MRS AYOOLA.A</div>
                                <div className="text-[0.95rem]">The Yeye Ajiroba and MD/CEO</div>
                            </div>
                            <div className="absolute bottom-4 right-8 text-[0.95rem] text-gray-500">Page 1</div>
                        </div>
                    )}
                    {/* Page 2: Steps for Redeeming */}
                    {page === 2 && (
                        <div className="px-8 pt-2 pb-2 flex flex-col min-h-[600px] justify-between z-10 relative" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
                            <div>
                                <h2 className="text-left font-bold text-[1.15rem] tracking-wide mb-2 mt-2" style={{ letterSpacing: 0.5 }}>STEPS FOR REDEEMING YOUR PRODUCT</h2>
                                <ol className="list-decimal ml-6 mt-6 text-[1rem] text-gray-800 space-y-3">
                                    <li>Login to you dashboard.</li>
                                    <li>Proceed to your profile, and select &quot;Auction Wins&quot;</li>
                                    <li>Select &quot;download winning advice&quot; button to download your winning letter.</li>
                                </ol>
                            </div>
                            <div className="text-center text-[0.95rem] italic text-gray-700 mt-8 mb-2">...The more ticket you buy, the more your chances of winning</div>
                            <div className="absolute bottom-4 right-8 text-[0.95rem] text-gray-500">Page 2</div>
                        </div>
                    )}
                    {/* Footer */}
                    <div className="w-full border-t border-gray-200 mt-2 pt-2 pb-1 px-4 flex flex-wrap items-center justify-between text-[0.95rem] text-gray-700 gap-2 z-10 relative" style={{ fontSize: 13 }}>
                        <div className="flex flex-wrap gap-4 items-center w-full justify-between">
                            <div className="flex items-center gap-1"><span className="font-semibold">Customer careline</span> <span className="ml-1">07038809512</span></div>
                            <div className="flex items-center gap-1"><span className="font-semibold">Email</span> <span className="ml-1">support@ajiroba.com</span></div>
                            <div className="flex items-center gap-1"><span className="font-semibold">Instagram</span> <span className="ml-1">@ajiroba.com</span></div>
                            <div className="flex items-center gap-1"><span className="font-semibold">Website</span> <span className="ml-1">www.ajiroba.com</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WinningAdviceModal;