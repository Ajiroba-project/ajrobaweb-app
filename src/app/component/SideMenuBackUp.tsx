"use client";
import { useState, Fragment } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { Poppins, Inter } from "next/font/google";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useQueryData } from "@/hooks/useQueryData";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "900"],
});
const inter = Inter({ subsets: ["latin"], weight: ["500", "700", "900"] });

type MenuState = number | null;

interface Subcategory {
  id: string;
  subcategory: string;
  name?: string;
  category?: string;
}

interface Category {
  [x: string]: any;
  category: string;
  subcategories: Subcategory[];
}

interface CategoryResponse {
  data: Category[];
}

export const SideMenu = () => {
  const [active, setActive] = useState<MenuState>(null);
  const [subcategory, SetSubcategory] = useState<string | null>(null);

  const router = useRouter();

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handlesubcat = (subCategory: string, id: string, val?: any) => {
    setActive(null);
    const params = new URLSearchParams(searchParams);

    if (subCategory) {
      params.set("sub", subCategory);
      params.set("subid", id);
    } else {
      params.delete("sub");
      params.delete("subid");
    }
    replace(
      `/categories/${val && val.category}?cat_id=${val.id}?${params.toString()}`,
    );
  };

  const { data: catInfo, isLoading: catnLoading } =
    useQueryData<CategoryResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`,
      ["get categories_and_subcategories"],
      true,
    );

  return (
    <>
      <section className="pl-[4rem] ">
        <ul className="relative py-6">
          {catInfo?.data?.map((val, index) => (
            <Fragment key={index}>
              <div className="relative">
                <li
                  className={`${poppins.className} ${active === index ? "text-[#F25E26]" : ""}  flex  cursor-pointer items-center gap-2 py-2 hover:text-[#F25E26] ${val.category === "fashion" ? "hidden" : "block"} relative`}
                  onClick={() => {
                    setActive(active === index ? null : index);
                  }}
                  onMouseEnter={() => setActive(index)}
                >
                  <span className="flex items-center gap-2">
                    <p
                      className="text-xl font-normal capitalize"
                      onClick={() =>
                        router.push(
                          `/categories/${val.category}?cat_id=${val.id}`,
                        )
                      }
                    >
                      {val.category}
                    </p>{" "}
                    {active === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </li>
              </div>

              {active === index && (
                <div
                  className={`${inter.className} z-20 bg-white ${active === 1 ? "left-[10rem] -mt-[30px]  w-48 gap-2 px-3" : "left-[8rem] -mt-[30px] w-48 rounded-md"} absolute rounded text-sm shadow-md transition delay-300 duration-300 ease-in-out`}
                >
                  {val.subcategories?.map((subcategory) => (
                    <div
                      onClick={() =>
                        handlesubcat(
                          subcategory.subcategory,
                          subcategory.id,
                          val,
                        )
                      }
                      key={subcategory.subcategory}
                      className={` ${active === 1 ? "py-2 hover:bg-[#FCDFD4] " : "hover:bg-[#FCDFD4]"} relative z-20   cursor-pointer px-2`}
                    >
                      <p
                        className={` ${active === 1 ? "w-max text-base font-bold " : " p-2 text-base font-medium "}`}
                      >
                        {subcategory.subcategory}
                      </p>

                      <span
                        className={`${active === 1 ? "absolute -right-2.5 -top-0.5 h-full w-0.5 rounded border-2 border-gray-200" : "hidden"}${subcategory && subcategory.name === "Accessories" ? " border-hidden" : ""}`}
                      ></span>
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

  const { data: catInfo, isLoading: catnLoading } =
    useQueryData<CategoryResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`,
      ["get categories_and_subcategories"],
      true,
    );

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handlesubcat = (subCategory: string, id: string) => {
    setActive(null);

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

  const router = useRouter();

  return (
    <>
      <section className="bg-[#F6F6F6] p-6">
        <ul className="relative ">
          {catInfo?.data?.map((val, index) => (
            <Fragment key={index}>
              <div className="relative bg-[#F6F6F6] p-2">
                <li
                  className={`${poppins.className} ${active === index ? "" : ""}  flex  cursor-pointer items-center gap-1.5 py-2 hover:text-[#F25E26] `}
                  onClick={() => {
                    setActive(active === index ? null : index);
                  }}
                >
                  <span className="flex items-center gap-2 ">
                    <p
                      onClick={() => router.push(`/categories/${val.category}`)}
                      className={``}
                    >
                      {val.category}
                    </p>
                    {active === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </li>

                {active === index && (
                  <div
                    className={`${inter.className} z-20 px-4  ${active === 1 ? " -top-0 gap-2 " : ""} rounded text-sm `}
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

export const CatMobileSideMenu = () => {
  const [active, setActive] = useState<MenuState>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const sub = searchParams.get("sub");

  const router = useRouter();

  const { data: catInfo, isLoading: catnLoading } =
    useQueryData<CategoryResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`,
      ["get categories_and_subcategories"],
      true,
    );

  const handlesubcat = (subCategory: string, id: string) => {
    setActive(null);

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

  return (
    <>
      <section className="bg-[#F6F6F6] px-6 py-2">
        <ul className="relative ">
          {catInfo?.data.map((val, index) => (
            <Fragment key={index}>
              <div className="relative bg-[#F6F6F6] ">
                <li
                  className={`${poppins.className} ${active === index ? "" : ""}  flex  cursor-pointer items-center gap-1.5 py-2 hover:text-[#F25E26] `}
                  onClick={() => {
                    setActive(active === index ? null : index);
                  }}
                >
                  <span className="flex items-center gap-2 ">
                    <p
                      onClick={() => router.push(`/categories/${val.category}`)}
                      className={``}
                    >
                      {val.category}
                    </p>
                    {active === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </li>

                {active === index && (
                  <div
                    className={`${inter.className} z-20 px-4  ${active === 1 ? " -top-0 gap-2 " : ""} rounded text-sm `}
                  >
                    {val.subcategories?.map((subcategory) => (
                      <div
                        key={subcategory.subcategory}
                        className={` ${active === 1 ? "" : "hover:bg-[#FCDFD4]"} z-20 my-4 cursor-pointer p-2`}
                      >
                        <p
                          className={`${active === 1 ? "font-bold" : ""} `}
                          onClick={() =>
                            handlesubcat(
                              subcategory.subcategory,
                              subcategory.id,
                            )
                          }
                        >
                          {subcategory.subcategory}
                        </p>
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
