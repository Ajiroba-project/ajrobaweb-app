import Image from 'next/image';
import Brand from '../asset/logoWhite.svg'
import { socialIcon, headerMenu, quickLinks, ourCompany, getInTouch } from '../static-data'
import Link from 'next/link'
import { Lato } from "next/font/google";
const lato = Lato({ subsets: ["latin"], weight: ["400", "900"], });

export const Footer = () => {
  const date = new Date().getFullYear()
  
  return (
    <footer className={`${lato.className} bg-[#111111]`}>
      <section className="text-white p-12 ">
        <div className="p-8 flex gap-24 flex-col lg:md:flex-row  lg:items-start items-center " >
          <div className="flex flex-col gap-4">
            <Link href="/">
             <Image src={Brand} alt='brand-logo' />
           </Link>
            <p className="text-white text-sm">... Your foremost consumer auction platform</p>
            <div className='header-socials flex gap-3'>
            {socialIcon.map((val, index) => (
              <div key={index}><Image  src={val.icon} alt={"socials"}/></div>
            ))}
          </div>
          </div>

        <div>
          <p className="text-lg">Quick Links</p>
          <ul className="py-2">
            {quickLinks.map((val, index)=>(
              <li key={index} className="cursor-pointer py-2 hover:text-[#F25E26] text-sm">
                <Link href={val.links}>{val.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p  className="text-lg ">Our Company</p>
          <ul className="py-2">
            {ourCompany.map((val, index)=>(
               <li key={index} className="cursor-pointer py-2 hover:text-[#F25E26] text-sm"><Link href={val.links}>{val.name}</Link></li>

            ))}
          </ul>
        </div>
        <div>
          <p  className="text-lg">Get In Touch </p>
           <ul className="py-2">
            {getInTouch.map((val, index)=>(
               <li key={index} className="cursor-pointer py-2 hover:text-[#F25E26] text-sm flex gap-2 items-center">
               {val.icon} <Link href={val.links}>{val.name}</Link>
               </li>

            ))}
          </ul>
        </div>
        </div>
        </section>


        {/* copyright */}
        <section className="text-white bg-[#F25E26] p-4">
          <p className="text-center">&copy; {date} AJIROBA Technologies. All right Reserved</p>
        </section>
    </footer>
  )
}
