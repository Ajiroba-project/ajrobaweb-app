"use  client";
import React, { SetStateAction, useState, useEffect } from "react";
import Image from "next/image";
import { CiMenuKebab } from "react-icons/ci";
import Dropdown from "./Dropdown";
import { formatCurrency } from "@/utils/formatCurrency";

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
import { CustomModal } from "@/app/component/Modal";
import maskgroup from "@/app/asset/image/Maskgroup.svg";
import Barcode from "@/app/asset/image/barcode.svg";
import Link from "next/link";
import Brand from "@/app/asset/logo.svg";
import bikecode from '@/app/asset/image/bikecode.svg'
import DropDownAuctionWin from "./DropDownAuctionWin";
import WinningAdviceModal from "./WinningAdviceModal";
import TestWin from "./TestWin";
import DropDownAuctionClosed from "./DropDownAuctionClosed";

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




const AuctionWinCardClosed = ({ product }: AuctionProps) => {
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

  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

  const userToken = (Cookies.get("token") as string) || "";

  /*  const userToken = token; */

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

  const openProducts = auctioninfo?.data?.data?.closed.map(
    (item: { id: any }) => {
      return { ...item, tag: ["closed", 'redeem items', 'winning advise'] }; // Add tag as an array with "open" for consistency
    },
  );



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
          ticket_id: ticketNumber,
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
              >


                <div className="relative  flex gap-4 border p-3 flex-wrap h-[120px]"> {/* Container height control */}
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

                  <p>Ticket Price: {formatCurrency(val?.ticket_price)}</p>

                  <div className="mt-5 flex gap-3 flex-wrap">
                    {/*      {val.tag &&
                      val.tag.map((value: string, index: number) => (
                        <p
                          key={index}
                          onClick={() => {
                            if (!val.won || val.redeemed) return;

                            if (value === "redeem items") {
                              handleOptionClick("Redeem", val);
                            } else if (value === "winning advise") {
                              handleOptionClick("winning advise", val);
                            }
                          }}
                          className={`text-xs ${!val.won || val.redeemed ? "opacity-50 cursor-not-allowed" : ""
                            } ${value === "open" || value === "delivered"
                              ? "bg-green-200 text-emerald-800"
                              : value === "close"
                                ? "bg-rose-200 text-red-800"
                                : value === "redeem items"
                                  ? "bg-blue-700 text-white cursor-pointer"
                                  : value === "winning advise"
                                    ? "bg-[#F25E26] text-white cursor-pointer"
                                    : "bg-[#F25E26] text-white"
                            } rounded-xl px-2.5 py-1`}
                        >
                          {value}
                        </p>
                      ))} */}


                    {val.tag &&
                      val.tag.map((value: string, index: number) => (
                        <p
                          key={index}
                          onClick={() => {
                            if (!val.won) return;

                            if (value === "redeem items") {
                              if (val.redeemed) {
                                // Handle download voucher click
                                handleOptionClick("Download", val);
                              } else {
                                handleOptionClick("Redeem", val);
                              }
                            } else if (value === "winning advise") {
                              handleOptionClick("winning advise", val);
                            }
                          }}
                          className={`text-xs ${!val.won ? "opacity-50 cursor-not-allowed" : ""
                            } ${value === "open" || value === "delivered"
                              ? "bg-green-200 text-emerald-800"
                              : value === "close"
                                ? "bg-rose-200 text-red-800"
                                : value === "redeem items"
                                  ? val.redeemed
                                    ? "bg-green-700 text-white cursor-pointer" // Style for Download Voucher
                                    : "bg-blue-700 text-white cursor-pointer"  // Style for Redeem Items
                                  : value === "winning advise"
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
                  <DropDownAuctionClosed
                    onOptionClick={(option) => handleOptionClick(option, val)}
                    transaction={val}
                  />

                  {/*   <DropDownAuctionWin
                    onOptionClick={(option) => handleOptionClick(option, val)}
                    transaction={val}
                  /> */}
                </span>
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
                  className="h-4 w-4 text-[#F25E26] border-gray-300 focus:ring-[#F25E26]"
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
                  className="h-4 w-4 text-[#F25E26] border-gray-300 focus:ring-[#F25E26]"
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
                  className="h-4 w-4 text-[#F25E26] border-gray-300 focus:ring-[#F25E26]"
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
                      <p className="text-sm text-gray-500">Code: {merchant.code}</p>
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
      {/*    {isWinningAdvice && selectedTransaction && (
        <WinningAdviceModal
          isOpen={isWinningAdvice}
          onClose={() => setIsWinningAdvice(false)}
          adviceData={{
            date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }),
            name: `${userInfo?.data?.first_name} ${userInfo?.data?.last_name}`,
            prize: selectedTransaction?.auction?.[0]?.name || "Prize",
            drawDate: new Date(selectedTransaction?.auction?.[0]?.draw_date || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            ticketNumber: selectedTransaction?.ticket_number || "",
          }}
        />
      )}  */}


      {isWinningAdvice && selectedTransaction && (
        <TestWin
          isOpen={isWinningAdvice}
          onClose={() => setIsWinningAdvice(false)}
          adviceData={{
            date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }),
            productId: `${selectedTransaction?.auction?.[0]?.auction_id}`,
            /*  productCode: `${selectedTransaction?.auction?.[0]?.product_code}`, */
            name: `${userInfo?.data?.first_name} ${userInfo?.data?.last_name}`,
            prize: selectedTransaction?.auction?.[0]?.name || "Prize",
            drawDate: selectedTransaction?.start_date || "",
            raffleDrawTime: selectedTransaction?.start_time || "",
            estimated_value: selectedTransaction?.cost_price || "N/A",

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
          title="Bank Transfer Details"
          handleEvent={() => setIsBankTransferModalOpen(false)}
        >
          <div className="flex flex-col p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Bank</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F25E26] focus:ring-[#F25E26]"
                  disabled={isLoadingBanks}
                >
                  <option value="">Select a bank</option>
                  {banks.map((bank: any) => (
                    <option key={bank.code} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F25E26] focus:ring-[#F25E26]"
                  placeholder="Enter account number"
                  maxLength={10}
                />
              </div>

              {accountName && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Name</label>
                  <input
                    type="text"
                    value={accountName}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  />
                </div>
              )}

              <div className="mt-6 flex justify-between gap-4 flex-wrap">
                <DefaultButton
                  text="Back"
                  className="rounded-md border-2 border-[#F25E26] p-2 px-4 text-[#F25E26]"
                  type="button"
                  handleClick={() => {
                    setIsBankTransferModalOpen(false);
                    setIsWinningAdviseModalOpen(true);
                  }}
                />
                {!accountName ? (
                  <DefaultButton
                    text={isValidatingAccount ? "Validating..." : "Validate Account"}
                    className="rounded-md bg-[#F25E26] p-2 px-4 text-white"
                    type="button"
                    handleClick={validateAccountDetails}
                    disabled={isValidatingAccount}
                  />
                ) : (
                  <DefaultButton
                    text={isProcessingCashout ? "Processing..." : "Confirm Transfer"}
                    className="rounded-md bg-[#F25E26] p-2 px-4 text-white"
                    type="button"
                    handleClick={handleCashout}
                    disabled={isProcessingCashout}
                  />
                )}
              </div>
            </div>
          </div>
        </ModalProfile>
      )}
    </div>
  );
};



export { AuctionWinCardClosed };
