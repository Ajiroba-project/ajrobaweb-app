"use client"
import { useState, useEffect, useMemo } from 'react'
import { usePathname } from "next/navigation";
import { useRouter } from 'next/router'
import { Breadcrumb } from '@/app/component/Breadcrumb'
import { SearchFilter } from '@/app/component/SearchFilter'
import { Products } from "@/app/static-data";
import { CategoryCard, ProductCard } from "@/app/component/Card"
import { CategoryProductCard } from "@/app/component/CategoryProductCard"
import { Header } from '@/app/component/Header';
import { Footer } from '@/app/component/Footer';
import { FiMenu } from 'react-icons/fi';
import { socialIcon, headerMenu, marqueeInfo } from '../../static-data'
import Link from 'next/link';
import Image from 'next/image';
import Brand from '../../asset/logo.svg'
import { IoClose } from 'react-icons/io5';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import { useSearchParams } from 'next/navigation'



const Page = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams()


    const [path, setPath] = useState<string | null>(null)
    const sub = searchParams.get('sub')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [activeMenu, setActiveMenu] = useState<number | null>(null)
    const isRootPath = pathname === '/'

    const hamburgerfunc = () => {
        setIsOpen(!isOpen)
    }


    const decodedPaths = pathname
        .split("/")
        .filter((path) => path !== "")
        .map((path) => decodeURIComponent(path));

    const paths = useMemo(() => [...decodedPaths, sub], [decodedPaths, sub]);
    // const paths = useMemo(() => [...decodedPaths.map(path => path.toLowerCase()), sub.toLowerCase()], [decodedPaths, sub]);

    // const paths = useMemo(() => {
    //     const subValue = sub !== null ? sub.toLowerCase() : '';
    //     return [...decodedPaths.map(path => path.toLowerCase()), subValue];
    // }, [decodedPaths, sub]);

    useEffect(() => {
        if (paths.length > 0) {
            setPath(paths[paths.length - 1]);
        }
    }, [paths]);



    // console.log(paths, path)


    // const filteredProducts =
    //     paths !== undefined
    //         ? Products.filter((product) =>
    //             paths.includes(product.category) ||
    //             paths.includes(product?.subCategory)
    //         )
    //         : Products;

    const filteredProducts =
        paths !== undefined
            ? Products.filter((product) =>
                paths?.some(path =>
                    product.category === path ||
                    (product.subCategory && product.subCategory.toLowerCase() === path?.toLowerCase())
                )
            )
            : Products;


    // console.log(filteredProducts)





    return (
        <main>
            <Header />
            <Breadcrumb paths={paths} text={undefined} />
            <div className="flex gap-4 container justify-around ">
                <div className="hidden 2xl:block xl:block md:block lg:block   bg-[#F6F6F6]  shadow h-full 2xl:w-3/12 xl:w-3/12 lg:w-3/12 px-8 ">
                    <SearchFilter />
                </div>

                <div className='  text-xl 2xl:hidden xl:hidden md:hidden lg:hidden block' >
                    <FiMenu
                        onClick={hamburgerfunc}
                        className=''

                    />
                </div>
                <div className=" w-9/12  ">
                    {path !== "" && (
                        <CategoryProductCard cardInfo={filteredProducts} />
                    )}
                </div>

            </div>

            <div
                className={
                    isOpen
                        ? `hidden items-center lg:flex `
                        : 'fixed left-0 top-0 z-50 py-5  h-screen items-center bg-white lg:relative lg:h-fit'
                }
            >
                {/* brand logo for small screen */}
                <div className='Brand-logo my-8 flex w-max cursor-pointer items-center gap-2 lg:hidden '>
                    <Link href={'/'}>
                        <Image src={Brand} alt='brand-logo' />
                    </Link>
                    {!isOpen ? (
                        <IoClose
                            onClick={hamburgerfunc}
                            className='text-xl lg:hidden'
                        />
                    ) : (
                        <FiMenu
                            onClick={hamburgerfunc}
                            className='text-xl lg:hidden'
                        />
                    )}
                </div>

                {
                    // isOpen &&
                    <div className="2xl:hidden xl:hidden md:hidden lg:hidden   bg-[#F6F6F6]  shadow h-full  px-8 ">
                        <SearchFilter />
                    </div>}
            </div>
            <Footer />
        </main>
    );
}
export default Page