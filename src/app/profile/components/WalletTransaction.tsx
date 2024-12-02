// import React, { useState } from 'react'
// import { transactions } from '@/app/static-data'
// import { GoArrowDownLeft, GoArrowUpRight } from 'react-icons/go'
// import { useAuthStore } from '@/store/store'
// import { useGetDatanew } from '@/hooks/useGetData'
// import { useRouter } from 'next/navigation'
// import Cookies from 'js-cookie'


// // Helper function to format date
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

// export const WalletTransaction = () => {


//   const TransactionTemplate = () => {

//   const { isLoggedIn, user, token } = useAuthStore((state) => ({
//     isLoggedIn: state.isLoggedIn,
//     user: state.user,
//     token: state.token,
//   }));

//    const userToken =  Cookies.get('token') as string;

//     const router = useRouter();


//   const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/recent_transactions/`;

//   const { data: transInfo, isLoading: transLoading } = useGetDatanew(url, 'get_recent_transactions', userToken, {
//     cacheTime: 0,
//     staleTime: 0,
//   });


//     return (
//       <div>
//         { transInfo?.data?.length === 0 ?

//         <h1>No Data Available </h1> :


//         transInfo?.data?.map((val: {
//           description: any,
//           channel: any,
//           date: any,
//           amount: string,
//           reference: string
// }, index: React.Key | null | undefined) => (
//           <>
//             <div
//               key={index}
//               className='flex justify-between w-full  flex-col items-start  gap-6  py-5 lg:flex-row'
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
//             <hr />
//           </>
//         ))



//         }
//       </div>
//     )
//   }


// // Helper function to get the current month and year
// const getCurrentMonthAndYear = () => {
//   const date = new Date();
//   const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
//   return date.toLocaleDateString('en-US', options); // Example: September 2024
// };


//   return (
//     <div>
//       <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start">
//         <p className='text-base lg:text-base text-[#000000] font-semibold font-Poppins  capitalize leading-relaxed'>
//         recent transactions
//       </p>
//       <p className='date-history text-[#111111] font-Poppins text-sm font-normal mt-4'>{getCurrentMonthAndYear()}</p>
//       </div>
//       <div className="py-2">
//          <TransactionTemplate />
//       {/*  <TabComponent/> */}
//       </div>


//       <div>
//         <div>

//         </div>
//       </div>
//     </div>
//   )
// }





import React, { useState } from 'react';
import { GoArrowDownLeft, GoArrowUpRight } from 'react-icons/go';
import { useAuthStore } from '@/store/store';
import { useGetDatanew } from '@/hooks/useGetData';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

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

    // Ensure data is an array
    const transactions = Array.isArray(transInfo?.data) ? transInfo?.data : [];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Get transactions for the current page
    const currentData = transactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (newPage: number) => setCurrentPage(newPage);
    const totalPages = Math.ceil(transactions.length / pageSize);

    console.log(currentData, 'currentdatat')





const formatDateTo12Hour = (dateString: string) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // If hours is 0, set it to 12
  const minutesStr = minutes < 10 ? '0' + minutes : minutes; // Ensure double digits for minutes
  return `${hours}:${minutesStr} ${ampm}`;
};

    return (
      <div>
        {transactions.length === 0 ? (
          <h1>No Data Available</h1>
        ) : (
          currentData?.map((val, index) => (
            <div key={index} className='flex justify-between w-full flex-col items-start gap-6 py-5 lg:flex-row'>
              {/* Your transaction details here */}
                 <div
              key={index}
              className='flex justify-between w-full  flex-col items-start  gap-6   lg:flex-row'
            >
              <div className='flex items-center gap-3 lg:flex-row flex-col w-1/2'>
                {val.description === 'Purchase Product' ? (
                  <div className='flex w-fit items-center lg:justify-center rounded-full bg-emerald-200 p-2'>
                    <GoArrowUpRight className='text-lg font-semibold text-green-700' />
                  </div>
                ) : (
                  <div className='flex w-fit items-center lg:justify-center rounded-full bg-amber-200 p-2'>
                    {' '}
                    <GoArrowDownLeft className='text-lg font-semibold text-amber-700' />
                  </div>
                )}
                <div className='flex w-full flex-col  justify-center items-center lg:justify-start lg:items-start'>
                  <p className='line-clamp-1 cursor-pointer truncate text-ellipsis text-sm text-pretty text-[#101928] font-Poppins font-medium  '>
                    {val.description}
                  </p>
                  <p className='text-[8px] text-sm text-pretty text-[#111111] font-Poppins font-normal '>{val.channel}</p>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center lg:items-baseline  lg:justify-start  lg:w-max w-1/2">
                <p className='font-medium w-max line-clamp-1 cursor-pointer truncate text-ellipsis text-sm text-pretty text-[#101928] font-Poppins  '>₦ {val.amount}</p>
                <p className='text-[8px] text-sm text-pretty text-[#111111] font-Poppins font-normal '> {formatDateTo12Hour(val.date)}</p>
                <p className='brand1 w-max cursor-pointer pt-4 text-xs capitalize underline'  onClick={()=> router.push(`/transreceipt?transId=${val?.reference}`)}>
                  view receipt
                </p>
              </div>
            </div>
            </div>
          ))
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 mt-4">
          {currentPage > 1 && (
            <button className='p-2 bg-[#F25E26] hover:bg-[#EA7000]
               text-white  rounded' onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
          )}
          {currentPage < totalPages && (
            <button className='p-2 bg-[#F25E26] hover:bg-[#EA7000]
               text-white  rounded' onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Component structure */}
      <TransactionTemplate />
    </div>
  );
};
