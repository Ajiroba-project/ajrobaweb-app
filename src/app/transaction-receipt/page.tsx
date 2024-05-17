import React from 'react'
import { Header } from './component/Header'
import {Data} from './data'

const Page = () => {
  return (
    <section>
      <div className='bg-gray-100 py-8'>
        <Header />
      </div>
      <div className='flex flex-col items-center py-8'>
        <p className="brand3">Transaction Amount</p>
        <p className='text-xl font-bold'>₦0.00</p>
      </div>
      <section className="container">
        <table className="flex justify-between">
            <tr>
                <th>
                    Name
                </th>
            </tr>
            <tr>
                <td>
                    Anonymous
                </td>
            </tr>
            <hr />
        </table>
      </section>
    </section>
  )
}

export default Page
