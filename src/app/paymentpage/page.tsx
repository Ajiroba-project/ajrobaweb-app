// "use client";
// import { usePathname, useRouter } from "next/navigation";
// import { SetStateAction, useEffect, useMemo, useState, useRef } from "react";

// import { Header } from "../component/Header";
// import { Title } from "../component/Title";
// import { Footer } from "../component/Footer";
// import { Suspense } from "react";
// import { IoIosCheckmarkCircle } from "react-icons/io";
// import { MdKeyboardArrowRight } from "react-icons/md";
// import ModalComponent from "../component/ModalComponent";
// import Input from "../component/Input";
// import { IoLocationOutline } from "react-icons/io5";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import Cookies from "js-cookie";
// import axios, { AxiosError } from "axios";
// import { toast } from "react-toastify";
// import { useAuthStore } from "@/store/store";
// import { useMutateData } from "@/hooks/useMutateNewData";
// import Loading from "../component/Loading";
// import { Deposite } from "../profile/components/Deposite";
// import { DefaultButton, CustomizeButton } from "../component/Button";
// import { DepositeCard } from "../profile/components/DepositeCard";
// import { formatCurrency } from "@/utils/formatCurrency";

// type ConfirmationModalProps = {
//   amount: string;
//   onClose: () => void;
//   cartItemsn: any;
//   isProcessingPayment: boolean;
// };

// const Page = () => {
//   const router = useRouter();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [confirmordermodal, setConfirmOrder] = useState(false);
//   const [isProcessingPayment, setIsProcessingPayment] = useState(false);
//   const [cardpayment, setcardpayment] = useState(false);
//   const [depositAmount, setDepositAmount] = useState<string>("");
//   const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
//   const [isPaymentMethodConfirmed, setIsPaymentMethodConfirmed] =
//     useState(false);
//   const [successModal, setSuccessModal] = useState(false);

//   const [orderSummary, setOrderSummary] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [cartItemsn, setCartItemsn] = useState<any>();

//   const tkn_: string = Cookies.get("token") as string;
//   const { triggerCartRefresh } = useAuthStore(state => ({
//     triggerCartRefresh: state.triggerCartRefresh,
//   }));

//   const fetchCartItems = async () => {
//     const tkn_: string = Cookies.get("token") as string;

//     if (!tkn_) {
//       toast.error("Please log in to continue.");
//       router.push("/signin");
//       return;
//     }

//     setLoading(true);

//     let sessionKey = Cookies.get("session_key");

//     if (!sessionKey) {
//       sessionKey = `session_${Math.random().toString(36).substr(2, 9)}`;
//       Cookies.set("session_key", sessionKey, { expires: 7 });
//     }

//     let headers: { [key: string]: string } = {
//       "Content-Type": "application/json",
//     };

//     if (tkn_) {
//       headers["Authorization"] = `token ${tkn_}`;
//     }

//     let config = {
//       method: "GET",
//       maxBodyLength: Infinity,
//       url: `https://staging.ajiroba.ng/v1/commerce/checkout/`,
//       headers: headers,
//     };

//     axios
//       .request(config)
//       .then((response) => {
//         /*   console.log(response.data, "response"); */
//         const { data } = response.data;

//       /*    console.log(data, 'data', data?.status) */

//         if (data?.status === 400) {
//           router.push("/my-order");
//         } else {
//           setCartItemsn(data);
//           setLoading(false);
//         }



//       })
//       .catch((error) => {
//        /*   console.log(error, 'error', error.status); */

//         if (error.status === 400) {
//           router.push("/my-order");
//         } else {
//           setError("Error loading cart items");
//           setLoading(false);
//         }


//       })
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const handlePaymentSelection = (method: SetStateAction<string>) => {
//     setPaymentMethod(method);
//   };

//   const confirmPaymentMethod = () => {
//     if (!paymentMethod) {
//       toast.error("Please select a payment method.");
//       return;
//     }

//     setIsPaymentMethodConfirmed(true);
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const showConfirmOrder = () => {
//     setConfirmOrder(true);
//   };

//   const showConfirmOrderCard = () => {
//     setcardpayment(true);
//   };

//   const handleConfirmOrder = () => {
//     setConfirmOrder(false);
//   };

//   const handlecloseOrder = () => {
//     setConfirmOrder(false);
//   };

//   const handleWalletPayment = () => {
//     // Check if pin is already verified
//     const verifiedPin = Cookies.get("nvd");
//     if (verifiedPin) {
//       // Pin is already verified, proceed directly to order placement
//       handleOrderbutton();
//     } else {
//       // Pin not verified, show modal for verification
//       showConfirmOrder();
//     }
//   };

//   const schema = yup.object().shape({
//     password: yup
//       .string()
//       .required("Passcode is required")
//       .min(6, "Can't be lesser than 6 digits"),
//   });

//   const {
//     reset,
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//     trigger,
//     watch,
//     setValue,
//   } = useForm({
//     mode: "all",
//     resolver: yupResolver(schema),
//   });

//   const handleSuccess = (data: any) => {
//     if (
//       data.status === 200 ||
//       data?.data?.status === 201 ||
//       data?.data?.status === 200 ||
//       data.status === 201
//     ) {
//       // Close the wallet pin modal
//       setConfirmOrder(false);
//       setSuccessModal(!successModal);
//       toast.success(`${data?.data?.message || "PIN verified successfully"} `, {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         onClose: () => {
//           if (
//             data?.data?.message &&
//             data.data.message.includes("Order placed successfully. Order Code")
//           ) {
//             // Clear cart count after successful order placement
//             triggerCartRefresh();
//             router.push("/my-order");
//           } else {
//             router.push("/paymentpage");
//           }
//         },
//       });
//       reset();
//     } else if (
//       data?.data?.status === 400 ||
//       data?.data?.status === 409 ||
//       data.status === 400 ||
//       data.status === 409
//     ) {
//       toast.error(`${data?.data?.message || "Password doesnt match"} `, {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       reset();
//     } else if (data.status === 401) {
//       toast.error(`${data?.data?.message || "Authentication error"} `, {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       reset();
//     } else if (data.status === 500) {
//       toast.error(`${data?.data?.message || "old_password"} `, {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       reset();
//     } else {
//       toast.error(`${"An Error Occured"}`, {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       reset();
//     }
//   };

//   const handleError = (error: any) => {
//     toast.error(`${"An Error Occured"}`, {
//       position: "top-right",
//       autoClose: 2000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//     reset();
//   };

//   // Separate handlers for pin verification and order placement
//   const handlePinVerificationSuccess = (data: any) => {
//     if (
//       data.status === 200 ||
//       data?.data?.status === 201 ||
//       data?.data?.status === 200 ||
//       data.status === 201
//     ) {
//       // Close the wallet pin modal
//       setConfirmOrder(false);
//       toast.success(`${data?.data?.message || "PIN verified successfully"} `, {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       reset();
      
//       // User needs to manually click "Confirm Order" again to place the order
//     } else if (
//       data?.data?.status === 400 ||
//       data?.data?.status === 409 ||
//       data.status === 400 ||
//       data.status === 409
//     ) {
//       toast.error(`${data?.data?.message || "Password doesnt match"} `, {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       reset();
//     } else if (data.status === 401) {
//       toast.error(`${data?.data?.message || "Authentication error"} `, {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       reset();
//     } else if (data.status === 500) {
//       toast.error(`${data?.data?.message || "old_password"} `, {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       reset();
//     } else {
//       toast.error(`${"An Error Occured"}`, {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       reset();
//     }
//   };

//   const handleOrderSuccess = (data: any) => {
//     if (
//       data.status === 200 ||
//       data?.data?.status === 201 ||
//       data?.data?.status === 200 ||
//       data.status === 201
//     ) {
//       // Clear the verified pin cookie after successful order
//       Cookies.remove("nvd");
      
//       setSuccessModal(!successModal);
//       toast.success(`${data?.data?.message || "Order placed successfully"} `, {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         onClose: () => {
//           if (
//             data?.data?.message &&
//             data.data.message.includes("Order placed successfully. Order Code")
//           ) {
//             // Clear cart count after successful order placement
//             triggerCartRefresh();
//             router.push("/my-order");
//           } else {
//             router.push("/paymentpage");
//           }
//         },
//       });
//     } else {
//       toast.error(`${data?.data?.message || "Order placement failed"}`, {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   };

//   const { isLoggedIn, user, token } = useAuthStore((state) => ({
//     isLoggedIn: state.isLoggedIn,
//     user: state.user,
//     token: state.token,
//   }));

//   // const userToken = token;

//   const userToken = (Cookies.get("token") as string) || "";

//   const {
//     data,
//     error: walleterror,
//     isError,
//     isSuccess,
//     mutate,
//     status,
//   } = useMutateData("verifywalletpin", handlePinVerificationSuccess, handleError);

//   const {
//     data: orderData,
//     error: orderError,
//     isError: isOrderError,
//     isSuccess: isOrderSuccess,
//     mutate: mutateOrder,
//     status: orderStatus,
//   } = useMutateData("orderpayment", handleOrderSuccess, handleError);

//   const submitForm = (data: any) => {
//     Cookies.set("nvd", data?.password, { expires: 1 });
//     const payload = {
//       wallet_pin: data?.password,
//     };

//     mutate({
//       url: "/api/verifywalletpin",
//       payload: { payload: payload, token: userToken },
//       token: userToken,
//     });
//   };

//   const handleOrderbutton = () => {
//     let pin = Cookies.get("nvd");
//     // console.log('yes....', pin)

//     const payload = {
//       wallet_pin: pin,
//       shipping_address: cartItemsn?.["Delivery Details"],
//       shipping_method: "standard",
//       payment_method: "Wallet",
//     };

//     mutateOrder({
//       url: "/api/orderpayment",
//       payload: { payload: payload, token: userToken },
//       token: userToken,
//     });
//   };

//   const [showModalUp, setShowModalUp] = useState(false);
//   const [paymentUrl, setPaymentUrl] = useState("");
//   const [paymentReference, setPaymentReference] = useState("");
  
 
//   const isProcessingRef = useRef(false);

 
//   const handlePaymentMessage = (event: MessageEvent) => {
//    /*  console.log(event.data, "event.data");
//     console.log(paymentReference, "paymentReference");
//     console.log(event.data?.data?.status, "event.data?.data?.status"); */
     
//     if (event.data?.data?.status === 'success' && paymentReference) {
     
//       console.log('');
//     }
//   };

 
//   useEffect(() => {
//     return () => {
     
//       setIsProcessingPayment(false);
//       isProcessingRef.current = false;
//     };
//   }, [setIsProcessingPayment]);

//   const handleContinue = async (amount: string) => {

//     if (isProcessingRef.current) {
//       return;
//     }
    
//     isProcessingRef.current = true;
    
//     try {
//       if (!amount) {
//         toast.error("Please enter a valid amount.");
//         return;
//       }

//       setIsProcessingPayment(true);
      
//       const tkn_: string = Cookies.get("token") as string;
//       const payload = {
//         shipping_address: cartItemsn?.["Delivery Details"],
//         shipping_method: "standard",
//         payment_method: "Electronic",
//         amount: Number(amount),
//       };

//       const response = await axios.post(
//    "https://staging.ajiroba.ng/v1/commerce/order/",
//         payload,
//         {
//           headers: {
//             Authorization: `token ${tkn_}`,
//           },
//         }
//       );
  
//       if (response.status === 200) {
//         const { payment_url, reference } = response.data;
        
//         localStorage.setItem("paymentReference", reference);
//         Cookies.set("paymentReference", reference, { expires: 1 });
//         setPaymentReference(reference);
        
        
//         setPaymentUrl(payment_url);
//         setShowModalUp(true);
        
//         setShowConfirmation(false);

//         toast.success(response.data.message || `Payment initiated successfully`, {
//           closeButton: false,
//         });
//       } else {
//         toast.error(response.data.message || "An unexpected status was returned.");
//       }
//     }
    
//     catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast.error(
//           error.response?.data?.message ||
//           "An error occurred during the payment process.",
//         );
//       } else {
//         toast.error("An unexpected error occurred.");
//       }
//     } finally {
//       setIsProcessingPayment(false);
//       isProcessingRef.current = false; 
//     }
//   };

//   const Modal = ({ url, onClose }: { url: string; onClose: () => void }) => {

    
//     useEffect(() => {
     
//       window.addEventListener('message', handlePaymentMessage);
//       return () => {
//         window.removeEventListener('message', handlePaymentMessage);
//       };
//     }, []);

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[100]">
//         <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-[90vh] relative shadow-2xl">
//           <button
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold z-10"
//             onClick={onClose}
//           >
//             ✕
//           </button>
//           <iframe 
//             src={url} 
//             className="w-full h-full border-0 rounded" 
//             title="Payment Gateway"
//             allow="payment"
//           />
//         </div>
//       </div>
//     );
//   };


//   const ConfirmationModal = ({ amount, onClose }: ConfirmationModalProps) => {
//     const [loadingverify, setloadingverify] = useState(false);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [showModalUp, setShowModalUp] = useState(false);
//     const [paymentUrl, setPaymentUrl] = useState("");
//     const [paymentReference, setPaymentReference] = useState("");
//     const [verificationInterval, setVerificationInterval] = useState<NodeJS.Timeout | null>(null);
  
//     // Cleanup function for event listeners and intervals
//     const cleanup = () => {
//       if (verificationInterval) {
//         clearInterval(verificationInterval);
//         setVerificationInterval(null);
//       }
//       window.removeEventListener('message', handlePaymentMessage);
//       setPaymentReference("");
//       setShowModalUp(false);
//       onClose();
//     };
  
//     const handlePaymentMessage = (event: MessageEvent) => {
//       if (event.data?.data?.status === 'success' && paymentReference) {
//         startVerificationLoop(paymentReference);
//       } 
//     };
  
//     const Modal = ({ url, onClose }: { url: string; onClose: () => void }) => {
//       useEffect(() => {
//         window.addEventListener('message', handlePaymentMessage);
//         return () => {
//           window.removeEventListener('message', handlePaymentMessage);
//         };
//       }, []);
  
//       return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
//           <div className="bg-white p-4 rounded-lg w-full max-w-3xl relative h-[90vh]">
//             <h1>Payment Page</h1>
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-[101]"
//               onClick={onClose}
//             >
//               ✕
//             </button>
//             <iframe
//               src={url}
//               className="w-full h-full border-0"
//               title="Payment"
//               allow="payment"
//             />
//           </div>
//         </div>
//       );
//     };
  
//     const handleContinue = async () => {
//       try {
//         if (!amount) {
//           toast.error("Please enter a valid amount.");
//           return;
//         }
  
//         setIsProcessing(true);
//         const tkn_: string = Cookies.get("token") as string;
//         const payload = {
//           shipping_address: cartItemsn?.["Delivery Details"],
//           shipping_method: "standard",
//           payment_method: "Electronic",
//           amount: Number(amount),
//         };
  
//         const response = await axios.post(
//           "https://staging.ajiroba.ng/v1/commerce/order/",
//           payload,
//           {
//             headers: {
//               Authorization: `token ${tkn_}`,
//             },
//           }
//         );
  
//         if (response.status === 200) {
//           const { payment_url, reference } = response.data;
//           localStorage.setItem("paymentReference", reference);
//           Cookies.set("paymentReference", reference, { expires: 1 });
//           setPaymentReference(reference);
  
//           setPaymentUrl(payment_url);
//           setShowModalUp(true);
  
//           toast.success(`Payment initiated successfully, please wait for the payment to be verified`, {
//             closeButton: false,
//           });
//         } else {
//           toast.error("An unexpected status was returned.");
//         }
//       } catch (error) {
//         toast.error("An error occurred during the payment process.");
//       } finally {
//         setIsProcessing(false);
//       }
//     };
  
//     // Fixed verification function that returns a promise with clear success/failure
//     const verifyWalletPayment = async (reference: string): Promise<{ success: boolean; shouldStop: boolean; message?: string }> => {
//       setloadingverify(true);

//       // console.log(reference, "reference");
      
//       try {
//         const tkn_: string = Cookies.get("token") as string;
//         const response = await axios.get(
//           `https://staging.ajiroba.ng/v1/commerce/verify_product_payment/${reference}/`,
//           {
//             headers: {
//               Authorization: `token ${tkn_}`,
//             },
//           }
//         );

//         // console.log(response, "response")
  
//         setloadingverify(false);
  
//         if (response.status === 200 || response.status === 201) {
//           const message = response?.data?.message;
//           toast.success(`${message}`, {
//             closeButton: true,
//             onClose: () => {
//                window.location.reload(); 
//             // console.log('yes....', message)
//             }
            
//           });
//           return { success: true, shouldStop: true, message };
//         } else {
//           // Unexpected successful status - should retry
//           return { success: false, shouldStop: false, message: "Unexpected status during verification." };
//         }
//       } catch (error) {
//         setloadingverify(false);
//         console.error("Verification error:", error);
  
//         // Check for critical errors that should stop the loop
//         if (axios.isAxiosError(error)) {
//           if (error.response?.status === 500) {
//             toast.error("Server error occurred. Please try again later.");
//             return { success: false, shouldStop: true, message: "Server error" };
//           }
          
//           if (error.response?.status === 404) {
//             toast.error("Payment reference not found.");
//             return { success: false, shouldStop: true, message: "Payment not found" };
//           }
  
//           if (error.response?.status === 401) {
//             toast.error("Authentication failed. Please login again.");
//             return { success: false, shouldStop: true, message: "Authentication failed" };
//           }
//         }
  
//         // For network errors and other retryable errors, continue the loop
//         return { success: false, shouldStop: false, message: "Verification failed, retrying..." };
//       }
//     };
  
//     // Fixed verification loop with proper error handling
//     const startVerificationLoop = (reference: string) => {
//       // Clear any existing interval
//       if (verificationInterval) {
//         clearInterval(verificationInterval);
//       }
  
//       const maxAttempts = 10; // Increased attempts
//       let attempts = 0;
//       const baseBackoffTime = 2000;
//       let isCompleted = false;
  
//       const performVerification = async () => {
//         if (isCompleted) return;
  
//         attempts++;
       
  
//         if (attempts > maxAttempts) {
//           isCompleted = true;
//           if (verificationInterval) {
//             clearInterval(verificationInterval);
//             setVerificationInterval(null);
//           }
//           cleanup();
//           toast.error("Payment verification timed out. Please check your account or contact support.");
//           return;
//         }
  
//         try {
//           const result = await verifyWalletPayment(reference);
//           /* console.log(result, "result"); */
          
//           if (result.success) {
//             // Payment verified successfully
//             isCompleted = true;
//             if (verificationInterval) {
//               clearInterval(verificationInterval);
//               setVerificationInterval(null);
//             }
//             cleanup();
//             return;
//           }
          
//           if (result.shouldStop) {
//             // Critical error occurred, stop trying
//             isCompleted = true;
//             if (verificationInterval) {
//               clearInterval(verificationInterval);
//               setVerificationInterval(null);
//             }
//             cleanup();
//             return;
//           }
          
//           // Continue trying for retryable errors
      
          
//         } catch (error) {
//           // This shouldn't happen since verifyWalletPayment handles all errors
//           console.error("Unexpected error in verification loop:", error);
//           isCompleted = true;
//           if (verificationInterval) {
//             clearInterval(verificationInterval);
//             setVerificationInterval(null);
//           }
//           cleanup();
//           toast.error("An unexpected error occurred during verification.");
//         }
//       };
  
//       // Start the verification loop with exponential backoff
//       let currentBackoffTime = baseBackoffTime;
      
//       const intervalId = setInterval(() => {
//         performVerification();
//         // Increase backoff time for next attempt (max 30 seconds)
//         currentBackoffTime = Math.min(currentBackoffTime * 1.5, 30000);
//       }, currentBackoffTime);
  
//       setVerificationInterval(intervalId);
  
//       // Also perform first verification immediately
//       performVerification();
//     };
  
//     return (
//       <>
//         {/* Main confirmation modal */}
//         {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md">
//             <h2 className="text-xl font-semibold mb-4">Confirm Payment</h2>
//             <p className="mb-6">
//               Are you sure you want to proceed with payment of {formatCurrency(amount)}?
//             </p>
            
//             <div className="flex gap-4 justify-end">
//               <button
//                 onClick={onClose}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
//                 disabled={isProcessing || loadingverify}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleContinue}
//                 disabled={isProcessing || loadingverify}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isProcessing ? "Processing..." : "Continue"}
//               </button>
//             </div>
            
//             {loadingverify && (
//               <div className="mt-4 text-center">
//                 <p className="text-sm text-gray-600">Verifying payment...</p>
//               </div>
//             )}
//           </div>
//         </div> */}

// <section className="fixed left-0 top-0 z-50 flex h-full w-screen items-center justify-center bg-[#000000d1] p-4">
//           <div className="xs:w-[15em] flex h-auto w-[20em] flex-col gap-6 rounded-md bg-white p-6 md:w-[25em] lg:w-[30em]">
//             <p className="text-center">
  
//               You are going to deposit the amount of {formatCurrency(amount)}
//             </p>
//             <div className="flex w-full gap-5 flex-col">
//               <DefaultButton
//                 text={isProcessing ? "Processing..." : "Continue "}
//                 type="button"
//                 className="w-full rounded-md bg-[#E84526] p-3 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E84526]/90 transition-colors duration-200"
//                 handleClick={handleContinue}
//                 disabled={isProcessing}
//               />
//               <DefaultButton
//                 text="Back"
//                 type="button"
//                 className="w-full rounded-md border-2 border-[#E84526] p-3 text-[#E84526] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E84526] hover:text-white transition-colors duration-200"
//                 handleClick={cleanup}
//                 disabled={isProcessing}
//               />
//             </div>
//           </div>
//         </section>
  
//         {/* Payment modal */}
//         {showModalUp && paymentUrl && (
//           <Modal url={paymentUrl} onClose={cleanup} />
//         )}
//       </>
//     );
//   };



  
//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <Suspense fallback={<>Loading...</>}>
//       <main>
//         <Header />

//         <div style={{ margin: "0 auto", width: "95%", maxWidth: "100%" }}>
//           <div onClick={() => router.back()}>
//             <div className="cursor-pointer container flex justify-start mt-4">
//               <p className="text-[#E84526] text-base">Back</p>
//             </div>
//           </div>

//           <Title title="Payment" />

//           <div className="product-image-gallery container py-8 grid 2xl:grid-cols-2 gap-y-6  lg:grid-cols-2 md:grid-cols-2 xl:grid-col-2 grid-cols-1">
//             <div>
//               <div className=" mb-4 bg-[#F6F6F6] shadow-lg border rounded border-[#D2D2D2] px-4 py-4">
//                 <div className="  px-4 py-2 my-4">
//                   <div className="flex justify-between flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-4">
//                     <div className="flex  items-start gap-4 ">
//                       <div>
//                         <IoIosCheckmarkCircle color="#E84526" size={28} />
//                       </div>

//                       <div>
//                         <div>
//                           <p className="text-[#111111] text-base  ">
//                             Delivery Details
//                           </p>
//                         </div>

//                         <div className="">
//                           <small className="  text-[#A09F9F]">
//                             {cartItemsn?.["Delivery Details"]}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className=" bg-[#F6F6F6] shadow-lg border rounded border-[#D2D2D2] px-4 py-4">
//                 <div className="  px-4 py-2 my-4">
//                   <div className="flex justify-between flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-4">
//                     <div className="flex  items-start gap-4 ">
//                       <div>
//                         <IoIosCheckmarkCircle color="#E84526" size={28} />
//                       </div>

//                       <div>
//                         <div>
//                           <p className="text-[#111111] text-base  ">
//                             Customer Address
//                           </p>
//                         </div>

//                         <div className="">
//                           <small className="  text-[#A09F9F]">
//                             {cartItemsn?.["Customer Address"]}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex justify-end mt-2">
//                     <button
//                       onClick={showModal}
//                       className=" flex justify-center cursor-pointer text-[#E84526] text-sm"
//                     >
//                       Change{" "}
//                       <MdKeyboardArrowRight color="#E84526" className="mt-1" />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className=" bg-[#F6F6F6] shadow-lg border rounded border-[#D2D2D2] px-4 py-4 mt-4">
//                 <div className="  px-4 py-2 my-4">
//                   <div className="flex justify-between flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-4">
//                     <div className="flex  items-start gap-4 ">
//                       <div>
//                         <IoIosCheckmarkCircle color="#E84526" size={28} />
//                       </div>

//                       <div>
//                         <div>
//                           <p className="text-[#111111] text-base mb-4  ">
//                             Payment Method
//                           </p>
//                         </div>

//                         <form action="">
//                           <div className="mb-4">
//                             <div>
//                               <input
//                                 type="radio"
//                                 id="wallet"
//                                 name="wallet"
//                                 value="wallet"
//                                 onChange={() =>
//                                   handlePaymentSelection("wallet")
//                                 }
//                                 className="accent-[#F25E26]"
//                               />
//                               <label className="ml-2" htmlFor="wallet">
//                                 Wallet
//                               </label>
//                             </div>

//                             <div className="ml-4">
//                               <small className="text-[#A09F9F] text-sm">
//                                 pay with the money in your wallet
//                               </small>
//                             </div>
//                           </div>

//                           <div>
//                             <div>
//                               <input
//                                 type="radio"
//                                 id="card"
//                                 name="wallet"
//                                 value="card"
//                                 onChange={() => handlePaymentSelection("card")}
//                                 className="accent-[#F25E26]"
//                               />
//                               <label className="ml-2" htmlFor="card">
//                                 Pay with Cards, USSD or bank transfer
//                               </label>
//                             </div>

//                             <div className="ml-4">
//                               <small className="text-[#A09F9F] text-sm">
//                                 pay with Cards, USSD or bank transfer
//                               </small>
//                             </div>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex justify-end mt-2">
//                     <button
//                       onClick={confirmPaymentMethod}
//                       disabled={!paymentMethod}
//                       className={`flex justify-center cursor-pointer text-[#E84526] text-sm ${paymentMethod ? "active" : "disabled"}`}
//                     >
//                       Confirm Payment Method
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className=" container justify-center flex xl:block md:block lg:block 2xl:block">
//               {paymentMethod === "wallet" ? (
//                 <div className="border rounded border-[#D2D2D2] px-4  py-4 shadow-lg">
//                   <h1 className="text-[#111111] text-xl">Order SUMMARY</h1>

//                   <div className="flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                       <p className="text-[#504D4D] font-Poppins text-base mt-4 font-semibold">
//                         Wallet Balance
//                       </p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#111111] text-lg mt-4 font-semibold ">
//                         {cartItemsn?.["Order Summary"]?.wallet_balance}
//                       </h1>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                       <p className="text-[#b4a3a3] text-base mt-4">
//                         Total Item
//                       </p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#111111] text-lg mt-4 ">
//                         {cartItemsn?.["Order Summary"]?.total_items}
//                       </h1>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                       <p className="text-[#b4a3a3] text-base mt-4">
//                         Delivery Fees
//                       </p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#111111] text-lg mt-4 ">
//                         {cartItemsn?.["Order Summary"]?.delivery_fee}
//                       </h1>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                       <p className="text-[#b4a3a3] text-base mt-4">
//                         Service Charge
//                       </p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#111111] text-lg mt-4 ">
//                         {cartItemsn?.["Order Summary"]?.service_charge}
//                       </h1>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                       <p className="text-[#b4a3a3] text-base mt-4">Total</p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#111111] text-lg mt-4 font-bold ">
//                         {formatCurrency(cartItemsn?.["Order Summary"]?.total)}
//                       </h1>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleWalletPayment}
//                     className={`w-full mt-4 px-12 py-2 text-sm font-Poppins font-normal rounded ${isPaymentMethodConfirmed
//                       ? "bg-[#E84526] text-[#FFFFFF] cursor-pointer"
//                       : "bg-[#D2D2D2] text-[#F6F6F6] cursor-not-allowed"
//                       }`}
//                     disabled={!isPaymentMethodConfirmed}
//                   >
//                     {orderStatus === "pending" ? "Processing..." : "Confirm Order"}
//                   </button>
//                 </div>
//               ) : paymentMethod === "card" ? (
//                 <div className="border rounded border-[#D2D2D2] px-4  py-4 shadow-lg">
//                   <h1 className="text-[#111111] text-xl">Order SUMMARY</h1>

//                   <div className="flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                       <p className="text-[#b4a3a3] text-base mt-4">
//                         Total Item
//                       </p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#111111] text-lg mt-4 ">
//                         {cartItemsn?.["Order Summary"]?.total_items}
//                       </h1>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                       <p className="text-[#b4a3a3] text-base mt-4">
//                         Delivery Fees
//                       </p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#111111] text-lg mt-4 ">
//                         {cartItemsn?.["Order Summary"]?.delivery_fee}
//                       </h1>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                       <p className="text-[#b4a3a3] text-base mt-4">
//                         Service Charge
//                       </p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#111111] text-lg mt-4 ">
//                         {cartItemsn?.["Order Summary"]?.service_charge}
//                       </h1>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                       <p className="text-[#b4a3a3] text-base mt-4">Total</p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#111111] text-lg mt-4 font-bold ">
//                         {formatCurrency(cartItemsn?.["Order Summary"]?.total)}
//                       </h1>
//                     </div>
//                   </div>

//                   <button
//                     onClick={showConfirmOrderCard}
//                     className={`w-full mt-4 px-12 py-2 text-sm font-Poppins font-normal rounded ${isPaymentMethodConfirmed
//                       ? "bg-[#E84526] text-[#FFFFFF] cursor-pointer"
//                       : "bg-[#D2D2D2] text-[#F6F6F6] cursor-not-allowed"
//                       }`}
//                     disabled={!isPaymentMethodConfirmed}
//                   >
//                     Confirm Order
//                   </button>
//                 </div>
//               ) : (
//                 <div className="border rounded border-[#D2D2D2] px-4  py-4 shadow-lg">
//                   <h1 className="text-[#111111] text-xl">Order SUMMARY</h1>

//                   <div className="flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                       <p className="text-[#504D4D] font-Poppins text-base mt-4 font-semibold">
//                         Wallet Balance
//                       </p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#111111] text-lg mt-4 font-semibold ">
//                         {cartItemsn?.["Order Summary"]?.wallet_balance}
//                       </h1>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                       <p className="text-[#b4a3a3] text-base mt-4">
//                         Total Item
//                       </p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#111111] text-lg mt-4 ">
//                         {cartItemsn?.["Order Summary"]?.total_items}
//                       </h1>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                       <p className="text-[#b4a3a3] text-base mt-4">
//                         Delivery Fees
//                       </p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#111111] text-lg mt-4 ">
//                         {cartItemsn?.["Order Summary"]?.delivery_fee}
//                       </h1>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                       <p className="text-[#b4a3a3] text-base mt-4">
//                         Service Charge
//                       </p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#111111] text-lg mt-4 ">
//                         {cartItemsn?.["Order Summary"]?.service_charge}
//                       </h1>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                       <p className="text-[#b4a3a3] text-base mt-4">Total</p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#111111] text-lg mt-4 font-bold ">
//                         {formatCurrency(cartItemsn?.["Order Summary"]?.total)}
//                       </h1>
//                     </div>
//                   </div>

//                   <button
//                     className={`w-full mt-4 px-12 py-2 text-sm font-Poppins font-normal rounded ${isPaymentMethodConfirmed
//                       ? "bg-[#E84526] text-[#FFFFFF] cursor-pointer"
//                       : "bg-[#D2D2D2] text-[#F6F6F6] cursor-not-allowed"
//                       }`}
//                     disabled={!isPaymentMethodConfirmed}
//                   >
//                     Confirm Order
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <Footer />

//         <ModalComponent
//           content={
//             <div className="flex flex-col justify-center">
//               <div>
//                 <input
//                   className="border px-2 py-2 rounded border-[#D2D2D2] text-#B7B7B7"
//                   type="text"
//                   name="location"
//                   placeholder="Enter your new address"
//                 />
//               </div>

//               <div className="flex mt-4 gap-4">
//                 <div>
//                   <IoLocationOutline color="#F25E26" size={24} />
//                 </div>

//                 <div>
//                   <button className="text-[#2A2A2A]">Use my location</button>
//                 </div>
//               </div>

//               <div className="flex mt-4 gap-4">
//                 <div>
//                   <IoLocationOutline color="#F25E26" size={24} />
//                 </div>

//                 <div>
//                   <p className="text-[#2A2A2A]">
//                     32, Ajiroba street,Arepo,lagos
//                   </p>
//                 </div>
//               </div>

//               <div className="flex mt-4 gap-4">
//                 <div>
//                   <IoLocationOutline color="#F25E26" size={24} />
//                 </div>

//                 <div>
//                   <p className="text-[#2A2A2A]">45, jasper james, lekki</p>
//                 </div>
//               </div>

//               <div className="flex gap-4 justify-center mt-4">
//                 <div>
//                   <button className="rounded px-4 py-2 bg-[white] border border-[#E84526] text-[#E84526]">
//                     Cancel
//                   </button>
//                 </div>

//                 <div>
//                   <button className="rounded px-4 py-2 bg-[#E84526] border border-[#E84526] text-[#FFFFFF]">
//                     Change
//                   </button>
//                 </div>
//               </div>
//             </div>
//           }
//           isModalOpen={isModalOpen}
//           showModal={showModal}
//           handleOk={handleOk}
//           handleCancel={handleCancel}
//         />

//         {cardpayment && (
//           <DepositeCard
//             handleClick={() => setcardpayment(false)}
//             handleNext={(amount: SetStateAction<string>) => {
//               setcardpayment(false);
//               setDepositAmount(amount);
//               setShowConfirmation(true);
//             }}
//             requiredAmount={cartItemsn?.["Order Summary"]?.total}
//             handleCancel={function (): void {
//               throw new Error("Function not implemented.");
//             }}
//           />
//         )}

//         {showConfirmation && (
//           <ConfirmationModal
//             amount={depositAmount}
//             onClose={() => {
//               setShowConfirmation(false);
//             }}
//             cartItemsn={cartItemsn}
//             isProcessingPayment={isProcessingPayment}
//           />
//         )}

//         <ModalComponent
//           content={
//             <div className="flex flex-col justify-center">
//               <div className="flex justify-center items-center flex-col">
//                 <p className="text-[#2A2A2A] font-bold text-xl font-Poppins">
//                   Wallet Pin
//                 </p>
//                 <small className="text-[#504D4D] text-lg font-Poppins">
//                   Kindly enter your wallet pin
//                 </small>
//               </div>

//               <form
//                 action=""
//                 className="flex justify-center items-center flex-col mt-8 mb-4"
//                 onSubmit={handleSubmit(submitForm)}
//               >
//                 <div className="flex flex-col">
//                   <Input
//                     label="Enter Pin"
//                     type="password"
//                     name="password"
//                     placeholder="****"
//                     register={register}
//                     errors={errors.password}
//                     HiEyeSlash={<FaRegEyeSlash />}
//                     HiEye={<FaRegEye />}
//                   />
//                   <div className="text-xs text-red-700">
//                     {errors?.password?.message}
//                   </div>

//                   <button
//                     className={`w-full mt-8 px-12 py-2 text-sm font-bold rounded bg-[#FCDFD4] text-[#2A2A2A] '
//                                     }`}
//                   >
//                     {status === "pending" ? "..." : "Pay"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           }
//           isModalOpen={confirmordermodal}
//           showModal={showConfirmOrder}
//           handleOk={handleConfirmOrder}
//           handleCancel={handlecloseOrder}
//         />

//         {showModalUp && (
//           <Modal
//             url={paymentUrl}
//             onClose={() => setShowModalUp(false)}
//           />
//         )}
//       </main>
//     </Suspense>
//   );
// };

// export default Page;



"use client";
import { usePathname, useRouter } from "next/navigation";
import { SetStateAction, useEffect, useMemo, useState, useRef } from "react";

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
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/store";
import { useMutateData } from "@/hooks/useMutateNewData";
import Loading from "../component/Loading";
import { Deposite } from "../profile/components/Deposite";
import { DefaultButton, CustomizeButton } from "../component/Button";
import { DepositeCard } from "../profile/components/DepositeCard";
import { formatCurrency } from "@/utils/formatCurrency";

type ConfirmationModalProps = {
  amount: string;
  onClose: () => void;
  cartItemsn: any;
  isProcessingPayment: boolean;
};

const Page = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmordermodal, setConfirmOrder] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [cardpayment, setcardpayment] = useState(false);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [isPaymentMethodConfirmed, setIsPaymentMethodConfirmed] =
    useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [orderSummary, setOrderSummary] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartItemsn, setCartItemsn] = useState<any>();

  const tkn_: string = Cookies.get("token") as string;
  const { triggerCartRefresh } = useAuthStore(state => ({
    triggerCartRefresh: state.triggerCartRefresh,
  }));

  const fetchCartItems = async () => {
    const tkn_: string = Cookies.get("token") as string;

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

    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (tkn_) {
      headers["Authorization"] = `token ${tkn_}`;
    }

    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `https://staging.ajiroba.ng/v1/commerce/checkout/`,
      headers: headers,
    };

    axios
      .request(config)
      .then((response) => {
        /*   console.log(response.data, "response"); */
        const { data } = response.data;

      /*    console.log(data, 'data', data?.status) */

        if (data?.status === 400) {
          router.push("/my-order");
        } else {
          setCartItemsn(data);
          setLoading(false);
        }



      })
      .catch((error) => {
       /*   console.log(error, 'error', error.status); */

        if (error.status === 400) {
          router.push("/my-order");
        } else {
          setError("Error loading cart items");
          setLoading(false);
        }


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

  const showConfirmOrderCard = () => {
    setcardpayment(true);
  };

  const handleConfirmOrder = () => {
    setConfirmOrder(false);
  };

  const handlecloseOrder = () => {
    setConfirmOrder(false);
  };

  const handleWalletPayment = () => {
    // Check if pin is already verified
    const verifiedPin = Cookies.get("nvd");
    if (verifiedPin) {
      // Pin is already verified, proceed directly to order placement
      handleOrderbutton();
    } else {
      // Pin not verified, show modal for verification
      showConfirmOrder();
    }
  };

  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Passcode is required")
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
          if (
            data?.data?.message &&
            data.data.message.includes("Order placed successfully. Order Code")
          ) {
            // Clear cart count after successful order placement
            triggerCartRefresh();
            router.push("/my-order");
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

  // Separate handlers for pin verification and order placement
  const handlePinVerificationSuccess = (data: any) => {
    if (
      data.status === 200 ||
      data?.data?.status === 201 ||
      data?.data?.status === 200 ||
      data.status === 201
    ) {
      // Close the wallet pin modal
      setConfirmOrder(false);
      toast.success(`${data?.data?.message || "PIN verified successfully"} `, {
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
      
      // User needs to manually click "Confirm Order" again to place the order
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

  const handleOrderSuccess = (data: any) => {
    if (
      data.status === 200 ||
      data?.data?.status === 201 ||
      data?.data?.status === 200 ||
      data.status === 201
    ) {
      // Clear the verified pin cookie after successful order
      Cookies.remove("nvd");
      
      setSuccessModal(!successModal);
      toast.success(`${data?.data?.message || "Order placed successfully"} `, {
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
            // Clear cart count after successful order placement
            triggerCartRefresh();
            router.push("/my-order");
          } else {
            router.push("/paymentpage");
          }
        },
      });
    } else {
      toast.error(`${data?.data?.message || "Order placement failed"}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

  // const userToken = token;

  const userToken = (Cookies.get("token") as string) || "";

  const {
    data,
    error: walleterror,
    isError,
    isSuccess,
    mutate,
    status,
  } = useMutateData("verifywalletpin", handlePinVerificationSuccess, handleError);

  const {
    data: orderData,
    error: orderError,
    isError: isOrderError,
    isSuccess: isOrderSuccess,
    mutate: mutateOrder,
    status: orderStatus,
  } = useMutateData("orderpayment", handleOrderSuccess, handleError);

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

  const handleOrderbutton = () => {
    let pin = Cookies.get("nvd");
    // console.log('yes....', pin)

    const payload = {
      wallet_pin: pin,
      shipping_address: cartItemsn?.["Delivery Details"],
      shipping_method: "standard",
      payment_method: "Wallet",
    };

    mutateOrder({
      url: "/api/orderpayment",
      payload: { payload: payload, token: userToken },
      token: userToken,
    });
  };

  const [showModalUp, setShowModalUp] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  
 
  const isProcessingRef = useRef(false);

 
  const handlePaymentMessage = (event: MessageEvent) => {
   /*  console.log(event.data, "event.data");
    console.log(paymentReference, "paymentReference");
    console.log(event.data?.data?.status, "event.data?.data?.status"); */
     
    if (event.data?.data?.status === 'success' && paymentReference) {
     
      console.log('');
    }
  };

 
  useEffect(() => {
    return () => {
     
      setIsProcessingPayment(false);
      isProcessingRef.current = false;
    };
  }, [setIsProcessingPayment]);

  const handleContinue = async (amount: string) => {

    if (isProcessingRef.current) {
      return;
    }
    
    isProcessingRef.current = true;
    
    try {
      if (!amount) {
        toast.error("Please enter a valid amount.");
        return;
      }

      setIsProcessingPayment(true);
      
      const tkn_: string = Cookies.get("token") as string;
      const payload = {
        shipping_address: cartItemsn?.["Delivery Details"],
        shipping_method: "standard",
        payment_method: "Electronic",
        amount: Number(amount),
      };

      const response = await axios.post(
   "https://staging.ajiroba.ng/v1/commerce/order/",
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
        
        
        setPaymentUrl(payment_url);
        setShowModalUp(true);
        
        setShowConfirmation(false);

        toast.success(response.data.message || `Payment initiated successfully`, {
          closeButton: false,
        });
      } else {
        toast.error(response.data.message || "An unexpected status was returned.");
      }
    }
    
    catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
          "An error occurred during the payment process.",
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsProcessingPayment(false);
      isProcessingRef.current = false; 
    }
  };

  const Modal = ({ url, onClose }: { url: string; onClose: () => void }) => {

    
    useEffect(() => {
     
      window.addEventListener('message', handlePaymentMessage);
      return () => {
        window.removeEventListener('message', handlePaymentMessage);
      };
    }, []);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[100]">
        <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-[90vh] relative shadow-2xl">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold z-10"
            onClick={onClose}
          >
            ✕
          </button>
          <iframe 
            src={url} 
            className="w-full h-full border-0 rounded" 
            title="Payment Gateway"
            allow="payment"
          />
        </div>
      </div>
    );
  };


  const ConfirmationModal = ({ amount, onClose }: ConfirmationModalProps) => {
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
      if (event.data?.data?.status === 'success' && paymentReference) {
        startVerificationLoop(paymentReference);
      } 
    };
  
    const Modal = ({ url, onClose }: { url: string; onClose: () => void }) => {
      useEffect(() => {
        window.addEventListener('message', handlePaymentMessage);
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
        const payload = {
          shipping_address: cartItemsn?.["Delivery Details"],
          shipping_method: "standard",
          payment_method: "Electronic",
          amount: Number(amount),
        };
  
        const response = await axios.post(
          "https://staging.ajiroba.ng/v1/commerce/order/",
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
  
          setPaymentUrl(payment_url);
          setShowModalUp(true);
  
          toast.success(`Payment initiated successfully, please wait for the payment to be verified`, {
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
  
    // Fixed verification function that returns a promise with clear success/failure
    const verifyWalletPayment = async (reference: string): Promise<{ success: boolean; shouldStop: boolean; message?: string }> => {
      setloadingverify(true);

      // console.log(reference, "reference");
      
      try {
        const tkn_: string = Cookies.get("token") as string;
        const response = await axios.get(
          `https://staging.ajiroba.ng/v1/commerce/verify_product_payment/${reference}/`,
          {
            headers: {
              Authorization: `token ${tkn_}`,
            },
          }
        );

        // console.log(response, "response")
  
        setloadingverify(false);
  
        if (response.status === 200 || response.status === 201) {
          const message = response?.data?.message;
          toast.success(`${message}`, {
            closeButton: true,
            onClose: () => {
               window.location.reload(); 
            // console.log('yes....', message)
            }
            
          });
          return { success: true, shouldStop: true, message };
        } else {
          // Unexpected successful status - should retry
          return { success: false, shouldStop: false, message: "Unexpected status during verification." };
        }
      } catch (error) {
        setloadingverify(false);
        console.error("Verification error:", error);
  
        // Check for critical errors that should stop the loop
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 500) {
            toast.error("Server error occurred. Please try again later.");
            return { success: false, shouldStop: true, message: "Server error" };
          }
          
          if (error.response?.status === 404) {
            toast.error("Payment reference not found.");
            return { success: false, shouldStop: true, message: "Payment not found" };
          }
  
          if (error.response?.status === 401) {
            toast.error("Authentication failed. Please login again.");
            return { success: false, shouldStop: true, message: "Authentication failed" };
          }
        }
  
        // For network errors and other retryable errors, continue the loop
        return { success: false, shouldStop: false, message: "Verification failed, retrying..." };
      }
    };
  
    // Fixed verification loop with proper error handling
    const startVerificationLoop = (reference: string) => {
      // Clear any existing interval
      if (verificationInterval) {
        clearInterval(verificationInterval);
      }
  
      const maxAttempts = 10; // Increased attempts
      let attempts = 0;
      const baseBackoffTime = 2000;
      let isCompleted = false;
  
      const performVerification = async () => {
        if (isCompleted) return;
  
        attempts++;
       
  
        if (attempts > maxAttempts) {
          isCompleted = true;
          if (verificationInterval) {
            clearInterval(verificationInterval);
            setVerificationInterval(null);
          }
          cleanup();
          toast.error("Payment verification timed out. Please check your account or contact support.");
          return;
        }
  
        try {
          const result = await verifyWalletPayment(reference);
          /* console.log(result, "result"); */
          
          if (result.success) {
            // Payment verified successfully
            isCompleted = true;
            if (verificationInterval) {
              clearInterval(verificationInterval);
              setVerificationInterval(null);
            }
            cleanup();
            return;
          }
          
          if (result.shouldStop) {
            // Critical error occurred, stop trying
            isCompleted = true;
            if (verificationInterval) {
              clearInterval(verificationInterval);
              setVerificationInterval(null);
            }
            cleanup();
            return;
          }
          
          // Continue trying for retryable errors
      
          
        } catch (error) {
          // This shouldn't happen since verifyWalletPayment handles all errors
          console.error("Unexpected error in verification loop:", error);
          isCompleted = true;
          if (verificationInterval) {
            clearInterval(verificationInterval);
            setVerificationInterval(null);
          }
          cleanup();
          toast.error("An unexpected error occurred during verification.");
        }
      };
  
      // Start the verification loop with exponential backoff
      let currentBackoffTime = baseBackoffTime;
      
      const intervalId = setInterval(() => {
        performVerification();
        // Increase backoff time for next attempt (max 30 seconds)
        currentBackoffTime = Math.min(currentBackoffTime * 1.5, 30000);
      }, currentBackoffTime);
  
      setVerificationInterval(intervalId);
  
      // Also perform first verification immediately
      performVerification();
    };
  
    return (
      <>
        {/* Main confirmation modal */}
        {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Payment</h2>
            <p className="mb-6">
              Are you sure you want to proceed with payment of {formatCurrency(amount)}?
            </p>
            
            <div className="flex gap-4 justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                disabled={isProcessing || loadingverify}
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                disabled={isProcessing || loadingverify}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Continue"}
              </button>
            </div>
            
            {loadingverify && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Verifying payment...</p>
              </div>
            )}
          </div>
        </div> */}

<section className="fixed left-0 top-0 z-50 flex h-full w-screen items-center justify-center bg-[#000000d1] p-4">
          <div className="xs:w-[15em] flex h-auto w-[20em] flex-col gap-6 rounded-md bg-white p-6 md:w-[25em] lg:w-[30em]">
            <p className="text-center">
  
              You are going to deposit the amount of {formatCurrency(amount)}
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
  
        {/* Payment modal */}
        {showModalUp && paymentUrl && (
          <Modal url={paymentUrl} onClose={cleanup} />
        )}
      </>
    );
  };



  
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
                                className="accent-[#F25E26]"
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
                                className="accent-[#F25E26]"
                              />
                              <label className="ml-2" htmlFor="card">
                                Pay with Cards, USSD or bank transfer
                              </label>
                            </div>

                            <div className="ml-4">
                              <small className="text-[#A09F9F] text-sm">
                                pay with Cards, USSD or bank transfer
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
                        {formatCurrency(cartItemsn?.["Order Summary"]?.total)}
                      </h1>
                    </div>
                  </div>

                  <button
                    onClick={handleWalletPayment}
                    className={`w-full mt-4 px-12 py-2 text-sm font-Poppins font-normal rounded ${isPaymentMethodConfirmed
                      ? "bg-[#E84526] text-[#FFFFFF] cursor-pointer"
                      : "bg-[#D2D2D2] text-[#F6F6F6] cursor-not-allowed"
                      }`}
                    disabled={!isPaymentMethodConfirmed}
                  >
                    {orderStatus === "pending" ? "Processing..." : "Confirm Order"}
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
                        {formatCurrency(cartItemsn?.["Order Summary"]?.total)}
                      </h1>
                    </div>
                  </div>

                  <button
                    onClick={showConfirmOrderCard}
                    className={`w-full mt-4 px-12 py-2 text-sm font-Poppins font-normal rounded ${isPaymentMethodConfirmed
                      ? "bg-[#E84526] text-[#FFFFFF] cursor-pointer"
                      : "bg-[#D2D2D2] text-[#F6F6F6] cursor-not-allowed"
                      }`}
                    disabled={!isPaymentMethodConfirmed}
                  >
                    Confirm Order
                  </button>
                </div>
              ) : (
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
                        {formatCurrency(cartItemsn?.["Order Summary"]?.total)}
                      </h1>
                    </div>
                  </div>

                  <button
                    className={`w-full mt-4 px-12 py-2 text-sm font-Poppins font-normal rounded ${isPaymentMethodConfirmed
                      ? "bg-[#E84526] text-[#FFFFFF] cursor-pointer"
                      : "bg-[#D2D2D2] text-[#F6F6F6] cursor-not-allowed"
                      }`}
                    disabled={!isPaymentMethodConfirmed}
                  >
                    Confirm Order
                  </button>
                </div>
              )}
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
                    32, Ajiroba street,Arepo,lagos
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

        {cardpayment && (
          <DepositeCard
            handleClick={() => setcardpayment(false)}
            handleNext={(amount: SetStateAction<string>) => {
              setcardpayment(false);
              setDepositAmount(amount);
              setShowConfirmation(true);
            }}
            requiredAmount={cartItemsn?.["Order Summary"]?.total}
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
            cartItemsn={cartItemsn}
            isProcessingPayment={isProcessingPayment}
          />
        )}

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

        {showModalUp && (
          <Modal
            url={paymentUrl}
            onClose={() => setShowModalUp(false)}
          />
        )}
      </main>
    </Suspense>
  );
};

export default Page;
