"use client";
import { useState, useEffect, useMemo, Suspense, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { Breadcrumb } from "@/app/component/Breadcrumb";
import { CustomFilter, SearchFilter } from "@/app/component/SearchFilter";
import { Products, demoProducts } from "@/app/static-data";
import { CategoryCard, ProductCard, ProductCardMain, ProductCategoryCard } from "@/app/component/Card";
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
import { GridSkeleton, SectionLoadingSkeleton } from "@/app/component/LoadingSkeleton";

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

const CategoryPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [path, setPath] = useState<string | null>(null);
  const sub = searchParams.get("sub");
  const query = searchParams.get("query");
  const selectedBrands = searchParams.get("selectedBrands");
  const min_max = searchParams.get("min_max");
  const cat_id = searchParams.get("cat_id");
  const feat_id = searchParams.get("feat_id");
  const top_id = searchParams.get("top_id");
  const subid = searchParams.get("subid");
  const price_query = searchParams.get("query");
  const price_greater = searchParams.get("greaterthan");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const rating = searchParams.get("selectedRatings");
  const searchval = searchParams.get("search");

  const [searchQuery, setSearchQuery] = useState<string>("");

  const numericPriceQuery =
    price_query && parseInt(price_query.replace(/\D/g, ""), 10);
  const numericprice_greaterQuery =
    price_greater && parseInt(price_greater.replace(/\D/g, ""), 10);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const isRootPath = pathname === "/";

  const hamburgerfunc = () => {
    setIsOpen(!isOpen);
  };

  const { setHeaderNav, headerNav } = userNavStore((state) => ({
    setHeaderNav: state.setHeaderNav,
    headerNav: state.headerNav,
  }));

  const decodedPaths = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => decodeURIComponent(path));

  const paths = useMemo(
    () => [
      ...decodedPaths,
      sub,
      query,
      min_max,
      selectedBrands,
      subid,
      price_query,
      price_greater,
      min,
      max,
      rating,
      searchval,
    ],
    [
      decodedPaths,
      sub,
      query,
      min_max,
      selectedBrands,
      subid,
      price_query,
      price_greater,
      min,
      max,
      rating,
      searchval,
    ],
  );

  const verifiedpaths = useMemo(
    () => [...decodedPaths, sub],
    [decodedPaths, sub],
  );



  useEffect(() => {
    if (headerNav !== "Categories") {
      setHeaderNav("Categories");
    }

    if (paths.length > 0) {
      const newPath = paths[paths.length - 1];
      if (newPath !== path) {
        setPath(newPath);
      }
    }
  }, [paths, path, headerNav, setHeaderNav]);

  // Primary data fetching - only load what's needed
  const {
    data: filtercat,
    isLoading: filtercatLoading,
    isFetching,
  } = useQueryData<AuctionResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_category/${cat_id}/`,
    ["filter_by_cat_id", cat_id],
    !!cat_id,
  );

  // Conditional data fetching - only when specific filters are applied
  const {
    data: filter_by_sub_cat,
    isLoading: filter_by_sub_cattLoading,
    isFetching: filter_by_sub_catfetching,
  } = useQueryData<AuctionResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_subcategory/${subid}/`,
    ["filter_by_sub_cat_id", subid],
    !!subid,
  );

  const {
    data: filter_by_price_under,
    isLoading: filter_by_price_underLoading,
    isFetching: filter_by_price_underfetching,
  } = useQueryData<AuctionResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_price_under/?category=${cat_id}&price_under=${Number(numericPriceQuery)}`,
    ["filter_by_price_under", cat_id, price_query],
    !!price_query && !!cat_id,
  );

  const {
    data: filter_from_price_above,
    isLoading: filter_from_price_aboveLoading,
    isFetching: filter_from_price_abovefetching,
  } = useQueryData<AuctionResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_from_price_above/?category=${cat_id}&filter_from_price_above=${Number(numericprice_greaterQuery)}`,
    ["filter_from_price_above", cat_id, price_greater],
    !!price_greater && !!cat_id,
  );

  const {
    data: filter_by_price_range,
    isLoading: filter_by_price_rangeLoading,
    isFetching: filter_by_price_rangefetching,
  } = useQueryData<AuctionResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_price_range/?category=${cat_id}&min_price=${Number(min)}&max_price=${Number(max)}`,
    ["filter_by_price_range", cat_id, min, max],
    !!(min || max) && !!cat_id,
  );

  const {
    data: filter_by_ratings,
    isLoading: filter_by_ratingsLoading,
    isFetching: filter_by_ratingsfetching,
  } = useQueryData<AuctionResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_ratings/?category=${cat_id}&rating=${Number(rating)}`,
    ["filter_by_ratings", cat_id, rating],
    !!rating && !!cat_id,
  );

  // Featured and top deals - only load when specifically requested
  const { data: featuredproductInfo, isLoading: featuredproducLoading } =
    useQueryData<AuctionResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/featured_products/`,
      ["get featureddetails"],
      !!feat_id,
    );
  
  const { data: topdeals, isLoading: topdealsLoading } =
    useQueryData<AuctionResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/top_deals_products/`,
      ["get topdeals"],
      !!top_id,
    );

  const {
    data: filter_by_name,
    isLoading: filter_by_nameLoading,
    isFetching: filter_by_namefetching,
  } = useQueryData<AuctionResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/filter_by_name/?category=${cat_id}&name=${searchval}`,
    ["filter_by_name", cat_id, searchval],
    !!searchval && !!cat_id,
  );

  const ProductsNew = useMemo(
    () =>
      filtercat?.data.map((product) => ({
        name: product.name,
        image:
          product.images && product.images.length > 0
            ? product.images[0].image
            : "", // Taking the first image as the main image
        description: "",
        id: product.id,
        price: product.price,
        previousPrice: product.discount,
        rating: product.reviews,
        time: "",
        category: filtercat?.message,
        subCategory: filter_by_sub_cat?.message,
        tag: ["open"],
      })),
    [filtercat, filter_by_sub_cat],
  );

  // Determine which data source to use based on active filters
  const activeDataSource = useMemo(() => {
    if (rating) return filter_by_ratings;
    if (feat_id) return featuredproductInfo;
    if (top_id) return topdeals;
    if (sub) return filter_by_sub_cat;
    if (searchval) return filter_by_name;
    if (subid) return filter_by_sub_cat;
    if (price_query) return filter_by_price_under;
    if (min || max) return filter_by_price_range;
    if (price_greater) return filter_from_price_above;
    if (cat_id) return filtercat;
    return null;
  }, [
    rating, filter_by_ratings,
    feat_id, featuredproductInfo,
    top_id, topdeals,
    sub, filter_by_sub_cat,
    searchval, filter_by_name,
    subid,
    price_query, filter_by_price_under,
    min, max, filter_by_price_range,
    price_greater, filter_from_price_above,
    cat_id, filtercat
  ]);

  // Optimized product transformation function
  const transformProduct = useCallback((product: CardInfoItem) => ({
    name: product.name,
    image: product.images && product.images.length > 0 ? product.images[0].image : "",
    description: "",
    id: product.id,
    price: product.price,
    previousPrice: product.discount,
    rating: product.reviews,
    time: "",
    category: filtercat?.message || "",
    subCategory: filter_by_sub_cat?.message || "",
    tag: ["open"],
  }), [filtercat?.message, filter_by_sub_cat?.message]);

  // Simplified filtered products logic
  const filteredProducts = useMemo(() => {
    if (!activeDataSource?.data) {
      // Fallback to path-based filtering
      return ProductsNew?.filter((product) => {
        const lowerCaseParams = paths
          .map((param) => param && param.toLowerCase())
          .filter(Boolean);

        const lowerCaseCategoryWords = product.category
          .toLowerCase()
          .split(" ");

        const lowerCaseSubCategoryWords = product?.subCategory
          ?.toLowerCase()
          .split(" ");

        return (
          lowerCaseCategoryWords.some((word: string | null) =>
            lowerCaseParams.includes(word),
          ) ||
          (lowerCaseSubCategoryWords &&
            lowerCaseSubCategoryWords.some((word: string | null) =>
              lowerCaseParams.includes(word),
            ))
        );
      }) || [];
    }

    return activeDataSource.data.map(transformProduct);
  }, [activeDataSource, ProductsNew, paths, transformProduct]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [cat_id, subid, price_query, price_greater, min, max, rating, feat_id, top_id, searchval]);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  // Optimized loading state - only show loading for active queries
  const isLoading = useMemo(() => {
    if (cat_id && isFetching) return true;
    if (subid && filter_by_sub_catfetching) return true;
    if (price_query && filter_by_price_underfetching) return true;
    if (price_greater && filter_from_price_abovefetching) return true;
    if ((min || max) && filter_by_price_rangefetching) return true;
    if (rating && filter_by_ratingsfetching) return true;
    if (feat_id && featuredproducLoading) return true;
    if (top_id && topdealsLoading) return true;
    if (searchval && filter_by_namefetching) return true;
    return false;
  }, [
    cat_id, isFetching,
    subid, filter_by_sub_catfetching,
    price_query, filter_by_price_underfetching,
    price_greater, filter_from_price_abovefetching,
    min, max, filter_by_price_rangefetching,
    rating, filter_by_ratingsfetching,
    feat_id, featuredproducLoading,
    top_id, topdealsLoading,
    searchval, filter_by_namefetching
  ]);

  // Error state handling
  const hasError = useMemo(() => {
    // Add error checking logic here if your useQueryData hook returns error states
    return false;
  }, []);




  // Performance optimization: Debounce search queries
  const [debouncedSearchVal, setDebouncedSearchVal] = useState(searchval);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchVal(searchval);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchval]);



  return (
    <main>
      <Header onSearch={setSearchQuery} />
      <div className='h-24 md:h-28 lg:h-32'></div>

      <Breadcrumb paths={verifiedpaths} text={undefined} />

      <div className="text-xl 2xl:hidden xl:hidden md:hidden lg:hidden block px-6 py-2 ">
        <FiMenu onClick={hamburgerfunc} className="" />
      </div>


      <div className="flex gap-4 justify-center items-stretch min-h-screen">
        <div className="mt-4 hidden 2xl:block xl:block md:block lg:block bg-[#F6F6F6] shadow h-full w-3/12">
          <div className="">
            <SearchFilter />
          </div>
        </div>

        <div className="w-9/12 h-full lg:pr-8 2xl:pr-8 pr-0 xl:pr-8 md:pr-0">
          {isLoading ? (
            <SectionLoadingSkeleton 
              title="Loading Products..." 
              count={12}
            />
          ) : hasError ? (
            <div className="text-center flex h-full items-center justify-center flex-col space-y-4">
              <div className="text-red-500 text-xl">⚠️</div>
              <h3 className="text-lg font-semibold text-gray-900">Something went wrong</h3>
              <p className="text-gray-600">Unable to load products. Please try again.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-[#F25E26] text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : paginatedProducts.length > 0 ? (
            <div>
              <ProductCategoryCard cardInfo={paginatedProducts} />
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? 'bg-[#F25E26] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
              
              {/* Results count */}
              <div className="text-center mt-4 text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
              </div>
            </div>
          ) : (
            <div className="text-center flex h-full items-center justify-center flex-col space-y-4">
              <div className="text-gray-400 text-6xl">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
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

        <div className="2xl:hidden xl:hidden md:hidden lg:hidden bg-[#F6F6F6] shadow h-full px-8 overflow-scroll">
          <SearchFilter />
        </div>

      </div>



    <div className="mt-40" >
          <Footer />
    </div>
    </main>
  );
};


export default function Page() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <CategoryPage />
    </Suspense>
  )
}




