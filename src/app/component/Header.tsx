'use client'
import { useState } from 'react'
import { socialIcon, headerMenu, marqueeInfo } from '../static-data'
import { usePathname, useRouter } from 'next/navigation'
import { IoCartOutline } from 'react-icons/io5'
import { BiBell } from 'react-icons/bi'
import { CiSearch } from 'react-icons/ci'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { AuctionMarquee } from './Auction-Marquee'
import { FiMenu } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { useAuthStore, userNavStore } from '@/store/store'
import { useMutateData } from '@/hooks/useMutateData'
import Image from 'next/image'
import Brand from '../asset/logo.svg'
import Link from 'next/link'

export const Header = () => {
  const pathname = usePathname()
  const isRootPath = pathname === '/'
  // const [active, setActive] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const { isLoggedIn, clearAuthCookies } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    clearAuthCookies: state.clearAuthCookies
  }))


  const { setHeaderNav, headerNav } = userNavStore(state => ({
    setHeaderNav: state.setHeaderNav,
    headerNav: state.headerNav
  }))



  const hamburgerfunc = () => {
    setIsOpen(!isOpen)
  }

  const handleSuccess = () => {
    clearAuthCookies();
    router.push("/signin");
  };
  const handleError = () => {
    console.log("Somthing went wrong...");
    clearAuthCookies();
    router.push("/signin");
  };

  const { mutate } = useMutateData(
    'signout',
    handleSuccess,
    handleError
  )

  const SignoutFunc = () => {
    mutate({
      url: '/api/signout',
      payload: {}
    })

  }

  const router = useRouter()
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

        <div className='relative bg-white p-2  shadow-md'>
          <div
            className={`${isOpen ? 'bg-opacity-4 fixed left-0 top-0 z-50 h-screen w-screen bg-[#000000d1]  bg-opacity-[0.9] bg-clip-padding backdrop-blur-sm backdrop-filter' : 'h-auto w-auto bg-transparent '}`}
          >
            <div className='flex w-full items-center justify-between gap-0 md:justify-between lg:justify-around lg:gap-[1em] '>
              <div className='flex cursor-pointer items-center gap-2'>
                <Link href={'/'} className={`${isOpen ? 'hidden' : null}`}>
                  <Image src={Brand} alt='brand-logo' />
                </Link>

                <div
                  className={
                    !isOpen
                      ? `hidden items-center lg:flex `
                      : 'fixed right-0 top-0 z-50 h-screen items-center bg-white py-5 lg:relative lg:h-fit'
                  }
                >
                  {/* brand logo for small screen */}
                  <div className='Brand-logo my-8 flex w-max cursor-pointer items-center gap-2 lg:hidden '>
                    <Link href={'/'}>
                      <Image src={Brand} alt='brand-logo' />
                    </Link>
                    {isOpen ? (
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
                        : 'w-full items-center gap-2 py-2 lg:flex'
                    }
                  >
                    {headerMenu.map((val, index) => (
                      <li
                        key={index}
                        className={`cursor-pointer px-4 ${val.name === headerNav
                          ? 'text-[#F25E26]'
                          : 'text-[#A09F9F]'
                          } hover:text-[#F25E26]
                    ${!isOpen ? 'py-2 lg:py-1' : ''}
                    `}
                        onClick={() => {
                          setActiveMenu(activeMenu === index ? null : index)
                          setHeaderNav(val.name)
                        }}
                      >
                        {val.submenu ? (
                          <div className='relative'>
                            <span className='flex items-center gap-2'>
                              {val.name}
                              {activeMenu === index ? (
                                <IoIosArrowUp />
                              ) : (
                                <IoIosArrowDown />
                              )}
                            </span>
                            {activeMenu === index && (
                              <ul className='absolute left-0 z-10 mt-2 h-fit w-max rounded-md bg-white pb-2 shadow-md'>
                                {val.submenu.map((subItem, subIndex) => (
                                  <li
                                    key={subIndex}
                                    className={` ${(subItem.name === 'Profile' && !isLoggedIn) || (subItem.name === 'Wallet' && !isLoggedIn) || (subItem.name === 'Community' && !isLoggedIn) || (subItem.name === 'Referral Code' && !isLoggedIn) || (subItem.name === 'Sign Out' && !isLoggedIn) ? 'hidden' : 'block'} ${(subItem.name === 'Sign Up' && isLoggedIn) || (subItem.name === 'Sign In' && isLoggedIn) ? 'hidden' : ''} p-2 px-4 text-sm  text-[#A09F9F] hover:bg-gray-100 hover:text-[#F25E26] `}
                                  >
                                    <div
                                      onClick={() =>
                                        subItem.name === 'Sign Out'
                                          ? SignoutFunc()
                                          : router.push(`${subItem.path}`)
                                      }
                                    >
                                      <span> {subItem.name} </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={
                              // isRootPath ? val.path : `${pathname}/${val.path}`
                              isRootPath ? val.path : `/${val.path}`
                            }
                            className='flex items-center gap-2'
                          >
                            {val.name}
                          </Link>
                        )}
                      </li>
                    ))}
                    <div className='relative mx-4 flex lg:mx-0'>
                      <input type='text' className=' bg-[#F5F5F5] p-2 ' />
                      <CiSearch className='absolute  right-3 top-2 cursor-pointer bg-[#F5F5F5] text-xl outline-[#F25E26]' />
                    </div>
                  </ul>
                </div>
              </div>

              <div className='flex gap-4'>
                <BiBell className='cursor-pointer text-xl text-[#A09F9F]' />
                <IoCartOutline
                  onClick={() => router.push('/cart')}
                  className='cursor-pointer text-xl text-[#A09F9F]'
                />
                {isOpen ? (
                  <IoClose
                    onClick={hamburgerfunc}
                    className='text-xl text-[#A09F9F] lg:hidden'
                  />
                ) : (
                  <FiMenu
                    onClick={hamburgerfunc}
                    className='text-xl text-[#A09F9F] lg:hidden'
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
