'use client'
import { Fragment, useState, useEffect, useMemo } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { AuctionBanner } from '../component/AuctionBanner'
import { Products } from '../static-data'
import { AuctionCard } from '../component/Card'
import { Pagination } from '../component/Pagination'
import Link from 'next/link'
import auctionImg from '../asset/image/auction-banner.png'

const Page = () => {
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
      <Header />
      <AuctionBanner text='Auction Deals' banner={auctionImg} />
      <main className='container my-4'>
        <section className='my-5 flex justify-between lg:flex-row flex-col gap-5 items-center'>
          <div>
            <Link className=' text-[#F25E26] underline lg:text-xl ' href={'#'}>
              View All Raffle Draw Video
            </Link>
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

        <section className='my-4'>
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
