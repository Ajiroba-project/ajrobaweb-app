'use client'
import { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'
import { FaStar } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { FaHeart } from "react-icons/fa";
import { useAuthStore } from '@/store/store'
import Image from 'next/image'
import Link from 'next/link'
import { useQueryData } from '@/hooks/useQueryData'
import royalty from '@/app/asset/image/royalty.png'
import fashionBeauty from '@/app/asset/image/fashionBeauty.png'
import fashion from '@/app/asset/image/fashion.png'
import computing from '@/app/asset/image/computing.png'
import phones from '@/app/asset/image/phones.png'
import mother from '@/app/asset/image/mother.png'
import phone from '@/app/asset/image/phone.png'
import fashions from '@/app/asset/image/fashions.png'
import foodstuff from '@/app/asset/image/foodstuff.png'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '900'] })

// interface cardDetails {
//   cardInfo: Array<{
//     ticket_price: any
//     reviews: number
//     starts_in: string | undefined
//     images: any
//     name: string;
//     image: Array<{ image: string }>;
//   }>;
//   currentPage?: number
//   cardsNum?: number
// }


interface cardDetails {
  cardInfo: Array<{
    name: string;
    image: Array<{ image?: string }>;
    ticket_price: any
    reviews: number
    starts_in: string | undefined
    images: any

  }>;
  currentPage: number
  cardsNum: number
};


interface CardInfoItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  name?: string;
  image?: any;
  price?: string;
  images?: { id: string; product: string; image: string }[];
  discount?: string;
  reviews?: string;
  message?: string;

}

interface AuctionResponse {
  message?: any;
  data: CardInfoItem[];
  // add other fields as necessary
}

export const ProductCard = ({ cardInfo }: any) => {
  const [hoverState, setHoverState] = useState<string>('')
  const [cardCartState, setCardCartState] = useState<boolean>(false)
  const [cardAddCartState, setCardAddCartState] = useState<any>()
  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn
  }))


  const handleCartNotification = (value: any) => {
    setCardAddCartState(value.name)

    setCardCartState(!cardCartState)
    const timeoutID = setTimeout(() => {
      setCardCartState(false)
    }, 5000)

    return () => clearTimeout(timeoutID)
  }


  return (
    <>
      {cardInfo && <div
        className={`${poppins.className} lg:full my-4 grid h-fit w-72 cursor-pointer  grid-cols-1 gap-4 md:w-full md:grid-cols-2 lg:grid-cols-4`}
      >
        {cardInfo?.map((value: any, index: number) => (
          <div
            className=' relative w-full rounded bg-[#F6F6F6] shadow-md'
            key={index}
            onMouseEnter={() => setHoverState(value.name)}
            onMouseLeave={() => setHoverState('')}
          >
            {/* {console.log(cardInfo, 'cardinfo----featuredproduct')} */}
            <div className='relative h-min rounded pt-2 transition delay-200 duration-200 hover:bg-[#0000002a] hover:transition-all'>
              <div className='z-auto flex items-center justify-center'>
                {/*  <Image
                  src={value.image}
                  alt='product'
                  className='w-fit bg-contain '
                /> */}
                <Image src={`https://ajiroba.onrender.com/media/${value?.images[0]?.image}`} alt='product' className='w-fit' width={100}
                  height={100} />
              </div>
              {/* cart */}
              {hoverState === value.name ? (
                <>
                  <IoCartOutline
                    className='absolute right-2 top-2  rounded-full bg-white p-2 text-4xl text-black '
                    onClick={() => handleCartNotification(value)}
                  />
                  {isLoggedIn && (
                    <FaHeart className='absolute right-14 top-2 rounded-full  bg-white p-2 text-4xl text-gray-300 hover:text-[#E84526] ' />
                  )}
                </>
              ) : (
                ''
              )}
              {/* alertMessage */}
              <>
                {cardCartState && (
                  <div
                    className={`${cardAddCartState === value.name ? 'absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-end bg-[#0000002a] pb-6 text-center align-bottom text-white' : 'hidden'}`}
                  >
                    <div className='bottom-0 mx-4 rounded-md bg-[#08B504] p-2 px-3 text-sm font-medium'>
                      <p>{value.name}</p>
                      <p>Has been added to cart</p>
                    </div>
                  </div>
                )}
              </>

              <hr />
              <div className='z-10 h-fit bg-[#F6F6F6] py-3 shadow-inner'>
                <div className='flex flex-col gap-2 px-2'>
                  <div className='flex  w-full items-center justify-between gap-3 capitalize'>
                    {/* product name */}
                    <div className=''>
                      <p className=' text-pretty text-sm font-normal'>
                        {value.name}
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-between '>
                    {/* price */}
                    <div className='justify-start'>
                      <p className=' text-xl font-medium'>
                        &#8358;{(value?.price).toLocaleString()}
                        <span className=' '></span>
                      </p>
                    </div>
                    {/* stars */}
                    <p className='flex justify-end text-left'>
                      {Array.from({ length: value?.reviews }, (_, index) => (
                        <span key={index}>
                          <FaStar className="text-[#F25E26]" />
                        </span>
                      ))}
                    </p>
                  </div>
                  <p className='text-sm font-normal text-gray-500 line-through '>
                    &#8358;{(value?.discount).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>}
    </>
  )
}



export const TopDealsCard = ({ cardInfo }: any) => {
  const [hoverState, setHoverState] = useState<string>('')
  const [cardCartState, setCardCartState] = useState<boolean>(false)
  const [cardAddCartState, setCardAddCartState] = useState<any>()
  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn
  }))

  const handleCartNotification = (value: any) => {
    setCardAddCartState(value.name)

    setCardCartState(!cardCartState)
    const timeoutID = setTimeout(() => {
      setCardCartState(false)
    }, 5000)

    return () => clearTimeout(timeoutID)
  }


  return (
    <>
      <div
        className={`${poppins.className} lg:full my-4 grid h-fit w-72 cursor-pointer  grid-cols-1 gap-4 md:w-full md:grid-cols-2 lg:grid-cols-4`}
      >
        {cardInfo?.map((value: any, index: number) => (
          <div
            className=' relative w-full rounded bg-[#F6F6F6] shadow-md'
            key={index}
            onMouseEnter={() => setHoverState(value.name)}
            onMouseLeave={() => setHoverState('')}
          >
            {/* {console.log(cardInfo, 'cardinfo----featuredproduct')} */}
            <div className='relative h-min rounded pt-2 transition delay-200 duration-200 hover:bg-[#0000002a] hover:transition-all'>
              <div className='z-auto flex items-center justify-center'>
                {/*  <Image
                  src={value.image}
                  alt='product'
                  className='w-fit bg-contain '
                /> */}
                <Image src={`https://ajiroba.onrender.com/media/${value?.images[0]?.image}`} alt='product' className='w-fit' width={100}
                  height={100} />
              </div>
              {/* cart */}
              {hoverState === value.name ? (
                <>
                  <IoCartOutline
                    className='absolute right-2 top-2  rounded-full bg-white p-2 text-4xl text-black '
                    onClick={() => handleCartNotification(value)}
                  />
                  {isLoggedIn && (
                    <FaHeart className='absolute right-14 top-2 rounded-full  bg-white p-2 text-4xl text-gray-300 hover:text-[#E84526] ' />
                  )}
                </>
              ) : (
                ''
              )}
              {/* alertMessage */}
              <>
                {cardCartState && (
                  <div
                    className={`${cardAddCartState === value.name ? 'absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-end bg-[#0000002a] pb-6 text-center align-bottom text-white' : 'hidden'}`}
                  >
                    <div className='bottom-0 mx-4 rounded-md bg-[#08B504] p-2 px-3 text-sm font-medium'>
                      <p className=' text-pretty text-sm font-normal'  >{value.name}</p>
                      <p>Has been added to cart</p>
                    </div>
                  </div>
                )}
              </>

              <hr />
              <div className='z-10 h-fit bg-[#F6F6F6] py-3 shadow-inner'>
                <div className='flex flex-col gap-2 px-2'>
                  <div className='flex  w-full items-center justify-between gap-3 capitalize'>
                    {/* product name */}
                    <div className=''>
                      <p className='text-pretty text-base font-normal'>
                        {value.name}
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-between '>
                    {/* price */}
                    <div className='justify-start'>
                      <p className='text-xl font-medium'>
                        &#8358;{(value?.price).toLocaleString()}
                        <span className=' '></span>
                      </p>
                    </div>
                    {/* stars */}
                    <p className='flex justify-end text-left'>
                      {Array.from({ length: value?.reviews }, (_, index) => (
                        <span key={index}>
                          <FaStar className="text-[#F25E26]" />
                        </span>
                      ))}
                    </p>
                  </div>
                  <p className='text-sm font-normal text-gray-500 line-through '>
                    &#8358;{(value?.discount).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}



export const TopWeakCard = ({ cardInfo }: any) => {
  const [hoverState, setHoverState] = useState<string>('')
  const [cardCartState, setCardCartState] = useState<boolean>(false)
  const [cardAddCartState, setCardAddCartState] = useState<any>()
  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn
  }))

  const handleCartNotification = (value: any) => {
    setCardAddCartState(value.name)

    setCardCartState(!cardCartState)
    const timeoutID = setTimeout(() => {
      setCardCartState(false)
    }, 5000)

    return () => clearTimeout(timeoutID)
  }


  return (
    <>
      <div
        className={`${poppins.className} lg:full my-4 grid h-fit w-72 cursor-pointer  grid-cols-1 gap-4 md:w-full md:grid-cols-2 lg:grid-cols-4`}
      >
        {cardInfo?.map((value: any, index: number) => (
          <div
            className=' relative w-full rounded bg-[#F6F6F6] shadow-md'
            key={index}
            onMouseEnter={() => setHoverState(value.name)}
            onMouseLeave={() => setHoverState('')}
          >
            {/* {console.log(cardInfo, 'cardinfo----featuredproduct')} */}
            <div className='relative h-min rounded pt-2 transition delay-200 duration-200 hover:bg-[#0000002a] hover:transition-all'>
              <div className='z-auto flex items-center justify-center'>
                {/*  <Image
                  src={value.image}
                  alt='product'
                  className='w-fit bg-contain '
                /> */}
                <Image src={`https://ajiroba.onrender.com/media/${value?.images[0]?.image}`} alt='product' className='w-fit' width={100}
                  height={100} />
              </div>
              {/* cart */}
              {hoverState === value.name ? (
                <>
                  <IoCartOutline
                    className='absolute right-2 top-2  rounded-full bg-white p-2 text-4xl text-black '
                    onClick={() => handleCartNotification(value)}
                  />
                  {isLoggedIn && (
                    <FaHeart className='absolute right-14 top-2 rounded-full  bg-white p-2 text-4xl text-gray-300 hover:text-[#E84526] ' />
                  )}
                </>
              ) : (
                ''
              )}
              {/* alertMessage */}
              <>
                {cardCartState && (
                  <div
                    className={`${cardAddCartState === value.name ? 'absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-end bg-[#0000002a] pb-6 text-center align-bottom text-white' : 'hidden'}`}
                  >
                    <div className='bottom-0 mx-4 rounded-md bg-[#08B504] p-2 px-3 text-sm font-medium'>
                      <p>{value.name}</p>
                      <p>Has been added to cart</p>
                    </div>
                  </div>
                )}
              </>

              <hr />
              <div className='z-10 h-fit bg-[#F6F6F6] py-3 shadow-inner'>
                <div className='flex flex-col gap-2 px-2'>
                  <div className='flex  w-full items-center justify-between gap-3 capitalize'>
                    {/* product name */}
                    <div className=''>
                      <p className='text-pretty text-sm font-normal'>
                        {value.name}
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-between '>
                    {/* price */}
                    <div className='justify-start'>
                      <p className=' text-xl font-medium'>
                        &#8358;{(value?.price).toLocaleString()}
                        <span className=' '></span>
                      </p>
                    </div>
                    {/* stars */}
                    <p className='flex justify-end text-left'>
                      {Array.from({ length: value?.reviews }, (_, index) => (
                        <span key={index}>
                          <FaStar className="text-[#F25E26]" />
                        </span>
                      ))}
                    </p>
                  </div>
                  <p className='text-sm font-normal text-gray-500 line-through '>
                    &#8358;{(value?.discount).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export const CategoryCard = () => {

  const { data: categoriesInfo, isLoading: categoriesLoading } = useQueryData<AuctionResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories/`, ["get categoriesdetails"], true);

  const categorydata = categoriesInfo?.data

  // console.log(categorydata)



  return (
    <>

      <div
        className={`${poppins.className}  grid w-72 cursor-pointer grid-cols-1 gap-6 md:w-full md:grid-cols-2 lg:grid-cols-4`}
      >
        {categorydata?.map((value, index) => (
          <div
            className='cursor-pointer rounded-2xl shadow-md hover:shadow-lg'
            key={index}
          >
            <div className='rounded-t-2xl bg-[#F6F6F6]'>
              <div className='relative w-full md:h-80 lg:h-64 h-48 '>
                {/* {value?.image[0]?.image && console.log(`https://ajiroba.onrender.com/media/${value?.image[0]?.image}`, 'value?.image')} */}
                {value?.image[0]?.image &&
                  <Image
                    src={`https://ajiroba.onrender.com/media/${value?.image[0]?.image}`}
                    alt="product"
                    layout="fill"
                    className="fixed-size-image"
                    objectFit="cover"
                  // onError={handleImageError}

                  />

                }
              </div>
            </div>

            <div className='rounded-b-2xl bg-white py-2'>
              <div className='flex flex-col gap-2 p-2'>
                <div className='capitalize'>
                  <p className='text-lg text-[#353131]'>{value.name}</p>{' '}
                </div>
                <div className='flex flex-col '>
                  <p className='text-[#A09F9F]'>{value.description}</p>
                  <Link
                    href={`/categories/${value.name}?cat_id=${value.id}`}
                    className='my-4 w-full bg-[#FCDFD4] p-2 text-center text-[#111111]'
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}





export const AuctionCard = ({ cardInfo }: cardDetails) => {



  const { isLoggedIn, clearAuthCookies, user } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    clearAuthCookies: state.clearAuthCookies,
    user: state.user
  }))

  function parseStartsIn(startsIn = '0 Days, 0 Hr: 3 Mins Left') {
    const daysMatch = startsIn.match(/(\d+)\s*Days/);
    const hoursMatch = startsIn.match(/(\d+)\s*Hr/);
    const minutesMatch = startsIn.match(/(\d+)\s*Mins/);

    const daysLeft = daysMatch ? parseInt(daysMatch[1], 10) : 0;
    const hoursLeft = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutesLeft = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

    return {
      totalMinutes: (daysLeft * 24 * 60) + (hoursLeft * 60) + minutesLeft,
      daysLeft,
      hoursLeft,
      minutesLeft,
    };
  }


  const CountdownTimer = ({ startsIn = '0 Days, 0 Hr: 3 Mins Left' }) => {
    const { totalMinutes: initialTotalMinutes, daysLeft: initialDaysLeft, hoursLeft: initialHoursLeft, minutesLeft: initialMinutesLeft } = parseStartsIn(startsIn);

    const [timeLeft, setTimeLeft] = useState(initialTotalMinutes);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(prev => Math.max(prev - 1, 0));
      }, 1000); // Update every minute

      return () => clearInterval(timer);
    }, []);

    const minutesLeft = timeLeft % 60;
    const hoursLeft = Math.floor(timeLeft / 60) % 24;
    const daysLeft = Math.floor(timeLeft / 1440);

    const progress = (timeLeft / initialTotalMinutes) * 100;

    return (
      <div className='mb-3'>
        <p className='text-xs capitalize '>
          <span className='font-medium'>{daysLeft}</span> days{' '}
          <span className='font-medium'>{hoursLeft}</span> hr{' '}
          <span className='font-medium'>{minutesLeft}</span> min{' '}
          <span className='font-medium'>left</span>
        </p>
        <div className='border-gray h-2.5 w-full rounded-full border '>
          <div className='h-2 rounded-full bg-[#F25E26]' style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  };




  return (
    <>


      {cardInfo && <div className='lg:full grid w-auto cursor-pointer grid-cols-1 gap-6 md:w-full md:grid-cols-2 lg:grid-cols-4'>
        {cardInfo?.map((value, index) => (
          <div
            className=' w-full rounded bg-[#F6F6F6] shadow-md hover:-translate-y-2.5 hover:scale-105 hover:shadow-xl'
            key={index}
          >

            <div className='relative'>
              <div className='flex items-center justify-between p-4'>
                <p className='text-sm text-[#A09F9F]'>On Auction </p>
                <p className='cursor-pointer rounded-md bg-[#FCFCFC] p-1.5 text-sm font-semibold shadow-md transition delay-150 duration-200 ease-in-out hover:bg-[#E84526] hover:text-white'>
                  Bid{' '}
                </p>
              </div>

              <div className='flex items-center justify-center mb-4'>

                <Image src={`https://ajiroba.onrender.com/media/${value?.images[0]?.image}`} alt='product' className='w-fit' width={100}
                  height={100} />

              </div>
            </div>

            <hr />
            <div className='py-3 shadow-inner'>
              <div className='flex flex-col gap-2 px-2'>
                <div className='flex  w-full items-center justify-between flex-wrap gap-3 capitalize'>

                  <div className=' text-sm font-normal'>
                    <p className=' text-pretty text-sm'>{value?.name}</p>
                  </div>

                  <div className=''>
                    <p className=' text-xs font-normal '>
                      ticket price: &nbsp;
                      <span className=' text-pretty text-base font-medium text-[#F25E26]'>

                        &#8358;{(value?.ticket_price).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>


                <p className='flex justify-end text-left'>

                  {Array.from({ length: value?.reviews }, (_, index) => (
                    <span key={index}>
                      <FaStar className="text-[#F25E26]" />
                    </span>
                  ))}
                </p>

                <CountdownTimer startsIn={value?.starts_in} />
              </div>
            </div>
          </div>
        ))}
      </div>

      }
    </>
  )
}



type CardDetails = {
  cardInfo: Array<{
    name: string;
    image: Array<{ image: string }>;
  }>;
};

export const CategoryFeatureCard = ({ cardInfo }: CardDetails) => {
  // Function to determine which SVG path to use based on value.name
  const getSVGForName = (name: string) => {
    switch (name) {
      case 'Phones':
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='h-20 w-20 text-white'
          >
            <path d='M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 22.454C6.073 22.454 1.546 17.927 1.546 12S6.073 1.546 12 1.546 22.454 6.073 22.454 12 17.927 22.454 12 22.454z' />
            <path d='M16.093 11.268h-3.361V7.907a.732.732 0 1 0-1.464 0v3.361H7.907a.732.732 0 1 0 0 1.464h3.361v3.361a.732.732 0 1 0 1.464 0v-3.361h3.361a.732.732 0 1 0 0-1.464z' />
          </svg>
        );
      case 'Mother And Child':
        return (
          <Image src={mother} alt='royalty' width={100} height={100} color='white' />

        )

      case 'Royalty':
        return (

          <Image src={royalty} alt='royalty' width={100} height={100} color='white' />


        );
      default:
        return <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-20 w-20 text-white'
        >
          <path d='M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 22.454C6.073 22.454 1.546 17.927 1.546 12S6.073 1.546 12 1.546 22.454 6.073 22.454 12 17.927 22.454 12 22.454z' />
          <path d='M16.093 11.268h-3.361V7.907a.732.732 0 1 0-1.464 0v3.361H7.907a.732.732 0 1 0 0 1.464h3.361v3.361a.732.732 0 1 0 1.464 0v-3.361h3.361a.732.732 0 1 0 0-1.464z' />
        </svg> // Handle cases where there's no specific SVG for the name
    }
  };

  return (
    <>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {cardInfo?.map((value, index) => (
          <div
            className='cursor-pointer gap-2 gap-y-3 rounded hover:scale-110'
            key={index}
          >

            {/*  {
              console.log(`https://ajiroba.onrender.com/media/${value?.image[0]?.image}`)
            } */}

            <div className='relative flex items-center justify-center h-[300px] w-[300px]'>
              {/* Background image with overlay */}
              <div className='absolute inset-0 z-10 bg-black bg-opacity-65 '></div>
              <div
                className='absolute inset-0 bg-cover bg-center'
                style={{
                  backgroundImage: `url(https://ajiroba.onrender.com/media/${value?.image[0]?.image})`,
                }}
              ></div>

              {/* {console.log(value, 'value')} */}

              {/* Centered SVG and text */}
              <div className='relative z-20 flex flex-col items-center justify-center gap-3 p-4'>
                {getSVGForName(value.name)}
                <p className='text-sm text-white'>{value.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};



export const AuctionCardMain = ({ cardInfo }: cardDetails) => {



  const { isLoggedIn, clearAuthCookies, user } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    clearAuthCookies: state.clearAuthCookies,
    user: state.user
  }))

  function parseStartsIn(startsIn = '0 Days, 0 Hr: 3 Mins Left') {
    const daysMatch = startsIn.match(/(\d+)\s*Days/);
    const hoursMatch = startsIn.match(/(\d+)\s*Hr/);
    const minutesMatch = startsIn.match(/(\d+)\s*Mins/);

    const daysLeft = daysMatch ? parseInt(daysMatch[1], 10) : 0;
    const hoursLeft = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutesLeft = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

    return {
      totalMinutes: (daysLeft * 24 * 60) + (hoursLeft * 60) + minutesLeft,
      daysLeft,
      hoursLeft,
      minutesLeft,
    };
  }


  const CountdownTimer = ({ startsIn = '0 Days, 0 Hr: 3 Mins Left' }) => {
    const { totalMinutes: initialTotalMinutes, daysLeft: initialDaysLeft, hoursLeft: initialHoursLeft, minutesLeft: initialMinutesLeft } = parseStartsIn(startsIn);

    const [timeLeft, setTimeLeft] = useState(initialTotalMinutes);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(prev => Math.max(prev - 1, 0));
      }, 1000); // Update every minute

      return () => clearInterval(timer);
    }, []);

    const minutesLeft = timeLeft % 60;
    const hoursLeft = Math.floor(timeLeft / 60) % 24;
    const daysLeft = Math.floor(timeLeft / 1440);

    const progress = (timeLeft / initialTotalMinutes) * 100;

    return (
      <div className='mb-3'>
        <p className='text-xs capitalize '>
          <span className='font-medium'>{daysLeft}</span> days{' '}
          <span className='font-medium'>{hoursLeft}</span> hr{' '}
          <span className='font-medium'>{minutesLeft}</span> min{' '}
          <span className='font-medium'>left</span>
        </p>
        <div className='border-gray h-2.5 w-full rounded-full border '>
          <div className='h-2 rounded-full bg-[#F25E26]' style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  };




  return (
    <>
      <div className='lg:full grid w-auto cursor-pointer grid-cols-1 gap-6 md:w-full md:grid-cols-2 lg:grid-cols-4'>
        {cardInfo?.map((value, index) => (
          <div
            className=' w-full rounded bg-[#F6F6F6] shadow-md hover:-translate-y-2.5 hover:scale-105 hover:shadow-xl'
            key={index}
          >

            <div className='relative'>
              <div className='flex items-center justify-between p-4'>
                <p className='text-sm text-[#A09F9F]'>On Auction </p>
                <p className='cursor-pointer rounded-md bg-[#FCFCFC] p-1.5 text-sm font-semibold shadow-md transition delay-150 duration-200 ease-in-out hover:bg-[#E84526] hover:text-white'>
                  Bid{' '}
                </p>
              </div>

              <div className='flex items-center justify-center mb-4'>

                <Image src={`https://ajiroba.onrender.com/media/${value?.images[0]?.image}`} alt='product' className='w-fit' width={100}
                  height={100} />

              </div>
            </div>

            <hr />
            <div className='py-3 shadow-inner'>
              <div className='flex flex-col gap-2 px-2'>
                <div className='flex  w-full items-center justify-between flex-wrap gap-3 capitalize'>

                  <div className=' text-sm font-normal'>
                    <p className=' text-pretty text-sm'>{value?.name}</p>
                  </div>

                  <div className=''>
                    <p className=' text-xs font-normal '>
                      ticket price: &nbsp;
                      <span className=' text-pretty text-base font-medium text-[#F25E26]'>

                        &#8358;{(value?.ticket_price).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>


                <p className='flex justify-end text-left'>

                  {Array.from({ length: value?.reviews }, (_, index) => (
                    <span key={index}>
                      <FaStar className="text-[#F25E26]" />
                    </span>
                  ))}
                </p>

                <CountdownTimer startsIn={value?.starts_in} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}


