"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Header } from "../component/Header";
import { Title } from "../component/Title";
import { Footer } from "../component/Footer";

import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Suspense } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import ModalComponent from '../component/ModalComponent'
import Input from "../component/Input";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Page = () => {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmordermodal, setConfirmOrder] = useState(false);
    const [isPaymentMethodConfirmed, setIsPaymentMethodConfirmed] = useState(false);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showConfirmOrder = () => {
        setConfirmOrder(true);
    };

    const handleConfirmOrder = () => {
        setConfirmOrder(false);
    };

    const handlecloseOrder = () => {
        setConfirmOrder(false);
    };

    const confirmPaymentMethod = () => {
        setIsPaymentMethodConfirmed(true);
    };


    const schema = yup.object().shape({

        password: yup
            .string()
            .required("Password is required")
            .min(6, "Can't be lesser than 6 digits"),

    });

    const {
        reset,
        register,
        control,
        handleSubmit,
        formState: { errors },
        trigger,
        watch,
        setValue,
    } = useForm({
        mode: "all",
        resolver: yupResolver(schema),
    });


    return (
        <Suspense fallback={<>Loading...</>}>
            <main>
                <Header />

                <div onClick={() => router.back()}>
                    <div className="cursor-pointer container flex justify-start">
                        <p className="text-[#E84526] text-base">Back</p>
                    </div>
                </div>

                <Title title="Payment" />

                <div className="product-image-gallery container py-8 grid 2xl:grid-cols-2 gap-y-6  lg:grid-cols-2 md:grid-cols-2 xl:grid-col-2 grid-cols-1">
                    <div>
                        <div className=" mb-4 bg-[#F6F6F6] shadow border rounded border-[#D2D2D2] px-4 py-4">
                            <div className="  px-4 py-2 my-4">
                                <div className="flex justify-between flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-4">
                                    <div className="flex  items-start gap-4 ">
                                        <div>
                                            <IoIosCheckmarkCircle color="#E84526" size={28} />
                                        </div>

                                        <div>
                                            <div>
                                                <p className="text-[#111111] text-base  ">
                                                    Delivery Details
                                                </p>
                                            </div>

                                            <div className="">
                                                <small className="  text-[#A09F9F]">
                                                    Deliver will be between 17 March and 23 March. You
                                                    will be notified upon delivery
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" bg-[#F6F6F6] shadow border rounded border-[#D2D2D2] px-4 py-4">
                            <div className="  px-4 py-2 my-4">
                                <div className="flex justify-between flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-4">
                                    <div className="flex  items-start gap-4 ">
                                        <div>
                                            <IoIosCheckmarkCircle color="#E84526" size={28} />
                                        </div>

                                        <div>
                                            <div>
                                                <p className="text-[#111111] text-base  ">
                                                    Customer Address
                                                </p>
                                            </div>

                                            <div className="">
                                                <small className="  text-[#A09F9F]">
                                                    1, Praisehill estate, Arepo, Lagos Ibadan Express way, ogun State, Nigeria.
                                                </small>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div className="flex justify-end mt-2" >
                                    <button onClick={showModal} className=" flex justify-center cursor-pointer text-[#E84526] text-sm">Change <MdKeyboardArrowRight color="#E84526" className="mt-1" /></button>
                                </div>
                            </div>
                        </div>

                        <div className=" bg-[#F6F6F6] shadow border rounded border-[#D2D2D2] px-4 py-4">
                            <div className="  px-4 py-2 my-4">
                                <div className="flex justify-between flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-4">
                                    <div className="flex  items-start gap-4 ">
                                        <div>
                                            <IoIosCheckmarkCircle color="#E84526" size={28} />
                                        </div>

                                        <div>
                                            <div>
                                                <p className="text-[#111111] text-base mb-4  ">
                                                    Payment Method
                                                </p>
                                            </div>

                                            {/* <div className="">
                                                <small className="  text-[#A09F9F]">
                                                    1, Praisehill estate, Arepo, Lagos Ibadan Express way, ogun State, Nigeria.
                                                </small>
                                            </div> */}

                                            <form action="">

                                                <div className="mb-4" >
                                                    <div>
                                                        <input type="radio" id="wallet" name="wallet" value="wallet" />
                                                        <label className="ml-2" htmlFor="wallet">Wallet</label>
                                                    </div>

                                                    <div className="ml-4">
                                                        <small className="text-[#A09F9F] text-sm" >pay with the money in your wallet</small>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div>
                                                        <input type="radio" id="card" name="wallet" value="card" />
                                                        <label className="ml-2" htmlFor="card">Pay with Cards, USSD or bank transfer</label>
                                                    </div>

                                                    <div className="ml-4">
                                                        <small className="text-[#A09F9F] text-sm" >pay with the money in your wallet</small>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>


                                </div>

                                <div className="flex justify-end mt-2" >
                                    <button onClick={confirmPaymentMethod} className=" flex justify-center cursor-pointer text-[#E84526] text-sm">Confirm Payment Method </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" container justify-center flex xl:block md:block lg:block 2xl:block">
                        <div className="border rounded border-[#D2D2D2] px-4 shadow py-4">
                            <h1 className="text-[#111111] text-xl">Order SUMMARY</h1>

                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <p className="text-[#b4a3a3] text-base mt-4">
                                        Total Item (4)
                                    </p>
                                </div>
                                <div>
                                    <h1 className="text-[#111111] text-lg mt-4 ">
                                        {/* N {grandTotal.toLocaleString()} */}
                                        {"N 1,098,934"}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <p className="text-[#b4a3a3] text-base mt-4">Delivery Fees</p>
                                </div>
                                <div>
                                    <h1 className="text-[#111111] text-lg mt-4 ">
                                        {/* N {grandTotal.toLocaleString()} */}
                                        {"N 2,434"}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <p className="text-[#b4a3a3] text-base mt-4">
                                        Service Charge
                                    </p>
                                </div>
                                <div>
                                    <h1 className="text-[#111111] text-lg mt-4 ">
                                        {/* N {grandTotal.toLocaleString()} */}
                                        {"N 200"}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <p className="text-[#b4a3a3] text-base mt-4">Total</p>
                                </div>
                                <div>
                                    <h1 className="text-[#111111] text-lg mt-4 font-bold ">
                                        {/* N {grandTotal.toLocaleString()} */}
                                        {"N 1, 101,568"}
                                    </h1>
                                </div>
                            </div>


                            <button onClick={showConfirmOrder}
                                className={`w-full mt-4 px-12 py-2 text-sm font-bold rounded ${isPaymentMethodConfirmed ? 'bg-[#E84526] text-[#FFFFFF] cursor-pointer' : 'bg-[#D2D2D2] text-[#F6F6F6] cursor-not-allowed'
                                    }`}
                                disabled={!isPaymentMethodConfirmed}
                            >
                                Confirm Order
                            </button>

                        </div>
                    </div>
                </div>

                <Footer />

                <ModalComponent
                    content={<div className="flex flex-col justify-center" >
                        <div>
                            <input className="border px-2 py-2 rounded border-[#D2D2D2] text-#B7B7B7" type="text" name="location" placeholder="Enter your new address" />
                        </div>


                        <div className="flex mt-4 gap-4" >
                            <div>
                                <IoLocationOutline color="#F25E26" size={24} />
                            </div>

                            <div>
                                <button className="text-[#2A2A2A]" >Use my location</button>
                            </div>
                        </div>


                        <div className="flex mt-4 gap-4" >
                            <div>
                                <IoLocationOutline color="#F25E26" size={24} />
                            </div>

                            <div>
                                <p className="text-[#2A2A2A]" >32, Ajiroba street,arepo,lagos</p>
                            </div>
                        </div>



                        <div className="flex mt-4 gap-4" >
                            <div>
                                <IoLocationOutline color="#F25E26" size={24} />
                            </div>

                            <div>
                                <p className="text-[#2A2A2A]" >45, jasper james, lekki</p>
                            </div>
                        </div>


                        <div className="flex gap-4 justify-center mt-4" >

                            <div>
                                <button className="rounded px-4 py-2 bg-[white] border border-[#E84526] text-[#E84526]">Cancel</button>
                            </div>

                            <div>
                                <button className="rounded px-4 py-2 bg-[#E84526] border border-[#E84526] text-[#FFFFFF]">Change</button>
                            </div>

                        </div>

                    </div>


                    }



                    isModalOpen={isModalOpen}
                    showModal={showModal}
                    handleOk={handleOk}
                    handleCancel={handleCancel}

                />


                <ModalComponent
                    content={<div className="flex flex-col justify-center" >
                        <div className="flex justify-center items-center flex-col" >
                            <p className="text-[#2A2A2A] font-bold text-xl font-Poppins" >Wallet Pin</p>
                            <small className="text-[#504D4D] text-lg font-Poppins">Kindly enter your wallet pin</small>
                        </div>


                        <form action="" className="flex justify-center items-center flex-col mt-8 mb-4" >


                            <div className="flex flex-col">
                                <Input
                                    label="Enter Pin"
                                    type="password"
                                    name="password"
                                    placeholder="****"
                                    register={register}
                                    errors={errors.password}
                                    HiEyeSlash={<FaRegEyeSlash />}
                                    HiEye={<FaRegEye />}

                                />
                                <div className="text-xs text-red-700">
                                    {errors?.password?.message}
                                </div>


                                <button
                                    className={`w-full mt-8 px-12 py-2 text-sm font-bold rounded bg-[#FCDFD4] text-[#2A2A2A] '
                                    }`}

                                >
                                    Pay
                                </button>
                            </div>





                        </form>




                    </div>


                    }
                    isModalOpen={confirmordermodal}
                    showModal={showConfirmOrder}
                    handleOk={handleConfirmOrder}
                    handleCancel={handlecloseOrder}

                />
            </main>
        </Suspense>
    );
};

export default Page;
