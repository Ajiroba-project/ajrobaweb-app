/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Fragment, Suspense, useEffect, useState } from "react";
import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import { HeadingText } from "../component/Heading";
import { FaWhatsapp } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Image from "next/image";
import mesager from "@/app/asset/image/messager.png";
import ing from "@/app/asset/image/instagram.png";
import gmail from "@/app/asset/image/gmail.png";
import "./style.css";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutateData } from "@/hooks/useMutateData";
import axios, { AxiosError } from "axios";
import { profilePhoto, useAuthStore, userProfile } from "@/store/store";
import { useGetDatanew } from "@/hooks/useGetData";

type ChatFormValues = {
  text: string;
  image?: string;
};

interface Message {
  type: "client" | "admin";
  text: string;
  image?: string;
}

const LiveChatPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const userToken = (Cookies.get("token") as string) || "";

  const chatSchema = yup.object().shape({
    text: yup.string().required("text is required"),
    //   image: yup.string().notRequired(),
  });

  const { userDetails } = userProfile((state) => ({
    userDetails: state.userDetails,
  }));

  const { profileurl, setProfileurl } = profilePhoto((state) => ({
    profileurl: state.profileurl,
    setProfileurl: state.setProfileurl,
  }));

  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/view_profile/`;

  const { data: userInfo, isLoading: userLoading } = useGetDatanew(
    url,
    "get_user_details",
    userToken || " ",
  );

  useEffect(() => {
    const tkn_: string = Cookies.get("token") as string;

    if (!userToken) {
      toast.error("Please log in to continue.");
      router.push("/livechat");
      return;
    }

    if (isLoggedIn && userInfo?.profile_image_url) {
      setProfileurl(userInfo.profile_image_url);
    }
  }, [isLoggedIn, userInfo, setProfileurl, userToken, router]);

  const userData = isLoggedIn ? userInfo?.data : userDetails;
  const userphoto = profileurl || userDetails?.profile_image_url || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
    reset,
  } = useForm<ChatFormValues>({
    resolver: yupResolver(chatSchema),
  });

  const message = watch("text");

  const onEmojiClick = (emojiObject: any) => {
    const currentText = getValues("text") || "";
    setValue("text", currentText + emojiObject.emoji);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const ChatData = async () => {
    try {
      const headers = {
        Authorization: `token ${userToken}`,
      };

      const response = await axios.get(
        "https://staging.ajiroba.ng/v1/admin/messages/",
        { headers },
      );

      if (response.data.status === "success") {
        const NewMessage: Message[] = response.data.data.map(
          (item: { text: any; image: any; sender_role: any }) => {
            return {
              type: item.sender_role === "client" ? "client" : "admin",
              text: item.text,
              image: item.image,
            };
          },
        );

        setMessages([...NewMessage]);

        toast.success(`${response.data.message || "Success"}`, {
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
        alert("Failed to send message: " + response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error sending message:", error);
        toast.error(`${error.response?.data?.message || "An Error Occured"}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };

  const submitForm = async (data: ChatFormValues) => {
    try {
      /*  const payload = {
      text: data.text,
      image: selectedImage,
    }; */

      const payload: { text: string; image?: string } = {
        text: data.text,
        ...(selectedImage && { image: selectedImage }), // Include 'image' only if 'selectedImage' exists
      };

      const headers = {
        Authorization: `token ${userToken}`,
      };

      const response = await axios.post(
        "https://staging.ajiroba.ng/v1/admin/send_message/",
        payload,
        { headers },
      );

      /*    console.log(response.data, "response.data");
         console.log(response, "response"); */
      if (response.data.status === "success") {
        const newMessage: Message = {
          type: "client",
          text: response.data.data.text,
          image: response.data.data.image,
        };

        ChatData();

        toast.success(`${response.data.message || "Success"}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setSelectedImage(null);
        reset();
      } else {
        alert("Failed to send message: " + response.data.message);
        ChatData();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.message, "errr");
        setSelectedImage(null);
        setValue("text", "");
        console.error("Error sending message:", error);
        toast.error(`${error.response?.data?.message || "An Error Occured"}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        ChatData();
      } else {
        console.log("An unexpected error occurred:", error);
        ChatData();
      }
    }
  };





  useEffect(() => {
    if (userToken) {
      ChatData();
    }
  }, [userToken]);



  const EndChat = async () => {
    try {
      const headers = {
        Authorization: `token ${userToken}`,
      };

      const response = await axios.put(
        "https://staging.ajiroba.ng/v1/admin/end_chat/",
        {}, // No body for this request
        { headers } // Pass headers here
      );

      if (response.data.status === "success") {
        toast.success(`${response.data.message || "Success"}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => router.push("/chatended"),
        });
      } else {
        alert("Failed to end chat: " + response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error ending chat:", error);
        toast.error(`${error.response?.data?.detail || "An Error Occurred"}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };



  return (
    <Fragment>
      <Header />
      <main className="">
        <div className=" bg-[#F6F6F6] py-4">
          <div className="">
            <p
              onClick={() => router.back()}
              className="text-[#F25E26] underline "
              style={{
                margin: "0 auto",
                width: "90%",
                maxWidth: "100%",
              }}
            >
              Back
            </p>
            <div className="text-center">
              <HeadingText title="Live Chat" />
            </div>
          </div>
        </div>

        <div
          style={{
            margin: "0 auto",
            width: "94%",
            maxWidth: "100%",

          }}
          className=" flex justify-center items-center bg-gray-50 "
        >
          <div className="bg-white  gap-12 flex flex-col md:flex-row  p-8 w-full ">
            <div className="md:w-1/2 mt-24 w-full mb-6 md:mb-0 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-Poppins font-semibold mb-3 text-[#111111]">
                We &apos; re Here to Help:
              </h1>
              <h2 className="text-base font-semibold font-Poppins text-[#E84526] mb-4">
                Ajiroba Technologies Live Chat
              </h2>
              <p className="text-[#353131] text-sm font-Poppins mb-6 leading-relaxed">
                For immediate assistance, click the &apos;Chat Now&apos; button
                below to connect with one of our support representatives or
                check out our comprehensive self-help resources. We &apos; re
                here to help with any questions or issues you may have.
              </p>

              <div className="flex justify-center md:justify-start flex-wrap space-x-4">
                <button
                  onClick={() => {
                    router.push('/livechat');
                  }}
                  className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-semibold font-Poppins rounded"
                >
                  Go Back
                </button>
                <button
                  onClick={() => {
                    router.push("/selfhelp");
                  }}
                  className=" mt-4 font-Poppins px-12 py-2 text-sm border border-[#E84526]  bg-[#ffffff] hover:[#FCDFD4] text-[#2A2A2A]  font-semibold rounded"
                >
                  Self Help
                </button>
              </div>

              <div className="flex justify-center md:justify-start space-x-4 mt-6">
                <a href="#" aria-label="WhatsApp">
                  <FaWhatsapp color="#60d669" className="h-8 w-8" />
                </a>
                <a href="#" aria-label="Messenger">
                  <Image src={mesager} alt="livechathome" className="h-8 w-8" />
                </a>
                <a href="#" aria-label="Instagram">
                  <Image
                    src={ing}
                    alt="livechathome"
                    className=" h-6 w-6 mt-1"
                  />
                </a>
                <a href="#" aria-label="Gmail">
                  <Image src={gmail} alt="livechathome" className=" h-8 w-8" />
                </a>
              </div>
            </div>

            <div className="md:w-1/2 w-full flex justify-center" style={{
              height: ' min-content',
              overflow: 'scroll',
              overflowY: 'scroll',
              overflowX: 'scroll'

            }}>
              <div className="  flex justify-center items-center ">
                <div className="bg-white shadow-md rounded-lg w-full max-w-lg" style={{
                  height: '80vh'
                }}>
                  <div className="px-2 py-4 bg-[#fef9f6]">
                    <div className="p-6 space-y-4  ">
                      <div className="flex justify-between flex-wrap items-center 2xl:gap-40 lg:gap-10 md:gap-10 gap-6  xl:gap-40  border border-[#E84526] p-4  ">
                        <div className="flex flex-wrap gap-4  items-center space-x-2">
                          {/*  <img
                            src="https://via.placeholder.com/40"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                          /> */}

                          <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                              <Image
                                src={userphoto}
                                className=" rounded-lg mt-1"
                                alt="Profile"
                                width={40}
                                height={40}
                              />
                            </div>
                          </div>
                          <h2 className="font-semibold text-gray-800 text-sm">
                            {userData?.first_name || userData?.firstname}
                          </h2>
                        </div>

                        <div>
                          <button
                            onClick={() => EndChat()}
                            className="bg-[#EF5E4A] text-white text-sm px-4 py-2 rounded-lg hover:bg-red-500"
                          >
                            End Chat
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`chat ${message.type === "admin" ? "chat-start" : "chat-end"} mb-4 `}
                          >
                            {message.type === "admin" && (
                              <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                  <Image
                                    alt="Admin Avatar"
                                    src={
                                      message?.image
                                        ? `https://staging.ajiroba.ng${message?.image}`
                                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    }
                                    width={24}
                                    height={24}
                                  />
                                </div>
                              </div>
                            )}
                            <div
                              className={`bubble ${message.type === "admin" ? "bubble-bottom-left" : "bubbleright bubbleright-bottom-right"} mb-2 `}
                            >
                              {message.text}
                              {/*   {message.image && (
                                <div className="mt-2 flex justify-end">
                                  <Image
                                    alt="Admin Avatar"
                                    src={`https://staging.ajiroba.ng${message?.image}`}
                                    width={24}
                                    height={24}
                                    className="w-24 h-24 object-cover rounded-md border"
                                  />
                                </div>
                              )} */}
                            </div>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleSubmit(submitForm)}>
                        <div
                          className="flex flex-col"
                          style={{
                            marginTop: "3rem",
                          }}
                        >
                          {selectedImage && (
                            <div className="mb-2 flex justify-end">
                              <Image
                                alt="selected Image"
                                src={selectedImage}
                                className="w-24 h-24 object-cover rounded-md border"
                                width={24}
                                height={24}
                              />
                            </div>
                          )}

                          <div className="flex items-center border-t border-gray-300 p-3 bg-white sm:space-x-2 space-x-1">
                            <button
                              type="button"
                              className="text-gray-500 hover:text-gray-700 focus:outline-none"
                              onClick={() =>
                                setShowEmojiPicker(!showEmojiPicker)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 15v2m0 4h.01M4 12h16M4 6h16m-6 12h6m-6-6h6"
                                />
                              </svg>
                            </button>

                            <label
                              htmlFor="image-upload"
                              className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 12v6m0 0v2m6-6v6m0 0h-6"
                                />
                              </svg>
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/* "
                                className="hidden"
                                {...register("image")}
                                onChange={handlePhotoUpload}
                              />
                            </label>

                            <input
                              type="text"
                              placeholder="Send a message"
                              {...register("text")}
                              className="flex-1 mx-3 px-4 py-2 border rounded-full text-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />

                            <button
                              className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 focus:outline-none"
                              type="submit"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M20 12H4m8 0l6 6m-6-6l6-6"
                                />
                              </svg>
                            </button>
                          </div>

                          {errors.text && (
                            <small className="text-[#F56630] text-sm items-center flex justify-center">
                              {errors.text.message}
                            </small>
                          )}

                          {showEmojiPicker && (
                            <div className="">
                              <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default function Searchbar() {
  return (
    <Suspense>
      <LiveChatPage />
    </Suspense>
  );
}
