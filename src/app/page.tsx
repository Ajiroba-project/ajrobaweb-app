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
import { Banner } from "./component/Banner";
import { Community } from "./component/Community";
import { Products, categories } from "./static-data";
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import { useState, useEffect } from "react";
import "./globals.css";
import { Suspense } from "react";
import { CircularPagination } from "./component/Pagination";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/store";
import { useQueryData } from "@/hooks/useQueryData";
import { AuctionComp } from "./component/AuctionComp";

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

  const totalPages = Math.ceil(Products.length / cardsPerPage);
  const catCount = Math.ceil(categories.length / cardsPerPage);
  const router = useRouter();

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

  useEffect(() => {
    if (categoriesInfo?.data) {
      const filteredCat = categoriesInfo.data.slice(
        categoryCurrentPage * cardsPerPage,
        (categoryCurrentPage + 1) * cardsPerPage,
      );
      setFilteredCatData(filteredCat);
    }
  }, [categoriesInfo, categoryCurrentPage, cardsPerPage]);

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

  return (
    <>
      <Suspense>
         <header className="fixed z-50 w-full">
          <Header />
        </header>

        <main className="w-full pt-[13vh] md:pt-[20vh] lg:pt-[20vh]">
           <section>
            <div className="">
              <Hero />
            </div>
          </section>

          <section className="container my-[3rem] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <SubHeading title="Today" />

              <div className="flex items-center">
                <CircularPagination
                  pageCount={totalPages}
                  onPageChange={({ selected }) => handleAuctionChange(selected)}
                  className="flex items-center"
                />
              </div>
            </div>

            <div>
              <Heading title="Auction Sales" />
            </div>
            <div className="">
            {/*   <AuctionCard
                cardInfo={filteredAuctionData}
                currentPage={0}
                cardsNum={0}
              /> */}
              <AuctionComp

              cardInfo={filteredAuctionData}
                currentPage={0}
                cardsNum={0}
              />
            {/*   <AuctionComp cardInfo={[]} currentPage={0} cardsNum={0}/> */}
            </div>
          </section>

          <section className="container my-28 flex flex-col  gap-4">
            <div>
              <SubHeading title="How it works" />
            </div>
            <HIW />
            <p className="cursor-pointer text-xl font-semibold text-[#F25E26] underline lg:ml-5">
              Read more
            </p>
          </section>


          <section className="container my-28 flex flex-col  gap-4">
            <div className="flex items-center justify-between">
              <SubHeading title="Categories" />
              <div className="relative flex items-center">
                <CircularPagination
                  pageCount={totalPages}
                  onPageChange={({ selected }) => handleAuctionChange(selected)}
                  className="flex items-center"
                />
              </div>
            </div>

            <div className="">
              <Heading title="Shop by Categories" />
            </div>

            <div className="flex flex-col justify-center">
               <CategoryFeatureCard cardInfo={filteredCatData} />
              <div className="flex justify-center pt-8">
                <DefaultButton
                  text="View all Categories"
                  type="button"
                  handleClick={() => router.push("/categories")}
                  className="h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all"
                />
              </div>
            </div>
          </section>

          <section className="container my-28 flex flex-col  gap-4">
            <div>
              <SubHeading title="Featured" />
            </div>
            <div>
              <Heading title="Featured Products" />
            </div>
            <div className="flex flex-col items-center  ">
              <ProductCard cardInfo={featuredproductInfo?.data} />
              <div className="flex justify-center pt-4">
                <DefaultButton
                  text="View all Deals"
                  type="button"
                  handleClick={() =>
                    router.push(
                      `/categories/${"featured products"}?feat_id=${featuredproductInfo?.data[0]?.id}`,
                    )
                  }
                  className="h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all"
                />
              </div>
            </div>
          </section>

          <section className="container my-28 flex flex-col  gap-4">
            <div>
              <SubHeading title="Deals" />
            </div>
            <div>
              <Heading title="Shop from Top Deals Collection" />
            </div>
            <div className="flex flex-col items-center">
              <TopDealsCard cardInfo={topdeals?.data} />
              <div className="flex justify-center pt-4">
                <DefaultButton
                  text="View all Deals"
                  type="button"
                  handleClick={() =>
                    router.push(
                      `/categories/${"top deals"}?top_id=${topdeals?.data[0]?.id}`,
                    )
                  }
                  className="h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all"
                />
              </div>
            </div>
          </section>

          <section className="bg-[#F6F6F6]">
            <div>
              <Community />
            </div>
          </section>

          <section className="container my-28 flex flex-col  gap-4">
            <div>
              <SubHeading title="Top Product" />
            </div>
            <div>
              <Heading title="This Week Top Product" />
            </div>
            <div className="flex flex-col items-center">
              <TopWeakCard cardInfo={topweak?.data?.slice(0, 8)} />
              <div className="flex justify-center pt-4">
                <DefaultButton
                  text="View all Products"
                  type="button"
                  handleClick={() => router.push("/categories")}
                  className="h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all"
                />
              </div>
            </div>
          </section>

          <section className="bg-[#F25E26]">
            <Banner />
          </section>
        </main>
        <Footer />
      </Suspense>
    </>
  );
};

export default Page;
