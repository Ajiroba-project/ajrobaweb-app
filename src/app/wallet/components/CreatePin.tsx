import React, { useState, useRef, useEffect } from "react";
import { CustomModal } from "../../component/Modal";
import { DefaultButton } from "@/app/component/Button";
import { InputField } from "@/app/recharge/components/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutateData } from "@/hooks/useMutateNewData";
import { useForm } from "react-hook-form";
import { CreateNewPin } from "./YupValidation";
import { useAuthStore, userProfile } from "@/store/store";
import { toast } from "react-toastify";
import * as yup from 'yup'
import Cookies from 'js-cookie'

export const CreatePin = ({ createPin, setCreatePin }: any) => {
  const { successModal, setSuccessModal } = userProfile((state) => ({
    successModal: state.successModal,
    setSuccessModal: state.setSuccessModal,
  }));

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setCreatePin(false);
      }
    };

    if (createPin) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPin]);

  const CreateNewPin = yup.object().shape({

  newpass: yup
    .string()
    .required('Pin is required')
    .min(6, "Can't be lesser than 6 digits"),
  confirmpass: yup
    .string()
    .oneOf([yup.ref('newpass')], 'Pin must match')
    .required('Pin is required')
})


  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(CreateNewPin),
  });

  const handleSuccess = (data: any) => {
    if (data.status === 201 || data.status === 200) {
      setSuccessModal(!successModal);
      setCreatePin(false);

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

  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

  // const userToken = token;

    const userToken = (Cookies.get("token") as string) || "";

  const { data, error, isError, isSuccess, mutate, status } = useMutateData(
    "createwalletpin",
    handleSuccess,
    handleError,
  );

  const submitForm = (data: any) => {
    console.log(data);
    console.log(error, errors)
     const payload = {
      pin: data?.newpass,
      // pin: data?.newpass,
    };

    mutate({
      url: "/api/createwalletpin",
      payload: { payload: payload, token: userToken },
      token: userToken,
    });
  };

  return (
    <div>
      <CustomModal isOpen={createPin}>
        {createPin && (
          <>
            <div
              ref={modalRef}
              className="flex flex-col items-center justify-center gap-2"
            >
              <h1 className="text-2xl">Create Wallet Pin</h1>
              <p className="w-auto text-center text-sm font-normal leading-6 text-[#353131]">
                Kindly Enter your wallet pin
              </p>

              <form
                onSubmit={handleSubmit(submitForm)}
                className="flex w-full flex-col justify-center gap-3"
              >
                <InputField
                  label={"Enter Pin"}
                  type="password"
                  name="newpass"
                  register={register}
                  errors={errors}
                  classname="w-full p-3 border outline-[#FCDFD4] rounded-lg focus:outline-[#f25e26]"
                />
                <InputField
                  label={"Confirm Pin"}
                  type="password"
                  name="confirmpass"
                  register={register}
                  errors={errors}
                  classname="w-full p-3 border outline-[#FCDFD4] rounded-lg focus:outline-[#f25e26]"
                />

                <DefaultButton
                  text={`${status === "pending" ? "..." : "Confirm"}`}
                  type="submit"
                  className="w-full rounded-md bg-[#FCDFD4] p-3 hover:bg-[#f25e26] hover:text-white"
                />
              </form>
             {/*  {console.log(errors)} */}
            </div>
          </>
        )}
      </CustomModal>
    </div>
  );
};
