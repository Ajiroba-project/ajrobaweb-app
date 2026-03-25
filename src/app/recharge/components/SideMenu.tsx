import React from 'react'
import { UserMenu } from '@/app/static-data'
import { userNavStore } from '@/store/store'
import { useRouter, usePathname } from "next/navigation";

export const SideMenu = () => {
  const toggleSidebar = userNavStore(state => state.toggleSidebar)
  const router = useRouter();
  const pathname = usePathname()

  return (
    <div className='mt-10 flex flex-col'>
      {UserMenu.map((val, index) => (
        <div
          className={`flex w-full cursor-pointer items-center gap-2 p-4 text-lg hover:bg-[#FCDFD4] ${pathname === val.path ? 'border-2 border-[#F25E26] bg-[#FCDFD4]' : ''}`}
          key={index}
          onClick={() => {
            router.push(val.path)
            toggleSidebar(false)
          }}
        >
          <div className='text-xl text-[#F25E26]'>{val.icon}</div>
          <div className='w-max text-[#101828] font-Poppins text-sm'>{val.name}</div>
        </div>
      ))}
    </div>
  )
}
