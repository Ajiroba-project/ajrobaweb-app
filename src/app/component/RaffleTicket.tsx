export default function RaffleTicket({ ticketNumber = "1414199", price = 200 }) {
    // Simple barcode generator: array of bar widths
    const barcodePattern = [2, 1, 3, 1, 2, 2, 1, 3, 2, 1, 2, 1, 3, 2, 1, 2, 2, 1, 3, 1];

    return (
        <div className="flex max-w-2xl mx-auto bg-gradient-to-br from-[#F25E26] to-[#ff7e5f] rounded-xl overflow-hidden shadow-lg relative text-[13px] md:text-base">
            {/* Left Section */}
            <div className="flex-1 p-4 md:p-6 flex flex-col justify-between relative">
                {/* Ticket Number and Logo */}
                <div className="flex items-center justify-between">
                    <span className="bg-white text-[#F25E26] text-sm font-semibold px-2 py-1 rounded">TICKET NO: {ticketNumber}</span>
                    <span className="font-extrabold text-[#F25E26] text-sm italic tracking-wider drop-shadow-sm select-none">Ajroba</span>
                </div>
                {/* Barcode */}
                <div className="mt-2 mb-2 flex">
                    <div className="flex items-end h-4">
                        {barcodePattern.map((w, i) => (
                            <div
                                key={i}
                                className="bg-white mx-[1px] rounded"
                                style={{ width: `${w}px`, height: `${12 + (i % 3) * 3}px` }}
                            />
                        ))}
                    </div>
                </div>
                {/* Main Text */}
                <div className="flex-1 flex flex-col justify-center items-start mt-2 mb-4">
                    <span className="text-white text-sm md:text-sm font-bold leading-tight">Raffle</span>
                    <span className="text-white text-sm md:text-sm font-extrabold leading-tight -mt-1">Ticket</span>
                </div>
                {/* Price */}
                <div className="flex items-end justify-between">
                    <span className="text-white text-sm md:text-sm font-bold">₦ {price}</span>
                </div>
            </div>
            {/* Perforation */}
            <div className="flex flex-col justify-center items-center px-1 bg-transparent relative">
                <div className="h-full border-dotted border-r-2 border-white opacity-60" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg">&#9654;</span>
            </div>
            {/* Right Section */}
            <div className="w-32 md:w-40 p-3 flex flex-col justify-between bg-gradient-to-br from-[#F25E26] to-[#ff7e5f] relative">
                <div className="flex justify-end">
                    <span className="font-extrabold text-[#F25E26] text-base italic tracking-wider drop-shadow-sm select-none">Ajroba</span>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center">
                    <span className="text-white text-sm font-semibold">Raffle</span>
                    <span className="text-white text-sm font-bold">Ticket</span>
                    <span className="text-white text-sm font-semibold mt-2">₦ {price}</span>
                </div>
                <div className="flex flex-col items-center mt-2">
                    {/* Barcode */}
                    <div className="flex items-end h-6">
                        {barcodePattern.map((w, i) => (
                            <div
                                key={i}
                                className="bg-white mx-[1px] rounded"
                                style={{ width: `${w}px`, height: `${18 + (i % 3) * 3}px` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}