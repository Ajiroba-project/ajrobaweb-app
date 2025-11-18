import React, { useEffect, useState } from "react";
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
import Cookies from "js-cookie";
import { useGetBanksData, useGetDatanew, useGetOrderWinsData } from "@/hooks/useGetData";
import DropDownAuctionWin from "./DropDownAuctionWin";
import TestWin from "./TestWin";
import { formatCurrency } from "@/utils/formatCurrency";
import deliveryicon from '@/app/asset/deliveryicon.svg'

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
  product_no?: string;
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

type Bank = {
  name: string;
  code: string;
};

export const AuctionWinCard = ({ product }: AuctionProps) => {
  // const userToken = token;
  const userToken_ = Cookies.get("token") as string;

  const tkn_: string = Cookies.get("token") as string;

  const {
    data: auctioninfo,
    isLoading: auctionLoading,
    error: ordererror,
  } = useGetOrderWinsData(
    "/api/auctionwins",
    "get_auctionwins_details",
    userToken_,
  );

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/view_profile/`;

  const { data: userInfo, isLoading: userLoading } = useGetDatanew(url, 'get_user_details', userToken_ || " ");

  //  console.log(userInfo?.data, 'userInfo')

  // console.log(userInfo?.data?.address, 'userInfo')

  const productMain = auctioninfo?.data?.data?.all?.map((item: { id: any }) => {
    const isOpen = auctioninfo?.data?.data?.open?.some(
      (openItem: { id: any }) => openItem.id === item.id,
    );
    const isClosed = auctioninfo?.data?.data?.closed?.some(
      (closedItem: { id: any }) => closedItem.id === item.id,
    );

    let tag;
    if (isOpen) tag = ["open"];
    else if (isClosed) tag = ["close", 'redeem items', 'Download winning Advice'];
    else tag = ["unknown"];

    return { ...item, tag: tag };
  });





  // const openProducts = auctioninfo?.data?.data?.closed.map(
  //   (item: { id: any }) => {
  //     return { ...item, tag: ["closed", 'redeem items', 'Download winning Advice'] }; // Add tag as an array with "open" for consistency
  //   },
  // );





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
  const [validatedBankName, setValidatedBankName] = useState("");
  const [isLoadingBanks, setIsLoadingBanks] = useState(false);
  const [isValidatingAccount, setIsValidatingAccount] = useState(false);
  const [isProcessingCashout, setIsProcessingCashout] = useState(false);
  const [storedVoucherData, setStoredVoucherData] = useState<Record<string, any>>({});
  const [expandedMerchants, setExpandedMerchants] = useState<Record<string, boolean>>({});
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

  const userToken = (Cookies.get("token") as string) || "";


  

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
      /*     console.log('rederrrr') */
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


    if (option === "Download winning Advice") {
        //  console.log(transaction, "transaction") 
      setSelectedTransaction(transaction);
      setIsWinningAdvice(true);
    }
  };


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
        // Map bank code to bank name from loaded banks
        const found = banks.find((b: any) => b.code === selectedBank);
        setValidatedBankName(found?.name || "");
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

  // Helpers to filter merchants by user's address
  const normalizeTokens = (text: string | undefined | null) => {
    if (!text) return [] as string[];
    const tokens = (text.toString().toLowerCase().match(/[a-z]+/g) || [])
      .filter((t) => t.length >= 3);
    // De-duplicate tokens
    return Array.from(new Set(tokens));
  };

  const userAddressTokens = normalizeTokens(userInfo?.data?.address);

  // console.log(userAddressTokens, "userAddressTokens")


  // Score merchants by how closely their stores match the user's address
  const scoreMerchant = (merchant: any): number => {
    if (!Array.isArray(merchant?.stores) || merchant.stores.length === 0) return 0;
    let bestScore = 0;
    for (const store of merchant.stores) {
      const text = store?.toString().toLowerCase() || "";
      let s = 0;
      for (const tok of userAddressTokens) {
        if (text.includes(tok)) s += 1;
      }
      if (s > bestScore) bestScore = s;
    }
    return bestScore;
  };

  const merchantsWithScores = merchants
    // Only include merchants that have stores
    .filter((m: any) => Array.isArray(m?.stores) && m.stores.length > 0)
    // Keep only merchants that have at least one address token match
    .map((m: any) => ({ ...m, __score: scoreMerchant(m) }))
    .filter((m: any) => m.__score > 0)
    // Sort by closeness to the user's address
    .sort((a: any, b: any) => b.__score - a.__score);

  // Apply search on name or stores
  const filteredMerchants = merchantsWithScores.filter((merchant: any) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const nameMatch = merchant.name?.toString().toLowerCase().includes(q);
    const storesMatch = Array.isArray(merchant.stores)
      ? merchant.stores.some((s: string) => s.toString().toLowerCase().includes(q))
      : false;
    return nameMatch || storesMatch;
  });

  const merchantName = filteredMerchants[0]?.name || '';

  const handleProcessGiftCard = async (auctionId: string, productCode: string, ticketNumber: string) => {


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
          merchant_name: merchantName || '',
          ticket_id: ticketNumber,
        }),
      });

      const responseData = await response.json();
      /* console.log(responseData, 'rrrrrrr') */


      if (responseData.status === "success") {
   /*         console.log(data.data.data, "data.data.data")
          console.log(data.data, "data.data")  */


          toast.success(responseData.message);

    /*     const temporaryData = {
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
        } */


       /*  localStorage.setItem("voucherData", JSON.stringify(temporaryData.data.data));
        setVoucherData(temporaryData.data.data); */
        setIsMerchantsModalOpen(false);
  /*       setIsVoucherModalOpen(true); */

             window.location.reload(); 
      } else {
      /*   console.log(responseData, "responseData")
        console.log(responseData.message, "responseData.message") */
        toast.error(responseData?.data?.message || responseData?.message || "Failed to process gift card");
      }
    } catch (error) {
    /*   console.log(error, "error") */
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

  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));


  // const userToken = token;

  const handleSuccess = (data: any) => {
    Setreviewerror("");
    reset();

    if (data.status === 201 || data.status === 200 || data.status === 204) {
      /*     console.log(data, "data"); */
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

    // console.log(errors)
    // console.log(data, 'datata')
    // console.log(selectedTransactiondelete, 'selectedTransactiondelete')

    //  console.log(selectedTransactiondelete, "Payload being submitted - BEFORE");

    if (!selectedTransactiondelete) {
      console.error("No transaction selected for deletion");
      return; // Exit the function if selectedTransactiondelete is null
    }

    const payload = {
      order_Id: selectedTransactiondelete.id,
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


  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(productMain?.length / itemsPerPage);

  // Slice data based on the current page
  const currentData = productMain?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page navigation
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };





  return (
    <div>
      <div className="">
        <div className="flex flex-col ">
          {auctionLoading ? (
            <p className="text-center text-gray-500 py-8">Loading...</p>
          ) : productMain?.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No data available</p>
          ) : (
            currentData?.map((val: any, index: number) => (
              <div
                key={index}
                className="relative my-2 flex gap-4 border p-3 flex-wrap"
              >
                <div className="relative  flex gap-4 border p-3 flex-wrap h-[120px]"

                  onClick={() =>
                    router.push(`/auction/productdetails/${val?.auction[0]?.auction_id}`)
                  }
                >
                  {" "}
                  {/* Container height control */}
                  {/*    {console.log(val, 'vallll')} */}
                  <Image
                    src={`https://staging.ajiroba.ng${val?.auction[0]?.images[0]}`}
                    alt={val?.auction[0]?.name}
                    layout="fixed"
                    width={100}
                    height={80}
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>

                <div className="flex flex-col gap-3 capitalize">
                  <p className=" font-semibold">{val?.auction[0]?.name}</p>
                  <p>Ticket Number: {val?.ticket_number} </p>
                  <p>Ticket Price: {formatCurrency(val?.ticket_price)} </p>
                
                  <div className="mt-5 flex gap-3 flex-wrap">



                    {val.tag &&
                      val.tag.map((value: string, index: number) => (
                        <p
                          key={index}
                          onClick={() => {
                            if (!val.won || value === "close") return;

                            if (value === "redeem items") {
                              if (val.redeemed) {
                                // Handle download voucher click
                                handleOptionClick("Download", val);
                              } else {
                                handleOptionClick("Redeem", val);
                              }
                            } else if (value === "Download winning Advice") {
                              handleOptionClick("Download winning Advice", val);
                            }
                          }}
                          className={`text-xs ${!val.won || value === "close" ? "opacity-50 cursor-not-allowed" : ""
                            } ${value === "open" || value === "delivered"
                              ? "bg-green-200 text-emerald-800"
                              : value === "close"
                                ? "bg-rose-200 text-red-800"
                                : value === "redeem items"
                                  ? val.redeemed
                                    ? "bg-green-700 text-white cursor-pointer" // Style for Download Voucher
                                    : "bg-blue-700 text-white cursor-pointer"  // Style for Redeem Items
                                  : value === "Download winning Advice"
                                    ? "bg-[#F25E26] text-white cursor-pointer"
                                    : "bg-[#F25E26] text-white"
                            } rounded-xl px-2.5 py-1`}
                        >
                          {value === "redeem items" && val.redeemed ? "Redeemed" : value}
                        </p>
                      ))}
                  </div>
                </div>
                <span className="absolute right-3 top-2 rounded-md border p-2 cursor-pointer">
                  <DropDownAuctionWin
                    onOptionClick={(option) => handleOptionClick(option, val)}
                    transaction={val}
                  />
                </span>
              </div>
            ))
          )}
        </div>

        {productMain?.length > itemsPerPage && (
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

      {isMerchantsModalOpen && (
        <ModalProfile
          icon={""}
          isOpen={isMerchantsModalOpen}
          onClose={() => setIsMerchantsModalOpen(false)}
          title="Select Merchant"
          handleEvent={() => setIsMerchantsModalOpen(false)}
        >
          <div className="flex flex-col p-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search merchants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F25E26]"
              />
            </div>

            {isLoadingMerchants ? (
              <div className="text-center py-4">Loading merchants...</div>
            ) : (
              <div className="max-h-[300px] overflow-y-auto">
                {filteredMerchants.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No merchants found
                  </div>
                ) : (
                  filteredMerchants.map((merchant: any) => (
                    <div
                      key={merchant.code}
                      className="p-3 border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        if (selectedTransaction?.id) {
                          const auctionId = selectedTransaction?.auction?.[0]?.auction_id;
                          if (auctionId && typeof auctionId === 'string') {
                            handleProcessGiftCard(auctionId, merchant.code, selectedTransaction?.id || "");
                          } else {
                            toast.error("Invalid auction ID");
                          }
                        } else {
                          toast.error("Invalid transaction");
                        }
                      }}
                    >
                      <p className="font-medium">{merchant.name}</p>
                      <p className="text-sm text-gray-500 mb-1">Code: {merchant.code}</p>
                      {Array.isArray(merchant.stores) && merchant.stores.length > 0 && (
                        <div className="text-xs text-gray-600">
                          {(expandedMerchants[merchant.code] ? merchant.stores : merchant.stores.slice(0, 3)).map((store: string, idx: number) => (
                            <p key={idx} className="truncate">{store}</p>
                          ))}
                          {merchant.stores.length > 3 && (
                            <button
                              type="button"
                              className="italic text-[#F25E26] mt-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedMerchants((prev) => ({
                                  ...prev,
                                  [merchant.code]: !prev[merchant.code],
                                }));
                              }}
                            >
                              {expandedMerchants[merchant.code]
                                ? 'show less'
                                : `and ${merchant.stores.length - 3} more...`}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            <div className="mt-6 flex justify-between gap-4 flex-wrap">
              <DefaultButton
                text="Back"
                className="rounded-md border-2 border-[#F25E26] p-2 px-4 text-[#F25E26]"
                type="button"
                handleClick={() => {
                  setIsMerchantsModalOpen(false);
                  setIsWinningAdviseModalOpen(true);
                }}
              />
            </div>
          </div>
        </ModalProfile>
      )}


    {/* {  console.log(selectedTransaction?.auction, "selectedTransaction?.auction?.[0]?.auction_id")} */}



      {isWinningAdvice && selectedTransaction && (
        <TestWin
          isOpen={isWinningAdvice}
          onClose={() => setIsWinningAdvice(false)}
          adviceData={{
            date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }),
            productId: `${selectedTransaction?.auction?.[0]?.auction_id}`,
            /*  productCode: `${selectedTransaction?.auction?.[0]?.product_code}`, */
            product_no: selectedTransaction?.product_no || "",
            name: `${userInfo?.data?.first_name} ${userInfo?.data?.last_name}`,
            prize: selectedTransaction?.auction?.[0]?.name || "Prize",
            drawDate: selectedTransaction?.start_date || "",
            raffleDrawTime: selectedTransaction?.start_time || "",
            estimated_value:  formatCurrency(selectedTransaction?.cost_price) || "N/A",

            /*   drawDate: new Date(selectedTransaction?.auction?.[0]?.draw_date || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), */
            ticketNumber: selectedTransaction?.ticket_number || "",
          }}
        />
      )}


      {isVoucherModalOpen && voucherData && (
        <ModalProfile
          icon={""}
          isOpen={isVoucherModalOpen}
          onClose={() => setIsVoucherModalOpen(false)}
          title="Your Gift Voucher"
          handleEvent={() => setIsVoucherModalOpen(false)}
        >
          <div className="flex flex-col p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Gift Voucher</h3>
                {/*   {
                  console.log(voucherData, "voucherData")
                } */}
                <p className="text-gray-600">Order #{voucherData?.orderNumber}</p>
                <p className="text-sm text-gray-500">Reference: {voucherData?.reference}</p>
                <p className="text-sm text-gray-500">Status: {voucherData?.status}</p>
              </div>

              <div className="space-y-4">
                {voucherData?.vouchers?.map((voucher: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Value</p>
                        <p className="font-semibold">₦{voucher.value.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Expiry Date</p>
                        <p className="font-semibold">
                          {new Date(voucher.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">PIN</p>
                        <p className="font-semibold">{voucher.pin}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Code</p>
                        <p className="font-semibold">{voucher.code}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Serial Number</p>
                        <p className="font-semibold">{voucher.serial}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between gap-4 flex-wrap">
                <DefaultButton
                  text="Download"
                  className="rounded-md bg-[#F25E26] p-2 px-4 text-white"
                  type="button"
                  handleClick={() => {
                    // Create a PDF or image of the voucher
                    const voucherContent = document.createElement('div');
                    voucherContent.style.position = 'absolute';
                    voucherContent.style.left = '-9999px';
                    voucherContent.style.top = '-9999px';
                    document.body.appendChild(voucherContent);

                    voucherContent.innerHTML = `
                      <div style="padding: 20px; border: 2px solid #F25E26; border-radius: 8px; background: white; max-width: 600px; margin: 0 auto;">
                        <div style="text-align: center; margin-bottom: 20px;">
                          <img src="/ajirobalogo.png" alt="Logo" style="height: 60px; margin-bottom: 10px;" />
                          <h2 style="color: #F25E26; margin: 0; font-size: 24px;">Gift Voucher</h2>
                        </div>
                        <div style="border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 15px 0; margin-bottom: 20px;">
                          <p style="text-align: center; margin: 5px 0; font-size: 16px;">Order #${voucherData?.orderNumber}</p>
                          <p style="text-align: center; margin: 5px 0; font-size: 14px; color: #666;">Reference: ${voucherData?.reference}</p>
                          <p style="text-align: center; margin: 5px 0; font-size: 14px; color: #666;">Status: ${voucherData?.status}</p>
                        </div>
                        ${voucherData?.vouchers?.map((voucher: any) => `
                          <div style="margin-top: 20px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #fafafa;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                              <div>
                                <p style="margin: 5px 0; color: #666; font-size: 14px;">Value</p>
                                <p style="margin: 5px 0; font-size: 18px; font-weight: bold; color: #F25E26;">₦${voucher.value.toLocaleString()}</p>
                              </div>
                              <div>
                                <p style="margin: 5px 0; color: #666; font-size: 14px;">Expiry Date</p>
                                <p style="margin: 5px 0; font-size: 16px;">${new Date(voucher.expiryDate).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p style="margin: 5px 0; color: #666; font-size: 14px;">PIN</p>
                                <p style="margin: 5px 0; font-size: 16px; font-family: monospace;">${voucher.pin}</p>
                              </div>
                              <div>
                                <p style="margin: 5px 0; color: #666; font-size: 14px;">Code</p>
                                <p style="margin: 5px 0; font-size: 16px; font-family: monospace;">${voucher.code}</p>
                              </div>
                              <div>
                                <p style="margin: 5px 0; color: #666; font-size: 14px;">Serial Number</p>
                                <p style="margin: 5px 0; font-size: 16px; font-family: monospace;">${voucher.serial}</p>
                              </div>
                            </div>
                          </div>
                        `).join('')}
                        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                          <p>Thank you for choosing our service!</p>
                          <p>This voucher is valid until the expiry date shown above.</p>
                        </div>
                      </div>
                    `;

                    // Use html2canvas to create an image
                    import('html2canvas').then(({ default: html2canvas }) => {
                      html2canvas(voucherContent, {
                        backgroundColor: '#ffffff',
                        scale: 2,
                        logging: false,
                        useCORS: true
                      }).then(canvas => {
                        const link = document.createElement('a');
                        link.download = `voucher-${voucherData?.orderNumber}.png`;
                        link.href = canvas.toDataURL('image/png');
                        link.click();
                        document.body.removeChild(voucherContent);
                      });
                    });
                  }}
                />
                <DefaultButton
                  text="Close"
                  className="rounded-md border-2 border-[#F25E26] p-2 px-4 text-[#F25E26]"
                  type="button"
                  handleClick={() => setIsVoucherModalOpen(false)}
                />
              </div>
            </div>
          </div>
        </ModalProfile>
      )}

      {isBankTransferModalOpen && (
        <ModalProfile
          icon={""}
          isOpen={isBankTransferModalOpen}
          onClose={() => setIsBankTransferModalOpen(false)}
          title=""
          handleEvent={() => setIsBankTransferModalOpen(false)}
        >
          <div className="flex flex-col p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Cash Transfer</h3>
              <p className="text-sm text-gray-500 mt-1">Please Input Account Details Here</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Market Value</label>
                <input
                  type="text"
                  value={formatCurrency(selectedTransaction?.cost_price)}
                  disabled
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm"
                />
              </div>

              {accountName && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Name</label>
                  <input
                    type="text"
                    value={accountName}
                    readOnly
                    placeholder="Enter your Account Name"
                    className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 p-3 text-gray-900 shadow-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => {
                    setAccountNumber(e.target.value);
                    if (accountName) setAccountName("");
                    if (validatedBankName) setValidatedBankName("");
                  }}
                  placeholder="Enter your Account Number"
                  maxLength={10}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-[#F25E26] focus:ring-[#F25E26]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                {!accountName ? (
                  <select
                    value={selectedBank}
                    onChange={(e) => {
                      setSelectedBank(e.target.value);
                      if (accountName) setAccountName("");
                      if (validatedBankName) setValidatedBankName("");
                    }}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-[#F25E26] focus:ring-[#F25E26]"
                    disabled={isLoadingBanks}
                  >
                    <option value="">Select bank</option>
                    {banks.map((bank: any) => (
                      <option key={bank.code} value={bank.code}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={validatedBankName}
                    readOnly
                    className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 p-3 text-gray-900 shadow-sm"
                  />
                )}
              </div>

              <div className="pt-2 flex justify-between gap-4">
                <DefaultButton
                  text="Back"
                  className="rounded-md border-2 border-[#F25E26] px-6 py-2 text-[#F25E26]"
                  type="button"
                  handleClick={() => {
                    setIsBankTransferModalOpen(false);
                    setIsWinningAdviseModalOpen(true);
                  }}
                />
                <DefaultButton
                  text={isValidatingAccount ? "Validating..." : (isProcessingCashout ? "Processing..." : (accountName ? "Send money" : "Validate Account"))}
                  className="rounded-md bg-[#F25E26] px-6 py-2 text-white"
                  type="button"
                  handleClick={() => { if (!accountName) { validateAccountDetails(); } else { handleCashout(); } }}
                  disabled={isValidatingAccount || isProcessingCashout}
                />
              </div>
            </div>
          </div>
        </ModalProfile>
      )}

      {isDeliveryNoticeModalOpen && (
        <ModalProfile
          icon={""}
          isOpen={isDeliveryNoticeModalOpen}
          onClose={() => setIsDeliveryNoticeModalOpen(false)}
          title=""
          handleEvent={() => setIsDeliveryNoticeModalOpen(false)}
        >
          <div className="flex flex-col p-6">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mr-3">Delivery Notice</h2>
                <div className="flex items-center">
                  <Image
                    src={deliveryicon}
                    alt="Delivery Icon"
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                  <Image
                    src={deliveryicon}
                    alt="Location Pin"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              
              <div className="text-left space-y-3">
                <div className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <p className="text-gray-700">
                    Delivery within Lagos may take <strong>3 business days</strong>
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <p className="text-gray-700">
                    Delivery outside lagos may take <strong>5 business days</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-6">
              <DefaultButton
                text="Back"
                className="rounded-md border-2 border-[#F25E26] p-2 px-4 text-[#F25E26]"
                type="button"
                handleClick={() => {
                  setIsDeliveryNoticeModalOpen(false);
                  setIsWinningAdviseModalOpen(true);
                }}
              />
              <DefaultButton
                text="Proceed"
                className="rounded-md bg-[#F25E26] p-2 px-4 text-white"
                type="button"
                handleClick={() => {
                  // Handle proceed action for delivery
                  setIsDeliveryNoticeModalOpen(false);
                  setIsAddressModalOpen(true);
                }}
              />
            </div>
          </div>
        </ModalProfile>
      )}

      {isAddressModalOpen && (
        <ModalProfile
          icon={""}
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          title="Address"
          handleEvent={() => setIsAddressModalOpen(false)}
        >
          <div className="flex flex-col p-6">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {userInfo?.data?.first_name} {userInfo?.data?.last_name}
                  </p>
                  <p className="text-gray-700 mb-1">{userInfo?.data?.address}</p>
                  <p className="text-gray-700">{userInfo?.data?.phone}</p>
                </div>
                <button
                  type="button"
                  className="text-[#F25E26] text-sm font-medium hover:underline ml-4"
                  onClick={() => {
                    setIsAddressModalOpen(false);
                    setIsChangeAddressModalOpen(true);
                  }}
                >
                  Change
                </button>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <DefaultButton
                text={isProcessingDelivery ? "Processing..." : "Proceed"}
                className="rounded-md bg-[#F25E26] p-2 px-4 text-white"
                type="button"
                handleClick={handleDeliveryRedemption}
                disabled={isProcessingDelivery}
              />
              <DefaultButton
                text="Back"
                className="rounded-md border-2 border-[#F25E26] p-2 px-4 text-[#F25E26]"
                type="button"
                handleClick={() => {
                  setIsAddressModalOpen(false);
                  setIsDeliveryNoticeModalOpen(true);
                }}
              />
            </div>
          </div>
        </ModalProfile>
      )}

      {isChangeAddressModalOpen && (
        <ModalProfile
          icon={""}
          isOpen={isChangeAddressModalOpen}
          onClose={() => setIsChangeAddressModalOpen(false)}
          title="Change Address"
          handleEvent={() => setIsChangeAddressModalOpen(false)}
        >
          <div className="flex flex-col p-6">
            <p className="text-gray-600 mb-6 text-center">Please Enter Your Preferred Address</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Enter your new Address here"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F25E26] focus:border-[#F25E26]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="Enter your city name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F25E26] focus:border-[#F25E26]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  value={newState}
                  onChange={(e) => setNewState(e.target.value)}
                  placeholder="Enter your state of residency"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F25E26] focus:border-[#F25E26]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
                <input
                  type="text"
                  value={newLandmark}
                  onChange={(e) => setNewLandmark(e.target.value)}
                  placeholder="Enter your a popular location around you"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F25E26] focus:border-[#F25E26]"
                />
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-6">
              <DefaultButton
                text="Back"
                className="rounded-md border-2 border-[#F25E26] p-2 px-4 text-[#F25E26]"
                type="button"
                handleClick={() => {
                  setIsChangeAddressModalOpen(false);
                  setIsAddressModalOpen(true);
                }}
              />
              <DefaultButton
                text="Change"
                className="rounded-md bg-[#F25E26] p-2 px-4 text-white"
                type="button"
                handleClick={() => {
                  if (!newAddress || !newCity || !newState) {
                    toast.error("Please fill in all required fields");
                    return;
                  }
                  // Handle address change - you can implement API call here
                  toast.success("Address updated successfully");
                  setIsChangeAddressModalOpen(false);
                  setIsAddressModalOpen(true);
                }}
              />
            </div>
          </div>
        </ModalProfile>
      )}

      {isDeliverySuccessModalOpen && deliverySuccessData && (
        <ModalProfile
          icon={""}
          isOpen={isDeliverySuccessModalOpen}
          onClose={() => setIsDeliverySuccessModalOpen(false)}
          title=""
          handleEvent={() => setIsDeliverySuccessModalOpen(false)}
        >
          <div className="flex flex-col items-center p-8 relative">
            {/* Close Icon */}
            <button
              onClick={() => setIsDeliverySuccessModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <Image
                  src={deliveryicon}
                  alt="Delivery Icon"
                  width={48}
                  height={48}
                  className="mr-2"
                />
                <Image
                  src={deliveryicon}
                  alt="Location Pin"
                  width={32}
                  height={32}
                />
              </div>
            </div>

            <div className="text-center space-y-4 mb-6">
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50">
                <p className="text-lg font-bold text-gray-900">
                  Order Code: {deliverySuccessData.auction_number}
                </p>
              </div>
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50">
                <p className="text-xl font-bold text-gray-900">
                  Congratulations. Your Order is on its way
                </p>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>Ticket Number: {deliverySuccessData.ticket_number}</p>
              <p>Redemption Date: {new Date(deliverySuccessData.redemption_date).toLocaleDateString()}</p>
            </div>
          </div>
        </ModalProfile>
      )}
    </div>
  );
};
