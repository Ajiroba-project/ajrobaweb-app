"use client";
import { useState, useEffect, useMemo, SetStateAction, Key } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Breadcrumb } from "@/app/component/Breadcrumb";
import { Header } from "@/app/component/Header";
import { Footer } from "@/app/component/Footer";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Title } from "@/app/component/Title";
import image2 from "../../../asset/image/rice2.jpeg";
import image4 from "../../../asset/image/rice4.jpeg";
import "./style.css";
import { FaStar } from "react-icons/fa6";
import { RelatedProducts } from "@/app/component/RelatedProducts";
import { Bounce, ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useQueryData } from "@/hooks/useQueryData";


const CustomerReview = ({ data }: any) => {


    return (
        <div className="container py-4 mb-12 ">
            <div>
                <h1 className="text-[#1B1B1A] font-bold text-lg text-center 2xl:text-start xl:text-start lg:text-start md:text-start ">
                    Customer Review
                </h1>
            </div>

            <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col 2xl:items-start xl:items-start lg:items-start md:items-start items-center gap-12 mt-8">
                <div className=" w-1/2">
                    <p className="flex mt-4 items-center text-[#111111] text-sm gap-1">
                        {Array.from(
                            {
                                length: data?.data?.product_reviews
                                    ?.average_ratings,
                            },
                            (_, index) => (
                                <span key={index}>
                                    <FaStar className="text-[#F25E26]" />
                                </span>
                            ),
                        )}
                        ({data?.data?.product_reviews?.total_reviews}) Reviews
                    </p>

                    {data?.data?.rating_counts?.map(
                        (
                            item: { stars: string; customers: number },
                            index: Key | null | undefined,
                        ) => {
                            return (
                                <div key={index}>
                                    <div
                                        key={index}
                                        className="flex gap-4 items-center py-2"
                                    >
                                        <div>
                                            <span>{item.stars} stars</span>
                                        </div>

                                        <div className="flex-1">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div
                                                    className="bg-[#E84526] h-2.5 rounded-full"
                                                    style={{
                                                        width: `${item.customers}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div>
                                            <small>{item.customers}</small>
                                        </div>
                                    </div>
                                </div>
                            );
                        },
                    )}

                    <div className="mt-4">
                        <p>Filter By:</p>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <button className="border border-[#D2D2D2] mt-4 px-4 py-2 text-sm bg-[#FFFFFF] hover:[#FCDFD4] text-[#111111] font-bold rounded">
                            1 Star
                        </button>

                        <button className="border border-[#D2D2D2] mt-4 px-4 py-2 text-sm bg-[#FFFFFF] hover:[#FCDFD4] text-[#111111] font-bold rounded">
                            2 Star
                        </button>

                        <button className="border border-[#D2D2D2] mt-4 px-4 py-2 text-sm bg-[#FFFFFF] hover:[#FCDFD4] text-[#111111] font-bold rounded">
                            3 Star
                        </button>

                        <button className="border border-[#D2D2D2] mt-4 px-4 py-2 text-sm bg-[#FFFFFF] hover:[#FCDFD4] text-[#111111] font-bold rounded">
                            4 Star
                        </button>

                        <button className=" mt-4 px-4 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-bold rounded">
                            5 Star
                        </button>
                    </div>
                </div>

                <div className="w-1/2">
                    {data?.data?.reviews.map(
                        (item: any, key: Key | null | undefined) => {
                            return (
                                <div key={key} className="flex gap-2">
                                    <div className="">
                                        <Image
                                            src={`https://ajiroba.onrender.com${item?.user?.profile_image}`}
                                            height={40}
                                            width={40}
                                            alt="Profile Image"
                                            className="rounded-full object-cover   "
                                            style={{ borderRadius: "50%" }}
                                        />
                                    </div>

                                    <div className="mb-8 flex-1 ">
                                        <p>{`${item.user.first_name}  ${item.user.last_name} `}</p>
                                        <p className="flex mt-4 items-center text-[#111111] text-sm gap-1">

                                            {Array.from(
                                                { length: item?.rating },
                                                (_, index) => (
                                                    <span key={index}>
                                                        <FaStar className="text-[#F25E26]" />
                                                    </span>
                                                ),
                                            )}
                                            {item?.date_created}
                                        </p>
                                        <p>{item.comment}</p>
                                    </div>
                                </div>
                            );
                        },
                    )}

                </div>
            </div>
        </div>
    );
};

const RelatedProduct = ({ data }: any) => {
    return (
        <div className="container py-4 mb-12 ">
            <div>
                <h1 className="text-[#1B1B1A] font-bold text-lg text-center 2xl:text-start xl:text-start lg:text-start md:text-start ">
                    Other Related Products
                </h1>
            </div>

            <div>
                <RelatedProducts cardInfo={data} />
            </div>
        </div>
    );
};

interface CardInfoItem {
    weight: string;
    id: number;
    title: string;
    description?: string;
    imageUrl: string;
    name?: string;
    image?: string;
    price?: string;
    images?: { id: string; product: string; image: string }[];
    discount?: string;
    reviews?: string;
    message?: string;
    category: string;
    delivery_estimation: string;
    related_products: [];
}

interface AuctionResponse {
    message: any;
    data: CardInfoItem;
}

const Page = ({ params }: any) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [path, setPath] = useState<string | null>(null);
    const sub = searchParams.get("sub");
    const query = searchParams.get("query");
    const selectedBrands = searchParams.get("selectedBrands");
    const min_max = searchParams.get("min_max");

    const router = useRouter();

    const star = [1, 2, 3, 4, 5];
    const rating = 4;

    const decodedPaths = pathname
        .split("/")
        .filter((path) => path !== "")
        .map((path) => decodeURIComponent(path));

    const paths = useMemo(
        () => [...decodedPaths, sub, query, min_max, selectedBrands],
        [decodedPaths, sub, query, min_max, selectedBrands],
    );

    const verifiedpaths = useMemo(
        () => [...decodedPaths, sub],
        [decodedPaths, sub],
    );

    useEffect(() => {
        if (paths.length > 0) {
            setPath(paths[paths.length - 1]);
        }
    }, [paths]);

    const [selectedImage, setSelectedImage] = useState(0);
    const images = [image4, image2];

    const handleImageClick = (index: SetStateAction<number>) => {
        setSelectedImage(index);
    };

    const notify = () => {
        toast("🦄 ‘Mama Gold Rice’ has been added to cart", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            style: {
                backgroundColor: "#08B504",
                color: "#FFFFFF",
            },
        });
    };

    const product_id = params.slug;

    const {
        data: productdata,
        isLoading: productdataLoading,
        isFetching: productdatafetching,
        error,
        status,
    } = useQueryData<AuctionResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/view_product/${product_id}/`,
        ["product_details", product_id],
        true,
    );

    console.log(productdata, "productdata", error, status);

    if (error) {
        console.error("Error fetching product data:", error);
    }

    const nigerianCurrencyFormat = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
    });

    const productPrice = productdata?.data?.price
        ? Number(productdata.data.price)
        : 0;
    const productDiscount = productdata?.data?.discount
        ? Number(productdata.data.discount)
        : 0;

    const formattedPrice = nigerianCurrencyFormat.format(productPrice);
    const formattedDiscount = nigerianCurrencyFormat.format(productDiscount);

    const basePrice = productdata?.data?.discount
        ? Number(productdata.data.discount)
        : 0;
    const [quantity, setQuantity] = useState(1);
    const totalPrice = basePrice * quantity;

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <main>
        {/*     <ToastContainer /> */}
            <Header />
            <Breadcrumb paths={verifiedpaths} text={undefined} />

            <div onClick={() => router.back()}>
                <div className=" cursor-pointer container  flex justify-start">
                    <p className="text-[#E84526] text-base">Back</p>
                </div>
            </div>

            <Title title="Product Details" />

            {productdata ? (
                <>
                    <div className="product-image-gallery  container py-8 grid 2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 xl:grid-col-3 grid-cols-1 ">
                        <div className=" ">
                            <div
                                className="flex 2xl:flex-col xl:flex-col lg:flex-col md:flex-col flex-row 2xl:justify-start xl:justify-start

                                     md:justify-start lg:justify-start justify-center gap-4"
                            >
                                {productdata?.data?.images?.map(
                                    (image, index) => (
                                        <div
                                            key={index}
                                            className="thumbnail-image "
                                        >
                                            <Image
                                                className=" w-32 h-32 object-cover" // Ensure uniform size for thumbnails
                                                src={`https://staging.ajiroba.ng/media/${image.image}`}
                                                alt="Product Thumbnail"
                                                onClick={() =>
                                                    handleImageClick(index)
                                                }
                                                width={100}
                                                height={100}
                                                objectFit="cover"
                                            />
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        <div className=" mt-8">
                            <div className="thumbnail-images w-auto     ">
                                <div className="main-image">
                                    <Image
                                        src={
                                            productdata?.data?.images?.[0]
                                                ?.image
                                                ? `https://staging.ajiroba.ng/media/${productdata.data.images[0].image}`
                                                : ""
                                        }
                                        alt="Product Image"
                                        width={300}
                                        height={300}
                                        objectFit="cover"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {productdata && (
                            <div className=" mt-4 container justify-center flex xl:block md:block lg:block 2xl:block">
                                <div className="">
                                    <h1 className="text-[#111111] text-[20px] w-[248px] font-Poppins font-medium ">
                                        {productdata?.data?.name}
                                    </h1>
                                    <p className="flex mt-4 items-center text-[#111111] font-Poppins font-normal text-sm gap-1">
                                        {star.map((val, index) => (
                                            <span key={index}>
                                                <span key={index}>
                                                    <FaStar
                                                        className={
                                                            index < rating
                                                                ? "text-[#F25E26]"
                                                                : "text-gray-300"
                                                        }
                                                    />
                                                </span>
                                            </span>
                                        ))}
                                        (300) Reviews
                                    </p>
                                    <h1 className="text-[#111111] text-2xl mt-2 font-semibold font-Poppins ">
                                        &#x20A6; {totalPrice.toLocaleString()}
                                    </h1>
                                    <h1 className="text-[#504D4D] font-medium font-Poppins text-lg mt-2 line-through ">
                                        {formattedPrice}
                                    </h1>

                                    <hr className="mt-4" />
                                    <p className="text-[#111111] text-base mt-4 ">
                                        Quantity
                                    </p>

                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={handleDecrement}
                                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded-l"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            value={quantity}
                                            readOnly
                                            className="w-12 text-center border-t border-b border-gray-300"
                                        />
                                        <button
                                            onClick={handleIncrement}
                                            className="px-2 py-1 bg-[#E36414] text-white rounded-r"
                                        >
                                            +
                                        </button>
                                    </div>

                            <p className="text-[#111111] text-base mt-4 ">
                                        Weight
                                    </p>

                                    <h1 className="text-[#111111] font-Poppins text-base mt-2 font-bold">
                                        {productdata?.data?.weight || "NA"}
                                    </h1>

                                    <hr className="mt-4" />

                                    <p className="text-[#111111] font-Poppins font-medium text-base mt-4 ">
                                        Delivery Estimation
                                    </p>

                                    <h1 className="text-[#111111] font-Poppins text-base mt-2 font-semibold">
                                        {productdata?.data
                                            ?.delivery_estimation || "NA"}
                                    </h1>

                                   <div className="flex justify-center items-center mt-4" >
                                     <button
                                        onClick={notify}
                                        className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-Nunito font-semibold rounded"
                                    >
                                        Add to Cart
                                    </button>
                                   </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <p className="flex justify-center items-center py-12 text-red-600">
                    Product Not Available
                </p>
            )}

            {/* <ProductReview /> */}

            {productdata?.data?.reviews && (
                <div className="container py-4 mb-12 ">
                    <div>
                        <h1 className="text-[#1B1B1A] font-bold text-lg text-center 2xl:text-start xl:text-start lg:text-start md:text-start ">
                            Product Review
                        </h1>
                    </div>

                    <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col items-center gap-12 mt-8">
                        <div className=" w-1/2">
                            <h1 className="text-[#363636]">

                                {productdata?.data?.description}
                            </h1>
                        </div>

                        <div className="">

                            <Image
                                src={
                                    productdata?.data?.images?.[0]?.image
                                        ? `https://staging.ajiroba.ng/media/${productdata.data.images[0].image}`
                                        : ""
                                }
                                alt="Product Image"
                                width={200}
                                height={200}
                                objectFit="cover"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            )}

            {productdata?.data?.reviews && (
                <CustomerReview data={productdata} />
            )}

            {productdata?.data?.related_products && (
                <RelatedProduct data={productdata?.data?.related_products} />
            )}

            <Footer />
        </main>
    );
};
export default Page;
