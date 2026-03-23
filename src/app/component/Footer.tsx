import Image from 'next/image';
import Brand from '../asset/logoWhite.svg'
import { quickLinks, ourCompany, getInTouch } from '../static-data'
import Link from 'next/link'
import { Lato, Poppins } from "next/font/google";
import {
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaTiktok,
} from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'
const lato = Lato({ subsets: ["latin"], weight: ["400", "900"], });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "900"], });

export const Footer = () => {
  const date = new Date().getFullYear()

  return (
    <footer className={` ${lato.className} bg-[#111111]`}>
      <section className='py-20 text-white '>
        <div className='content-container flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between'>
          {/* Brand + socials — full width on mobile, fixed width on desktop */}
          <div className='flex w-full flex-col gap-4 lg:w-64'>
            <Link href='/'>
              <Image src={Brand} alt='brand-logo' />
            </Link>
            <p className={`text-sm !italic text-[#F6F6F6] ${poppins.className}`}>
              ... Your foremost consumer raffle platform
            </p>
            <div className='header-socials flex gap-3'>
              <Link href='https://www.facebook.com/share/1BvVA6ERkU/'>
                <FaFacebookF className='rounded-full bg-white p-2 text-4xl text-black hover:bg-[#F25E26]' />
              </Link>
              <Link href='https://www.youtube.com/@AjirobaMedia'>
                <FaYoutube className='rounded-full bg-white p-2 text-4xl text-black hover:bg-[#F25E26]' />
              </Link>
              <Link href='https://www.tiktok.com/@ajiroba.tech?_t=ZS-8yexHRqXwIs&_r=1'>
                <FaTiktok className='rounded-lg bg-white p-2 text-4xl text-black hover:bg-[#F25E26]' />
              </Link>
              <Link href='https://www.instagram.com/ajirobatech?utm_source=qr&igsh=ODY5NWZtcmE0dDNk'>
                <FaInstagram className='rounded-xl text-4xl text-white hover:text-[#F25E26]' />
              </Link>
            </div>
          </div>

          {/* Quick Links + Our Company — side by side on mobile */}
          <div className='grid grid-cols-2 gap-6 sm:gap-10 lg:contents'>
            <div className='flex flex-col'>
              <p className='text-lg font-semibold'>Quick Links</p>
              <ul className='py-2'>
                {quickLinks.map((val, index) => (
                  <li
                    key={index}
                    className='cursor-pointer py-2 hover:text-[#F25E26]'
                  >
                    <Link
                      href={val.links}
                      className={`text-sm font-normal font-Poppins text-[#FEFEFEE5] hover:text-[#F25E26] ${poppins.className}`}
                    >
                      {val.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex flex-col'>
              <p className='text-lg font-semibold'>Our Company</p>
              <ul className='py-2'>
                {ourCompany.map((val, index) => (
                  <li key={index} className='cursor-pointer py-2 text-base'>
                    <Link
                      href={val.links}
                      className={`text-sm font-normal text-[#FEFEFEE5] hover:text-[#F25E26] ${poppins.className}`}
                    >
                      {val.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Get In Touch */}
          <div>
            <p className='text-lg font-semibold'>Get In Touch</p>
            <ul className='py-2'>
              {getInTouch.map((val, index) => (
                <li
                  key={index}
                  className='flex cursor-pointer items-center gap-2 py-2 text-base hover:text-[#F25E26]'
                >
                  {val.icon}{' '}
                  <p
                    className={`text-sm font-normal text-[#FEFEFEE5] hover:text-[#F25E26] ${poppins.className}`}
                  >
                    {val.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* copyright */}
      <section className='bg-[#F25E26] py-2 sm:py-4 text-white'>
        <div className='content-container'>
          <p className='text-left sm:text-center text-sm'>
            &copy; {date} AJIROBA Technologies. All right Reserved
          </p>
        </div>
      </section>
    </footer>
  )
}
