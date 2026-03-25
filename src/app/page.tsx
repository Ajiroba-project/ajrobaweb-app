'use client'
import Image from 'next/image'
import { DefaultButton } from './component/Button'
import { Hero } from './component/Hero'
import { Heading } from './component/Heading'
import { SubHeading } from './component/SubHeading'
// import {
//   AuctionCard,
//   CategoryFeatureCard,
//   ProductCard,
//   TopDealsCard,
//   TopWeakCard,
// } from "./component/Card";
import { HIW } from './component/How-it-works'
import dynamic from 'next/dynamic'
import { Products, categories } from './static-data'
import { Header } from './component/Header'
import { Footer } from './component/Footer'
import exploreBg from './asset/expoloresectionbg.png'
import exploreBgMobile from './asset/explorebgmobile.png'
import brandWhite from './asset/logoWhite.svg'
import brandColor from './asset/logo.svg'
import { useState, useEffect, useCallback } from 'react'
import './globals.css'
import { Suspense } from 'react'
import { CircularPagination } from './component/Pagination'
import { useRouter } from 'next/navigation'
import { useAuthStore, userNavStore } from '@/store/store'
import { useQueryData } from '@/hooks/useQueryData'
// import Loading from "./component/Loading";
import { LoadingSpinner } from './component/LoadingSkeleton'
import { TopAuctionBid } from './component/TopAuctionBid'

// Lazy-loaded components to improve mobile performance and Lighthouse scores
const Banner = dynamic(() => import('./component/Banner').then(m => m.Banner), {
  ssr: false,
  loading: () => <div className='h-24 w-full bg-[#F6F6F6] sm:h-28 md:h-32' />
})

const Community = dynamic(
  () => import('./component/Community').then(m => m.Community),
  {
    ssr: false,
    loading: () => <div className='h-40 w-full bg-[#F6F6F6] sm:h-56 md:h-64' />
  }
)

const ProductCardMain = dynamic(
  () => import('./component/Card').then(m => m.ProductCardMain),
  { loading: () => <div className='h-44 w-full bg-gray-50' /> }
)

const CatFeatCard = dynamic(
  () => import('./component/Card').then(m => m.CatFeatCard),
  { loading: () => <div className='h-40 w-full bg-gray-50' /> }
)

const AuctionComp = dynamic(
  () => import('./component/AuctionComp').then(m => m.AuctionComp),
  { loading: () => <div className='h-48 w-full bg-gray-50' /> }
)

type AuctionData = {
  id: string
  name: string
  ticket_price: string
  reviews: number
  starts_in: string
  images: Array<{ auction: string; image: string }>
}

interface CardInfoItem {
  raffle_top_deals?: any[]
  id?: number
  title?: string
  description?: string
  imageUrl?: string
  name?: string
  ticket_price?: any
  reviews?: number
  starts_in?: string | undefined
  images?: any
  image?: Array<{ image: string }>
}

interface AuctionResponse {
  data: CardInfoItem[]
}

interface TopAuctionResponse {
  data: {
    raffle_top_deals: CardInfoItem[]
    raffle_deals: CardInfoItem[]
  }
}

const Page = () => {
  const [categoryCurrentPage, setCategoryCurrentPage] = useState<number>(0)
  const [auctionCurrentPage, setAuctionCurrentPage] = useState<number>(0)
  const [topAuctionCurrentPage, setTopAuctionCurrentPage] = useState<number>(0)
  const [cardsPerPage] = useState<number>(4)
  const [filteredCatData, setFilteredCatData] = useState<any>([])
  const [filteredAuctionData, setFilteredAuctionData] = useState<any>([])
  const [TopAuctionData, setTopAuctionData] = useState<any>([])
  const [loadingdata, setLoadingData] = useState<boolean>(false)

  const totalPages = Math.ceil(Products.length / cardsPerPage)
  const catCount = Math.ceil(categories.length / cardsPerPage)
  const router = useRouter()

  const { setHeaderNav, headerNav } = userNavStore(state => ({
    setHeaderNav: state.setHeaderNav,
    headerNav: state.headerNav
  }))

  const { data: auctionInfo, isLoading: auctionLoading } =
    useQueryData<AuctionResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auction/auctions/`,
      ['get auctiondetails'],
      true
    )

  const { data: topAuctionInfo, isLoading: topAuctionLoading } =
    useQueryData<TopAuctionResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auction/raffle_draws/`,
      ['get topauctiondetails'],
      true
    )

  // console.log(topAuctionInfo, 'topAuctionInfooooo');

  const { data: categoriesInfo, isLoading: categoriesLoading } =
    useQueryData<AuctionResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories/`,
      ['get categoriesdetails'],
      true
    )

  const { data: featuredproductInfo, isLoading: featuredproducLoading } =
    useQueryData<AuctionResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/featured_products/`,
      ['get featureddetails'],
      true
    )
  const { data: topdeals, isLoading: topdealsLoading } =
    useQueryData<AuctionResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/top_deals_products/`,
      ['get topdeals'],
      true
    )
  const { data: topweak, isLoading: topweakLoading } =
    useQueryData<AuctionResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/top_week_products/`,
      ['get topweak'],
      true
    )

  // Calculate page counts after data is available
  const auctionTotalPages = topAuctionInfo?.data?.raffle_deals
    ? Math.ceil(topAuctionInfo?.data?.raffle_deals?.length / cardsPerPage)
    : 0
  // const categoriesTotalPages = categoriesInfo?.data ? Math.ceil(categoriesInfo.data.length / cardsPerPage) : 0;

  useEffect(() => {
    if (headerNav !== 'Home') {
      setHeaderNav('Home')
    }

    if (categoriesInfo?.data) {
      const filteredCat = categoriesInfo.data.slice(
        categoryCurrentPage * cardsPerPage,
        (categoryCurrentPage + 1) * cardsPerPage
      )
      setFilteredCatData(filteredCat)
    }
  }, [
    categoriesInfo,
    categoryCurrentPage,
    cardsPerPage,
    headerNav,
    setHeaderNav
  ])

  useEffect(() => {
    if (topAuctionInfo?.data?.raffle_deals) {
      const filteredAuction = topAuctionInfo.data.raffle_deals.slice(
        auctionCurrentPage * cardsPerPage,
        (auctionCurrentPage + 1) * cardsPerPage
      )
      setFilteredAuctionData(filteredAuction)
    }

    if (topAuctionInfo?.data?.raffle_top_deals) {
      const filteredTopAuction = topAuctionInfo.data.raffle_top_deals.slice(
        topAuctionCurrentPage * cardsPerPage,
        (topAuctionCurrentPage + 1) * cardsPerPage
      )
      setTopAuctionData(filteredTopAuction)
    } else {
      setTopAuctionData([])
    }
  }, [
    auctionInfo,
    topAuctionInfo,
    auctionCurrentPage,
    topAuctionCurrentPage,
    cardsPerPage
  ])

  const handlePageChange = (pageNumber: number) => {
    setCategoryCurrentPage(pageNumber)
  }

  const handleAuctionChange = (pageNumber: number) => {
    setAuctionCurrentPage(pageNumber)
  }

  const handleTopAuctionChange = (pageNumber: number) => {
    setTopAuctionCurrentPage(pageNumber)
  }

  const onAuctionLoadingChange = useCallback((loading: any) => {
    setLoadingData(loading)
  }, [])

  return (
    <>
      <Suspense>
        {/* Fixed Header - Responsive */}
        <Header />

        {/* Main Content - Responsive Padding */}
        <main className='w-full overflow-x-hidden pt-24 sm:pt-24 md:pt-28 lg:pt-32'>
          {/* Hero Section - Full Width */}
          <section className=' w-full'>
            <div className='w-full'>
              <Hero />
            </div>
          </section>

          {/* How It Works Section - Responsive Container */}
          <section className='content-visibility-auto my-8 w-full md:my-12 lg:my-16 content-container'>
            <div className=''>
              <div className='mb-6 flex flex-col gap-4 '>
                <SubHeading title='How it works' />
              </div>

              <HIW />

              <div className='mt-6 flex justify-center sm:justify-start'>
                <p
                  className='cursor-pointer font-Poppins text-base font-semibold text-[#F25E26] underline transition-colors duration-200 hover:text-[#E84526] sm:text-lg'
                  onClick={() => router.push('/raffle')}
                >
                  Read more
                </p>
              </div>
            </div>
          </section>

          {/* Auction Sales Section - Responsive Container */}
          <section className='content-visibility-auto my-8 w-full md:my-12 lg:my-16 content-container'>
            <div className=''>
              {/* Header with Pagination - Mobile Stack */}
              <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex flex-col gap-2'>
                  <SubHeading title='Today' />
                  <Heading title='Raffle Draw Sales' />
                </div>

                {/* Pagination - Hidden on Mobile if Space Issue */}
                <div className='flex items-center justify-center sm:justify-end'>
                  {auctionLoading || topAuctionLoading ? (
                    <div className='flex items-center justify-center gap-2 px-4 py-2'>
                      <LoadingSpinner size='sm' />
                      <span className='font-Poppins text-sm text-gray-500'>
                        Loading...
                      </span>
                    </div>
                  ) : (
                    <CircularPagination
                      pageCount={auctionTotalPages}
                      currentPage={auctionCurrentPage}
                      onPageChange={({ selected }) =>
                        handleAuctionChange(selected)
                      }
                      className='flex scale-75 items-center sm:scale-100'
                    />
                  )}
                </div>
              </div>

              <div className='w-full'>
                <AuctionComp
                  cardInfo={filteredAuctionData}
                  currentPage={0}
                  cardsNum={0}
                  onLoadingChange={onAuctionLoadingChange}
                  isLoading={topAuctionLoading}
                />
              </div>
            </div>
          </section>

          {/* Mobile: image-driven layout (no crop, no shrink) */}
          <section className='relative mt-20 sm:hidden'>
            <Image
              src={exploreBgMobile}
              alt='Explore Ajiroba background'
              className='w-full h-auto'
              priority
              sizes='100vw'
              quality={90}
            />
            {/* Content overlaid — scales with image via vw units */}
            <div className='absolute inset-0 z-10 flex items-center justify-end' style={{ padding: '2vw' }}>
              <div className='w-[55%] flex flex-col items-center text-center'>
                <Image
                  src={brandColor}
                  alt='Ajiroba logo'
                  className='w-auto'
                  style={{ height: '5.5vw' }}
                  priority
                  quality={90}
                />
                <p className='text-[#333]' style={{ marginTop: '1.5vw', fontSize: '2.8vw', lineHeight: 1.35 }}>
                  Ajiroba brings to you a world of affordability. You can get
                  the best product at affordable prices, by simply bidding for a
                  product to enter raffle draw.
                </p>
                <p className='text-[#333]' style={{ marginTop: '1.5vw', fontSize: '2.8vw', lineHeight: 1.35 }}>
                  Every raffle draw is guaranteed a winner. Your chance of
                  winning increasing by buying multiple ticket.
                </p>
                <div style={{ marginTop: '2.5vw' }}>
                  <button
                    onClick={() => router.push('/raffledraw')}
                    className='inline-flex items-center justify-center bg-[#121212] font-medium text-white transition-all duration-200 hover:bg-[#F25E26]'
                    style={{ borderRadius: '2vw', paddingInline: '6vw', paddingBlock: '1.8vw', fontSize: '3vw' }}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Desktop: original layout with dark overlay */}
          <section className='relative mt-20 hidden sm:block sm:min-h-[480px] lg:min-h-[560px] overflow-hidden'>
            <div className='absolute inset-0 bg-[#FCE2D6]'>
              <Image
                src={exploreBg}
                alt='Explore Ajiroba background'
                fill
                sizes="100vw"
                className='object-cover object-top'
                priority
                sizes='(max-width: 1440px) 100vw, 1440px'
                quality={90}
              />
              <div className='absolute inset-0 bg-black/45' />
            </div>

            <div className='content-container relative z-10 flex min-h-[480px] flex-row items-center justify-end gap-12 py-16 text-white lg:min-h-[560px] lg:py-20'>
              <div className='hidden md:block md:flex-1' />

              <div className='flex w-full max-w-xl flex-col items-center text-center md:max-w-lg md:items-end md:text-right'>
                <Image
                  src={brandWhite}
                  alt='Ajiroba logo'
                  className='h-12 w-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.28)]'
                  priority
                  quality={90}
                />
                <p className='mt-6 text-base leading-relaxed text-[#F9F9F9] lg:text-lg'>
                  Ajiroba brings to you a world of affordability. You can get
                  the best product at affordable prices, by simply bidding for a
                  product to enter raffle draw.
                </p>
                <p className='mt-4 text-base leading-relaxed text-[#F9F9F9] lg:text-lg'>
                  Every raffle draw is guaranteed a winner. Your chance of
                  winning increases by buying multiple tickets.
                </p>
                <div className='mt-8 flex justify-center md:justify-end'>
                  <button
                    onClick={() => router.push('/raffledraw')}
                    className='inline-flex items-center justify-center rounded-lg bg-[#121212] px-12 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-1 hover:bg-[#F25E26] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70'
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </section>
        

          <section className='content-visibility-auto my-8 w-full md:my-12 lg:my-16 content-container'>
            <div className=''>
              {/* Header with Pagination - Mobile Stack */}
              <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex flex-col gap-2'>
                  <SubHeading title='Today' />
                  <Heading title='Bid from Top Deals Collection' />
                </div>

                {/* Pagination - Hidden on Mobile if Space Issue */}
                <div className='flex items-center justify-center sm:justify-end'>
                  {auctionLoading ? (
                    <div className='flex items-center justify-center gap-2 px-4 py-2'>
                      <LoadingSpinner size='sm' />
                      <span className='font-Poppins text-sm text-gray-500'>
                        Loading...
                      </span>
                    </div>
                  ) : (
                    <CircularPagination
                      pageCount={auctionTotalPages}
                      currentPage={auctionCurrentPage}
                      onPageChange={({ selected }) =>
                        handleAuctionChange(selected)
                      }
                      className='flex scale-75 items-center sm:scale-100'
                    />
                  )}
                </div>
              </div>

              {/* Auction Content */}
              <div className='w-full'>
                <TopAuctionBid
                  cardInfo={TopAuctionData}
                  currentPage={0}
                  cardsNum={0}
                  onLoadingChange={onAuctionLoadingChange}
                  isLoading={topAuctionLoading}
                />
              </div>

              <div className='flex justify-center pt-2'>
                <DefaultButton
                  text='View all Raffle Draw Deals'
                  type='button'
                  disabled={topAuctionLoading}
                  handleClick={() => router.push(`/raffledraw`)}
                  className='transform rounded-lg bg-[#FCDFD4] px-4 py-2 font-Poppins text-sm font-normal transition-all duration-300 hover:scale-105 hover:bg-[#F25E26] hover:text-white hover:shadow-lg'
                />
              </div>
            </div>
          </section>

        

          {/* Community Section - Full Width Background */}
          <section className='content-visibility-auto w-full bg-[#F6F6F6] py-8 md:py-12 lg:py-16'>
            <div className='w-full'>
              <Community />
            </div>
          </section>

          {/* Banner Section - Full Width */}
          <section className='content-visibility-auto w-full'>
            <Banner />
          </section>
        </main>

        {/* Footer - Full Width */}
      <div className=''>
        <Footer />
      </div>
      </Suspense>
    </>
  )
}

export default Page



// import React from 'react'

// const page = () => {
//   return (
//   <div className="flex justify-center items-center h-screen">
//     <div className="text-2xl font-bold text-red-500">Your account Balance has a past due amount of $25.8. Please make a payment to avoid account suspension.</div>
//   </div>
  
//   )
// }

// export default page