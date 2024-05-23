"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Breadcrumb } from "../component/Breadcrumb";
import { Header } from "../component/Header";
import { Title } from "../component/Title";
import Image from "next/image";
import { Footer } from "../component/Footer";
import { RiDeleteBin6Line } from "react-icons/ri";
import image2 from "../asset/image/rice2.jpeg";
import image3 from "../asset/image/rice3.jpeg";
import image4 from "../asset/image/rice4.jpeg";

const Page = ({ params }: any) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [path, setPath] = useState<string | null>(null);
    const sub = searchParams.get("sub");
    const query = searchParams.get("query");
    const selectedBrands = searchParams.get("selectedBrands");
    const min_max = searchParams.get("min_max");

    const router = useRouter();

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

    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            image: image2,
            title: "Mama Gold Rice",
            price: 64500,
            originalPrice: 76500,
            quantity: 1,
        },
        {
            id: 2,
            image: image3,
            title: "Royal Stallion Rice",
            price: 70000,
            originalPrice: 80000,
            quantity: 1,
        },
        {
            id: 3,
            image: image4,
            title: "Caprice",
            price: 85000,
            originalPrice: 95000,
            quantity: 1,
        }
    ]);

    const handleIncrement = (id: number) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const handleDecrement = (id: number) => {
        setCartItems(cartItems.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const handleDelete = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const calculateTotalPrice = (price: number, quantity: number) => {
        return price * quantity;
    };

    const grandTotal = cartItems.reduce((total, item) => {
        return total + calculateTotalPrice(item.price, item.quantity);
    }, 0);

    return (
        <main>
            <Header />
            <Breadcrumb paths={verifiedpaths} text={undefined} />

            <div onClick={() => router.back()}>
                <div className="cursor-pointer container flex justify-start">
                    <p className="text-[#E84526] text-base">Back</p>
                </div>
            </div>

            <Title title="Cart" />

            <div className="product-image-gallery container py-8 grid 2xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xl:grid-col-2 grid-cols-1">
                <div>
                    <div className="border rounded border-[#D2D2D2] px-4 py-4">
                        <p>Cart ({cartItems.length})</p>  {/* Cart Total */}

                        {cartItems.map((item) => (
                            <div key={item.id} className="border rounded border-[#D2D2D2] px-4 py-2 my-4">
                                <div className="flex justify-between flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-4">
                                    <div>
                                        <Image
                                            className="w-20 h-20 object-cover"
                                            src={item.image}
                                            alt="Product Thumbnail"
                                        />
                                        <div className="flex items-center mt-8">
                                            <button
                                                onClick={() => handleDecrement(item.id)}
                                                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-l"
                                            >
                                                -
                                            </button>

                                            <input
                                                type="text"
                                                value={item.quantity}
                                                readOnly
                                                className="w-12 text-center border-t border-b border-gray-300"
                                            />
                                            <button
                                                onClick={() => handleIncrement(item.id)}
                                                className="px-2 py-1 bg-[#E36414] text-white rounded-r"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[#111111] text-base mt-2 font-bold">
                                            {item.title}
                                        </p>

                                        <h1 className="text-[#b4a3a3] text-base mt-4">
                                            Food Stuff In Stock
                                        </h1>
                                    </div>

                                    <div>
                                        <div>
                                            <h1 className="text-[#111111] text-2xl mt-2 font-bold">
                                                N {calculateTotalPrice(item.price, item.quantity).toLocaleString()}
                                            </h1>
                                            <h1 className="text-[#111111] text-lg mt-2 line-through">
                                                N {item.originalPrice.toLocaleString()}
                                            </h1>
                                        </div>

                                        {/* To delete from cart */}
                                        <div className="flex items-center gap-2 mt-8 cursor-pointer" onClick={() => handleDelete(item.id)}>
                                            <RiDeleteBin6Line color="#E84526" />
                                            <h1 className="text-[#E84526]">Delete</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 container justify-center flex xl:block md:block lg:block 2xl:block">
                    <div className="border rounded border-[#D2D2D2] px-4 shadow py-4">
                        <h1 className="text-[#111111] text-xl">Cart SUMMARY</h1>

                        <div className="flex items-center flex-wrap gap-4">
                            <div>
                                <p className="text-[#b4a3a3] text-base mt-4">Subtotal</p>
                            </div>
                            <div>
                                <h1 className="text-[#111111] text-lg mt-4 font-bold">
                                    N {grandTotal.toLocaleString()}
                                </h1>
                            </div>
                        </div>

                        <hr className="mt-4" />
                        {/* Checkout total */}
                        <button className="mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:bg-[#FCDFD4] text-[#2A2A2A] font-bold rounded">
                            Check out (N {grandTotal.toLocaleString()})
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default Page;

