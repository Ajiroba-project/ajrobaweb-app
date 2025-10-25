'use client'

import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { Fragment } from 'react';
import { Suspense } from 'react';
import { raffle } from '../static-data';
import { useState } from 'react';
import { CloseAuction } from '../auction-wins/components/CloseAuction';
import { useGetOrderWinsData } from '@/hooks/useGetData';
import Cookies from 'js-cookie';
import { PastAuction } from '../auction-wins/components/PastAuction';

const RaffleVideosPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const totalPages = Math.ceil(raffle.length / itemsPerPage);
    // console.log(totalPages, 'totalPages')
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedRaffle = raffle.slice(startIndex, endIndex);

    const userToken = Cookies.get('token') as string;


  
    const { data: auctioninfo, isLoading: auctionLoading, error: ordererror } = useGetOrderWinsData('/api/auctionwins', "get_auctionwins_details", userToken);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Fragment>
            <header className="fixed z-50 w-full">
                <Header />
            </header>
            <main className="w-full min-h-[80vh] bg-[#fafafa] pt-[13vh] pb-8 flex flex-col items-center">
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-2xl font-bold mb-8 mt-4 text-[#2A2A2A]">Past Raffle Draws</h2>
                    <div className="flex justify-center">
                        <small className="text-center text-sm text-gray-500 mb-8">
                            Click on the image to view the past raffle draws.
                        </small>
                    </div>

                    {/* <div className="flex flex-col gap-6">
                        {paginatedRaffle.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
                            >
                               
                                <div className="relative flex-shrink-0 w-full md:w-60 h-44 bg-black">
                                    <iframe
                                        className="w-full h-full"
                                        src={item.video}
                                        title={item.name}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                           
                                    <div className="absolute top-3 left-3 bg-black bg-opacity-80 text-white text-xs font-medium px-2 py-1 rounded">
                                        LIVE
                                    </div>
                                </div>

                        
                                <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                                 
                                    <div className="mb-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-semibold text-[#2A2A2A] capitalize">
                                                {item.name}
                                            </h3>
                                            <span className="text-gray-400 text-sm">-</span>
                                            <span className="text-gray-600 text-sm font-medium capitalize">
                                                {item.host}
                                            </span>
                                        </div>

                        
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                            <span className="font-semibold text-[#F25E26] capitalize">
                                                {item.title}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                Ticket price:
                                                <span className="font-semibold text-[#F25E26]">
                                                    ₦{parseInt(item.price).toLocaleString('en-US')}
                                                </span>
                                            </span>
                                        </div>

                                     
                                        <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                            {item.description}
                                        </p>
                                    </div>

                                
                                    <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
                                        <span className="capitalize font-medium">
                                            {item.host}
                                        </span>
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

  
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-12">
                            <button
                                className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-200 ${currentPage === 1
                                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                    : 'bg-white text-[#F25E26] border-[#F25E26] hover:bg-[#F25E26] hover:text-white shadow-sm'
                                    }`}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                ‹
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-200 ${currentPage === i + 1
                                        ? 'bg-[#F25E26] text-white border-[#F25E26] shadow-sm'
                                        : 'bg-white text-[#F25E26] border-[#F25E26] hover:bg-[#F25E26] hover:text-white shadow-sm'
                                        }`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-200 ${currentPage === totalPages
                                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                    : 'bg-white text-[#F25E26] border-[#F25E26] hover:bg-[#F25E26] hover:text-white shadow-sm'
                                    }`}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                ›
                            </button>
                        </div>
                    )} */}


<PastAuction product={auctioninfo?.data?.data?.closed} />
                </div>
            </main>
            <Footer />
        </Fragment>
    );
}

export default function Page() {
    return (
        <Suspense>
            <RaffleVideosPage />
        </Suspense>
    );
}
