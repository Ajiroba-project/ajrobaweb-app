// import React, { useState, useEffect, useMemo } from 'react'
// import { Pipeline } from './Pipeline'
// import { AllOrder } from './AllOrder'
// import { CompletedOrder } from './CompletedOrder'
// import { PendingOrder } from './PendingOrder'
// import { IconButton } from '../../component/Button'
// import { transactions } from '@/app/static-data'
// import { MdOutlineFileDownload } from 'react-icons/md'
// import {CustomPagination } from "../../component/Pagination"

// export const OrderDetails = () => {
//   const orderSwitch = ['all', 'completed', 'pending']
//   const tableHeader = ["orderID", "product details", "amount", "date", "status", " "]
//   const [pipeline, setPipeline] = useState<string>('all')
//   const [completedFilter, setcompletedFilter] = useState<any>()
//   const [pendingFilter, setpendingFilter] = useState<any>()

//    const [currentPage, setCurrentPage] = useState<number>(0)
//   const [categoryCurrentPage, setCategoryCurrentPage] = useState<number>(0)
//     // const [displayedProducts, setDisplayedProducts] = useState<any | []>(
//     //   Products.slice(0, 12)
//     // )


//   useEffect(() => {
//     const complete = transactions.filter(transac =>
//       transac.status.includes(orderSwitch[1])
//     )
//     setcompletedFilter(complete)
//     const pending = transactions.filter(transac =>
//       transac.status.includes(orderSwitch[2], )
//     )
//     setpendingFilter(pending)
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return (
//     <section className='mb-6 flex lg:w-[50dvw] w-full flex-col'>
//       <div className='flex lg:justify-between lg:flex-row flex-col justify-center lg:my-0 my-4'>
//         <h3 className='mb-1.5 text-xl font-Poppins text-[#101928]  font-semibold'>Transactions</h3>
//         <IconButton
//           type='button'
//           text='export Csv'
//           className='flex items-center gap-2 rounded-lg bg-[#F25E26] p-1 capitalize text-white  w-fit justify-items-center'
//           icon={<MdOutlineFileDownload className='text-base font-Poppins' />}
//         />
//       </div>
//       <Pipeline props={orderSwitch} setProps={setPipeline} start={pipeline} />

//       <div className='relative mt-6 w-full overflow-x-auto rounded-xl shadow-xl'>
//         <table className='mb-6 w-full table-auto rounded-xl bg-white '>
//           <thead className='table-header-group rounded-t-xl bg-[#F0F2F5] '>
//             <tr className=' tracking-wide'>
//               {tableHeader.map((val, index) => (
//                 <th
//                   key={index}
//                   className='mb-2  w-max p-6 text-left text-[12px] text-[#344054] font-Poppins font-medium capitalize tracking-wide '
//                   scope='col'
//                 >
//                   {val}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody className=''>
//             {pipeline === orderSwitch[0] ? (
//               <AllOrder transac={transactions} />
//             ) : pipeline === orderSwitch[1] ? (
//               <CompletedOrder transac={completedFilter} />
//             ) : (
//               <PendingOrder transac={pendingFilter} />
//             )}
//           </tbody>

//           {/* pagination */}
//           <tfoot className=''>
//             <tr className=' text-center'>
//               <td colSpan={6} className='pt-3 text-center'>
//                 <CustomPagination
//                   pageCount={4}
//                   className='flex items-center justify-center gap-3'
//                   pageRangeDisplayed={10}
//                   onPageChange={() => {}}
//                 />
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </section>
//   )
// }



import React, { useState, useEffect, useMemo } from 'react';
import { Pipeline } from './Pipeline';
import { AllOrder } from './AllOrder';
import { CompletedOrder } from './CompletedOrder';
import { PendingOrder } from './PendingOrder';
import { IconButton } from '../../component/Button';
import { transactions } from '@/app/static-data';
import { MdOutlineFileDownload } from 'react-icons/md';
import { CustomPagination } from '../../component/Pagination';

export const OrderDetails = () => {
  const orderSwitch = ['all', 'completed', 'pending'];
  const tableHeader = ['orderID', 'product details', 'amount', 'date', 'status', ' '];
  const [pipeline, setPipeline] = useState<string>('all');
  const [completedFilter, setcompletedFilter] = useState<any>([]);
  const [pendingFilter, setpendingFilter] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 4; // Number of items per page

  useEffect(() => {
    const complete = transactions.filter(transac =>
      transac.status.includes(orderSwitch[1])
    );
    setcompletedFilter(complete);
    const pending = transactions.filter(transac =>
      transac.status.includes(orderSwitch[2])
    );
    setpendingFilter(pending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const paginatedTransactions = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    if (pipeline === orderSwitch[0]) {
      return transactions.slice(start, end);
    } else if (pipeline === orderSwitch[1]) {
      return completedFilter.slice(start, end);
    } else {
      return pendingFilter.slice(start, end);
    }
  }, [currentPage, pipeline, completedFilter, pendingFilter]);

  return (
    <section className='mb-6 flex lg:w-[50dvw] w-full flex-col'>
      <div className='flex lg:justify-between lg:flex-row flex-col justify-center lg:my-0 my-4'>
        <h3 className='mb-1.5 text-xl font-Poppins text-[#101928] font-semibold'>Transactions</h3>
        <IconButton
          type='button'
          text='export Csv'
          className='flex items-center gap-2 rounded-lg bg-[#F25E26] p-1 capitalize text-white w-fit justify-items-center'
          icon={<MdOutlineFileDownload className='text-base font-Poppins' />}
        />
      </div>
      <Pipeline props={orderSwitch} setProps={setPipeline} start={pipeline} />

      <div className='relative mt-6 w-full overflow-x-auto rounded-xl shadow-xl'>
        <table className='mb-6 w-full table-auto rounded-xl bg-white'>
          <thead className='table-header-group rounded-t-xl bg-[#F0F2F5]'>
            <tr className=' tracking-wide'>
              {tableHeader.map((val, index) => (
                <th
                  key={index}
                  className='mb-2 w-max p-6 text-left text-[12px] text-[#344054] font-Poppins font-medium capitalize tracking-wide'
                  scope='col'
                >
                  {val}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {pipeline === orderSwitch[0] ? (
              <AllOrder transac={paginatedTransactions} />
            ) : pipeline === orderSwitch[1] ? (
              <CompletedOrder transac={paginatedTransactions} />
            ) : (
              <PendingOrder transac={paginatedTransactions} />
            )}
          </tbody>

          {/* pagination */}
          <tfoot>
            <tr className=' text-center'>
              <td colSpan={6} className='pt-3 text-center'>
                <CustomPagination
                  pageCount={Math.ceil(
                    pipeline === orderSwitch[0]
                      ? transactions.length / itemsPerPage
                      : pipeline === orderSwitch[1]
                      ? completedFilter.length / itemsPerPage
                      : pendingFilter.length / itemsPerPage
                  )}
                  className='flex items-center justify-center gap-3'
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};
