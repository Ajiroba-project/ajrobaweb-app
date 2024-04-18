import Link from "next/link"
import { Poppins } from "next/font/google";
import { useRouter } from 'next/router'

interface BreadcrubProps {
    // path:string
    text:string
}
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "900"], });

export const Breadcrumb =()=>{
      const router = useRouter()
      const { param } = router.query

    return (
        <section className={`${poppins.className} bg-[#F6F6F6] -mt-8`}>
            <div className=" flex gap-2 text-sm container py-10">
                <Link href="/" className="underline hover:text-[#F25E26]">Home  </Link> 
                <Link href="" className="underline hover:text-[#F25E26]">Categories</Link>
                <Link href="" className="underline">{param}</Link>                
            </div>
        </section>
    )
}