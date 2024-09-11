import React, { useState } from "react";
import Image from "next/image";
import { FaThumbsUp, FaRegCommentDots, FaShareAlt } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import clock from '../../asset/image/clock.svg'

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState<string>("Trending");

  const tabs = ["Trending", "Liked", "Bookmarked"];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex w-full  rounded-lg border border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(tab)}
            className={`w-1/3 py-2 text-center ${
              activeTab === tab
                ? "bg-[#f25e26] text-white rounded-tl-md" // Active tab
                : "bg-white text-gray-600 hover:bg-gray-100" // Inactive tabs
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

const ContentPost = () => {
  return (
    <div className="flex flex-col gap-4 p-6 border rounded-md bg-white shadow-lg w-full">
      <h3 className="font-semibold text-lg">
        Knowing your wrist games is part of what speaks about you. Bracelets super hot, what can you say about this product?
      </h3>
      <div className="w-full flex justify-center">
        <Image
         src={clock}  // Placeholder image, replace with actual path
          alt="Bracelet"
          width={200}
          height={200}
        />
      </div>
      <div className="flex justify-between items-center text-gray-600">
        <span className="flex items-center">
          <FaThumbsUp className="mr-1 text-orange-500" /> 100 Kudos
        </span>
        <span className="flex items-center">
          <FaRegCommentDots className="mr-1" /> 10 Comments
        </span>
        <span className="flex items-center">
          <FaShareAlt className="mr-1" /> Share
        </span>
        <span className="flex items-center">
          <FiBookmark className="mr-1" /> Bookmark
        </span>
      </div>
      {/* Comment Input */}
      <div className="flex items-center gap-2 mt-4">
        <Image
          src={clock} // Placeholder, replace with actual profile image
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <input
          type="text"
          placeholder="Write your comment"
          className="w-full border rounded-lg p-2 focus:outline-none"
        />
      </div>
      {/* Comment Section */}
      <div className="mt-4">
        <div className="flex gap-2 items-start">
          <Image
        src={clock}  // Replace with commenter's image
            alt="Commenter"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">Alex Ayo</p>
            <p className="text-gray-600">
              Ergonomics Mouse suitable for all your computer works. You &apos; ve it right? Tell us more.
            </p>
            <div className="flex gap-2 mt-1 text-gray-500">
              <FaThumbsUp className="text-sm" /> 100 Kudos
              <span className="ml-4 cursor-pointer">Reply</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationSidebar = () => {
  return (
    <div className="w-[250px] p-4 bg-white border rounded-lg shadow-md">
      <h4 className="font-semibold text-lg mb-4">Notifications</h4>
      <ul className="space-y-4">
        {Array.from({ length: 5 }, (_, i) => (
          <li key={i}>
            <p className="font-medium">Customer 22456 commented on admin post</p>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MainLayout = () => {
  return (
    <div className="flex gap-8 mx-auto max-w-7xl p-4">
      {/* Main content section */}
      <div className="flex-1">
        <TabComponent />
        <ContentPost />
      </div>

      {/* Sidebar with notifications */}
      <div className="hidden lg:block">
        <NotificationSidebar />
      </div>
    </div>
  );
};

export default MainLayout;

