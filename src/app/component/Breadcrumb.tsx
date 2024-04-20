
import Link from "next/link"
import {Fragment} from "react"
import { Poppins } from "next/font/google";
import {useState, useEffect} from "react"


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "900"], });


type BreadcrubProps ={
    text:any
}

export const Breadcrumb =({paths}:BreadcrubProps)=>{
    const [Category, setCategory]= useState()
    
        useEffect(() => {
        if (paths.length > 0) {
            setCategory(paths[paths.length - 1]);
        }
    }, [paths])

    return (
        <section className={`${poppins.className} bg-[#F6F6F6] -mt-8`}>
            <div className=" flex gap-2 text-sm container py-10">
                <Link href="/" className="underline hover:text-[#F25E26]">Home  </Link> 
                {
                    paths.map((path, index) => (
                        <Fragment key={index}>
                            <span> > </span>
                            <Link
                            href={`/${paths.slice(0, index + 1).join("/")}`}
                            className={`${poppins.className} underline hover:text-[#F25E26] `}
                            >
                            {path}
                            </Link>
                        </Fragment>
                    ))
                }
                          
            </div>
            <div className="container mb-4">
                 <p className={`${poppins.className} capitalize text-xl pb-4`}>{Category}</p>   
            </div>
            
        </section>
    )
}