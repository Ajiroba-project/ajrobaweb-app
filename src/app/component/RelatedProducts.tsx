'use client'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '900'] })

interface cardDetails {
    cardInfo: any[]
    currentPage?: number
}

export const RelatedProducts = ({ cardInfo }: cardDetails) => {

    // console.log(cardInfo, 'cardinfo')

    const star = [1, 2, 3, 4, 5]

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // adjust this value to change the number of items per page
    const totalPages = Math.ceil(cardInfo?.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCardInfo = cardInfo?.slice(startIndex, endIndex);

    const router = useRouter()



    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    return (
        <>
            <div
                className={`${poppins.className} my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8 mt-4`}
            >
                {paginatedCardInfo?.map((value, index) => (
                    <div onClick={() => router.push(`/categories/productdetails/${value.id}`)} className='w-full rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden' key={index}>
                        <div className='py-4 h-48 flex items-center justify-center bg-gray-50'>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/media/${value?.images[0]?.image}`}
                                alt="product"
                                className="object-contain max-h-full max-w-full"
                                width={100}
                                height={100}
                            />
                        </div>
                        <div className='p-4'>
                            <div className='flex flex-col gap-3'>
                                <div className='flex w-full items-start justify-between gap-3'>
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-sm font-semibold text-gray-900 truncate'>{value.name}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='flex flex-col'>
                                        <p className='text-lg font-bold text-gray-900'>
                                            ₦&nbsp;{value.discount}
                                        </p>
                                        <p className='text-sm text-gray-500 line-through'>
                                            ₦&nbsp;{value.price}
                                        </p>
                                    </div>
                                    <div className='flex'>
                                        {Array.from({ length: value?.product_reviews?.average_ratings || 0 }, (_, index) => (
                                            <FaStar key={index} className="text-[#F25E26] text-xs" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}



            </div>

            <div className='flex justify-center items-center mb-20 ' >

                {/* <div className="flex justify-center mt-4">
                    <button
                        className="px-4 py-2 bg-[#F6F6F6] border  hover:bg-orange-700 text-[#D2D2D2] font-bold rounded"
                        onClick={handleFirstPage}
                        disabled={currentPage === 1}
                    >
                        <FaAngleDoubleLeft />

                    </button>
                    {Array(totalPages)
                        .fill(0)
                        .map((_, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 ${currentPage === index + 1
                                    ? 'bg-[#F6F6F6] border-[#F25E26] text-[#F25E26]'
                                    : 'bg-[#F6F6F6] border text-[#D2D2D2]'
                                    } hover:bg-orange-700 font-bold rounded`}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    <button
                        className="px-4 py-2 bg-[#F6F6F6] border  hover:bg-orange-700 text-[#D2D2D2] font-bold rounded"
                        onClick={handleLastPage}
                        disabled={currentPage === totalPages}
                    >

                        <FaAngleDoubleRight />
                    </button>
                </div> */}
            </div>
        </>
    )
}

