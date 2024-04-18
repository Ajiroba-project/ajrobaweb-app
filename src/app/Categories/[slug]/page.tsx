"use client"
import {Breadcrumb} from '@/app/component/Breadcrumb'
import {useRouter} from "next/navigation";

const page =()=>{
    // const router = useRouter();
 
    return (

        <main>
            <Breadcrumb/>
            <div className="container"> slug: </div>
        </main>
    )
}
export default page