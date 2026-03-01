'use client'

import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { Fragment } from 'react';
import { Suspense } from 'react';
import { raffle } from '../static-data';
import { useState } from 'react';
import { CloseAuction } from '../raffledraw-wins/components/CloseAuction';
import { useGetOrderWinsData } from '@/hooks/useGetData';
import Cookies from 'js-cookie';
import { PastAuction } from '../raffledraw-wins/components/PastAuction';

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

                    


<PastAuction product={auctioninfo?.data?.data?.closed} />
                </div>
            </main>
            <div className='content-container'>
                <Footer />
            </div>
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
