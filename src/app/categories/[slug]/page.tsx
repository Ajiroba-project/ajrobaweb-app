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
import Loading from "@/app/component/Loading";
import { userNavStore } from "@/store/store";

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
    const feat_id = searchParams.get("feat_id");
    const top_id = searchParams.get("top_id")
    const subid = searchParams.get("subid");
    const price_query = searchParams.get("query");
    const price_greater = searchParams.get("greaterthan");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const rating = searchParams.get("selectedRatings")
    const searchval = searchParams.get("search")

    const [searchQuery, setSearchQuery] = useState<string>("");

    const numericPriceQuery = price_query && parseInt(price_query.replace(/\D/g, ''), 10);
    const numericprice_greaterQuery = price_greater && parseInt(price_greater.replace(/\D/g, ''), 10);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const isRootPath = pathname === "/";

    const hamburgerfunc = () => {
        setIsOpen(!isOpen);
    };

      const { setHeaderNav, headerNav } = userNavStore(state => ({
    setHeaderNav: state.setHeaderNav,
    headerNav: state.headerNav,
  }));

    const decodedPaths = pathname
        .split("/")
        .filter((path) => path !== "")
        .map((path) => decodeURIComponent(path));

    const paths = useMemo(
        () => [...decodedPaths, sub, query, min_max, selectedBrands, subid, price_query, price_greater, min, max, rating, searchval],
        [decodedPaths, sub, query, min_max, selectedBrands, subid, price_query, price_greater, min, max, rating, searchval],
    );

    const verifiedpaths = useMemo(
        () => [...decodedPaths, sub,],
        [decodedPaths, sub,],
    );


//     useEffect(() => {
//      if (headerNav !== 'Categories') {
//         setHeaderNav('Categories');
//     }

//     if (paths.length > 0) {
//         setPath(paths[paths.length - 1]);
//     }
// }, [paths,]);

useEffect(() => {
         if (headerNav !== 'Categories') {
        setHeaderNav('Categories');
     }

    if (paths.length > 0) {
        const newPath = paths[paths.length - 1];
        if (newPath !== path) {
            setPath(newPath);  // Only update if the path has actually changed
        }
    }
}, [paths, path]);  // Add `path` as a dependency to avoid unnecessary updates



    const { data: filtercat, isLoading: filtercatLoading, isFetching } = useQueryData<AuctionResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_category/${cat_id}/`,
        ["filter_by_cat_id", cat_id],
        !!cat_id
    );

    /*  console.log(filtercat, 'filtercat', cat_id) */

    const { data: filter_by_sub_cat, isLoading: filter_by_sub_cattLoading, isFetching: filter_by_sub_catfetching } = useQueryData<AuctionResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_subcategory/${subid}/`,
        ["filter_by_sub_cat_id", subid],
        !!subid
    );

    const { data: filter_by_price_under, isLoading: filter_by_price_underLoading, isFetching: filter_by_price_underfetching } = useQueryData<AuctionResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_price_under/?category=${cat_id}&price_under=${Number(numericPriceQuery)}`,
        ["filter_by_price_under", cat_id, price_query],
        true
    );

    const { data: filter_from_price_above, isLoading: filter_from_price_aboveLoading, isFetching: filter_from_price_abovefetching } = useQueryData<AuctionResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_from_price_above/?category=${cat_id}&filter_from_price_above=${Number(numericprice_greaterQuery)}`,
        ["filter_from_price_above", cat_id, price_greater],
        true
    );

    const { data: filter_by_price_range, isLoading: filter_by_price_rangeLoading, isFetching: filter_by_price_rangefetching } = useQueryData<AuctionResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_price_range/?category=${cat_id}&min_price=${Number(min)}&max_price=${Number(max)}`,
        ["filter_by_price_range", cat_id, min, max],
        true
    );

    const { data: filter_by_ratings, isLoading: filter_by_ratingsLoading, isFetching: filter_by_ratingsfetching } = useQueryData<AuctionResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_ratings/?category=${cat_id}&rating=${Number(rating)}`,
        ["filter_by_price_range", cat_id, rating],
        true
    );

    const { data: featuredproductInfo, isLoading: featuredproducLoading } = useQueryData<AuctionResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/featured_products/`, ["get featureddetails"], true);
    const { data: topdeals, isLoading: topdealsLoading } = useQueryData<AuctionResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/top_deals_products/`, ["get topdeals"], true);

    const { data: filter_by_name, isLoading: filter_by_nameLoading, isFetching: filter_by_namefetching } = useQueryData<AuctionResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_name/?category=${cat_id}&name=${searchval}`,
        ["filter_by_name", cat_id, searchval],
        true
    );

    // https://ajiroba.onrender.com/v1/commerce/filter_by_name/?category=3fbdea59-515d-40bc-8294-a715b74268b8&name=women


    const ProductsNew = useMemo(() => filtercat?.data.map(product => ({
        name: product.name,
        image: (product.images && product.images.length > 0) ? product.images[0].image : '',  // Taking the first image as the main image
        description: '',
        id: product.id,
        price: product.price,
        previousPrice: product.discount,
        rating: product.reviews,
        time: '',
        category: filtercat?.message,
        subCategory: filter_by_sub_cat?.message,
        tag: ['open']
    })), [filtercat, filter_by_sub_cat]);

    const filteredProducts = useMemo(() => {


        if (rating) {
            return filter_by_ratings?.data?.map(product => ({
                name: product.name,
                image: (product.images && product.images.length > 0) ? product.images[0].image : '',  // Taking the first image as the main image
                description: '',
                id: product.id,
                price: product.price,
                previousPrice: product.discount,
                rating: product.reviews,
                time: '',
                category: filtercat?.message,
                subCategory: filter_by_sub_cat?.message,
                tag: ['open']
            })) || [];
        }

        if (feat_id) {
            return featuredproductInfo?.data?.map(product => ({
                name: product.name,
                image: (product.images && product.images.length > 0) ? product.images[0].image : '',  // Taking the first image as the main image
                description: '',
                id: product.id,
                price: product.price,
                previousPrice: product.discount,
                rating: product.reviews,
                time: '',
                category: filtercat?.message,
                subCategory: filter_by_sub_cat?.message,
                tag: ['open']
            })) || [];
        }
        if (top_id) {
            return topdeals?.data?.map(product => ({
                name: product.name,
                image: (product.images && product.images.length > 0) ? product.images[0].image : '',  // Taking the first image as the main image
                description: '',
                price: product.price,
                id: product.id,
                previousPrice: product.discount,
                rating: product.reviews,
                time: '',
                category: filtercat?.message,
                subCategory: filter_by_sub_cat?.message,
                tag: ['open']
            })) || [];
        }

        if (sub) {
            return filter_by_sub_cat?.data?.map(product => ({
                name: product.name,
                image: (product.images && product.images.length > 0) ? product.images[0].image : '',  // Taking the first image as the main image
                description: '',
                price: product.price,
                previousPrice: product.discount,
                rating: product.reviews,
                id: product.id,
                time: '',
                category: filtercat?.message,
                subCategory: filter_by_sub_cat?.message,
                tag: ['open']
            })) || [];
        }

        if (searchval) {
            return filter_by_name?.data?.map(product => ({
                name: product.name,
                image: (product.images && product.images.length > 0) ? product.images[0].image : '',  // Taking the first image as the main image
                description: '',
                price: product.price,
                previousPrice: product.discount,
                rating: product.reviews,
                id: product.id,
                time: '',
                category: filtercat?.message,
                subCategory: filter_by_sub_cat?.message,
                tag: ['open']
            })) || [];
        }

        if (subid) {
            return filter_by_sub_cat?.data?.map(product => ({
                name: product.name,
                image: (product.images && product.images.length > 0) ? product.images[0].image : '',  // Taking the first image as the main image
                description: '',
                price: product.price,
                id: product.id,
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
                id: product.id,
                previousPrice: product.discount,
                rating: product.reviews,
                time: '',
                category: filtercat?.message,
                subCategory: filter_by_sub_cat?.message,
                tag: ['open']
            })) || [];
        }

        if (min || max) {
            return filter_by_price_range?.data?.map(product => ({
                name: product.name,
                image: (product.images && product.images.length > 0) ? product.images[0].image : '',  // Taking the first image as the main image
                description: '',
                price: product.price,
                id: product.id,
                previousPrice: product.discount,
                rating: product.reviews,
                time: '',
                category: filtercat?.message,
                subCategory: filter_by_sub_cat?.message,
                tag: ['open']
            })) || [];
        }

        if (price_greater) {
            return filter_from_price_above?.data?.map(product => ({
                name: product.name,
                image: (product.images && product.images.length > 0) ? product.images[0].image : '',  // Taking the first image as the main image
                description: '',
                price: product.price,
                id: product.id,
                previousPrice: product.discount,
                rating: product.reviews,
                time: '',
                category: filtercat?.message,
                subCategory: filter_by_sub_cat?.message,
                tag: ['open']
            })) || [];
        }
        if (cat_id) {
            return filtercat?.data?.map(product => ({
                name: product.name,
                image: (product.images && product.images.length > 0) ? product.images[0].image : '',  // Taking the first image as the main image
                description: '',
                price: product.price,
                id: product.id,
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
    }, [subid, filter_by_sub_cat, price_greater, filter_from_price_above, ProductsNew, paths, filter_by_name, searchval,
        filtercat, cat_id, filter_by_price_under, sub, price_query, min, max,
        filter_by_price_range, filter_by_ratings, rating, feat_id, topdeals, featuredproductInfo, top_id]);



    return (
        <main>
            <Header onSearch={setSearchQuery} />

            <Breadcrumb paths={verifiedpaths} text={undefined} />
            <div className="flex gap-4  justify-around ">

                 <div className=" mt-4 hidden 2xl:block xl:block md:block lg:block bg-[#F6F6F6] shadow h-full 2xl:w-3/12 xl:w-3/12 lg:w-3/12  ">
                   <div className="flex justify-around" >
                     <SearchFilter />
                   </div>
                </div>


                <div className="text-xl 2xl:hidden xl:hidden md:hidden lg:hidden block">
                    <FiMenu onClick={hamburgerfunc} className="" />
                </div>
                <div className="w-9/12">
                    {filteredProducts.length > 0 ? (
                        <CategoryProductCard cardInfo={filteredProducts} />
                    ) : (
                        <div className="text-center flex h-screen items-center justify-center">
                            No data available
                        </div>
                    )}
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


                {
                    (isFetching || filter_by_sub_catfetching || filter_by_namefetching || filter_by_price_rangefetching || filter_by_ratingsfetching || filter_by_price_underfetching || filter_from_price_abovefetching) && <Loading />
                }


            </div>
            <Footer />
        </main>
    );
};

export default Page;

