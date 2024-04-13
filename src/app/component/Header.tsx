"use client"
import {useState} from "react"
import Marquee from 'react-fast-marquee'
import { socialIcon, headerMenu } from '../static-data'
import Image from 'next/image'
import Brand from '../asset/logo.svg'
import Link from 'next/link'
import { IoCartOutline } from "react-icons/io5";
import { BiBell } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

export const Header = () => {
  const [active, setActive] = useState<number>(0);
  // const [submenu, setSubmenu]= useState<boolean>();

  const info = [
    'Follow us on all our social media platforms : www.ajiroba.com.',
    'Buy a ticket now and stand a chance to win ',
    'your preferred goods in our raffle draw.'
  ]
  return (
    <>
      <header className={` header-banner mb-9`}>
        <div className='flex w-full items-center gap-4 bg-[#2A2A2A] p-3 px-14 text-sm text-white'>
          <Marquee pauseOnHover={true} gradient={false}>
            {info.map((val, index) => (
              <p key={index}>{val} &nbsp;&nbsp;&nbsp;</p>
            ))}
          </Marquee>

          <div className='header-socials flex gap-3'>
            {socialIcon.map((val, index) => (
              <p key={index}>{val.icon}</p>
            ))}
          </div>
        </div>
        {/* end of top Marquee */}
        <div className='flex items-center justify-between gap-5 bg-white  p-6 px-14 shadow-md'>
          <div className='Brand-logo'>
            <Image src={Brand} alt='brand-logo' />
          </div>
          <nav >
            <ul className='flex gap-5 items-center'>
              {headerMenu.map((val, index) => (
                <li key={index} className={`${active ===index ? "text-[#F25E26]":"text-[#A09F9F]"} cursor-pointer px-4 hover:text-[#F25E26]`} onClick={()=>{setActive(index)}}>
                  <Link href={val.path} className="flex gap-2 items-center">
                  {val.name} 
                  {val.submenu ? <>
                  <IoIosArrowDown/>

                  </>:""}
                  
                  </Link>

                </li>
              ))}
              <li className="flex relative">
                <input type="text" className=" bg-[#F5F5F5] p-2"/>
                  <CiSearch className="text-xl  cursor-pointer right-3 top-2 bg-[#F5F5F5] absolute outline-[#F25E26]"/>
              </li>
            </ul>
          </nav>
          <div className='icon flex gap-4 item-center'>
            <div><BiBell className="text-xl text-[#A09F9F]"/></div>
            <div><IoCartOutline className="text-xl text-[#A09F9F]"/></div>
          </div>
        </div>
      </header>
    </>
  )
}
