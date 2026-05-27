"use client";
import React, { useEffect, useState } from "react";
import { Formtitle } from "./Formtitle";
import {
  CablePurchase,
  useAuthStore,
  userNavStore,
} from "@/store/store";
import { DefaultButton } from "../../component/Button";
import { WalletPin } from "./WalletPin";
import ModalComponent from "@/app/component/ModalComponent";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useGetDatanew } from "@/hooks/useGetData";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutateData } from '@/hooks/useMutateNewData'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Input from "./Input";
import * as yup from "yup";
import { formatCurrency } from '@/utils/formatCurrency'

export const CablePayment = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  const { setCableStepper, CableDetails, customerCabledetails } = CablePurchase((state) => ({
    setCableStepper: state.setCableStepper,
    CableDetails: state.CableDetails,
    customerCabledetails: state.customerCabledetails,

  }));

  const bundleString = CableDetails?.bundle || ""; // Ensure it's a string

  /** UI: keep plan + price; only replace hyphen-before-₦ so it doesn’t look like “minus”. */
  const bundleForDisplay = bundleString.replace(/-\s*₦/g, " ₦").trim()

  /** Supports `Name ₦100` (current) and legacy `Name -₦100`. Use last ₦ if multiple. */
  const amountMatches = [...bundleString.matchAll(/₦\s*([\d,]+(?:\.\d+)?)/g)]
  const lastAmt = amountMatches[amountMatches.length - 1]
  const amount = lastAmt
    ? parseInt(String(lastAmt[1]).replace(/,/g, ""), 10)
    : 0

  /** Nomba `package` field: plan name only (strip trailing price). End-anchored so inner hyphens in names stay. */
  const cablePackageName =
    bundleString
      .replace(/\s*-\s*₦[\d,]+(?:\.\d+)?\s*$/i, "")
      .replace(/\s+₦[\d,]+(?:\.\d+)?\s*$/i, "")
      .trim() || bundleString.trim()


  //   console.log(CableDetails, 'cabbbbbb')
  //  console.log(customerCabledetails, 'cabbbbbb---cvvv')

  const router = useRouter();

  const [successModal, setSuccessModal] = useState(false);

  const Reroute = () => {
    const router = useRouter();
    router.push("/signin");

    return null;
  };

  const userToken = (Cookies.get("token") as string) || "";

  const [paywithwallet, setPaywithWallet] = useState(false);
  const [showpaymentbutton, setShowpaymentbutton] = useState(false);

  const showWalletPayment = () => {
    setPaywithWallet(true);
  };

  const handlecloseOrder = () => {
    setPaywithWallet(false);
  };

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/view_profile/`;

  const { data: userInfo, isLoading: userLoading } = useGetDatanew(
    url,
    "get_user_details",
    userToken || " ",
  );

  const handleOrderbutton = () => {


    // console.log(CableDetails, 'cabbbbbb')

    const payload = {
      cableTvType: CableDetails.decoder,
      payerName: customerCabledetails,
      amount: Number(amount),
      customerId: CableDetails?.iucnumber,
      package: cablePackageName,
    }

    Cookies.set("atdnew", JSON.stringify(payload));


    // console.log(customerCabledetails, 'customerCabledetails')
    // console.log(payload, 'payload')
    // console.log(CableDetails, 'cableddd')

    cablemutate({
      url: "/api/purchasecable",
      payload: { payload: payload },

    });
  };

  const MakePurchase = () => {
    let pin = Cookies.get("nvd");
    console.log("Make purchase");
  };

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
      setShowpaymentbutton((prevState) => !prevState);

      setPaywithWallet(false);
      toast.success(`${data?.data?.message} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => { },
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
    setShowpaymentbutton(false);
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

  const {
    data,
    error: walleterror,
    isError,
    isSuccess,
    mutate,
    status: verifystatus,
  } = useMutateData("verifywalletpin", handleSuccess, handleError);

  const handleSuccessCable = (data: any) => {
    if (
      data.status === 200 ||
      data?.data?.status === 201 ||
      data?.data?.status === 200 ||
      data.status === 201
    ) {
      Cookies.set("atd", JSON.stringify(data?.data));
      localStorage.setItem("pin_id", "yes");
      setSuccessModal(!successModal);
      setShowpaymentbutton((prevState) => !prevState);

      setPaywithWallet(false);

      if (data?.data?.status === "success") {
        toast.success(`${data?.data?.message} `, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            setCableStepper(3);
          },
        });
        reset();
      } else {
        toast.error(`${data?.data?.message} `, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            setCableStepper(1);
          },
        });
        reset();
      }
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

  const handleErrorCable = (error: any) => {
    setShowpaymentbutton(false);
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

  const {
    data: cabledata,
    error: cablerror,
    isError: cableisError,
    isSuccess: cableisSuccess,
    mutate: cablemutate,
    status: cablestatus,
  } = useMutateData(
    "purchasecable",
    handleSuccessCable,
    handleErrorCable,
  );

  return (
    <section className="bg-[#F6F6F6] py-12 w-full">
      <p
        className="brand1 cursor-pointer flex items-start px-8"
        onClick={() => setCableStepper(0)}
      >
        Back
      </p>
      <div className="  ">
        <div className="flex items-center justify-center ">
          <Formtitle
            title="Payment"
            subtitle="You can make your payment with any of the payment options below "
          />
        </div>

        <div className="flex px-8">
          <form className="flex w-full flex-col items-start justify-start gap-4 py-10 ">

            <div>
              <h3 className="text-[#6E6E6E]">Name: </h3>
              <p className='font-semibold'>{customerCabledetails ? customerCabledetails : 'NA'}</p>
            </div>
            <div>
              <h3 className="text-[#6E6E6E]">Operator: </h3>
              <p className='font-semibold'>{CableDetails?.decoder ? CableDetails?.decoder : 'NA'}</p>
            </div>
            <div>
              <h3 className="text-[#6E6E6E]">Package: </h3>
              <p className='font-semibold'>{bundleForDisplay || 'NA'}</p>
            </div>

            <div>
              <h3 className="text-[#6E6E6E]">Smart Card/IUC Number</h3>
              <p className='font-semibold'>{CableDetails?.iucnumber ? CableDetails?.iucnumber : 'NA'}</p>
            </div>
            <div>
              <h3 className="text-[#6E6E6E]">Amount</h3>
              <p className='font-semibold'>{formatCurrency(amount)}</p>
            </div>

            <div className="my-5 flex flex-wrap w-full items-center justify-center gap-8">
              {!showpaymentbutton ? (
                <DefaultButton
                  type="button"
                  text="Verify Wallet Pin"
                  className="rounded-lg bg-[#f25e26] px-8 py-3 text-white"
                  handleClick={() => setPaywithWallet(true)}
                />
              ) : (
                <DefaultButton
                  type="button"

                  text={cablestatus === 'pending' ? 'loading...' : "Pay with Wallet"}
                  className="rounded-lg bg-[#f25e26] px-8 py-3 text-white"
                  handleClick={
                    localStorage.getItem("pin_id") === "yes"
                      ? handleOrderbutton
                      : MakePurchase
                  }
                />
              )}

              <DefaultButton
                type="button"
                text="Fund Wallet"
                className="rounded-lg border-2 border-[#f25e26] px-8 py-3 text-[#f25e26]"
                handleClick={() => router.push("/profile")}
              />
            </div>
          </form>
        </div>
      </div>

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
                  HiEyeSlash={<FaRegEyeSlash color='#f25e26' />}
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
        isModalOpen={paywithwallet}
        showModal={showWalletPayment}
        handleOk={() => { }}
        handleCancel={handlecloseOrder}
      />
    </section>
  );
};
