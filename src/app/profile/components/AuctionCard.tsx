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
import { useGetOrderWinsData } from "@/hooks/useGetData";
import Cookies from "js-cookie";
import { CustomModal } from "@/app/component/Modal";
import maskgroup from "@/app/asset/image/Maskgroup.svg";
import Barcode from "@/app/asset/image/barcode.svg";
import Link from "next/link";
import Brand from "@/app/asset/logo.svg";
import bikecode from '@/app/asset/image/bikecode.svg'
import DropDownAuctionWin from "./DropDownAuctionWin";
import WinningAdviceModal from "../components/WinningAdviceModal";

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
};

const AuctionWinCardNew = ({ product }: AuctionProps) => {
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

  const router = useRouter();

  const handleCloseModaldelete = () => {
    setisdeleteModalOpen(false);
  };

  const handleOptionClick = (option: string, transaction: Order) => {
    //   console.log(`${option} clicked for transaction:`, transaction);
    //  console.log(transaction, 'transactionnnnn')

    console.log(option, 'optionnnnn')

    if (option === "Review") {
      setSelectedTransaction(transaction);
      setModalOpen(true);
    }

    if (option === "Delete") {
      setSelectedTransactiondelete(transaction);
      // console.log(transaction, "Transaction to delete"); // Check if this logs correctly
      setisdeleteModalOpen(true);
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

  const handleProcessGiftCard = async (auctionId: string, productCode: string) => {
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
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setVoucherData(data.data.data);
        setIsMerchantsModalOpen(false);
        setIsVoucherModalOpen(true);
      } else {
        toast.error(data.message || "Failed to process gift card");
      }
    } catch (error) {
      toast.error("Error processing gift card");
    } finally {
      setIsProcessingGiftCard(false);
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

                  <p>Ticket Price: ₦{val?.ticket_price}</p>
                  <div className="mt-5 flex gap-3 flex-wrap">
                    {val.tag &&
                      val.tag.map((value: string, index: number) => (
                        <p
                          key={index}
                          className={`text-xs ${value === "open" || value === "delivered" ? "bg-green-200 text-emerald-800" : value === "close" ? "bg-rose-200 text-red-800" : value === "redeem items" ? "bg-blue-700 text-white" : "bg-[#F25E26] text-white"} rounded-xl px-2.5  py-1 `}
                        >
                          {value}
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
                          handleProcessGiftCard(selectedTransaction.id, merchant.code);
                        } else {
                          toast.error("Invalid auction ID");
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
                <p className="text-gray-600">Order #{voucherData.orderNumber}</p>
              </div>

              <div className="space-y-4">
                {voucherData.vouchers.map((voucher: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Value</p>
                        <p className="font-semibold">₦{voucher.value}</p>
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
                        <p style="text-align: center;">Order #${voucherData.orderNumber}</p>
                        ${voucherData.vouchers.map((voucher: any) => `
                          <div style="margin-top: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
                            <p><strong>Value:</strong> ₦${voucher.value}</p>
                            <p><strong>Expiry Date:</strong> ${new Date(voucher.expiryDate).toLocaleDateString()}</p>
                            <p><strong>PIN:</strong> ${voucher.pin}</p>
                            <p><strong>Code:</strong> ${voucher.code}</p>
                          </div>
                        `).join('')}
                      </div>
                    `;

                    // Use html2canvas to create an image
                    import('html2canvas').then(({ default: html2canvas }) => {
                      html2canvas(voucherContent).then(canvas => {
                        const link = document.createElement('a');
                        link.download = `voucher-${voucherData.orderNumber}.png`;
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
    </div>
  );
};



const AuctionWinCardClosed = ({ product }: AuctionProps) => {
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




  const router = useRouter();

  const handleCloseModaldelete = () => {
    setisdeleteModalOpen(false);
  };

  const handleOptionClick = (option: string, transaction: Order) => {
    //   console.log(`${option} clicked for transaction:`, transaction);
    //  console.log(transaction, 'transactionnnnn')


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


    if (option === "winning advise") {
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

  const handleProcessGiftCard = async (auctionId: string, productCode: string) => {


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
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        console.log(data.data.data, "data.data.data")
        console.log(data.data, "data.data")
        setVoucherData(data.data);
        setIsMerchantsModalOpen(false);
        setIsVoucherModalOpen(true);
      } else {
        toast.error(data.message || "Failed to process gift card");
      }
    } catch (error) {
      toast.error("Error processing gift card");
    } finally {
      setIsProcessingGiftCard(false);
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

                  <p>Ticket Price: ₦{val?.ticket_price}</p>

                  <div className="mt-5 flex gap-3 flex-wrap">
                    {val.tag &&
                      val.tag.map((value: string, index: number) => (
                        <p
                          key={index}
                          onClick={() => {

                            if (value === "redeem items") {
                              handleOptionClick("Redeem", val);
                            } else if (value === "winning advise") {
                              handleOptionClick("winning advise", val);
                            }
                          }}
                          className={`text-xs ${!val.won ? "opacity-50 " : ""
                            }${value === "open" || value === "delivered"
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
                          // console.log(selectedTransaction?.auction?.[0]?.auction_id, "selectedTransaction")
                          const auctionId = selectedTransaction?.auction?.[0]?.auction_id;
                          if (auctionId) {
                            handleProcessGiftCard(auctionId, merchant.code);
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
              {/* Voucher content display */}

              {/*   {
                console.log(voucherData, "voucherData")
              }
 */}
              <p>Voucher Code: {voucherData.code}</p>
              <p>Voucher Amount: ₦{voucherData.amount}</p>
              <p>Voucher Expiry: {voucherData.expiry_date}</p>
              <p>Voucher Status: {voucherData.status}</p>
              <p>Voucher Store: {voucherData.store}</p>
              <p>Voucher Description: {voucherData.description}</p>

              <div className="mt-6 flex justify-between gap-4 flex-wrap">
                <DefaultButton
                  text="Download"
                  className="rounded-md bg-[#F25E26] p-2 px-4 text-white"
                  type="button"
                  handleClick={() => {
                    // Create a canvas element
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Set canvas dimensions
                    canvas.width = 600;
                    canvas.height = 400;

                    if (ctx) {
                      // Set background
                      ctx.fillStyle = '#ffffff';
                      ctx.fillRect(0, 0, canvas.width, canvas.height);

                      // Add border
                      ctx.strokeStyle = '#F25E26';
                      ctx.lineWidth = 10;
                      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

                      // Add logo
                      const logo = new window.Image();
                      logo.onload = () => {
                        // Draw logo in top-right corner
                        const logoWidth = 100;
                        const logoHeight = 50;
                        const logoX = canvas.width - logoWidth - 20;
                        const logoY = 20;
                        ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);

                        // Configure text style
                        ctx.fillStyle = '#000000';
                        ctx.font = '24px Arial';
                        ctx.textAlign = 'left';

                        // Add voucher details
                        const padding = 40;
                        const lineHeight = 40;
                        let y = padding + lineHeight;

                        ctx.fillText(`Voucher Code: ${voucherData.code}`, padding, y);
                        y += lineHeight;
                        ctx.fillText(`Amount: ₦${voucherData.amount}`, padding, y);
                        y += lineHeight;
                        ctx.fillText(`Expiry: ${voucherData.expiry_date}`, padding, y);
                        y += lineHeight;
                        ctx.fillText(`Status: ${voucherData.status}`, padding, y);
                        y += lineHeight;
                        ctx.fillText(`Store: ${voucherData.store}`, padding, y);

                        // Create download link
                        const link = document.createElement('a');
                        link.download = `voucher-${voucherData.code}.png`;
                        link.href = canvas.toDataURL();
                        link.click();
                      };
                      logo.src = Brand.src || Brand; // Use the imported Brand variable
                    }
                  }}
                />

                <DefaultButton
                  text="Back"
                  className="rounded-md border-2 border-[#F25E26] p-2 px-4 text-[#F25E26]"
                  type="button"
                  handleClick={() => setIsVoucherModalOpen(false)}
                />
              </div>
            </div>
          </div>
        </ModalProfile>
      )}
    </div>
  );
};



export { AuctionWinCardNew, AuctionWinCardClosed };
