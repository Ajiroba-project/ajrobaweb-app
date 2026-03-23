"use client";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { formatCurrency } from "@/utils/formatCurrency";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "900"] });

interface cardDetails {
  cardInfo: any[];
  currentPage?: number;
  id?: number;
  title?: string;
  description?: string;
  imageUrl?: string;
  name?: string;
  image?: string;
  price?: string;
  images?: { id: string; product: string; image: string }[];
  discount?: string;
  reviews?: string;
  message?: string;
}

export const CategoryProductCard = ({ cardInfo }: cardDetails) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(cardInfo.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCardInfo = cardInfo.slice(startIndex, endIndex);

  const router = useRouter();

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <>
      <div
        className={`${poppins.className} my-4 grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 mb-8 mt-4 `}
      >
        {paginatedCardInfo?.map((value, index) => (
          <div
            onClick={() =>
              router.push(`/categories/productdetails/${value.id}`)
            }
            className=" w-full rounded bg-[#F6F6F6] shadow-md"
            key={index}
          >
            <div className="py-2">
              <div className="flex items-center justify-center">
                <Image
                  src={`https://staging.ajiroba.ng/media/${value?.image}`}
                  alt="product"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
            </div>
            <hr />
            <div className="py-3 shadow-inner">
              <div className="flex flex-col gap-2 px-2">
                <div className="flex  w-full items-center justify-between gap-3 capitalize">
                  {/* product name */}
                  <div className=" text-sm ">
                    <p className=" text-pretty">{value.name}</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  {/* price */}
                  <div className="justify-start">
                    <p className="w-max font-semibold">
                      {formatCurrency(value.price)}
                      <span className="font-semibold "></span>
                    </p>
                  </div>

                  <p className="flex justify-end text-left">

                    {Array.from({ length: value?.reviews }, (_, index) => (
                      <span key={index}>
                        <FaStar className="text-[#F25E26]" />
                      </span>
                    ))}
                  </p>
                </div>
                <p className="text-sm text-gray-500 line-through">
                  {formatCurrency(value.previousPrice)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mb-20 ">
        <div className="flex justify-center mt-4 gap-3">
          <button
            className="px-4 py-4 bg-[#F6F6F6] rounded border border-[#B7B7B7]  text-[#D2D2D2] font-bold cursor-pointer"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          >
            <IoIosArrowBack size={20} />
          </button>
          {Array(totalPages)
            .fill(0)
            .map((_, index) => (
              <button
                key={index}
                className={`px-6 py-4 ${currentPage === index + 1
                    ? "bg-[#F6F6F6] rounded border border-[#F25E26] text-[#F25E26] font-Poppins font-normal text-base "
                    : "bg-[#F6F6F6] rounded border border-[#B7B7B7]  text-[#D2D2D2] font-Poppins font-normal text-base "
                  }  font-bold rounded`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          <button
            className="px-4 py-4 bg-[#F6F6F6] rounded border border-[#B7B7B7]  text-[#D2D2D2] font-bold cursor-pointer"
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export const CategoryCard = ({ cardInfo }: cardDetails) => {
  return (
    <>
      <div
        className={`${poppins.className} my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4`}
      >
        {cardInfo.map((value, index) => (
          <div className="rounded-2xl shadow-md" key={index}>
            <div className="rounded-t-2xl bg-[#F6F6F6]">
              <div className="flex items-center justify-center">
                <Image
                  src={value.image}
                  alt="product"
                  className="h-[200px] w-fit "
                />
              </div>
            </div>

            <div className="rounded-b-2xl bg-white py-2">
              <div className="flex flex-col gap-2 p-2">
                <div className="capitalize">
                  <p className="text-lg text-[#353131]">{value.name}</p>{" "}
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-[#A09F9F]">{value.description}</p>
                  <Link
                    /* href={value.path} */
                    href={`/categories/${value.name}`}
                    className="my-4 w-full bg-[#FCDFD4] p-2 text-center text-[#111111]"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const AuctionCard = ({ cardInfo, currentPage }: cardDetails) => {
  const star = [1, 2, 3, 4, 5];

  const totalCards = cardInfo.length;
  const cardsPerPage = 4;
  const renderCards = () => {
    const startIndex = (currentPage ?? 0) * cardsPerPage;
    const endIndex = Math.min(startIndex + cardsPerPage, totalCards);

    const cards = [];

    for (let i = startIndex; i < endIndex; i++) {
      const value = cardInfo[i];
      cards.push(
        <div className=" w-full rounded bg-[#F6F6F6] shadow-md" key={i}>
          <div className="">
            <div className="flex items-center justify-between p-4">
              <p className="text-sm text-[#A09F9F]">On Auction </p>
              <p className="rounded-md bg-[#FCFCFC] p-1.5 text-sm font-semibold shadow-md">
                Bid{" "}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <Image src={value.image} alt="product" className="w-fit" />
            </div>
          </div>
          <hr />
          <div className="py-3 shadow-inner">
            <div className="flex flex-col gap-2 px-2">
              <div className="flex  w-full items-center justify-between gap-3 capitalize">
                {/* product name */}
                <div className=" text-sm font-semibold">
                  <p className="w-max text-pretty">{value.name}</p>
                </div>
                {/* price */}
                <div className="">
                  <p className="w-max text-sm">
                    ticket price:
                    <span className="font-semibold text-[#F25E26]">
                      {formatCurrency(200.00)}
                    </span>
                  </p>
                </div>
              </div>

              {/* stars */}
              <p className="flex justify-end text-left">
                {star.map((val, index) => (
                  <span key={index}>
                    <FaStar className="text-[#F25E26]" />
                  </span>
                ))}
              </p>
              {/* time left */}
              <div className="mb-2">
                <p className="text-sm capitalize">
                  <span className="font-semibold">2</span>:hr{" "}
                  <span className="font-semibold">45</span>:min{" "}
                  <span className="font-semibold">left</span>
                </p>
                <div className="border-gray h-2.5 w-full rounded-full border ">
                  <div className="h-2 w-[45%] rounded-full bg-[#F25E26]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    }

    return cards;
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {renderCards()}
      </div>
    </>
  );
};

export const CategoryFeatureCard = ({ cardInfo, currentPage }: cardDetails) => {
  const totalCards = cardInfo.length;
  const cardsPerPage = 4;
  const renderCards = () => {
    const startIndex = (currentPage ?? 0) * cardsPerPage;
    const endIndex = Math.min(startIndex + cardsPerPage, totalCards);

    const cards = [];
    for (let i = startIndex; i < endIndex; i++) {
      const value = cardInfo[i];
      cards.push(
        <div className="rounded " key={i}>
          <div className="flex items-center justify-center relative">
            <Image src={value.image2} alt="product" className="w-fit" />

            <div className="flex items-center justify-between p-4 absolute flex-col gap-3">
              <Image src={value.svg} alt="product" className="w-fit" />
              <p className="text-sm text-white">{value.name} </p>
            </div>
          </div>
        </div>,
      );
    }

    return cards;
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {renderCards()}
      </div>
    </>
  );
};
