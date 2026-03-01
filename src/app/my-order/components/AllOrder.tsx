"use client";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import Dropdown from "./Dropdown";
import { ModalProfile } from "./ModalProfile";
import Verify from "@/app/asset/verify.svg";
import { Modal } from "@/app/component/Modal";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  InputField,
  InputFieldRounded,
} from "@/app/recharge/components/FormField";
import { DefaultButton } from "@/app/component/Button";
// import { useMutateData } from "@/hooks/useMutateData";
import { useAuthStore } from "@/store/store";
import * as yup from "yup";
import { FaStar } from "react-icons/fa";
import { useMutateData } from "@/hooks/useMutateNewData";
import { RiH1 } from "react-icons/ri";
import Cookies from "js-cookie";
import { formatCurrency } from "@/utils/formatCurrency";

type Product = {
  name: string;
};

type Order = {
  order_id: string;
  products: Product[];
  total_price: string;
  order_date: string;
  delivery_status: string;
};

type transacProps = {
  transac: Order[];
};

export const AllOrder = ({ transac }: transacProps) => {
  const [success, setSuccess] = useState(false);
  const [successdelete, setSuccessdelete] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewerror, Setreviewerror] = useState("");
  const [reviewerrordelete, Setreviewerrordelete] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isdeleteModalOpen, setisdeleteModalOpen] = useState(false);
  const [isSussessModal, setisSucceessModal] = useState(false);

  //  console.log(transac, 'transacc')

  const router = useRouter();

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseModaldelete = () => {
    setisdeleteModalOpen(false);
  };

  const ChangePass = yup.object().shape({
    review: yup.string().required("Review is required"),
  });

  const [selectedTransaction, setSelectedTransaction] = useState<Order | null>(
    null,
  );
  const [selectedTransactiondelete, setSelectedTransactiondelete] =
    useState<Order | null>(null);

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
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(ChangePass),
  });

  const Closefunc = () => {
    setModalOpen(false);
    setSuccess(false);
    setSelectedRating(0);
    reset();
    Setreviewerror("");
  };

  const Closefuncdelete = () => {
    setisdeleteModalOpen(false);
    setSuccessdelete(false);
    // setSelectedRating(0);
    reset();
    Setreviewerrordelete("");
  };

  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

  const userToken = Cookies.get("token") as string;

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

  const submitForm = async (data: any, event: any) => {
    event.preventDefault();

    if (selectedRating <= 0) {
      Setreviewerror("Please select a rating before submitting");
      return;
    }

    if (!selectedTransaction) {
      toast.error("No transaction selected", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const payload = {
      review: data?.review,
      rating: selectedRating,
      order_Id: selectedTransaction.order_id,
    };

    /* console.log(payload, "Payload being submitted"); */

    mutate({
      url: "/api/revieworder",
      payload: { payload: payload, token: userToken },
      token: userToken,
    });
  };

  const {
    reset: resetDeleteForm,
    register: registerDeleteForm,
    handleSubmit: handleSubmitDelete,
    formState: { errors: deleteErrors },
  } = useForm({
    mode: "all",
    // resolver: yupResolver(/* your delete form schema */),
  });

  const submitFormdelete = async (data: any, event: any) => {
    event.preventDefault();



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

  return transac?.map((val, index) => (
    <>
      {transac?.length === 0 ? (
        <h1 className="text-black flex justify-center items-start text-center">
          No Available Order{" "}
        </h1>
      ) : (
        <tr key={index} className="border-b">
          <td className="py-3 px-4 text-left text-[12px] text-[#344054] font-Poppins font-medium">
            {val?.order_id}
          </td>
          <td className="py-3 px-4 text-left text-[12px] text-[#344054] font-Poppins font-medium">
            {val.products.map((product, idx) => (
              <span key={idx}>
                {product.name}
                {idx < val.products.length - 1 ? ", " : ""}
              </span>
            ))}
          </td>
          <td className="py-3 px-4 text-left text-[12px] text-[#344054] font-Poppins font-medium">
            {formatCurrency(val.total_price)}
          </td>
          <td className="py-3 px-4 text-left text-[12px] text-[#344054] font-Poppins font-medium">
            {new Date(val.order_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </td>
          <td className="py-3 px-4 text-left text-[12px] text-[#344054] font-Poppins font-medium">
            <span
              className={`text-[12px] text-[#344054] font-Poppins font-medium ${
                val.delivery_status.toLowerCase() === "pending"
                  ? "bg-[#D0D5DD] text-gray-800"
                  : val.delivery_status.toLowerCase() === "completed"
                    ? "bg-green-200 text-emerald-800"
                    : val.delivery_status.toLowerCase() === "delivered"
                      ? "bg-lime-200 text-emerald-800"
                      : "bg-green-200 text-emerald-800"
              } rounded-full px-3 py-1 capitalize`}
            >
              {val.delivery_status}
            </span>
          </td>
          <td className="py-3 px-2 text-right">
            <Dropdown
              onOptionClick={(option) => handleOptionClick(option, val)}
              transaction={val}
            />
          </td>
        </tr>
      )}

      {isModalOpen && (
        <ModalProfile
          icon={""}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Write Review"
          handleEvent={handleCloseModal}
        >
          <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
            <div>
              <InputFieldRounded
                label=""
                type="text"
                placeholder="Type in your review here"
                name="review"
                register={register}
                errors={errors}
              />
            </div>

            <p className="flex justify-center text-left py-8">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  onClick={() => {
                    setSelectedRating(index + 1);
                    Setreviewerror("");
                  }}
                >
                  <FaStar
                    className={
                      /*   index < selectedRating ? "text-[#F25E26]" : "text-gray-400" */
                      index < selectedRating
                        ? "text-gray-400"
                        : "text-[#F25E26]"
                    }
                  />
                </span>
              ))}
            </p>
            {reviewerror && (
              <p className=" text-red-400 text-sm text-center ">
                {reviewerror}
              </p>
            )}

            <div className="mt-5 flex gap-4 justify-center">
              <DefaultButton
                text={status === "pending" ? "loading..." : "Submit"}
                className="rounded-md bg-[#F25E26] p-2 px-4 text-white"
                type="submit"
              />

              <DefaultButton
                text="Cancel"
                className="rounded-md border-2 border-[#F25E26] p-2 text-[#F25E26]"
                type="button"
                handleClick={Closefunc}
              />
            </div>
          </form>
        </ModalProfile>
      )}

      {/*  success &&

      <Modal
          title='Successful'
          buttoncount={1}
          icon={Verify}
          buttontype='button'
          buttonclass='w-full rounded-md bg-[#FCDFD4] p-4 hover:bg-[#F25E26] hover:text-white'
          buttontext='Continue'
          handleEvent={Closefunc}
        /> */}

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
    </>
  ));
};
