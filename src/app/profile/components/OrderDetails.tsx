import React, { useState, useEffect, useMemo } from 'react'
import { Pipeline } from './Pipeline'
import { AllOrder } from './AllOrder'
import { CompletedOrder } from './CompletedOrder'
import { PendingOrder } from './PendingOrder'
import { IconButton } from '../../component/Button'
import { transactions } from '@/app/static-data'
import { MdOutlineFileDownload } from 'react-icons/md'
import {CustomPagination } from "../../component/Pagination"

export const OrderDetails = () => {
  const orderSwitch = ['all', 'completed', 'pending']
  const tableHeader = ["orderID", "product details", "amount", "date", "status", " "]
  const [pipeline, setPipeline] = useState<string>('all')
  const [completedFilter, setcompletedFilter] = useState<any>()
  const [pendingFilter, setpendingFilter] = useState<any>()

   const [currentPage, setCurrentPage] = useState<number>(0)
  const [categoryCurrentPage, setCategoryCurrentPage] = useState<number>(0)
    // const [displayedProducts, setDisplayedProducts] = useState<any | []>(
    //   Products.slice(0, 12)
    // )
    

  useEffect(() => {
    const complete = transactions.filter(transac =>
      transac.status.includes(orderSwitch[1])
    )
    setcompletedFilter(complete)
    const pending = transactions.filter(transac =>
      transac.status.includes(orderSwitch[2], )
    )
    setpendingFilter(pending)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className='mb-6 flex lg:w-[50dvw] w-full flex-col'>
      <div className='flex lg:justify-between lg:flex-row flex-col justify-center lg:my-0 my-4'>
        <h3 className='mb-1.5 text-2xl  font-semibold'>Transactions</h3>
        <IconButton
          type='button'
          text='export Csv'
          className='flex items-center gap-2 rounded-md bg-[#F25E26] p-2 capitalize text-white  w-fit justify-items-center'
          icon={<MdOutlineFileDownload className='text-xl' />}
        />
      </div>
      <Pipeline props={orderSwitch} setProps={setPipeline} start={pipeline} />

      <div className='relative mt-6 w-full overflow-x-auto rounded-xl shadow-xl'>
        <table className='mb-6 w-full table-auto rounded-xl bg-white '>
          <thead className='table-header-group rounded-t-xl bg-gray-50 '>
            <tr className=' tracking-wide'>
              {tableHeader.map((val, index) => (
                <th
                  key={index}
                  className='w-max p-6 text-left text-sm font-semibold capitalize tracking-wide '
                  scope='col'
                >
                  {val}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className=''>
            {pipeline === orderSwitch[0] ? (
              <AllOrder transac={transactions} />
            ) : pipeline === orderSwitch[1] ? (
              <CompletedOrder transac={completedFilter} />
            ) : (
              <PendingOrder transac={pendingFilter} />
            )}
          </tbody>

          {/* pagination */}
          <tfoot className=''>
            <tr className=' text-center'>
              <td colSpan={6} className='pt-3 text-center'>
                <CustomPagination
                  pageCount={4}
                  className='flex items-center justify-center gap-3'
                  pageRangeDisplayed={10}
                  onPageChange={() => {}}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}
