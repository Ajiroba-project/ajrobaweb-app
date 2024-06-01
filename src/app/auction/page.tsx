'use client'
import { Fragment, useState, useEffect, useMemo } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { AuctionBanner } from '../component/AuctionBanner'
import { Products } from '../static-data'
import { AuctionCard } from '../component/Card'
import { Pagination } from '../component/Pagination'
import {useRouter} from 'next/navigation'
import auctionImg from '../asset/image/auction-banner.png'

const Page = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [itemsPerPage] = useState<number>(12);

  useMemo(() => {

    const filteredProducts = Products.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage)

    setFilteredData(filteredProducts);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  const pageCount = Math.ceil(Products.length / itemsPerPage)

  return (
    <Fragment>
      <header className='fixed z-30 w-full'>
        <Header />
      </header>
      <AuctionBanner text='Auction Deals' banner={auctionImg} />
      <main className='container my-4'>
        <section className='my-5 flex flex-col items-center justify-between gap-5 lg:flex-row'>
          <div className="text-[#F25E26] underline lg:text-xl cursor-pointer" onClick={()=>router.push("/raffle")}>
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
          <AuctionCard cardInfo={filteredData} />
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
