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
import { useGetDatanew, useGetPointData } from "@/hooks/useGetData";
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
import PointsHistoryModal from "./PointsHistoryModal";



type ConfirmationModalProps = {
  amount: string;
  onClose: () => void;
  onRefreshData?: () => Promise<any>;
};

/** Parse Django / Paystack-style error bodies */
function extractAxiosErrorMessage(data: unknown): string {
  if (data == null) return "";
  if (typeof data === "string") return data;
  if (typeof data !== "object") return String(data);
  const o = data as Record<string, unknown>;
  const pick = (v: unknown): string => {
    if (typeof v === "string") return v;
    if (Array.isArray(v))
      return v.map((x) => (typeof x === "string" ? x : JSON.stringify(x))).join(" ");
    return "";
  };
  return (
    pick(o.message) ||
    pick(o.error) ||
    pick(o.detail) ||
    pick(o.non_field_errors) ||
    ""
  );
}

function isLikelyPendingWalletVerification(msg: string): boolean {
  const m = msg.toLowerCase().trim();
  if (!m) return true;
  return (
    m.includes("pending") ||
    m.includes("processing") ||
    m.includes("not completed") ||
    m.includes("not complete") ||
    m.includes("not yet") ||
    m.includes("still processing") ||
    m.includes("awaiting") ||
    m.includes("in progress") ||
    (m.includes("try again") && !m.includes("invalid")) ||
    m.includes("has not been completed") ||
    m.includes("could not confirm") ||
    m.includes("unable to verify") && m.includes("yet")
  );
}

function isClearlyInvalidPaymentReference(msg: string): boolean {
  const m = msg.toLowerCase();
  if (!m.trim()) return false;
  return (
    m.includes("invalid reference") ||
    m.includes("invalid transaction reference") ||
    m.includes("reference is invalid") ||
    (m.includes("not found") && m.includes("reference")) ||
    m.includes("malformed reference") ||
    m.includes("expired reference")
  );
}

const ConfirmationModal = ({ amount, onClose, onRefreshData }: ConfirmationModalProps) => {
  const [loadingverify, setloadingverify] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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
    // Read reference from storage instead of relying on React state (which may be async)
    const storedReference = localStorage.getItem("paymentReference") || Cookies.get("paymentReference");
    
    if (event.data?.data?.status === 'success' && storedReference) {
      startVerificationLoop(storedReference);
    } 
     /*  if (event.data?.data?.status === 'success' && paymentReference) {
        // Payment already confirmed by gateway - no need to verify
        toast.success("Payment successful! Your wallet has been credited.", {
          closeButton: true,
          onClose: () => {
            window.location.reload();
          }
        });
      } else if (event.data?.data?.status === 'pending' && paymentReference) {
        // Payment is pending - start verification loop
        startVerificationLoop(paymentReference);
      } */
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

      setIsProcessing(true);
      const tkn_: string = Cookies.get("token") as string;
      const payload = { amount: Number(amount) };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/pay/fund_wallet/`,
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
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyWalletPayment = async (reference: any, stopLoop: () => void, onRefreshData?: () => void) => {
    const refStr =
      reference === undefined || reference === null ? "" : String(reference).trim();
    // Validate reference exists before making API call
    if (!refStr) {
      console.error("No payment reference provided");
      toast.error("Payment reference is missing. Please try again.");
      // Refresh data even on validation failure
      if (onRefreshData) onRefreshData();
      stopLoop();
      return;
    }

    setloadingverify(true);
    let message;
    try {
      const tkn_: string = Cookies.get("token") as string;
      
      // Validate token exists
      if (!tkn_) {
        toast.error("Authentication token is missing. Please log in again.");
        if (onRefreshData) onRefreshData();
        stopLoop();
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/pay/verify_wallet_payment/${encodeURIComponent(refStr)}/`,
        {
          headers: {
            Authorization: `token ${tkn_}`,
          },
        }
      );


  /*     const res = response.data; */



      if (response.status === 200 || response.status === 201) {
        setloadingverify(false);
        message = response?.data?.message;
        
        // Refresh user data in background before showing success
        if (onRefreshData) {
          await onRefreshData();
        }
        
        toast.success(`${message}`, {
          closeButton: true,
          onClose: () => {
            window.location.reload();
          }
        });
        stopLoop();
      } else {
        setloadingverify(false);
        // Refresh data even on unexpected status
        if (onRefreshData) await onRefreshData();
        toast.error(message || "Unexpected status during verification.");
        stopLoop(); // Stop on unexpected status
      }
    } catch (error) {
      setloadingverify(false);

      // Show more specific error messages
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const responseData = error.response?.data;
        const serverMessage = extractAxiosErrorMessage(responseData);

        if (status === 400) {
          // Check if payment was already verified (this is actually a success case!)
          const messageLower = serverMessage.toLowerCase();
          const isAlreadyVerified =
            !!serverMessage &&
            (messageLower.includes("already verified") ||
              messageLower.includes("already been verified") ||
              messageLower.includes("payment already") ||
              messageLower.includes("already processed") ||
              (typeof responseData === "object" &&
                responseData !== null &&
                (responseData as { status?: string }).status === "failed" &&
                messageLower.includes("verified")));

          if (isAlreadyVerified) {
            if (onRefreshData) {
              await onRefreshData();
            }

            toast.success(serverMessage || "Payment verified successfully!", {
              closeButton: true,
              onClose: () => {
                window.location.reload();
              },
            });
            stopLoop();
            return;
          }

          // Many gateways return 400 while payment is still pending — keep polling
          if (isLikelyPendingWalletVerification(serverMessage)) {
            if (process.env.NODE_ENV === "development") {
              console.debug(
                "[wallet verify] retryable 400 (pending):",
                serverMessage || "(empty)"
              );
            }
            return;
          }

          if (isClearlyInvalidPaymentReference(serverMessage)) {
            toast.error(
              serverMessage || "Invalid payment reference. Please contact support."
            );
            if (onRefreshData) await onRefreshData();
            stopLoop();
            return;
          }

          // Ambiguous 400: retry without stopping (loop max attempts still applies)
          if (process.env.NODE_ENV === "development") {
            console.debug("[wallet verify] ambiguous 400, will retry:", serverMessage);
          }
          return;
        }

        if (status === 401) {
          toast.error("Your session has expired. Please log in again.");
          if (onRefreshData) await onRefreshData();
          stopLoop();
          return;
        }

        if (status === 404) {
          toast.error("Payment record not found.");
          if (onRefreshData) await onRefreshData();
          stopLoop();
          return;
        }

        if (status && status >= 500) {
          toast.error(serverMessage || "Server error occurred. Retrying...");
          // Don't stop loop for 5xx errors, let it retry
          return;
        }

        toast.error(serverMessage || `Error ${status}: Payment verification failed.`);
        if (onRefreshData) await onRefreshData();
      } else {
        toast.error("Network error. Please check your connection.");
        if (onRefreshData) await onRefreshData();
      }
    }
  };

  /* const startVerificationLoop = (reference: string) => {
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
 */



  const startVerificationLoop = (reference: string) => {
    if (verificationInterval) {
      clearInterval(verificationInterval);
    }
  
    const maxAttempts = 5;
    let attempts = 0;
    let backoffTime = 2000;
    let isCompleted = false;
  
    const intervalId = setInterval(async () => {
      if (isCompleted) {
        clearInterval(intervalId);
        return;
      }
  
      attempts++;
  
      if (attempts > maxAttempts) {
        clearInterval(intervalId);
        cleanup();
        // Refresh data even on timeout
        if (onRefreshData) await onRefreshData();
        toast.error("Payment verification timed out. Please check your wallet balance.");
        return;
      }
  
      try {
        await verifyWalletPayment(reference, () => {
          // Success case
          isCompleted = true;
          clearInterval(intervalId);
          cleanup();
        }, onRefreshData);
      } catch (error) {
        // Failure case - handle different error types appropriately
        console.error("Verification attempt failed:", error);
        
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const responseData = error.response?.data;
          const serverMessage = responseData?.message || responseData?.error || responseData?.detail;
          
          // Check if it's "already verified" - this is actually success!
          const messageLower = serverMessage?.toLowerCase() || '';
          const isAlreadyVerified = serverMessage && (
            messageLower.includes('already verified') ||
            messageLower.includes('already been verified') ||
            messageLower.includes('payment already') ||
            messageLower.includes('already processed') ||
            (responseData?.status === 'failed' && messageLower.includes('verified'))
          );
          
          if (status === 400 && isAlreadyVerified) {
            console.log("✅ Payment already verified in loop - treating as success");
            // Refresh data before stopping
            if (onRefreshData) await onRefreshData();
            isCompleted = true;
            clearInterval(intervalId);
            cleanup();
            return;
          }
          
          // Stop retrying on other 4xx client errors (these won't resolve with retries)
          if (status && status >= 400 && status < 500) {
            isCompleted = true;
            clearInterval(intervalId);
            cleanup();
            return;
          }
          
          // For 5xx errors, let it retry (server might recover)
          if (status && status >= 500) {
            backoffTime = Math.min(backoffTime * 2, 30000);
            return;
          }
        }
        
        // For network errors, continue retrying with backoff
        backoffTime = Math.min(backoffTime * 2, 30000);
      }
    }, backoffTime);
  
    setVerificationInterval(intervalId);
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

            You are going to deposit the amount of  {formatCurrency(amount)}
          </p>
          <div className="flex w-full gap-5 flex-col">
            <DefaultButton
              text={isProcessing ? "Processing..." : "Continue "}
              type="button"
              className="w-full rounded-md bg-[#E84526] p-3 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E84526]/90 transition-colors duration-200"
              handleClick={handleContinue}
              disabled={isProcessing}
            />
            <DefaultButton
              text="Back"
              type="button"
              className="w-full rounded-md border-2 border-[#E84526] p-3 text-[#E84526] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E84526] hover:text-white transition-colors duration-200"
              handleClick={cleanup}
              disabled={isProcessing}
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
  // const [showPin, setShowPin] = useState<boolean>(false);
  const [createPin, setCreatePin] = useState<boolean>(false);
  const [printreceipt, setprintreceipt] = useState<boolean>(false);
  const [viewPoint, setViewPoint] = useState<boolean>(false);
  const [changePin, setChangePin] = useState<boolean>(false);
  const [deposite, setDeposite] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);


  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [pointsUserId, setPointsUserId] = useState<string | undefined>(undefined);
  const [isPointsModalOpen, setIsPointsModalOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // useAuthMiddleware(useRouter());



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


      // console.log(userInfo?.data, 'userInfo');

  // Call points hook before any early returns to keep hook order stable
  // const userToken = Cookies.get('token') as string;
  // const { data: pointinfo, isLoading: pointsLoading, error: pointerror } = useGetPointData('/api/getpoints', "get_point_details", userToken);

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




  // console.log(pointinfo?.data?.data, 'pointinfo');


  // const sampleReferralData = pointinfo?.data?.data.map((item: any) => ({
  //   name: item.description,
  //   points: item.point,
  //   date: item.date_created,
  // }));


  // console.log(sampleReferralData, 'sampleReferralData');



  // const sampleReferralData = [
  //   { name: "Alex Jones", points: 50, date: "12 Feb, 2024" },
  //   { name: "Rachel Jade", points: 50, date: "12 Feb, 2024" },
  //   { name: "Malik Berry", points: 50, date: "12 Feb, 2024" },
  //   { name: "Alex Jones", points: 50, date: "12 Feb, 2024" },
  // ];

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
          <p className="text-sm capitalize leading-snug">ajiroba points</p>
          <p className="text-sm font-semibold slashed-zero">
            {formatCurrency(userInfo?.data?.my_wallet[0]?.balance || 0)} ({(userInfo?.data?.my_wallet[0]?.point || 0)}) Point{userInfo?.data?.my_wallet[0]?.point > 1 ? 's' : ''}
          </p>
        </div>
        <p
          className="cursor-pointer text-sm capitalize underline underline-offset-4 hover:text-[#f25e26]"
          // onClick={() => setViewPoint(!viewPoint)}
          onClick={() => { setPointsUserId(userInfo?.data?.id || ""); setIsPointsModalOpen(true); }}
        >
          view
        </p>
      </div>

      <div className="mt-10 flex w-full flex-col justify-between gap-2 md:flex-row lg:flex-row">
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
            className="h-[15px] w-[15px] rounded-lg"
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
          onRefreshData={refetch}
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


      {/* {viewPoint && (
        <ReferralPointsModal
          isOpen={viewPoint}
          setIsOpen={setViewPoint}
          referralData={sampleReferralData}
        />
      )} */}



<PointsHistoryModal
        isOpen={isPointsModalOpen}
        onClose={() => setIsPointsModalOpen(false)}
        userId={pointsUserId}
      />



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
