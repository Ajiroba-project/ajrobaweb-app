// 'use client'
// import React,{Fragment, useState} from 'react'
// import {transactions} from '@/app/static-data'
// import Cookies from 'js-cookie'
// import { useGetDatanew } from '@/hooks/useGetData'
// import Loading from '@/app/component/Loading'

// export const RecentTransaction = () => {




//     const userToken = (Cookies.get("token") as string) || "";

//      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/recent_transactions/`;

//   const { data: recenttransdata, isLoading: recenttransLoading } = useGetDatanew(
//     url,
//     "get_recent_transactions",
//     userToken || " ",
//   );

//    const [allTransaction, setAllTransaction]=useState(recenttransdata?.results?.data?.slice(0,5) || [])





//   return (
//     <section className='my-10 rounded bg-[#F6F6F6] p-7 '>
//       <div className='rounded border-2 border-[#f25e26] p-4'>
//         <div className='flex justify-between'>
//           <h3 className='text-xl font-semibold'> Recent Transaction</h3>
//           <p
//             className={`'text-[#F25E26] cursor-pointer '${allTransaction?.length === recenttransdata?.results?.data ? 'pointer-events-none opacity-50 hidden' : ''}`}
//             onClick={() => {
//               setAllTransaction(recenttransdata?.results?.data)
//             }}
//           >
//             View all
//           </p>
//         </div>
//         <div className='my-4 flex flex-col  gap-4'>
//           {allTransaction?.map((val: { description: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; time: any; amount: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }, index: React.Key | null | undefined) => (
//             <Fragment key={index}>
//               <div className=' mr-4 flex cursor-pointer items-center justify-between rounded bg-[#FCDFD480] p-4 hover:shadow-md'>
//                 <div className='flex '>
//                   <div>{/* logo */}</div>
//                   <div className='flex flex-col'>
//                     <p className='font-semibold'>{val?.description}</p>
//                     <p>{val.time || 'NA'}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <p className='text-xl font-semibold'>₦{val.amount}</p>
//                 </div>
//               </div>
//             </Fragment>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


'use client'
import React, { Fragment, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useGetDatanew } from "@/hooks/useGetData";
import Loading from "@/app/component/Loading";

export const RecentTransaction = () => {
  const userToken = Cookies.get("token") || "";

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/recent_transactions/`;

  const { data: recenttransdata, isLoading: recenttransLoading } = useGetDatanew(
    url,
    "get_recent_transactions",
    userToken || " ",
  );

  interface Transaction {
    description: string;
    time: string;
    amount: number;
  }

  const [allTransaction, setAllTransaction] = useState<Transaction[]>([]);

  // ✅ Update state when data is received
  useEffect(() => {
    if (recenttransdata?.results?.data) {
      setAllTransaction(recenttransdata.results.data.slice(0, 5));
    }
  }, [recenttransdata]);

  return (
    <section className="my-10 rounded bg-[#F6F6F6] p-7">
      <div className="rounded border-2 border-[#f25e26] p-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold"> Recent Transactions</h3>
          <p
            className={`text-[#F25E26] cursor-pointer ${
              allTransaction?.length === recenttransdata?.results?.data?.length
                ? "pointer-events-none opacity-50 hidden"
                : ""
            }`}
            onClick={() => setAllTransaction(recenttransdata?.results?.data || [])}
          >
            View all
          </p>
        </div>

        <div className="my-4 flex flex-col gap-4">


           {recenttransLoading ? (
          <div className="flex justify-center items-center py-6">
            <Loading /> {/* Your existing loading component */}
          </div>
        ) : (
          <div className="my-4 flex flex-col gap-4">
            {allTransaction.length === 0 ? (
              <p className="text-gray-500 text-center">No transactions available.</p>
            ) : (
              allTransaction.map((val, index) => (
                <Fragment key={index}>
                  <div className="mr-4 flex cursor-pointer items-center justify-between rounded bg-[#FCDFD480] p-4 hover:shadow-md">
                    <div className="flex">
                      <div>{/* logo */}</div>
                      <div className="flex flex-col">
                        <p className="font-semibold">{val?.description}</p>
                        <p>{val.time || "NA"}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-semibold">₦{val.amount}</p>
                    </div>
                  </div>
                </Fragment>
              ))
            )}
          </div>
        )}
        </div>
      </div>
    </section>
  );
};
