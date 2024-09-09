import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
// import { AllCategories, MobileSideMenu } from "./AllCategories";
import { AllCategories } from "./AllCategories";
import { CatMobileSideMenu } from "./SideMenu";
import { FaStar } from "react-icons/fa6";
import { it } from "node:test";
import { useQueryData } from "@/hooks/useQueryData";
import { IoMdArrowDropright } from "react-icons/io";
import "./style.css";
import { Input } from "@nextui-org/react";


interface SelectedItem {
  id: number;
}

interface SelectedRating {
  id: number;
  rating: any;
}

export const PriceFilter = () => {
  const [selectedPrice, setSelectedPrice] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();



  const handlePriceSelection = (price: string) => {
    setSelectedPrice(price);

    const params = new URLSearchParams(searchParams);
    if (price) {
      params.set("greaterthan", price);
    } else {
      params.delete("greaterthan");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      style={{
        margin: "0 auto",
        width: "60%",
        maxWidth: "100%",
        zIndex: 51,
      }}
    >
      <div className="py-6 ">
        <p className="flex items-center text-base pb-3 text-[#2A2A2A] font-medium font-Poppins">
          Price
        </p>

        <div>
          <input
            type="radio"
            name="price1"
            value="<2000"
            id="under2000"
            className="mr-3 text-sm text-[#504D4D] font-normal mb-3"
            onChange={() => handlePriceSelection("<5000")}
          />
          <label
            htmlFor="under5000"
            className="text-sm text-[#504D4D] font-normal font-Poppins"
          >
            under 5000
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="price1"
            value="₦5000-Above"
            id="₦5000-Above"
            className="mr-3 text-sm text-[#504D4D] font-normal"
            onChange={() => handlePriceSelection(">5000")}
          />
          <label
            htmlFor="₦5000-Above"
            className="text-sm text-[#504D4D] font-normal font-Poppins"
          >
            ₦5000 - Above
          </label>
        </div>



      </div>
    </div>
  );
};

export const CustomFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [minvalue, setMinvalue] = useState("");
  const [maxvalue, setMaxvalue] = useState("");

  const handleminandmax = (min: string, max: string) => {
    setMinvalue("");
    setMaxvalue("");
    const params = new URLSearchParams(searchParams);
    if (min && max) {
      params.set("min", min);
      params.set("max", max);
    } else {
      params.delete("min");
      params.delete("max");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="  "
      style={{
        margin: "0 auto",
        /*  width: "60%", */
        maxWidth: "100%",
        zIndex: 51,
        paddingLeft: '4rem'

      }}

    >
      <div className="py-6 ">
        <p className="flex items-center text-base pb-3 text-[#2A2A2A] font-medium font-Poppins">
          Custom Price Range
        </p>

        <div className="gap-2">
          <div>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-wrap gap-3 " >
              <input
                value={minvalue}
                onChange={(e) => setMinvalue(e.target.value)}
                type="text"
                name="minvalue"
                placeholder="₦ Min"
                className="text-sm text-[#A09F9F] bg-[#F6F6F6]  py-0.5 h-9 indent-2  border border-[#6E6E6E] rounded"
                style={{
                  width: '5rem'
                }}
              />


              <input
                value={maxvalue}
                type="text"
                name="maxvalue"
                placeholder="₦ Max"
                className=" text-sm text-[#A09F9F] bg-[#F6F6F6]  py-0.5 h-9 indent-2   border border-[#6E6E6E] rounded"
                onChange={(e) => setMaxvalue(e.target.value)} style={{
                  width: '5rem'
                }}
              />
              <input
                onClick={() => handleminandmax(minvalue, maxvalue)}
                type="button"
                value="Apply"
                className=" cursor-pointer rounded border-2 py-0.5 h-9 text-sm font-Poppins font-medium hover:text-white hover:bg-[#F25E26] border-[#F25E26] text-[#F25E26] p-2"
                style={{
                  width: '5rem'
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export const BrandFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const items = [
    { id: 1, name: "LG" },
    { id: 2, name: "Hisense" },
    { id: 3, name: "Sony" },
    { id: 4, name: "Samsung" },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  const handleCheckboxChange = (item: SelectedItem) => {
    const selectedIndex = selectedItems.indexOf(item.id);
    let newSelectedItems = [...selectedItems];

    if (selectedIndex === -1) {
      newSelectedItems.push(item.id);
    } else {
      newSelectedItems.splice(selectedIndex, 1);
    }

    setSelectedItems(newSelectedItems);

    const selectedBrandIds = newSelectedItems.join(",");
    const params = new URLSearchParams(searchParams);
    if (selectedBrandIds) {
      params.set("selectedBrands", selectedBrandIds);
    } else {
      params.delete("selectedBrands", selectedBrandIds);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div style={{
      margin: "0 auto",
      width: "60%",
      maxWidth: "100%",
      zIndex: 51,
    }} >
      <div className="pt-6 pb-4 ">
        <p className="flex items-center text-base  text-[#2A2A2A] font-medium font-Poppins">
          Brand
        </p></div>
      <div className="relative">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search Brand..."
          className="w-full text-sm text-[#000000] bg-[#FCFCFC] py-0.5 h-9 pl-2 pr-10 border border-[#6E6E6E] rounded"
        />
        <span className="absolute inset-y-0 right-2 flex items-center pl-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
            />
          </svg>
        </span>
      </div>

      <ul className="flex flex-col gap-2 mt-4" >
        {items
          .filter((item) => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((item) => (
            <li key={item.id} className=" cursor-pointer text-[#504D4D] font-Poppins text-sm font-normal hover:text-[#F25E26]" >
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item)}
                className="bg-[#000000]"
              />
              <span className="ml-2">{item.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};


export const RatingFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // const generateStars = (rating: number): JSX.Element[] => {
  //   const stars = [];
  //   for (let i = 0; i < rating; i++) {
  //     stars.push(<FaStar key={i} className="text-[#F25E26]" />);
  //   }
  //   return stars;
  // };

  const generateStars = (rating: number): JSX.Element[] => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      // If the star index is less than the rating, use the orange color, otherwise use grey
      const color = i < rating ? "#F25E26" : "#B7B7B7"; // Grey color for stars less than the rating
      stars.push(<FaStar key={i} className="" style={{ color }} />);
    }
    return stars;
  };


  const items = [
    { id: 5, name: generateStars(4), rating: 5, tag: "five_star" },
    { id: 4, name: generateStars(3), rating: 4, tag: "four_star" },
    { id: 3, name: generateStars(2), rating: 3, tag: "three_star" },
    { id: 2, name: generateStars(1), rating: 2, tag: "two_star" },
    /*    { id: 1, name: generateStars(0), rating: 1, tag: "one_star" }, */
  ];

  const handleCheckboxChange = (item: SelectedRating) => {
    const selectedIndex = selectedRatings.indexOf(item.rating);
    let newSelectedRatings = [...selectedRatings];

    if (selectedIndex === -1) {
      newSelectedRatings.push(item.rating);
    } else {
      newSelectedRatings.splice(selectedIndex, 1);
    }

    setSelectedRatings(newSelectedRatings);

    const selectedRatingIds = newSelectedRatings.join(",");
    const params = new URLSearchParams(searchParams);
    if (selectedRatingIds) {
      const lastItem = newSelectedRatings[newSelectedRatings.length - 1];
      params.set("selectedRatings", lastItem.toString());
    } else {
      const lastItem = newSelectedRatings[newSelectedRatings.length - 1];
      params.delete("selectedRatings", lastItem.toString());
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div style={{
      margin: "0 auto",
      width: "60%",
      maxWidth: "100%",
      zIndex: 51,
    }}>
      <div className="pt-6 pb-4 ">
        <p className="flex items-center text-base  text-[#2A2A2A] font-medium font-Poppins">
          Rating
        </p></div>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex mb-4">
            <input
              type="radio"
              name="rating"
              id={item.tag}
              value={item.tag}
              checked={selectedRatings.includes(item.id)}
              onChange={() => handleCheckboxChange(item)}
            />
            <div className="flex" >
              <div>
                <span className="ml-2 flex ">{item.name} </span>

              </div>

              <div>
                <span className="ml-2 flex items-center gap-1 text-sm font-Poppins font-normal text-[#504D4D]"> & more</span>

              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};




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
        className="flex cursor-pointer text-sm font-Poppins items-center gap-3 mb-4 bg-[#D9D9D9] py-3 text-[#2A2A2A]"
        onClick={() => setIsOpen(true)}
      >
        <div
          className="flex gap-2 items-center menu-content"
          style={{
            margin: "0 auto",
            maxWidth: "100%",
          }}
        >
          <FiMenu size={18} />

          <p className="text-[#2A2A2A] font-Poppins font-medium text-sm sm:text-sm md:text-sm lg:text-sm px-2">
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
              className={`flex items-center text-base pb-3 text-[#2A2A2A] font-Poppins ${selectedCategory === currentCategory.category
                  ? "font-medium"
                  : "font-medium"
                }`}
            >
              <IoMdArrowDropright color="" size={20} />{" "}
              {currentCategory.category}
            </p>

            <ul className="flex flex-col gap-2">
              {currentCategory?.subcategories?.map((subCategory: any) => (
                <li
                  key={subCategory?.subcategory}
                  className={`pl-8 text-sm text-[#504D4D] font-normal ${sub === subCategory?.subcategory ? "text-[#F25E26]" : ""
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

      <div
        className="border-b-2 mt-16"
        style={{
          margin: "50px auto 10px auto",
          width: "70%",
          maxWidth: "100%",
          position: "relative",
          transform: "translateX(30px)",
        }}
      ></div>


      <PriceFilter />

      <div
        className="border-b-2 mt-16"
        style={{
          margin: "30px auto 10px auto",
          width: "70%",
          maxWidth: "100%",
          position: "relative",
          transform: "translateX(30px)",
        }}
      ></div>

      <CustomFilter />


      <div
        className="border-b-2 mt-16"
        style={{
          margin: "30px auto 10px auto",
          width: "70%",
          maxWidth: "100%",
          position: "relative",
          transform: "translateX(30px)",
        }}
      ></div>


      <BrandFilter />


      <div
        className="border-b-2 mt-16"
        style={{
          margin: "30px auto 10px auto",
          width: "70%",
          maxWidth: "100%",
          position: "relative",
          transform: "translateX(30px)",
        }}
      ></div>


      <RatingFilter />
    </div>
  );
};
