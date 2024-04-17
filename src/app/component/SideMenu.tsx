'use client'
import {useState, Fragment} from "react"
import {categoriesMenu} from '../static-data'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from 'next/link'
import { Poppins, Inter } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "900"], });
const inter = Inter({ subsets: ["latin"], weight: ["500", "900"], });

export const SideMenu= ()=>{
    const [active, setActive] = useState<number>();
    const [submenu, setSubmenu] = useState<string>();
    


return (
    <>
    <section className="p-12  ">
        <ul className="relative">
           {
                categoriesMenu.map((val, index)=>(
                <Fragment key={index}>
                    <div  className="relative"> 
                        <li className={`${poppins.className} ${active === index ?"text-[#F25E26]":""}  py-2  cursor-pointer flex gap-1.5 items-center hover:text-[#F25E26] `} onClick={()=>{setActive(index), setSubmenu(val.name)}}>
                            <span className="flex gap-2 items-center ">
                                <p>{val.name}</p> {active === index ? <IoIosArrowUp/>:<IoIosArrowDown/>}    
                            </span>
                        </li>

                    </div>

                    {active === index && (<ul className={`${inter.className} bg-white absolute shadow-md -top-4 -right-12 rounded z-20 w-[14rem] text-sm`}>
                    {val.categories?.map((subcategory) => (
                    <li key={subcategory.name} className="my-4 cursor-pointer p-2 hover:bg-[#FCDFD4]">
                    <Link href={subcategory.path} className="  ">{subcategory.name}</Link>
                                </li>
                                ))}
                            </ul>)}
                    
                </Fragment>))
            } 
        </ul>
    </section>
    </>

)
}