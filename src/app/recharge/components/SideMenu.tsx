import React from 'react'
import { UserMenu } from '@/app/static-data'
import { userNavStore } from '@/store/store'

export const SideMenu = () => {
  const userNavMenu = userNavStore(state => state.userNav)
  const setUserNav = userNavStore(state => state.setUserNav)

  return (
    <div className='mt-10 flex flex-col '>
      {UserMenu.map((val, index) => (
        <div
          className={`flex w-full cursor-pointer items-center gap-2 p-4 text-lg hover:bg-[#FCDFD4]  ${userNavMenu === val.name ? ' border-2 border-[#F25E26] bg-[#FCDFD4]' : ''}`}
          key={index}
          onClick={() => setUserNav(val.name)}
        >
          <div className='text-xl text-[#F25E26]'>{val.icon}</div>
          <div className='w-max'>{val.name}</div>
        </div>
      ))}
    </div>
  )
}
