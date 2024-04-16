type cardDetails ={
    cardInfo: any[]
}

export const Card =({cardInfo}:cardDetails)=>{

    return (
        <>
            <div className="grid grid-cols-4  gap-4">
        {
            cardInfo.map((value, index)=>(
            <div className="shadow-md rounded  bg-[#F6F6F6]" key={index}>
           <div className="flex justify-between p-4">
                <p>on Auction </p>
                <p className="p-2 bg-gray-50">Bid </p>
            </div>
           <div>Image</div>
           <div className="shadow-lg py-4">
            <div className="p-4">
                <p>{value.name}</p>
            <div>
                <p>ticket price </p>
                <p>stars</p>
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