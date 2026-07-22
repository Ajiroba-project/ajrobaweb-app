'use client'
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  use,
  memo,
} from 'react'
import { useRouter } from 'next/navigation'
import { ProductBreadcrumb } from '@/app/component/Breadcrumb'
import { Header } from '@/app/component/Header'
import { Footer } from '@/app/component/Footer'
import Image from 'next/image'
import './style.css'
import { FaStar } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { parseISO, format } from 'date-fns'
import { RelatedAuctionDetails } from '@/app/component/RelatedAuctionDetails'
import Loading from '@/app/component/Loading'
import Cookies from 'js-cookie'
import ModalComponent from '@/app/component/ModalComponent'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Input from '@/app/component/Input'
import { useMutateData } from '@/hooks/useMutateNewData'
import { DefaultButton } from '@/app/component/Button'
import InputAction from '@/app/component/InputAction'
import verify from '@/app/asset/verify.svg'
import Link from 'next/link'
import Brand from '@/app/asset/logo.svg'
import { useGetDatanew } from '@/hooks/useGetData'
import RaffleTicket from '@/app/component/RaffleTicket'
import { formatCurrency } from '@/utils/formatCurrency'

// ── Stable references outside component ──────────────────────────────

interface ProductData {
  id?: string
  name?: string
  price?: number
  data?: any
}

interface BidInfoResponse {
  data: any
  category: any
  name: any
  ticket_price: any
  id: any
  images: any
  subcategory: any
}

interface TicketInfoResponse {
  data?: any
  category?: any
  name?: any
  ticket_price?: any
  id?: any
  images?: any
  subcategory?: any
  ticket_name?: any
}

const walletPinSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(6, "Can't be lesser than 6 digits")
})

function parseStartsIn(startsIn = '0 Days, 0 Hr: 3 Mins Left') {
  // Accept singular/plural variants: Day/Days, Hr/Hrs, Min/Mins.
  const daysMatch = startsIn.match(/(\d+)\s*Day(?:s)?/i)
  const hoursMatch = startsIn.match(/(\d+)\s*Hr(?:s)?/i)
  const minutesMatch = startsIn.match(/(\d+)\s*Min(?:s)?/i)
  const secondsMatch = startsIn.match(/(\d+)\s*Sec(?:s)?/i)

  const daysLeft = daysMatch ? parseInt(daysMatch[1], 10) : 0
  const hoursLeft = hoursMatch ? parseInt(hoursMatch[1], 10) : 0
  const minutesLeft = minutesMatch ? parseInt(minutesMatch[1], 10) : 0
  const secondsLeft = secondsMatch ? parseInt(secondsMatch[1], 10) : 0
  const hasExplicitSeconds = !!secondsMatch

  // Backend string usually has no seconds. Add a small buffer so countdown
  // does not hit 0 up to ~1 minute before backend "starts_in" rolls over.
  const totalSeconds =
    daysLeft * 86400 +
    hoursLeft * 3600 +
    minutesLeft * 60 +
    (hasExplicitSeconds ? secondsLeft : (daysLeft || hoursLeft || minutesLeft ? 59 : 0))

  return {
    totalSeconds,
    daysLeft,
    hoursLeft,
    minutesLeft
  }
}

const AjirobaLogo = () => (
  <div className='mb-4'>
    <Link href='/'>
      <Image src={Brand} alt='brand-logo' />
    </Link>
  </div>
)

const CountdownTimer = memo(({ startsIn = '0 Days, 0 Hr: 0 Mins Left' }: { startsIn?: string }) => {
  const { totalSeconds: initialTotalSeconds } = parseStartsIn(startsIn)
  const [timeLeft, setTimeLeft] = useState(initialTotalSeconds)

  useEffect(() => {
    setTimeLeft(initialTotalSeconds)
  }, [initialTotalSeconds])

  useEffect(() => {
    if (initialTotalSeconds <= 0) return
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(prev - 1, 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [initialTotalSeconds])

  const daysLeft = Math.floor(timeLeft / 86400)
  const hoursLeft = Math.floor((timeLeft % 86400) / 3600)
  const minutesLeft = Math.ceil((timeLeft % 3600) / 60)

  const progress =
    initialTotalSeconds > 0
      ? (timeLeft / initialTotalSeconds) * 100
      : 0

  return (
    <div className='mb-3'>
      <p className='mb-2 text-xs capitalize'>
        <span className='font-medium'>{daysLeft}</span> dy:{' '}
        <span className='font-medium'>{hoursLeft}</span> Hr:{' '}
        <span className='font-medium'>{minutesLeft}</span> Min{' '}
        <span className='font-medium'>Left</span>
      </p>
      <div className='h-2.5 w-full rounded-full border border-[#B7B7B7]'>
        <div
          className='h-2 rounded-full bg-[#F25E26]'
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
})
CountdownTimer.displayName = 'CountdownTimer'

const CustomerReview = memo(({ data }: any) => {
  const [selectedStars, setSelectedStars] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 2

  const sortedRatings = useMemo(
    () => [...(data?.data?.rating_counts || [])].sort(
      (a: { stars: number }, b: { stars: number }) => b.stars - a.stars
    ),
    [data?.data?.rating_counts]
  )

  const filteredReviews = useMemo(
    () => selectedStars
      ? (data?.data?.reviews || []).filter((review: any) => review.rating === selectedStars)
      : data?.data?.reviews || [],
    [data?.data?.reviews, selectedStars]
  )

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage)
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedStars])

  return (
    <div className='container py-4'>
      <h1 className='text-center font-Poppins text-lg font-medium text-[#353131] md:text-start'>
        Customer Review
      </h1>

      <div className='mt-6 flex flex-col gap-8 sm:mt-8 md:flex-row md:items-start md:gap-12'>
        <div className='w-full md:w-1/2'>
          <p className='mt-4 flex items-center gap-1 text-sm text-[#111111]'>
            {Array.from(
              { length: data?.data?.product_reviews?.average_ratings || 0 },
              (_, index) => (
                <span key={index}>
                  <FaStar className='text-[#F25E26]' />
                </span>
              )
            )}
            <span className='ml-4 font-Poppins text-[8px] font-normal text-[#2A2A2A]'>
              ({data?.data?.product_reviews?.total_reviews}) Reviews
            </span>
          </p>

          {sortedRatings.map(
            (item: { stars: number; customers: number }, index: number) => (
              <div key={index} className='flex items-center gap-4 py-2'>
                <span className='font-Poppins text-[16px] text-[#353131]'>
                  {item.stars} stars
                </span>
                <div className='flex-1'>
                  <div className='h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700'>
                    <div
                      className='h-2.5 rounded-full bg-[#E84526]'
                      style={{ width: `${item.customers}%` }}
                    />
                  </div>
                </div>
                <small className='font-Poppins text-[16px] text-[#353131]'>
                  {item.customers}
                </small>
              </div>
            )
          )}

          <div className='mt-4'>
            <p>Filter By:</p>
          </div>

          <div className='flex flex-wrap gap-2'>
            {sortedRatings.map((item: { stars: number }) => (
              <button
                key={item.stars}
                onClick={() => setSelectedStars(item.stars)}
                className={`mt-4 border border-[#D2D2D2] px-4 py-2 font-Poppins text-[16px] text-sm ${
                  selectedStars === item.stars
                    ? 'bg-[#F25E26] font-bold text-white'
                    : 'bg-white font-normal text-black'
                } rounded`}
              >
                {item.stars} Star
              </button>
            ))}
            <button
              onClick={() => setSelectedStars(null)}
              className={`mt-4 border border-[#D2D2D2] px-4 py-2 font-Poppins text-[16px] text-sm ${
                selectedStars === null
                  ? 'bg-[#F25E26] font-bold text-white'
                  : 'bg-white font-normal text-black'
              } rounded`}
            >
              All Stars
            </button>
          </div>
        </div>

        <div className='w-full md:w-1/2'>
          {currentReviews.map((item: any, key: number) => {
            const date = item?.date_created ? parseISO(item.date_created) : null
            const formattedDate = date ? format(date, 'dd/MM/yyyy') : 'Invalid Date'

            return (
              <div key={key} className='flex gap-2'>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}${item?.user?.profile_image}`}
                  height={40}
                  width={40}
                  alt='Profile Image'
                  className='rounded-full object-cover'
                  style={{ borderRadius: '50%' }}
                />
                <div className='mb-8 flex-1'>
                  <p className='font-Poppins text-[16px] font-bold text-[#2A2A2A]'>
                    {`${item.user.first_name}  ${item.user.last_name}`}
                  </p>
                  <p className='mt-4 flex items-center gap-1 font-Poppins text-sm text-[#2A2A2A]'>
                    {Array.from({ length: item?.rating }, (_, index) => (
                      <span key={index}>
                        <FaStar className='text-[#F25E26]' />
                      </span>
                    ))}
                    {formattedDate}
                  </p>
                  <p className='font-Poppins text-[13px] font-normal'>
                    {item.comment}
                  </p>
                </div>
              </div>
            )
          })}

          <div className='mt-4 flex justify-end'>
            <h1 className='text-center text-[#E84526]'>Pages</h1>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1
              return (
                <h1
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`cursor-pointer px-2 ${
                    currentPage === pageNumber
                      ? 'font-bold text-[#353131]'
                      : 'text-[#353131]'
                  }`}
                >
                  {pageNumber}
                </h1>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
})
CustomerReview.displayName = 'CustomerReview'

// ── Main Page Component ──────────────────────────────────────────────

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug: product_id } = use(params)
  const router = useRouter()

  const [makepayment, setmakepayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')

  const [productdatanew, setProductDataNew] = useState<ProductData | null>(null)
  const [loadingdata, setLoadingData] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const [bidopen, setbidopen] = useState(false)
  const [bidData, setBidData] = useState<BidInfoResponse | null>(null)
  const [viewticket, setViewTicket] = useState(false)
  const [ticketData, setTicketData] = useState<TicketInfoResponse | null>(null)
  const [ticketPrice, setTicketPrice] = useState(0)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [successbid, setSuccessbid] = useState(false)
  const [ticketCount, setTicketCount] = useState(1)
  const [auctionId, setAuctionId] = useState('')
  const [confirmordermodal, setConfirmOrder] = useState(false)

  const totalAmount = ticketPrice * ticketCount

  const userToken = (Cookies.get('token') as string) || ''

  // ── Data Fetching ────────────────────────────────────────────────

  const fetchWithAuth = useCallback(async (url: string) => {
    setLoadingData(true)
    const token = Cookies.get('token') as string
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: token ? { Authorization: `token ${token}` } : undefined,
      redirect: 'follow'
    }

    try {
      const response = await fetch(url, requestOptions)
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
      const result = await response.json()
      setProductDataNew(result)
      setError(null)
      return result
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Fetch failed'))
      throw err
    } finally {
      setLoadingData(false)
    }
  }, [])

  const fetchData = useCallback(async () => {
    try {
      return await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auction/view_auction/${product_id}/`
      )
    } catch {
      return null
    }
  }, [product_id, fetchWithAuth])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // ── Smart Polling ────────────────────────────────────────────────

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isPollingActiveRef = useRef(false)

  useEffect(() => {
    const startsIn = productdatanew?.data?.starts_in
    const shouldPoll =
      productdatanew &&
      startsIn !== 'Raffle Started' &&
      startsIn !== 'Raffle Ended' &&
      typeof startsIn === 'string' &&
      startsIn.includes('Left')

    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current)
      pollingIntervalRef.current = null
    }

    if (shouldPoll && !isPollingActiveRef.current) {
      isPollingActiveRef.current = true
      pollingIntervalRef.current = setInterval(async () => {
        const data = await fetchData()
        if (
          data?.data?.starts_in === 'Raffle Started' ||
          data?.data?.starts_in === 'Raffle Ended'
        ) {
          isPollingActiveRef.current = false
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current)
            pollingIntervalRef.current = null
          }
        }
      }, 30000)
    } else if (!shouldPoll) {
      isPollingActiveRef.current = false
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
        pollingIntervalRef.current = null
      }
      isPollingActiveRef.current = false
    }
  }, [productdatanew?.data?.starts_in, fetchData])

  // ── Image Selection ──────────────────────────────────────────────

  useEffect(() => {
    if (productdatanew?.data?.images?.length > 0) {
      setSelectedImageIndex(0)
    }
  }, [productdatanew?.data?.images])

  const handleImageClick = useCallback((index: number) => {
    setSelectedImageIndex(index)
  }, [])

  // ── Form Setup ───────────────────────────────────────────────────

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(walletPinSchema)
  })

  // ── User Info ────────────────────────────────────────────────────

  const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/user/view_profile/`
  const { data: userInfo } = useGetDatanew(
    profileUrl,
    'get_user_details',
    userToken || ' '
  )

  // ── Ticket Count Handlers ────────────────────────────────────────

  const handleIncrease = useCallback(() => {
    setTicketCount(prev => prev + 1)
  }, [])

  const handleDecrease = useCallback(() => {
    setTicketCount(prev => (prev > 1 ? prev - 1 : prev))
  }, [])

  useEffect(() => {
    if (bidData?.ticket_price) {
      const initialPrice = Number(bidData.ticket_price)
      setTicketPrice(initialPrice)
      setAuctionId(bidData.id)
      setTicketCount(1)
    }
  }, [bidData])

  // ── API Callbacks ────────────────────────────────────────────────

  const showToast = useCallback((type: 'success' | 'error', message: string, onClose?: () => void) => {
    toast[type](message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
      onClose
    })
  }, [])

  const handleSuccess = useCallback((data: any) => {
    const status = data?.data?.status || data?.status
    if ([200, 201].includes(status) || status === 'success') {
      setBidData(null)
      localStorage.setItem('pin_id', 'yes')
      console.log(data, 'data')
      showToast('success', data?.data?.message || 'PIN verified successfully', () => {
        if (data?.data?.message?.includes('Order placed successfully. Order Code')) {
          router.push('/profile')
        } else {
          router.push('/paymentpage')
        }
      })
    } else {
      showToast('error', data?.data?.message || 'An error occurred')
    }
    reset()
  }, [reset, router, showToast])

  const handleError = useCallback(() => {
    showToast('error', 'An error occurred')
    reset()
  }, [reset, showToast])

  const { mutate, status: verifystatus } = useMutateData(
    'verifywalletpin',
    handleSuccess,
    handleError
  )

  const handleSuccessbidpayment = useCallback((data: any) => {
    const status = data?.data?.status || data?.status
    if ([200, 201].includes(status) || status === 'success') {
      setTicketData(data?.data)
      setSuccessbid(true)
      showToast('success', data?.data?.message || 'Bid payment successful')
    } else {
      showToast('error', data?.data?.message || 'An error occurred')
    }
    reset()
  }, [reset, showToast])

  const handleErrorbidpayment = useCallback(() => {
    console.log('error')
    showToast('error', 'An error occurred')
    reset()
  }, [reset, showToast])

  const { mutate: bidpaymentmutate } = useMutateData(
    'bidpayment',
    handleSuccessbidpayment,
    handleErrorbidpayment
  )

  const handleSuccesspayment = useCallback((data?: any) => {
    const status = data?.data?.status || data?.status
    if ([200, 201].includes(status) || status === 'success') {
      setBidData(null)
      setbidopen(false)
      setmakepayment(false)
      showToast('success', data?.data?.message || 'PIN verified successfully')

      const payWithMethod =
        paymentMethod === 'wallet_balance' ? 'wallet_balance' : 'wallet_point'

      bidpaymentmutate({
        url: '/api/bidpayment',
        payload: {
          payload: {
            auction: auctionId,
            ticket_quantity: ticketCount,
            total_amount: totalAmount,
            pay_with: payWithMethod
          },
          token: userToken
        },
        token: userToken
      })
    } else {
      setbidopen(false)
      setmakepayment(false)
      showToast('error', data?.data?.message || 'An error occurred')
    }
    resetpayment()
  }, [paymentMethod, auctionId, ticketCount, totalAmount, userToken, bidpaymentmutate, showToast])

  const handleErrorpayment = useCallback(() => {
    setbidopen(false)
    showToast('error', 'An error occurred')
    resetpayment()
  }, [showToast])

  const {
    mutate: mutatev,
    status: paymentstatus,
    reset: resetpayment
  } = useMutateData('verifywalletpin', handleSuccesspayment, handleErrorpayment)

  // ── Form Submissions ─────────────────────────────────────────────

  const submitForm = useCallback((data: any) => {
    Cookies.set('nvd', data?.password, { expires: 1 })
    mutate({
      url: '/api/verifywalletpin',
      payload: { payload: { wallet_pin: data?.password }, token: userToken },
      token: userToken
    })
  }, [mutate, userToken])

  const submitFormf = useCallback((data: any) => {
    Cookies.set('pvd', data?.password, { expires: 1 })
    mutatev({
      url: '/api/verifywalletpin',
      payload: { payload: { wallet_pin: data?.password }, token: userToken },
      token: userToken
    })
  }, [mutatev, userToken])

  // ── Bid Click Handler ────────────────────────────────────────────

  const handleBidClick = useCallback(async (productId: any) => {
    if (!userToken) {
      showToast('error', 'Please sign in before you can bid')
      return
    }

    try {
      const response = await fetch('/api/bidinfo', {
        method: 'GET',
        headers: { Authorization: `${userToken}`, Params: productId },
        cache: 'no-cache'
      })

      if (!response.ok) return

      const data = await response.json()

      if (data.data.status === 'failed') {
        showToast('error', data.data.message)
      } else if (data.data.status === 'success') {
        setbidopen(true)
        setBidData(data?.data?.data)
        setTicketPrice(Number(data?.data?.data?.ticket_price))
      }
    } catch {
      showToast('error', 'An unexpected error occurred. Please try again.')
    }
  }, [userToken, showToast])

  // ── Memoized Raffle Button ───────────────────────────────────────

  const raffleStartedButton = useMemo(() => {
    const startsIn = productdatanew?.data?.starts_in
    const bidded = productdatanew?.data?.bidded

    if (startsIn === 'Raffle Started') {
      return (
        <div className='mt-4 flex min-h-[48px] items-center justify-center'>
          <button
            onClick={() => {
              if (bidded === 'false') {
                toast.error(
                  "You need to bid first before you can watch the raffle! But, Unfortunately, The bidding start time has been reached, you can't enter the raffle again.",
                  { position: 'top-center', autoClose: 5000, theme: 'light' }
                )
              } else {
                router.push(`/raffle/${product_id}`)
              }
            }}
            className='mt-4 rounded-lg bg-[#FCDFD4] px-12 py-2 font-Poppins text-sm font-normal transition delay-300 duration-300 ease-in-out hover:bg-[#E84526] hover:text-white hover:transition-all'
          >
            Raffle Started, Watch Live Raffle
          </button>
        </div>
      )
    }
    return null
  }, [productdatanew?.data?.starts_in, productdatanew?.data?.bidded, product_id, router])

  // ── Error logging ────────────────────────────────────────────────

  if (error) {
    console.error('Error fetching product data:', error)
  }

  // ── Render ───────────────────────────────────────────────────────

  return (
    <main className='content-container'>
      <Header />
      <div className='h-24 md:h-28 lg:h-32'></div>
      <div className='content-container'>
        <ProductBreadcrumb
          paths={['Raffle Draw', productdatanew?.data?.category_name, null]}
          text={undefined}
        />
      </div>

      <div onClick={() => router.back()}>
        <div className='container mx-auto flex w-[92%] sm:w-[94%] cursor-pointer justify-start'>
          <p className='relative bottom-10 text-base text-[#E84526] underline'>
            Back
          </p>
        </div>
      </div>

      <div className='mx-auto w-[92%] sm:w-[90%] font-Poppins text-sm font-semibold text-[#363636]'>
        {productdatanew?.data?.category_name} |{' '}
        {productdatanew?.data?.subcategory_name}
      </div>

      <section className='mx-auto w-[92%] sm:w-[90%] lg:w-[80%]'>
        {productdatanew ? (
          <>
            <div className='mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:justify-between'>
              <div className='flex w-full flex-col md:w-3/5'>
                <div className='w-full overflow-hidden rounded-lg'>
                  {productdatanew?.data?.images?.[selectedImageIndex] ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}${productdatanew.data.images[selectedImageIndex].image}`}
                      alt='Product Image'
                      width={600}
                      height={600}
                      sizes='(max-width: 768px) 92vw, (max-width: 1200px) 50vw, 560px'
                      quality={90}
                      priority
                      className='w-full h-auto object-cover rounded-lg'
                    />
                  ) : productdatanew?.data?.images?.[0] ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}${productdatanew.data.images[0].image}`}
                      alt='Product Image'
                      width={600}
                      height={600}
                      sizes='(max-width: 768px) 92vw, (max-width: 1200px) 50vw, 560px'
                      quality={90}
                      priority
                      className='w-full h-auto object-cover rounded-lg'
                    />
                  ) : (
                    <p>No main image available</p>
                  )}
                </div>

                <div className='mt-3 flex gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-x-visible'>
                  {productdatanew?.data?.images?.map(
                    (image: any, index: number) => (
                      <div
                        key={index}
                        className={`flex-shrink-0 cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                          selectedImageIndex === index
                            ? 'border-[#F25E26] ring-1 ring-[#F25E26]'
                            : 'border-transparent hover:border-gray-300'
                        }`}
                        onClick={() => handleImageClick(index)}
                      >
                        <Image
                          className='h-16 w-16 rounded-lg object-cover sm:h-20 sm:w-20 md:h-24 md:w-24'
                          src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}${image.image}`}
                          alt='Product Thumbnail'
                          width={96}
                          height={96}
                          sizes='96px'
                          quality={80}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              {productdatanew && (
                <div className='w-full md:w-2/5 md:pl-6'>
                  <div>
                    <h1 className='font-Poppins text-lg font-medium text-[#111111] sm:text-xl'>
                      {productdatanew?.data?.name}
                    </h1>

                    <div className='mt-3 flex items-center gap-2'>
                      <span className='font-Poppins text-sm font-normal text-[#111111]'>
                        Ticket Price
                      </span>
                      <span className='font-Poppins text-xl font-semibold text-[#111111]'>
                        &#x20A6;{' '}
                        {productdatanew?.data?.ticket_price?.toLocaleString()}
                      </span>
                    </div>

                    <hr className='mt-4' />

                    <div className='mt-4 grid grid-cols-2 gap-x-4 gap-y-3'>
                      <div>
                        <p className='text-sm text-[#777]'>Weight</p>
                        <p className='mt-1 font-Poppins text-sm font-bold text-[#111111]'>
                          {`${productdatanew?.data?.weight}` || 'NA'}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm text-[#777]'>Product ID</p>
                        <p className='mt-1 font-Poppins text-sm font-bold text-[#111111]'>
                          {`${productdatanew?.data?.product_no}` || 'NA'}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm text-[#777]'>Raffle Date</p>
                        <p className='mt-1 font-Poppins text-sm font-bold text-[#111111]'>
                          {productdatanew?.data?.start_date || 'NA'}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm text-[#777]'>Raffle Time</p>
                        <p className='mt-1 font-Poppins text-sm font-bold text-[#111111]'>
                          {productdatanew?.data?.start_time || 'NA'}
                        </p>
                      </div>
                    </div>

                    <hr className='mt-4' />

                    <div className='mt-4 rounded-lg bg-[#f6f6f6] p-3'>
                      <CountdownTimer startsIn={productdatanew?.data?.starts_in} />
                    </div>

                    {raffleStartedButton}
                    {productdatanew?.data?.starts_in !== 'Raffle Started' &&
                      (productdatanew?.data?.starts_in === 'Raffle Ended' ? (
                        <div className='mt-4 flex items-center justify-center md:justify-start'>
                          <button
                            disabled
                            className='w-full rounded-lg bg-[#71605A] px-8 py-3 font-Poppins text-sm font-normal text-[#FCDFD4] sm:w-auto sm:px-12'
                          >
                            Raffle Ended
                          </button>
                        </div>
                      ) : (
                        <div className='mt-4 flex items-center justify-center md:justify-start'>
                          {productdatanew?.data?.starts_in !== 'Raffle Ended' &&
                          (productdatanew?.data?.bidded === 'false' || productdatanew?.data?.bidded === 'true') ? (
                            <button
                              onClick={() => {
                                if (productdatanew?.data?.starts_in === 'Raffle Started') {
                                  toast.error(
                                    "The bidding start time has been reached, you can't enter the raffle again.",
                                    { position: 'top-center', autoClose: 5000, theme: 'light' }
                                  )
                                } else {
                                  handleBidClick(product_id)
                                }
                              }}
                              className='w-full rounded-lg bg-[#FCDFD4] px-8 py-3 font-Poppins text-sm font-medium transition-all duration-200 hover:bg-[#E84526] hover:text-white sm:w-auto sm:px-12'
                            >
                              Bid
                            </button>
                          ) : (
                            <button
                              disabled
                              className='w-full rounded-lg bg-[#71605A] px-8 py-3 font-Poppins text-sm font-normal text-[#FCDFD4] sm:w-auto sm:px-12'
                            >
                              Bidded
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className='flex items-center justify-center py-12 text-red-600'>
            Product Not Available
          </p>
        )}
      </section>

      <section className='mx-auto w-[92%] sm:w-[90%] lg:w-[80%]'>
        {productdatanew?.data?.description && (
          <div className='mb-12 mt-12 py-4 sm:mt-20'>
            <h1 className='font-Poppins text-lg font-bold text-[#1B1B1A] md:text-start'>
              Product Review
            </h1>

            <div className='mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:gap-12'>
              <div className='w-full md:w-1/2'>
                <p className='font-Poppins text-sm leading-7 text-[#363636] sm:text-base'>
                  {productdatanew?.data?.description}
                </p>
              </div>

              <div className='grid grid-cols-2 gap-3 sm:gap-4'>
                <div className='overflow-hidden rounded-lg'>
                  <Image
                    src={
                      productdatanew?.data?.images?.[0]?.image
                        ? `${process.env.NEXT_PUBLIC_BASE_URL_IMG}${productdatanew.data.images[0].image}`
                        : `${process.env.NEXT_PUBLIC_BASE_URL_IMG}${productdatanew?.data?.images?.[1]?.image}`
                    }
                    alt='Product Image'
                    width={400}
                    height={400}
                    sizes='(max-width: 768px) 45vw, 280px'
                    quality={90}
                    className='object-cover w-full h-auto rounded-lg'
                  />
                </div>
                <div className='overflow-hidden rounded-lg opacity-35'>
                  <Image
                    src={
                      productdatanew?.data?.images?.[1]?.image
                        ? `${process.env.NEXT_PUBLIC_BASE_URL_IMG}${productdatanew.data.images[1].image}`
                        : `${process.env.NEXT_PUBLIC_BASE_URL_IMG}${productdatanew?.data?.images?.[0]?.image}`
                    }
                    alt='Product Image'
                    width={400}
                    height={400}
                    sizes='(max-width: 768px) 45vw, 280px'
                    quality={90}
                    className='object-cover w-full h-auto rounded-lg'
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className='mx-auto w-[92%] sm:w-[90%] lg:w-[80%]'>
        {productdatanew?.data?.reviews && <CustomerReview data={productdatanew} />}
      </section>

      <section className='mx-auto w-[92%] sm:w-[90%] lg:w-[80%] py-4'>
        <h1 className='mb-8 mt-6 font-Poppins text-lg font-medium text-[#353131] sm:mb-12 sm:mt-8 md:text-start'>
          Other Related Products
        </h1>

        {productdatanew?.data?.related_products && (
          <RelatedAuctionDetails cardInfo={productdatanew.data.related_products} />
        )}
      </section>
      {loadingdata && <Loading />}

      {/* Make Payment Modal */}
      <ModalComponent
        content={
          <div className='px-3 py-3 sm:px-6 sm:py-4'>
            <div className='flex flex-col items-center justify-center'>
              <h1 className='text-center font-Poppins text-base font-bold sm:text-lg'>Make Payment</h1>
              <p className='text-center font-Poppins text-xs text-gray-500 sm:text-sm'>
                Kindly select your payment option
              </p>
            </div>

            <div className='mt-4 rounded-lg border border-gray-200 bg-[#FAFAFA] px-3 py-3 sm:px-4 sm:py-4'>
              <p className='mb-3 font-Poppins text-sm font-medium text-[#111111] sm:mb-4 sm:text-base'>
                Payment Method
              </p>

              <form>
                <label
                  htmlFor='wallet_balance'
                  className='mb-3 flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 transition-colors has-[:checked]:border-[#F25E26] has-[:checked]:bg-[#FFF8F5]'
                >
                  <input
                    type='radio'
                    id='wallet_balance'
                    name='payment_method'
                    value='wallet_balance'
                    onChange={() => setPaymentMethod('wallet_balance')}
                    className='mt-0.5 accent-[#F25E26]'
                  />
                  <div>
                    <span className='font-Poppins text-sm font-medium'>Wallet</span>
                    <p className='mt-0.5 font-Poppins text-xs text-gray-400'>
                      {formatCurrency(userInfo?.data?.my_wallet[0]?.balance)}
                    </p>
                  </div>
                </label>

                <label
                  htmlFor='wallet_point'
                  className='flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 transition-colors has-[:checked]:border-[#F25E26] has-[:checked]:bg-[#FFF8F5]'
                >
                  <input
                    type='radio'
                    id='wallet_point'
                    name='payment_method'
                    value='wallet_point'
                    onChange={() => setPaymentMethod('wallet_point')}
                    className='mt-0.5 accent-[#F25E26]'
                  />
                  <div>
                    <span className='font-Poppins text-sm font-medium'>Wallet + Ajiroba Points</span>
                    <p className='mt-0.5 font-Poppins text-xs text-gray-400'>
                      {formatCurrency(userInfo?.data?.my_wallet[0]?.balance)}{' '}
                      (Wallet) &amp; {userInfo?.data?.my_wallet[0]?.point?.toLocaleString()}{' '}
                      (Points)
                    </p>
                  </div>
                </label>
              </form>
            </div>

            <form
              className='mt-5 flex flex-col sm:mt-8'
              onSubmit={handleSubmit(submitFormf)}
            >
              <InputAction
                label='Enter Pin'
                type='password'
                name='password'
                placeholder='****'
                register={register}
                errors={errors.password}
                HiEyeSlash={<FaRegEyeSlash />}
                HiEye={<FaRegEye />}
              />
              <div className='text-xs text-red-700'>
                {errors?.password?.message}
              </div>

              <button
                className={`mt-5 w-full rounded-lg py-3 font-Poppins text-sm font-bold text-[#2A2A2A] transition-colors sm:mt-8 sm:text-base ${
                  !paymentMethod
                    ? 'cursor-not-allowed bg-gray-200 opacity-50'
                    : 'bg-[#FCDFD4] hover:bg-[#F25E26] hover:text-white'
                }`}
                disabled={!paymentMethod}
              >
                {paymentstatus === 'pending' ? '...' : 'Pay'}
              </button>
            </form>
          </div>
        }
        isModalOpen={makepayment}
        showModal={() => setmakepayment(!makepayment)}
        handleOk={() => setmakepayment(false)}
        handleCancel={() => setmakepayment(false)}
      />

      {/* Wallet Pin Modal */}
      <ModalComponent
        content={
          <div className='flex flex-col px-3 py-3 sm:px-6 sm:py-4'>
            <div className='flex flex-col items-center justify-center'>
              <p className='font-Poppins text-base font-bold text-[#2A2A2A] sm:text-xl'>
                Wallet Pin
              </p>
              <small className='font-Poppins text-sm text-[#504D4D] sm:text-lg'>
                Kindly enter your wallet pin
              </small>
            </div>

            <form
              className='mt-5 flex flex-col sm:mt-8'
              onSubmit={handleSubmit(submitForm)}
            >
              <Input
                label='Enter Pin'
                type='password'
                name='password'
                placeholder='****'
                register={register}
                errors={errors.password}
                HiEyeSlash={<FaRegEyeSlash />}
                HiEye={<FaRegEye />}
              />
              <div className='text-xs text-red-700'>
                {errors?.password?.message}
              </div>

              <button
                className='mt-5 w-full rounded-lg bg-[#FCDFD4] py-3 font-Poppins text-sm font-bold text-[#2A2A2A] transition-colors hover:bg-[#F25E26] hover:text-white sm:mt-8 sm:text-base'
              >
                {verifystatus === 'pending' ? '...' : 'Pay'}
              </button>
            </form>
          </div>
        }
        isModalOpen={confirmordermodal}
        showModal={() => setConfirmOrder(true)}
        handleOk={() => {}}
        handleCancel={() => setConfirmOrder(false)}
      />

      {/* Bid Modal */}
      <ModalComponent
        content={
          <div className='flex flex-col px-3 py-3 sm:px-6 sm:py-4'>
            <AjirobaLogo />

            <div className='flex items-center justify-between py-2'>
              <div
                onClick={() => setbidopen(false)}
                className='cursor-pointer font-Poppins text-sm text-red-500'
              >
                Back
              </div>
              <span className='rounded-full bg-[#FFF3EE] px-3 py-1 font-Poppins text-xs font-medium text-[#F25E26]'>
                Raffle Draw
              </span>
            </div>

            <div className='mb-3 flex items-center space-x-2 text-xs text-gray-500 sm:text-sm'>
              <span className='font-Poppins'>{bidData?.category}</span>
              <span>|</span>
              <span className='font-Poppins font-medium'>{bidData?.name}</span>
            </div>

            <div className='flex flex-col gap-4 sm:flex-row sm:items-start'>
              <div className='relative mx-auto flex h-40 w-32 flex-shrink-0 items-center justify-center rounded-lg sm:mx-0 sm:h-52 sm:w-40'>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}${bidData?.images[0] || ''}`}
                  alt={bidData?.name || 'Product Image'}
                  fill
                  className='rounded-lg object-cover'
                  sizes='(max-width: 640px) 128px, 160px'
                />
                <div className='absolute inset-0 rounded-lg bg-black/40' />
                <div className='absolute inset-0 z-10 flex flex-col items-center justify-center text-white'>
                  <div className='rounded-lg bg-[#F25E26] px-4 py-2 text-center'>
                    <span className='block text-[10px] sm:text-xs'>Raffle Ticket</span>
                    <span className='text-sm font-bold sm:text-base'>₦ {ticketPrice}</span>
                  </div>
                </div>
              </div>

              <div className='flex w-full flex-col gap-3'>
                <div>
                  <label className='font-Poppins text-xs text-gray-500 sm:text-sm'>Product</label>
                  <input
                    type='text'
                    value={bidData?.name || ''}
                    readOnly
                    className='mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-Poppins text-sm'
                  />
                </div>

                <div className='flex items-end justify-between gap-3'>
                  <div className='flex flex-col'>
                    <label className='font-Poppins text-xs text-gray-500 sm:text-sm'>
                      Ticket Price
                    </label>
                    <span className='mt-1 font-Poppins text-sm font-bold text-[#1B1B1A] sm:text-base'>
                      {formatCurrency(ticketPrice)}
                    </span>
                  </div>

                  <div className='flex flex-col items-center'>
                    <label className='font-Poppins text-xs text-gray-500 sm:text-sm'>
                      Quantity
                    </label>
                    <div className='mt-1 flex items-center gap-2'>
                      <button
                        className='flex h-7 w-7 items-center justify-center rounded-md bg-gray-200 text-sm font-bold transition-colors hover:bg-gray-300 disabled:opacity-40 sm:h-8 sm:w-8'
                        onClick={handleDecrease}
                        disabled={ticketCount <= 1}
                      >
                        -
                      </button>
                      <span className='w-8 text-center font-Poppins text-sm font-bold'>
                        {ticketCount}
                      </span>
                      <button
                        className='flex h-7 w-7 items-center justify-center rounded-md bg-[#F25E26] text-sm font-bold text-white transition-colors hover:bg-[#d94f1e] sm:h-8 sm:w-8'
                        onClick={handleIncrease}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className='font-Poppins text-xs text-gray-500 sm:text-sm'>
                    Total Amount
                  </label>
                  <input
                    type='text'
                    value={formatCurrency(totalAmount)}
                    readOnly
                    className='mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-Poppins text-sm font-bold sm:text-base'
                  />
                </div>

                <DefaultButton
                  text='Proceed'
                  type='submit'
                  handleClick={() => {
                    setmakepayment(true)
                    setbidopen(false)
                  }}
                  className='mt-2 w-full rounded-lg bg-[#FCDFD4] py-3 font-Poppins text-sm font-bold text-[#2A2A2A] transition-colors hover:bg-[#F25E26] hover:text-white sm:text-base'
                />
              </div>
            </div>
          </div>
        }
        isModalOpen={bidopen}
        showModal={() => setbidopen(!bidopen)}
        handleOk={() => setbidopen(false)}
        handleCancel={() => setbidopen(false)}
      />

      {/* Success Bid Modal */}
      <ModalComponent
        content={
          <div className='px-3 py-4 sm:px-6'>
            <div className='flex items-center justify-center py-2'>
              <Image src={verify} width={60} height={60} alt='icon' />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <h1 className='text-center font-Poppins text-base font-bold sm:text-lg'>Successful</h1>
              <p className='mt-1 text-center font-Poppins text-xs text-gray-500 sm:text-sm'>
                You have entered into raffle draw for this product. Good luck
              </p>
            </div>

            <div className='mt-4 flex flex-col items-center gap-3'>
              <DefaultButton
                text='Proceed'
                className='w-full rounded-lg bg-[#F25E26] py-3 font-Poppins text-sm font-bold text-white transition-colors hover:bg-[#d94f1e] sm:w-auto sm:px-10'
                type='submit'
                handleClick={() => setSuccessbid(false)}
              />
              <button
                onClick={() => {
                  setbidopen(false)
                  setViewTicket(true)
                  setSuccessbid(false)
                }}
                className='font-Poppins text-xs text-[#F25E26] transition-colors hover:text-[#d94f1e]'
              >
                View Ticket
              </button>
            </div>
          </div>
        }
        isModalOpen={successbid}
        showModal={() => setSuccessbid(!successbid)}
        handleOk={() => setSuccessbid(false)}
        handleCancel={() => setSuccessbid(false)}
      />

      {/* View Ticket Modal */}
      <ModalComponent
        content={
          <div className='flex flex-col px-3 py-3 sm:px-6 sm:py-4'>
            <AjirobaLogo />

            <div className='flex items-center justify-between py-2'>
              <div
                onClick={() => setViewTicket(false)}
                className='cursor-pointer font-Poppins text-sm text-red-500'
              >
                Back
              </div>
              <div className='flex space-x-2 text-xs text-gray-700 sm:text-sm'>
                <span className='font-Poppins'>
                  {ticketData?.data?.category}
                </span>
                <span>|</span>
                <span className='font-Poppins font-medium'>
                  {ticketData?.data?.subcategory}
                </span>
              </div>
            </div>

            <div className='my-4 rounded-lg border border-gray-100 bg-[#FAFAFA] p-3 sm:my-8 sm:border-0 sm:bg-transparent sm:p-0'>
              <div className='flex items-center justify-between gap-2 sm:justify-around'>
                <div className='flex flex-col items-center'>
                  <span className='font-Poppins text-[10px] text-gray-500 sm:text-xs'>Ticket Price</span>
                  <span className='mt-1 font-Poppins text-sm font-bold text-[#1B1B1A] sm:text-base'>
                    {formatCurrency(ticketData?.data?.ticket_price)}
                  </span>
                </div>
                <div className='h-8 w-px bg-gray-200 sm:hidden' />
                <div className='flex flex-col items-center'>
                  <span className='font-Poppins text-[10px] text-gray-500 sm:text-xs'>Qty</span>
                  <span className='mt-1 font-Poppins text-sm font-bold text-[#1B1B1A] sm:text-base'>
                    {ticketData?.data?.ticket_quantity ?? 0}
                  </span>
                </div>
                <div className='h-8 w-px bg-gray-200 sm:hidden' />
                <div className='flex flex-col items-center'>
                  <span className='font-Poppins text-[10px] text-gray-500 sm:text-xs'>Total</span>
                  <span className='mt-1 font-Poppins text-sm font-bold text-[#F25E26] sm:text-base'>
                    {formatCurrency(ticketData?.data?.total_amount)}
                  </span>
                </div>
              </div>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full border-collapse border border-gray-300 text-xs sm:text-sm'>
                <thead>
                  <tr className='bg-[#FCDFD4] text-left'>
                    <th className='border border-gray-300 px-2 py-2.5 sm:p-3 font-Poppins font-medium text-[#121212]'>
                      S/N
                    </th>
                    <th className='border border-gray-300 px-2 py-2.5 sm:p-3 font-Poppins font-medium text-[#121212]'>
                      Ticket Type
                    </th>
                    <th className='border border-gray-300 px-2 py-2.5 sm:p-3 font-Poppins font-medium text-[#121212]'>
                      Ticket Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    ticketData?.data?.ticket_details || [
                      { ticket_type: 'Regular', ticket_number: 'RT-001' },
                      { ticket_type: 'VIP', ticket_number: 'VT-002' },
                      { ticket_type: 'Regular', ticket_number: 'RT-003' }
                    ]
                  ).map(
                    (
                      item: { ticket_type: string; ticket_number: string },
                      index: number
                    ) => (
                      <tr key={index + 1} className='hover:bg-[#FFF8F5] transition-colors'>
                        <td className='border border-gray-300 px-2 py-2.5 sm:p-3 font-Poppins font-medium text-[#121212]'>
                          {index + 1}
                        </td>
                        <td className='border border-gray-300 px-2 py-2.5 sm:p-3 font-Poppins font-medium text-[#121212]'>
                          {item?.ticket_type}
                        </td>
                        <td
                          className='cursor-pointer border border-gray-300 px-2 py-2.5 sm:p-3 font-Poppins font-medium text-[#F25E26] underline'
                          onClick={() => {
                            setSelectedTicket({
                              ...item,
                              ticket_price: ticketData?.data?.ticket_price,
                              purchase_date: ticketData?.data?.purchase_date,
                              product: ticketData?.data?.product_name,
                              raffle_date: ticketData?.data?.raffle_date,
                              raffle_time: ticketData?.data?.raffle_time
                            })
                            setShowTicketModal(true)
                          }}
                        >
                          {item?.ticket_number}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        }
        isModalOpen={viewticket}
        showModal={() => setViewTicket(!viewticket)}
        handleOk={() => setViewTicket(false)}
        handleCancel={() => setViewTicket(false)}
      />

      {showTicketModal && selectedTicket && (
        <ModalComponent
          isModalOpen={showTicketModal}
          showModal={() => setShowTicketModal(false)}
          handleOk={() => setShowTicketModal(false)}
          handleCancel={() => setShowTicketModal(false)}
          width={1000}
          content={
            <RaffleTicket
              ticket_number={selectedTicket.ticket_number || 'N/A'}
              ticket_price={selectedTicket.ticket_price || 'N/A'}
              purchase_date={selectedTicket.purchase_date || 'N/A'}
              product={selectedTicket.product || 'N/A'}
              raffle_date={selectedTicket.raffle_date || 'N/A'}
              raffle_time={selectedTicket.raffle_time || 'N/A'}
            />
          }
        />
      )}

      <Footer />
    </main>
  )
}
export default Page
