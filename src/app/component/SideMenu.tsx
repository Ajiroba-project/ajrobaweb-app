'use client'
import {useState} from "react"
import {categoriesMenu} from '../static-data'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from 'next/link'

export const SideMenu= ()=>{
    const [active, setActive] = useState<number>()

return (
    <>
    <section className="container">
        <ul className="">
           {
            categoriesMenu.map((val, index)=>(
            <Link href={val.path} key={index}> 
                <li  className={`${active === index ?"text-[#F25E26]":""} py-2  cursor-pointer flex gap-2 items-center hover:text-[#F25E26]`} onClick={()=>{setActive(index)}}>
                <span className="flex gap-2 items-center ">
                    <p>{val.name}</p> {active === index ? <IoIosArrowUp/>:<IoIosArrowDown/>}    
                </span>

                    {/* <ul>
                    <Link>
                    <li></li>
                    </Link> 
                    <ul> */}
                    
                    </li>
                    </Link>
            ))
        } 
        </ul>
    </section>
    </>

)
}