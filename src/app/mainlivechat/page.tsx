/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Fragment, Suspense, useEffect, useState, useRef } from "react";
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
import sendmessageicon from '@/app/asset/sendmessageicon.svg'
import sendmessageimageicon from '@/app/asset/sendmessageimageicon.svg'
import emojiicon from '@/app/asset/emojiicon.svg'

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
  const [isEndingChat, setIsEndingChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const hasInitialized = useRef(false);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/admin_chat_info/`;

  const { data: userInfo, isLoading: userLoading } = useGetDatanew(
    url,
    "get_user_details",
    userToken || " ",
  );


  // console.log(userInfo, "userInfo");

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
  const userphoto = userData?.profile_image || "";


  // console.log(userphoto, "userphoto");

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

  // const message = watch("text");

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

  const ChatData = async (isBackgroundRefresh = false) => {
    if (isLoading && !isBackgroundRefresh) return; // Prevent multiple simultaneous calls
    if (isEndingChat) return; // Don't fetch messages if chat is being ended
    
    // Additional check: if we're in a background refresh and chat is ending, abort
    if (isBackgroundRefresh && isEndingChat) {
      // console.log("Aborting background refresh - chat is ending");
      return;
    }
    
    if (isBackgroundRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const headers = {
        Authorization: `token ${userToken}`,
      };

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/messages/`,
        { headers },
      );

      if (response.data.status === "success") {
        const NewMessage: Message[] = response.data.data.map(
          (item: { text: any; image: any; sender_role: any }) => {
            return {
              type: item.sender_role === "client" || item.sender_role === "customer" ? "client" : "admin",
              text: item.text,
              image: item.image,
            };
          },
        );

        setMessages([...NewMessage]);
        setRetryCount(0); // Reset retry count on success
        setIsInitialLoad(false);
      } else {
        const errorMessage = response.data.message || "Failed to load messages";
        setError(errorMessage);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof AxiosError 
        ? error.response?.data?.message || error.response?.data?.statusText || "Network error occurred"
        : "An unexpected error occurred";
      
      setError(errorMessage);
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      // console.error("Error loading messages:", error);
    } finally {
      if (isBackgroundRefresh) {
        setIsRefreshing(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  const submitForm = async (data: ChatFormValues) => {
    if (isSendingMessage) return; // Prevent multiple submissions
    
    setIsSendingMessage(true);
    setError(null);

    try {
      const payload: { text: string; image?: string } = {
        text: data.text,
        ...(selectedImage && { image: selectedImage }),
      };

      const headers = {
        Authorization: `token ${userToken}`,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/send_message/`,
        payload,
        { headers },
      );

      if (response.data.status === "success") {
        // Show success message immediately
        toast.success(`${response.data.message || "Message sent successfully"}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // Clear form immediately
        setSelectedImage(null);
        reset();

        // Refetch messages in the background to get the latest state
        // This ensures we have the most up-to-date messages including any admin responses
        refreshTimeoutRef.current = setTimeout(() => {
          ChatData(true); // Pass true to indicate this is a background refresh
        }, 100); // Small delay to ensure the message is processed on the server
      } else {
        // console.log(response.data, "response.data");
        const errorMessage = response.data.message || "Failed to send message";
        setError(errorMessage);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      // console.log(error, "error----");
      const errorMessage = error instanceof AxiosError 
        ? error.response?.data?.message || error.response?.data?.statusText || "Network error occurred"
        : "An unexpected error occurred";
      
      setError(errorMessage);
      setSelectedImage(null);
      setValue("text", "");
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      // console.error("Error sending message:", error);
    } finally {
      setIsSendingMessage(false);
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
              <HeadingText title="Self Help" />
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
            <div className="md:w-1/2 mt-16 w-full mb-6 md:mb-0 mx-auto flex flex-col items-center text-center">
              <h1 className="text-3xl md:text-4xl font-Poppins font-semibold mb-3 text-[#111111]">
                We &apos; re Here to Help:
              </h1>
              <h2 className="text-base font-semibold font-Poppins text-[#E84526] mb-4">
                Ajiroba Technologies Self Help
              </h2>
              <p className="text-[#353131] text-sm font-Poppins mb-6 leading-relaxed">
                For immediate assistance, click the &apos;Chat Now&apos; button
                below to connect with one of our support representatives or
                check out our comprehensive self-help resources. We &apos; re
                here to help with any questions or issues you may have.
              </p>

              <div className="flex justify-center flex-wrap gap-4 w-full">
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
                  className=" mt-4 font-Poppins px-12 py-2 text-sm border border-[#E84526]  bg-[#ffffff] hover:bg-[#F25E26] hover:text-white text-[#2A2A2A]  font-semibold rounded"
                >
                  Self Help
                </button>
              </div>

              <div className="flex justify-center gap-4 mt-6">
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


            {/* <div className="md:w-1/2 w-full flex justify-center" style={{
              height: ' min-content',
              overflow: 'scroll',
              overflowY: 'scroll',
              overflowX: 'scroll'

            }}>
              <div className="  flex justify-center items-center ">
                <div className=" shadow-md rounded-lg w-full max-w-lg h-full bg-[#fef9f6] " style={{
                  height: '80vh' 
                }}>
                  <div className="px-2 py-4 bg-[#fef9f6]">
                    <div className="p-6 space-y-4 h-full">
                      <div className="flex justify-between flex-wrap items-center 2xl:gap-40 lg:gap-10 md:gap-10 gap-6  xl:gap-40  border border-[#E84526] p-4  ">
                        <div className="flex flex-wrap gap-4  items-center space-x-2">
                          <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}${userphoto}`}
                                className=" rounded-lg mt-1"
                                alt="Profile"
                                width={40}
                                height={40}
                              />
                            </div>
                          </div>
                          <h2 className="font-semibold text-gray-800 text-sm">
                            {userData?.full_name || userData?.firstname}
                          </h2>
                        </div>

                        <div>
                          <button
                            onClick={() => EndChat()}
                            disabled={isEndingChat}
                            className={`text-white text-sm px-4 py-2 rounded-lg ${
                              isEndingChat 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-[#EF5E4A] hover:bg-red-500"
                            }`}
                          >
                            {isEndingChat ? "Ending..." : "End Chat"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        
                        {isInitialLoad && isLoading && (
                          <div className="flex justify-center items-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E84526]"></div>
                            <span className="ml-2 text-gray-600">Loading messages...</span>
                          </div>
                        )}

                        
                        {error && !isLoading && (
                          <div className="flex flex-col items-center justify-center py-8 px-4">
                            <div className="text-red-500 text-center mb-4">
                              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                              <p className="text-sm font-medium">{error}</p>
                            </div>
                            
                          </div>
                        )}

                   
                        {!error && !isInitialLoad && messages.length === 0 && !isLoading && (
                          <div className="flex justify-center items-center py-8">
                            <p className="text-gray-500 text-sm">No messages yet. Start the conversation!</p>
                          </div>
                        )}

                      
                        {isRefreshing && (
                          <div className="flex justify-center items-center py-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#E84526]"></div>
                            <span className="ml-2 text-xs text-gray-500">Updating...</span>
                          </div>
                        )}

                        { messages.map((message, index) => (
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
                                        ? `${process.env.NEXT_PUBLIC_BASE_URL_IMG}${message?.image}`
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
                              className={`focus:outline-none ${
                                error 
                                  ? "text-gray-300 cursor-pointer " 
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                              onClick={() => !error && setShowEmojiPicker(!showEmojiPicker)}
                      
                            >
                              <Image 
                                src={emojiicon} 
                                alt="emojiicon" 
                                className={`h-6 w-6 ${error ? "opacity-50" : ""}`} 
                              />
                            </button>

                            <label
                              htmlFor="image-upload"
                              className={`focus:outline-none ${
                                error 
                                  ? "text-gray-300 cursor-pointer " 
                                  : "text-gray-500 hover:text-gray-700 cursor-pointer"
                              }`}
                            >
                              <Image 
                                src={sendmessageimageicon} 
                                alt="sendmessageimageicon" 
                                className={`h-6 w-6 ${error ? "opacity-50" : ""}`} 
                              />
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
                              placeholder={error ? "Send a message" : "Send a message"}
                              {...register("text")}
                    
                              className={`flex-1 mx-3 px-4 py-2 border rounded-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                error 
                                  ? "bg-gray-100 text-gray-500 cursor-pointer" 
                                  : "text-gray-700"
                              }`}
                            />

                            <button
                              className={`text-white p-2 rounded-full focus:outline-none ${
                                isSendingMessage || error
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "hover:bg-orange-600"
                              }`}
                              type="submit"
                     
                            >
                              {isSendingMessage ? (
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                              ) : (
                                <Image src={sendmessageicon} alt="sendmessageicon" className="h-6 w-6" />
                              )}
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
            </div> */}






          </div>
        </div>
      </main>
      <div className='content-container'>
        <Footer />
      </div>
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
