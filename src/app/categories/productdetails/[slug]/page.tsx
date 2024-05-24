"use client";
import { useState, useEffect, useMemo, SetStateAction } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Breadcrumb } from "@/app/component/Breadcrumb";
import { Header } from "@/app/component/Header";
import { Footer } from "@/app/component/Footer";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Title } from "@/app/component/Title";
import image1 from "../../../asset/image/rice1.jpeg";
import image2 from "../../../asset/image/rice2.jpeg"
import image3 from "../../../asset/image/rice3.jpeg"
import image4 from "../../../asset/image/rice4.jpeg"
import './style.css'
import { FaStar } from "react-icons/fa6";
import profile_head from '../../../asset/image/profile_head.svg'
import { RelatedProducts } from "@/app/component/RelatedProducts";
import { Products, RelatedData } from "@/app/static-data";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductReview = () => {
    return (
        <div className="container py-4 mb-12 " >

            <div>
                <h1 className="text-[#1B1B1A] font-bold text-lg text-center 2xl:text-start xl:text-start lg:text-start md:text-start " >Product Review</h1>
            </div>


            <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col items-center gap-12 mt-8">

                <div className=" w-1/2">
                    <h1 className="text-[#363636]">
                        Mama Gold Rice: Premium quality, long-grain rice known for its delicious taste
                        and distinctive aroma. Aged to perfection, it guarantees a fluffy and flavorful result.
                        Trusted for superior quality,
                        perfect for both traditional and modern dishes. Elevate your dining experience with Mama Gold Rice.
                    </h1>

                    <ul className="py-8 list-disc px-8 text-[#363636]">
                        <li>100% safe and trusted</li>
                        <li>Product weight: 50kg</li>
                        <li>Origin: Himalayan Foothills</li>
                        <li>Known for its long, slender grains and distinct aroma, our Basmati rice is perfect for biryanis and pilafs.</li>
                        <li>Aged to perfection for enhanced flavor and fluffiness.</li>
                        <li>plain and clean with no dirt</li>
                    </ul>

                    <h1 className="text-[#363636]">Note that we show the EU sizes for Stanley/Stella products.
                        The sizes Elevate your culinary experience with our exquisite range of premium
                        rice varieties, sourced from the finest fields around the world. we understand the
                        importance of quality ingredients in creating memorable meals. Our curated collection of rice
                        is sure to meet the expectations of discerning chefs and home cooks alike.</h1>

                </div>

                <div className="" >

                    <Image src={image4} alt="product_image" layout="responsive"
                        className=" object-cover" />



                </div>



            </div>


        </div>
    )
}

const CustomerReview = () => {

    const star = [1, 2, 3, 4, 5]
    const rating = 5;

    return (
        <div className="container py-4 mb-12 " >

            <div>
                <h1 className="text-[#1B1B1A] font-bold text-lg text-center 2xl:text-start xl:text-start lg:text-start md:text-start " >Customer Review</h1>
            </div>

            <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col 2xl:items-start xl:items-start lg:items-start md:items-start items-center gap-12 mt-8">

                <div className=" w-1/2">

                    <p className='flex mt-4 items-center text-[#111111] text-sm gap-1'>
                        {star.map((val, index) => (
                            <span key={index}>

                                <span key={index}>
                                    <FaStar className={index < rating ? 'text-[#F25E26]' : 'text-gray-300'} />
                                </span>
                            </span>
                        ))}
                        (300) Reviews
                    </p>


                    <div className="flex gap-4 items-center py-2">
                        <div><span>5 stars</span></div>

                        <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div className="bg-[#E84526] h-2.5 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                        </div>



                        <div>
                            <small>200</small>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center py-2">
                        <div><span>4 stars</span></div>

                        <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div className="bg-[#E84526] h-2.5 rounded-full" style={{ width: '55%' }}></div>
                            </div>
                        </div>



                        <div>
                            <small>60</small>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center py-2">
                        <div><span>3 stars</span></div>

                        <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div className="bg-[#E84526] h-2.5 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>



                        <div>
                            <small>26</small>
                        </div>
                    </div>

                    <div className="mt-4" >
                        <p>Filter By:</p>
                    </div>

                    <div className="flex gap-2 flex-wrap" >


                        <button
                            className="border border-[#D2D2D2] mt-4 px-4 py-2 text-sm bg-[#FFFFFF] hover:[#FCDFD4] text-[#111111] font-bold rounded"

                        >
                            1 Star
                        </button>

                        <button
                            className="border border-[#D2D2D2] mt-4 px-4 py-2 text-sm bg-[#FFFFFF] hover:[#FCDFD4] text-[#111111] font-bold rounded"

                        >
                            2 Star
                        </button>

                        <button
                            className="border border-[#D2D2D2] mt-4 px-4 py-2 text-sm bg-[#FFFFFF] hover:[#FCDFD4] text-[#111111] font-bold rounded"

                        >
                            3 Star
                        </button>

                        <button
                            className="border border-[#D2D2D2] mt-4 px-4 py-2 text-sm bg-[#FFFFFF] hover:[#FCDFD4] text-[#111111] font-bold rounded"

                        >
                            4 Star
                        </button>

                        <button
                            className=" mt-4 px-4 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-bold rounded"

                        >
                            5 Star
                        </button>

                    </div>

                </div>

                <div className="w-1/2" >

                    <div className="flex gap-2" >
                        <div>

                            <Image src={profile_head} alt="Profile Image" className="rounded-full object-cover   " style={{ borderRadius: '50%' }} />



                        </div>

                        <div>
                            <p>Klara Cole</p>
                            <p className='flex mt-4 items-center text-[#111111] text-sm gap-1'>
                                {star.map((val, index) => (
                                    <span key={index}>

                                        <span key={index}>
                                            <FaStar className={index < rating ? 'text-[#F25E26]' : 'text-gray-300'} />
                                        </span>
                                    </span>
                                ))}
                                22/11/2022
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Eu leo magna iaculis aliquam
                                imperdiet dictumst gravida pellentesque in. Dolor consequat lectus sit proin. Leo dictum ipsum mauris quis eget.
                                Lectus urna egestas molestie netus amet facilisi fringilla nullam nisl. Interdum .
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4" >
                        <div>

                            <Image src={profile_head} alt="Profile Image" className="rounded-full object-cover   " style={{ borderRadius: '50%' }} />



                        </div>

                        <div  >
                            <p>Klara Cole</p>
                            <p className='flex mt-4 items-center text-[#111111] text-sm gap-1'>
                                {star.map((val, index) => (
                                    <span key={index}>

                                        <span key={index}>
                                            <FaStar className={index < rating ? 'text-[#F25E26]' : 'text-gray-300'} />
                                        </span>
                                    </span>
                                ))}
                                22/11/2022
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Eu leo magna iaculis aliquam
                                imperdiet dictumst gravida pellentesque in. Dolor consequat lectus sit proin. Leo dictum ipsum mauris quis eget.
                                Lectus urna egestas molestie netus amet facilisi fringilla nullam nisl. Interdum .
                            </p>
                        </div>
                    </div>





                </div>





            </div>

        </div>
    )


}


const RelatedProduct = () => {


    // const filteredProducts = Products.filter((product) => {
    //     const lowerCaseParams = paths
    //         .map((param) => param && param.toLowerCase())
    //         .filter(Boolean);
    //     const lowerCaseCategory = product.category.toLowerCase();
    //     const lowerCaseSubCategory = product.subCategory.toLowerCase();

    //     return (
    //         lowerCaseParams.includes(lowerCaseCategory) ||
    //         lowerCaseParams.includes(lowerCaseSubCategory)
    //     );
    // });

    return (

        <div className="container py-4 mb-12 " >
            <div>
                <h1 className="text-[#1B1B1A] font-bold text-lg text-center 2xl:text-start xl:text-start lg:text-start md:text-start " >Other Related Products</h1>
            </div>


            <div>
                <RelatedProducts cardInfo={RelatedData} />
            </div>
        </div>
    )
}


const Page = ({ params }: any) => {


    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [path, setPath] = useState<string | null>(null);
    const sub = searchParams.get("sub");
    const query = searchParams.get("query");
    const selectedBrands = searchParams.get("selectedBrands");
    const min_max = searchParams.get("min_max");

    const router = useRouter()

    const star = [1, 2, 3, 4, 5]
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
        () => [...decodedPaths, sub,],
        [decodedPaths, sub,],
    );

    useEffect(() => {
        if (paths.length > 0) {
            setPath(paths[paths.length - 1]);
        }

    }, [paths]);

    const [selectedImage, setSelectedImage] = useState(0);
    const images = [
        image4, image2,
    ];

    const handleImageClick = (index: SetStateAction<number>) => {
        setSelectedImage(index);
    };

    const basePrice = 64500;
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


    const notify = () => {
        toast('🦄 ‘Mama Gold Rice’ has been added to cart', {
            position: "top-center",
            autoClose: 5000,
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





    return (
        <main>
            <ToastContainer />
            <Header />
            <Breadcrumb paths={verifiedpaths} text={undefined} />

            <div onClick={() => router.back()} >
                <div className=" cursor-pointer container  flex justify-start" ><p className="text-[#E84526] text-base">Back</p></div>
            </div>


            <Title title="Product Details" />

            <div className="product-image-gallery  container py-8 grid 2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 xl:grid-col-3 grid-cols-1 ">

                <div className=" ">
                    <div className="flex 2xl:flex-col xl:flex-col lg:flex-col md:flex-col flex-row 2xl:justify-start xl:justify-start

                    md:justify-start lg:justify-start justify-center gap-4" >

                        {images.slice(0, 4).map((image, index) => (
                            <div key={index} className="thumbnail-image ">
                                <Image
                                    className=" w-32 h-32 object-cover" // Ensure uniform size for thumbnails
                                    src={image}
                                    alt="Product Thumbnail"
                                    onClick={() => handleImageClick(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className=" mt-8">
                    <div className="thumbnail-images w-auto     ">

                        <div className="main-image">

                            <Image
                                src={images[selectedImage]}
                                alt="Product Image"
                                layout="responsive"
                                className=" object-cover"
                            />
                        </div>
                    </div>


                </div>

                <div className=" mt-4 container justify-center flex xl:block md:block lg:block 2xl:block" >
                    <div className="" >
                        <h1 className="text-[#111111] text-xl " >Mama Gold Rice</h1>
                        <p className='flex mt-4 items-center text-[#111111] text-sm gap-1'>
                            {star.map((val, index) => (
                                <span key={index}>

                                    <span key={index}>
                                        <FaStar className={index < rating ? 'text-[#F25E26]' : 'text-gray-300'} />
                                    </span>
                                </span>
                            ))}
                            (300) Reviews
                        </p>
                        <h1 className="text-[#111111] text-2xl mt-2 font-bold">N {totalPrice.toLocaleString()}</h1>
                        <h1 className="text-[#111111] text-lg mt-2 line-through ">N 76,500</h1>

                        <hr className="mt-4" />
                        <p className="text-[#b4a3a3] text-base mt-4 " >Quantity</p>

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

                        <p className="text-[#b4a3a3] text-base mt-4 " >Weight</p>

                        <h1 className="text-[#111111] text-base mt-2 font-bold">50 kg</h1>

                        <hr className="mt-4" />

                        <p className="text-[#b4a3a3] text-base mt-4 " >Delivery Estimation</p>

                        <h1 className="text-[#111111] text-base mt-2 font-bold">Nov. 12 - Nov. 22</h1>


                        <button
                            onClick={notify} className=" mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:[#FCDFD4] text-[#2A2A2A] font-bold rounded"

                        >
                            Add to Cart
                        </button>

                    </div>


                </div>
            </div>

            <ProductReview />

            <CustomerReview />

            <RelatedProduct />


            <Footer />
        </main>
    );
};
export default Page;