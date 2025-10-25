"use client";
import { DefaultButton } from "./component/Button";
import { Hero } from "./component/Hero";
import { Heading } from "./component/Heading";
import { SubHeading } from "./component/SubHeading";
import {
  AuctionCard,
  CategoryFeatureCard,
  ProductCard,
  TopDealsCard,
  TopWeakCard,
} from "./component/Card";
import { HIW } from "./component/How-it-works";
import dynamic from "next/dynamic";
import { Products, categories } from "./static-data";
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import { useState, useEffect, useCallback } from "react";
import "./globals.css";
import { Suspense } from "react";
import { CircularPagination } from "./component/Pagination";
import { useRouter } from "next/navigation";
import { useAuthStore, userNavStore } from "@/store/store";
import { useQueryData } from "@/hooks/useQueryData";
import Loading from "./component/Loading";
import { LoadingSpinner } from "./component/LoadingSkeleton";

// Lazy-loaded components to improve mobile performance and Lighthouse scores
const Banner = dynamic(() => import("./component/Banner").then(m => m.Banner), {
  ssr: false,
  loading: () => <div className="w-full h-24 sm:h-28 md:h-32 bg-[#F6F6F6]" />,
});

const Community = dynamic(() => import("./component/Community").then(m => m.Community), {
  ssr: false,
  loading: () => (
    <div className="w-full h-40 sm:h-56 md:h-64 bg-[#F6F6F6]" />
  ),
});

const ProductCardMain = dynamic(
  () => import("./component/Card").then(m => m.ProductCardMain),
  { loading: () => <div className="w-full h-44 bg-gray-50" /> }
);

const CatFeatCard = dynamic(
  () => import("./component/Card").then(m => m.CatFeatCard),
  { loading: () => <div className="w-full h-40 bg-gray-50" /> }
);

const AuctionComp = dynamic(
  () => import("./component/AuctionComp").then(m => m.AuctionComp),
  { loading: () => <div className="w-full h-48 bg-gray-50" /> }
);

type AuctionData = {
  id: string;
  name: string;
  ticket_price: string;
  reviews: number;
  starts_in: string;
  images: Array<{ auction: string; image: string }>;
};

interface CardInfoItem {
  id?: number;
  title?: string;
  description?: string;
  imageUrl?: string;
  name?: string;
  ticket_price?: any;
  reviews?: number;
  starts_in?: string | undefined;
  images?: any;
  image?: Array<{ image: string }>;
}

interface AuctionResponse {
  data: CardInfoItem[];
}

const Page = () => {
  const [categoryCurrentPage, setCategoryCurrentPage] = useState<number>(0);
  const [auctionCurrentPage, setAuctionCurrentPage] = useState<number>(0);
  const [cardsPerPage] = useState<number>(4);
  const [filteredCatData, setFilteredCatData] = useState<any>([]);
  const [filteredAuctionData, setFilteredAuctionData] = useState<any>([]);
  const [loadingdata, setLoadingData] = useState<boolean>(false);

  const totalPages = Math.ceil(Products.length / cardsPerPage);
  const catCount = Math.ceil(categories.length / cardsPerPage);
  const router = useRouter();

  const { setHeaderNav, headerNav } = userNavStore(state => ({
    setHeaderNav: state.setHeaderNav,
    headerNav: state.headerNav,
  }));

  const { data: auctionInfo, isLoading: auctionLoading } =
    useQueryData<AuctionResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auction/auctions/`,
      ["get auctiondetails"],
      true,
    );
  const { data: categoriesInfo, isLoading: categoriesLoading } =
    useQueryData<AuctionResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories/`,
      ["get categoriesdetails"],
      true,
    );

  const { data: featuredproductInfo, isLoading: featuredproducLoading } =
    useQueryData<AuctionResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/featured_products/`,
      ["get featureddetails"],
      true,
    );
  const { data: topdeals, isLoading: topdealsLoading } =
    useQueryData<AuctionResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/top_deals_products/`,
      ["get topdeals"],
      true,
    );
  const { data: topweak, isLoading: topweakLoading } =
    useQueryData<AuctionResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/top_week_products/`,
      ["get topweak"],
      true,
    );

  // Calculate page counts after data is available
  const auctionTotalPages = auctionInfo?.data ? Math.ceil(auctionInfo.data.length / cardsPerPage) : 0;
  const categoriesTotalPages = categoriesInfo?.data ? Math.ceil(categoriesInfo.data.length / cardsPerPage) : 0;

  useEffect(() => {
    if (headerNav !== 'Home') {
      setHeaderNav('Home');
    }

    if (categoriesInfo?.data) {
      const filteredCat = categoriesInfo.data.slice(
        categoryCurrentPage * cardsPerPage,
        (categoryCurrentPage + 1) * cardsPerPage,
      );
      setFilteredCatData(filteredCat);
    }
  }, [categoriesInfo, categoryCurrentPage, cardsPerPage, headerNav, setHeaderNav]);

  useEffect(() => {
    if (auctionInfo?.data) {
      const filteredAuction = auctionInfo.data.slice(
        auctionCurrentPage * cardsPerPage,
        (auctionCurrentPage + 1) * cardsPerPage,
      );
      setFilteredAuctionData(filteredAuction);
    }
  }, [auctionInfo, auctionCurrentPage, cardsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    setCategoryCurrentPage(pageNumber);
  };

  const handleAuctionChange = (pageNumber: number) => {
    setAuctionCurrentPage(pageNumber);
  };

  const onAuctionLoadingChange = useCallback((loading: any) => {
    setLoadingData(loading);
  }, []);

  return (
    <>
      <Suspense>
        {/* Fixed Header - Responsive */}
        <header className="fixed z-50 w-full">
          <Header />
        </header>

        {/* Main Content - Responsive Padding */}
        <main className="w-full overflow-x-hidden pt-20 sm:pt-24 md:pt-28">
          
          {/* Hero Section - Full Width */}
          <section className="w-full">
            <div className="w-full">
              <Hero />
            </div>
          </section>

          {/* Auction Sales Section - Responsive Container */}
          <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-8 md:my-12 lg:my-16 content-visibility-auto">
            <div className="max-w-7xl mx-auto">
              {/* Header with Pagination - Mobile Stack */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex flex-col gap-2">
                  <SubHeading title="Today" />
                  <Heading title="Auction Sales" />
                </div>
                
                {/* Pagination - Hidden on Mobile if Space Issue */}
                <div className="flex items-center justify-center sm:justify-end">
                  {auctionLoading ? (
                    <div className="flex items-center justify-center gap-2 px-4 py-2">
                      <LoadingSpinner size="sm" />
                      <span className="text-sm text-gray-500 font-Poppins">Loading...</span>
                    </div>
                  ) : (
                    <CircularPagination
                      pageCount={auctionTotalPages}
                      currentPage={auctionCurrentPage}
                      onPageChange={({ selected }) => handleAuctionChange(selected)}
                      className="flex items-center scale-75 sm:scale-100"
                    />
                  )}
                </div>
              </div>

              {/* Auction Content */}
              <div className="w-full">
                <AuctionComp
                  cardInfo={filteredAuctionData}
                  currentPage={0}
                  cardsNum={0}
                  onLoadingChange={onAuctionLoadingChange}
                  isLoading={auctionLoading}
                />
              </div>
            </div>
          </section>

          {/* How It Works Section - Responsive Container */}
          <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-8 md:my-12 lg:my-16 content-visibility-auto">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col gap-4 mb-6">
                <SubHeading title="How it works" />
              </div>
              
              <HIW />

              <div className="flex justify-center sm:justify-start mt-6">
                <p 
                  className="font-Poppins cursor-pointer text-base sm:text-lg font-semibold text-[#F25E26] underline hover:text-[#E84526] transition-colors duration-200"
                  onClick={() => router.push('/raffle')}
                >
                  Read more
                </p>
              </div>
            </div>
          </section>

          {/* Categories Section - Responsive Container */}
          <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-8 md:my-12 lg:my-16 content-visibility-auto">
            <div className="max-w-7xl mx-auto">
              {/* Header with Pagination - Mobile Stack */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex flex-col gap-2">
                  <SubHeading title="Categories" />
                  <Heading title="Shop by Categories" />
                </div>
                
                <div className="flex items-center justify-center sm:justify-end">
                  {categoriesLoading ? (
                    <div className="flex items-center justify-center gap-2 px-4 py-2">
                      <LoadingSpinner size="sm" />
                      <span className="text-sm text-gray-500 font-Poppins">Loading...</span>
                    </div>
                  ) : (
                    <CircularPagination
                      pageCount={categoriesTotalPages}
                      currentPage={categoryCurrentPage}
                      onPageChange={({ selected }) => handlePageChange(selected)}
                      className="flex items-center scale-75 sm:scale-100"
                    />
                  )}
                </div>
              </div>

              {/* Categories Content */}
              <div className="w-full">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-full">
                    <CatFeatCard cardInfo={filteredCatData} isLoading={categoriesLoading} />
                  </div>
                  
                  <div className="flex justify-center pt-4">
                    <DefaultButton
                      text="View all Categories"
                      type="button"
                      handleClick={() => router.push("/categories")}
                      className="text-sm font-normal font-Poppins rounded-lg bg-[#FCDFD4] px-4 py-2 transition-all duration-300 hover:bg-[#E84526] hover:text-white hover:shadow-lg transform hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products Section - Responsive Container */}
          <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-8 md:my-12 lg:my-16 content-visibility-auto">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col gap-4 mb-6">
                <SubHeading title="Featured" />
                <Heading title="Featured Products" />
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <div className="w-full">
                  <ProductCardMain cardInfo={featuredproductInfo?.data} isLoading={featuredproducLoading} />
                </div>
                
                <div className="flex justify-center pt-2">
                  <DefaultButton
                    text="View all Deals"
                    type="button"
                    handleClick={() =>
                      router.push(
                        `/categories/${"featured products"}?feat_id=${featuredproductInfo?.data[0]?.id}`,
                      )
                    }
                    className="font-Poppins font-normal text-sm px-4 py-2 rounded-lg bg-[#FCDFD4] transition-all duration-300 hover:bg-[#F25E26] hover:text-white hover:shadow-lg transform hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Top Deals Section - Responsive Container */}
          <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-8 md:my-12 lg:my-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col gap-4 mb-6">
                <SubHeading title="Deals" />
                <Heading title="Shop from Top Deals Collection" />
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <div className="w-full">
                  <ProductCardMain cardInfo={topdeals?.data} isLoading={topdealsLoading} />
                </div>
                
                <div className="flex justify-center pt-2">
                  <DefaultButton
                    text="View all Deals"
                    type="button"
                    handleClick={() =>
                      router.push(
                        `/categories/${"top deals"}?top_id=${topdeals?.data[0]?.id}`,
                      )
                    }
                    className="font-Poppins font-normal text-sm px-4 py-2 rounded-lg bg-[#FCDFD4] transition-all duration-300 hover:bg-[#F25E26] hover:text-white hover:shadow-lg transform hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Community Section - Full Width Background */}
          <section className="w-full bg-[#F6F6F6] py-8 md:py-12 lg:py-16 content-visibility-auto">
            <div className="w-full">
              <Community />
            </div>
          </section>

          {/* Top Week Products Section - Responsive Container */}
          <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-8 md:my-12 lg:my-16 content-visibility-auto">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col gap-4 mb-6">
                <SubHeading title="Top Product" />
                <Heading title="This Week Top Product" />
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <div className="w-full">
                  <ProductCardMain cardInfo={topweak?.data?.slice(0, 8)} isLoading={topweakLoading} />
                </div>
                
                <div className="flex justify-center pt-2">
                  <DefaultButton
                    text="View all Deals"
                    type="button"
                    handleClick={() =>
                      router.push(
                        `/categories/${"This Week Top Product"}?top_id=${topdeals?.data[0]?.id}`,
                      )
                    }
                    className="font-Poppins font-normal text-sm px-4 py-2 rounded-lg bg-[#FCDFD4] transition-all duration-300 hover:bg-[#F25E26] hover:text-white hover:shadow-lg transform hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Banner Section - Full Width */}
          <section className="w-full content-visibility-auto">
            <Banner />
          </section>
        </main>

        {/* Footer - Full Width */}
        <Footer />
      </Suspense>
    </>
  );
};

export default Page;