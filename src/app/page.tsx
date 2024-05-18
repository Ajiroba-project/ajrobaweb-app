'use client'
import { DefaultButton } from "./component/Button"
import { Hero } from "./component/Hero";
import { Heading } from "./component/Heading"
import { SubHeading } from "./component/SubHeading"
import { AuctionCard, CategoryFeatureCard, ProductCard } from './component/Card'
import { HIW } from "./component/How-it-works"
import { Banner } from "./component/Banner"
import { Community } from './component/Community'
import { Products, categories } from "./static-data"
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useState} from "react"
import './globals.css'



const Page = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [categoryCurrentPage, setCategoryCurrentPage] = useState<number>(0)
    const [displayedProducts, setDisplayedProducts] = useState<any | []>(
      Products.slice(0, 12)
    )

  const totalCards = Products.length
  const cardsPerPage = 4
  const totalPages = Math.ceil(totalCards / cardsPerPage) 
  const isFirstPage = currentPage === 0
  const isLastPage = currentPage === totalPages - 1
  const categoryFirstPage = currentPage === 0
  const categoryLastPage = currentPage === totalPages - 1
  
  return (
    <>
      <Header />
      <main className=''>
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
            <div className='flex items-center gap-2'>
              <FaArrowLeft
                className={`text- cursor-pointer rounded-full  bg-[#FCDFD4] p-3 text-4xl text-black ${isFirstPage ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() =>
                  setCurrentPage(prevPage => Math.max(0, prevPage - 1))
                }
              />
              <FaArrowRight
                className={`cursor-pointer rounded-full bg-[#F25E26] p-3 text-4xl text-black ${isLastPage ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() =>
                  setCurrentPage(prevPage =>
                    Math.min(prevPage + 1, totalPages - 1)
                  )
                }
              />
            </div>
          </div>

          <div>
            <Heading title='Auction Sales' />
          </div>
          <div className='flex justify-center'>
            <AuctionCard
              cardInfo={Products}
              currentPage={currentPage}
              cardsNum={cardsPerPage}
              />
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
            <div className='flex items-center gap-2'>
              <FaArrowLeft
                className={`text- cursor-pointer rounded-full  bg-[#FCDFD4] p-3 text-4xl text-black ${categoryFirstPage ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => {
                  setCategoryCurrentPage(prevPage => Math.max(0, prevPage - 1))
                }}
              />
              <FaArrowRight
                className={`cursor-pointer rounded-full bg-[#F25E26] p-3 text-4xl text-black ${categoryLastPage ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => {
                  setCategoryCurrentPage(prevPage =>
                    Math.min(prevPage + 1, totalPages - 1)
                  )
                }}
              />
            </div>
          </div>

          <div className=''>
            <Heading title='Shop by Categories' />
          </div>
          <div className='flex flex-col justify-center'>
            <CategoryFeatureCard
              cardInfo={categories}
              currentPage={categoryCurrentPage}
            />
            <div className='flex justify-center pt-4'>
              <DefaultButton
                text='view all Categories'
                type='button'
                handleClick={() => {}}
                className='rounded-lg bg-[#FCDFD4] p-2'
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
          <div>
            <ProductCard cardInfo={displayedProducts} />
            <div className='flex justify-center pt-4'>
              <DefaultButton
                text='view all Features'
                type='button'
                handleClick={() => {}}
                className='rounded-lg bg-[#FCDFD4] p-2'
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
          <div>
            <ProductCard cardInfo={displayedProducts} />
            <div className='flex justify-center pt-4'>
              <DefaultButton
                text='view all Deals'
                type='button'
                handleClick={() => {}}
                className='rounded-lg bg-[#FCDFD4] p-2'
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
          <div>
            <ProductCard cardInfo={displayedProducts} />
            <div className='flex justify-center pt-4'>
              <DefaultButton
                text='view all Products'
                type='button'
                handleClick={() => {}}
                className='rounded-lg bg-[#FCDFD4] p-2'
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
    </>
  )
}

export default Page