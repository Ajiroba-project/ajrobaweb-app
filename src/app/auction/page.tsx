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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Button, Box } from '@mui/material'
import Loading from '../component/Loading'
import { parse } from 'date-fns'
import { PickersLayout, PickersLayoutProps } from '@mui/x-date-pickers/PickersLayout'

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

// Helper to parse "29 June, 2025" to Date
const parseAuctionDate = (dateStr: string) =>
  parse(dateStr, 'dd MMMM, yyyy', new Date());

const AuctionPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [itemsPerPage] = useState<number>(12);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(true);
  const [tempDate, setTempDate] = useState<Date | null>(selectedDate);

  const { data: auctionInfo, isLoading: auctionLoading, isFetching: auctionfetching, } = useQueryData<AuctionResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auction/auctions/`,
    ['get auctiondetails'],
    true
  );


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

  // Inside your component:
  const auctionDatesParsed = useMemo(() => {
    return filteredData
      .map((item: any) => parse(item.start_date, 'dd MMMM, yyyy', new Date()))
      .filter((date: Date) => !isNaN(date.getTime()));
  }, [filteredData]);

  const handleOk = () => {
    setSelectedDate(tempDate);
    setCalendarOpen(false);
  };

  const handleCancel = () => {
    setTempDate(selectedDate); // revert temp selection
    setCalendarOpen(false);
  };

  // --- Custom Layout INSIDE the component, using closure for handlers ---
  function CustomDatePickerLayout(props: PickersLayoutProps<any>) {
    return (
      <div style={{ position: 'relative' }}>
        <PickersLayout {...props} />
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mt: 2,
          mb: 2,
          px: 2,
        }}>
          <Button color="warning" onClick={handleCancel}>Cancel</Button>
          <Button color="warning" onClick={handleOk}>OK</Button>
        </Box>
      </div>
    );
  }

  { auctionfetching && <Loading /> }


  return (
    <Fragment>
      <header className='fixed z-50 w-full'>
        <Header />
      </header>
      <AuctionBanner text='Auction Deals' banner={auctionImg} />
      <main className='container my-4'>
        <section className='my-5 flex flex-col items-center justify-between gap-5 lg:flex-row'>
          <div className="text-[#F25E26] underline lg:text-xl cursor-pointer" onClick={() => router.push("/rafflevideos")}>
            View All Raffle Draw Video
          </div>

          {/* Date Input */}
          
          <div>
            <span className=' font-Poppins py-8 mb-4'>Auction Calendar</span>
            {isAuctionActive ? (
              <div className='mt-2'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    desktopModeMediaQuery="@media (min-width: 0px)"
                    open={calendarOpen}
                    onOpen={() => setCalendarOpen(true)}
                    onClose={() => setCalendarOpen(false)}
                    value={tempDate}
                    onChange={(date: Date | null) => setTempDate(date)}
                    slots={{
                      day: ({ day, selected, ...rest }) => {
                        const isAuctionDay = auctionDatesParsed.some(
                          (d: Date) =>
                            d.getDate() === day.getDate() &&
                            d.getMonth() === day.getMonth() &&
                            d.getFullYear() === day.getFullYear()
                        );
                        return (
                          <button
                            type="button"
                            tabIndex={rest.tabIndex}
                            aria-label={rest['aria-label']}
                            style={{
                              width: 40,
                              height: 40,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '50%',
                              margin: 2,
                              background: isAuctionDay ? '#F25E26' : 'transparent',
                              color: isAuctionDay ? '#fff' : '#222',
                              fontWeight: isAuctionDay ? 700 : 400,
                              fontSize: 18,
                              cursor: 'pointer',
                              border: 'none',
                            }}
                            onClick={() => setTempDate(day)}
                          >
                            {day.getDate()}
                          </button>
                        );
                      },
                      layout: CustomDatePickerLayout,
                    }}
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        sx: {
                          '& input': { padding: 2, borderRadius: 2, fontSize: 18 }
                        }
                      },
                      popper: {
                        sx: { pb: 6 }
                      }
                    }}
                  />
                </LocalizationProvider>
              </div>
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



