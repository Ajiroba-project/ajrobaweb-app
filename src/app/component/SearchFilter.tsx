import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
// import { categories } from '@/app/static-data'
// import { Products } from '@/app/static-data'
import { FiMenu } from "react-icons/fi";
import { AllCategories } from "./AllCategories";
// import {SideNav} from '../component/SideMenu'

export const PriceFilter = () => {
  return (
    <div className="py-6">
      <p>Price</p>

      <div>
        <input
          type="radio"
          name="price1"
          value="cvvcvc"
          id=""
          className="mr-3"
        />
        <label htmlFor="huey">under ₦2000</label>
      </div>

      <div>
        <input
          type="radio"
          name="price1"
          value="cvvcvc"
          id=""
          className="mr-3"
        />
        <label htmlFor="huey">₦2000 - ₦5000</label>
      </div>

      <div>
        <input
          type="radio"
          name="price1"
          value="cvvcvc"
          id=""
          className="mr-3"
        />
        <label htmlFor="huey">₦5000 - Above</label>
      </div>
      {/* custome price */}
      <div className="gap-2">
        <p className="py-5">Custom Price Range</p>
        <div className="flex gap-3">
          <input type="text" placeholder="min" className="w-14 p-2" />
          <input type="text" placeholder="max" className="w-14 p-2" />
          <input
            type="button"
            value="Apply"
            className=" rounded border-2 border-[#F25E26] text-[#F25E26] p-3"
          />
        </div>
      </div>
    </div>
  );
};

export const SearchFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Foodstuff");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sub = searchParams.get("sub");

  const isRootPath = pathname === "/";

  const decodedPaths = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => decodeURIComponent(path));

  // console.log(decodedPaths[decodedPaths.length - 1], 'ddd')

  const categories = [
    {
      name: "Foodstuff",
      subCategories: ["Fruits", "Beans"],
    },
    {
      name: "Fashion And Beauty",
      subCategories: ["Sneakers", "Wristwatch"],
    },
    {
      name: "Fashion",
      subCategories: ["Bags", "Belts"],
    },
    // Add more categories here
  ];

  const currentCategory = categories.find(
    (category) =>
      category.name.toLowerCase() ===
      decodedPaths[decodedPaths.length - 1].toLowerCase(),
  );

  return (
    <div>
      {/* <div className='flex cursor-pointer items-center gap-3 p-3'>
        <FiMenu />
        <p> All Category</p>
      </div> */}
      <div className="flex cursor-pointer items-center gap-3 p-3">
        <FiMenu />
        <p onClick={() => setIsOpen(!isOpen)}>All Category</p>
        {/* <p>All Category</p> */}
      </div>

      {
        isOpen &&

        <div className='hidden bg-[#FFFFFF] lg:block  '>
          <div className="" >
            <AllCategories />
          </div>

        </div>
      }

      {/* {isOpen && ( */}

      <div className="pl-3">
        {currentCategory && (
          <div key={currentCategory.name}>
            <p
              onClick={() => setSelectedCategory(currentCategory.name)}
              className={`${selectedCategory === currentCategory.name ? "font-bold" : ""}`}
            >
              {currentCategory.name}
            </p>
            {/* {selectedCategory === currentCategory.name && ( */}
            <ul>
              {currentCategory.subCategories.map((subCategory) => (
                <li
                  key={subCategory}
                  className={`${sub === subCategory ? "text-[#F25E26]" : ""}`}
                >
                  <Link
                    key={subCategory}
                    href={{
                      pathname: `/categories/${currentCategory.name}`,
                      query: { sub: subCategory },
                    }}
                  >
                    {subCategory}
                  </Link>
                </li>
              ))}
            </ul>
            {/* )} */}
          </div>
        )}
      </div>
      {/* )} */}




      {/* Lists of categories */}
      <div>{/* {paths} */}</div>

      {/* price */}
      <PriceFilter />

      {/* brand  */}

      {/* rating */}
    </div>
  );
};
