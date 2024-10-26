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
import { useRouter } from 'next/navigation'
import foodstufficon from '@/app/asset/image/foodstufficon.svg'
import phonessvg from '@/app/asset/image/phonessvg.svg'
import fashionandbeauty from '@/app/asset/image/fashion_and_beauty.svg'
import motherandchild from '@/app/asset/image/mother_and_child.svg'
import { motion } from 'framer-motion'
import { DefaultButton } from './Button'
import Loading from './Loading'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useMutateData } from '@/hooks/useMutateData'
import Cookies from 'js-cookie'


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
    id: string

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

  const router = useRouter()


    const getSessionKey = () => {
    let sessionKey = Cookies.get('session_key');

    if (!sessionKey) {
      sessionKey = `session_${Math.random().toString(36).substr(2, 9)}`;
      Cookies.set('session_key', sessionKey, { expires: 7 });
    }

    return sessionKey;
  };


    const userToken = Cookies.get("token") as string || ''



  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CommentFormValues>({
    // resolver: yupResolver(commentSchema),
  });

  const handleSuccess = (data?: any) => {

    if (data.status === 200 || data.status === 201) {

      const result = data?.data?.message?.split('added to cart.')[0].trim();

          setCardAddCartState(result);
    setCardCartState(!cardCartState);
    const timeoutID = setTimeout(() => {
      setCardCartState(false);
    }, 5000);

    return () => clearTimeout(timeoutID);
     /*  refetch(); */
    } else if (
      data.status === 403 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 409 ||
      data.status === 500
    ) {

      toast.error(`${data?.data?.message || data?.data?.detail}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    /*   refetch(); */
    } else {

      toast.error(`${data?.data?.detail}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     /*  refetch(); */
    }
  };

  const handleError = (error?: any) => {
    console.log(error, "errr",  "daaaattt");

    toast.error(`${  error || "An Error Occured"}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   /*  refetch(); */
  };



  const { mutate: mutate, status: likedstatus } = useMutateData(
    "addtocart",
    handleSuccess,
    handleError,
  );

  const onSubmit = (data: CommentFormValues) => {
      /*   const sessionKey = getSessionKeyForProduct(data.id); */
      const sessionKey = getSessionKey();
    const payload = {
      product_id: data.id,
      quantity: Number(1),
   session_key: sessionKey,
    };

 /*    console.log(data, 'dattaaa')
    console.log(payload, 'payload')
 */

        console.log(payload, 'payload')
     mutate({
       url: "/api/addtocart/",
       payload: { payload: payload, tkn: userToken },
       token: userToken,
     });


    // reset();
  };




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
            <div onClick={() => router.push(`/categories/productdetails/${value.id}`)} className='relative h-min rounded pt-2 transition delay-200 duration-200 hover:bg-[#0000002a] hover:transition-all'>
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
              /*       onClick={() => handleCartNotification(value)} */
                 onClick={()=> onSubmit(value)}
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


  const router = useRouter()


  const handleCartNotification = (value: any) => {
    setCardAddCartState(value.name)

    setCardCartState(!cardCartState)
    const timeoutID = setTimeout(() => {
      setCardCartState(false)
    }, 5000)

    return () => clearTimeout(timeoutID)
  }






    const getSessionKey = () => {
    let sessionKey = Cookies.get('session_key');

    if (!sessionKey) {
      sessionKey = `session_${Math.random().toString(36).substr(2, 9)}`;
      Cookies.set('session_key', sessionKey, { expires: 7 });
    }

    return sessionKey;
  };


    const userToken = Cookies.get("token") as string || ''



  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CommentFormValues>({
    // resolver: yupResolver(commentSchema),
  });

  const handleSuccess = (data?: any) => {

    if (data.status === 200 || data.status === 201) {

      const result = data?.data?.message?.split('added to cart.')[0].trim();

          setCardAddCartState(result);
    setCardCartState(!cardCartState);
    const timeoutID = setTimeout(() => {
      setCardCartState(false);
    }, 5000);

    return () => clearTimeout(timeoutID);
     /*  refetch(); */
    } else if (
      data.status === 403 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 409 ||
      data.status === 500
    ) {

      toast.error(`${data?.data?.message || data?.data?.detail}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    /*   refetch(); */
    } else {

      toast.error(`${data?.data?.detail}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     /*  refetch(); */
    }
  };

  const handleError = (error?: any) => {
    console.log(error, "errr",  "daaaattt");

    toast.error(`${  error || "An Error Occured"}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   /*  refetch(); */
  };



  const { mutate: mutate, status: likedstatus } = useMutateData(
    "addtocart",
    handleSuccess,
    handleError,
  );

  const onSubmit = (data: CommentFormValues) => {
      /*   const sessionKey = getSessionKeyForProduct(data.id); */
      const sessionKey = getSessionKey();
    const payload = {
      product_id: data.id,
      quantity: Number(1),
   session_key: sessionKey,
    };

 /*    console.log(data, 'dattaaa')
    console.log(payload, 'payload')
 */

        console.log(payload, 'payload')
     mutate({
       url: "/api/addtocart/",
       payload: { payload: payload, tkn: userToken },
       token: userToken,
     });


    // reset();
  };



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
            onClick={() => router.push(`/categories/productdetails/${value.id}`)}
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
                  /*   onClick={() => handleCartNotification(value)} */
                     onClick={()=> onSubmit(value)}
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

  const router = useRouter()



    const getSessionKey = () => {
    let sessionKey = Cookies.get('session_key');

    if (!sessionKey) {
      sessionKey = `session_${Math.random().toString(36).substr(2, 9)}`;
      Cookies.set('session_key', sessionKey, { expires: 7 });
    }

    return sessionKey;
  };


    const userToken = Cookies.get("token") as string || ''



  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CommentFormValues>({
    // resolver: yupResolver(commentSchema),
  });

  const handleSuccess = (data?: any) => {

    if (data.status === 200 || data.status === 201) {

      const result = data?.data?.message?.split('added to cart.')[0].trim();

          setCardAddCartState(result);
    setCardCartState(!cardCartState);
    const timeoutID = setTimeout(() => {
      setCardCartState(false);
    }, 5000);

    return () => clearTimeout(timeoutID);
     /*  refetch(); */
    } else if (
      data.status === 403 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 409 ||
      data.status === 500
    ) {

      toast.error(`${data?.data?.message || data?.data?.detail}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    /*   refetch(); */
    } else {

      toast.error(`${data?.data?.detail}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     /*  refetch(); */
    }
  };

  const handleError = (error?: any) => {
    console.log(error, "errr",  "daaaattt");

    toast.error(`${  error || "An Error Occured"}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   /*  refetch(); */
  };



  const { mutate: mutate, status: likedstatus } = useMutateData(
    "addtocart",
    handleSuccess,
    handleError,
  );

  const onSubmit = (data: CommentFormValues) => {
      /*   const sessionKey = getSessionKeyForProduct(data.id); */
      const sessionKey = getSessionKey();
    const payload = {
      product_id: data.id,
      quantity: Number(1),
   session_key: sessionKey,
    };

 /*    console.log(data, 'dattaaa')
    console.log(payload, 'payload')
 */

        console.log(payload, 'payload')
     mutate({
       url: "/api/addtocart/",
       payload: { payload: payload, tkn: userToken },
       token: userToken,
     });


    // reset();
  };



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
            onClick={() => router.push(`/categories/productdetails/${value.id}`)}
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
                 /*    onClick={() => handleCartNotification(value)} */
                    onClick={()=> onSubmit(value)}
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
                    className=' cursor-pointer my-4 w-full bg-[#FCDFD4] p-2 text-center text-[#111111] hover:bg-[#E84526] hover:text-white'
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


  // console.log(cardInfo, 'cardInfooooo')



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
          <span className='font-medium font-bold'>{hoursLeft}</span> hr{' '}
          <span className='font-medium'>{minutesLeft}</span> min{' '}
          <span className='font-medium'>left</span>
        </p>
        <div className='border-gray h-2.5 w-full rounded-full border '>
          <div className='h-2 rounded-full bg-[#F25E26]' style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  };


  const router = useRouter()

  return (
    <>


      {cardInfo && <div className='lg:full grid w-auto cursor-pointer grid-cols-1 gap-6 md:w-full md:grid-cols-2 lg:grid-cols-4'>
        {cardInfo?.map((value, index) => (
          <div
            className=' w-full rounded bg-[#F6F6F6] shadow-md hover:-translate-y-2.5 hover:scale-105 hover:shadow-xl'
            key={index} onClick={() => router.push(`/categories/productdetails/${value.id}`)}
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
    category?: any;
    id?: any
  }>;
}

  ;



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
}


export const CatFeatCard: React.FC<CardDetails> = ({ cardInfo }) => {
  const images_ = [foodstufficon, fashionandbeauty, phonessvg, motherandchild];

  const router = useRouter()

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
      {cardInfo?.map((value, index) => (

        <motion.div
          key={index}
          // className="rounded-lg bg-[#F6F6F6] p-4"
          // onClick={() => router.push(`/categories/productdetails/${value.id}`)}
          whileHover={{ scale: 1.05, boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)' }} // Zoom in slightly on hover
          whileTap={{ scale: 0.95 }} // Slight zoom out on tap/click
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }} // Smooth transition out
        >
          <div key={index} className="relative border rounded-lg overflow-hidden" onClick={() => router.push(`/categories/${value.name}?cat_id=${value.id}`)}>
            <div className="w-full h-60 overflow-hidden relative rounded-lg">
              {/* Background image */}
              <Image width={50} height={50}
                src={`https://ajiroba.onrender.com/media/${value?.image[0]?.image}`}
                alt={value.name}
                className="object-cover w-full h-full rounded-lg"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 z-10 bg-black bg-opacity-65 rounded-lg"></div>
              {/* Overlay image */}
              <div className="absolute inset-0 z-20 flex flex-col gap-4 justify-center items-center">
                <Image
                  src={images_[index % images_.length]} // Select image based on the index
                  alt="Overlay"
                  className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                />
                <p className="text-base text-white font-Poppins ">{value.name}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};


type CommentFormValues = {
  id: any
  comment: string;
  commentImage?: string;
  post_id?: string;
};

export const ProductCardMain = ({ cardInfo }: any) => {
  const [hoverState, setHoverState] = useState<number | null>(null); // Use index or id for hover state
  const [cardCartState, setCardCartState] = useState<boolean>(false);
  const [cardAddCartState, setCardAddCartState] = useState<any>();
  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));




  const getSessionKey = () => {
    let sessionKey = Cookies.get('session_key');

    if (!sessionKey) {
      sessionKey = `session_${Math.random().toString(36).substr(2, 9)}`;
      Cookies.set('session_key', sessionKey, { expires: 7 });
    }

    return sessionKey;
  };


  const handleCartNotification = (value: any) => {
    setCardAddCartState(value.name);
    setCardCartState(!cardCartState);
    const timeoutID = setTimeout(() => {
      setCardCartState(false);
    }, 5000);

    return () => clearTimeout(timeoutID);
  };

  const router = useRouter();

    const userToken = Cookies.get("token") as string || ''



  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CommentFormValues>({
    // resolver: yupResolver(commentSchema),
  });

  const handleSuccess = (data?: any) => {

    if (data.status === 200 || data.status === 201) {

      const result = data?.data?.message?.split('added to cart.')[0].trim();

          setCardAddCartState(result);
    setCardCartState(!cardCartState);
    const timeoutID = setTimeout(() => {
      setCardCartState(false);
    }, 5000);

    return () => clearTimeout(timeoutID);
     /*  refetch(); */
    } else if (
      data.status === 403 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 409 ||
      data.status === 500
    ) {

      toast.error(`${data?.data?.message || data?.data?.detail}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    /*   refetch(); */
    } else {

      toast.error(`${data?.data?.detail}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     /*  refetch(); */
    }
  };

  const handleError = (error?: any) => {
    console.log(error, "errr",  "daaaattt");

    toast.error(`${  error || "An Error Occured"}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   /*  refetch(); */
  };



  const { mutate: mutate, status: likedstatus } = useMutateData(
    "addtocart",
    handleSuccess,
    handleError,
  );

  const onSubmit = (data: CommentFormValues) => {
      /*   const sessionKey = getSessionKeyForProduct(data.id); */
      const sessionKey = getSessionKey();
    const payload = {
      product_id: data.id,
      quantity: Number(1),
   session_key: sessionKey,
    };

 /*    console.log(data, 'dattaaa')
    console.log(payload, 'payload')
 */

        console.log(payload, 'payload')
     mutate({
       url: "/api/addtocart/",
       payload: { payload: payload, tkn: userToken },
       token: userToken,
     });


    // reset();
  };


  return (
    <>
      {cardInfo && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cardInfo?.map((value: any, index: number) => (
            <div key={index}>
              <motion.div
                onMouseEnter={() => setHoverState(index)} // Set hover state to the card's index
                onMouseLeave={() => setHoverState(null)} // Clear hover state when mouse leaves
                className="flex flex-col h-full shadow-lg"
              >
                <motion.div
                  className="bg-[#F6F6F6] p-4 rounded-t-lg relative"
                  whileHover={{ backgroundColor: "#E0E0E0" }} // Background color change on hover
                >
                  <div className="flex justify-end cursor-pointer">
                    {hoverState === index && ( // Only show the cart icon for the hovered card
                      <IoCartOutline
                        className="absolute right-2 top-2 rounded-full bg-white p-2 text-4xl text-black hover:text-[#ffffff] hover:bg-[#E84526]"
                       /*  onClick={() => handleCartNotification(value)} */
                       onClick={()=> onSubmit(value)}
                      />
                    )}

                    {cardCartState && cardAddCartState === value.name && (
                      <div className="absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-end bg-[#0000002a] pb-6 text-center text-white">
                        <div className="bottom-0 mx-4 rounded-md bg-[#08B504] p-2 px-3 text-sm font-medium">
                          <p>{value.name}</p>
                          <p>Has been added to cart</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <motion.div
                    className="flex justify-center items-center m-3"
                    whileHover={{ scale: 1.1 }} // Enlarge the image on hover
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div
                      onClick={() =>
                        router?.push(`/categories/productdetails/${value.id}`)
                      }
                      className="p-0"
                    >
                      <div className="cursor-pointer filter brightness-95 opacity-80 bg-[#FCFCFC] hover:bg-transparent">
                        <Image
                          src={`https://ajiroba.onrender.com/media/${value?.images[0]?.image}`}
                          width={100}
                          height={100}
                          alt="image"
                          className="cursor-pointer filter brightness-95 opacity-80 bg-[#FCFCFC] hover:bg-transparent"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <div className="rounded-b-lg border-t-4 bg-[#FFFFFF]">
                  <div className="mt-2 mb-1 p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-Poppins text-[#000000] text-pretty text-sm font-normal">
                          {value?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex justify-between items-center">
                    <div className="justify-start">
                      <p className="text-xl font-medium">
                        &#8358;{value?.discount?.toLocaleString()}
                      </p>

                      <p className="text-sm font-normal text-gray-500 line-through">
                        &#8358;{value?.price?.toLocaleString()}
                      </p>
                    </div>

                    <div className="p-4">
                      <p className="flex justify-end text-left gap-1">
                        {Array.from({ length: value?.reviews }, (_, index) => (
                          <span key={index}>
                            <FaStar className="text-[#F25E26]" />
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};




export const ProductCategoryCard = ({ cardInfo }: any) => {
  const [hoverState, setHoverState] = useState<string>("");
  const [cardCartState, setCardCartState] = useState<boolean>(false);
  const [cardAddCartState, setCardAddCartState] = useState<any>();
  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));





  const getSessionKey = () => {
    let sessionKey = Cookies.get('session_key');

    if (!sessionKey) {
      sessionKey = `session_${Math.random().toString(36).substr(2, 9)}`;
      Cookies.set('session_key', sessionKey, { expires: 7 });
    }

    return sessionKey;
  };


    const userToken = Cookies.get("token") as string || ''

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CommentFormValues>({
    // resolver: yupResolver(commentSchema),
  });

  const handleSuccess = (data?: any) => {

    if (data.status === 200 || data.status === 201) {

      const result = data?.data?.message?.split('added to cart.')[0].trim();

          setCardAddCartState(result);
    setCardCartState(!cardCartState);
    const timeoutID = setTimeout(() => {
      setCardCartState(false);
    }, 5000);

    return () => clearTimeout(timeoutID);
     /*  refetch(); */
    } else if (
      data.status === 403 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 409 ||
      data.status === 500
    ) {

      toast.error(`${data?.data?.message || data?.data?.detail}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    /*   refetch(); */
    } else {

      toast.error(`${ data?.data?.detail}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     /*  refetch(); */
    }
  };

  const handleError = (error?: any) => {
    console.log(error, "errr",  "daaaattt");

    toast.error(`${  error || "An Error Occured"}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   /*  refetch(); */
  };



  const { mutate: mutate, status: likedstatus } = useMutateData(
    "addtocart",
    handleSuccess,
    handleError,
  );

  const onSubmit = (data: CommentFormValues) => {
      const sessionKey = getSessionKey();
    const payload = {
      product_id: data.id,
      quantity: Number(1),
   session_key: sessionKey,
    };


        console.log(payload, 'payload')
     mutate({
       url: "/api/addtocart/",
       payload: { payload: payload, tkn: userToken },
       token: userToken,
     });


    // reset();
  };



  const handleCartNotification = (value: any) => {
    setCardAddCartState(value.name);

    setCardCartState(!cardCartState);
    const timeoutID = setTimeout(() => {
      setCardCartState(false);
    }, 5000);

    return () => clearTimeout(timeoutID);
  };

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(cardInfo.length / itemsPerPage);

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const [hoverStates, setHoverStates] = useState<{ [key: number]: boolean }>({});

const handleMouseEnter = (index: number) => {
  setHoverStates((prevState) => ({ ...prevState, [index]: true }));
};

const handleMouseLeave = (index: number) => {
  setHoverStates((prevState) => ({ ...prevState, [index]: false }));
};

  return (
    <>


      {cardInfo && (
    <div
      className={`${poppins.className} my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6`}
    >
      {cardInfo?.map((value: any, index: number) => (
        <div key={index}>
          <motion.div
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            className="flex flex-col h-full shadow-lg"
          >
            <motion.div
              className="bg-[#F6F6F6] p-4 rounded-t-lg relative"
              whileHover={{
                backgroundColor: "#E0E0E0", // Background color change
              }}
            >
              <div className="flex justify-end cursor-pointer">
                {hoverStates[index] ? (
                  <IoCartOutline
                    className="hover:text-[#ffffff] hover:bg-[#E84526] rounded-full absolute right-2 top-2 p-2 text-4xl text-black"
                   /*  onClick={() => handleCartNotification(value)} */
                         onClick={()=> onSubmit(value)}
                  />
                ) : (
                  ""
                )}

                {cardCartState && (
                  <div
                    className={`${
                      cardAddCartState === value.name
                        ? "absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-end bg-[#0000002a] pb-6 text-center align-bottom text-white"
                        : "hidden"
                    }`}
                  >
                    <div className="bottom-0 mx-4 rounded-md bg-[#08B504] p-2 px-3 text-sm font-medium">
                      <p>{value.name}</p>
                      <p>Has been added to cart</p>
                    </div>
                  </div>
                )}
              </div>

              <motion.div
                className="flex justify-center items-center m-3"
                whileHover={{ scale: 1.1 }} // Enlarge the image on hover
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div
                  onClick={() =>
                    router?.push(`/categories/productdetails/${value.id}`)
                  }
                  className="p-0"
                >
                  {hoverStates[index] ? (
                    <div className="cursor-pointer filter brightness-95 opacity-80 bg-[#FCFCFC] hover:bg-transparent">
                      <Image
                        src={`https://ajiroba.onrender.com/media/${value?.image}`}
                        width={100}
                        height={100}
                        alt="image"
                        className="cursor-pointer filter brightness-95 opacity-80 bg-[#FCFCFC] hover:bg-transparent"
                      />
                    </div>
                  ) : (
                    <Image
                      src={`https://ajiroba.onrender.com/media/${value?.image}`}
                      width={100}
                      height={100}
                      alt="human hair"
                      className=" cursor-pointer filter brightness-95 opacity-75 bg-[#FCFCFC] hover:bg-transparent"
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>

            <div className="rounded-b-lg border-t-4 bg-[#FFFFFF]">
              <div className="mt-2 mb-1 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className=" text-[#353131] text-pretty text-base font-normal font-Poppins">
                      {value?.name}
                    </p>

                    <p className=" text-[#A09F9F] text-pretty text-sm font-normal font-Poppins mt-2">
                      {value?.description
                        ? value?.description
                        : "No Description"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 flex justify-between items-center">
                <div className="justify-start">
                  <p className="text-xl font-medium">
                    &#8358; {value?.previousPrice?.toLocaleString('en-US')}
                    <span className=""></span>
                  </p>

                  <p className="text-sm font-normal text-gray-500 line-through">
                    &#8358; {value?.price?.toLocaleString('en-US')}
                  </p>
                </div>

                <div className="p-4">
                  <p className="flex justify-end text-left gap-1">
                    {Array.from({ length: value?.rating }, (_, index) => (
                      <span key={index}>
                        <FaStar className="text-[#F25E26]" />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  )}

       <div className="flex justify-center items-center mb-20 mt-12 ">
            <div className="flex justify-center mt-4 gap-3">
              <button
                className="px-4 py-4 bg-[#F6F6F6] rounded border border-[#B7B7B7]  text-[#D2D2D2] font-bold cursor-pointer"
                onClick={handleFirstPage}
                disabled={currentPage === 1}
              >
                <IoIosArrowBack size={20} />
              </button>
              {Array(totalPages)
                .fill(0)
                .map((_, index) => (
                  <button
                    key={index}
                    className={`px-6 py-4 ${
                      currentPage === index + 1
                        ? "bg-[#F6F6F6] rounded border border-[#F25E26] text-[#F25E26] font-Poppins font-normal text-base "
                        : "bg-[#F6F6F6] rounded border border-[#B7B7B7]  text-[#D2D2D2] font-Poppins font-normal text-base "
                    }  font-bold rounded`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              <button
                className="px-4 py-4 bg-[#F6F6F6] rounded border border-[#B7B7B7]  text-[#D2D2D2] font-bold cursor-pointer"
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
              >
                <IoIosArrowForward size={20} />
              </button>
            </div>
          </div>
    </>
  );
};




export const CategoryCardMain = ({ cardInfo }: any) => {
  const [cardCartState, setCardCartState] = useState<boolean>(false);
  const [cardAddCartState, setCardAddCartState] = useState<any>();
  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  const router = useRouter();

  const { data: categoriesInfo, isLoading: categoriesLoading, isFetching } =
    useQueryData<AuctionResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories/`,
      ["get categoriesdetails"],
      true,
    );

  const categorydata = categoriesInfo?.data;

  return (
    <>
      {categorydata && (
        <div
          className={`${poppins.className} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}
        >
          {categorydata?.map((value: any, index: number) => (
            <div key={index} className="flex flex-col h-full shadow-lg">
              <div className="flex flex-col h-full">
                <div className="bg-[#F6F6F6]   rounded-t-lg relative">
                  <div className="flex justify-end cursor-pointer">
                    {cardCartState && (
                      <div
                        className={`${
                          cardAddCartState === value.name
                            ? "absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-end bg-[#0000002a] pb-6 text-center text-white"
                            : "hidden"
                        }`}
                      >
                        <div className="bottom-0 mx-4 rounded-md bg-[#08B504] p-2 px-3 text-sm font-medium">
                          <p>{value.name}</p>
                          <p>Has been added to cart</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center items-center m-3 h-auto sm:h-48 w-full">
                    <div
                      onClick={() =>
                        router?.push(`/categories/${value.name}?cat_id=${value.id}`)
                       /*   href={`/categories/${value.name}?cat_id=${value.id}`} */
                      }
                      className="p-0"
                    >
                      <Image
                        width={100}
                        height={100}
                        src={`https://ajiroba.onrender.com/media/${
                          value?.images
                            ? value?.images[0]?.image
                            : value?.image[0]?.image
                        }`}
                        alt="image"
                        className="cursor-pointer filter brightness-95 opacity-75 bg-[#FCFCFC] hover:bg-transparent object-cover h-auto w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className=" rounded-b-2xl border-t-4 bg-[#FCFCFC] flex flex-col justify-between h-full overflow-hidden">
                  <div className="p-4 flex-grow">
                    <p className="font-Poppins text-[#000000] text-sm font-normal overflow-hidden text-ellipsis">
                      {value?.name}
                    </p>
                    <p className="text-[#A09F9F] text-xs  overflow-hidden text-ellipsis">
                      {value.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 px-4 mb-4 cursor-pointer">
                    <DefaultButton
                      type="submit"
                      className="  cursor-pointer w-auto rounded-lg bg-[#FCDFD4] h-10 text-sm hover:bg-[#E84526] hover:text-white"
                      text={"Explore"}
                      handleClick={() =>
                        router.push(
                          `/categories/${value.name}?cat_id=${value.id}`,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

       {
            ( isFetching ) && <Loading />
        }
    </>
  );
};
