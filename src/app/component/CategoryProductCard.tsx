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

export const CategoryProductCard = ({ cardInfo }: cardDetails) => {

    const star = [1, 2, 3, 4, 5]

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // adjust this value to change the number of items per page
    const totalPages = Math.ceil(cardInfo.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCardInfo = cardInfo.slice(startIndex, endIndex);

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
                className={`${poppins.className} my-4 grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 mb-8 mt-4`}
            >
                {paginatedCardInfo?.map((value, index) => (
                    <div onClick={() => router.push(`/categories/productdetails/${value.name}`)} className=' w-full rounded bg-[#F6F6F6] shadow-md' key={index}>
                        <div className='py-2'>
                            <div className='flex items-center justify-center'>
                                <Image src={value.image} alt='product' className='w-fit' />
                            </div>
                        </div>
                        <hr />
                        <div className='py-3 shadow-inner'>
                            <div className='flex flex-col gap-2 px-2'>
                                <div className='flex  w-full items-center justify-between gap-3 capitalize'>
                                    {/* product name */}
                                    <div className=' text-sm font-semibold'>
                                        <p className='w-max text-pretty'>{value.name}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    {/* price */}
                                    <div className='justify-start'>
                                        <p className='w-max font-semibold'>
                                            ₦&nbsp;{value.price}
                                            <span className='font-semibold '></span>
                                        </p>
                                    </div>

                                    {/* stars */}
                                    <p className='flex justify-end text-left'>
                                        {star.map((val, index) => (
                                            <span key={index}>
                                                <FaStar className='text-[#F25E26]' />
                                            </span>
                                        ))}
                                    </p>
                                </div>
                                <p className='text-sm text-gray-500 line-through'>
                                    ₦&nbsp;{value.previousPrice}
                                </p>
                            </div>
                        </div>

                    </div>

                ))}



            </div>

            <div className='flex justify-center items-center mb-20 ' >

                <div className="flex justify-center mt-4">
                    <button
                        className="px-4 py-2 bg-[#F6F6F6] border  hover:bg-orange-700 text-[#D2D2D2] font-bold rounded"
                        onClick={handleFirstPage}
                        disabled={currentPage === 1}
                    >
                        <FaAngleDoubleLeft />
                        {/* First */}
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
                        {/* Last  */}
                        <FaAngleDoubleRight />
                    </button>
                </div>
            </div>
        </>
    )
}

export const CategoryCard = ({ cardInfo }: cardDetails) => {
    return (
        <>
            <div
                className={`${poppins.className} my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4`}
            >
                {cardInfo.map((value, index) => (
                    <div className='rounded-2xl shadow-md' key={index}>
                        <div className='rounded-t-2xl bg-[#F6F6F6]'>
                            <div className='flex items-center justify-center'>
                                <Image
                                    src={value.image}
                                    alt='product'
                                    className='h-[200px] w-fit '
                                />
                            </div>
                        </div>

                        <div className='rounded-b-2xl bg-white py-2'>
                            <div className='flex flex-col gap-2 p-2'>
                                <div className='capitalize'>
                                    <p className='text-lg text-[#353131]'>{value.name}</p>{' '}
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className='text-[#A09F9F]'>{value.description}</p>
                                    <Link
                                        href={value.path}
                                        className='my-4 w-full bg-[#FCDFD4] p-2 text-center text-[#111111]'
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
    )
}

export const AuctionCard = ({ cardInfo, currentPage }: cardDetails) => {
    const star = [1, 2, 3, 4, 5]

    const totalCards = cardInfo.length
    const cardsPerPage = 4
    const renderCards = () => {
        const startIndex = (currentPage ?? 0) * cardsPerPage
        const endIndex = Math.min(startIndex + cardsPerPage, totalCards)

        const cards = []

        for (let i = startIndex; i < endIndex; i++) {
            const value = cardInfo[i]
            cards.push(
                <div className=' w-full rounded bg-[#F6F6F6] shadow-md' key={i}>
                    <div className=''>
                        <div className='flex items-center justify-between p-4'>
                            <p className='text-sm text-[#A09F9F]'>On Auction </p>
                            <p className='rounded-md bg-[#FCFCFC] p-1.5 text-sm font-semibold shadow-md'>
                                Bid{' '}
                            </p>
                        </div>

                        <div className='flex items-center justify-center'>
                            <Image src={value.image} alt='product' className='w-fit' />
                        </div>
                    </div>
                    <hr />
                    <div className='py-3 shadow-inner'>
                        <div className='flex flex-col gap-2 px-2'>
                            <div className='flex  w-full items-center justify-between gap-3 capitalize'>
                                {/* product name */}
                                <div className=' text-sm font-semibold'>
                                    <p className='w-max text-pretty'>{value.name}</p>
                                </div>
                                {/* price */}
                                <div className=''>
                                    <p className='w-max text-sm'>
                                        ticket price:
                                        <span className='font-semibold text-[#F25E26]'>
                                            ₦200.00
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* stars */}
                            <p className='flex justify-end text-left'>
                                {star.map((val, index) => (
                                    <span key={index}>
                                        <FaStar className='text-[#F25E26]' />
                                    </span>
                                ))}
                            </p>
                            {/* time left */}
                            <div className='mb-2'>
                                <p className='text-sm capitalize'>
                                    <span className='font-semibold'>2</span>:hr{' '}
                                    <span className='font-semibold'>45</span>:min{' '}
                                    <span className='font-semibold'>left</span>
                                </p>
                                <div className='border-gray h-2.5 w-full rounded-full border '>
                                    <div className='h-2 w-[45%] rounded-full bg-[#F25E26]'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return cards
    }

    return (
        <>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                {renderCards()}
            </div>
        </>
    )
}

export const CategoryFeatureCard = ({ cardInfo, currentPage }: cardDetails) => {
    const totalCards = cardInfo.length
    const cardsPerPage = 4
    const renderCards = () => {
        const startIndex = (currentPage ?? 0) * cardsPerPage
        const endIndex = Math.min(startIndex + cardsPerPage, totalCards)

        const cards = []
        for (let i = startIndex; i < endIndex; i++) {
            const value = cardInfo[i]
            cards.push(
                <div className='rounded ' key={i}>
                    <div className='flex items-center justify-center relative'>
                        <Image src={value.image2} alt='product' className='w-fit' />

                        <div className='flex items-center justify-between p-4 absolute flex-col gap-3'>
                            <Image src={value.svg} alt='product' className='w-fit' />
                            <p className='text-sm text-white'>{value.name} </p>
                        </div>
                    </div>

                </div>
            )
        }

        return cards
    }

    return (
        <>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                {renderCards()}
            </div>
        </>
    )
}
