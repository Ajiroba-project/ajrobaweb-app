import React, { useState } from "react";
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
import { useGetOrderWinsData } from "@/hooks/useGetData";
import DropDownAuctionWin from "./DropDownAuctionWin";

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

  // console.log(auctioninfo, 'datatta')

  const productMain = auctioninfo?.data?.data?.all?.map((item: { id: any }) => {
    const isOpen = auctioninfo?.data?.data?.open?.some(
      (openItem: { id: any }) => openItem.id === item.id,
    );
    const isClosed = auctioninfo?.data?.data?.closed?.some(
      (closedItem: { id: any }) => closedItem.id === item.id,
    );

    let tag;
    if (isOpen) tag = "open";
    else if (isClosed) tag = "close";
    else tag = "unknown";

    return { ...item, tag: [tag] };
  });

  // console.log(productMain, 'productmainnnn')

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

    if (option === "Purchase Order") {
      setSelectedTransactiondelete(transaction);
      console.log(transaction, "transaction", "Purchhhh");
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
  // const userToken = token;

  const handleSuccess = (data: any) => {
    Setreviewerror("");
    reset();

    if (data.status === 201 || data.status === 200 || data.status === 204) {
      console.log(data, "data");
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
                <div className="relative  flex gap-4 border p-3 flex-wrap h-[120px]">
                  {" "}
                  {/* Container height control */}
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
    </div>
  );
};
