/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect, useMemo, SetStateAction, Key } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Breadcrumb, ProductBreadcrumb } from "@/app/component/Breadcrumb";
import { Header } from "@/app/component/Header";
import { Footer } from "@/app/component/Footer";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Title } from "@/app/component/Title";
import image2 from "../../../asset/image/rice2.jpeg";
import image4 from "../../../asset/image/rice4.jpeg";
import "./style.css";
import { FaStar } from "react-icons/fa6";
import { RelatedProducts } from "@/app/component/RelatedProducts";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useQueryData } from "@/hooks/useQueryData";
import { parseISO, format } from "date-fns";
import { RelatedProductsDetails } from "@/app/component/RelatedProductsDetails";
import { RelatedProductsAuction } from '@/app/component/RelatedProductsAuction'
import Loading from "@/app/component/Loading";
import Cookies from "js-cookie";
import ModalComponent from "@/app/component/ModalComponent";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/app/component/Input";
import { useMutateData } from "@/hooks/useMutateNewData";
import axios from "axios";
import AuthMiddleware from '@/hooks/useAuth'
import { DefaultButton } from "@/app/component/Button";
import InputAction from "@/app/component/InputAction";
import verify from "@/app/asset/verify.svg";

interface CardInfoItem {
  weight: string;
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  name?: string;
  image?: string;
  price?: string;
  images?: { id: string; product: string; image: string }[];
  discount?: string;
  reviews?: string;
  message?: string;
  category?: string;
  delivery_estimation: string;
  related_products: [];
  ticket_price?: string;
  auction_reviews?: any;
  starts_in?: any;
  category_name?: any;
  subcategory_name?: any;
}

interface AuctionResponse {
  message: any;
  data: CardInfoItem;
  category?: any;
  subcategory?: any;
}

interface ProductData {
  id?: string;
  name?: string;
  price?: number;
  data?: any;
  // Add other properties as needed
}


interface BidInfoResponse {
  // Define the structure based on the response you expect from the API.
  data: any;
  category: any;
  name: any;
  ticket_price: any;
  id: any;
  images: any;
  subcategory: any;
}

interface TicketInfoResponse {
  // Define the structure based on the response you expect from the API.
  data?: any;
  category?: any;
  name?: any;
  ticket_price?: any;
  id?: any;
  images?: any;
  subcategory?: any;
  ticket_name?: any;
}



const Page = ({ params }: any) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [path, setPath] = useState<string | null>(null);
  const sub = searchParams.get("sub");
  const query = searchParams.get("query");
  const selectedBrands = searchParams.get("selectedBrands");
  const min_max = searchParams.get("min_max");
  const [successModal, setSuccessModal] = useState(false);
  const [makepayment, setmakepayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");




  const handlePaymentSelection = (method: SetStateAction<string>) => {
    setPaymentMethod(method);
  };

  const router = useRouter();

  /*  useAuthMiddleware(router) */
  //   AuthMiddleware(router)

  const star = [1, 2, 3, 4, 5];
  const rating = 4;

  const decodedPaths = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => decodeURIComponent(path));

  const paths = useMemo(
    () => [...decodedPaths, sub, query, min_max, selectedBrands],
    [decodedPaths, sub, query, min_max, selectedBrands],
  );

  const verifiedpaths = useMemo(
    () => [...decodedPaths, sub],
    [decodedPaths, sub],
  );

  const product_id = params.slug;
  const cacheBuster = `cache=${Date.now()}`;

  const {
    data: productdata,
    isLoading: productdataLoading,
    isFetching: productdatafetching,
    error,
    status,
    refetch: viewauctionrefetch,
  } = useQueryData<AuctionResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auction/view_auction/${product_id}/?${cacheBuster}`,
    ["product_details", product_id],
    true,
  );

  const [productdatanew, setProductDataNew] = useState<ProductData | null>(
    null,
  );
  const [loadingdata, setLoadingData] = useState(false);


  // console.log(productdatanew?.data?.related_products,   'relatedproducts')

  //   const fetchWithAuth = async (url: string) => {
  //     setLoadingData(true); // Indicate loading start

  //     const requestOptions: RequestInit = {
  //       method: "GET",
  //       headers: {
  //         Authorization: `token ${userToken}`, // Simplified header creation
  //       },
  //       redirect: "follow",
  //     };

  //     try {
  //       const response = await fetch(url, requestOptions);

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const result = await response.json(); // Parse JSON response
  //       console.log(result, 'resulttt')
  //       setProductDataNew(result); // Update state with result
  //       return result; // Return result for external use
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       throw error; // Re-throw for the caller to handle
  //     } finally {
  //       setLoadingData(false); // Ensure loading is stopped
  //     }
  //   };


  const fetchWithAuth = async (url: string) => {
    setLoadingData(true); // Indicate loading start

    /*  console.log(userToken, 'usertokennn') */

    const requestOptions: RequestInit = {
      method: "GET",
      headers: userToken ? { Authorization: `token ${userToken}` } : undefined, // Conditionally add header
      redirect: "follow",
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json(); // Parse JSON response
      /*  console.log(result, "resulttt"); */
      setProductDataNew(result); // Update state with result
      return result; // Return result for external use
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw for the caller to handle
    } finally {
      setLoadingData(false); // Ensure loading is stopped
    }
  };


  const fetchData = async () => {
    try {
      const data = await fetchWithAuth(
        `https://ajiroba.onrender.com/v1/auction/view_auction/${product_id}/`,
      );
      /*    console.log("Fetched data:", data); */
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    viewauctionrefetch();
  }, [product_id]); // Refetch whenever product_id changes

  //   console.log(productdata, "productdata");
  /*   console.log(productdatanew, "productdatanew"); */

  useEffect(() => {
    if (paths.length > 0) {
      const newPath = paths[paths.length - 1];
      if (newPath !== path) {
        setPath(newPath);
      }
    } else if (path !== null) {
      setPath(null);
    }
  }, [paths, path]); // Notice the added dependency on `path`

  const [selectedImage, setSelectedImage] = useState(0);
  const images = [image4, image2];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Step 1: State to track the selected image

  const handleImageClick = (index: SetStateAction<number>) => {
    setSelectedImage(index);
    setSelectedImageIndex(index);
  };

  const notify = () => {
    toast("🦄 ‘Mama Gold Rice’ has been added to cart", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      style: {
        backgroundColor: "#08B504",
        color: "#FFFFFF",
      },
    });
  };

  if (error) {
    console.error("Error fetching product data:", error);
  }

  const nigerianCurrencyFormat = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  const productPrice = productdatanew?.data?.price
    ? Number(productdatanew?.data.price)
    : 0;
  const productDiscount = productdatanew?.data?.discount
    ? Number(productdatanew?.data.discount)
    : 0;

  const formattedPrice = nigerianCurrencyFormat.format(productPrice);
  const formattedDiscount = nigerianCurrencyFormat.format(productDiscount);

  const basePrice = productdatanew?.data?.discount
    ? Number(productdatanew?.data.discount)
    : 0;
  const [quantity, setQuantity] = useState(1);
  const totalPrice = basePrice * quantity;

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const [confirmordermodal, setConfirmOrder] = useState(false);

  const showConfirmOrder = () => {
    setConfirmOrder(true);
  };

  const handlecloseOrder = () => {
    setConfirmOrder(false);
  };

  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Can't be lesser than 6 digits"),
  });

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const handleSuccess = (data: any) => {
    if (
      data.status === 200 ||
      data?.data?.status === 201 ||
      data?.data?.status === 200 ||
      data.status === 201
    ) {
      localStorage.setItem("pin_id", "yes");
      setSuccessModal(!successModal);
      toast.success(`${data?.data?.message || "PIN verified successfully"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          if (
            data?.data?.message &&
            data.data.message.includes("Order placed successfully. Order Code")
          ) {
            router.push("/profile");
          } else {
            router.push("/paymentpage");
          }
        },
      });
      reset();
    } else if (
      data?.data?.status === 400 ||
      data?.data?.status === 409 ||
      data.status === 400 ||
      data.status === 409
    ) {
      toast.error(`${data?.data?.message || "Password doesnt match"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else if (data.status === 401) {
      toast.error(`${data?.data?.message || "Authentication error"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else if (data.status === 500) {
      toast.error(`${data?.data?.message || "old_password"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else {
      toast.error(`${"An Error Occured"}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    }
  };

  const handleError = (error: any) => {
    toast.error(`${"An Error Occured"}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    reset();
  };

  const userToken = (Cookies.get("token") as string) || "";



  const [bidopen, setbidopen] = useState(false);

  const [bidData, setBidData] = useState<BidInfoResponse | null>(null);
  const [viewticket, setViewTicket] = useState(false);
  const [ticketData, setTicketData] = useState<TicketInfoResponse | null>(null);
  const [ticketPrice, setTicketPrice] = useState(0);

  const [successbid, setSuccessbid] = useState(false);


  const [ticketCount, setTicketCount] = useState(1);

  const [totalAmount, setTotalAmount] = useState(0);
  const [auctionId, setAuctionId] = useState("");

  // console.log(totalAmount, 'totalamount')


  const handleSuccessbidpayment = (data: any) => {
    /*   console.log(data, "datatatat"); */
    if (
      data.status === 200 ||
      data?.data?.status === 201 ||
      data?.data?.status === 200 ||
      data.status === 201
    ) {
      setTicketData(data?.data);
      setSuccessbid(!successbid);
      toast.success(`${data?.data?.message} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

        /*    onClose: () => {
                        if (
                            data?.data?.message &&
                            data.data.message.includes(
                                "Order placed successfully. Order Code",
                            )
                        ) {
                            router.push("/profile");
                        } else {
                            router.push("/paymentpage");
                        }
                    }, */
      });
      reset();
    } else if (
      data?.data?.status === 400 ||
      data?.data?.status === 409 ||
      data.status === 400 ||
      data.status === 409
    ) {
      toast.error(`${data?.data?.message} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else if (data.status === 401) {
      toast.error(`${data?.data?.message} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else if (data.status === 500) {
      toast.error(`${data?.data?.message} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else {
      toast.error(`${"An Error Occured"}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    }
  };

  const handleErrorbidpayment = (error: any) => {
    toast.error(`${"An Error Occured"}`, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    reset();
  };


  const {
    data: bidpaymentdata,
    error: bidpaymenterror,
    error: bidpaymentterror,
    isError: bidpaymentiserror,
    isSuccess: bidpaymentsuccess,
    mutate: bidpaymentmutate,
    status: bidpaymentstatus,
  } = useMutateData(
    "bidpayment",
    handleSuccessbidpayment,
    handleErrorbidpayment,
  );

  // Handler to increase ticket count
  const handleIncrease = () => {
    setTicketCount((prevCount) => prevCount + 1);
    setTotalAmount((prevTotal) => prevTotal + ticketPrice);
  };

  // Handler to decrease ticket count, ensuring count doesn’t go below 1
  const handleDecrease = () => {
    if (ticketCount > 1) {
      setTicketCount((prevCount) => prevCount - 1);
      setTotalAmount((prevTotal) => prevTotal - ticketPrice);
    }
  };


  useEffect(() => {
    if (bidData && bidData.ticket_price) {
      const initialPrice = Number(bidData.ticket_price);
      setTicketPrice(initialPrice);
      setTotalAmount(initialPrice * ticketCount);
      setAuctionId(bidData.id);
    }
  }, [bidData, ticketCount]);


  const {
    data,
    error: walleterror,
    isError,
    isSuccess,
    mutate,
    status: verifystatus,
  } = useMutateData("verifywalletpin", handleSuccess, handleError);


  // Handle API success
  const handleSuccesspayment = (data?: any) => {
    //  console.log(data)

    if (
      data.status === 200 ||
      data?.data?.status === 201 ||
      data?.data?.status === 200 ||
      data.status === 201
    ) {
      setBidData(data?.data); // Store the API response in bidData for modal usage

      setbidopen(false); // Open modal after successful API response
      setmakepayment(false);
      /*   console.log(data?.data, 'auctionidddd') */

      /*    console.log(paymentMethod, 'paymentmeethodddd')
      console.log(auctionId, 'auctioniddddd')
      console.log(ticketCount, 'ticketCount')
      console.log(totalAmount, 'total amount')
      console.log(userToken, 'tokennnn') */

      toast.success(`${data?.data?.message || "PIN verified successfully"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        /*  onClose: () => {
          if (
            data?.data?.message &&
            data.data.message.includes("Order placed successfully. Order Code")
          ) {
            router.push("/profile");
          } else {
            router.push("/paymentpage");
          }
        }, */
      });

      const payWithMethod = paymentMethod === "wallet_balance" ? "wallet_balance" : "wallet_point";

      const payload = {
        auction: auctionId,
        ticket_quantity: ticketCount,
        total_amount: Number(totalAmount),
        pay_with: payWithMethod,
      };

      bidpaymentmutate({
        url: "/api/bidpayment",
        payload: { payload: payload, token: userToken },
        token: userToken,
      });
      resetpayment();
    } else if (
      data?.data?.status === 400 ||
      data?.data?.status === 409 ||
      data.status === 400 ||
      data.status === 409
    ) {
      setbidopen(false);
      setmakepayment(false);
      toast.error(`${data?.data?.message || "Password doesnt match"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      resetpayment();
    } else if (data.status === 401) {
      setbidopen(false);
      setmakepayment(false);
      toast.error(`${data?.data?.message || "Authentication error"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      resetpayment();
    } else if (data.status === 500) {
      setbidopen(false);
      setmakepayment(false);
      toast.error(`${data?.data?.message || "old_password"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      resetpayment();
    } else {
      setbidopen(false);
      setmakepayment(false);
      toast.error(`${"An Error Occured"}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      resetpayment();
    }
  };

  // Handle API error
  const handleErrorpayment = (error?: any) => {
    console.log(error, "Error occurred during bid");
    setbidopen(false);

    toast.error(`${"An Error Occured"}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    resetpayment();
  };


  const {
    data: paymentdata,
    error: paymenterror,
    isError: paymentisError,
    isSuccess: paymentisSuccess,
    mutate: mutatev,
    status: paymentstatus,
    reset: resetpayment,
  } = useMutateData(
    "verifywalletpin",
    handleSuccesspayment,
    handleErrorpayment,
  );

  const submitForm = (data: any) => {
    Cookies.set("nvd", data?.password, { expires: 1 });
    const payload = {
      wallet_pin: data?.password,
    };

    mutate({
      url: "/api/verifywalletpin",
      payload: { payload: payload, token: userToken },
      token: userToken,
    });
  };




  const submitFormf = (data: any) => {
    /*   console.log(data, 'dddd', paymentMethod, 'paymmm'); */

    // mutate(data)

    Cookies.set("pvd", data?.password, { expires: 1 });
    const payload = {
      wallet_pin: data?.password,
    };

    mutatev({
      url: "/api/verifywalletpin",
      payload: { payload: payload, token: userToken },
      token: userToken,
    });
  };



  const handleOrderbutton = () => {
    let pin = Cookies.get("nvd");
    console.log("yes....", pin);
  };

  const CustomerReview = ({ data }: any) => {
    const [selectedStars, setSelectedStars] = useState<number | null>(null);

    const sortedRatings = [...data?.data?.rating_counts].sort(
      (a: { stars: number }, b: { stars: number }) => b.stars - a.stars,
    );

    const filteredReviews = selectedStars
      ? data?.data?.reviews.filter(
        (review: any) => review.rating === selectedStars,
      )
      : data?.data?.reviews;

    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 2;

    const totalReviews = filteredReviews.length;
    const totalPages = Math.ceil(totalReviews / reviewsPerPage);

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(
      indexOfFirstReview,
      indexOfLastReview,
    );

    const handlePageClick = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };



    return (
      <div className="container py-4">
        <div>
          <h1 className="text-[#353131] font-Poppins font-medium text-lg text-center 2xl:text-start xl:text-start lg:text-start md:text-start">
            Customer Review
          </h1>
        </div>

        <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col 2xl:items-start xl:items-start lg:items-start md:items-start items-center gap-12 mt-8">
          <div className=" 2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 w-auto">
            <p className="flex mt-4 items-center text-[#111111] text-sm gap-1">
              {Array.from(
                {
                  length: data?.data?.product_reviews?.average_ratings,
                },
                (_, index) => (
                  <span key={index}>
                    <FaStar className="text-[#F25E26]" />
                  </span>
                ),
              )}
              <span className="ml-4 text-[#2A2A2A] font-Poppins text-[8px] font-normal">
                ({data?.data?.product_reviews?.total_reviews}) Reviews
              </span>
            </p>

            {sortedRatings.map(
              (item: { stars: number; customers: number }, index: number) => (
                <div key={index} className="flex gap-4 items-center py-2">
                  <div>
                    <span className="font-Poppins text-[16px] text-[#353131]">
                      {item.stars} stars
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-[#E84526] h-2.5 rounded-full"
                        style={{
                          width: `${item.customers}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <small className="font-Poppins text-[16px] text-[#353131]">
                      {item.customers}
                    </small>
                  </div>
                </div>
              ),
            )}

            <div className="mt-4">
              <p>Filter By:</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              {sortedRatings.map((item: { stars: number }) => (
                <button
                  key={item.stars}
                  onClick={() => setSelectedStars(item.stars)}
                  className={`font-Poppins text-[16px] border border-[#D2D2D2] mt-4 px-4 py-2 text-sm ${selectedStars === item.stars
                      ? "bg-[#F25E26] text-white font-bold"
                      : "bg-white text-black font-normal"
                    } rounded`}
                >
                  {item.stars} Star
                </button>
              ))}

              <button
                onClick={() => setSelectedStars(null)}
                className={`font-Poppins text-[16px] border border-[#D2D2D2] mt-4 px-4 py-2 text-sm ${selectedStars === null
                    ? "bg-[#F25E26] text-white font-bold"
                    : "bg-white text-black font-normal"
                  } rounded`}
              >
                All Stars
              </button>
            </div>
          </div>

          <div className=" 2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 w-auto">
            {currentReviews.map((item: any, key: number) => {
              const date = item?.date_created
                ? parseISO(item.date_created)
                : null;
              const formattedDate = date
                ? format(date, "dd/MM/yyyy")
                : "Invalid Date";

              return (
                <div key={key} className="flex gap-2">
                  <div className="">
                    <Image
                      src={`https://ajiroba.onrender.com${item?.user?.profile_image}`}
                      height={40}
                      width={40}
                      alt="Profile Image"
                      className="rounded-full object-cover"
                      style={{ borderRadius: "50%" }}
                    />
                  </div>

                  <div className="mb-8 flex-1">
                    <p className="text-[#2A2A2A] text-[16px] font-Poppins font-bold">{`${item.user.first_name}  ${item.user.last_name} `}</p>
                    <p className="flex mt-4 items-center text-[#2A2A2A] font-Poppins text-sm gap-1">
                      {Array.from({ length: item?.rating }, (_, index) => (
                        <span key={index}>
                          <FaStar className="text-[#F25E26]" />
                        </span>
                      ))}

                      {formattedDate}
                    </p>
                    <p className="font-Poppins font-normal text-[13px]">
                      {item.comment}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-end mt-4">
              <h1 className=" text-center 4 text-[#E84526]">Pages</h1>
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;

                return (
                  <div key={index} className="flex ">
                    <h1
                      key={pageNumber}
                      onClick={() => handlePageClick(pageNumber)}
                      className={` px-2 cursor-pointer ${currentPage === pageNumber
                          ? " text-[#353131] font-bold"
                          : " text-[#353131]"
                        }`}
                    >
                      {pageNumber}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RelatedProduct = ({ data }: any) => {
    return (
      <div className="container py-4 mb-12 ">
        <div>
          <h1 className="text-[#353131] font-Poppins font-medium text-lg text-center 2xl:text-start xl:text-start lg:text-start md:text-start ">
            Other Related Products
          </h1>
        </div>

        <div>
          <RelatedProductsAuction cardInfo={data} />
        </div>
      </div>
    );
  };

  function parseStartsIn(startsIn = "0 Days, 0 Hr: 3 Mins Left") {
    const daysMatch = startsIn.match(/(\d+)\s*Days/);
    const hoursMatch = startsIn.match(/(\d+)\s*Hr/);
    const minutesMatch = startsIn.match(/(\d+)\s*Mins/);

    const daysLeft = daysMatch ? parseInt(daysMatch[1], 10) : 0;
    const hoursLeft = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutesLeft = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

    return {
      totalMinutes: daysLeft * 24 * 60 + hoursLeft * 60 + minutesLeft,
      daysLeft,
      hoursLeft,
      minutesLeft,
    };
  }

  const CountdownTimer = ({ startsIn = "0 Days, 0 Hr: 0 Mins Left" }) => {
    const {
      totalMinutes: initialTotalMinutes,
      daysLeft: initialDaysLeft,
      hoursLeft: initialHoursLeft,
      minutesLeft: initialMinutesLeft,
    } = parseStartsIn(startsIn);

    const [timeLeft, setTimeLeft] = useState(initialTotalMinutes);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const minutesLeft = timeLeft % 60;
    const hoursLeft = Math.floor(timeLeft / 60) % 24;
    const daysLeft = Math.floor(timeLeft / 1440);

    const progress =
      initialTotalMinutes > 0 ? (timeLeft / initialTotalMinutes) * 100 : 0;

    return (
      <div className="mb-3">
        <div className="border-[#B7B7B7] h-2.5 w-full rounded-full border ">
          <div
            className="h-2 rounded-full bg-[#F25E26]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-xs capitalize mb-2 mt-2 ">
          <span className="font-medium">{daysLeft}</span> dy:{" "}
          <span className="font-medium">{hoursLeft}</span> Hr:{" "}
          <span className="font-medium">{minutesLeft}</span> Min{" "}
          <span className="font-medium">Left</span>
        </p>
      </div>
    );
  };



  const handleBidClick = async (productId: any) => {
    if (!userToken) {
      console.error("Token is undefined");
      toast.error("Please Signin", {
        position: "top-right",
        progress: 4,
      });
      return;
    }

    try {
      const response = await fetch("/api/bidinfo", {
        method: "GET",
        headers: {
          Authorization: `${userToken}`,
          Params: productId,
        },
        cache: "no-cache",
      });

      if (!response.ok) {
        console.error("Error in the request:", response);
        return;
      }

      const data = await response.json();

      if (data.data.status === "failed") {
        console.log("Failed:", data.data);
        toast.error(`${data.data.message}`, {
          position: "top-right",
          progress: 4,
        });
        setTimeout(() => {
          // Optionally navigate back if needed
          // router.back();
        }, 2000);
      } else if (data.data.status === "success") {
        setbidopen(true);
        /*    console.log("Success:", data?.data?.data); */
        setBidData(data?.data?.data);
        setTicketPrice(Number(data?.data?.data?.ticket_price));

        // Display a success toast message if needed
        /*     toast.success("Bid information retrieved successfully!", {
                position: "top-right",
                progress: 4
            }); */
      } else {
        console.warn("Unknown status:", data.data.status);
      }

      return data;
    } catch (error) {
      console.error("Error during fetch:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-right",
        progress: 4,
      });
    }
  };


  return (
    <main>
      <Header />
      <ProductBreadcrumb
        paths={["Auction", productdatanew?.data?.category_name, null]}
        text={undefined}
      />

      <div onClick={() => router.back()}>
        <div
          className=" cursor-pointer container  flex justify-start"
          style={{
            margin: "0 auto",
            width: "94%",
            maxWidth: "100%",
          }}
        >
          <p className="text-[#E84526] text-base relative bottom-10 underline">
            Back
          </p>
        </div>
      </div>

      <div
        style={{
          margin: "0 auto",
          width: "90%",
          maxWidth: "100%",
        }}
        className="text-[#363636] font-Poppins text-sm font-semibold"
      >
        {productdatanew?.data?.category_name} |{" "}
        {productdatanew?.data?.subcategory_name}
      </div>

      <section
        style={{
          margin: "0 auto",
          width: "80%",
        }}
      >
        {productdata ? (
          <>
            <div className="flex mt-8 justify-between lg:flex-row md:flex-row 2xl:flex-row flex-col">
              <div>
                <div className=" flex gap-8 flex-col ">
                  {productdatanew?.data?.images?.map(
                    (image: any, index: number) => (
                      <div key={index} className="thumbnail-image 2xl:block lg:block md:block xl:block flex justify-center items-center  ">
                        <Image
                          className=" images-map w-32 h-32 object-cover"
                          src={`https://ajiroba.onrender.com/media/${image.image}`}
                          alt="Product Thumbnail"
                          onClick={() => handleImageClick(index)}
                          width={100}
                          height={100}
                          objectFit="cover"
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="  flex  justify-center items-center px-12 2xl:mt-4 xl:mt-4 lg:mt-4 md:mt-4 mt-6 ">
                <div className="thumbnail-images w-auto     ">
                  <div className="main-image ">
                    {productdatanew?.data?.images?.[selectedImageIndex] ? (
                      <Image
                        src={`https://ajiroba.onrender.com/media/${productdatanew?.data.images[selectedImageIndex].image}`}
                        alt="Product Image"
                        width={400}
                        height={400}
                        objectFit="cover"
                        className="object-cover"
                      />
                    ) : (
                      <p>No main image available</p>
                    )}
                  </div>
                </div>
              </div>

              {productdata && (
                <div className=" 2xl:w-2/5 lg:w-2/5 xl:w-2/5 md:w-2/5  w-auto mt-8 xl:mt-0 lg:mt-0 md:mt-0 2xl:mt-0 container justify-center flex flex-wrap xl:block md:block lg:block 2xl:block">
                  <div className="">
                    <h1 className="text-[#111111] text-[20px]  font-Poppins font-medium ">
                      {productdatanew?.data?.name}
                    </h1>
                    <p className="flex mt-4 items-center text-[#111111] font-Poppins font-normal text-sm gap-1">

                    </p>

                    <div className="flex items-center gap-2 flex-wrap mt-2">
                      <small className="text-[#111111] font-Poppins font-normal text-base ">
                        Ticket Price
                      </small>
                      <h1 className="text-[#111111] text-xl  font-semibold font-Poppins ">
                        &#x20A6;{" "}
                        {productdatanew?.data?.ticket_price?.toLocaleString()}
                      </h1>
                    </div>

                    <hr className="mt-4" />

                    <p className="text-[#111111] text-base mt-4 ">Weight</p>

                    <h1 className="text-[#111111] font-Poppins text-base mt-2 font-bold">
                      {`${productdatanew?.data?.weight} KG` || "NA"}
                    </h1>

                    <hr className="mt-4" />

                    <div className="bg-[#f6f6f6] mt-4 ">
                      <CountdownTimer
                        startsIn={productdatanew?.data?.starts_in}
                      />
                    </div>

                    <p className="text-[#111111] font-Poppins font-medium text-base mt-4 ">
                      Delivery Estimation
                    </p>

                    <h1 className="text-[#111111] font-Poppins text-base mt-2 font-semibold">
                      {productdatanew?.data?.delivery_estimation || "NA"}
                    </h1>

                    {/*  {productdatanew?.data?.starts_in === "Raffle Ended" ? (
                      <div className="flex justify-center items-center mt-4">
                        <button
                          onClick={notify}
                          className="mt-4 px-12 text-sm font-normal font-Poppins rounded-lg bg-[#FCDFD4] py-2 transition delay-300 duration-300 ease-in-out hover:bg-[#E84526] hover:text-white hover:transition-all"
                        >
                          Watch Live Raffle
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center mt-4">
                        {productdatanew?.data?.bidded ? (
                          <button
                            disabled
                            className="mt-4 px-12 text-sm font-normal font-Poppins rounded-lg bg-[#71605A] py-2 transition delay-300 duration-300 ease-in-out text-[#FCDFD4] hover:bg-[#71605A] hover:text-white hover:transition-all"
                          >
                            Bidded
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              return setmakepayment(!makepayment);
                            }}

                            className="mt-4 px-12 text-sm font-normal font-Poppins rounded-lg bg-[#FCDFD4] py-2 transition delay-300 duration-300 ease-in-out hover:bg-[#E84526] hover:text-white hover:transition-all"
                          >
                            Bid
                          </button>
                        )}
                      </div>
                    )} */}
                    {productdatanew?.data?.starts_in === "Raffle Ended" ? (
                      <div className="flex justify-center items-center mt-4">
                        <button
                          /*  onClick={notify} */

                          onClick={() =>
                            /*         router.push(`/raffle/${product_id}/winners`) */
                            router.push(`/raffle/${product_id}`)
                          }
                          className="mt-4 px-12 text-sm font-normal font-Poppins rounded-lg bg-[#FCDFD4] py-2 transition delay-300 duration-300 ease-in-out hover:bg-[#E84526] hover:text-white hover:transition-all"
                        >
                          Watch Live Raffle
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center mt-4">
                        {/*   {console.log(productdatanew?.data?.starts_in, !productdatanew?.data?.bidded)} */}
                        {(productdatanew?.data?.starts_in !== "Raffle Ended") && (productdatanew?.data?.bidded === "false") ? (
                          <button
                            /*         onClick={() => setmakepayment(!makepayment)} */
                            onClick={() => handleBidClick(product_id)}
                            className="mt-4 px-12 text-sm font-normal font-Poppins rounded-lg bg-[#FCDFD4] py-2 transition delay-300 duration-300 ease-in-out hover:bg-[#E84526] hover:text-white hover:transition-all"
                          >
                            Bid
                          </button>
                        ) : productdatanew?.data?.bidded === "true" ? (
                          <button
                            disabled
                            className="mt-4 px-12 text-sm font-normal font-Poppins rounded-lg bg-[#71605A] py-2 transition delay-300 duration-300 ease-in-out text-[#FCDFD4] hover:bg-[#71605A] hover:text-white hover:transition-all"
                          >
                            Bidded
                          </button>
                        ) : (
                          <button
                            disabled
                            className="mt-4 px-12 text-sm font-normal font-Poppins rounded-lg bg-[#71605A] py-2 transition delay-300 duration-300 ease-in-out text-[#FCDFD4] hover:bg-[#71605A] hover:text-white hover:transition-all"
                          >
                            Bidded
                          </button>
                        )}

                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="flex justify-center items-center py-12 text-red-600">
            Product Not Available
          </p>
        )}
      </section>

      <section
        className=""
        style={{
          margin: "0 auto",
          width: "80%",
        }}
      >
        {productdatanew?.data?.description && (
          <div className="container py-4 mb-12 mt-20">
            <div>
              <h1 className="text-[#1B1B1A] font-Poppins  font-bold text-lg text-center 2xl:text-start xl:text-start lg:text-start md:text-start ">
                Product Review
              </h1>
            </div>

            <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col items-center gap-12 mt-8">
              <div className=" 2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 w-auto">
                <h1 className="text-[#363636] font-Poppins font-normal leading-[29px]">
                  {productdatanew?.data?.description}
                </h1>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap ">
                <div className="relative mt-6 ">
                  <Image
                    src={
                      productdatanew?.data?.images?.[0]?.image
                        ? `https://ajiroba.onrender.com/media/${productdatanew?.data.images[0].image}`
                        : ""
                    }
                    alt="Product Image"
                    width={200}
                    height={200}
                    objectFit="cover"
                    className="object-cover"
                  />
                </div>
                <div className="relative opacity-35 sm:ml-4 mt-4 sm:mt-0">
                  <Image
                    src={
                      productdatanew?.data?.images?.[1]?.image
                        ? `https://ajiroba.onrender.com/media/${productdatanew?.data.images[1].image}`
                        : ""
                    }
                    alt="Product Image"
                    width={200}
                    height={200}
                    objectFit="cover"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section
        className=""
        style={{
          margin: "0 auto",
          width: "80%",
        }}
      >
        {productdata?.data?.reviews && (
          <div className="container py-4 mb-12 mt-20">
            <div>
              <h1 className="text-[#1B1B1A] font-Poppins  font-bold text-lg text-center 2xl:text-start xl:text-start lg:text-start md:text-start ">
                Product Review
              </h1>
            </div>

            <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col items-center gap-12 mt-8">
              <div className=" w-1/2">
                <h1 className="text-[#363636] font-Poppins font-normal leading-[29px]">
                  {productdata?.data?.description}
                </h1>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap ">
                <div className="relative mt-6 ">
                  <Image
                    src={
                      productdata?.data?.images?.[0]?.image
                        ? `https://ajiroba.onrender.com/media/${productdata.data.images[0].image}`
                        : ""
                    }
                    alt="Product Image"
                    width={200}
                    height={200}
                    objectFit="cover"
                    className="object-cover"
                  />
                </div>
                <div className="relative opacity-35 sm:ml-4 mt-4 sm:mt-0">
                  <Image
                    src={
                      productdata?.data?.images?.[1]?.image
                        ? `https://ajiroba.onrender.com/media/${productdata.data.images[1].image}`
                        : ""
                    }
                    alt="Product Image"
                    width={200}
                    height={200}
                    objectFit="cover"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section
        className=""
        style={{
          margin: "0 auto",
          width: "80%",
        }}
      >
        {productdatanew?.data?.reviews && <CustomerReview data={productdata} />}
      </section>

      <section
        className="container py-4  "
        style={{
          margin: "0 auto",
          width: "80%",
        }}
      >
        <div>
          <h1 className="text-[#353131] font-Poppins font-medium text-lg text-center 2xl:text-start xl:text-start lg:text-start md:text-start mt-8 mb-12">
            Other Related Products
          </h1>
        </div>

        {productdatanew?.data?.related_products && (
          <RelatedProductsDetails
            cardInfo={productdatanew?.data?.related_products}
          />
        )}
      </section>
      {/*           {productdatafetching && <Loading />} */}
      {loadingdata && <Loading />}

      <ModalComponent
        content={
          <div className="  px-6 py-4">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-center font-bold text-lg">Make Payment</h1>
              <p className="text-center font-normal text-sm">
                Kindly select your payment option
              </p>
            </div>

            <div className="bg-[#F6F6F6] shadow-lg border rounded border-[#D2D2D2] px-4 py-4 mt-4">
              <div>
                <p className="text-[#111111] text-base mb-4  ">
                  Payment Method
                </p>
              </div>

              <form action="">
                <div className="mb-4">
                  <div>
                    <input
                      type="radio"
                      id="wallet"
                      name="wallet"
                      value="wallet"
                      onChange={() => handlePaymentSelection("wallet")}
                    />
                    <label className="ml-2" htmlFor="wallet">
                      Wallet
                    </label>
                  </div>

                  <div className="ml-4">
                    <small className="text-[#A09F9F] text-sm">
                      pay with the money in your wallet
                    </small>
                  </div>
                </div>

                <div>
                  <div>
                    <input
                      type="radio"
                      id="card"
                      name="wallet"
                      value="card"
                      onChange={() => handlePaymentSelection("card")}
                    />
                    <label className="ml-2" htmlFor="card">
                      Pay with Cards, USSD or bank transfer
                    </label>
                  </div>

                  <div className="ml-4">
                    <small className="text-[#A09F9F] text-sm">
                      pay with the money in your wallet
                    </small>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
        isModalOpen={makepayment}
        showModal={() => setmakepayment(!makepayment)}
        handleOk={() => setmakepayment(false)}
        handleCancel={() => setmakepayment(false)}
      />

      <ModalComponent
        content={
          <div className="flex flex-col justify-center">
            <div className="flex justify-center items-center flex-col">
              <p className="text-[#2A2A2A] font-bold text-xl font-Poppins">
                Wallet Pin
              </p>
              <small className="text-[#504D4D] text-lg font-Poppins">
                Kindly enter your wallet pin
              </small>
            </div>

            <form
              action=""
              className="flex justify-center items-center flex-col mt-8 mb-4"
              onSubmit={handleSubmit(submitForm)}
            >
              <div className="flex flex-col">
                <Input
                  label="Enter Pin"
                  type="password"
                  name="password"
                  placeholder="****"
                  register={register}
                  errors={errors.password}
                  HiEyeSlash={<FaRegEyeSlash />}
                  HiEye={<FaRegEye />}
                />
                <div className="text-xs text-red-700">
                  {errors?.password?.message}
                </div>

                <button
                  className={`w-full mt-8 px-12 py-2 text-sm font-bold rounded bg-[#FCDFD4] text-[#2A2A2A] '
                                    }`}
                >
                  {verifystatus === "pending" ? "..." : "Pay"}
                </button>
              </div>
            </form>
          </div>
        }
        isModalOpen={confirmordermodal}
        showModal={showConfirmOrder}
        handleOk={() => { }}
        handleCancel={handlecloseOrder}
      />



      <ModalComponent
        content={
          <div className="flex flex-col  px-6 py-4">
            <div className="self-start text-red-500 font-Poppins cursor-pointer mb-4">
              Back
            </div>

            <div className="flex justify-between flex-wrap py-2">
              <div>
                <div className="flex  space-x-2 text-gray-700 text-sm mb-4">
                  <span className="font-Poppins">{bidData?.category}</span>
                  <span>|</span>
                  <span className="font-Poppins font-medium">
                    {bidData?.name}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-Poppins font-medium">
                  Raffle Draw
                </span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-4">
              <div className="w-full lg:w-1/2 flex justify-center mb-4 lg:mb-0">
                <div className="relative w-48 h-60 bg-gray-200 rounded-md flex justify-center items-center">


                  <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>

                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
                    <div className="bg-orange-500 p-3 rounded-lg text-center">
                      <span className="text-sm block">Raffle Ticket</span>
                      <span className="text-sm font-bold">
                        ₦ {ticketPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col space-y-4">
                <div>
                  <label className="font-Poppins text-gray-700">
                    Product
                  </label>
                  <input
                    type="text"
                    value={bidData?.name}
                    readOnly
                    className="w-full border border-gray-300 p-2 rounded mt-1 font-Poppins"
                  />
                </div>

                <div className="flex gap-8 flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex flex-col items-center w-full sm:w-1/2">
                    <label className="font-Poppins text-gray-700 mb-4">
                      Ticket Price (₦)
                    </label>
                    <div className="flex items-center">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        /*    onClick={handleDecrease} */
                        disabled={ticketCount <= 1}
                      >
                        -
                      </button>
                      <span className="mx-4 font-bold text-sm">
                        {" "}
                        {ticketPrice}
                      </span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                      /*  onClick={handleIncrease} */
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center w-full sm:w-1/2">
                    <label className="font-Poppins text-gray-700 mb-4">
                      No of Ticket
                    </label>
                    <div className="flex items-center">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={handleDecrease}
                        disabled={ticketCount <= 1}
                      >
                        -
                      </button>
                      <span className="mx-4 font-bold text-sm">
                        {ticketCount}
                      </span>
                      <button
                        className="px-2 py-1 bg-orange-500 text-white rounded"
                        onClick={handleIncrease}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      return (
                        setbidopen(!bidopen), setViewTicket(!viewticket)
                      );
                    }}
                    className="text-orange-500 font-Poppins text-xs mt-1"
                  >
                    View Ticket
                  </button>
                </div>

                <div>
                  <label className="font-Poppins text-gray-700">
                    Amount (₦)
                  </label>
                  <input
                    type="text"
                    value={`₦ ${totalAmount.toLocaleString()}`}
                    readOnly
                    className="w-full border border-gray-300 p-2 rounded mt-1 font-Poppins  font-bold"
                  />
                </div>

                <DefaultButton
                  text="Proceed"
                  type="submit"
                  handleClick={() => {
                    return (
                      setmakepayment(!makepayment), setbidopen(!bidopen)
                    );
                  }}
                  className="my-10 w-full bg-[#FCDFD4] p-3 rounded-lg"
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



      <ModalComponent
        content={
          <div className="  px-6 py-4">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-center font-bold text-lg">
                Make Payment
              </h1>
              <p className="text-center font-normal text-sm">
                Kindly select your payment option
              </p>
            </div>

            <div className="bg-[#F6F6F6] shadow-lg border rounded border-[#D2D2D2] px-4 py-4 mt-4">
              <div>
                <p className="text-[#111111] text-base mb-4  ">
                  Payment Method
                </p>
              </div>

              <form action="">
                <div className="mb-4">
                  <div>
                    <input
                      type="radio"
                      id="wallet_balance"
                      name="payment_method"
                      value="wallet_balance"
                      onChange={() =>
                        handlePaymentSelection("wallet_balance")
                      }
                    />
                    <label className="ml-2" htmlFor="wallet_balance">
                      Wallet
                    </label>
                  </div>
                  <div className="ml-4">
                    <small className="text-[#A09F9F] text-sm">
                      #230000
                    </small>
                  </div>
                </div>

                <div>
                  <div>
                    <input
                      type="radio"
                      id="wallet_point"
                      name="payment_method"
                      value="wallet_point"
                      onChange={() =>
                        handlePaymentSelection("wallet_point")
                      }
                    />
                    <label className="ml-2" htmlFor="wallet_point">
                      Pay With Wallet And Ajiroba Point
                    </label>
                  </div>
                  <div className="ml-4">
                    <small className="text-[#A09F9F] text-sm">
                      #23,000 (Wallet) And #200 (Ajiroba Points)
                    </small>
                  </div>
                </div>
              </form>
            </div>

            <form
              action=""
              className="flex  flex-col mt-8 mb-4"
              onSubmit={handleSubmit(submitFormf)}
            >
              <div className="flex flex-col">
                <InputAction
                  label="Enter Pin"
                  type="password"
                  name="password"
                  placeholder="****"
                  register={register}
                  errors={errors.password}
                  HiEyeSlash={<FaRegEyeSlash />}
                  HiEye={<FaRegEye />}
                />
                <div className="text-xs text-red-700">
                  {errors?.password?.message}
                </div>

                <button
                  className={`w-full mt-8 px-12 py-2 text-sm font-bold rounded bg-[#FCDFD4] text-[#2A2A2A] '
                                    }`}
                >
                  {paymentstatus === "pending" ? "..." : "Pay"}
                </button>
              </div>
            </form>
          </div>
        }
        isModalOpen={makepayment}
        showModal={() => setmakepayment(!makepayment)}
        handleOk={() => setmakepayment(false)}
        handleCancel={() => setmakepayment(false)}
      />



      <ModalComponent
        content={
          <div className="  px-6 py-4">
            <div className="py-2 flex justify-center items-center">
              <Image src={verify} width={60} height={60} alt="icon" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-center font-bold text-lg">
                Successfully
              </h1>
              <p className="text-center font-normal text-sm">
                You have entered into raffle draw for this product. Good
                luck
              </p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <DefaultButton
                text="Proceed"
                /*  text={status === 'pending' ? 'loading...' : "Save"} */
                className="rounded-md bg-[#F25E26] p-2 px-4 text-white mb-4 mt-4"
                type="submit"
              />
              <button
                onClick={() => {
                  return (
                    setbidopen(false),
                    setViewTicket(!viewticket),
                    setSuccessbid(!successbid)
                  );
                }}
                className="text-orange-500 font-Poppins text-xs mt-1"
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

      <Footer />
    </main>
  );
};
export default Page;
