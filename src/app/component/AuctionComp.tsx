"use clients";

import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash, FaStar } from "react-icons/fa6";
import Image from "next/image";
import { motion } from "framer-motion";
import "./style.css";
import ModalComponent from "./ModalComponent";
// import { useMutateData } from "@/hooks/useMutateDataBid";
import Cookies from "js-cookie";
import { Axios } from "axios";
import { toast } from "react-toastify";
import rice from "../asset/image/rice2.jpeg";
import { DefaultButton } from "./Button";
import { useGetPointData } from "@/hooks/useGetData";
import { SetStateAction } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutateData } from "@/hooks/useMutateNewData";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../component/Input";
import InputAction from "./InputAction";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import verify from "../asset/verify.svg";

interface cardDetails {
  cardInfo: Array<{
    name: string;
    image: Array<{ image?: string }>;
    ticket_price: any;
    reviews: number;
    starts_in: string | undefined;
    images: any;
    id: string;
  }>;
  currentPage: number;
  cardsNum: number;
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

// Utility function to parse time remaining from a string
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

// Countdown Timer component
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
      setTimeLeft((prev) => Math.max(prev - 1, 0)); // Decrease time left, but don't go below 0
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutesLeft = timeLeft % 60;
  const hoursLeft = Math.floor(timeLeft / 60) % 24;
  const daysLeft = Math.floor(timeLeft / 1440);

  // Progress should be 0% when timeLeft is 0 or when the total time is 0
  const progress =
    initialTotalMinutes > 0 ? (timeLeft / initialTotalMinutes) * 100 : 0;

  return (
    <div className="mb-3">
      <p className="text-xs capitalize mb-2 ">
        <span className="font-medium">{daysLeft}</span> dy:{" "}
        <span className="font-medium">{hoursLeft}</span> Hr:{" "}
        <span className="font-medium">{minutesLeft}</span> Min{" "}
        <span className="font-medium">Left</span>
      </p>
      <div className="border-[#B7B7B7] h-2.5 w-full rounded-full border ">
        <div
          className="h-2 rounded-full bg-[#F25E26]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Auction Component
export const AuctionComp = ({ cardInfo }: any) => {
  const router = useRouter();

  const userToken = Cookies.get("token") as string;

  const [bidopen, setbidopen] = useState(false);

  const [bidData, setBidData] = useState<BidInfoResponse | null>(null);
  const [viewticket, setViewTicket] = useState(false);
  const [ticketData, setTicketData] = useState<TicketInfoResponse | null>(null);

  const [makepayment, setmakepayment] = useState(false);
  const [successbid, setSuccessbid] = useState(false);

  const tkn_: string = Cookies.get("token") as string;

 /*  const {
    data: pointinfo,
    isLoading: pointsLoading,
    error: pointerror,
  } = useGetPointData("/api/getpoints", "get_point_details", userToken); */

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

  // console.log(pointinfo, 'pointinfoooooo')

  const [paymentMethod, setPaymentMethod] = useState("");

  // Handle API success
  const handleSuccess = (data?: any) => {
    // console.log(data)
    if (data.status === 200 || data.status === 201) {
      setBidData(data?.data); // Store the API response in bidData for modal usage

      setbidopen(true); // Open modal after successful API response
    } else {
      // Handle other statuses if needed
      setbidopen(false);
    }
  };

  // Handle API error
  const handleError = (error?: any) => {
    console.log(error, "Error occurred during bid");
    setbidopen(false);

    toast.error("Failed to retrieve bid info. Please try again later.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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

  // Initialize the mutation hook
  const { mutate } = useMutateData("bidinfo", handleSuccess, handleError);

  // Function to handle bid button click

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

  const initialTicketPrice = Number(bidData?.ticket_price);
  // console.log(initialTicketPrice, 'initialTicketPrice')
  // const [ticketCount, setTicketCount] = useState(1);
  // const [ticketPrice, setTicketPrice] = useState(Number(bidData?.ticket_price));
  // const [totalAmount, setTotalAmount] = useState(ticketCount * ticketPrice);
  const [ticketCount, setTicketCount] = useState(1);
  const [ticketPrice, setTicketPrice] = useState(0); // Default to 0 initially
  const [totalAmount, setTotalAmount] = useState(0);
  const [auctionId, setAuctionId] = useState("");

  // console.log(totalAmount, 'totalamount')

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

  const handlePaymentSelection = (method: SetStateAction<string>) => {
    setPaymentMethod(method);
  };

  const {
    data,
    error: walleterror,
    isError,
    isSuccess,
    mutate: mutatev,
    status,
    reset: resetpayment,
  } = useMutateData(
    "verifywalletpin",
    handleSuccesspayment,
    handleErrorpayment,
  );

  useEffect(() => {
    if (bidData && bidData.ticket_price) {
      const initialPrice = Number(bidData.ticket_price);
      setTicketPrice(initialPrice);
      setTotalAmount(initialPrice * ticketCount);
      setAuctionId(bidData.id);
    }
  }, [bidData, ticketCount]);

  const submitForm = (data: any) => {
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

  const handlePay = () => {};

  return (
    <>
      {cardInfo && (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cardInfo?.map(
              (
                value: {
                  id: any;
                  images: { image: any }[];
                  name:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<AwaitedReactNode>
                    | null
                    | undefined;
                  ticket_price: {
                    toLocaleString: () =>
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<AwaitedReactNode>
                      | null
                      | undefined;
                  };
                  reviews: any;
                  starts_in: string | undefined;
                },
                index: Key | null | undefined,
              ) => (
                <motion.div
                  key={index}
                  /*  className="rounded-lg bg-[#FFFFFF] border border-[#F6F6F6] cursor-pointer" */
                  className="rounded-lg bg-[#fdfdfd] border border-[#F6F6F6] cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ scale: 1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="border-b-4 pb-4">
                    <div className="flex justify-between items-center py-2 p-4">
                      <div>
                        <p className="text-[#A09F9F] text-sm font-medium font-Poppins">
                          On Auction
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleBidClick(value.id)}
                          className="cursor-pointer rounded-md bg-[#FCFCFC] px-2 py-1 text-sm font-Poppins font-medium shadow-md transition duration-200 ease-in-out hover:bg-[#E84526] hover:text-white"
                        >
                          Bid
                        </button>
                      </div>
                    </div>

                    <div
                      className="flex justify-center items-center m-3"
                      onClick={() =>
                        router.push(`/auction/productdetails/${value.id}`)
                      }
                    >
                      <div className="bg-transparent p-0">
                        <Image
                          src={`https://ajiroba.onrender.com/media/${value?.images[0]?.image}`}
                          width={100}
                          height={100}
                          alt="human hair"
                          className=""
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-[#F6F6F6] px-4 py-4 ">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-Poppins text-[#000000] text-pretty text-sm font-normal">
                            {value?.name}
                          </p>
                        </div>

                        <div className="flex justify-center items-center gap-2">
                          <div>
                            <p className="text-xs font-normal font-Poppins text-[#000000]">
                              Ticket Price:
                            </p>
                          </div>
                          <div>
                            <p className="text-pretty text-base font-Poppins font-medium text-[#F25E26]">
                              &#8358;{value?.ticket_price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*  <div className="bg-[#F6F6F6] px-4"> */}
                    <div className="bg-[#f6f6f6] px-4">
                      <p className="flex justify-end text-left gap-1">
                        {Array.from({ length: value?.reviews }, (_, index) => (
                          <span key={index}>
                            <FaStar className="text-[#F25E26]" />
                          </span>
                        ))}
                      </p>
                    </div>

                    {/*      <div className="bg-[#F6F6F6] px-4 "> */}
                    <div className="bg-[#f6f6f6] px-4 ">
                      <CountdownTimer startsIn={value?.starts_in} />
                    </div>
                  </div>
                </motion.div>
              ),
            )}
          </div>

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
              <div className="flex flex-col  px-6 py-4">
                <div className="self-start text-red-500 font-Poppins cursor-pointer mb-4">
                  Back
                </div>

                <div className="flex justify-between flex-wrap py-2">
                  <div>
                    <div className="flex  space-x-2 text-gray-700 text-sm mb-4">
                      <span className="font-Poppins">{ticketData?.data?.category}</span>

                      <span>|</span>
                      <span className="font-Poppins font-medium">{ticketData?.data?.subcategory}</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-Poppins font-medium">
                      Raffle Draw
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 justify-center items-center ">
                  <div className="flex gap-8 flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex flex-col items-center w-full sm:w-1/2">
                      <label className="font-Poppins text-gray-700 mb-4">
                        Ticket Price (₦)
                      </label>
                      <div className="flex items-center">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          /*     onClick={handleDecrease} */
                          /*   disabled={ticketCount <= 1} */
                          disabled={true}
                        >
                          -
                        </button>
                        <span className="mx-4 font-bold text-sm"> {ticketData?.data?.ticket_price}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          /*      onClick={handleIncrease} */
                          disabled={true}
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
                          /*   onClick={handleDecrease} */
                          disabled={true}
                        >
                          -
                        </button>
                        <span className="mx-4 font-bold text-sm">{ticketData?.data?.ticket_quantity}</span>
                        <button
                          className="px-2 py-1 bg-orange-500 text-white rounded"
                          /*  onClick={handleIncrease} */
                          disabled={true}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-Poppins text-gray-700">
                      Amount (₦)
                    </label>
                    <input
                      type="text"
                      /*  value={`₦ ${totalAmount.toLocaleString()}`} */
                      value={ticketData?.data?.ticket_amount}
                      readOnly
                      className="w-full border border-gray-300 p-2 rounded mt-1 font-Poppins  font-bold"
                    />
                  </div>
                </div>


{


                <div  className="mt-6">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-[#FCDFD4] text-left">
                        <th className="p-3 border border-gray-300 text-sm text-[#121212] font-Poppins font-medium">
                          S/N
                        </th>
                        <th className="p-3 border border-gray-300 text-sm text-[#121212] font-Poppins font-medium">
                          Ticket Type
                        </th>
                        <th className="p-3 border border-gray-300 text-sm text-[#121212] font-Poppins font-medium">
                          Ticket Number
                        </th>
                      </tr>
                    </thead>
                    <tbody className="mt-8">
{
ticketData?.data?.ticket_details?.map((item: { ticket_type: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; ticket_number: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, index: number)=>{
  return (
    <tr key={index + 1}>
    <td className="p-3 border border-gray-300  text-sm text-[#121212] font-Poppins font-medium">
      {index + 1}
    </td>
    <td className="p-3 border border-gray-300  text-sm text-[#121212] font-Poppins font-medium">
      {item?.ticket_type}
    </td>
    <td className="p-3 border border-gray-300  text-sm text-[#121212] font-Poppins font-medium">
      {item?.ticket_number}
    </td>
  </tr>
  )
})
}

                      {/* <tr>
                        <td className="p-3 border border-gray-300  text-sm text-[#121212] font-Poppins font-medium">
                          {index + 1}
                        </td>
                        <td className="p-3 border border-gray-300  text-sm text-[#121212] font-Poppins font-medium">
                          {item?.ticket_type}
                        </td>
                        <td className="p-3 border border-gray-300  text-sm text-[#121212] font-Poppins font-medium">
                          {item?.ticket_number}
                        </td>
                      </tr> */}


                    </tbody>
                  </table>
                </div>


}

              </div>
            }
            isModalOpen={viewticket}
            showModal={() => setViewTicket(!viewticket)}
            handleOk={() => setViewTicket(false)}
            handleCancel={() => setViewTicket(false)}
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
                  onSubmit={handleSubmit(submitForm)}
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
                      {status === "pending" ? "..." : "Pay"}
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
        </section>
      )}
    </>
  );
};
