'use client'
import { useState } from 'react'
import { socialIcon, headerMenu, marqueeInfo } from '../static-data'
import Image from 'next/image'
import Brand from '../asset/logo.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoCartOutline } from 'react-icons/io5'
import { BiBell } from 'react-icons/bi'
import { CiSearch } from 'react-icons/ci'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { AuctionMarquee } from './Auction-Marquee'
import { FiMenu } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

export const Header = () => {
  const pathname = usePathname()
  const isRootPath = pathname === '/'
  const [active, setActive] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  // const [submenu, setSubmenu]= useState<boolean>();

  const hamburgerfunc = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <header className={` mb-9 `}>
        <div className='bg-[#2A2A2A] p-3 text-sm text-white'>
          <div className='flex items-center justify-between gap-3 px-7'>
            <div className='w-full  '>
              <AuctionMarquee info={marqueeInfo} />
            </div>
            <div className='header-socials mr-3 hidden gap-3 lg:flex '>
              {socialIcon.map((val, index) => (
                <div key={index} className='w-3.5 lg:w-4'>
                  <Image src={val.icon} alt={'socials'} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* end of top Marquee */}

        <div className='relative bg-white p-4  shadow-md'>
          <div className='flex w-full items-center lg:gap-[1em] gap-0 sm:justify-between md:justify-between lg:justify-around '>
            <div className='flex cursor-pointer items-center gap-2'>
              <Link href={'/'}>
                <Image src={Brand} alt='brand-logo' />
              </Link>
              {!isOpen ? (
                <IoClose
                  onClick={hamburgerfunc}
                  className='text-xl lg:hidden'
                />
              ) : (
                <FiMenu onClick={hamburgerfunc} className='text-xl lg:hidden' />
              )}


              <div
              className={
                isOpen
                  ? `hidden items-center lg:flex `
                  : 'fixed left-0 top-0 z-50 py-5 w-1/3 h-screen items-center bg-white lg:relative lg:h-fit'
              }
            >
              {/* brand logo for small screen */}
              <div className='Brand-logo my-8 flex w-max cursor-pointer items-center gap-2 lg:hidden '>
                <Link href={'/'}>
                  <Image src={Brand} alt='brand-logo' />
                </Link>
                {!isOpen ? (
                  <IoClose
                    onClick={hamburgerfunc}
                    className='text-xl lg:hidden'
                  />
                ) : (
                  <FiMenu
                    onClick={hamburgerfunc}
                    className='text-xl lg:hidden'
                  />
                )}
              </div>

              <ul
                className={
                  !isOpen
                    ? `flex w-max flex-col items-baseline gap-3  lg:flex-row`
                    : 'w-full items-center gap-2 lg:flex py-4'
                }
              >
                {headerMenu.map((val, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer px-4 ${
                      activeMenu === index ? 'text-[#F25E26]' : 'text-[#A09F9F]'
                    } hover:text-[#F25E26]
                    ${!isOpen ? "py-4 lg:py-1":""}
                    `}
                    onClick={() => {
                      setActiveMenu(activeMenu === index ? null : index)
                    }}
                  >
                    {val.submenu ? (
                      <div className='relative'>
                        <span className='flex items-center gap-2'>
                          {val.name}{' '}
                          {activeMenu === index ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </span>
                        {activeMenu === index && (
                          <ul className='absolute left-0 z-10 mt-2 rounded-md bg-white shadow-md'>
                            {/* {val.submenu.map((subItem, subIndex) => (
                                  <li key={subIndex} className="py-2 text-[#A09F9F] hover:text-[#F25E26] px-4 hover:bg-gray-100">{subItem.name}</li>
                                ))} */}
                            {val.submenu.map((subItem, subIndex) => (
                              <li
                                key={subIndex}
                                className='px-4 py-2 text-sm  text-[#A09F9F] hover:bg-gray-100 hover:text-[#F25E26]'
                              >
                                <Link href={subItem.path}>{subItem.name}</Link>{' '}
                                {/* Link to the submenu item */}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={isRootPath ? val.path : `${pathname}/${val.path}`}
                        className='flex items-center gap-2'
                      >
                        {val.name}
                      </Link>
                    )}
                  </li>
                ))}
                <div className='relative flex mx-4 lg:mx-0'>
                  <input type='text' className=' bg-[#F5F5F5] p-2 ' />
                  <CiSearch className='absolute  right-3 top-2 cursor-pointer bg-[#F5F5F5] text-xl outline-[#F25E26]' />
                </div>
              </ul>
              </div>
            </div>

            <div className="flex gap-4">
            <BiBell className='cursor-pointer text-xl text-[#A09F9F]' />
            <IoCartOutline className='cursor-pointer text-xl text-[#A09F9F]' />
            </div>

          </div>
        </div>
      </header>
    </>
  )
}
