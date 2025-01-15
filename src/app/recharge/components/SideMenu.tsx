import React from 'react'
import { UserMenu } from '@/app/static-data'
import { userNavStore } from '@/store/store'

import { useRouter, usePathname } from "next/navigation";

export const SideMenu = () => {
  const userNavMenu = userNavStore(state => state.userNav)
  const setUserNav = userNavStore(state => state.setUserNav)

  const router = useRouter();

   const pathname = usePathname()




  return (
    <div className='mt-10 flex flex-col '>
      {UserMenu.map((val, index) => (
        <div
          className={`flex w-full cursor-pointer items-center gap-2 p-4 py-4 text-lg hover:bg-[#FCDFD4] hover:py-4  ${  pathname === val.path  ? ' border-2 border-[#F25E26] bg-[#FCDFD4] py-4' : ''}`}
          key={index}
    /*       onClick={() => setUserNav(val.name)} */
          onClick={()=> router.push(`${val.path}`)}
        >
          <div className='text-xl text-[#F25E26]'>{val.icon}</div>
          <div className='w-max text-[#101828] font-Poppins text-sm'>{val.name}</div>
        </div>
      ))}
    </div>
  )
}
