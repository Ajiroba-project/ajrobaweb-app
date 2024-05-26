import React from 'react'
import Image from 'next/image'
import { CiMenuKebab } from 'react-icons/ci'

type AuctionProps = {
  product: any[]
}

export const AuctionWinCard = ({ product }: AuctionProps) => {
  return (
    <div>
      <div className=' '>
        <div className='flex flex-col '>
          {product.map((val: any, index: number) => (
            <div key={index} className='relative my-2 flex gap-4 border p-3'>
              <Image
                src={val.image}
                alt={val.name}
                width={300}
                className='h-auto w-auto rounded-md bg-gray-100 bg-contain'
              />
              <div className='flex flex-col gap-3 capitalize'>
                <p className=' font-semibold'>{val.name}</p>
                <p>OrderID: </p>
                <p>TicketPrice: ₦{val.price}</p>
                <div className='mt-5 flex gap-3'>
                  {val.tag &&
                    val.tag.map((value: string, index: number) => (
                      <p
                        key={index}
                        className={`text-xs ${value === 'open' || value === 'delivered' ? 'bg-green-200 text-emerald-800' : value === 'close' ? 'bg-rose-200 text-red-800' : value === 'redeem items' ? 'bg-blue-700 text-white' : 'bg-[#F25E26] text-white'} rounded-xl px-2.5  py-1 `}
                      >
                        {value}
                      </p>
                    ))}
                </div>
              </div>
              <span className='absolute right-3 top-2 rounded-md border p-2 cursor-pointer'>
                <CiMenuKebab />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
