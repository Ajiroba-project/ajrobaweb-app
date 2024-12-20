'use client'
import { Fragment, useState, useEffect, useMemo, Suspense } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { AuctionBanner } from '../component/AuctionBanner'
import { AuctionComp } from '../component/AuctionComp'
import { Pagination } from '../component/Pagination'
import { useRouter } from 'next/navigation'
import auctionImg from '../asset/image/auction-banner.png'
import { useQueryData } from '@/hooks/useQueryData'
import { userNavStore } from '@/store/store'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Loading from '../component/Loading'

// Add this helper function to get auction dates from the data
const extractAuctionDates = (data: any[]) => {
  return data.map((item: { auctionDate: string | number | Date }) => new Date(item.auctionDate)); // Ensure `auctionDate` is in a valid format
}

interface AuctionItem {
  starts_in: string
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  auctionDate: string; // Add auction date to the interface
}

interface AuctionResponse {
  data: AuctionItem[];
}

const AuctionPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [itemsPerPage] = useState<number>(12);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const { data: auctionInfo, isLoading: auctionLoading,    isFetching: auctionfetching, } = useQueryData<AuctionResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auction/auctions/`,
    ['get auctiondetails'],
    true
  );

  // console.log(auctionInfo?.data);

  // Extract and set auction dates
  const auctionDates = useMemo(() => {
    if (auctionInfo?.data) {
      return extractAuctionDates(auctionInfo.data);
    }
    return [];
  }, [auctionInfo]);

  useMemo(() => {
    if (auctionInfo?.data) {
      const filteredProducts = auctionInfo?.data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      );
      setFilteredData(filteredProducts);
    }
  }, [currentPage, itemsPerPage, auctionInfo]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageCount = Math.ceil((auctionInfo?.data.length || 0) / itemsPerPage);

  const { setHeaderNav, headerNav } = userNavStore(state => ({
    setHeaderNav: state.setHeaderNav,
    headerNav: state.headerNav,
  }));

  useEffect(() => {
    if (headerNav !== 'auction') {
      setHeaderNav('Auction Deals');
    }
  }, [headerNav, setHeaderNav]);  // Add `path` as a dependency to avoid unnecessary updates

  // Check if there are active auctions based on current data
  const isAuctionActive = auctionInfo?.data.some(item => item.starts_in !== "Raffle Ended");

  // Exclude dates that are not part of the auction dates
  const excludedDates = auctionDates.filter(date => {
    const today = new Date();
    return date < today; // Example: Exclude past dates
  });


      {auctionfetching && <Loading />}


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

          {/* Date Input */}
          <div>
            {isAuctionActive ? (
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                excludeDates={excludedDates}
                className=" rounded border p-4"
              />
            ) : (
              <p>Auction has ended.</p>
            )}
          </div>
        </section>

        <section className='my-4'>
    {/*       <h1>Auction</h1> */}
        {
          auctionfetching ? <Loading /> : (
            <AuctionComp
              cardInfo={filteredData}
              currentPage={currentPage}
              cardsNum={itemsPerPage}
            />
          )
        }
          <Pagination
            pageCount={pageCount}
            onPageChange={({ selected }) => handlePageChange(selected)}
            className='my-6 flex items-center justify-center gap-4 '
          />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}

export default function Page() {
  return (
    <Suspense>
      <AuctionPage />
    </Suspense>
  );
}

