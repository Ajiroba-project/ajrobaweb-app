import React, { useState } from "react";
import Image from "next/image";
import { FaThumbsUp, FaRegCommentDots, FaShareAlt } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import clock from "../../asset/image/clock.svg";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useAuthStore } from "@/store/store";
import { useMutateData } from "@/hooks/useMutateData";
import { useGetOrderData } from "@/hooks/useGetData";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlinePicture } from "react-icons/ai";
import Loading from "@/app/component/Loading";
import { formatDistanceToNow } from "date-fns";

type CommentFormValues = {
  comment: string;
  commentImage?: string;
  post_id?: string;
};

const TabComponent = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
//   const [activeTab, setActiveTab] = useState<string>("Trending");

  const tabs = ["Trending", "Liked", "Bookmarked"];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-center mb-6  w-full ">
      <div className="flex w-full   rounded-lg border border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
     /*        onClick={() => handleTabClick(tab)} */
      onClick={() => setActiveTab(tab)}
            className={`w-1/3 py-2 text-center font-Poppins text-sm font-medium border-r-1 ${
              activeTab === tab
                ? "bg-[#f25e26] text-white rounded-tl-md" // Active tab
                : "bg-white text-[#475367] hover:bg-gray-100" // Inactive tabs
            } ${index === 0 ? "rounded-l-lg" : ""} ${
              index === tabs.length - 1 ? "rounded-r-lg" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

const ContentPost = ({ activeTab }: { activeTab: string }) => {
  const router = useRouter();

  const commentSchema = yup.object().shape({
    comment: yup.string().required("Comment is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CommentFormValues>({
    resolver: yupResolver(commentSchema),
  });

  const handleSuccess = (data?: any) => {
    setComment("");
    setCommentImage("");
    if (data.status === 200 || data.status === 201) {
      toast.success(`${data?.data?.message || data?.data?.detail}`, {
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
      refetch();
    } else if (
      data.status === 403 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 500
    ) {
      setComment("");
      setCommentImage("");
      toast.error(`${data?.data?.message || data?.data?.detail}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      refetch();
    } else {
      setComment("");
      setCommentImage("");
      toast.error(`${"An Error Occured" || data?.data?.detail}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      refetch();
    }
  };

  const handleError = (error?: any) => {
    setComment("");
    setCommentImage("");
    toast.error(`${data?.data?.detail || error || "An Error Occured"}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    refetch();
  };

  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

  const userToken = token;

  const { data, error, isError, isSuccess, mutate, status } = useMutateData(
    "comment_on_post",
    handleSuccess,
    handleError,
  );

  const [comment, setComment] = useState<string>("");
  const [commentImage, setCommentImage] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        setValue("commentImage", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    data: trendingrinfo,
    isLoading: trendingLoading,
    error: trendingerror,
    refetch,
  } = useGetOrderData("/api/trendingposts", "get_trending_posts", userToken);

  const {
    data: notinfo,
    isLoading: notLoading,
    error: noterror,
    refetch: notrefetch,
  } = useGetOrderData(
    "/api/communitynotifications",
    "get_trending_posts",
    userToken,
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onSubmit = (data: CommentFormValues) => {
    const payload = {
      post_id: data.post_id,
      comment: data.comment,
      comment_images: [data.commentImage],
    };

    mutate({
      url: "/api/commentonpost/",
      payload: { payload: payload, tkn: userToken },
      token: userToken,
    });

    setComment("");
    setCommentImage("");
    reset();
  };

  const { mutate: likedmutate } = useMutateData(
    "like_or_unlike_post",
    handleSuccess,
    handleError,
  );

  const [postLikes, setPostLikes] = useState<{
    [key: string]: { count: number; liked: boolean };
  }>({});

  const handleLike = (postId: string, liked: boolean) => {
    const action = liked ? "unlike" : "likepost";

    /*   likedmutate({
      url: `/api/${action}/`,
      payload: { post_id: postId },
      token: userToken,

    }); */
  };


   // Set default content as trending posts
  let posts = trendingrinfo?.data?.data?.posts || [];
  //  console.log(trendingrinfo?.data?.data?.liked_posts, 'trendinggn')
  //  console.log(posts?.length)

  // Conditionally render posts based on active tab
  if (activeTab === "Liked") {
    posts = trendingrinfo?.data?.data?.liked_posts || [];
  } else if (activeTab === "Bookmarked") {
    posts = trendingrinfo?.data?.data?.bookmarked_posts || [];
  }





    if (trendingLoading ) {
    return <Loading />;
  }

  return (
    <>
  <div className=" w-full">

 {

      posts?.map(
        (item: any, key: React.Key | null | undefined) => {
          const postLikeData = postLikes[item.id] || {
            count: item.likes_count,
            liked: item.is_liked_by_current_user,
          };
        /*   console.log( posts?.length) */


          return (



           activeTab === 'Trending' ?


            <div
              key={key}
              className="flex flex-col gap-4 p-6 border rounded-md bg-white shadow-lg w-full"
            >
              <h3 className=" leading-5 text-sm text-[#252525] font-Poppins font-normal">{item?.content}</h3>
              <div className="w-full flex justify-center py-12 rounded-sm bg-[#F6F6F6]">
                 <Image
                  src={
                    item?.images?.[0]?.image
                      ? `https://ajiroba.onrender.com/media/${item?.images?.[0]?.image}`
                      : ""
                  }
                  alt="Bracelet"
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span
                  className="flex items-center font-Poppins font-normal text-[#252525] text-sm"
                  onClick={() => handleLike(item.id, postLikeData.liked)}
                >
                  <FaThumbsUp
                    className={`mr-1 ${postLikeData.count ? "text-[#F56630]" : "text-gray-500"}`}
                  />
                  {item?.likes_count} Kudos
                </span>
                <span className="flex items-center font-Poppins font-normal text-[#252525] text-sm">
                  <FaRegCommentDots className="mr-1" /> {item?.comments_count}{" "}
                  Comments
                </span>
                <span className="flex items-center font-Poppins font-normal text-[#252525] text-sm">
                  <FaShareAlt className="mr-1" /> Share
                </span>
                <span className="flex items-center font-Poppins font-normal text-[#252525] text-sm">
                  <FiBookmark className="mr-1" /> Bookmark
                </span>
              </div>

              <form
                onSubmit={handleSubmit((data) =>
                  onSubmit({ ...data, post_id: item.id }),
                )}
              >
                <div className="flex items-center gap-2 mt-4 bg-gray-100 p-1 rounded-lg">
                   <Image
                    src={
                      item?.images?.[0]?.image
                        ? `https://ajiroba.onrender.com/media/${item?.images?.[0]?.image}`
                        : ""
                    }
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <input
                    type="text"
                    placeholder="Write your comment"
                    {...register("comment")}
                    className="w-full border-none rounded-lg p-2 focus:outline-none bg-transparent"
                  />
                  <div className="flex gap-2">
                    <label htmlFor="imageUpload">
                      <AiOutlinePicture className="text-2xl cursor-pointer text-gray-500" />
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                {errors.comment && (
                  <p className="text-[#F56630] text-sm">
                    {errors.comment.message}
                  </p>
                )}

                {selectedImage && (
                  <div className="mt-3">
                    <Image
                      src={selectedImage}
                      alt="Selected"
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="flex justify-end ">
                  <button
                    type="submit"
                    className=" mt-3 bg-[#F56630] font-Poppins font-normal text-sm text-white py-2 px-4 rounded-lg"
                  >
                    {status === "pending" ? "loading..." : "Post Comment"}
                  </button>
                </div>
              </form>

              {item?.comments?.map(
                (
                  item: {
                    comment: string;
                    user: any;
                    fullname:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                  },
                  key: React.Key | null | undefined,
                ) => {
                  return (
                    <div key={key} className="mt-4">
                      <div className="flex gap-2 items-start">
                        <Image
                          src={
                            item?.user?.profile_image
                              ? `${item?.user?.profile_image}`
                              : ""
                          }
                          alt="Commenter"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <div className="flex items-center justify-center gap-2">
                            <p className="font-semibold font-Poppins">
                              {item?.user?.fullname}
                            </p>
                            <p className="font-normal font-Poppins text-[#252525] text-sm">{item?.comment}</p>
                          </div>
                          <div className="flex gap-2 mt-1 text-gray-500">
                            <FaThumbsUp className="cursor-pointer font-normal text-sm font-Poppins text-[#252525]" /> 0 Kudos
                            <span className="ml-4 cursor-pointer font-normal text-sm font-Poppins text-[#252525]">Reply</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>




            : activeTab === 'Liked' ?


              <div
              key={key}
              className="flex flex-col gap-4 p-6 border rounded-md bg-white shadow-lg w-full"
            >





                <>
              <h3 className=" leading-5 text-sm text-[#252525] font-Poppins font-normal">{item?.post?.content || 'No data Available'}</h3>
              <div className="w-full flex justify-center py-12 rounded-sm bg-[#F6F6F6]">
                 <Image
                  src={
                    item?.post?.images?.[0]?.image
                      ? `https://ajiroba.onrender.com/media/${item?.post?.images?.[0]?.image}`
                      : ""
                  }
                  alt="Bracelet"
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span
                  className="flex items-center font-Poppins font-normal text-[#252525] text-sm"
                  onClick={() => handleLike(item?.post?.id, postLikeData.liked)}
                >
                  <FaThumbsUp
                    className={`mr-1 ${postLikeData.count ? "text-[#F56630]" : "text-gray-500"}`}
                  />
                  {item?.likes_count} Kudos
                </span>
                <span className="flex items-center font-Poppins font-normal text-[#252525] text-sm">
                  <FaRegCommentDots className="mr-1" /> { item?.post?.comments_count}{" "}
                  Comments
                </span>
                <span className="flex items-center font-Poppins font-normal text-[#252525] text-sm">
                  <FaShareAlt className="mr-1" /> Share
                </span>
                <span className="flex items-center font-Poppins font-normal text-[#252525] text-sm">
                  <FiBookmark className="mr-1" /> Bookmark
                </span>
              </div>

              <form
                onSubmit={handleSubmit((data) =>
                  onSubmit({ ...data, post_id:  item?.id }),
                )}
              >
                <div className="flex items-center gap-2 mt-4 bg-gray-100 p-1 rounded-lg">
                  <Image
                    src={
                      item?.post?.images?.[0]?.image
                        ? `https://ajiroba.onrender.com/media/${item?.post?.images?.[0]?.image}`
                        : ""
                    }
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <input
                    type="text"
                    placeholder="Write your comment"
                    {...register("comment")}
                    className="w-full border-none rounded-lg p-2 focus:outline-none bg-transparent"
                  />
                  <div className="flex gap-2">
                    <label htmlFor="imageUpload">
                      <AiOutlinePicture className="text-2xl cursor-pointer text-gray-500" />
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                {errors.comment && (
                  <p className="text-[#F56630] text-sm">
                    {errors.comment.message}
                  </p>
                )}

                {selectedImage && (
                  <div className="mt-3">
                    <Image
                      src={selectedImage}
                      alt="Selected"
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="flex justify-end ">
                  <button
                    type="submit"
                    className=" mt-3 bg-[#F56630] font-Poppins font-normal text-sm text-white py-2 px-4 rounded-lg"
                  >
                    {status === "pending" ? "loading..." : "Post Comment"}
                  </button>
                </div>
              </form>

              {item?.post?.comments?.map(
                (
                  item: {
                    post: any;
                    comment: string;
                    user: any;
                    fullname:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                  },
                  key: React.Key | null | undefined,
                ) => {
                  return (
                    <div key={key} className="mt-4">
                      <div className="flex gap-2 items-start">
                        <Image
                          src={
                            item?.user?.profile_image
                              ? `${item?.user?.profile_image}`
                              : ""
                          }
                          alt="Commenter"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <div className="flex items-center justify-center gap-2">
                            <p className="font-semibold font-Poppins">
                              {item?.user?.fullname}
                            </p>
                            <p className="font-normal font-Poppins text-[#252525] text-sm">{item?.comment}</p>
                          </div>
                          <div className="flex gap-2 mt-1 text-gray-500">
                            <FaThumbsUp className="cursor-pointer font-normal text-sm font-Poppins text-[#252525]" /> 0 Kudos
                            <span className="ml-4 cursor-pointer font-normal text-sm font-Poppins text-[#252525]">Reply</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                },
              )}



              </>
            </div>





            : activeTab === 'Bookmarked' ?
            <div
              key={key}
              className="flex flex-col gap-4 p-6 border rounded-md bg-white shadow-lg w-full"
            >
              <h3 className=" leading-5 text-sm text-[#252525] font-Poppins font-normal">{item?.post?.content}</h3>
              <div className="w-full flex justify-center py-12 rounded-sm bg-[#F6F6F6]">
                <Image
                  src={
                    item?.post?.images?.[0]?.image
                      ? `https://ajiroba.onrender.com/media/${item?.post?.images?.[0]?.image}`
                      : ""
                  }
                  alt="Bracelet"
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span
                  className="flex items-center font-Poppins font-normal text-[#252525] text-sm"
                  onClick={() => handleLike(item?.post?.id, postLikeData.liked)}
                >
                  <FaThumbsUp
                    className={`mr-1 ${postLikeData.count ? "text-[#F56630]" : "text-gray-500"}`}
                  />
                  {item?.likes_count} Kudos
                </span>
                <span className="flex items-center font-Poppins font-normal text-[#252525] text-sm">
                  <FaRegCommentDots className="mr-1" /> { item?.post?.comments_count}{" "}
                  Comments
                </span>
                <span className="flex items-center font-Poppins font-normal text-[#252525] text-sm">
                  <FaShareAlt className="mr-1" /> Share
                </span>
                <span className="flex items-center font-Poppins font-normal text-[#252525] text-sm">
                  <FiBookmark className="mr-1" /> Bookmark
                </span>
              </div>

              <form
                onSubmit={handleSubmit((data) =>
                  onSubmit({ ...data, post_id:  item?.id }),
                )}
              >
                <div className="flex items-center gap-2 mt-4 bg-gray-100 p-1 rounded-lg">
                  <Image
                    src={
                      item?.post?.images?.[0]?.image
                        ? `https://ajiroba.onrender.com/media/${item?.post?.images?.[0]?.image}`
                        : ""
                    }
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <input
                    type="text"
                    placeholder="Write your comment"
                    {...register("comment")}
                    className="w-full border-none rounded-lg p-2 focus:outline-none bg-transparent"
                  />
                  <div className="flex gap-2">
                    <label htmlFor="imageUpload">
                      <AiOutlinePicture className="text-2xl cursor-pointer text-gray-500" />
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                {errors.comment && (
                  <p className="text-[#F56630] text-sm">
                    {errors.comment.message}
                  </p>
                )}

                {selectedImage && (
                  <div className="mt-3">
                    <Image
                      src={selectedImage}
                      alt="Selected"
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="flex justify-end ">
                  <button
                    type="submit"
                    className=" mt-3 bg-[#F56630] font-Poppins font-normal text-sm text-white py-2 px-4 rounded-lg"
                  >
                    {status === "pending" ? "loading..." : "Post Comment"}
                  </button>
                </div>
              </form>


              {item?.post?.comments?.map(
                (
                  item: {
                    post: any;
                    comment: string;
                    user: any;
                    fullname:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                  },
                  key: React.Key | null | undefined,
                ) => {
                  return (
                    <div key={key} className="mt-4">
                      <div className="flex gap-2 items-start">
                         <Image
                          src={
                            item?.user?.profile_image
                              ? `${item?.user?.profile_image}`
                              : ""
                          }

                          alt="Commenter"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <div className="flex items-center justify-center gap-2">
                            <p className="font-semibold font-Poppins">
                              {item?.user?.fullname}
                            </p>
                            <p className="font-normal font-Poppins text-[#252525] text-sm">{item?.comment}</p>
                          </div>
                          <div className="flex gap-2 mt-1 text-gray-500">
                            <FaThumbsUp className="cursor-pointer font-normal text-sm font-Poppins text-[#252525]" /> 0 Kudos
                            <span className="ml-4 cursor-pointer font-normal text-sm font-Poppins text-[#252525]">Reply</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div> : <p>No data Available</p>
          );
        }
      )



      }
  </div>






    </>
  );
};

const NotificationSidebar = () => {
  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

  const userToken = token;

  const {
    data: notinfo,
    isLoading: notLoading,
    error: noterror,
    refetch: notrefetch,
  } = useGetOrderData(
    "/api/communitynotifications",
    "get_trending_posts",
    userToken,
  );

  return (
    <div className="w-[250px] p-4 bg-white border rounded-lg shadow-md">
      <h4 className="font-semibold text-lg mb-4">Notifications</h4>
      {notinfo?.data?.data?.map(
        (item: any, key: React.Key | null | undefined) => {
          // Convert `date_created` to a human-readable time ago format
          const timeAgo = formatDistanceToNow(new Date(item?.date_created), {
            addSuffix: true,
          });

          return (
            <ul key={key} className="space-y-4 ">
              <li className="pb-4">
                <p className="font-medium">{item.message}</p>
                <span className="text-sm text-gray-500 ">{timeAgo}</span>
              </li>
            </ul>
          );
        },
      )}
    </div>
  );
};

const MainLayout = () => {
      const [activeTab, setActiveTab] = useState<string>("Trending");
  return (
    /*  <div className="flex gap-8 mx-auto max-w-7xl p-4">
       <div className="flex-1 w-auto 2xl:w-[500px] lg:w-[500px] md:w-[500px] sm:w-[500px] " >
         <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />
          <ContentPost activeTab={activeTab} />
      </div>


      <div className="hidden lg:block">
        <NotificationSidebar />
      </div>
    </div> */


      <section className='md:full mb-6 flex w-full flex-col gap-4 lg:w-[60dvw] lg:flex-row '>
      <div className=' p-4   flex-1 h-max grow'>
    <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />
          <ContentPost activeTab={activeTab} />
      </div>
      <div className="  p-4  bg-white ">


           <NotificationSidebar />
      </div>
    </section>


  );
};

export default MainLayout;


