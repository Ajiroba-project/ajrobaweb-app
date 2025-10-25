// import React, { useState } from 'react';
// import { GoArrowDownLeft, GoArrowUpRight } from 'react-icons/go';
// import { useAuthStore } from '@/store/store';
// import { useGetDatanew } from '@/hooks/useGetData';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';

// export const WalletTransaction = () => {


//   const TransactionTemplate = () => {
//     const userToken = Cookies.get('token') as string;
//     const router = useRouter();
//     const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/recent_transactions/`;

//     const { data: transInfo, isLoading: transLoading } = useGetDatanew(
//       url,
//       'get_recent_transactions',
//       userToken,
//       { cacheTime: 0, staleTime: 0 }
//     );

//     // Ensure data is an array
//     const transactions = Array.isArray(transInfo?.data) ? transInfo?.data : [];

//     // Pagination state
//     const [currentPage, setCurrentPage] = useState(1);
//     const pageSize = 5;

//     // Get transactions for the current page
//     const currentData = transactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//     const handlePageChange = (newPage: number) => setCurrentPage(newPage);
//     const totalPages = Math.ceil(transactions.length / pageSize);


// const formatDateTo12Hour = (dateString: string) => {
//   const date = new Date(dateString);
//   let hours = date.getHours();
//   const minutes = date.getMinutes();
//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12;
//   hours = hours ? hours : 12; // If hours is 0, set it to 12
//   const minutesStr = minutes < 10 ? '0' + minutes : minutes; // Ensure double digits for minutes
//   return `${hours}:${minutesStr} ${ampm}`;
// };

//     return (
//       <div>
//         {transactions.length === 0 ? (
//           <h1>No Data Available</h1>
//         ) : (
//           currentData?.map((val, index) => (
//             <div key={index} className='flex justify-between w-full flex-col items-start gap-6 py-5 lg:flex-row'>
//               {/* Your transaction details here */}
//                  <div
//               key={index}
//               className='flex justify-between w-full  flex-col items-start  gap-6   lg:flex-row'
//             >
//               <div className='flex items-center gap-3 lg:flex-row flex-col w-1/2'>
//                 {val.description === 'Purchase Product' ? (
//                   <div className='flex w-fit items-center lg:justify-center rounded-full bg-emerald-200 p-2'>
//                     <GoArrowUpRight className='text-lg font-semibold text-green-700' />
//                   </div>
//                 ) : (
//                   <div className='flex w-fit items-center lg:justify-center rounded-full bg-amber-200 p-2'>
//                     {' '}
//                     <GoArrowDownLeft className='text-lg font-semibold text-amber-700' />
//                   </div>
//                 )}
//                 <div className='flex w-full flex-col  justify-center items-center lg:justify-start lg:items-start'>
//                   <p className='line-clamp-1 cursor-pointer truncate text-ellipsis text-sm text-pretty text-[#101928] font-Poppins font-medium  '>
//                     {val.description}
//                   </p>
//                   <p className='text-[8px] text-sm text-pretty text-[#111111] font-Poppins font-normal '>{val.channel}</p>
//                 </div>
//               </div>

//               <div className="flex flex-col justify-center items-center lg:items-baseline  lg:justify-start  lg:w-max w-1/2">
//                 <p className='font-medium w-max line-clamp-1 cursor-pointer truncate text-ellipsis text-sm text-pretty text-[#101928] font-Poppins  '>₦ {val.amount}</p>
//                 <p className='text-[8px] text-sm text-pretty text-[#111111] font-Poppins font-normal '> {formatDateTo12Hour(val.date)}</p>
//                 <p className='brand1 w-max cursor-pointer pt-4 text-xs capitalize underline'  onClick={()=> router.push(`/transreceipt?transId=${val?.reference}`)}>
//                   view receipt
//                 </p>
//               </div>
//             </div>
//             </div>
//           ))
//         )}

//         {/* Pagination Controls */}
//         <div className="flex justify-center gap-4 mt-4">
//           {currentPage > 1 && (
//             <button className='p-2 bg-[#F25E26] hover:bg-[#EA7000]
//                text-white  rounded' onClick={() => handlePageChange(currentPage - 1)}>
//               Previous
//             </button>
//           )}
//           {currentPage < totalPages && (
//             <button className='p-2 bg-[#F25E26] hover:bg-[#EA7000]
//                text-white  rounded' onClick={() => handlePageChange(currentPage + 1)}>
//               Next
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       {/* Component structure */}
//       <TransactionTemplate />
//     </div>
//   );
// };




import React, { useState } from 'react';
import { GoArrowDownLeft, GoArrowUpRight } from 'react-icons/go';
import { useAuthStore } from '@/store/store';
import { useGetDatanew } from '@/hooks/useGetData';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { formatCurrency } from '@/utils/formatCurrency';

export const WalletTransaction = () => {
  const TransactionTemplate = () => {
    const userToken = Cookies.get('token') as string;
    const router = useRouter();
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/recent_transactions/`;

    const { data: transInfo, isLoading: transLoading } = useGetDatanew(
      url,
      'get_recent_transactions',
      userToken,
      { cacheTime: 0, staleTime: 0 }
    );

    const transactions = Array.isArray(transInfo?.data) ? transInfo?.data : [];
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const currentData = transactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  /*   console.log(currentData, 'cccccddd') */

  // console.log(transactions, 'transactions')

    const totalPages = Math.ceil(transactions.length / pageSize);

    const handlePageChange = (newPage: number) => setCurrentPage(newPage);

    const formatDateTo12Hour = (dateString: string) => {
      const date = new Date(dateString);
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const minutesStr = minutes < 10 ? '0' + minutes : minutes;
      return `${hours}:${minutesStr} ${ampm}`;
    };

    return (
      <div className="w-full">
        <p className='text-lg lg:text-xl font-semibold capitalize leading-relaxed mb-2'>
          Recent Transactions
        </p>
        <p className='text-sm text-gray-600 mb-4'>
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
        {transactions.length === 0 ? (
          <h1 className="text-center text-base py-8">No Data Available</h1>
        ) : (
          currentData?.map((val, index) => (
            <div
              key={index}
              className="border-b border-gray-200 flex flex-col gap-8 py-4 px-2 rounded-lg shadow-sm bg-white mb-3 sm:flex-row sm:items-center sm:justify-between "
            >
              {/* Left: Icon and Description */}
              <div className="flex items-center gap-3 w-full sm:w-1/2">
                <div className={`flex items-center justify-center rounded-full p-2
                  ${val.description === "Fund Wallet"
                    ? 'bg-emerald-200'
                    : 'bg-amber-200'}`}>
                  {val.description === "Fund Wallet" ? (
                    <GoArrowDownLeft className="text-lg font-semibold text-green-700" />
                  ) : (
                    <GoArrowUpRight className="text-lg font-semibold text-amber-700" />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-medium text-[#101928] ">{val.description}</p>
                  <p className="text-xs text-[#111111]">{val.channel}</p>
                </div>
              </div>

              {/* Right: Amount, Time, and Receipt Link */}
              <div className="flex flex-col items-start sm:items-end w-full sm:w-1/2 mt-2 sm:mt-0">
                <p className="font-medium text-sm text-[#101928]"> {formatCurrency(val.amount)}</p>
                <p className="text-xs text-[#111111]">{formatDateTo12Hour(val.date)}</p>
                <button
                  className="brand1 mt-2 text-xs underline text-[#F25E26] hover:text-[#EA7000] transition"
                  onClick={() => router.push(`/transreceipt?transId=${val?.reference}`)}
                >
                  view receipt
                </button>
              </div>
            </div>
          ))
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center gap-2 mt-4">
          {currentPage > 1 && (
            <button
              className="px-4 py-2 bg-[#F25E26] hover:bg-[#EA7000] text-white rounded text-sm"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          )}
          {currentPage < totalPages && (
            <button
              className="px-4 py-2 bg-[#F25E26] hover:bg-[#EA7000] text-white rounded text-sm"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <TransactionTemplate />
    </div>
  );
};