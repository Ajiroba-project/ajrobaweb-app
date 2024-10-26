"use client";
import { usePathname, useRouter } from "next/navigation";
import { SetStateAction, useEffect, useMemo, useState } from "react";

import { Header } from "../component/Header";
import { Title } from "../component/Title";
import { Footer } from "../component/Footer";
import { Suspense } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import ModalComponent from "../component/ModalComponent";
import Input from "../component/Input";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/store";
import { useMutateData } from "@/hooks/useMutateNewData";
import Loading from "../component/Loading";

const Page = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmordermodal, setConfirmOrder] = useState(false);
  const [isPaymentMethodConfirmed, setIsPaymentMethodConfirmed] =
    useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [verfiywallet, setverifywallet] = useState<any>(false);

  const [orderSummary, setOrderSummary] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartItemsn, setCartItemsn] = useState<any>();

  const tkn_: string = Cookies.get("token") as string;

  const fetchCartItems = async () => {
    const tkn_: string = Cookies.get("token") as string;

    if (!tkn_) {
      toast.error("Please log in to continue.");
      router.push("/signin"); // Redirect to login if no token
      return;
    }

    setLoading(true);

    let sessionKey = Cookies.get("session_key");

    if (!sessionKey) {
      sessionKey = `session_${Math.random().toString(36).substr(2, 9)}`;
      Cookies.set("session_key", sessionKey, { expires: 7 });
    }

    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (tkn_) {
      headers["Authorization"] = `token ${tkn_}`;
    }

    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `https://ajiroba.onrender.com/v1/commerce/checkout/`,
      headers: headers,
    };

    axios
      .request(config)
      .then((response) => {
       /*  console.log(response, "response"); */
        setCartItemsn(response.data?.data);
            setLoading(false);
      })
      .catch((error) => {
        setError("Error loading cart items");
           setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handlePaymentSelection = (method: SetStateAction<string>) => {
    setPaymentMethod(method);
  };

  const confirmPaymentMethod = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    setIsPaymentMethodConfirmed(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showConfirmOrder = () => {
    setConfirmOrder(true);
  };

  const handleConfirmOrder = () => {
    setConfirmOrder(false);
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

    if ( data.status === 200 || data?.data?.status === 201 || data?.data?.status === 200 || data.status === 201  ) {
    localStorage.setItem("pin_id", 'yes');
      setSuccessModal(!successModal);
   /*    verfiywallet(false); */
   /*  console.log(data, "data"); */
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
    // Check if the message contains "Order placed successfully. Order Code"
    if (data?.data?.message && data.data.message.includes("Order placed successfully. Order Code")) {
      router.push('/profile'); // Redirect to profile page
    } else {
      router.push('/paymentpage'); // Redirect to payment page
    }
  }
});
      reset();
    } else if ( data?.data?.status === 400  || data?.data?.status === 409 || data.status === 400 || data.status === 409  ) {


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
      toast.error(`${"An Error Occured" }`, {
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
    // console.log(error);
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

  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

  const userToken = token;

  const {
    data,
    error: walleterror,
    isError,
    isSuccess,
    mutate,
    status,
  } = useMutateData("verifywalletpin", handleSuccess, handleError);

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

  const handleOrderbutton = ()=>{

      let pin = Cookies.get("nvd");
          // console.log('yes....', pin)

          const payload = {
            wallet_pin: pin,
            shipping_address:  cartItemsn?.["Delivery Details"],
            shipping_method: 'standard',
            payment_method: 'Wallet'
          }

             mutate({
      url: "/api/orderpayment",
      payload: { payload: payload, token: userToken },
      token: userToken,
    });
  }

      if (loading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<>Loading...</>}>
      <main>
        <Header />

        <div style={{ margin: "0 auto", width: "95%", maxWidth: "100%" }}>
          <div onClick={() => router.back()}>
            <div className="cursor-pointer container flex justify-start mt-4">
              <p className="text-[#E84526] text-base">Back</p>
            </div>
          </div>

          <Title title="Payment" />

          <div className="product-image-gallery container py-8 grid 2xl:grid-cols-2 gap-y-6  lg:grid-cols-2 md:grid-cols-2 xl:grid-col-2 grid-cols-1">
            <div>
              <div className=" mb-4 bg-[#F6F6F6] shadow-lg border rounded border-[#D2D2D2] px-4 py-4">
                <div className="  px-4 py-2 my-4">
                  <div className="flex justify-between flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-4">
                    <div className="flex  items-start gap-4 ">
                      <div>
                        <IoIosCheckmarkCircle color="#E84526" size={28} />
                      </div>

                      <div>
                        <div>
                          <p className="text-[#111111] text-base  ">
                            Delivery Details
                          </p>
                        </div>

                        <div className="">
                          <small className="  text-[#A09F9F]">
                            {cartItemsn?.["Delivery Details"]}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" bg-[#F6F6F6] shadow-lg border rounded border-[#D2D2D2] px-4 py-4">
                <div className="  px-4 py-2 my-4">
                  <div className="flex justify-between flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-4">
                    <div className="flex  items-start gap-4 ">
                      <div>
                        <IoIosCheckmarkCircle color="#E84526" size={28} />
                      </div>

                      <div>
                        <div>
                          <p className="text-[#111111] text-base  ">
                            Customer Address
                          </p>
                        </div>

                        <div className="">
                          <small className="  text-[#A09F9F]">
                            {cartItemsn?.["Customer Address"]}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-2">
                    <button
                      onClick={showModal}
                      className=" flex justify-center cursor-pointer text-[#E84526] text-sm"
                    >
                      Change{" "}
                      <MdKeyboardArrowRight color="#E84526" className="mt-1" />
                    </button>
                  </div>
                </div>
              </div>

              <div className=" bg-[#F6F6F6] shadow-lg border rounded border-[#D2D2D2] px-4 py-4 mt-4">
                <div className="  px-4 py-2 my-4">
                  <div className="flex justify-between flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-4">
                    <div className="flex  items-start gap-4 ">
                      <div>
                        <IoIosCheckmarkCircle color="#E84526" size={28} />
                      </div>

                      <div>
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
                                onChange={() =>
                                  handlePaymentSelection("wallet")
                                }
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
                  </div>

                  <div className="flex justify-end mt-2">
                    <button
                      onClick={confirmPaymentMethod}
                      disabled={!paymentMethod}
                      className={`flex justify-center cursor-pointer text-[#E84526] text-sm ${paymentMethod ? "active" : "disabled"}`}
                    >
                      Confirm Payment Method
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className=" container justify-center flex xl:block md:block lg:block 2xl:block">
              {paymentMethod === "wallet" ? (
                <div className="border rounded border-[#D2D2D2] px-4  py-4 shadow-lg">
                  <h1 className="text-[#111111] text-xl">Order SUMMARY</h1>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[#504D4D] font-Poppins text-base mt-4 font-semibold">
                        Wallet Balance
                      </p>
                    </div>
                    <div>
                      <h1 className="text-[#111111] text-lg mt-4 font-semibold ">
                        {cartItemsn?.["Order Summary"]?.wallet_balance}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[#b4a3a3] text-base mt-4">
                        Total Item
                      </p>
                    </div>
                    <div>
                      <h1 className="text-[#111111] text-lg mt-4 ">
                        {cartItemsn?.["Order Summary"]?.total_items}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[#b4a3a3] text-base mt-4">
                        Delivery Fees
                      </p>
                    </div>
                    <div>
                      <h1 className="text-[#111111] text-lg mt-4 ">
                        {cartItemsn?.["Order Summary"]?.delivery_fee}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[#b4a3a3] text-base mt-4">
                        Service Charge
                      </p>
                    </div>
                    <div>
                      <h1 className="text-[#111111] text-lg mt-4 ">
                        {cartItemsn?.["Order Summary"]?.service_charge}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[#b4a3a3] text-base mt-4">Total</p>
                    </div>
                    <div>
                      <h1 className="text-[#111111] text-lg mt-4 font-bold ">
                        N{cartItemsn?.["Order Summary"]?.total}
                      </h1>
                    </div>
                  </div>

                  {/*        font-Poppins font-normal text-sm  px-4 py-2 rounded-lg bg-[#FCDFD4]  transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all */}

                  <button
                    onClick={ localStorage.getItem('pin_id') === 'yes' ? handleOrderbutton :  showConfirmOrder}
                    className={`w-full mt-4 px-12 py-2 text-sm font-Poppins font-normal rounded ${
                      isPaymentMethodConfirmed
                        ? "bg-[#E84526] text-[#FFFFFF] cursor-pointer"
                        : "bg-[#D2D2D2] text-[#F6F6F6] cursor-not-allowed"
                    }`}
                    disabled={!isPaymentMethodConfirmed}
                  >
                  {
                      status === 'pending' ? '...' : 'Confirm Order'
                    }
                  </button>
                </div>
              ) : paymentMethod === "card" ? (
                <div className="border rounded border-[#D2D2D2] px-4  py-4 shadow-lg">
                  <h1 className="text-[#111111] text-xl">Order SUMMARY</h1>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[#b4a3a3] text-base mt-4">
                        Total Item
                      </p>
                    </div>
                    <div>
                      <h1 className="text-[#111111] text-lg mt-4 ">
                        {cartItemsn?.["Order Summary"]?.total_items}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[#b4a3a3] text-base mt-4">
                        Delivery Fees
                      </p>
                    </div>
                    <div>
                      <h1 className="text-[#111111] text-lg mt-4 ">
                        {cartItemsn?.["Order Summary"]?.delivery_fee}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[#b4a3a3] text-base mt-4">
                        Service Charge
                      </p>
                    </div>
                    <div>
                      <h1 className="text-[#111111] text-lg mt-4 ">
                        {cartItemsn?.["Order Summary"]?.service_charge}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[#b4a3a3] text-base mt-4">Total</p>
                    </div>
                    <div>
                      <h1 className="text-[#111111] text-lg mt-4 font-bold ">
                        N{cartItemsn?.["Order Summary"]?.total}
                      </h1>
                    </div>
                  </div>

                  <button
                    /* onClick={showConfirmOrder} */
                    className={`w-full mt-4 px-12 py-2 text-sm font-Poppins font-normal rounded ${
                      isPaymentMethodConfirmed
                        ? "bg-[#E84526] text-[#FFFFFF] cursor-pointer"
                        : "bg-[#D2D2D2] text-[#F6F6F6] cursor-not-allowed"
                    }`}
                    disabled={!isPaymentMethodConfirmed}
                  >
                    Confirm Order
                  </button>
                </div>
              ) :   <div className="border rounded border-[#D2D2D2] px-4  py-4 shadow-lg">
                  <h1 className="text-[#111111] text-xl">Order SUMMARY</h1>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[#504D4D] font-Poppins text-base mt-4 font-semibold">
                        Wallet Balance
                      </p>
                    </div>
                    <div>
                      <h1 className="text-[#111111] text-lg mt-4 font-semibold ">
                        {cartItemsn?.["Order Summary"]?.wallet_balance}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[#b4a3a3] text-base mt-4">
                        Total Item
                      </p>
                    </div>
                    <div>
                      <h1 className="text-[#111111] text-lg mt-4 ">
                        {cartItemsn?.["Order Summary"]?.total_items}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[#b4a3a3] text-base mt-4">
                        Delivery Fees
                      </p>
                    </div>
                    <div>
                      <h1 className="text-[#111111] text-lg mt-4 ">
                        {cartItemsn?.["Order Summary"]?.delivery_fee}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[#b4a3a3] text-base mt-4">
                        Service Charge
                      </p>
                    </div>
                    <div>
                      <h1 className="text-[#111111] text-lg mt-4 ">
                        {cartItemsn?.["Order Summary"]?.service_charge}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[#b4a3a3] text-base mt-4">Total</p>
                    </div>
                    <div>
                      <h1 className="text-[#111111] text-lg mt-4 font-bold ">
                        N{cartItemsn?.["Order Summary"]?.total}
                      </h1>
                    </div>
                  </div>

                  {/*        font-Poppins font-normal text-sm  px-4 py-2 rounded-lg bg-[#FCDFD4]  transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all */}

                  <button
                   /*  onClick={ localStorage.getItem('pin_id') === 'yes' ? handleOrderbutton :  showConfirmOrder} */
                    className={`w-full mt-4 px-12 py-2 text-sm font-Poppins font-normal rounded ${
                      isPaymentMethodConfirmed
                        ? "bg-[#E84526] text-[#FFFFFF] cursor-pointer"
                        : "bg-[#D2D2D2] text-[#F6F6F6] cursor-not-allowed"
                    }`}
                    disabled={!isPaymentMethodConfirmed}
                  >
                    Confirm Order
                  </button>
                </div>}
            </div>
          </div>
        </div>

        <Footer />

        <ModalComponent
          content={
            <div className="flex flex-col justify-center">
              <div>
                <input
                  className="border px-2 py-2 rounded border-[#D2D2D2] text-#B7B7B7"
                  type="text"
                  name="location"
                  placeholder="Enter your new address"
                />
              </div>

              <div className="flex mt-4 gap-4">
                <div>
                  <IoLocationOutline color="#F25E26" size={24} />
                </div>

                <div>
                  <button className="text-[#2A2A2A]">Use my location</button>
                </div>
              </div>

              <div className="flex mt-4 gap-4">
                <div>
                  <IoLocationOutline color="#F25E26" size={24} />
                </div>

                <div>
                  <p className="text-[#2A2A2A]">
                    32, Ajiroba street,arepo,lagos
                  </p>
                </div>
              </div>

              <div className="flex mt-4 gap-4">
                <div>
                  <IoLocationOutline color="#F25E26" size={24} />
                </div>

                <div>
                  <p className="text-[#2A2A2A]">45, jasper james, lekki</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center mt-4">
                <div>
                  <button className="rounded px-4 py-2 bg-[white] border border-[#E84526] text-[#E84526]">
                    Cancel
                  </button>
                </div>

                <div>
                  <button className="rounded px-4 py-2 bg-[#E84526] border border-[#E84526] text-[#FFFFFF]">
                    Change
                  </button>
                </div>
              </div>
            </div>
          }
          isModalOpen={isModalOpen}
          showModal={showModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
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
                    {status === "pending" ? "..." : "Pay"}
                  </button>
                </div>
              </form>
            </div>
          }
          isModalOpen={confirmordermodal}
          showModal={showConfirmOrder}
          handleOk={handleConfirmOrder}
          handleCancel={handlecloseOrder}
        />
      </main>
    </Suspense>
  );
};

export default Page;
