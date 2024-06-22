// "use client";
// import { useState, useEffect, useMemo } from "react";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
// import { Breadcrumb } from "@/app/component/Breadcrumb";
// import { SearchFilter } from "@/app/component/SearchFilter";
// import { Products, demoProducts } from "@/app/static-data";
// import { CategoryCard, ProductCard } from "@/app/component/Card";
// import { CategoryProductCard } from "@/app/component/CategoryProductCard";
// import { Header } from "@/app/component/Header";
// import { Footer } from "@/app/component/Footer";
// import { FiMenu } from "react-icons/fi";
// import { socialIcon, headerMenu, marqueeInfo } from "../../static-data";
// import Link from "next/link";
// import Image from "next/image";
// import Brand from "../../asset/logo.svg";
// import { IoClose } from "react-icons/io5";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { CiSearch } from "react-icons/ci";
// import { useSearchParams } from "next/navigation";
// import { useQueryData } from "@/hooks/useQueryData";


// interface CardInfoItem {
//     id: number;
//     title: string;
//     description: string;
//     imageUrl: string;
//     name?: string;
//     image?: string;
//     price?: string;
//     /*   images?: string; */
//     images?: { id: string; product: string; image: string }[];
//     discount?: string;
//     reviews?: string;



// }

// interface AuctionResponse {
//     data: CardInfoItem[];
//     // add other fields as necessary
// }

// const Page = () => {
//     const pathname = usePathname();
//     const searchParams = useSearchParams();

//     const [path, setPath] = useState<string | null>(null);
//     const sub = searchParams.get("sub");
//     const query = searchParams.get("query");
//     const selectedBrands = searchParams.get("selectedBrands");
//     const min_max = searchParams.get("min_max");
//     const cat_id = searchParams.get("cat_id");

//     const [isOpen, setIsOpen] = useState<boolean>(false);
//     const [activeMenu, setActiveMenu] = useState<number | null>(null);
//     const isRootPath = pathname === "/";

//     const hamburgerfunc = () => {
//         setIsOpen(!isOpen);
//     };

//     const decodedPaths = pathname
//         .split("/")
//         .filter((path) => path !== "")
//         .map((path) => decodeURIComponent(path));

//     const paths = useMemo(
//         () => [...decodedPaths, sub, query, min_max, selectedBrands],
//         [decodedPaths, sub, query, min_max, selectedBrands],
//     );

//     const verifiedpaths = useMemo(
//         () => [...decodedPaths, sub,],
//         [decodedPaths, sub,],
//     );

//     useEffect(() => {
//         if (paths.length > 0) {
//             setPath(paths[paths.length - 1]);
//         }
//         // console.log(paths, 'pathsss')
//         // console.log(paths[paths.length - 3])
//     }, [paths]);


//     // console.log(Products, 'productsss')

//     const { data: filtercat, isLoading: filtercatLoading } = useQueryData<AuctionResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_category/${cat_id}/`, "filter_by_cat_id", true);


//     const ProductsNew = filtercat?.data.map(product => {
//         return {
//             name: product.name,
//             image: (product.images && product.images.length > 0) ? product.images[0].image : '',   // Taking the first image as the main image
//             description: '',
//             price: product.price,
//             previousPrice: product.discount,
//             rating: product.reviews,
//             time: '',  // Assuming no data is provided for time
//             category: 'FoodStuff',  // Assuming the category is FoodStuff for all products
//             subCategory: 'Food',  // Assuming the subCategory is Food for all products
//             tag: ['open']  // Assuming the tag is 'open' for all products
//         };
//     });



//     const filteredProducts = ProductsNew.filter((product) => {
//         const lowerCaseParams = paths
//             .map((param) => param && param.toLowerCase())
//             .filter(Boolean);
//         const lowerCaseCategory = product.category.toLowerCase();
//         const lowerCaseSubCategory = product?.subCategory?.toLowerCase();

//         return (
//             lowerCaseParams.includes(lowerCaseCategory) ||
//             (lowerCaseSubCategory && lowerCaseParams.includes(lowerCaseSubCategory))
//         );
//     });



//
//     return (
//         <main>
//             <Header />
//             <Breadcrumb paths={verifiedpaths} text={undefined} />
//             <div className="flex gap-4 container justify-around ">
//                 <div className="hidden 2xl:block xl:block md:block lg:block   bg-[#F6F6F6]  shadow h-full 2xl:w-3/12 xl:w-3/12 lg:w-3/12 px-8 ">
//                     <SearchFilter />
//                 </div>

//                 <div className="  text-xl 2xl:hidden xl:hidden md:hidden lg:hidden block">
//                     <FiMenu onClick={hamburgerfunc} className="" />
//                 </div>
//                 <div className=" w-9/12  ">
//                     {path !== "" && <CategoryProductCard cardInfo={filteredProducts} />}
//                 </div>
//             </div>

//             <div
//                 className={
//                     isOpen
//                         ? `hidden items-center lg:flex `
//                         : "fixed left-0 top-0 z-50 py-5  h-screen items-center bg-white lg:relative lg:h-fit"
//                 }
//             >
//                 <div className="Brand-logo my-8 flex w-max cursor-pointer items-center gap-2 lg:hidden ">
//                     <Link href={"/"}>
//                         <Image src={Brand} alt="brand-logo" />
//                     </Link>
//                     {!isOpen ? (
//                         <IoClose onClick={hamburgerfunc} className="text-xl lg:hidden" />
//                     ) : (
//                         <FiMenu onClick={hamburgerfunc} className="text-xl lg:hidden" />
//                     )}
//                 </div>

//                 {
//                     <div className="2xl:hidden xl:hidden md:hidden lg:hidden   bg-[#F6F6F6]  shadow h-full  px-8 ">
//                         <SearchFilter />
//                     </div>
//                 }
//             </div>
//             <Footer />
//         </main>
//     );
// };
// export default Page;


"use client";
import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { Breadcrumb } from "@/app/component/Breadcrumb";
import { SearchFilter } from "@/app/component/SearchFilter";
import { Products, demoProducts } from "@/app/static-data";
import { CategoryCard, ProductCard } from "@/app/component/Card";
import { CategoryProductCard } from "@/app/component/CategoryProductCard";
import { Header } from "@/app/component/Header";
import { Footer } from "@/app/component/Footer";
import { FiMenu } from "react-icons/fi";
import { socialIcon, headerMenu, marqueeInfo } from "../../static-data";
import Link from "next/link";
import Image from "next/image";
import Brand from "../../asset/logo.svg";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "next/navigation";
import { useQueryData } from "@/hooks/useQueryData";


interface CardInfoItem {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    name?: string;
    image?: string;
    price?: string;
    images?: { id: string; product: string; image: string }[];
    discount?: string;
    reviews?: string;
    message?: string;
}

interface AuctionResponse {
    message: any;
    data: CardInfoItem[];
    // add other fields as necessary
}

const Page = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [path, setPath] = useState<string | null>(null);
    const sub = searchParams.get("sub");
    const query = searchParams.get("query");
    const selectedBrands = searchParams.get("selectedBrands");
    const min_max = searchParams.get("min_max");
    const cat_id = searchParams.get("cat_id");
    const subid = searchParams.get("subid");

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const isRootPath = pathname === "/";

    const hamburgerfunc = () => {
        setIsOpen(!isOpen);
    };

    const decodedPaths = pathname
        .split("/")
        .filter((path) => path !== "")
        .map((path) => decodeURIComponent(path));

    const paths = useMemo(
        () => [...decodedPaths, sub, query, min_max, selectedBrands, subid],
        [decodedPaths, sub, query, min_max, selectedBrands, subid],
    );

    const verifiedpaths = useMemo(
        () => [...decodedPaths, sub,],
        [decodedPaths, sub,],
    );

    useEffect(() => {
        if (paths.length > 0) {
            setPath(paths[paths.length - 1]);
        }
    }, [paths]);

    /*    const { data: filtercat, isLoading: filtercatLoading } = useQueryData<AuctionResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_category/${cat_id}/`, "filter_by_cat_id", true);
   
       const { data: filter_by_sub_cat, isLoading: filter_by_sub_cattLoading } = useQueryData<AuctionResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_subcategory/${subid}/`, "filter_by_sub_cat_id", true);
       */

    const { data: filtercat, isLoading: filtercatLoading } = useQueryData<AuctionResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_category/${cat_id}/`,
        ["filter_by_cat_id", cat_id],
        !!cat_id
    );

    const { data: filter_by_sub_cat, isLoading: filter_by_sub_cattLoading } = useQueryData<AuctionResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_subcategory/${subid}/`,
        ["filter_by_sub_cat_id", subid],
        !!subid
    );

    console.log(filter_by_sub_cat, 'filtereddd data')


    const ProductsNew = useMemo(() => filtercat?.data.map(product => ({
        name: product.name,
        image: (product.images && product.images.length > 0) ? product.images[0].image : '',  // Taking the first image as the main image
        description: '',
        price: product.price,
        previousPrice: product.discount,
        rating: product.reviews,
        time: '',  // Assuming no data is provided for time
        category: filtercat?.message,  // Assuming the category is FoodStuff for all products
        subCategory: 'Food',  // Assuming the subCategory is Food for all products
        tag: ['open']  // Assuming the tag is 'open' for all products
    })), [filtercat]);

    // console.log(ProductsNew)


    const filteredProducts = ProductsNew?.filter((product) => {
        const lowerCaseParams = paths
            .map((param) => param && param.toLowerCase())
            .filter(Boolean);

        // console.log(lowerCaseParams, 'lowercaseparams')

        const lowerCaseCategoryWords = product.category.toLowerCase().split(' ');

        const lowerCaseSubCategoryWords = product?.subCategory?.toLowerCase().split(' ');

        return (
            lowerCaseCategoryWords.some((word: string | null) => lowerCaseParams.includes(word)) ||
            (lowerCaseSubCategoryWords && lowerCaseSubCategoryWords.some(word => lowerCaseParams.includes(word)))
        );
    }) || [];


    // console.log(filteredProducts, 'filteredProducts')

    return (
        <main>
            <Header />
            <Breadcrumb paths={verifiedpaths} text={undefined} />
            <div className="flex gap-4 container justify-around ">
                <div className="hidden 2xl:block xl:block md:block lg:block   bg-[#F6F6F6]  shadow h-full 2xl:w-3/12 xl:w-3/12 lg:w-3/12 px-8 ">
                    <SearchFilter />
                </div>

                <div className="  text-xl 2xl:hidden xl:hidden md:hidden lg:hidden block">
                    <FiMenu onClick={hamburgerfunc} className="" />
                </div>
                <div className=" w-9/12  ">
                    {path !== "" && <CategoryProductCard cardInfo={filteredProducts} />}
                </div>
            </div>

            <div
                className={
                    isOpen
                        ? `hidden items-center lg:flex `
                        : "fixed left-0 top-0 z-50 py-5  h-screen items-center bg-white lg:relative lg:h-fit"
                }
            >
                <div className="Brand-logo my-8 flex w-max cursor-pointer items-center gap-2 lg:hidden ">
                    <Link href={"/"}>
                        <Image src={Brand} alt="brand-logo" />
                    </Link>
                    {!isOpen ? (
                        <IoClose onClick={hamburgerfunc} className="text-xl lg:hidden" />
                    ) : (
                        <FiMenu onClick={hamburgerfunc} className="text-xl lg:hidden" />
                    )}
                </div>

                {
                    <div className="2xl:hidden xl:hidden md:hidden lg:hidden   bg-[#F6F6F6]  shadow h-full  px-8 ">
                        <SearchFilter />
                    </div>
                }
            </div>
            <Footer />
        </main>
    );
};
export default Page;
