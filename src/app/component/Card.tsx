'use client'
import { Poppins } from "next/font/google";
import Image from "next/image"
import { FaStar } from "react-icons/fa";
import Link from 'next/link'

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "900"], });

interface cardDetails {
    cardInfo: any[]
}

export const ProductCard =({cardInfo}:cardDetails)=>{
    return (
        <>
            <div className={`${poppins.className} grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-4 my-4`}>
        {
            cardInfo.map((value, index)=>(
            <div className="shadow-md rounded-2xl" key={index}>
                <div className="bg-[#F6F6F6] rounded-t-2xl">
                    <div className="flex items-center justify-center">
                        <Image src={value.image} alt="product" className="h-[200px] w-fit "/>
                    </div>
                </div>

                <div className="py-2 bg-white rounded-b-2xl">
                        <div className="p-2 flex flex-col gap-2">
                                <div className="capitalize"><p className="text-lg text-[#353131]">{value.name}</p> </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[#A09F9F]">{value.description}</p>
                                    {/* <Link href={value.path} className="p-2 bg-[#FCDFD4] w-full my-4 text-center text-[#111111]">Explore</Link> */}
                                </div>
                        </div>
                </div>
           </div>

            ))
            
        }
        </div>
        </>
    )

}

export const AuctionCard =({cardInfo}:cardDetails)=>{

    return (
        <>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-4">
        {
            cardInfo.map((value, index)=>(
            <div className="shadow-md rounded  " key={index}>
                <div className="bg-[#F6F6F6]">
                <div className="flex justify-between p-4 items-center">
                        <p className="text-[#A09F9F]">on Auction </p>
                        <p className="p-2 bg-[#FCFCFC] rounded-md shadow">Bid </p>
                </div>

           <div className="flex items-center justify-center">
             <Image src={value.image} alt="product" className="w-fit"/>
           </div>
           </div>

           <div className="shadow-md py-4 bg-white ">
            <div className="p-4 flex flex-col gap-6">
                <div className="flex items-center justify-between capitalize">
                <div className=" font-bold">{value.name}</div>
                   <div className="flex flex-col items-center">
                     <p className="text-sm">ticket price: <span className="text-[#F25E26] font-semibold">₦200.00</span> </p>
                    <p className="p-4 flex "><FaStar className="text-[#F25E26]"/> <FaStar className="text-[#F25E26]"/> <FaStar className="text-[#F25E26]"/> <FaStar className="text-[#F25E26]"/> <FaStar  className="text-[#F25E26]"/></p>
                   </div>
                </div>
                <div>
                    <p className="capitalize text-sm">2:hr 45:min left</p>
                    <div className="w-full bg-white rounded-full h-2.5 border border-gray">
                        <div className="bg-[#F25E26] h-2.5 rounded-full w-[45%]"></div>
                    </div>

                </div>
            </div>
           </div>
        </div>

            ))
            
        }
        </div>
        </>
    )
}


export const CategoryCard =({cardInfo}:cardDetails)=>{
    return (
        <>
            <div className={`${poppins.className} grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 my-4`}>
        {
            cardInfo.map((value, index)=>(
            <div className="shadow-md rounded-2xl" key={index}>
                <div className="bg-[#F6F6F6] rounded-t-2xl">
                    <div className="flex items-center justify-center">
                        <Image src={value.image} alt="product" className="h-[200px] w-fit "/>
                    </div>
                </div>

                <div className="py-2 bg-white rounded-b-2xl">
                        <div className="p-2 flex flex-col gap-2">
                                <div className="capitalize"><p className="text-lg text-[#353131]">{value.name}</p> </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[#A09F9F]">{value.description}</p>
                                    <Link href={value.path} className="p-2 bg-[#FCDFD4] w-full my-4 text-center text-[#111111]">Explore</Link>
                                </div>
                        </div>
                </div>
           </div>

            ))
            
        }
        </div>
        </>
    )
}
