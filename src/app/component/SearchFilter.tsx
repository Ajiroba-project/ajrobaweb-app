import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
// import { AllCategories, MobileSideMenu } from "./AllCategories";
import { AllCategories } from "./AllCategories";
import { CatMobileSideMenu } from "./SideMenu";
import { FaStar } from "react-icons/fa6";
import { it } from "node:test";
import { useQueryData } from "@/hooks/useQueryData";
import { IoMdArrowDropright } from "react-icons/io";
import './style.css'




export const SearchFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Foodstuff");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const sub = searchParams.get("sub");

  const decodedPaths = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => decodeURIComponent(path));

  const { data: catInfo, isLoading: catnLoading } = useQueryData<any>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`,
    ["get categories_and_subcategories"],
    true,
  );

  const currentCategory = catInfo?.data?.find(
    (category: any) =>
      category.category.toLowerCase() ===
      decodedPaths[decodedPaths.length - 1].toLowerCase(),
  );

  const handlesubcat = (subCategory: string, id: string) => {
    const params = new URLSearchParams(searchParams);
    if (subCategory) {
      params.set("sub", subCategory);
      params.set("subid", id);
    } else {
      params.delete("sub");
      params.delete("subid");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      <div
        className="flex cursor-pointer text-sm font-Poppins items-center gap-3 mb-4 bg-[#D9D9D9] py-2 text-[#2A2A2A]"
        onClick={() => setIsOpen(true)}
      >
        <div
          className="flex gap-2 items-center menu-content"
          style={{
            margin: "0 auto",
            /*  width: "60%", */
            maxWidth: "100%",
          }}
        >
          <FiMenu size={18} />

          <p className="text-[#2A2A2A] font-Poppins font-medium text-base sm:text-small md:text-base lg:text-base px-2">
           All Categories
          </p>
        </div>
      </div>

      <div
        className="pl-3 mt-4 flex"
        style={{
          margin: "0 auto",
          width: "70%",
          maxWidth: "100%",
          zIndex: 51,
        }}
      >
        {currentCategory && (
          <div key={currentCategory.category}>
            <p
              onClick={() => setSelectedCategory(currentCategory.category)}
              className={`flex items-center pb-3 ${
                selectedCategory === currentCategory.category ? "font-bold" : ""
              }`}
            >
              <IoMdArrowDropright color="" size={20} />{" "}
              {currentCategory.category}
            </p>

            <ul>
              {currentCategory?.subcategories?.map((subCategory: any) => (
                <li
                  key={subCategory?.subcategory}
                  className={`pl-5 ${
                    sub === subCategory?.subcategory ? "text-[#F25E26]" : ""
                  }`}
                  onClick={() =>
                    handlesubcat(subCategory?.subcategory, subCategory?.id)
                  }
                >
                  {subCategory?.subcategory}
                </li>
              ))}
            </ul>
          </div>
        )}


        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-start bg-black bg-opacity-50">
            <div
               className={`bg-white w-auto max-h-[80%] overflow-auto p-4 relative mt-4 ml-4 lg:top-48 lg:left-80 md:top-48 md:left-80 xl:top-48 xl:left-80 2xl:top-48 2xl:left-80 top-4`}


            >
              <button
                className="absolute top-2 right-2 text-xl font-bold"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
              <AllCategories closeModal={closeModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
