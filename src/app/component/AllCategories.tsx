"use client";
import { useState, Fragment } from "react";
import { categories } from "../static-data";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { Poppins, Inter } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "900"] });
const inter = Inter({ subsets: ["latin"], weight: ["500", "900"] });
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryData } from "@/hooks/useQueryData";
import { useQuery } from '@tanstack/react-query';
import { createPortal } from 'react-dom';

type MenuState = number | null;


interface Subcategory {
    id: string;
    subcategory: string;
    category?: string;
    ame?: string;
}

interface Category {
    [x: string]: any;
    category: string;
    subcategories: Subcategory[];
}

interface CategoryResponse {
    data: Category[];
}

const fetchCategoriesAndSubcategories = async (): Promise<CategoryResponse> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`);
    if (!res.ok) {
        throw new Error("Network response was not ok");
    }
    return res.json();
};





interface AllCategoriesProps {
  closeModal: () => void;
}


export const AllCategories: React.FC<AllCategoriesProps> = ({ closeModal }) => {
  const [active, setActive] = useState<MenuState>(null);
  const [subcategory, SetSubcategory] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlesubcat = (subCategory: string, id: string) => {
    setActive(null);
    const params = new URLSearchParams(searchParams);
    if (subCategory) {
      params.set('sub', subCategory);
      params.set('subid', id);
    } else {
      params.delete('sub');
      params.delete('subid');
    }
    replace(`${pathname}?${params.toString()}`);
    closeModal();
  };

  const router = useRouter();
  const { data: catInfo } = useQueryData<CategoryResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`,
    ["get categories_and_subcategories"],
    true
  );

  const handleCategoryClick = (e: React.MouseEvent, index: number) => {
    setActive(active === index ? null : index);

    const targetRect = (e.target as HTMLElement).getBoundingClientRect();
    setDropdownPosition({ top: targetRect.bottom, left: targetRect.right });
  };

  return (
    <>
      <section className="px-2">
        <ul className="relative pt-6 bottom-4 z-10">
          {catInfo?.data?.map((val, index) => (
            <Fragment key={index}>
              <div className="relative">
                <li
                  className={` ${active === index ? "text-[#F25E26]" : ""} py-2 cursor-pointer flex gap-1.5 items-center hover:text-[#F25E26]`}
                  onClick={(e) => handleCategoryClick(e, index)}
                >
                  <span className="flex gap-2 items-center">
                    <p
                      onClick={() => {
                        SetSubcategory(val.category);
                        router.push(`/categories/${val.category}?cat_id=${val.id}`);
                        closeModal();
                      }}
                    >
                      {val.category}
                    </p>
                    {active === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </li>


                  {active === index && dropdownPosition &&
  <div
    className={`fixed z-50 bg-white shadow-md rounded text-sm`}
    style={{
      top: `${dropdownPosition.top}px`,
      left: `${dropdownPosition.left}px`,
      width: '200px',
      maxHeight: '80vh',
      overflowY: 'auto',
    }}
  >
    {val.subcategories?.map((subcategory) => (
      <div
               onClick={() => handlesubcat(subcategory?.subcategory, subcategory.id)}
        key={subcategory.subcategory}
        className={` ${active === 1 ? "" : "hover:bg-[#FCDFD4]"} my-4 cursor-pointer p-2 z-20`}
      >
        {subcategory.subcategory}
      </div>
    ))}
  </div>}



              </div>
            </Fragment>
          ))}
        </ul>
      </section>
    </>
  );
};



export const MobileSideMenu = () => {
    const [active, setActive] = useState<MenuState>(null);

    const { data: catInfo, isLoading: catnLoading } = useQueryData<CategoryResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`, ["get categories_and_subcategories"], true);

    return (
        <>
            <section className="bg-[#F6F6F6] p-6">
                <ul className="relative ">
                    {catInfo?.data?.map((val, index) => (
                        <Fragment key={index}>
                            <div className="relative bg-[#F6F6F6] p-2">
                                <li
                                    className={`${poppins.className} ${active === index ? "" : ""}  py-2  cursor-pointer flex gap-1.5 items-center hover:text-[#F25E26] `}
                                    onClick={() => {
                                        setActive(active === index ? null : index);
                                    }}
                                >
                                    <span className="flex gap-2 items-center ">
                                        <p className={``}>{val.category}</p>{" "}
                                        {active === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                    </span>
                                </li>

                                {active === index && (
                                    <div
                                        className={`${inter.className} px-4 z-20  ${active === 1 ? " gap-2 -top-0 " : ""} rounded text-sm `}
                                    >
                                        {val.subcategories?.map((subcategory) => (
                                            <div
                                                key={subcategory.subcategory}
                                                className={` ${active === 1 ? "" : "hover:bg-[#FCDFD4]"} my-4 cursor-pointer p-2 z-20`}
                                            >
                                                <Link
                                                    href={"#"}
                                                    className={`${active === 1 ? "font-bold" : ""} `}
                                                >
                                                    {subcategory.subcategory}
                                                </Link>


                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Fragment>
                    ))}
                </ul>
            </section>
        </>
    );
};
