"use client"
import { useState, useEffect } from 'react'
import { usePathname } from "next/navigation";
import { useRouter } from 'next/router'
import { Breadcrumb } from '@/app/component/Breadcrumb'
import { SearchFilter } from '@/app/component/SearchFilter'
import { Products } from "@/app/static-data";
import { ProductCard } from "@/app/component/Card"


const Page = () => {
    const pathname = usePathname();
    const [path, setPath] = useState("");
    const decodedPaths = pathname
        .split("/")
        .filter((path) => path !== "")
        .map((path) => decodeURIComponent(path));

    useEffect(() => {
        if (decodedPaths.length > 0) {
            setPath(decodedPaths[decodedPaths.length - 1]);
        }
    }, [decodedPaths]);

    const filteredProducts =
        path !== undefined
            ? Products.filter((product) =>
                product.category.toLowerCase().includes(path.toLowerCase())
            )
            : [];


    return (
        <main>
            <Breadcrumb paths={decodedPaths} />
            <div className="flex gap-4">
                <div className="bg-[#F6F6F6] container shadow h-full flex-1">
                    <SearchFilter paths={path} />
                </div>
                <div className="flex-auto">
                    <ProductCard cardInfo={filteredProducts} />
                </div>

            </div>
        </main>
    );
}
export default Page