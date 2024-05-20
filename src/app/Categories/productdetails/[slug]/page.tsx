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
import image2 from "../../../asset/image/rice2.jpeg";
import image3 from "../../../asset/image/rice3.jpeg";
import image4 from "../../../asset/image/rice4.jpeg";
import './style.css';
import { FaStar } from "react-icons/fa6";
import profile_head from '../../../asset/image/profile_head.svg';
import { RelatedProducts } from "@/app/component/RelatedProducts";
import { Products, RelatedData } from "@/app/static-data";

export const ProductReview = () => {
    return (
        <div className="container py-4 mb-12">
            <div>
                <h1 className="text-[#1B1B1A] font-bold text-lg text-center 2xl:text-start xl:text-start lg:text-start md:text-start">
                    Product Review
                </h1>
            </div>
            <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col items-center gap-12 mt-8">
                <div className="w-1/2">
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
                        <li>Plain and clean with no dirt</li>
                    </ul>
                    <h1 className="text-[#363636]">
                        Note that we show the EU sizes for Stanley/Stella products.
                        Elevate your culinary experience with our exquisite range of premium
                        rice varieties, sourced from the finest fields around the world. We understand the
                        importance of quality ingredients in creating memorable meals. Our curated collection of rice
                        is sure to meet the expectations of discerning chefs and home cooks alike.
                    </h1>
                </div>
                <div>
                    <Image src={image4} alt="product_image" layout="responsive" className="object-cover" />
                </div>
            </div>
        </div>
    );
};

export const CustomerReview = () => {
    const star = [1, 2, 3, 4, 5];
    const rating = 5;

    return (
        <div className="container py-4 mb-12">
            <div>
                <h1 className="text-[#1B1B1A] font-bold text-lg text-center 2xl:text-start xl:text-start lg:text-start md:text-start">
                    Customer Review
                </h1>
            </div>
            <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col 2xl:items-start xl:items-start lg:items-start md:items-start items-center gap-12 mt-8">
                <div className="w-1/2">
                    <p className='flex mt-4 items-center text-[#111111] text-sm gap-1'>
                        {star.map((val, index) => (
                            <span key={index}>
                                <FaStar className={index < rating ? 'text-[#F25E26]' : 'text-gray-300'} />
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
                    <div className="mt-4">
                        <p>Filter By:</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <button className="border border-[#D2D2D2] mt-4 px-4 py-2 text-sm bg-[#FFFFFF] hover:bg-[#FCDFD4] text-[#111111] font-bold rounded">1 Star</button>
                        <button className="border border-[#D2D2D2] mt-4 px-4 py-2 text-sm bg-[#FFFFFF] hover:bg-[#FCDFD4] text-[#111111] font-bold rounded">2 Star</button>
                        <button className="border border-[#D2D2D2] mt-4 px-4 py-2 text-sm bg-[#FFFFFF] hover:bg-[#FCDFD4] text-[#111111] font-bold rounded">3 Star</button>
                        <button className="border border-[#D2D2D2] mt-4 px-4 py-2 text-sm bg-[#FFFFFF] hover:bg-[#FCDFD4] text-[#111111] font-bold rounded">4 Star</button>
                        <button className="mt-4 px-4 py-2 text-sm bg-[#FCDFD4] hover:bg-[#FCDFD4] text-[#2A2A2A] font-bold rounded">5 Star</button>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="flex gap-2">
                        <div>
                            <Image src={profile_head} alt="Profile Image" className="rounded-full object-cover" />
                        </div>
                        <div>
                            <p>Klara Cole</p>
                            <p className='flex mt-4 items-center text-[#111111] text-sm gap-1'>
                                {star.map((val, index) => (
                                    <span key={index}>
                                        <FaStar className={index < rating ? 'text-[#F25E26]' : 'text-gray-300'} />
                                    </span>
                                ))}
                                22/11/2022
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Eu leo magna iaculis aliquam imperdiet dictumst gravida pellentesque in. Dolor consequat lectus sit proin. Leo dictum ipsum mauris quis eget. Lectus urna egestas molestie netus amet facilisi fringilla nullam nisl. Interdum.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <div>
                            <Image src={profile_head} alt="Profile Image" className="rounded-full object-cover" />
                        </div>
                        <div>
                            <p>Klara Cole</p>
                            <p className='flex mt-4 items-center text-[#111111] text-sm gap-1'>
                                {star.map((val, index) => (
                                    <span key={index}>
                                        <FaStar className={index < rating ? 'text-[#F25E26]' : 'text-gray-300'} />
                                    </span>
                                ))}
                                22/11/2022
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Eu leo magna iaculis aliquam imperdiet dictumst gravida pellentesque in. Dolor consequat lectus sit proin. Leo dictum ipsum mauris quis eget. Lectus urna egestas molestie netus amet facilisi fringilla nullam nisl. Interdum.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <div>
                            <Image src={profile_head} alt="Profile Image" className="rounded-full object-cover" />
                        </div>
                        <div>
                            <p>Klara Cole</p>
                            <p className='flex mt-4 items-center text-[#111111] text-sm gap-1'>
                                {star.map((val, index) => (
                                    <span key={index}>
                                        <FaStar className={index < rating ? 'text-[#F25E26]' : 'text-gray-300'} />
                                    </span>
                                ))}
                                22/11/2022
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Eu leo magna iaculis aliquam imperdiet dictumst gravida pellentesque in. Dolor consequat lectus sit proin. Leo dictum ipsum mauris quis eget. Lectus urna egestas molestie netus amet facilisi fringilla nullam nisl. Interdum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Page = () => {
    const params = useSearchParams();
    const id = params.get('id');
    const product = useMemo(() => Products.find(val => val.id === id), [id]);
    const related = useMemo(() => RelatedData.filter(val => val.productId === id), [id]);

    return (
        <>
            <Breadcrumb title={product?.title} />
            <Title title={product?.title} />
            <div className="container py-4 mb-12">
                <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col items-center gap-12 mt-8">
                    <div className="w-1/2">
                        <Image src={product?.image} alt={product?.title} layout="responsive" className="object-cover" />
                    </div>
                    <div className="w-1/2">
                        <p className="text-lg">{product?.description}</p>
                    </div>
                </div>
            </div>
            <ProductReview />
            <CustomerReview />
            <RelatedProducts products={related} />
        </>
    );
};

export default Page;



// nnnc