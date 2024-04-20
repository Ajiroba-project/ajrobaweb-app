'use client'
import { useState } from 'react'
import { socialIcon, headerMenu, marqueeInfo } from '../static-data'
import Image from 'next/image'
import Brand from '../asset/logo.svg'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoCartOutline } from 'react-icons/io5'
import { BiBell } from 'react-icons/bi'
import { CiSearch } from 'react-icons/ci'
import { IoIosArrowDown } from 'react-icons/io'
import { AuctionMarquee } from './Auction-Marquee'

export const Header = () => {
    const pathname = usePathname();
  const isRootPath = pathname === '/';
  const [active, setActive] = useState<number>(0)
  // const [submenu, setSubmenu]= useState<boolean>();
  return (
    <>
      <header className={` mb-9 `}>
        <div className='flex items-center gap-2 bg-[#2A2A2A] p-3 px-12 text-sm text-white f-full'>
          {/* <AuctionMarquee info={marqueeInfo} /> */}
          <div className='header-socials flex gap-3 '>
            {socialIcon.map((val, index) => (
              <div key={index} className="w-4"><Image src={val.icon} alt={"socials"}/></div>
            ))}
          </div>
        </div>
        {/* end of top Marquee */}
        
        <div className='flex items-center justify-between gap-5 bg-white  p-6 lg:px-14 px-7 shadow-md'>
          <div className='Brand-logo'>
            <Link href={"/"}>
             <Image src={Brand} alt='brand-logo' />
           </Link>
          </div>
          <nav className='relative'>
            <ul className='items-center gap-4 lg:flex '>
              {headerMenu.map((val, index) => (
                <li
                  key={index}
                  className={` ${active === index ? 'text-[#F25E26]' : 'text-[#A09F9F]'} cursor-pointer px-4 hover:text-[#F25E26]`}
                  onClick={() => {
                    setActive(index)
                  }}
                >
                  <Link href={isRootPath ? val.path : `${pathname}/${val.path}`} className='flex items-center gap-2'>
                    {val.name}
                    {val.submenu ? (
                      <>
                        <IoIosArrowDown />
                      </>
                    ) : (
                      ''
                    )}
                  </Link>
                </li>
              ))}
              <li className='relative flex'>
                <input type='text' className=' bg-[#F5F5F5] p-2' />
                <CiSearch className='absolute  right-3 top-2 cursor-pointer bg-[#F5F5F5] text-xl outline-[#F25E26]' />
              </li>
            </ul>
          </nav>
          <div className='icon item-center flex gap-4'>
            <div>
              <BiBell className='cursor-pointer text-xl text-[#A09F9F]' />
            </div>
            <div>
              <IoCartOutline className='cursor-pointer text-xl text-[#A09F9F]' />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
