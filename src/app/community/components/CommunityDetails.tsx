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
import { AiOutlineClose, AiOutlinePicture } from "react-icons/ai";
import Loading from "@/app/component/Loading";
import { formatDistanceToNow } from "date-fns";
import Cookies from "js-cookie";

type CommentFormValues = {
  comment: string;
  commentImage?: string;
  post_id?: string;
};

const TabComponent = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
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
            className={`w-1/3 py-2 text-center font-Poppins text-sm font-medium border-r-1 ${activeTab === tab
              ? "bg-[#f25e26] text-white rounded-tl-md" // Active tab
              : "bg-white text-[#475367] hover:bg-gray-100" // Inactive tabs
              } ${index === 0 ? "rounded-l-lg" : ""} ${index === tabs.length - 1 ? "rounded-r-lg" : ""
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};


const ITEMS_PER_PAGE = 5;

// const ContentPost = ({ activeTab }: { activeTab: string }) => {
//   const router = useRouter();

//   const commentSchema = yup.object().shape({
//       comment: yup.string().required('Comment is required'),
//   });

//   // State to manage comment input per post
//   const [commentState, setCommentState] = useState({});

//   const {
//       register,
//       handleSubmit,
//       formState: { errors },
//       setValue,
//       reset,
//   } = useForm<CommentFormValues>({
//       resolver: yupResolver(commentSchema),
//   });

//   const handleSuccess = (data?: any) => {
//  /*    console.log(data, 'data') */
//       setComment('');
//       setCommentImage('');
//       setSelectedImage(null);
//       if (data.status === 200 || data.status === 201) {
//           toast.success(`${data?.data?.message || data?.data?.detail}`, {
//               position: 'top-right',
//               autoClose: 2000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: 'light',
//               onClose: () => router.push('/community'),
//           });
//           refetch();
//       } else if (
//           data.status === 403 ||
//           data.status === 404 ||
//           data.status === 401 ||
//           data.status === 409 ||
//           data.status === 500
//       ) {
//           setComment('');
//           setCommentImage('');
//           setSelectedImage(null);
//           toast.error(`${data?.data?.message || data?.data?.detail}`, {
//               position: 'top-right',
//               autoClose: 2000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: 'light',
//           });
//           refetch();
//       } else {
//           setComment('');
//           setCommentImage('');
//           toast.error(`${data?.data?.detail}`, {
//               position: 'top-right',
//               autoClose: 2000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: 'light',
//           });
//           refetch();
//       }
//   };

//   const handleError = (error?: any) => {
//       console.log(error, 'errr');
//       setComment('');
//       setCommentImage('');
//       setSelectedImage(null);
//       toast.error(`${data?.data?.detail || error || 'An Error Occured'}`, {
//           position: 'top-right',
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: 'light',
//       });
//       refetch();
//   };

//   const { isLoggedIn, user, token } = useAuthStore((state) => ({
//       isLoggedIn: state.isLoggedIn,
//       user: state.user,
//       token: state.token,
//   }));

//   // const userToken = token;
//   const userToken = Cookies.get('token') as string;

//   const { data, error, isError, isSuccess, mutate, status } = useMutateData(
//       'comment_on_post',
//       handleSuccess,
//       handleError,
//   );

//   const [comment, setComment] = useState<string>('');
//   const [commentImage, setCommentImage] = useState<string>('');

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//       const file = event.target.files?.[0];
//       if (file) {
//           const reader = new FileReader();
//           reader.onloadend = () => {
//               const base64String = reader.result as string;
//               setSelectedImage(base64String);
//               setValue('commentImage', base64String);
//           };
//           reader.readAsDataURL(file);
//       }
//   };

//   const {
//       data: trendingrinfo,
//       isLoading: trendingLoading,
//       error: trendingerror,
//       refetch,
//   } = useGetOrderData('/api/trendingposts', 'get_trending_posts', userToken);

//   const {
//       data: notinfo,
//       isLoading: notLoading,
//       error: noterror,
//       refetch: notrefetch,
//   } = useGetOrderData(
//       '/api/communitynotifications',
//       'get_trending_posts',
//       userToken,
//   );

//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const onSubmit = (data: CommentFormValues) => {
//       const payload = {
//           post_id: data.post_id,
//           comment: data.comment,
//           comment_images: [data.commentImage],
//       };

//       mutate({
//           url: '/api/commentonpost/',
//           payload: { payload, tkn: userToken },
//           token: userToken,
//       });

//       setComment('');
//       setCommentImage('');
//       reset();
//   };

//   const { mutate: likedmutate, status: likedstatus } = useMutateData(
//       'like_or_unlike_post',
//       handleSuccess,
//       handleError,
//   );

//   const { mutate: dislikedmutate, status: dislikedstatus } = useMutateData(
//       'dislike_post',
//       handleSuccess,
//       handleError,
//   );

//   const { mutate: bookmarkmutate, status: bookmarkedstatus } = useMutateData(
//       'bookmark_post',
//       handleSuccess,
//       handleError,
//   );

//   const { mutate: unbookmarkmutate, status: unbookmarkedstatus } =
//       useMutateData('unbookmark_post', handleSuccess, handleError);

//   const [postLikes, setPostLikes] = useState<{
//       [key: string]: { count: number; liked: boolean };
//   }>({});

//   const handleLike = (postId: string, liked: boolean) => {
//       likedmutate({
//           url: `/api/likepost/`,
//           payload: { post_id: postId, tkn: userToken },
//           token: userToken,
//       });

//   };

//   const handledisLike = (postId: string, liked: boolean) => {
//       dislikedmutate({
//           url: `/api/dislikepost/`,
//           payload: { post_id: postId, tkn: userToken },
//           token: userToken,
//       });
//   };

//   const handleBookMark = (postId: string, liked: boolean) => {
//       bookmarkmutate({
//           url: `/api/bookmark/`,
//           payload: { post_id: postId, tkn: userToken },
//           token: userToken,
//       });
//   };

//   const handleUnBookMark = (postId: string, liked: boolean) => {
//       unbookmarkmutate({
//           url: `/api/unbookmark/`,
//           payload: { post_id: postId, tkn: userToken },
//           token: userToken,
//       });
//   };

//   // Set default content as trending posts
//   let posts = trendingrinfo?.data?.data?.posts || [];

// /*   console.log(posts, 'posttt') */

//   // Conditionally render posts based on active tab
//   if (activeTab === 'Liked') {
//     // console.log(trendingrinfo?.data?.data?.liked_posts, 'liked_posts')
//       posts = trendingrinfo?.data?.data?.liked_posts || [];
//   } else if (activeTab === 'Bookmarked') {
//   /*   console.log(trendingrinfo?.data?.data?.bookmarked_posts, 'bookmarked_posts') */
//       posts = trendingrinfo?.data?.data?.bookmarked_posts || [];
//   }

//   // Normalize shape for Liked/Bookmarked where items may be wrapped under `post`
//   if (activeTab === 'Liked' || activeTab === 'Bookmarked') {
//       posts = (posts || []).map((p: any) => (p && p.post ? p.post : p));
//   }

//   const [paginationState, setPaginationState] = useState<{ [key: string]: number }>({});

//   if (trendingLoading) {
//       return <Loading />;
//   }

//   // Ensure posts array exists
//   if (!posts || posts.length === 0) {
//       return (
//           <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//               <p className="text-gray-500 font-medium">No posts available</p>
//           </div>
//       );
//   }

//   return (
//       <div className="w-full space-y-6">
//           {posts.map((item: { id: any; likes_count: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; is_liked_by_current_user: any; comments: { length: number; slice: (arg0: number, arg1: number) => never[]; }; content: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; images: { image: any; }[]; user_liked: any; comments_count: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; user_bookmarked: any; }) => {
//               const postId = item.id;
//               const postLikeData = postLikes[postId] || {
//                   count: item.likes_count,
//                   liked: item.is_liked_by_current_user,
//               };

//               // Use post-specific pagination state
//               const currentPage = paginationState[postId] || 1;
//               const totalComments = item.comments?.length || 0;
//               const totalPages = Math.ceil(totalComments / ITEMS_PER_PAGE);
//               const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//               const paginatedComments = item.comments?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];

//               return (
//                   activeTab === 'Trending' ? (
//                       <div
//                           key={postId}
//                           className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
//                       >
//                           {/* Post Content */}
//                           <div className="mb-4">
//                               <p className="text-gray-800 text-sm leading-relaxed font-normal">
//                                   {item?.content}
//                               </p>
//                           </div>

//                           {/* Post Image */}
//                           {item?.images?.[0]?.image && (
//                               <div className="mb-4 flex justify-center">
//                                   <div className="w-full max-w-md bg-gray-100 rounded-lg p-8 flex items-center justify-center">
//                                       <Image
//                                           src={`https://staging.ajiroba.ng/media/${item?.images?.[0]?.image}`}
//                                           alt="Post image"
//                                           width={300}
//                                           height={300}
//                                           className="max-w-full h-auto object-contain"
//                                       />
                                      
//                                   </div>
//                               </div>
//                           )}

//                           {/* Engagement Metrics */}
//                           <div className="flex items-center justify-between py-3 border-t border-gray-100">
//                               <button
//                                   className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors"
//                                   onClick={() =>
//                                       !item?.user_liked
//                                           ? handleLike(postId, postLikeData.liked)
//                                           : handledisLike(postId, postLikeData.liked)
//                                   }
//                               >
//                                   <FaThumbsUp
//                                       className={`text-lg ${item?.user_liked ? 'text-[#F56630]' : 'text-gray-500'}`}
//                                   />
//                                   <span className="text-sm font-medium">
//                                       {item?.likes_count} Kudos
//                                   </span>
//                               </button>

//                               <div className="flex items-center gap-2 text-gray-600">
//                                   <FaRegCommentDots className="text-lg" />
//                                   <span className="text-sm font-medium">
//                                       {item?.comments_count} Comments
//                                   </span>
//                               </div>

//                               <button className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors">
//                                   <FaShareAlt className="text-lg" />
//                                   <span className="text-sm font-medium">Share</span>
//                               </button>

//                               <button
//                                   className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors"
//                                   onClick={() =>
//                                       !item?.user_bookmarked
//                                           ? handleBookMark(postId, postLikeData.liked)
//                                           : handleUnBookMark(postId, postLikeData.liked)
//                                   }
//                               >
//                                   <FiBookmark
//                                       className={`text-lg ${item?.user_bookmarked ? 'text-[#F56630]' : 'text-gray-500'}`}
//                                   />
//                                   <span className="text-sm font-medium">Bookmark</span>
//                               </button>
//                           </div>

//                           {/* Comment Input */}
//                           <form
//                               onSubmit={handleSubmit((data) => onSubmit({ ...data, post_id: postId }))}
//                               className="mt-4"
//                           >
//                               <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
//                                   <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//                                       <span className="text-xs text-gray-600">👤</span>
//                                   </div>
//                                   <input
//                                       type="text"
//                                       placeholder="Write your comment"
//                                       {...register('comment')}
//                                       className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-500"
//                                   />
//                                   <div className="flex items-center gap-2">
//                                       <label htmlFor={`imageUpload-${postId}`} className="cursor-pointer">
//                                           <AiOutlinePicture className="text-xl text-gray-500 hover:text-gray-700 transition-colors" />
//                                       </label>
//                                       <input
//                                           type="file"
//                                           id={`imageUpload-${postId}`}
//                                           accept="image/*"
//                                           className="hidden"
//                                           onChange={handleImageUpload}
//                                       />
//                                   </div>
//                               </div>
//                               {errors.comment && (
//                                   <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>
//                               )}

//                               {selectedImage && (
//                                   <div className="mt-3">
//                                       <Image
//                                           src={selectedImage}
//                                           alt="Selected"
//                                           width={80}
//                                           height={80}
//                                           className="w-20 h-20 object-cover rounded-lg"
//                                       />
//                                   </div>
//                               )}
//                           </form>

//                           {/* Comments Section */}
//                           {paginatedComments.length > 0 && (
//                               <div className="mt-6 space-y-4">
//                                   {paginatedComments.map((comment: { id: React.Key | null | undefined; user: { profile_image: any; fullname: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; comment: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
//                                       <div key={comment.id} className="flex gap-3">
//                                           <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
//                                          {/*      <span className="text-xs text-gray-600">👤</span> */}
//                                              <Image
//                                             src={
//                                               comment?.user?.profile_image
//                                                 ? `${comment?.user?.profile_image}`
//                                                 : ""
//                                             }
//                                             alt="Commenter"
//                                             width={40}
//                                             height={40}
//                                             className="rounded-full"
//                                           />
//                                           </div>
//                                           <div className="flex-1">
//                                               <div className="bg-gray-50 rounded-lg p-3">
//                                                   <div className="flex items-center gap-2 mb-1">
//                                                       <span className="font-semibold text-sm text-gray-800">
//                                                           {comment?.user?.fullname}
//                                                       </span>
//                                                   </div>
//                                                   <p className="text-sm text-gray-700 leading-relaxed">
//                                                       {comment?.comment}
//                                                   </p>
//                                               </div>
//                                               <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
//                                                   <button className="flex items-center gap-1 hover:text-[#F56630] transition-colors">
//                                                       <FaThumbsUp className="text-sm" />
//                                                       <span>0 Kudos</span>
//                                                   </button>
//                                                   <button className="flex items-center gap-1 hover:text-[#F56630] transition-colors">
//                                                       <span>Reply</span>
//                                                   </button>
//                                               </div>
//                                           </div>
//                                       </div>
//                                   ))}
//                               </div>
//                           )}

//                           {/* Pagination Controls */}
//                           {totalPages > 1 && (
//                               <div className="mt-6 flex justify-center gap-4">
//                                   <button
//                                       onClick={() =>
//                                           setPaginationState((prevState) => ({
//                                               ...prevState,
//                                               [postId]: Math.max((prevState[postId] || 1) - 1, 1),
//                                           }))
//                                       }
//                                       disabled={currentPage === 1}
//                                       className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors text-sm"
//                                   >
//                                       Previous
//                                   </button>

//                                   <span className="flex items-center px-4 py-2 text-sm font-medium text-gray-600">
//                                       Page {currentPage} of {totalPages}
//                                   </span>

//                                   <button
//                                       onClick={() =>
//                                           setPaginationState((prevState) => ({
//                                               ...prevState,
//                                               [postId]: Math.min(
//                                                   (prevState[postId] || 1) + 1,
//                                                   totalPages,
//                                               ),
//                                           }))
//                                       }
//                                       disabled={currentPage === totalPages}
//                                       className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors text-sm"
//                                   >
//                                       Next
//                                   </button>
//                               </div>
//                           )}
//                       </div>
//                   ) : activeTab === 'Liked' ? (
//                       // Similar structure for Liked posts
//                       <div
//                           key={postId}
//                           className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
//                       >
//                           {/* Render for liked posts - same structure as Trending */}
//                           <div className="mb-4">
//                               <p className="text-gray-800 text-sm leading-relaxed font-normal">
//                                   {item?.content}
//                               </p>
//                           </div>

//                           {item?.images?.[0]?.image && (
//                               <div className="mb-4 flex justify-center">
//                                   <div className="w-full max-w-md bg-gray-100 rounded-lg p-8 flex items-center justify-center">
//                                       <Image
//                                           src={`https://staging.ajiroba.ng/v1/media/${item?.images?.[0]?.image}`}
//                                           alt="Post image"
//                                           width={300}
//                                           height={300}
//                                           className="max-w-full h-auto object-contain"
//                                       />
//                                   </div>
//                               </div>
//                           )}

//                           <div className="flex items-center justify-between py-3 border-t border-gray-100">
//                               <button
//                                   className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors"
//                                   onClick={() =>
//                                       !item?.user_liked
//                                           ? handleLike(postId, postLikeData.liked)
//                                           : handledisLike(postId, postLikeData.liked)
//                                   }
//                               >
//                                   <FaThumbsUp
//                                       className={`text-lg ${item?.user_liked ? 'text-[#F56630]' : 'text-gray-500'}`}
//                                   />
//                                   <span className="text-sm font-medium">
//                                       {item?.likes_count} Kudos
//                                   </span>
//                               </button>

//                               <div className="flex items-center gap-2 text-gray-600">
//                                   <FaRegCommentDots className="text-lg" />
//                                   <span className="text-sm font-medium">
//                                       {item?.comments_count} Comments
//                                   </span>
//                               </div>

//                               <button className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors">
//                                   <FaShareAlt className="text-lg" />
//                                   <span className="text-sm font-medium">Share</span>
//                               </button>

//                               <button
//                                   className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors"
//                                   onClick={() =>
//                                       !item?.user_bookmarked
//                                           ? handleBookMark(postId, postLikeData.liked)
//                                           : handleUnBookMark(postId, postLikeData.liked)
//                                   }
//                               >
//                                   <FiBookmark
//                                       className={`text-lg ${item?.user_bookmarked ? 'text-[#F56630]' : 'text-gray-500'}`}
//                                   />
//                                   <span className="text-sm font-medium">Bookmark</span>
//                               </button>
//                           </div>
//                       </div>
//                   ) : activeTab === 'Bookmarked' ? (
//                       // Similar structure for Bookmarked posts
//                       <div
//                           key={postId}
//                           className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
//                       >
//                           {/* Render for bookmarked posts - same structure as Trending */}
//                           <div className="mb-4">
//                               <p className="text-gray-800 text-sm leading-relaxed font-normal">
//                                   {item?.content}
//                               </p>
//                           </div>

//                           {item?.images?.[0]?.image && (
//                               <div className="mb-4 flex justify-center">
//                                   <div className="w-full max-w-md bg-gray-100 rounded-lg p-8 flex items-center justify-center">
//                                       <Image
//                                           src={`https://staging.ajiroba.ng/v1/media/${item?.images?.[0]?.image}`}
//                                           alt="Post image"
//                                           width={300}
//                                           height={300}
//                                           className="max-w-full h-auto object-contain"
//                                       />
//                                   </div>
//                               </div>
//                           )}

//                           <div className="flex items-center justify-between py-3 border-t border-gray-100">
//                               <button
//                                   className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors"
//                                   onClick={() =>
//                                       !item?.user_liked
//                                           ? handleLike(postId, postLikeData.liked)
//                                           : handledisLike(postId, postLikeData.liked)
//                                   }
//                               >
//                                   <FaThumbsUp
//                                       className={`text-lg ${item?.user_liked ? 'text-[#F56630]' : 'text-gray-500'}`}
//                                   />
//                                   <span className="text-sm font-medium">
//                                       {item?.likes_count} Kudos
//                                   </span>
//                               </button>

//                               <div className="flex items-center gap-2 text-gray-600">
//                                   <FaRegCommentDots className="text-lg" />
//                                   <span className="text-sm font-medium">
//                                       {item?.comments_count} Comments
//                                   </span>
//                               </div>

//                               <button className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors">
//                                   <FaShareAlt className="text-lg" />
//                                   <span className="text-sm font-medium">Share</span>
//                               </button>

//                               <button
//                                   className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors"
//                                   onClick={() =>
//                                       !item?.user_bookmarked
//                                           ? handleBookMark(postId, postLikeData.liked)
//                                           : handleUnBookMark(postId, postLikeData.liked)
//                                   }
//                               >
//                                   <FiBookmark
//                                       className={`text-lg ${item?.user_bookmarked ? 'text-[#F56630]' : 'text-gray-500'}`}
//                                   />
//                                   <span className="text-sm font-medium">Bookmark</span>
//                               </button>
//                           </div>
//                       </div>
//                   ) : (
//                       <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//                           <p className="text-gray-500 font-medium">No data Available</p>
//                       </div>
//                   )
//               );
//           })}
//       </div>
//   );
// };


const ContentPost = ({ activeTab }: { activeTab: string }) => {
    const router = useRouter();

    

    // Per-post state for comment input, image and errors
    const [commentByPost, setCommentByPost] = useState<{ [key: string]: string }>({});
    const [selectedImageByPost, setSelectedImageByPost] = useState<{ [key: string]: string | null }>({});
    const [errorByPost, setErrorByPost] = useState<{ [key: string]: string | null }>({});

    

    const handleSuccess = (data?: any) => {
        setComment('');
        setCommentImage('');
        setSelectedImage(null);
        if (data.status === 200 || data.status === 201) {
            toast.success(`${data?.data?.message || data?.data?.detail}`, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                onClose: () => router.push('/community'),
            });
            refetch();
        } else if (
            data.status === 403 ||
            data.status === 404 ||
            data.status === 401 ||
            data.status === 409 ||
            data.status === 500
        ) {
            setComment('');
            setCommentImage('');
            setSelectedImage(null);
            toast.error(`${data?.data?.message || data?.data?.detail}`, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            refetch();
        } else {
            setComment('');
            setCommentImage('');
            toast.error(`${data?.data?.detail}`, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            refetch();
        }
    };

    const handleError = (error?: any) => {
        console.log(error, 'errr', data, 'daaaattt');
        setComment('');
        setCommentImage('');
        setSelectedImage(null);
        toast.error(`${data?.data?.detail || error || 'An Error Occured'}`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
        refetch();
    };

    const { isLoggedIn, user, token } = useAuthStore((state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        token: state.token,
    }));

    // const userToken = token;
    const userToken = Cookies.get('token') as string;

    const { data, error, isError, isSuccess, mutate, status } = useMutateData(
        'comment_on_post',
        handleSuccess,
        handleError,
    );

    const [comment, setComment] = useState<string>('');
    const [commentImage, setCommentImage] = useState<string>('');

    const handleImageUpload = (postId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setSelectedImageByPost(prev => ({ ...prev, [postId]: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImageForPost = (postId: string) => {
        setSelectedImageByPost(prev => ({ ...prev, [postId]: null }));
    };

    const handleCommentChange = (postId: string, value: string) => {
        setCommentByPost(prev => ({ ...prev, [postId]: value }));
        if (errorByPost[postId]) {
            setErrorByPost(prev => ({ ...prev, [postId]: null }));
        }
    };

    const submitComment = (postId: string) => {
        const text = (commentByPost[postId] || '').trim();
        if (!text) {
            setErrorByPost(prev => ({ ...prev, [postId]: 'Comment is required' }));
            return;
        }
        const image = selectedImageByPost[postId] || '';
        const payload = {
            post_id: postId,
            comment: text,
            comment_images: [image],
        };
        mutate({
            url: '/api/commentonpost/',
            payload: { payload, tkn: userToken },
            token: userToken,
        });
        // Optimistically clear per-post inputs
        setCommentByPost(prev => ({ ...prev, [postId]: '' }));
        setSelectedImageByPost(prev => ({ ...prev, [postId]: null }));
        setErrorByPost(prev => ({ ...prev, [postId]: null }));
    };

    const {
        data: trendingrinfo,
        isLoading: trendingLoading,
        error: trendingerror,
        refetch,
    } = useGetOrderData('/api/trendingposts', 'get_trending_posts', userToken);

    const {
        data: notinfo,
        isLoading: notLoading,
        error: noterror,
        refetch: notrefetch,
    } = useGetOrderData(
        '/api/communitynotifications',
        'get_trending_posts',
        userToken,
    );

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    

    const { mutate: likedmutate, status: likedstatus } = useMutateData(
        'like_or_unlike_post',
        handleSuccess,
        handleError,
    );

    const { mutate: dislikedmutate, status: dislikedstatus } = useMutateData(
        'dislike_post',
        handleSuccess,
        handleError,
    );

    const { mutate: bookmarkmutate, status: bookmarkedstatus } = useMutateData(
        'bookmark_post',
        handleSuccess,
        handleError,
    );

    const { mutate: unbookmarkmutate, status: unbookmarkedstatus } =
        useMutateData('unbookmark_post', handleSuccess, handleError);

    const [postLikes, setPostLikes] = useState<{
        [key: string]: { count: number; liked: boolean };
    }>({});

    const handleLike = (postId: string, liked: boolean) => {
        likedmutate({
            url: `/api/likepost/`,
            payload: { post_id: postId, tkn: userToken },
            token: userToken,
        });
    };

    const handledisLike = (postId: string, liked: boolean) => {
        dislikedmutate({
            url: `/api/dislikepost/`,
            payload: { post_id: postId, tkn: userToken },
            token: userToken,
        });
    };

    const handleBookMark = (postId: string, liked: boolean) => {
        bookmarkmutate({
            url: `/api/bookmark/`,
            payload: { post_id: postId, tkn: userToken },
            token: userToken,
        });
    };

    const handleUnBookMark = (postId: string, liked: boolean) => {
        unbookmarkmutate({
            url: `/api/unbookmark/`,
            payload: { post_id: postId, tkn: userToken },
            token: userToken,
        });
    };

    // Set default content as trending posts
    let posts = trendingrinfo?.data?.data?.posts || [];

  /*   console.log(posts, 'posttt') */

    // Conditionally render posts based on active tab
    if (activeTab === 'Liked') {
        const liked = trendingrinfo?.data?.data?.liked_posts || [];
        // API returns { id, post: {...} } — extract the nested post objects
        posts = liked.map((entry: any) => entry?.post).filter(Boolean);
    } else if (activeTab === 'Bookmarked') {
        const bookmarked = trendingrinfo?.data?.data?.bookmarked_posts || [];
        posts = bookmarked.map((entry: any) => entry?.post).filter(Boolean);
    }

    const [paginationState, setPaginationState] = useState<{ [key: string]: number }>({});

    if (trendingLoading) {
        return <Loading />;
    }

    // Ensure posts array exists
    if (!posts || posts.length === 0) {
        return (
            <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500 font-medium">No posts available</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            {posts.map((item: { id: any; likes_count: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; is_liked_by_current_user: any; comments: { length: number; slice: (arg0: number, arg1: number) => never[]; }; content: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; images: { image: any; }[]; user_liked: any; comments_count: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; user_bookmarked: any; }) => {
                const postId = item.id;
                const postLikeData = postLikes[postId] || {
                    count: item.likes_count,
                    liked: item.is_liked_by_current_user,
                };

                // Use post-specific pagination state
                const currentPage = paginationState[postId] || 1;
                const totalComments = item.comments?.length || 0;
                const totalPages = Math.ceil(totalComments / ITEMS_PER_PAGE);
                const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
                const paginatedComments = item.comments?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];

                return (
                    activeTab === 'Trending' ? (
                        <div
                            key={postId}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                        >
                            {/* Post Content */}
                            <div className="mb-4">
                                <p className="text-gray-800 text-sm leading-relaxed font-normal">
                                    {item?.content}
                                </p>
                            </div>

                            {/* Post Image */}
                            {item?.images?.[0]?.image && (
                                <div className="mb-4 flex justify-center">
                                    <div className="w-full max-w-md bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                                        <Image
                                            src={`https://staging.ajiroba.ng/media/${item?.images?.[0]?.image}`}
                                            alt="Post image"
                                            width={300}
                                            height={300}
                                            className="max-w-full h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Engagement Metrics */}
                            <div className="flex items-center justify-between py-3 border-t border-gray-100">
                                <button
                                    className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors"
                                    onClick={() =>
                                        !item?.user_liked
                                            ? handleLike(postId, postLikeData.liked)
                                            : handledisLike(postId, postLikeData.liked)
                                    }
                                >
                                    <FaThumbsUp
                                        className={`text-lg ${item?.user_liked ? 'text-[#F56630]' : 'text-gray-500'}`}
                                    />
                                    <span className="text-sm font-medium">
                                        {item?.likes_count} Kudos
                                    </span>
                                </button>

                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaRegCommentDots className="text-lg" />
                                    <span className="text-sm font-medium">
                                        {item?.comments_count} Comments
                                    </span>
                                </div>

                                <button className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors">
                                    <FaShareAlt className="text-lg" />
                                    <span className="text-sm font-medium">Share</span>
                                </button>

                                <button
                                    className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors"
                                    onClick={() =>
                                        !item?.user_bookmarked
                                            ? handleBookMark(postId, postLikeData.liked)
                                            : handleUnBookMark(postId, postLikeData.liked)
                                    }
                                >
                                    <FiBookmark
                                        className={`text-lg ${item?.user_bookmarked ? 'text-[#F56630]' : 'text-gray-500'}`}
                                    />
                                    <span className="text-sm font-medium">Bookmark</span>
                                </button>
                            </div>

                            {/* Comment Input */}
                            <form
                                onSubmit={(e) => { e.preventDefault(); submitComment(postId); }}
                                className="mt-4"
                            >
                                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                        <span className="text-xs text-gray-600">👤</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Write your comment"
                                        value={commentByPost[postId] || ''}
                                        onChange={(e) => handleCommentChange(postId, e.target.value)}
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-500"
                                    />
                                    <div className="flex items-center gap-2">
                                        <label htmlFor={`imageUpload-${postId}`} className="cursor-pointer">
                                            <AiOutlinePicture className="text-xl text-gray-500 hover:text-gray-700 transition-colors" />
                                        </label>
                                        <input
                                            type="file"
                                            id={`imageUpload-${postId}`}
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleImageUpload(postId, e)}
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === 'pending'}
                                            className="px-3 py-1 rounded-md text-sm text-white bg-[#F56630] hover:bg-[#E84526] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                                {errorByPost[postId] && (
                                    <p className="text-red-500 text-xs mt-1">{errorByPost[postId]}</p>
                                )}

                                {selectedImageByPost[postId] && (
                                    <div className="mt-3 relative inline-block">
                                        <Image
                                            src={selectedImageByPost[postId] as string}
                                            alt="Selected"
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImageForPost(postId)}
                                            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow text-gray-600 hover:text-gray-800"
                                            aria-label="Remove image"
                                        >
                                            <AiOutlineClose className="text-sm" />
                                        </button>
                                    </div>
                                )}
                            </form>

                            {/* Comments Section */}
                            {paginatedComments.length > 0 && (
                                <div className="mt-6 space-y-4">
                                    {paginatedComments.map((comment: { id: React.Key | null | undefined; user: { profile_image: any; fullname: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; comment: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                                        <div key={comment.id} className="flex gap-3">
                                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs text-gray-600">👤</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="bg-gray-50 rounded-lg p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-semibold text-sm text-gray-800">
                                                            {comment?.user?.fullname}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-700 leading-relaxed">
                                                        {comment?.comment}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                    <button className="flex items-center gap-1 hover:text-[#F56630] transition-colors">
                                                        <FaThumbsUp className="text-sm" />
                                                        <span>0 Kudos</span>
                                                    </button>
                                                    <button className="flex items-center gap-1 hover:text-[#F56630] transition-colors">
                                                        <span>Reply</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="mt-6 flex justify-center gap-4">
                                    <button
                                        onClick={() =>
                                            setPaginationState((prevState) => ({
                                                ...prevState,
                                                [postId]: Math.max((prevState[postId] || 1) - 1, 1),
                                            }))
                                        }
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors text-sm"
                                    >
                                        Previous
                                    </button>

                                    <span className="flex items-center px-4 py-2 text-sm font-medium text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </span>

                                    <button
                                        onClick={() =>
                                            setPaginationState((prevState) => ({
                                                ...prevState,
                                                [postId]: Math.min(
                                                    (prevState[postId] || 1) + 1,
                                                    totalPages,
                                                ),
                                            }))
                                        }
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors text-sm"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : activeTab === 'Liked' ? (
                        // Similar structure for Liked posts
                        <div
                            key={postId}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                        >
                            {/* Render for liked posts - same structure as Trending */}
                            <div className="mb-4">
                                <p className="text-gray-800 text-sm leading-relaxed font-normal">
                                    {item?.content}
                                </p>
                            </div>

                            {item?.images?.[0]?.image && (
                                <div className="mb-4 flex justify-center">
                                    <div className="w-full max-w-md bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                                        <Image
                                            src={`https://staging.ajiroba.ng/media/${item?.images?.[0]?.image}`}
                                            alt="Post image"
                                            width={300}
                                            height={300}
                                            className="max-w-full h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between py-3 border-t border-gray-100">
                                <button
                                    className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors"
                                    onClick={() =>
                                        !item?.user_liked
                                            ? handleLike(postId, postLikeData.liked)
                                            : handledisLike(postId, postLikeData.liked)
                                    }
                                >
                                    <FaThumbsUp
                                        className={`text-lg ${item?.user_liked ? 'text-[#F56630]' : 'text-gray-500'}`}
                                    />
                                    <span className="text-sm font-medium">
                                        {item?.likes_count} Kudos
                                    </span>
                                </button>

                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaRegCommentDots className="text-lg" />
                                    <span className="text-sm font-medium">
                                        {item?.comments_count} Comments
                                    </span>
                                </div>

                                <button className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors">
                                    <FaShareAlt className="text-lg" />
                                    <span className="text-sm font-medium">Share</span>
                                </button>

                                <button
                                    className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors"
                                    onClick={() =>
                                        !item?.user_bookmarked
                                            ? handleBookMark(postId, postLikeData.liked)
                                            : handleUnBookMark(postId, postLikeData.liked)
                                    }
                                >
                                    <FiBookmark
                                        className={`text-lg ${item?.user_bookmarked ? 'text-[#F56630]' : 'text-gray-500'}`}
                                    />
                                    <span className="text-sm font-medium">Bookmark</span>
                                </button>
                            </div>
                        </div>
                    ) : activeTab === 'Bookmarked' ? (
                        // Similar structure for Bookmarked posts
                        <div
                            key={postId}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                        >
                            {/* Render for bookmarked posts - same structure as Trending */}
                            <div className="mb-4">
                                <p className="text-gray-800 text-sm leading-relaxed font-normal">
                                    {item?.content}
                                </p>
                            </div>

                            {item?.images?.[0]?.image && (
                                <div className="mb-4 flex justify-center">
                                    <div className="w-full max-w-md bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                                        <Image
                                            src={`https://staging.ajiroba.ng/media/${item?.images?.[0]?.image}`}
                                            alt="Post image"
                                            width={300}
                                            height={300}
                                            className="max-w-full h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between py-3 border-t border-gray-100">
                                <button
                                    className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors"
                                    onClick={() =>
                                        !item?.user_liked
                                            ? handleLike(postId, postLikeData.liked)
                                            : handledisLike(postId, postLikeData.liked)
                                    }
                                >
                                    <FaThumbsUp
                                        className={`text-lg ${item?.user_liked ? 'text-[#F56630]' : 'text-gray-500'}`}
                                    />
                                    <span className="text-sm font-medium">
                                        {item?.likes_count} Kudos
                                    </span>
                                </button>

                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaRegCommentDots className="text-lg" />
                                    <span className="text-sm font-medium">
                                        {item?.comments_count} Comments
                                    </span>
                                </div>

                                <button className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors">
                                    <FaShareAlt className="text-lg" />
                                    <span className="text-sm font-medium">Share</span>
                                </button>

                                <button
                                    className="flex items-center gap-2 text-gray-600 hover:text-[#F56630] transition-colors"
                                    onClick={() =>
                                        !item?.user_bookmarked
                                            ? handleBookMark(postId, postLikeData.liked)
                                            : handleUnBookMark(postId, postLikeData.liked)
                                    }
                                >
                                    <FiBookmark
                                        className={`text-lg ${item?.user_bookmarked ? 'text-[#F56630]' : 'text-gray-500'}`}
                                    />
                                    <span className="text-sm font-medium">Bookmark</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                            <p className="text-gray-500 font-medium">No data Available</p>
                        </div>
                    )
                );
            })}
        </div>
    );
};






const NotificationSidebar = () => {
  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

  // const userToken = token;
  const userToken = Cookies.get("token") as string;

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

  const ITEMS_PER_PAGE = 10;

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Extract notifications array
  const notifications = notinfo?.data?.data || [];

  // Calculate total pages
  const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);

  // Get paginated notifications
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotifications = notifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);



  return (
    <div className="w-[250px] p-4 bg-white border rounded-lg shadow-md">
      <h4 className="font-semibold text-lg mb-4">Notifications</h4>

      {notinfo?.data?.data?.length === 0 ? (
        <h1>No Data Available</h1>
      ) : (
        paginatedNotifications?.map(
          (item: any, key: React.Key | null | undefined) => {
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
        )
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
              }`}
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
              }`}
          >
            Next
          </button>
        </div>
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

    <section className="md:full mb-6 flex w-full flex-col gap-4 lg:w-[60dvw] lg:flex-row ">
      <div className=" p-4   flex-1 h-max grow">
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
