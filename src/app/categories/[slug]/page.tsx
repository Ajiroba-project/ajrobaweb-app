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
    const price_query = searchParams.get("query");

    const numericPriceQuery = price_query && parseInt(price_query.replace(/\D/g, ''), 10);

    console.log(numericPriceQuery, 'numericPriceQuery');

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

    const { data: filtercat, isLoading: filtercatLoading } = useQueryData<AuctionResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_category/${cat_id}/`,
        ["filter_by_cat_id", cat_id],
        !!cat_id
    );

    // console.log(filtercat, 'filtercat')

    const { data: filter_by_sub_cat, isLoading: filter_by_sub_cattLoading } = useQueryData<AuctionResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_subcategory/${subid}/`,
        ["filter_by_sub_cat_id", subid],
        !!subid
    );

    const { data: filter_by_price_under, isLoading: filter_by_price_underLoading, error } = useQueryData<AuctionResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_price_under/?category=${cat_id}&price_under=${Number(numericPriceQuery)}`,
        ["filter_by_price_under", cat_id, price_query],
        true
    );




    const ProductsNew = useMemo(() => filtercat?.data.map(product => ({
        name: product.name,
        image: (product.images && product.images.length > 0) ? product.images[0].image : '',  // Taking the first image as the main image
        description: '',
        price: product.price,
        previousPrice: product.discount,
        rating: product.reviews,
        time: '',
        category: filtercat?.message,
        subCategory: filter_by_sub_cat?.message,
        tag: ['open']
    })), [filtercat, filter_by_sub_cat]);

    const filteredProducts = useMemo(() => {
        if (subid) {
            return filter_by_sub_cat?.data?.map(product => ({
                name: product.name,
                image: (product.images && product.images.length > 0) ? product.images[0].image : '',  // Taking the first image as the main image
                description: '',
                price: product.price,
                previousPrice: product.discount,
                rating: product.reviews,
                time: '',
                category: filtercat?.message,
                subCategory: filter_by_sub_cat?.message,
                tag: ['open']
            })) || [];
        }
        if (price_query) {
            return filter_by_price_under?.data?.map(product => ({
                name: product.name,
                image: (product.images && product.images.length > 0) ? product.images[0].image : '',  // Taking the first image as the main image
                description: '',
                price: product.price,
                previousPrice: product.discount,
                rating: product.reviews,
                time: '',
                category: filtercat?.message,
                subCategory: filter_by_sub_cat?.message,
                tag: ['open']
            })) || [];
        }


        else {
            return ProductsNew?.filter((product) => {
                const lowerCaseParams = paths
                    .map((param) => param && param.toLowerCase())
                    .filter(Boolean);

                const lowerCaseCategoryWords = product.category.toLowerCase().split(' ');

                const lowerCaseSubCategoryWords = product?.subCategory?.toLowerCase().split(' ');

                return (
                    lowerCaseCategoryWords.some((word: string | null) => lowerCaseParams.includes(word)) ||
                    (lowerCaseSubCategoryWords && lowerCaseSubCategoryWords.some((word: string | null) => lowerCaseParams.includes(word)))
                );
            }) || [];
        }
    }, [subid, filter_by_sub_cat, ProductsNew, paths, filtercat]);

    return (
        <main>
            <Header />
            <Breadcrumb paths={verifiedpaths} text={undefined} />
            <div className="flex gap-4 container justify-around ">
                <div className="hidden 2xl:block xl:block md:block lg:block bg-[#F6F6F6] shadow h-full 2xl:w-3/12 xl:w-3/12 lg:w-3/12 px-8 ">
                    <SearchFilter />
                </div>

                <div className="text-xl 2xl:hidden xl:hidden md:hidden lg:hidden block">
                    <FiMenu onClick={hamburgerfunc} className="" />
                </div>
                <div className="w-9/12">
                    {path !== "" && <CategoryProductCard cardInfo={filteredProducts} />}
                </div>
            </div>

            <div
                className={
                    isOpen
                        ? `hidden items-center lg:flex`
                        : "fixed left-0 top-0 z-50 py-5 h-screen items-center bg-white lg:relative lg:h-fit"
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

                <div className="2xl:hidden xl:hidden md:hidden lg:hidden bg-[#F6F6F6] shadow h-full px-8">
                    <SearchFilter />
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Page;
