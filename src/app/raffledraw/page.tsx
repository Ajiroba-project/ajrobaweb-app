'use client'
import { Fragment, useState, useEffect, useMemo, useRef, Suspense } from 'react'
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
import {
  PickersLayout,
  PickersLayoutProps
} from '@mui/x-date-pickers/PickersLayout'

interface AuctionResponse {
  data: any[]
}

const ITEMS_PER_PAGE = 12

const AuctionPage = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [calendarOpen, setCalendarOpen] = useState(true)
  const [tempDate, setTempDate] = useState<Date | null>(selectedDate)

  const {
    data: auctionInfo,
    isFetching: auctionfetching
  } = useQueryData<AuctionResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auction/auctions/`,
    ['get auctiondetails'],
    true
  )

  const filteredData = useMemo(() => {
    if (!auctionInfo?.data) return []
    return auctionInfo.data.slice(
      currentPage * ITEMS_PER_PAGE,
      (currentPage + 1) * ITEMS_PER_PAGE
    )
  }, [currentPage, auctionInfo?.data])

  const pageCount = Math.ceil((auctionInfo?.data?.length ?? 0) / ITEMS_PER_PAGE)

  const { setHeaderNav, headerNav } = userNavStore(state => ({
    setHeaderNav: state.setHeaderNav,
    headerNav: state.headerNav
  }))

  useEffect(() => {
    if (headerNav !== 'auction') {
      setHeaderNav('Auction Deals')
    }
  }, [headerNav, setHeaderNav])

  const isAuctionActive = auctionInfo?.data?.some(
    (item: any) => item.starts_in !== 'Raffle Ended'
  ) ?? false

  const auctionDatesParsed = useMemo(() => {
    if (!filteredData.length) return []
    return filteredData
      .map((item: any) => parse(item.start_date, 'dd MMMM, yyyy', new Date()))
      .filter((date: Date) => !isNaN(date.getTime()))
  }, [filteredData])

  // Refs keep handlers fresh without changing CustomDatePickerLayout identity
  const handlersRef = useRef({
    handleOk: () => {},
    handleCancel: () => {}
  })
  handlersRef.current.handleOk = () => {
    setSelectedDate(tempDate)
    setCalendarOpen(false)
  }
  handlersRef.current.handleCancel = () => {
    setTempDate(selectedDate)
    setCalendarOpen(false)
  }

  // Stable layout component — never remounts, reads handlers from ref
  const CustomDatePickerLayout = useMemo(
    () =>
      function Layout(props: PickersLayoutProps<any>) {
        return (
          <div style={{ position: 'relative' }}>
            <PickersLayout {...props} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 2,
                mb: 2,
                px: 2
              }}
            >
              <Button color='warning' onClick={() => handlersRef.current.handleCancel()}>
                Cancel
              </Button>
              <Button color='warning' onClick={() => handlersRef.current.handleOk()}>
                OK
              </Button>
            </Box>
          </div>
        )
      },
    []
  )

  return (
    <Fragment>
      <header className='fixed z-50 w-full'>
        <Header />
      </header>

      <div className='h-24 md:h-28 lg:h-32' />

      <div className='container mb-8 py-4'>
        <p className='text-center font-Poppins text-sm font-extrabold text-[#504D4D] md:text-[20px] lg:text-[20px] xl:text-[20px] 2xl:text-[20px]'>
          Raffle Draw Products
        </p>
      </div>

      <AuctionBanner text='Auction Deals' banner={auctionImg} />
      <main className='container my-4 content-container'>
        <section className='my-5 flex flex-col items-center justify-between gap-5 lg:flex-row'>
          <div
            className='cursor-pointer text-[#F25E26] underline lg:text-xl'
            onClick={() => router.push('/rafflevideos')}
          >
            View All Raffle Draw Video
          </div>

          <div>
            <span className='mb-4 py-8 font-Poppins font-bold text-xl'>Raffle Calendar</span>
            {isAuctionActive ? (
              <div className='mt-2'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    desktopModeMediaQuery='@media (min-width: 0px)'
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
                        )
                        return (
                          <button
                            type='button'
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
                              background: isAuctionDay
                                ? '#F25E26'
                                : 'transparent',
                              color: isAuctionDay ? '#fff' : '#222',
                              fontWeight: isAuctionDay ? 700 : 400,
                              fontSize: 18,
                              cursor: 'pointer',
                              border: 'none'
                            }}
                            onClick={() => setTempDate(day)}
                          >
                            {day.getDate()}
                          </button>
                        )
                      },
                      layout: CustomDatePickerLayout
                    }}
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        sx: {
                          '& input': {
                            padding: 2,
                            borderRadius: 2,
                            fontSize: 18
                          }
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
              <p>Raffle draw has ended.</p>
            )}
          </div>
        </section>

        <section className='my-4'>
          {auctionfetching ? (
            <Loading />
          ) : (
            <AuctionComp
              cardInfo={filteredData}
              currentPage={currentPage}
              cardsNum={ITEMS_PER_PAGE}
            />
          )}
          <Pagination
            pageCount={pageCount}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            className='my-6 flex items-center justify-center gap-4'
          />
        </section>
      </main>
      <Footer />
    </Fragment>
  )
}

export default function Page() {
  return (
    <Suspense>
      <AuctionPage />
    </Suspense>
  )
}
