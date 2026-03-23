'use client'

import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { Fragment, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useGetOrderWinsData } from '@/hooks/useGetData';
import Cookies from 'js-cookie';

const PastAuction = dynamic(
    () => import('../raffledraw-wins/components/PastAuction').then(mod => ({ default: mod.PastAuction })),
    { ssr: false, loading: () => <p className="text-center text-gray-500 py-8">Loading...</p> }
);

const RaffleVideosPage = () => {
    const userToken = Cookies.get('token') as string;

    const { data: auctioninfo } = useGetOrderWinsData('/api/auctionwins', "get_auctionwins_details", userToken);

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
