'use client'
import { Fragment, useState, useEffect, useMemo } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { AuctionBanner } from '../component/AuctionBanner'
import { Products } from '../static-data'
import { AuctionCard, AuctionCardMain } from '../component/Card'
import { Pagination } from '../component/Pagination'
import { useRouter } from 'next/navigation'
import auctionImg from '../asset/image/auction-banner.png'
import { useQueryData } from '@/hooks/useQueryData'


interface AuctionItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  // add other fields as necessary
}

interface AuctionResponse {
  data: AuctionItem[];
  // add other fields as necessary
}


const Page = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [itemsPerPage] = useState<number>(12);


  // const { data: auctionInfo, isLoading: auctionLoading } = useQueryData(`${process.env.NEXT_PUBLIC_BASE_URL}/auction/auctions/`, "get auctiondetails", true);

  const { data: auctionInfo, isLoading: auctionLoading } = useQueryData<AuctionResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auction/auctions/`,
    ['get auctiondetails'],
    true
  );

  useMemo(() => {

    /*    const filteredProducts = Products.slice(
         currentPage * itemsPerPage,
         (currentPage + 1) * itemsPerPage)

       setFilteredData(filteredProducts); */


    if (auctionInfo?.data) {
      const filteredProducts = auctionInfo?.data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage)

      setFilteredData(filteredProducts);
    }

  }, [currentPage, itemsPerPage, auctionInfo]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const pageCount = Math.ceil((auctionInfo?.data.length || 0) / itemsPerPage);

  return (
    <Fragment>
      <header className='fixed z-50 w-full'>
        <Header />
      </header>
      <AuctionBanner text='Auction Deals' banner={auctionImg} />
      <main className='container my-4'>
        <section className='my-5 flex flex-col items-center justify-between gap-5 lg:flex-row'>
          <div className="text-[#F25E26] underline lg:text-xl cursor-pointer" onClick={() => router.push("/raffle")}>
            View All Raffle Draw Video
          </div>

          <div>
            <input
              type='date'
              name='search'
              id='search'
              className='rounded border p-4'
            />
          </div>
        </section>

        <section className='my-4 flex justify-center flex-col items-center'>
          <AuctionCardMain cardInfo={filteredData} currentPage={0} cardsNum={0} />
          <Pagination
            pageCount={pageCount}
            onPageChange={(pageNumber: number) => handlePageChange(pageNumber)}
            className='my-6 flex items-center justify-center gap-4 '
          />
        </section>
      </main>
      <Footer />
    </Fragment>
  )
}

export default Page
