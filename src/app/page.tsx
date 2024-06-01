'use client'
import { DefaultButton } from './component/Button'
import { Hero } from './component/Hero'
import { Heading } from './component/Heading'
import { SubHeading } from './component/SubHeading'
import { AuctionCard, CategoryFeatureCard, ProductCard } from './component/Card'
import { HIW } from './component/How-it-works'
import { Banner } from './component/Banner'
import { Community } from './component/Community'
import { Products, categories } from './static-data'
import { Header } from './component/Header'
import { Footer } from './component/Footer'
import { useState, useEffect } from 'react'
import './globals.css'
import { Suspense } from 'react'
import { CircularPagination } from './component/Pagination'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [categoryCurrentPage, setCategoryCurrentPage] = useState<number>(0)
  const [auctionCurrentPage, setAuctionCurrentPage] = useState<number>(0)
  const [displayedProducts] = useState<any | []>(Products.slice(0, 12))
  const [cardsPerPage] = useState<number>(4)
  const [filteredCatData, setFilteredCatData] = useState<any>([])
  const [filteredAuctionData, setFilteredAuctionData] = useState<any>([])

  const totalPages = Math.ceil(Products.length / cardsPerPage)
  const catCount = Math.ceil(categories.length / cardsPerPage)
  const router = useRouter()

  // const width = window.innerWidth

  useEffect(() => {
    const FilteredCat = categories.slice(
      categoryCurrentPage * cardsPerPage,
      (categoryCurrentPage + 1) * cardsPerPage
    )
    const FilteredAuction = Products.slice(
      auctionCurrentPage * cardsPerPage,
      (auctionCurrentPage + 1) * cardsPerPage
    )

    setFilteredCatData(FilteredCat)
    setFilteredAuctionData(FilteredAuction)
  }, [auctionCurrentPage, cardsPerPage, categoryCurrentPage])

  const handlePageChange = (pageNumber: number) => {
    setCategoryCurrentPage(pageNumber)
  }
  const handleAuctionChange = (pageNumber: number) => {
    setAuctionCurrentPage(pageNumber)
  }

  return (
    <>
      <Suspense>
        <header className='fixed z-30 w-full'>
          <Header />
        </header>

        <main className='w-full pt-[13vh] md:pt-[20vh] lg:pt-[20vh]'>
          {/* hero section */}
          <section>
            <div className=''>
              <Hero />
            </div>
          </section>

          {/*  Auction section  */}
          <section className='container my-[3rem] flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <SubHeading title='Today' />
              <div className='flex items-center '>
                <CircularPagination
                  pageCount={totalPages}
                  onPageChange={(pageNumber: number) =>
                    handleAuctionChange(pageNumber)
                  }
                  className='flex items-center'
                />
              </div>
            </div>

            <div>
              <Heading title='Auction Sales' />
            </div>
            <div className='flex justify-center'>
              <AuctionCard cardInfo={filteredAuctionData} />
            </div>
          </section>

          {/*  How it works  */}
          <section className='container my-28 flex flex-col  gap-4'>
            <div>
              <SubHeading title='How it works' />
            </div>
            <HIW />
            <p className='cursor-pointer text-xl font-semibold text-[#F25E26] underline lg:ml-5'>
              Read more
            </p>
          </section>

          {/* {/* Categories  */}
          <section className='container my-28 flex flex-col  gap-4'>
            <div className='flex items-center justify-between'>
              <SubHeading title='Categories' />
              <div className='relative flex items-center'>
                <CircularPagination
                  pageCount={catCount}
                  onPageChange={(pageNumber: number) =>
                    handlePageChange(pageNumber)
                  }
                  className='flex items-center'
                />
              </div>
            </div>

            <div className=''>
              <Heading title='Shop by Categories' />
            </div>

            <div className='flex flex-col justify-center'>
              <CategoryFeatureCard cardInfo={filteredCatData} />
              <div className='flex justify-center pt-8'>
                <DefaultButton
                  text='View all Categories'
                  type='button'

                  handleClick={() => {}}

                  className='h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all'
                />
              </div>
            </div>
          </section>

          {/* {/* Featured Product  */}
          <section className='container my-28 flex flex-col  gap-4'>
            <div>
              <SubHeading title='Featured' />
            </div>
            <div>
              <Heading title='Featured Products' />
            </div>
            <div className='flex flex-col items-center  '>
              <ProductCard cardInfo={displayedProducts} />
              <div className='flex justify-center pt-4'>
                <DefaultButton
                  text='View all Features'
                  type='button'
                  handleClick={() => router.push('/auction')}
                  className='h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all'
                />
              </div>
            </div>
          </section>

          {/* {/* Shop from top deals collection  */}
          <section className='container my-28 flex flex-col  gap-4'>
            <div>
              <SubHeading title='Deals' />
            </div>
            <div>
              <Heading title='Shop from Top Deals Collection' />
            </div>
            <div className='flex flex-col items-center'>
              <ProductCard cardInfo={displayedProducts} />
              <div className='flex justify-center pt-4'>
                <DefaultButton
                  text='View all Deals'
                  type='button'
                  handleClick={() => router.push('/auction')}
                  className='h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all'
                />
              </div>
            </div>
          </section>

          {/* {/* community  */}

          <section className='bg-[#F6F6F6]'>
            <div>
              <Community />
            </div>
          </section>

          {/* {/* Top product  */}
          <section className='container my-28 flex flex-col  gap-4'>
            <div>
              <SubHeading title='Top Product' />
            </div>
            <div>
              <Heading title='This Week Top Product' />
            </div>
            <div className='flex flex-col items-center'>
              <ProductCard cardInfo={displayedProducts} />
              <div className='flex justify-center pt-4'>
                <DefaultButton
                  text='View all Products'
                  type='button'

                  handleClick={() => router.push('/categories')}

                  className='h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all'
                />
              </div>
            </div>
          </section>

          {/* hero section */}
          <section className='bg-[#F25E26]'>
            <Banner />
          </section>
        </main>
        <Footer />
      </Suspense>
    </>
  )
}

export default Page
