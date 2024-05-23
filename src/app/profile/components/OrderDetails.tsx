import React, { useState, useEffect } from 'react'
import { Pipeline } from './Pipeline'
import { AllOrder } from './AllOrder'
import { CompletedOrder } from './CompletedOrder'
import { PendingOrder } from './PendingOrder'
import { IconButton } from '../../component/Button'
import { transactions } from '@/app/static-data'
import { MdOutlineFileDownload } from 'react-icons/md'

export const OrderDetails = () => {
  const orderSwitch = ['all', 'completed', 'pending']
  const [pipeline, setPipeline] = useState<string>('all')
  const [completedFilter, setcompletedFilter] = useState<any>()
  const [pendingFilter, setpendingFilter] = useState<any>()

  useEffect(() => {
    const complete = transactions.filter(transac =>
      transac.status.includes('completed')
    )
    const pending = transactions.filter(transac =>
      transac.status.includes('pending')
    )
  })

  return (
    <section className='mb-6 flex w-[50dvw] flex-col'>
      <div className='flex justify-between'>
        <h3 className='mb-1.5 text-2xl  font-semibold'>Transactions</h3>
        <IconButton
          type='button'
          text='export Csv'
          className='flex items-center gap-2 rounded-md bg-[#F25E26] p-2 capitalize text-white'
          icon={<MdOutlineFileDownload className='text-xl' />}
        />
      </div>
      <Pipeline props={orderSwitch} setProps={setPipeline} start={pipeline} />

      <div className='relative w-full overflow-x-auto shadow-lg'>
        <table className='mt-6 w-full table-auto rounded-xl border bg-white shadow-lg rtl:text-right'>
          <thead className='rounded-t-xl bg-gray-50 text-sm'>
            <tr className='rounded-t-xl '>
              <th scope='col' className='py-6 font-semibold'>
                OrderId
              </th>
              <th scope='col' className='py-6 font-semibold'>
                Product Details
              </th>
              <th scope='col' className='py-6 font-semibold'>
                Amount
              </th>
              <th scope='col' className='py-6 font-semibold'>
                Date
              </th>
              <th scope='col' className='py-6 font-semibold'>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            <td>new</td>
          </tbody>

          {/* <tbody className='text-sm'>
            {pipeline === orderSwitch[0] ? (
              <AllOrder transac={transactions} />
            ) : pipeline === orderSwitch[1] ? (
              <CompletedOrder />
            ) : (
              <PendingOrder />
            )}
          </tbody> */}

          {/* pagination */}
          <div className='my-3 flex justify-center'>12345</div>
        </table>
      </div>
    </section>
  )
}
