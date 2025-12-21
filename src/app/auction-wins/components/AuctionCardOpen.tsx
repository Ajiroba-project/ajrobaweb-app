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
import { CustomModal } from "@/app/component/Modal";
import maskgroup from "@/app/asset/image/Maskgroup.svg";
import Barcode from "@/app/asset/image/barcode.svg";
import Link from "next/link";
import Brand from "@/app/asset/logo.svg";
import bikecode from '@/app/asset/image/bikecode.svg'
import DropDownAuctionWin from "./DropDownAuctionWin";
import WinningAdviceModal from "./WinningAdviceModal";
import { formatCurrency } from "@/utils/formatCurrency";
import deliveryicon from '@/app/asset/deliveryicon.svg';

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
    }[];
    ticket_number?: string;
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

const AuctionWinCardNewOpen = ({ product }: AuctionProps) => {
    /* console.log(product, 'product') */

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
        if (option === "Review") {
            setSelectedTransaction(transaction);
            setModalOpen(true);
        }

        if (option === "Delete") {
            setSelectedTransactiondelete(transaction);
            setisdeleteModalOpen(true);
        }

        if (option === "Redeem") {
            setSelectedTransaction(transaction);
            setIsWinningAdviseModalOpen(true);
        }

        if (option === "Download") {
            // Use the stored voucher data for this transaction
            const transactionId = transaction.id;
            if (transactionId && storedVoucherData[transactionId]) {
                setVoucherData(storedVoucherData[transactionId]);
                setIsVoucherModalOpen(true);
            } else {
                toast.error("Voucher data not found");
            }
        }

        if (option === "winning advise") {
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

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/view_profile/`;

    const { data: userInfo, isLoading: userLoading } = useGetDatanew(url, 'get_user_details', userToken || " ");

    /*  const userToken = token; */

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

    const openProducts = auctioninfo?.data?.data?.open.map(
        (item: { id: any }) => {
            return { ...item, tag: ["open"] }; // Add tag as an array with "open" for consistency
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

    const merchantName = (filteredMerchants[0] as { name: string })?.name || '';

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
                    merchant_name: merchantName || '',
                }),
            });

            const responseData = await response.json();
            if (responseData.status === "success") {
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
                };

                // Store the voucher data with the transaction ID as key
                if (selectedTransaction?.id) {
                    const transactionId = selectedTransaction.id.toString();
                    setStoredVoucherData((prev: Record<string, any>) => ({
                        ...prev,
                        [transactionId]: temporaryData.data.data
                    }));
                }

                setVoucherData(temporaryData.data.data);
                setIsMerchantsModalOpen(false);
                setIsVoucherModalOpen(true);
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
        "https://staging.ajiroba.ng/v1/pay/nomba/banks/",
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
            const response = await fetch("https://staging.ajiroba.ng/v1/pay/nomba/bank_account_details/", {
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

        setIsProcessingCashout(true);
        try {
            const response = await fetch("https://staging.ajiroba.ng/v1/pay/nomba/cashout/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `token ${userToken}`,
                },
                body: JSON.stringify({
                    auction_id: selectedTransaction?.auction?.[0]?.auction_id,
                    ticket_id: selectedTransaction?.ticket_number,
                    accountNumber,
                    accountName,
                    bankCode: selectedBank,
                }),
            });
            const data = await response.json();
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


                                <div onClick={() =>
                                    router.push(`/auction/productdetails/${val?.auction[0]?.auction_id}`)
                                } className="relative  flex gap-4 border p-3 flex-wrap h-[120px]"> {/* Container height control */}
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

                                 
                                    <p>Ticket Price: { formatCurrency(val?.ticket_price) }</p>
                                    <div className="mt-5 flex gap-3 flex-wrap">
                                        {/*    {val.tag &&
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
                          {value === "redeem items" && val.redeemed ? "Download Voucher" : value}
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
                                                    {value === "redeem items" && val.redeemed ? "Download Voucher" : value}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                                <span className="absolute right-3 top-2 rounded-md border p-2 cursor-pointer">
                                    <DropDownAuction
                                        onOptionClick={(option) => handleOptionClick(option, val)}
                                        transaction={val}
                                    />
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
                    title="Select Redemption Method"
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
                                    className="h-4 w-4 text-[#F25E26] accent-[#F25E26] border-gray-300 focus:ring-[#F25E26]"
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

                        <div className="mt-8 flex justify-between">
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


            {isWinningAdvice && (
                <WinningAdviceModal
                    isOpen={isWinningAdvice}
                    onClose={() => setIsWinningAdvice(false)}
                    adviceData={{
                        date: "Fri, March 1, 2024",
                        name: "Oloruntoba Ayodele",
                        prize: "1 bag of rice",
                        drawDate: "Feb 24, 2024",
                        ticketNumber: "123536",
                    }}
                />
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
                                <p className="text-gray-600">Order #{voucherData.data.orderNumber}</p>
                                <p className="text-sm text-gray-500">Reference: {voucherData.data.reference}</p>
                                <p className="text-sm text-gray-500">Status: {voucherData.data.status}</p>
                            </div>

                            <div className="space-y-4">
                                {voucherData.data.vouchers.map((voucher: any, index: number) => (
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
                                        voucherContent.innerHTML = `
                      <div style="padding: 20px; border: 2px solid #F25E26; border-radius: 8px;">
                        <h2 style="text-align: center; color: #F25E26;">Gift Voucher</h2>
                        <p style="text-align: center;">Order #${voucherData.data.orderNumber}</p>
                        <p style="text-align: center; font-size: 12px;">Reference: ${voucherData.data.reference}</p>
                        <p style="text-align: center; font-size: 12px;">Status: ${voucherData.data.status}</p>
                        ${voucherData.data.vouchers.map((voucher: any) => `
                          <div style="margin-top: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
                            <p><strong>Value:</strong> ₦${voucher.value.toLocaleString()}</p>
                            <p><strong>Expiry Date:</strong> ${new Date(voucher.expiryDate).toLocaleDateString()}</p>
                            <p><strong>PIN:</strong> ${voucher.pin}</p>
                            <p><strong>Code:</strong> ${voucher.code}</p>
                            <p><strong>Serial Number:</strong> ${voucher.serial}</p>
                          </div>
                        `).join('')}
                      </div>
                    `;

                                        // Use html2canvas to create an image
                                        import('html2canvas').then(({ default: html2canvas }) => {
                                            html2canvas(voucherContent).then(canvas => {
                                                const link = document.createElement('a');
                                                link.download = `voucher-${voucherData.data.orderNumber}.png`;
                                                link.href = canvas.toDataURL();
                                                link.click();
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






export { AuctionWinCardNewOpen };
