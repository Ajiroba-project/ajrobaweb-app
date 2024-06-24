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

type MenuState = number | null;


interface Subcategory {
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


export const AllCategories = () => {
    const [active, setActive] = useState<MenuState>(null);
    const [subcategory, SetSubcategory] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handlesubcat = (subCategory: string, val?: { name?: string, category: string }) => {
        setActive(null);

        console.log(val, 'val')

        const params = new URLSearchParams(searchParams);
        if (subCategory) {
            params.set("sub", subCategory);
        } else {
            params.delete("sub");
        }

        replace(`/categories/${val?.category}?${params.toString()}`);
    };

    const router = useRouter()

    const { data: catInfo, isLoading: catnLoading } = useQueryData<CategoryResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`, ["get categories_and_subcategories"], true);

    /*  const { data: catInfo, isLoading: catnLoading } = useQuery<CategoryResponse>(
         "get categories_and_subcategories",
         fetchCategoriesAndSubcategories,

     ); */

    return (
        <>
            <section className="px-2 ">
                <ul className="relative pt-6 bottom-4 z-10">
                    {catInfo?.data?.map((val, index) => (
                        <Fragment key={index}>
                            <div className="relative ">
                                <li
                                    className={`${poppins.className} ${active === index ? "text-[#F25E26]" : ""}  py-2  cursor-pointer flex gap-1.5 items-center hover:text-[#F25E26] `}
                                    onClick={() => {
                                        setActive(active === index ? null : index);
                                    }}
                                >
                                    <span className="flex gap-2 items-center ">
                                        <p onClick={() => {
                                            return (

                                                SetSubcategory(val.category), router.push(`/categories/${val.category}?cat_id=${val.id}`)
                                            )
                                        }} >{val.category}</p>{" "}
                                        {active === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                    </span>
                                </li>
                            </div>

                            {active === index && (
                                <div
                                    className={`${inter.className} z-20 bg-white ${active === 1 ? " gap-3 w-[60%]  -top-0 -right-12" : "w-[60%] -top-4 -right-12"} shadow-md rounded text-sm absolute`}
                                >
                                    {val.subcategories?.map((subcategory) => (
                                        <div
                                            onClick={() => handlesubcat(subcategory.subcategory, val)}
                                            key={subcategory.subcategory}
                                            className={` ${active === 1 ? "" : "hover:bg-[#FCDFD4]"} my-4 cursor-pointer p-2 z-20`}
                                        >
                                            {subcategory.subcategory}


                                        </div>
                                    ))}
                                </div>
                            )}
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
