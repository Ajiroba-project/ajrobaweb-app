'use client'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '900'] })


export const RelatedProductsDetails = ({ cardInfo }) => {


    const star = [1, 2, 3, 4, 5]

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // adjust this value to change the number of items per page
    const totalPages = cardInfo &&  Math.ceil(cardInfo?.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCardInfo = cardInfo?.slice(startIndex, endIndex);

    const router = useRouter()




    return (
        <>
            <div
                className={`${poppins.className} my-8 grid grid-cols-1 gap-8  md:grid-cols-2 lg:grid-cols-4 mb-8 mt-4 bg-[#FFFFFF] `}
            >
                {paginatedCardInfo?.map((value, index) => (
                    <div onClick={() => router.push(`/categories/productdetails/${value.id}`)} className='w-[25%] border border-white shadow-sm ' key={index}>
                        {console.log(value, 'value')}
                        <div className='py-2'>
                            <div className='flex items-center justify-center'>
                                <Image
                                    src={`https://ajiroba.onrender.com/media/${value?.images[0]?.image}`}
                                    alt="product"
                                    className=""
                                    width={120}
                                    height={300}
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                        {/* <hr /> */}
                        <div className='py-3 '>
                            <div className='flex flex-col gap-2 px-2'>
                                <div className='flex  w-full items-center justify-between gap-3 capitalize'>
                                    <div className=' text-sm font-semibold'>
                                        <p className=' font-Poppins text-[13px] font-bold'>{value.name}</p>
                                    </div>

                                     <div className='justify-start'>
                                        <p  className=' font-Poppins text-[13px] font-semibold '>
                                            ₦&nbsp;{value.price}
                                            <span className='font-semibold '></span>
                                        </p>
                                    </div>
                                </div>
                                <div className='flex justify-between'>

                                    <p className='flex justify-end text-left'>
                                        {Array.from({ length: value?.product_reviews?.average_ratings }, (_, index) => (
                                            <span key={index}>
                                                <FaStar className="text-[#F25E26]" />
                                            </span>
                                        ))}
                                    </p>


                                      <div className='justify-start'>
                                        <p className='w-max text-[10px] font-normal font-Poppins  text-[#242423]'>
                                           ({value?.product_reviews?.total_reviews})
                                            <span className='font-semibold '></span>
                                        </p>
                                    </div>
                                </div>
                                <p className='text-[13px] font-Poppins  text-[#2A2A2A] '>
                                   w - {value?.weight}
                                </p>
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

