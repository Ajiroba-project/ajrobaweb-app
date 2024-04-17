import Image from "next/image"


type cardDetails ={
    cardInfo: any[]
}

export const AuctionCard =({cardInfo}:cardDetails)=>{

    return (
        <>
            <div className="grid grid-cols-4  gap-4">
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
                    <p>stars</p>
                   </div>
                </div>
                <div>
                    <p>2:hr 45:min left</p>
                    <p></p>
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

