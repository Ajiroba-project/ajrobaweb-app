import Image from 'next/image';
import Brand from '../asset/logoWhite.svg'
import { quickLinks, ourCompany, getInTouch } from '../static-data'
import Link from 'next/link'
import { Lato, Poppins } from "next/font/google";
import {
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
} from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'
const lato = Lato({ subsets: ["latin"], weight: ["400", "900"], });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "900"], });

export const Footer = () => {
  const date = new Date().getFullYear()

  return (
    <footer className={`${lato.className} bg-[#111111]`}>
      <section className='p-12 text-white '>
        <div className='flex flex-col items-center gap-24 p-8  lg:md:flex-row lg:items-start '>
          <div className='flex w-64 flex-col gap-4'>
            <Link href='/'>
              <Image src={Brand} alt='brand-logo' />
            </Link>
            <p className={`text-lg italic text-white  ${poppins.className}`}>
              ... Your foremost consumer auction platform
            </p>
            <div className='header-socials flex gap-3'>
              <Link href='/'>
                <FaFacebookF className='rounded-full bg-white p-2  text-4xl text-black hover:bg-[#F25E26]' />
              </Link>
              <Link href='/'>
                <FaYoutube className='rounded-full bg-white p-2  text-4xl text-black hover:bg-[#F25E26]' />
              </Link>
              <Link href='/'>
                <FaLinkedinIn className='rounded-lg bg-white p-2  text-4xl text-black hover:bg-[#F25E26]' />
              </Link>
              <Link href='/'>
                <FaInstagram className='rounded-xl text-4xl text-white hover:text-[#F25E26]' />
              </Link>
            </div>
          </div>

          <div className='flex flex-col justify-start'>
            <p className='text-lg'>Quick Links</p>
            <ul className='py-2 '>
              {quickLinks.map((val, index) => (
                <li
                  key={index}
                  className='cursor-pointer py-2  hover:text-[#F25E26]'
                >
                  <Link
                    href={val.links}
                    className={`text-base font-normal text-[#FEFEFEE5] hover:text-[#F25E26] ${poppins.className}`}
                  >
                    {val.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col justify-start'>
            <p className='text-lg '>Our Company</p>
            <ul className='py-2'>
              {ourCompany.map((val, index) => (
                <li key={index} className='cursor-pointer py-2 text-base '>
                  <Link
                    href={val.links}
                    className={`text-base font-normal text-[#FEFEFEE5] hover:text-[#F25E26] ${poppins.className} `}
                  >
                    {val.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='text-lg'>Get In Touch </p>
            <ul className='py-2'>
              {getInTouch.map((val, index) => (
                <li
                  key={index}
                  className='flex cursor-pointer items-center gap-2 py-2 text-base hover:text-[#F25E26]'
                >
                  {val.icon}{' '}
                  <Link
                    href={val.links}
                    className={`text-base font-normal text-[#FEFEFEE5] hover:text-[#F25E26] ${poppins.className}`}
                  >
                    {val.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* copyright */}
      <section className='bg-[#F25E26] p-4 text-white'>
        <p className='text-center'>
          &copy; {date} AJIROBA Technologies. All right Reserved
        </p>
      </section>
    </footer>
  )
}
