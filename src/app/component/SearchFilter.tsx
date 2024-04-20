import React from 'react'
// import { categories } from '@/app/static-data'
// import { Products } from '@/app/static-data'
import { FiMenu } from 'react-icons/fi'
// import {SideNav} from '../component/SideMenu'

export const PriceFilter = () => {
  return (
    <div className='py-6'>
      <p>Price</p>

      <div>
        <input
          type='radio'
          name='price1'
          value='cvvcvc'
          id=''
          className='mr-3'
        />
        <label htmlFor='huey'>under ₦2000</label>
      </div>

      <div>
        <input
          type='radio'
          name='price1'
          value='cvvcvc'
          id=''
          className='mr-3'
        />
        <label htmlFor='huey'>₦2000 - ₦5000</label>
      </div>

      <div>
        < input
          type='radio'
          name='price1'
          value='cvvcvc'
          id=''
          className='mr-3'
        />
        <label htmlFor='huey'>₦5000 - Above</label>
      </div>
      {/* custome price */}
      <div className='gap-2'>
        <p className="py-5">Custom Price Range</p>
        <div className='flex gap-3'>
          <input type='text' placeholder='min' className='w-14 p-2' />
          <input type='text' placeholder='max' className='w-14 p-2' />
          <input
            type='button'
            value='Apply'
            className=' rounded border-2 border-[#F25E26] text-[#F25E26] p-3'
          />
        </div>
      </div>
    </div>
  )
}

export const SearchFilter = () => {

  return (
    <div>
      <div className='flex cursor-pointer items-center gap-3 p-3'>
        <FiMenu />
        <p> All Category</p>
      </div>

      {/* Lists of categories */}
      <div>{/* {paths} */}</div>

      {/* price */}
      <PriceFilter />

      {/* brand  */}

      {/* rating */}
    </div>
  )
}
