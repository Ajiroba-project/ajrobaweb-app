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
import chatended from "@/app/asset/image/chatendedicon.png";

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

  const userToken = (Cookies.get("token") as string) || "";

  const chatSchema = yup.object().shape({
    text: yup.string().required("text is required"),
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

    if (!userToken || !tkn_ || !isLoggedIn) {
      toast.error("Please log in to continue.");
      router.push("/livechat");
      return;
    }

    if (isLoggedIn && userInfo?.profile_image_url) {
      setProfileurl(userInfo.profile_image_url);
    }
  }, [isLoggedIn, userInfo, setProfileurl]);

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

  const submitForm = async () => {
    try {
      const headers = {
        Authorization: `token ${userToken}`,
      };

      const response = await axios.get(
        "https://ajiroba.onrender.com/v1/admin/messages/",
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

  useEffect(() => {
    submitForm();
  }, []);

  console.log(messages, "messages");

  return (
    <Fragment>
      <Header />
      <main className=" pb-40   ">
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
                    router.push("/mainlivechat");
                  }}
                  className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-semibold font-Poppins rounded"
                >
                  Chat Now
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

            <div className="md:w-1/2 w-full flex justify-center">
              <div className="  flex justify-center items-center ">
                <div className="bg-white shadow-md rounded-lg w-full max-w-lg">
                  <div className="px-2 py-4 bg-[#fef9f6]">
                    <div className="p-6 space-y-4  ">
                      <div className="flex justify-between flex-wrap items-center 2xl:gap-40 lg:gap-10 md:gap-10 gap-6  xl:gap-40  border border-[#E84526] p-4  ">
                        <div className="flex flex-wrap gap-4  items-center space-x-2">
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
                            disabled={true}
                            className="bg-[#D2D2D2] text-white text-sm px-4 py-2 rounded-lg hover:bg-red-500"
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
                                  /*   src={
                                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    } */
                                      src={message?.image?  `https://ajiroba.onrender.com${message?.image}` : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
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
                                    src={`https://ajiroba.onrender.com${message?.image}`}
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

                      <div
                        className="flex justify-center items-center text-center"
                        style={{ marginBottom: "3rem" }}
                      >
                        <h1 className="text-sm text-[#434343] font-Poppins">
                          You ended the chat!
                        </h1>
                      </div>

                      <div className="bg-[#FFFFFF] shadow-lg px-12 py-4 ">
                        <div className="flex justify-center items-center text-center flex-col gap-4">
                          <div>
                            <Image src={chatended} alt="chaticon" />
                          </div>

                          <div>
                            {" "}
                            <p>Sorry about that</p>
                          </div>

                          <div className=" max-w-[18rem]">
                            <small>
                              Your question has been added to our email queue
                              and we will get back to you shortly.{" "}
                            </small>
                          </div>

                          <div>
                            <button
                              onClick={() => router.back()}
                              className="bg-[#EF5E4A] text-white text-sm px-8 py-2 rounded-lg hover:bg-red-500"
                            >
                              Go Back
                            </button>
                          </div>
                        </div>
                      </div>
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
