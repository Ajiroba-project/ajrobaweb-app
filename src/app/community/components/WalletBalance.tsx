"use client";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { SetStateAction, useEffect, useState } from "react";
import { Modal } from "../../component/Modal";
import { DefaultButton, IconButton } from "@/app/component/Button";
import { FaPlus } from "react-icons/fa6";
import { Deposite } from "./Deposite";
import { ChangePin } from "./ChangePin";
import { CreatePin } from "./CreatePin";
import { useAuthStore, userProfile } from "@/store/store";
import success from "../../asset/verify.svg";
import { useGetDatanew } from "@/hooks/useGetData";
import Loading from "@/app/component/Loading";
import { ReferralPointsModal } from "./ViewPoint";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutateData } from "@/hooks/useMutateData";
import receipt from "@/app/asset/print_receipt.svg";
import Image from "next/image";
import { PrintReceipt } from "./PrintReceipt";
import axios from "axios";
import Cookies from "js-cookie";
import { formatCurrency } from "@/utils/formatCurrency";

type ConfirmationModalProps = {
  amount: string;
  onClose: () => void;
};

const ConfirmationModal = ({ amount, onClose }: ConfirmationModalProps) => {
  const [loadingverify, setloadingverify] = useState(false);
  const [showModalUp, setShowModalUp] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [verificationInterval, setVerificationInterval] = useState<NodeJS.Timeout | null>(null);

  // Cleanup function for event listeners and intervals
  const cleanup = () => {
    if (verificationInterval) {
      clearInterval(verificationInterval);
      setVerificationInterval(null);
    }
    window.removeEventListener('message', handlePaymentMessage);
    setPaymentReference("");
    setShowModalUp(false);
    onClose();
  };

  const handlePaymentMessage = (event: MessageEvent) => {
    /*    console.log(event.data, "url");
       console.log(paymentReference, "paymentReference");
       console.log(event.data?.data, "paymentReference"); */
    if (event.data?.data?.status === 'success' && paymentReference) {
      startVerificationLoop(paymentReference);
    }
  };

  const Modal = ({ url, onClose }: { url: string; onClose: () => void }) => {
    useEffect(() => {
      // Add event listener when modal mounts
      window.addEventListener('message', handlePaymentMessage);

      // Cleanup when modal unmounts
      return () => {
        window.removeEventListener('message', handlePaymentMessage);
      };
    }, []);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
        <div className="bg-white p-4 rounded-lg w-full max-w-3xl relative h-[90vh]">
          <h1>Payment Page</h1>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-[101]"
            onClick={onClose}
          >
            ✕
          </button>
          <iframe
            src={url}
            className="w-full h-full border-0"
            title="Payment"
            allow="payment"
          />
        </div>
      </div>
    );
  };

  const handleContinue = async () => {
    try {
      if (!amount) {
        toast.error("Please enter a valid amount.");
        return;
      }

      const tkn_: string = Cookies.get("token") as string;
      const payload = { amount: Number(amount) };

      const response = await axios.post(
        "https://staging.ajiroba.ng/v1/pay/fund_wallet/",
        payload,
        {
          headers: {
            Authorization: `token ${tkn_}`,
          },
        }
      );

      if (response.status === 200) {
        const { payment_url, reference } = response.data;
        localStorage.setItem("paymentReference", reference);
        Cookies.set("paymentReference", reference, { expires: 1 });
        setPaymentReference(reference);

        // Set payment URL and show modal
        setPaymentUrl(payment_url);
        setShowModalUp(true);

        toast.success(`Payment initiated, Kindly proceed to complete payment`, {
          closeButton: false,
        });
      } else {
        toast.error("An unexpected status was returned.");
      }
    } catch (error) {
      toast.error("An error occurred during the payment process.");
    }
  };

  const verifyWalletPayment = async (reference: any, stopLoop: () => void) => {
    setloadingverify(true);
    let message;
    try {
      const tkn_: string = Cookies.get("token") as string;
      const response = await axios.get(
        `https://staging.ajiroba.ng/v1/pay/verify_wallet_payment/${reference}/`,
        {
          headers: {
            Authorization: `token ${tkn_}`,
          },
        }
      );


      const res = response.data;



      if (response.status === 200 || response.status === 201) {
        setloadingverify(false);
        message = response?.data?.message;
        toast.success(`${message}`, {
          closeButton: true,
          onClose: () => {
            window.location.reload();
          }
        });
        stopLoop();
      } else {
        setloadingverify(false);
        toast.error(message || "Unexpected status during verification.");
        stopLoop(); // Stop on unexpected status
      }
    } catch (error) {
      setloadingverify(false);
      console.error(error);

      // Check if it's a 500 error
      if (axios.isAxiosError(error) && error.response?.status === 500) {
        toast.error("Server error occurred. Please try again later.");
        stopLoop(); // Stop retrying on 500 errors
        return;
      }

      toast.error(message || "Error occurred during payment verification.");
    }
  };

  const startVerificationLoop = (reference: string) => {
    // Clear any existing verification interval
    if (verificationInterval) {
      clearInterval(verificationInterval);
    }

    const maxAttempts = 5; // Limit to 5 attempts
    let attempts = 0;
    let backoffTime = 2000; // Start with 2 seconds

    const intervalId = setInterval(async () => {
      attempts++;

      if (attempts > maxAttempts) {
        clearInterval(intervalId);
        cleanup();
        toast.error("Payment verification timed out. Please check your wallet balance.");
        return;
      }

      await verifyWalletPayment(reference, () => {
        clearInterval(intervalId);
        cleanup();
      });

      // Exponential backoff: double the wait time after each attempt
      backoffTime = Math.min(backoffTime * 2, 30000); // Cap at 30 seconds
    }, backoffTime);

    setVerificationInterval(intervalId);

    // Set a timeout to stop the loop after total duration
    setTimeout(() => {
      clearInterval(intervalId);
      cleanup();
    }, 2 * 60 * 1000); // 2 minutes total timeout
  };

  const router = useRouter();

  // Show Loading component while verification is in progress
  if (loadingverify) {
    return <Loading />;
  }

  return (
    <>
      <section className="fixed left-0 top-0 z-50 flex h-full w-screen items-center justify-center bg-[#000000d1] p-4">
        <div className="xs:w-[15em] flex h-auto w-[20em] flex-col gap-6 rounded-md bg-white p-6 md:w-[25em] lg:w-[30em]">
          <p className="text-center">

            You are going to deposit the amount of N { formatCurrency(amount) }
          </p>
          <div className="flex w-full gap-5 flex-col">
            <DefaultButton
              text="Continue"
              type="button"
              className="w-full rounded-md bg-[#E84526] p-3 text-white"
              handleClick={handleContinue}
            />
            <DefaultButton
              text="Back"
              type="button"
              className="w-full rounded-md border-2 border-[#E84526] p-3 text-[#E84526]"
              handleClick={cleanup}
            />
          </div>
        </div>
      </section>
      {showModalUp && (
        <Modal
          url={paymentUrl}
          onClose={cleanup}
        />
      )}
    </>
  );
};

export const WalletBalance = () => {
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [showPin, setShowPin] = useState<boolean>(false);
  const [createPin, setCreatePin] = useState<boolean>(false);
  const [printreceipt, setprintreceipt] = useState<boolean>(false);
  const [viewPoint, setViewPoint] = useState<boolean>(false);
  const [changePin, setChangePin] = useState<boolean>(false);
  const [deposite, setDeposite] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const [depositAmount, setDepositAmount] = useState<string>("");

  const { successModal, setSuccessModal } = userProfile((state) => ({
    successModal: state.successModal,
    setSuccessModal: state.setSuccessModal,
  }));

  const handleSuccess = () => {
    setSuccessModal();
    setChangePin(false);
    setCreatePin(false);
  };

  const { userDetails, editProfile } = userProfile((state) => ({
    userDetails: state.userDetails,
    editProfile: state.editProfile,
  }));

  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

  const [userData, setUserData] = useState<any>(null);
  const [isTokenReady, setIsTokenReady] = useState(false);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/view_profile/`;

  const tkn_: string = Cookies.get('token') as string;

  const {
    data: userInfo,
    isLoading: userLoading,
    refetch,
  } = useGetDatanew(url, "get_user_details", tkn_, {
    cacheTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    if (tkn_) {
      setIsTokenReady(true);
    }
  }, [tkn_]);

  useEffect(() => {
    if (isTokenReady) {
      if (isLoggedIn && userInfo) {
        setUserData(userInfo?.data || {});
      } else if (!isLoggedIn) {
        setUserData(userDetails);
      }
    }
  }, [isTokenReady, userInfo, isLoggedIn, userDetails]);

  if (userLoading || !userData) {
    return <Loading />;
  }

  const sampleReferralData = [
    { name: "Alex Jones", points: 50, date: "12 Feb, 2024" },
    { name: "Rachel Jade", points: 50, date: "12 Feb, 2024" },
    { name: "Malik Berry", points: 50, date: "12 Feb, 2024" },
    { name: "Alex Jones", points: 50, date: "12 Feb, 2024" },
  ];

  return (
    <div className="flex flex-col px-2">
      <div className="flex items-center justify-between">
        <p className="capitalize">available balance</p>
        <div onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? <FaRegEyeSlash /> : <FaRegEye />}
        </div>
      </div>
      <div className="balance pt-1">
        <p className="text-2xl font-semibold slashed-zero leading-normal">
          {showBalance
            ? new Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN'
            }).format(userInfo?.data?.my_wallet[0]?.balance || 0)
            : "*****"}
        </p>
      </div>

      <div className="wallet-pin flex items-center justify-between">
       {/*  <div className="flex items-center gap-8">
          <p>{showPin ? "******" : "*****"}</p>
          <div
            onClick={() => setShowPin(!showPin)}
            className="justify-center text-sm"
          >
            {showPin ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        </div> */}
        <p
          className="cursor-pointer justify-end text-end text-sm capitalize underline underline-offset-4 hover:text-[#f25e26]"
          onClick={() => setCreatePin(!createPin)}
        >
          create PIN
        </p>
      </div>

      <div className="flex justify-between py-4">
        <div className="flex flex-col">
          <p className="text-sm capitalize leading-snug">ajiroba point</p>
          <p className="text-sm font-semibold slashed-zero">
            {userInfo?.data?.my_wallet[0]?.point}
          </p>
        </div>
        <p
          className="cursor-pointer text-sm capitalize underline underline-offset-4 hover:text-[#f25e26]"
          onClick={() => setViewPoint(!viewPoint)}
        >
          view
        </p>
      </div>

      <div className="mt-10 flex w-full flex-col justify-between gap-4 md:flex-row lg:flex-row">
        <IconButton
          text="add money"
          type="button"
          className="flex items-center justify-center gap-1 justify-self-center rounded-lg bg-[#f25e26] p-2 text-xs capitalize text-white lg:w-max"
          icon={<FaPlus />}
          handleClick={() => setDeposite(true)}
        />
        <DefaultButton
          text="change pin"
          type="button"
          className="rounded-lg font-bold border-2 border-[#f25e26] p-2 text-xs capitalize text-[#f25e26] lg:w-max"
          handleClick={() => setChangePin(!changePin)}
        />
      </div>

      <div className="mt-10 flex w-full flex-col justify-between gap-4 md:flex-row lg:flex-row">
        <div className="flex gap-2 flex-wrap">
          <Image
            src={receipt}
            alt="receipt"
            width={15}
            height={15}
            className=" object-cover rounded-lg"
          />

          <p
            onClick={() => setprintreceipt(!printreceipt)}
            className="text-[#111111] cursor-pointer font-Poppins text-base font-normal"
          >
            Generate Statement
          </p>
        </div>
      </div>

      {deposite && (
        <Deposite
          handleClick={() => setDeposite(false)}
          handleNext={(amount: SetStateAction<string>) => {
            setDeposite(false);
            setDepositAmount(amount);
            setShowConfirmation(true);
          }}
          handleCancel={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}

      {showConfirmation && (
        <ConfirmationModal
          amount={depositAmount}
          onClose={() => {
            setShowConfirmation(false);
          }}
        />
      )}

      {createPin && (
        <CreatePin createPin={createPin} setCreatePin={setCreatePin} />
      )}
      {changePin && (
        <ChangePin changePin={changePin} setChangePin={setChangePin} />
      )}
      {printreceipt && (
        <PrintReceipt receipt={receipt} setreceipt={setprintreceipt} />
      )}
      {viewPoint && (
        <ReferralPointsModal
          isOpen={viewPoint}
          setIsOpen={setViewPoint}
          referralData={sampleReferralData}
        />
      )}

      {successModal && (
        <div
          className={`${successModal ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" : "hidden"}`}
        >
          <Modal
            buttoncount={1}
            icon={success}
            handleEvent={handleSuccess}
            title="Successful"
            subtitle={"You have successfully created your wallet pin"}
            buttontext="Proceed"
            buttonclass="w-full rounded-md bg-[#FCDFD4] p-3 hover:bg-[#f25e26] hover:text-white"
          />
        </div>
      )}
    </div>
  );
};
