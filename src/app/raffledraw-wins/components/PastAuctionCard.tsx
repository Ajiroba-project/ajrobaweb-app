"use  client";
import React, { SetStateAction, useState, useEffect } from "react";
import Image from "next/image";
import { CiMenuKebab } from "react-icons/ci";
import Dropdown from "./Dropdown";


import DropDownAuction from "./DropDownAuction";
import { ModalProfile } from "./ModalProfile";
import { DefaultButton } from "@/app/component/Button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useMutateData } from "@/hooks/useMutateNewData";
import { useGetOrderWinsData, useGetBanksData, useGetDatanew } from "@/hooks/useGetData";
import Cookies from "js-cookie";
// import { CustomModal } from "@/app/component/Modal";
// import maskgroup from "@/app/asset/image/Maskgroup.svg";
// import Barcode from "@/app/asset/image/barcode.svg";
// import Link from "next/link";
// import Brand from "@/app/asset/logo.svg";
// import bikecode from '@/app/asset/image/bikecode.svg'
// import DropDownAuctionWin from "./DropDownAuctionWin";
// import WinningAdviceModal from "./WinningAdviceModal";
// import TestWin from "./TestWin";
// import DropDownAuctionClosed from "./DropDownAuctionClosed";
import { formatCurrency } from "@/utils/formatCurrency";
import { escapeHtml } from "@/utils/escapeHtml";
import deliveryicon from '@/app/asset/deliveryicon.svg';
import { formatDate } from "date-fns";

type AuctionProps = {
  product: any[];
};

type Product = {
  name: string;
};

type Order = {
  order_id: string;
  products: Product[];
  total_price: string;
  order_date: string;
  delivery_status: string;
  id?: string;
  auction?: {
    auction_id: string;
    name: string;
    draw_date: string;
    images: string[];
    estimated_value?: string
  }[];
  ticket_number?: string;
  ticket_price?: string;
  start_date?: string;
  start_time?: string;
  estimated_value?: string;
  redeemed?: boolean;
  won?: boolean;
  cost_price?: string
};

type ButtonProps = {
  text: string;
  className: string;
  type: "button" | "submit";
  handleClick?: () => void | Promise<void>;
  disabled?: boolean;
};

type Bank = {
  name: string;
  code: string;
};

type BanksResponse = {
  status: string;
  message: string;
  data: Bank[];
};





export const PastAuctionCard = ({ product }: AuctionProps) => {
    // console.log(product, 'product')
  
    const [selectedTransaction, setSelectedTransaction] = useState<Order | null>(
      null,
    );
    const [selectedTransactiondelete, setSelectedTransactiondelete] =
      useState<Order | null>(null);
  
    const [success, setSuccess] = useState(false);
    const [successdelete, setSuccessdelete] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewerror, Setreviewerror] = useState("");
    const [reviewerrordelete, Setreviewerrordelete] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isdeleteModalOpen, setisdeleteModalOpen] = useState(false);
    const [isSussessModal, setisSucceessModal] = useState(false);
    const [isWinningAdviseModalOpen, setIsWinningAdviseModalOpen] = useState(false);
    const [isWinningAdvice, setIsWinningAdvice] = useState(false);
  
  
    const [isMerchantsModalOpen, setIsMerchantsModalOpen] = useState(false);
    const [selectedRedemption, setSelectedRedemption] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [merchants, setMerchants] = useState([]);
    const [isLoadingMerchants, setIsLoadingMerchants] = useState(false);
    const [voucherData, setVoucherData] = useState<any>(null);
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
    const [isProcessingGiftCard, setIsProcessingGiftCard] = useState(false);
    const [isBankTransferModalOpen, setIsBankTransferModalOpen] = useState(false);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [selectedBank, setSelectedBank] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    const [isLoadingBanks, setIsLoadingBanks] = useState(false);
    const [isValidatingAccount, setIsValidatingAccount] = useState(false);
    const [isProcessingCashout, setIsProcessingCashout] = useState(false);
    const [storedVoucherData, setStoredVoucherData] = useState<Record<string, any>>({});
    const [isDeliveryNoticeModalOpen, setIsDeliveryNoticeModalOpen] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isChangeAddressModalOpen, setIsChangeAddressModalOpen] = useState(false);
    const [newAddress, setNewAddress] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newState, setNewState] = useState("");
    const [newLandmark, setNewLandmark] = useState("");
    const [isDeliverySuccessModalOpen, setIsDeliverySuccessModalOpen] = useState(false);
    const [deliverySuccessData, setDeliverySuccessData] = useState<any>(null);
    const [isProcessingDelivery, setIsProcessingDelivery] = useState(false);
  
    const router = useRouter();
  
  
  
  
  
  
    const handleCloseModaldelete = () => {
      setisdeleteModalOpen(false);
    };
  
    const handleOptionClick = (option: string, transaction: Order) => {
      // console.log(`${option} clicked for transaction:`, transaction);
      //  console.log(transaction, 'transactionnnnn')
  
      // console.log(option, 'option')
  
  
      if (option === "Review") {
        setSelectedTransaction(transaction);
        setModalOpen(true);
      }
  
      if (option === "Delete") {
        setSelectedTransactiondelete(transaction);
        // console.log(transaction, "Transaction to delete"); // Check if this logs correctly
        setisdeleteModalOpen(true);
      }
  
      if (option === "Redeem") {
        setSelectedTransaction(transaction);
        setIsWinningAdviseModalOpen(true);
      }
  
      if (option === "Download") {
        // Use the stored voucher data for this transaction
        const transactionId = transaction.id;
        const storedVoucherData = localStorage.getItem("voucherData");
        /*  console.log(storedVoucherData, "storedVoucherData") */
        if (transactionId) {
          setVoucherData(JSON.parse(storedVoucherData || '{}'));
          /*  setIsVoucherModalOpen(true); */
        } else {
          toast.error("Voucher data not found");
        }
      }
  
  
      if (option === "winning advise") {
        console.log(transaction, "transaction")
        setSelectedTransaction(transaction);
        setIsWinningAdvice(true);
      }
    };
  
    const {
      reset,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      mode: "all",
      /*  resolver: yupResolver(ChangePass), */
    });
  
    const {
      reset: resetDeleteForm,
      register: registerDeleteForm,
      handleSubmit: handleSubmitDelete,
      formState: { errors: deleteErrors },
    } = useForm({
      mode: "all",
      // resolver: yupResolver(/* your delete form schema */),
    });
  
    const { isLoggedIn, token } = useAuthStore((state) => ({
      isLoggedIn: state.isLoggedIn,
      token: state.token,
    }));
  
    const cookieToken = Cookies.get("token");
    const userToken = (token ?? cookieToken) ?? "";
    const isAuthenticated = Boolean(userToken) && Boolean(isLoggedIn);

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
      setHasMounted(true);
    }, []);

    useEffect(() => {
      if (hasMounted && !isAuthenticated) {
        router.replace("/signin");
      }
    }, [hasMounted, isAuthenticated, router]);
  
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/view_profile/`;
  
    const { data: userInfo, isLoading: userLoading } = useGetDatanew(url, 'get_user_details', userToken || " ");
  
    /* console.log(userInfo, "userInfo") */
  
    const handleSuccess = (data: any) => {
      Setreviewerror("");
      reset();
  
      if (data.status === 201 || data.status === 200 || data.status === 204) {
  
        setSuccess(true);
        toast.success(`${data?.data?.message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => router.push("/profile"),
        });
        reset();
      } else if (data.status === 400 || data.status === 409) {
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
      } else if (data.status === 404) {
        toast.error(`${data?.data?.message || "Order not found"} `, {
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
        toast.error(`${data?.data?.message} `, {
          /*    toast.error(`${"An Error Occured" || "Error"}`, { */
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
      // console.log(data, "datttataaa", error);
      // console.log(error, "errrr");
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
  
    const { data, error, isError, isSuccess, mutate, status } = useMutateData(
      "review order",
      handleSuccess,
      handleError,
    );
  
    const {
      data: datad,
      error: errord,
      isError: isErrord,
      isSuccess: isSussessd,
      mutate: mutated,
      status: statusd,
    } = useMutateData("delete order", handleSuccess, handleError);
  
    const submitFormdelete = async (data: any, event: any) => {
      event.preventDefault();
  
      console.log(errors);
  
  
      //  console.log(selectedTransactiondelete, "Payload being submitted - BEFORE");
  
      if (!selectedTransactiondelete) {
        console.error("No transaction selected for deletion");
        return; // Exit the function if selectedTransactiondelete is null
      }
  
      const payload = {
        order_Id: selectedTransactiondelete.order_id,
      };
  
      mutated({
        url: "/api/deleteorder",
        payload: { payload: payload, token: userToken },
        token: userToken,
      });
    };
  
    const Closefuncdelete = () => {
      setisdeleteModalOpen(false);
      setSuccessdelete(false);
      // setSelectedRating(0);
      reset();
      Setreviewerrordelete("");
    };
  
    const {
      data: auctioninfo,
      isLoading: auctionLoading,
      error: ordererror,
    } = useGetOrderWinsData(
      "/api/auctionwins",
      "get_auctionwins_details",
      userToken,
    );
  
    const openProducts = Array.isArray(auctioninfo?.data?.data?.closed)
      ? Array.from(
        auctioninfo.data.data.closed.reduce((map: Map<string, any>, item: any) => {
          const auctionName = item?.auction?.[0]?.name ?? item?.id;
          const key = typeof auctionName === "string" ? auctionName : String(auctionName);

          if (!map.has(key)) {
            map.set(key, { ...item, tag: ["closed", "redeem items", "winning advise"] });
          }

          return map;
        }, new Map<string, any>()).values(),
      )
      : [];

    // const openProducts = Array.isArray(auctioninfo?.data?.data?.closed) ? Array.from(
    //   auctioninfo?.data?.data?.closed
    //     .reduce((map: Map<any, any>, item: { id: any }) => {
    //       if (!map.has(item.id)) {
    //         map.set(item.id, { ...item, tag: ["closed", 'redeem items', 'winning advise'] });
    //       }
    //       return map;
    //     }, new Map())
    //     .values()
    // ) : [] as any[];

    // console.log(openProducts, 'openProducts')
  
  
  
    const itemsPerPage = 5; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
  
    // Calculate total pages
    const totalPages = Math.ceil(openProducts?.length / itemsPerPage);
  
    // Slice data based on the current page
    const currentData = openProducts?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



  
    // Handle page navigation
    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    // Add this near other useEffect hooks
    useEffect(() => {
      const fetchMerchants = async () => {
        if (isMerchantsModalOpen) {
          setIsLoadingMerchants(true);
          try {
            const response = await fetch("/api/suregifts/merchants", {
              headers: {
                Authorization: `token ${userToken}`,
              },
            });
            const data = await response.json();
  
            if (data.status === "success") {
              setMerchants(data.data);
            } else {
              toast.error(data.message || "Failed to fetch merchants");
            }
          } catch (error) {
            toast.error("Error fetching merchants");
          } finally {
            setIsLoadingMerchants(false);
          }
        }
      };
  
      fetchMerchants();
    }, [isMerchantsModalOpen, userToken]);
  
    // Filter merchants based on search query
    const filteredMerchants = merchants.filter((merchant: any) =>
      merchant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // const merchantName = (filteredMerchants[0] as { name: string })?.name || '';

    const handleProcessGiftCard = async (auctionId: string, productCode: string, ticketNumber: string, merchantName: string, merchantCode: string) => {
  
  
      setIsProcessingGiftCard(true);
      try {
        const response = await fetch("/api/suregifts/process_giftcard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${userToken}`,
          },
          body: JSON.stringify({
            auction_id: auctionId,
            productCode: productCode,
            ticket_id: ticketNumber,
            merchant_name: merchantName || '',
          }),
        });
  
        const responseData = await response.json();
        if (responseData.status === "success") {
          /*   console.log(data.data.data, "data.data.data")
            console.log(data.data, "data.data") */
  
          const temporaryData = {
            "status": "success",
            "message": "Voucher processed successfully",
            "data": {
              "data": {
                "orderNumber": "223787",
                "reference": "0a8703fd25_Gbolahan_143246.00_voucher",
                "status": "COMPLETED",
                "vouchers": [
                  {
                    "value": 7000.0,
                    "expiryDate": "2026-05-13T08:36:01.3848235Z",
                    "pin": "1234",
                    "code": "791976848284",
                    "serial": "3080560697"
                  }
                ]
              },
              "statusCode": "00",
              "message": "Successful"
            }
          }
  
  
          localStorage.setItem("voucherData", JSON.stringify(temporaryData.data.data));
          setVoucherData(temporaryData.data.data);
          setIsMerchantsModalOpen(false);
          setIsVoucherModalOpen(true);
  
          /*     window.location.reload(); */
        } else {
          toast.error(responseData.message || "Failed to process gift card");
        }
      } catch (error) {
        toast.error("Error processing gift card");
      } finally {
        setIsProcessingGiftCard(false);
      }
    };
  
    const {
      data: banksData,
      isLoading: isBanksLoading,
      error: banksError,
    } = useGetBanksData(
      "/api/banks",
      "get_banks",
      userToken
    );
  
    useEffect(() => {
      if (banksData?.status === "success") {
        setBanks(banksData.data);
      }
    }, [banksData]);
  
    const validateAccountDetails = async () => {
      if (!selectedBank || !accountNumber) {
        toast.error("Please select a bank and enter account number");
        return;
      }
  
      setIsValidatingAccount(true);
      try {
        const response = await fetch("/api/bankaccountdetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${userToken}`,
          },
          body: JSON.stringify({
            accountNumber,
            bankCode: selectedBank,
          }),
        });
        const data = await response.json();
        if (data.status === "success") {
          setAccountName(data.data.accountName);
          toast.success("Account details validated successfully");
        } else {
          toast.error(data.message || "Failed to validate account details");
        }
      } catch (error) {
        toast.error("Error validating account details");
      } finally {
        setIsValidatingAccount(false);
      }
    };
  
    const handleCashout = async () => {
      if (!selectedTransaction?.id || !selectedBank || !accountNumber || !accountName) {
        toast.error("Please fill in all required fields");
        return;
      }
  
      // console.log(selectedTransaction, "selectedTransaction")
  
      setIsProcessingCashout(true);
      try {
        const response = await fetch("/api/cashout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${userToken}`,
          },
          body: JSON.stringify({
            auction_id: selectedTransaction?.auction?.[0]?.auction_id,
            ticket_id: selectedTransaction?.id,
            accountNumber,
            accountName,
            bankCode: selectedBank,
          }),
        });
        const data = await response.json();
  
        /*  {
           "status": "success",
             "message": "Cashout successful",
               "data": {
             "id": "API-TRANSFER-2E011-69541cae-494c-4b5a-a9d6-acc935616fc1",
               "amount": 75000,
                 "status": "SUCCESS",
                   "transfer_status": "SUCCESS",
                     "reference": "cashout_Femi_₦75000.00_73b5ef32b9"
           }
         } */
        if (data.status === "success") {
          toast.success("Cashout successful");
          setIsBankTransferModalOpen(false);
          // Reset form
          setSelectedBank("");
          setAccountNumber("");
          setAccountName("");
        } else {
          toast.error(data.message || "Failed to process cashout");
        }
      } catch (error) {
        toast.error("Error processing cashout");
      } finally {
        setIsProcessingCashout(false);
      }
    };
  
    const handleDeliveryRedemption = async () => {
      if (!selectedTransaction?.id || !selectedTransaction?.auction?.[0]?.auction_id) {
        toast.error("Missing required transaction data");
        return;
      }
  
      setIsProcessingDelivery(true);
      try {
        const response = await fetch("/api/redeem-by-delivery", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${userToken}`,
          },
          body: JSON.stringify({
            ticket_id: selectedTransaction.id,
            auction_id: selectedTransaction.auction[0].auction_id,
            redemption_mode: "by_delivery",
          }),
        });
  
        const data = await response.json();
  
        if (data.status === "success") {
          setDeliverySuccessData(data.data);
          setIsAddressModalOpen(false);
          setIsDeliverySuccessModalOpen(true);
          // Refresh the auction data in the background
          window.location.reload();
        } else {
          toast.error(data.message || "Failed to process delivery redemption");
        }
      } catch (error) {
        toast.error("Error processing delivery redemption");
      } finally {
        setIsProcessingDelivery(false);
      }
    };
  
    if (!hasMounted) {
      return <p className="text-center text-gray-500 py-8">Loading...</p>;
    }

    if (!isAuthenticated) {
      return null;
    }

  
    return (
      <div>
        <div className="">
          <div className="flex flex-col ">
            {auctionLoading ? (
              <p className="text-center text-gray-500 py-8">Loading...</p>
            ) : openProducts?.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No data available</p>
            ) : (
              currentData?.map((val: any, index: number) => (
                <div
                  key={index}
                  className="relative my-2 flex gap-4 border p-3 flex-wrap"
                  onClick={() =>
                    router.push(`/raffle/${val?.auction[0]?.auction_id}/winners`)
                  }
                >
  
  
                  <div
                    onClick={() => router.push(`/raffle/${val?.auction[0]?.auction_id}/winners`)}
                    className="relative min-h-[100px] w-[100px] shrink-0 cursor-pointer self-stretch overflow-hidden rounded-lg"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}${val?.auction[0]?.images[0]}`}
                      alt={val?.auction[0]?.name}
                      fill
                      sizes="100px"
                      className="rounded-lg object-cover"
                    />
                  </div>
  
                  <div className="flex flex-col gap-3 capitalize">
                    <p className=" font-semibold">{val?.auction[0]?.name}</p>
                    {/* <p>Ticket Number: {val?.ticket_number} </p> */}
  
  
                    <p>Ticket Price: { formatCurrency(val?.ticket_price) }</p>

                    {/* {console.log(val, 'draw_date')} */}

                     <p> Start Date: { (val?.start_date) }</p>
                    <p> Start Time: { (val?.start_time) }</p>
                    <p> Date Created: { formatDate(val?.date_created, 'dd MMMM, yyyy') }</p>
                    
                    
                   
                  </div>
                 
                </div>
              ))
            )}
          </div>
  
  
          {openProducts?.length > itemsPerPage && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`mx-2 px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#F25E26] hover:bg-[#EA7000] text-white'}`}
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`mx-2 px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#F25E26] hover:bg-[#EA7000] text-white'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
  
        {isdeleteModalOpen && (
          <ModalProfile
            icon={""}
            isOpen={isdeleteModalOpen}
            onClose={handleCloseModaldelete}
            title=""
            handleEvent={handleCloseModaldelete}
          >
            <form
              onSubmit={handleSubmitDelete(submitFormdelete)}
              className="flex flex-col"
            >
              <p className="flex justify-center text-left py-8">
                Are you sure you want to delete this product?
              </p>
              <div className="mt-5 flex gap-4 justify-center">
                <DefaultButton
                  text="No"
                  className="rounded-md border-2 border-[#F25E26] p-2 px-4 text-[#F25E26]"
                  type="button"
                  handleClick={Closefuncdelete}
                />
                <DefaultButton
                  text={status === "pending" ? "loading..." : "Yes"}
                  className="rounded-md bg-[#F25E26] p-2 px-4 text-white"
                  type="submit"
                />
              </div>
            </form>
          </ModalProfile>
        )}
  
        {isWinningAdviseModalOpen && (
          <ModalProfile
            icon={""}
            isOpen={isWinningAdviseModalOpen}
            onClose={() => setIsWinningAdviseModalOpen(false)}
            title="Select means to redeem item" 
            handleEvent={() => setIsWinningAdviseModalOpen(false)}
          >
            <div className="flex flex-col p-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="delivery"
                    name="redemption"
                    value="delivery"
                    checked={selectedRedemption === "delivery"}
                    onChange={(e) => setSelectedRedemption(e.target.value)}
                    className="h-4 w-4 accent-[#F25E26] border-gray-300 focus:ring-[#F25E26]"
                  />
                  <label htmlFor="delivery" className="text-gray-700">
                    By Delivery
                  </label>
                </div>
  
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="voucher"
                    name="redemption"
                    value="voucher"
                    checked={selectedRedemption === "voucher"}
                    onChange={(e) => setSelectedRedemption(e.target.value)}
                    className="h-4 w-4 accent-[#F25E26] text-[#F25E26] border-gray-300 focus:ring-[#F25E26]"
                  />
                  <label htmlFor="voucher" className="text-gray-700">
                    Gift Voucher
                  </label>
                </div>
  
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="transfer"
                    name="redemption"
                    value="transfer"
                    checked={selectedRedemption === "transfer"}
                    onChange={(e) => setSelectedRedemption(e.target.value)}
                    className="h-4 w-4 accent-[#F25E26] text-[#F25E26] border-gray-300 focus:ring-[#F25E26]"
                  />
                  <label htmlFor="transfer" className="text-gray-700">
                    Cash Transfer
                  </label>
                </div>
              </div>
  
              <div className="mt-8 flex justify-between gap-4 flex-wrap">
                <DefaultButton
                  text="Back"
                  className="rounded-md border-2 border-[#F25E26] p-2 px-4 text-[#F25E26]"
                  type="button"
                  handleClick={() => setIsWinningAdviseModalOpen(false)}
                />
                <DefaultButton
                  text="Next"
                  className="rounded-md bg-[#F25E26] p-2 px-4 text-white"
                  type="button"
                  handleClick={() => {
                    if (!selectedRedemption) {
                      toast.error("Please select a redemption method");
                      return;
                    }
                    if (selectedRedemption === "voucher") {
                      setIsWinningAdviseModalOpen(false);
                      setIsMerchantsModalOpen(true);
                    } else if (selectedRedemption === "transfer") {
                      setIsWinningAdviseModalOpen(false);
                      setIsBankTransferModalOpen(true);
                    } else if (selectedRedemption === "delivery") {
                      setIsWinningAdviseModalOpen(false);
                      setIsDeliveryNoticeModalOpen(true);
                    } else {
                      // Handle other redemption methods
                      setIsWinningAdviseModalOpen(false);
                    }
                  }}
                />
              </div>
            </div>
          </ModalProfile>
        )}
  
      </div>
    );
  };