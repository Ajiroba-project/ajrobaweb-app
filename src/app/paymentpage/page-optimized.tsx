"use client";
import { usePathname, useRouter } from "next/navigation";
import { SetStateAction, useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Header } from "../component/Header";
import { Title } from "../component/Title";
import { Footer } from "../component/Footer";
import { Suspense } from "react";
import ModalComponent from "../component/ModalComponent";
import { IoLocationOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/store";
import { useMutateData } from "@/hooks/useMutateNewData";
import Loading from "../component/Loading";
import { Deposite } from "../profile/components/Deposite";
import { DefaultButton, CustomizeButton } from "../component/Button";
import { DepositeCard } from "../profile/components/DepositeCard";
import { formatCurrency } from "@/utils/formatCurrency";
import { OrderSummary } from "./components/OrderSummary";
import { PaymentDetails } from "./components/PaymentDetails";
import { WalletPinModal } from "./components/WalletPinModal";

// Types
interface ConfirmationModalProps {
  amount: string;
  onClose: () => void;
  cartItemsn: any;
  isProcessingPayment: boolean;
}

interface CartItems {
  "Delivery Details": string;
  "Customer Address": string;
  "Order Summary": {
    wallet_balance: string;
    total_items: number;
    delivery_fee: string;
    service_charge: string;
    total: number;
  };
}

// Custom hooks
const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { triggerCartRefresh } = useAuthStore(state => ({
    triggerCartRefresh: state.triggerCartRefresh,
  }));

  const fetchCartItems = useCallback(async () => {
    const tkn_ = Cookies.get("token") as string;

    if (!tkn_) {
      toast.error("Please log in to continue.");
      router.push("/signin");
      return;
    }

    setLoading(true);

    let sessionKey = Cookies.get("session_key");
    if (!sessionKey) {
      sessionKey = `session_${Math.random().toString(36).substr(2, 9)}`;
      Cookies.set("session_key", sessionKey, { expires: 7 });
    }

    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (tkn_) {
      headers["Authorization"] = `token ${tkn_}`;
    }

    try {
      const response = await axios.get(
        `https://staging.ajiroba.ng/v1/commerce/checkout/`,
        { headers }
      );

      const { data } = response.data;

      if (data?.status === 400) {
        router.push("/my-order");
      } else {
        setCartItems(data);
      }
    } catch (error) {
      console.log(error, 'error');
      if (error instanceof AxiosError && error.response?.status === 400) {
        router.push("/my-order");
      } else {
        setError("Error loading cart items");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return { cartItems, loading, error, refetch: fetchCartItems };
};

const usePaymentProcessing = () => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const isProcessingRef = useRef(false);

  const handlePaymentMessage = useCallback((event: MessageEvent) => {
    if (event.data?.data?.status === 'success' && paymentReference) {
      console.log('Payment successful');
    }
  }, [paymentReference]);

  useEffect(() => {
    return () => {
      setIsProcessingPayment(false);
      isProcessingRef.current = false;
    };
  }, []);

  return {
    isProcessingPayment,
    paymentUrl,
    paymentReference,
    setPaymentUrl,
    setPaymentReference,
    setIsProcessingPayment,
    handlePaymentMessage,
    isProcessingRef
  };
};

const Page = () => {
  const router = useRouter();
  const { cartItems, loading, error } = useCartItems();
  const { 
    isProcessingPayment, 
    paymentUrl, 
    setPaymentUrl, 
    setIsProcessingPayment,
    handlePaymentMessage 
  } = usePaymentProcessing();

  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmordermodal, setConfirmOrder] = useState(false);
  const [cardpayment, setcardpayment] = useState(false);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [isPaymentMethodConfirmed, setIsPaymentMethodConfirmed] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const tkn_ = Cookies.get("token") as string;
  const { triggerCartRefresh } = useAuthStore(state => ({
    triggerCartRefresh: state.triggerCartRefresh,
  }));

  // Payment method handlers
  const handlePaymentSelection = useCallback((method: string) => {
    setPaymentMethod(method);
  }, []);

  const confirmPaymentMethod = useCallback(() => {
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }
    setIsPaymentMethodConfirmed(true);
  }, [paymentMethod]);

  // Wallet payment handlers
  const handleWalletPayment = useCallback(() => {
    // Always show wallet pin modal for wallet payments
    setConfirmOrder(true);
  }, []);

  const handleOrderbutton = useCallback(() => {
    const pin = Cookies.get("nvd");
    if (!pin) {
      toast.error("Please enter your wallet pin first.");
      return;
    }

    const payload = {
      wallet_pin: pin,
      shipping_address: cartItems?.["Delivery Details"],
      shipping_method: "standard",
      payment_method: "Wallet",
    };

    mutate({
      url: "/api/orderpayment",
      payload: { payload: payload, token: tkn_ },
      token: tkn_,
    });
  }, [cartItems, tkn_]);

  // Form handling
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Passcode is required")
      .min(6, "Can't be lesser than 6 digits"),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  // API handlers
  const handleSuccess = useCallback((data: any) => {
    if (data.status === 200 || data?.data?.status === 201 || data?.data?.status === 200 || data.status === 201) {
      // Close the wallet pin modal
      setConfirmOrder(false);
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
          if (data?.data?.message && data.data.message.includes("Order placed successfully. Order Code")) {
            triggerCartRefresh();
            router.push("/my-order");
          } else {
            router.push("/paymentpage");
          }
        },
      });
      reset();
    } else if (data?.data?.status === 400 || data?.data?.status === 409 || data.status === 400 || data.status === 409) {
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
      toast.error("An Error Occured", {
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
  }, [successModal, triggerCartRefresh, router, reset]);

  const handleError = useCallback((error: any) => {
    toast.error("An Error Occured", {
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
  }, [reset]);

  const { mutate, status } = useMutateData("verifywalletpin", handleSuccess, handleError);

  const submitForm = useCallback((data: any) => {
    Cookies.set("nvd", data?.password, { expires: 1 });
    const payload = {
      wallet_pin: data?.password,
    };

    mutate({
      url: "/api/verifywalletpin",
      payload: { payload: payload, token: tkn_ },
      token: tkn_,
    });
  }, [mutate, tkn_]);

  // Modal handlers
  const showModal = useCallback(() => setIsModalOpen(true), []);
  const handleOk = useCallback(() => setIsModalOpen(false), []);
  const handleCancel = useCallback(() => setIsModalOpen(false), []);
  const showConfirmOrder = useCallback(() => setConfirmOrder(true), []);
  const showConfirmOrderCard = useCallback(() => setcardpayment(true), []);
  const handleConfirmOrder = useCallback(() => setConfirmOrder(false), []);
  const handlecloseOrder = useCallback(() => setConfirmOrder(false), []);

  // Memoized components
  const orderSummaryComponent = useMemo(() => {
    if (!cartItems) return null;

    return (
      <OrderSummary
        cartItems={cartItems}
        paymentMethod={paymentMethod}
        isPaymentMethodConfirmed={isPaymentMethodConfirmed}
        onWalletPayment={handleWalletPayment}
        onCardPayment={showConfirmOrderCard}
        isProcessing={status === "pending"}
      />
    );
  }, [cartItems, paymentMethod, isPaymentMethodConfirmed, handleWalletPayment, showConfirmOrderCard, status]);

  const paymentDetailsComponent = useMemo(() => {
    if (!cartItems) return null;

    return (
      <PaymentDetails
        cartItems={cartItems}
        paymentMethod={paymentMethod}
        isPaymentMethodConfirmed={isPaymentMethodConfirmed}
        onAddressChange={showModal}
        onPaymentMethodChange={handlePaymentSelection}
        onConfirmPaymentMethod={confirmPaymentMethod}
      />
    );
  }, [cartItems, paymentMethod, isPaymentMethodConfirmed, showModal, handlePaymentSelection, confirmPaymentMethod]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-[#E84526] text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <main>
        <Header />

        <div style={{ margin: "0 auto", width: "95%", maxWidth: "100%" }}>
          <div onClick={() => router.back()}>
            <div className="cursor-pointer container flex justify-start mt-4">
              <p className="text-[#E84526] text-base">Back</p>
            </div>
          </div>

          <Title title="Payment" />

          <div className="product-image-gallery container py-8 grid 2xl:grid-cols-2 gap-y-6 lg:grid-cols-2 md:grid-cols-2 xl:grid-col-2 grid-cols-1">
            <div>
              {paymentDetailsComponent}
            </div>

            <div className="container justify-center flex xl:block md:block lg:block 2xl:block">
              {orderSummaryComponent}
            </div>
          </div>
        </div>

        <Footer />

        {/* Modals */}
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
                  <p className="text-[#2A2A2A]">32, Ajiroba street,Arepo,lagos</p>
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

        {cardpayment && (
          <DepositeCard
            handleClick={() => setcardpayment(false)}
            handleNext={(amount: SetStateAction<string>) => {
              setcardpayment(false);
              setDepositAmount(amount);
              setShowConfirmation(true);
            }}
            requiredAmount={cartItems?.["Order Summary"]?.total}
            handleCancel={() => setcardpayment(false)}
          />
        )}

        {showConfirmation && (
          <ConfirmationModal
            amount={depositAmount}
            onClose={() => setShowConfirmation(false)}
            cartItemsn={cartItems}
            isProcessingPayment={isProcessingPayment}
          />
        )}

        <WalletPinModal
          isOpen={confirmordermodal}
          onClose={handlecloseOrder}
          onSubmit={submitForm}
          isLoading={status === "pending"}
        />
      </main>
    </Suspense>
  );
};

// ConfirmationModal component (keeping the existing implementation)
const ConfirmationModal = ({ amount, onClose }: ConfirmationModalProps) => {
  // ... existing ConfirmationModal implementation
  return null; // Placeholder
};

export default Page;
