import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FaThumbsUp, FaRegCommentDots } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/store";
import { useMutateData } from "@/hooks/useMutateData";
import { useGetOrderData } from "@/hooks/useGetData";
import { AiOutlineClose, AiOutlinePicture } from "react-icons/ai";
import Loading from "@/app/component/Loading";
import { formatDistanceToNow } from "date-fns";
import Cookies from "js-cookie";

const TabComponent = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  //   const [activeTab, setActiveTab] = useState<string>("Trending");

  const tabs = ["Trending", "Liked", "Bookmarked"];

  return (
    <div className="mb-6 w-full">
      <div className="flex w-full gap-1 rounded-lg border border-gray-300 bg-white p-1 sm:gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-md py-2 px-2 text-center font-Poppins text-xs font-medium transition-colors sm:px-3 sm:text-sm ${activeTab === tab
              ? "bg-[#f25e26] text-white shadow-sm"
              : "bg-transparent text-[#475367] hover:bg-gray-100"
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

type PostMeta = {
  likesCount: number;
  liked: boolean;
  bookmarked: boolean;
  commentsCount: number;
};

const TOAST_OPTIONS = {
  position: "top-right" as const,
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined as undefined,
  theme: "light" as const,
};

const ContentPost = ({ activeTab }: { activeTab: string }) => {
  // Per-post state for comment input, image and errors
  const [commentByPost, setCommentByPost] = useState<Record<string, string>>({});
  const [selectedImageByPost, setSelectedImageByPost] = useState<
    Record<string, string | null>
  >({});
  const [errorByPost, setErrorByPost] = useState<Record<string, string | null>>(
    {},
  );
  const [postMeta, setPostMeta] = useState<Record<string, PostMeta>>({});
  const [paginationState, setPaginationState] = useState<Record<string, number>>(
    {},
  );
  const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
  const [bookmarkLoading, setBookmarkLoading] = useState<Record<string, boolean>>(
    {},
  );
  const [commentLoading, setCommentLoading] = useState<Record<string, boolean>>(
    {},
  );

  const userToken = Cookies.get("token") as string;

  const { mutateAsync: commentMutateAsync } = useMutateData("comment_on_post");
  const { mutateAsync: likeMutateAsync } = useMutateData("like_or_unlike_post");
  const { mutateAsync: dislikeMutateAsync } = useMutateData("dislike_post");
  const { mutateAsync: bookmarkMutateAsync } = useMutateData("bookmark_post");
  const { mutateAsync: unbookmarkMutateAsync } = useMutateData(
    "unbookmark_post",
  );

  const {
    data: trendingResponse,
    isLoading: trendingLoading,
    error: trendingError,
    refetch,
  } = useGetOrderData("/api/trendingposts", "get_trending_posts", userToken);

  const buildMetaFromPost = (post: any): PostMeta => ({
    likesCount: Number(post?.likes_count ?? 0),
    liked: Boolean(post?.user_liked ?? post?.is_liked_by_current_user),
    bookmarked: Boolean(post?.user_bookmarked),
    commentsCount: Number(
      post?.comments_count ?? post?.comments?.length ?? 0,
    ),
  });

  const posts = useMemo(() => {
    if (activeTab === "Liked") {
      const liked = trendingResponse?.data?.data?.liked_posts || [];
      return liked.map((entry: any) => entry?.post).filter(Boolean);
    }
    if (activeTab === "Bookmarked") {
      const bookmarked = trendingResponse?.data?.data?.bookmarked_posts || [];
      return bookmarked.map((entry: any) => entry?.post).filter(Boolean);
    }
    return trendingResponse?.data?.data?.posts || [];
  }, [trendingResponse, activeTab]);

  useEffect(() => {
    if (!posts || posts.length === 0) {
      setPostMeta({});
      return;
    }

    setPostMeta((prev) => {
      const next: Record<string, PostMeta> = {};
      let hasChanges = posts.length !== Object.keys(prev).length;

      posts.forEach((post: any) => {
        const postId = String(post?.id);
        const serverMeta = buildMetaFromPost(post);
        const existing = prev[postId];

        if (
          !existing ||
          existing.likesCount !== serverMeta.likesCount ||
          existing.liked !== serverMeta.liked ||
          existing.bookmarked !== serverMeta.bookmarked ||
          existing.commentsCount !== serverMeta.commentsCount
        ) {
          hasChanges = true;
          next[postId] = serverMeta;
        } else {
          next[postId] = existing;
        }
      });

      return hasChanges ? next : prev;
    });
  }, [posts, activeTab]);

  const handleImageUpload = (
    postId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImageByPost((prev) => ({
          ...prev,
          [postId]: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImageForPost = (postId: string) => {
    setSelectedImageByPost((prev) => ({ ...prev, [postId]: null }));
  };

  const handleCommentChange = (postId: string, value: string) => {
    setCommentByPost((prev) => ({ ...prev, [postId]: value }));
    if (errorByPost[postId]) {
      setErrorByPost((prev) => ({ ...prev, [postId]: null }));
    }
  };

  const getErrorMessage = (error: any, fallback: string) =>
    error?.message ||
    error?.data?.message ||
    error?.data?.detail ||
    error?.data?.data?.detail ||
    fallback;

  const toggleLike = async (post: any) => {
    const postId = String(post?.id);
    const currentMeta = postMeta[postId] ?? buildMetaFromPost(post);
    const previousMeta: PostMeta = { ...currentMeta };

    const nextLiked = !currentMeta.liked;
    const nextLikesCount = Math.max(
      0,
      currentMeta.likesCount + (nextLiked ? 1 : -1),
    );

    setPostMeta((prev) => ({
      ...prev,
      [postId]: {
        ...currentMeta,
        liked: nextLiked,
        likesCount: nextLikesCount,
      },
    }));
    setLikeLoading((prev) => ({ ...prev, [postId]: true }));

    try {
      const mutationFn = nextLiked ? likeMutateAsync : dislikeMutateAsync;
      const response = await mutationFn({
        url: nextLiked ? "/api/likepost/" : "/api/dislikepost/",
        payload: { post_id: postId, tkn: userToken },
        token: userToken,
      });

      const successMessage =
        response?.message ||
        response?.data?.message ||
        (nextLiked ? "Post liked" : "Like removed");

      toast.success(successMessage, TOAST_OPTIONS);
      refetch();
    } catch (error: any) {
      setPostMeta((prev) => ({
        ...prev,
        [postId]: previousMeta,
      }));
      const message = getErrorMessage(
        error,
        nextLiked ? "Unable to like this post" : "Unable to unlike this post",
      );
      toast.error(message, TOAST_OPTIONS);
    } finally {
      setLikeLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const toggleBookmark = async (post: any) => {
    const postId = String(post?.id);
    const currentMeta = postMeta[postId] ?? buildMetaFromPost(post);
    const previousMeta: PostMeta = { ...currentMeta };
    const nextBookmarked = !currentMeta.bookmarked;

    setPostMeta((prev) => ({
      ...prev,
      [postId]: {
        ...currentMeta,
        bookmarked: nextBookmarked,
      },
    }));
    setBookmarkLoading((prev) => ({ ...prev, [postId]: true }));

    try {
      const mutationFn = nextBookmarked
        ? bookmarkMutateAsync
        : unbookmarkMutateAsync;
      const response = await mutationFn({
        url: nextBookmarked ? "/api/bookmark/" : "/api/unbookmark/",
        payload: { post_id: postId, tkn: userToken },
        token: userToken,
      });

      const successMessage =
        response?.message ||
        response?.data?.message ||
        (nextBookmarked ? "Post bookmarked" : "Bookmark removed");

      toast.success(successMessage, TOAST_OPTIONS);
      refetch();
    } catch (error: any) {
      setPostMeta((prev) => ({
        ...prev,
        [postId]: previousMeta,
      }));
      const message = getErrorMessage(
        error,
        nextBookmarked
          ? "Unable to bookmark this post"
          : "Unable to remove bookmark",
      );
      toast.error(message, TOAST_OPTIONS);
    } finally {
      setBookmarkLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const submitComment = async (post: any) => {
    const postId = String(post?.id);
    const text = (commentByPost[postId] || "").trim();

    if (!text) {
      setErrorByPost((prev) => ({ ...prev, [postId]: "Comment is required" }));
      return;
    }

    const selectedImage = selectedImageByPost[postId];
    const commentPayload = {
      post_id: postId,
      comment: text,
      comment_images: selectedImage ? [selectedImage] : [],
    };

    setCommentLoading((prev) => ({ ...prev, [postId]: true }));

    try {
      const response = await commentMutateAsync({
        url: "/api/commentonpost/",
        payload: { payload: commentPayload, tkn: userToken },
        token: userToken,
      });

      const successMessage =
        response?.message ||
        response?.data?.message ||
        "Comment added successfully";

      toast.success(successMessage, TOAST_OPTIONS);
      setCommentByPost((prev) => ({ ...prev, [postId]: "" }));
      setSelectedImageByPost((prev) => ({ ...prev, [postId]: null }));
      setErrorByPost((prev) => ({ ...prev, [postId]: null }));
      setPostMeta((prev) => ({
        ...prev,
        [postId]: {
          ...(prev[postId] ?? buildMetaFromPost(post)),
          commentsCount: (prev[postId]?.commentsCount ?? 0) + 1,
        },
      }));
      refetch();
    } catch (error: any) {
      const message = getErrorMessage(error, "Unable to post comment");
      toast.error(message, TOAST_OPTIONS);
    } finally {
      setCommentLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  if (trendingLoading) {
    return <Loading />;
  }

  if (trendingError) {
    return (
      <div className="w-full rounded-lg border border-red-200 bg-white p-8 text-center">
        <p className="text-sm font-medium text-red-500">
          Unable to fetch community posts right now. Please try again shortly.
        </p>
      </div>
    );
  }

  // Ensure posts array exists
  if (!posts || posts.length === 0) {
    return (
      <div className="w-full rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-2">
          <p className="text-base font-medium text-gray-600">
            No posts available
          </p>
          <p className="text-sm text-gray-500">
            Check back later or start the conversation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {posts.map((item: any) => {
        const postId = String(item?.id);
        const meta = postMeta[postId] ?? buildMetaFromPost(item);

        // Use post-specific pagination state
        const currentPage = paginationState[postId] || 1;
        const totalComments = item?.comments?.length || 0;
        const totalPages = Math.ceil(totalComments / ITEMS_PER_PAGE);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const paginatedComments =
          item?.comments?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];

        const isLikePending = likeLoading[postId];
        const isBookmarkPending = bookmarkLoading[postId];
        const isCommentPending = commentLoading[postId];

        const postContent = (
          <div
            key={postId}
            className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
          >
            {/* Post Content */}
            <div className="text-sm font-normal leading-relaxed text-gray-800">
              {item?.content}
            </div>

            {/* Post Image */}
            {item?.images?.[0]?.image && (
              <div className="flex justify-center">
                <div className="flex w-full max-w-md items-center justify-center rounded-lg bg-gray-100 p-4 sm:p-8">
                  <Image
                    src={`https://staging.ajiroba.ng/media/${item?.images?.[0]?.image}`}
                    alt="Post image"
                    width={300}
                    height={300}
                    className="h-auto max-h-[320px] w-full max-w-full object-contain"
                  />
                </div>
              </div>
            )}

            {/* Engagement Metrics */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-3">
              <button
                className="flex items-center gap-2 text-gray-600 transition-colors hover:text-[#F56630]"
                onClick={() => toggleLike(item)}
                disabled={isLikePending}
              >
                {isLikePending ? (
                  <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <FaThumbsUp
                    className={`text-lg ${meta.liked ? "text-[#F56630]" : "text-gray-500"}`}
                  />
                )}
                <span className="text-sm font-medium">
                  {meta.likesCount} Kudos
                </span>
              </button>

              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <FaRegCommentDots className="text-lg" />
                <span>{meta.commentsCount} Comments</span>
              </div>

              <button
                className="flex items-center gap-2 text-gray-600 transition-colors hover:text-[#F56630]"
                onClick={() => toggleBookmark(item)}
                disabled={isBookmarkPending}
              >
                {isBookmarkPending ? (
                  <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <FiBookmark
                    className={`text-lg ${meta.bookmarked ? "text-[#F56630]" : "text-gray-500"}`}
                  />
                )}
                <span className="text-sm font-medium">Bookmark</span>
              </button>
            </div>

            {/* Comment Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitComment(item);
              }}
              className="mt-2 space-y-3"
            >
              <div className="flex flex-wrap items-center gap-3 rounded-lg bg-gray-50 p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-300">
                  <span className="text-xs text-gray-600">👤</span>
                </div>
                <input
                  type="text"
                  placeholder="Write your comment"
                  value={commentByPost[postId] || ""}
                  onChange={(e) => handleCommentChange(postId, e.target.value)}
                  className="min-w-[160px] flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-500 outline-none"
                />
                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`imageUpload-${postId}`}
                    className="cursor-pointer"
                  >
                    <AiOutlinePicture className="text-xl text-gray-500 transition-colors hover:text-gray-700" />
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
                    disabled={isCommentPending}
                    className="flex items-center gap-2 rounded-md bg-[#F56630] px-3 py-1 text-sm text-white transition-colors hover:bg-[#E84526] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isCommentPending ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Posting…
                      </>
                    ) : (
                      "Post"
                    )}
                  </button>
                </div>
              </div>
              {errorByPost[postId] && (
                <p className="text-xs text-red-500">{errorByPost[postId]}</p>
              )}

              {selectedImageByPost[postId] && (
                <div className="relative inline-flex">
                  <Image
                    src={selectedImageByPost[postId] as string}
                    alt="Selected"
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImageForPost(postId)}
                    className="absolute -right-2 -top-2 rounded-full bg-white p-1 text-gray-600 shadow transition-colors hover:text-gray-800"
                    aria-label="Remove image"
                  >
                    <AiOutlineClose className="text-sm" />
                  </button>
                </div>
              )}
            </form>

            {/* Comments Section */}
            {paginatedComments.length > 0 && (
              <div className="space-y-4">
                {paginatedComments.map((comment: any) => (
                  <div key={comment?.id} className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-300">
                      <span className="text-xs text-gray-600">👤</span>
                    </div>
                    <div className="flex-1">
                      <div className="rounded-lg bg-gray-50 p-3">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-800">
                            {comment?.user?.fullname}
                          </span>
                        </div>
                        <p className="break-words text-sm leading-relaxed text-gray-700">
                          {comment?.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center">
                <button
                  onClick={() =>
                    setPaginationState((prevState) => ({
                      ...prevState,
                      [postId]: Math.max((prevState[postId] || 1) - 1, 1),
                    }))
                  }
                  disabled={currentPage === 1}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-sm transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-sm font-medium text-gray-600">
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
                  className="rounded-lg bg-gray-200 px-4 py-2 text-sm transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        );

        if (activeTab === "Trending") {
          return postContent;
        }

        if (activeTab === "Liked") {
          return postContent;
        }

        if (activeTab === "Bookmarked") {
          return postContent;
        }

        return (
          <div
            key={postId}
            className="w-full rounded-lg border border-gray-200 bg-white p-8 text-center"
          >
            <p className="text-gray-500 font-medium">No data available</p>
          </div>
        );
      })}
    </div>
  );
};



const NotificationContent = () => {
  const userToken = Cookies.get("token") as string;

  const {
    data: notinfo,
  } = useGetOrderData(
    "/api/communitynotifications",
    "get_trending_posts",
    userToken,
  );

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const notifications = notinfo?.data?.data || [];
  const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotifications = notifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      {notifications.length === 0 ? (
        <p className="text-sm text-gray-500">No notifications yet</p>
      ) : (
        <ul className="space-y-3">
          {paginatedNotifications?.map(
            (item: any, index: number) => {
              const timeAgo = formatDistanceToNow(new Date(item?.date_created), {
                addSuffix: true,
              });

              return (
                <li
                  key={index}
                  className="rounded-lg border border-gray-100 p-3"
                >
                  <p className="break-words text-sm font-medium text-gray-800">
                    {item.message}
                  </p>
                  <span className="text-xs text-gray-500">{timeAgo}</span>
                </li>
              );
            },
          )}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`rounded-md border px-3 py-1 text-sm ${currentPage === 1 ? "cursor-not-allowed text-gray-400" : "hover:bg-gray-100"}`}
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`rounded-md border px-3 py-1 text-sm ${currentPage === totalPages ? "cursor-not-allowed text-gray-400" : "hover:bg-gray-100"}`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

const useNotificationCount = () => {
  const userToken = Cookies.get("token") as string;
  const { data: notinfo } = useGetOrderData(
    "/api/communitynotifications",
    "get_trending_posts",
    userToken,
  );
  return notinfo?.data?.data?.length || 0;
};

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState<string>("Trending");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const notificationCount = useNotificationCount();

  return (
    <>
      <section className="relative mb-6 flex w-full flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex-1 space-y-4 rounded-xl bg-transparent p-4 lg:p-0">
          <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />
          <ContentPost activeTab={activeTab} />
        </div>

        {/* Desktop sidebar */}
        <div className="hidden w-full lg:block lg:max-w-xs">
          <div className="rounded-lg border bg-white p-4 shadow-md">
            <h4 className="mb-4 text-lg font-semibold">Notifications</h4>
            <NotificationContent />
          </div>
        </div>
      </section>

      {/* Mobile floating bell */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-24 right-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#F25E26] text-white shadow-[0_4px_14px_rgba(242,94,38,0.5)] transition-transform hover:scale-105 active:scale-95 lg:hidden"
        aria-label="Open notifications"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
        {notificationCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {notificationCount > 99 ? "99+" : notificationCount}
          </span>
        )}
      </button>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[10000] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute bottom-0 right-0 top-0 flex w-full max-w-sm flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-4">
              <h4 className="font-Poppins text-lg font-semibold text-[#2A2A2A]">Notifications</h4>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
                aria-label="Close notifications"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <NotificationContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainLayout;
