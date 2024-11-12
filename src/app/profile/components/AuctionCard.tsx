"use  client";
import React, { useState } from "react";
import Image from "next/image";
import { CiMenuKebab } from "react-icons/ci";
import Dropdown from "./Dropdown";
import DropDownAuction from "./DropDownAuction";
import { ModalProfile } from "./ModalProfile";
import { DefaultButton } from "@/app/component/Button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useMutateData } from "@/hooks/useMutateNewData";
import { useGetOrderWinsData } from "@/hooks/useGetData";
import Cookies from "js-cookie";
import { CustomModal } from "@/app/component/Modal";
import maskgroup from "@/app/asset/image/Maskgroup.svg";
import Barcode from "@/app/asset/image/barcode.svg";
import Link from "next/link";
import Brand from "@/app/asset/logo.svg";

type AuctionProps = {
    product: any[];
};

type Product = {
    name: string;
};

type Order = {
    order_id: string;
    products: Product[];
    total_price: string;
    order_date: string;
    delivery_status: string;
};

const AuctionWinCardNew = ({ product }: AuctionProps) => {
    /* console.log(product, 'product') */

    const [selectedTransaction, setSelectedTransaction] =
        useState<Order | null>(null);
    const [selectedTransactiondelete, setSelectedTransactiondelete] =
        useState<Order | null>(null);

    const [success, setSuccess] = useState(false);
    const [successdelete, setSuccessdelete] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewerror, Setreviewerror] = useState("");
    const [reviewerrordelete, Setreviewerrordelete] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isdeleteModalOpen, setisdeleteModalOpen] = useState(false);
    const [isSussessModal, setisSucceessModal] = useState(false);

    const router = useRouter();

    const handleCloseModaldelete = () => {
        setisdeleteModalOpen(false);
    };

    const handleOptionClick = (option: string, transaction: Order) => {
        //   console.log(`${option} clicked for transaction:`, transaction);
        //  console.log(transaction, 'transactionnnnn')

        if (option === "Review") {
            setSelectedTransaction(transaction);
            setModalOpen(true);
        }

        if (option === "Delete") {
            setSelectedTransactiondelete(transaction);
            // console.log(transaction, "Transaction to delete"); // Check if this logs correctly
            setisdeleteModalOpen(true);
        }
    };

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
        /*  resolver: yupResolver(ChangePass), */
    });

    const {
        reset: resetDeleteForm,
        register: registerDeleteForm,
        handleSubmit: handleSubmitDelete,
        formState: { errors: deleteErrors },
    } = useForm({
        mode: "all",
        // resolver: yupResolver(/* your delete form schema */),
    });

    const { isLoggedIn, user, token } = useAuthStore((state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        token: state.token,
    }));

    const userToken = token;

    const handleSuccess = (data: any) => {
        Setreviewerror("");
        reset();

        if (
            data.status === 201 ||
            data.status === 200 ||
            data.status === 204
        ) {
            console.log(data, "data");
            setSuccess(true);
            toast.success(`${data?.data?.message}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => router.push("/profile"),
            });
            reset();
        } else if (data.status === 400 || data.status === 409) {
            toast.error(
                `${data?.data?.message || "Password doesnt match"} `,
                {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                },
            );
            reset();
        } else if (data.status === 404) {
            toast.error(`${data?.data?.message || "Order not found"} `, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            reset();
        } else if (data.status === 401) {
            toast.error(
                `${data?.data?.message || "Authentication error"} `,
                {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                },
            );
            reset();
        } else if (data.status === 500) {
            toast.error(`${data?.data?.message || "old_password"} `, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            reset();
        } else {
            toast.error(`${data?.data?.message} `, {
                /*    toast.error(`${"An Error Occured" || "Error"}`, { */
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            reset();
        }
    };

    const handleError = (error: any) => {
        // console.log(data, "datttataaa", error);
        // console.log(error, "errrr");
        toast.error(`${"An Error Occured"}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        reset();
    };

    const { data, error, isError, isSuccess, mutate, status } =
        useMutateData("review order", handleSuccess, handleError);

    const {
        data: datad,
        error: errord,
        isError: isErrord,
        isSuccess: isSussessd,
        mutate: mutated,
        status: statusd,
    } = useMutateData("delete order", handleSuccess, handleError);

    const submitFormdelete = async (data: any, event: any) => {
        event.preventDefault();

        console.log(errors);
        console.log(data, "datata");

        //  console.log(selectedTransactiondelete, "Payload being submitted - BEFORE");

        if (!selectedTransactiondelete) {
            console.error("No transaction selected for deletion");
            return; // Exit the function if selectedTransactiondelete is null
        }

        const payload = {
            order_Id: selectedTransactiondelete.order_id,
        };

        mutated({
            url: "/api/deleteorder",
            payload: { payload: payload, token: userToken },
            token: userToken,
        });
    };

    const Closefuncdelete = () => {
        setisdeleteModalOpen(false);
        setSuccessdelete(false);
        // setSelectedRating(0);
        reset();
        Setreviewerrordelete("");
    };

    const userToken_ = Cookies.get("token") as string;

    const tkn_: string = Cookies.get("token") as string;

    const {
        data: auctioninfo,
        isLoading: auctionLoading,
        error: ordererror,
    } = useGetOrderWinsData(
        "/api/auctionwins",
        "get_auctionwins_details",
        userToken_,
    );

    const openProducts = auctioninfo?.data?.data?.open.map(
        (item: { id: any }) => {
            return { ...item, tag: ["open"] }; // Add tag as an array with "open" for consistency
        },
    );

    return (
        <div>
            <div className="">
                <div className="flex flex-col ">
                    {auctionLoading ? (
                        <p className="text-center text-gray-500 py-8">
                            Loading...
                        </p>
                    ) : openProducts?.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                            No data available
                        </p>
                    ) : (
                        openProducts?.map((val: any, index: number) => (
                            <div
                                key={index}
                                className="relative my-2 flex gap-4 border p-3 flex-wrap"
                            >
                                <Image
                                    src={`https://ajiroba.onrender.com${val?.auction[0]?.images[0]}`}
                                    alt={val?.auction[0]?.name}
                                    width={50}
                                    height={50}
                                    layout="intrinsic"
                                    className="object-cover w-full rounded-md h-72 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                                />

                                <div className="flex flex-col gap-3 capitalize">
                                    <p className=" font-semibold">
                                        {val?.auction[0]?.name}
                                    </p>
                                    <p>ID: {val?.id} </p>
                                    <p>Bid Number: {val?.bid_number}</p>
                                    <p>
                                        Ticket Price: ₦{val?.ticket_price}
                                    </p>
                                    <div className="mt-5 flex gap-3 flex-wrap">
                                        {val.tag &&
                                            val.tag.map(
                                                (
                                                    value: string,
                                                    index: number,
                                                ) => (
                                                    <p
                                                        key={index}
                                                        className={`text-xs ${value === "open" || value === "delivered" ? "bg-green-200 text-emerald-800" : value === "close" ? "bg-rose-200 text-red-800" : value === "redeem items" ? "bg-blue-700 text-white" : "bg-[#F25E26] text-white"} rounded-xl px-2.5  py-1 `}
                                                    >
                                                        {value}
                                                    </p>
                                                ),
                                            )}
                                    </div>
                                </div>
                                <span className="absolute right-3 top-2 rounded-md border p-2 cursor-pointer">
                                    <DropDownAuction
                                        onOptionClick={(option) =>
                                            handleOptionClick(option, val)
                                        }
                                        transaction={val}
                                    />
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {isdeleteModalOpen && (
                <ModalProfile
                    icon={""}
                    isOpen={isdeleteModalOpen}
                    onClose={handleCloseModaldelete}
                    title=""
                    handleEvent={handleCloseModaldelete}
                >
                    <form
                        onSubmit={handleSubmitDelete(submitFormdelete)}
                        className="flex flex-col"
                    >
                        <p className="flex justify-center text-left py-8">
                            Are you sure you want to delete this product?
                        </p>
                        <div className="mt-5 flex gap-4 justify-center">
                            <DefaultButton
                                text="No"
                                className="rounded-md border-2 border-[#F25E26] p-2 px-4 text-[#F25E26]"
                                type="button"
                                handleClick={Closefuncdelete}
                            />
                            <DefaultButton
                                text={
                                    status === "pending"
                                        ? "loading..."
                                        : "Yes"
                                }
                                className="rounded-md bg-[#F25E26] p-2 px-4 text-white"
                                type="submit"
                            />
                        </div>
                    </form>
                </ModalProfile>
            )}
        </div>
    );
};

const AuctionWinCardClosed = ({ product }: AuctionProps) => {
    /* console.log(product, 'product') */

    const [selectedTransaction, setSelectedTransaction] =
        useState<Order | null>(null);
    const [selectedTransactiondelete, setSelectedTransactiondelete] =
        useState<Order | null>(null);

    const [success, setSuccess] = useState(false);
    const [successdelete, setSuccessdelete] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewerror, Setreviewerror] = useState("");
    const [reviewerrordelete, Setreviewerrordelete] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isdeleteModalOpen, setisdeleteModalOpen] = useState(false);
    const [isSussessModal, setisSucceessModal] = useState(false);
    const [openWinningCard, setOpenWinningCard] = useState(false);

    const router = useRouter();

    const handleCloseModaldelete = () => {
        setisdeleteModalOpen(false);
    };

    const handleOptionClick = (option: string, transaction: Order) => {
        //   console.log(`${option} clicked for transaction:`, transaction);
        //  console.log(transaction, 'transactionnnnn')

        if (option === "Review") {
            setSelectedTransaction(transaction);
            setModalOpen(true);
        }

        if (option === "Delete") {
            setSelectedTransactiondelete(transaction);
            // console.log(transaction, "Transaction to delete"); // Check if this logs correctly
            setisdeleteModalOpen(true);
        }
    };

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
        /*  resolver: yupResolver(ChangePass), */
    });

    const {
        reset: resetDeleteForm,
        register: registerDeleteForm,
        handleSubmit: handleSubmitDelete,
        formState: { errors: deleteErrors },
    } = useForm({
        mode: "all",
        // resolver: yupResolver(/* your delete form schema */),
    });

    const { isLoggedIn, user, token } = useAuthStore((state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        token: state.token,
    }));

    const userToken = token;

    const handleSuccess = (data: any) => {
        Setreviewerror("");
        reset();

        if (
            data.status === 201 ||
            data.status === 200 ||
            data.status === 204
        ) {
            console.log(data, "data");
            setSuccess(true);
            toast.success(`${data?.data?.message}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => router.push("/profile"),
            });
            reset();
        } else if (data.status === 400 || data.status === 409) {
            toast.error(
                `${data?.data?.message || "Password doesnt match"} `,
                {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                },
            );
            reset();
        } else if (data.status === 404) {
            toast.error(`${data?.data?.message || "Order not found"} `, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            reset();
        } else if (data.status === 401) {
            toast.error(
                `${data?.data?.message || "Authentication error"} `,
                {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                },
            );
            reset();
        } else if (data.status === 500) {
            toast.error(`${data?.data?.message || "old_password"} `, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            reset();
        } else {
            toast.error(`${data?.data?.message} `, {
                /*    toast.error(`${"An Error Occured" || "Error"}`, { */
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            reset();
        }
    };

    const handleError = (error: any) => {
        // console.log(data, "datttataaa", error);
        // console.log(error, "errrr");
        toast.error(`${"An Error Occured"}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        reset();
    };

    const { data, error, isError, isSuccess, mutate, status } =
        useMutateData("review order", handleSuccess, handleError);

    const {
        data: datad,
        error: errord,
        isError: isErrord,
        isSuccess: isSussessd,
        mutate: mutated,
        status: statusd,
    } = useMutateData("delete order", handleSuccess, handleError);

    const submitFormdelete = async (data: any, event: any) => {
        event.preventDefault();

        console.log(errors);
        console.log(data, "datata");

        //  console.log(selectedTransactiondelete, "Payload being submitted - BEFORE");

        if (!selectedTransactiondelete) {
            console.error("No transaction selected for deletion");
            return; // Exit the function if selectedTransactiondelete is null
        }

        const payload = {
            order_Id: selectedTransactiondelete.order_id,
        };

        mutated({
            url: "/api/deleteorder",
            payload: { payload: payload, token: userToken },
            token: userToken,
        });
    };

    const Closefuncdelete = () => {
        setisdeleteModalOpen(false);
        setSuccessdelete(false);
        // setSelectedRating(0);
        reset();
        Setreviewerrordelete("");
    };

    const demodata = {
        status: "success",
        message: "Your biddings",
        data: {
            all: [
                {
                    id: "bfebf54b-8797-49d7-b2de-0ba5af7c39fa",
                    auction: [
                        {
                            name: "Smart Watch",
                            images: [
                                "/media/auction_images/Smart_Watch.jpg",
                                "/media/auction_images/Smart_Watch_hjJex2j.jpg",
                            ],
                        },
                    ],
                    bid_number: "BID4827493",
                    ticket_price: "2000.00",
                },
                {
                    id: "a64eedfd-289d-4ef6-b4b4-f7f27c973ef3",
                    auction: [
                        {
                            name: "Smart Watch",
                            images: [
                                "/media/auction_images/Smart_Watch.jpg",
                                "/media/auction_images/Smart_Watch_hjJex2j.jpg",
                            ],
                        },
                    ],
                    bid_number: "BID5029154",
                    ticket_price: "2000.00",
                },
            ],
            open: [
                {
                    id: "bfebf54b-8797-49d7-b2de-0ba5af7c39fa",
                    auction: [
                        {
                            name: "Smart Watch",
                            images: [
                                "/media/auction_images/Smart_Watch.jpg",
                                "/media/auction_images/Smart_Watch_hjJex2j.jpg",
                            ],
                        },
                    ],
                    bid_number: "BID4827493",
                    ticket_price: "2000.00",
                },
                {
                    id: "a64eedfd-289d-4ef6-b4b4-f7f27c973ef3",
                    auction: [
                        {
                            name: "Smart Watch",
                            images: [
                                "/media/auction_images/Smart_Watch.jpg",
                                "/media/auction_images/Smart_Watch_hjJex2j.jpg",
                            ],
                        },
                    ],
                    bid_number: "BID5029154",
                    ticket_price: "2000.00",
                },
            ],
            closed: [
                {
                    id: "e12ab78c-5f2c-4f2a-8b3f-0cba3efc58ef",
                    auction: [
                        {
                            name: "Wireless Earbuds",
                            images: [
                                "/media/auction_images/Smart_Watch.jpg",
                                "/media/auction_images/Smart_Watch_hjJex2j.jpg",
                            ],
                        },
                    ],
                    bid_number: "BID6938721",
                    ticket_price: "1500.00",
                },
                {
                    id: "d29be934-8464-4a65-ae99-2e3f7f6c7489",
                    auction: [
                        {
                            name: "Bluetooth Speaker",
                            images: [
                                "/media/auction_images/Smart_Watch.jpg",
                                "/media/auction_images/Smart_Watch_hjJex2j.jpg",
                            ],
                        },
                    ],
                    bid_number: "BID7493056",
                    ticket_price: "2500.00",
                },
            ],
        },
    };

    const userToken_ = Cookies.get("token") as string;

    const tkn_: string = Cookies.get("token") as string;

    const {
        data: auctioninfo,
        isLoading: auctionLoading,
        error: ordererror,
    } = useGetOrderWinsData(
        "/api/auctionwins",
        "get_auctionwins_details",
        userToken_,
    );

    const closedProducts = demodata.data.closed.map((item: { id: any }) => {
        return {
            ...item,
            tag: ["close", "redeem items", "winning advise"],
        }; // Add tag as an array with "open" for consistency
    });

    // Define functions for each tag type
    const handleOpenClick = () => {
        // Logic for "open" tag
        console.log("Open tag clicked");
    };

    const handleDeliveredClick = () => {
        // Logic for "delivered" tag
        console.log("Delivered tag clicked");
    };

    const handleCloseClick = () => {
        // Logic for "close" tag
        console.log("Close tag clicked");
    };

    const handleRedeemItemsClick = () => {
        // Logic for "redeem items" tag
        console.log("Redeem items tag clicked");
    };

    const handleWinningAdviseClick = () => {
        // Logic for "winning advise" tag
        setOpenWinningCard(!openWinningCard);
        console.log("Winning advise tag clicked");
    };

    // Helper function to get the appropriate click handler
    const getClickHandler = (value: any) => {
        switch (value) {
            case "open":
                return handleOpenClick;
            case "delivered":
                return handleDeliveredClick;
            case "close":
                return handleCloseClick;
            case "redeem items":
                return handleRedeemItemsClick;
            case "winning advise":
                return handleWinningAdviseClick;
            default:
                return () => console.log("Unknown tag clicked");
        }
    };

    return (
        <div>
            <div className="">
                <div className="flex flex-col ">
                    {auctionLoading ? (
                        <p className="text-center text-gray-500 py-8">
                            Loading...
                        </p>
                    ) : closedProducts?.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                            No data available
                        </p>
                    ) : (
                        closedProducts?.map((val: any, index: number) => (
                            <div
                                key={index}
                                className="relative my-2 flex gap-4 border p-3 flex-wrap"
                            >
                                <Image
                                    src={`https://ajiroba.onrender.com${val?.auction[0]?.images[0]}`}
                                    alt={val?.auction[0]?.name}
                                    width={50}
                                    height={50}
                                    layout="intrinsic"
                                    className="object-cover w-full rounded-md h-72 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                                />

                                <div className="flex flex-col gap-3 capitalize">
                                    <p className=" font-semibold">
                                        {val?.auction[0]?.name}
                                    </p>
                                    <p>ID: {val?.id} </p>
                                    <p>Bid Number: {val?.bid_number}</p>
                                    <p>
                                        Ticket Price: ₦{val?.ticket_price}
                                    </p>
                                    <div className="mt-5 flex gap-3 flex-wrap">
                                        {val.tag &&
                                            val.tag.map(
                                                (
                                                    value: string,
                                                    index: number,
                                                ) => (
                                                    <p
                                                        onClick={getClickHandler(
                                                            value,
                                                        )}
                                                        key={index}
                                                        className={`text-xs ${value === "open" || value === "delivered" ? "bg-green-200 text-emerald-800" : value === "close" ? "bg-rose-200 text-red-800" : value === "redeem items" ? "bg-blue-700 text-white" : value === "winning advise" ? "bg-[#F25E26] text-white" : "bg-[#F25E26] text-white"} rounded-xl px-2.5  py-1 cursor-pointer `}
                                                    >
                                                        {value}
                                                    </p>
                                                ),
                                            )}
                                    </div>
                                </div>
                                <span className="absolute right-3 top-2 rounded-md border p-2 cursor-pointer">
                                    <DropDownAuction
                                        onOptionClick={(option) =>
                                            handleOptionClick(option, val)
                                        }
                                        transaction={val}
                                    />
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {isdeleteModalOpen && (
                <ModalProfile
                    icon={""}
                    isOpen={isdeleteModalOpen}
                    onClose={handleCloseModaldelete}
                    title=""
                    handleEvent={handleCloseModaldelete}
                >
                    <form
                        onSubmit={handleSubmitDelete(submitFormdelete)}
                        className="flex flex-col"
                    >
                        <p className="flex justify-center text-left py-8">
                            Are you sure you want to delete this product?
                        </p>
                        <div className="mt-5 flex gap-4 justify-center">
                            <DefaultButton
                                text="No"
                                className="rounded-md border-2 border-[#F25E26] p-2 px-4 text-[#F25E26]"
                                type="button"
                                handleClick={Closefuncdelete}
                            />
                            <DefaultButton
                                text={
                                    status === "pending"
                                        ? "loading..."
                                        : "Yes"
                                }
                                className="rounded-md bg-[#F25E26] p-2 px-4 text-white"
                                type="submit"
                            />
                        </div>
                    </form>
                </ModalProfile>
            )}

            <CustomModal isOpen={openWinningCard}>
                {openWinningCard && (
                    <>
                      {/*   <div
                            className=""
                            style={{
                                backgroundImage: "url('/ajirobabg.svg')",
                                backgroundSize: "33.33%",
                                backgroundPosition: "center",
                                backgroundRepeat: "repeat-x",

                            }}
                        >

                           <div className="flex justify-end mb-4 ">
                                <button
                                    onClick={() => {
                                        setOpenWinningCard(false);
                                    }}
                                    className=" text-gray-500 hover:text-gray-800 focus:outline-none"
                                    aria-label="Close"
                                >
                                    close
                                </button>
                            </div>
                            <div className="flex justify-between" >
                                <div>
                                    <Link href={"/"} className="">
                                        <Image
                                            src={Brand}
                                            alt="brand-logo"
                                        />
                                    </Link>
                                </div>

                                <div className="flex flex-col items-center text-center" >
                                  <p className="text-[#504D4D] text-sm"> Ajiroba Auction</p>
                                    <h1 className="text-[#2A2A2A] font-semibold ">Winning Advice</h1>

                                </div>
                            </div>




                            <div className="bg-gradient-to-r from-gray-900 to-orange-600 p-4 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <div className="text-[#FEEEAE] text-[40px] font-bold">
                                        Winning
                                    </div>
                                    <p className="text-base flex items-center justify-end text-[#F6F6F6] font-mono">
                                        Advice
                                    </p>
                                </div>
                                <Image src={maskgroup} alt="Celebration" />
                            </div>


                            <div className="px-6 py-4">
                                <div className="flex justify-between">
                                    <div className="text-sm text-gray-600 mb-4">
                                        Date: Fri, March 1, 2024
                                    </div>

                                    <button className=" bg-gray-200 text-[#E84526] px-4 py-2 rounded-lg shadow">
                                        Print
                                    </button>
                                </div>

                               <div  className="flex items-center gap-12">
                                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    Congratulations!
                                </h2>
                                <p className="text-xl font-semibold text-gray-700">
                                    Oloruntoba Ayodele
                                </p>
                               </div>

                                <p className="mt-2 text-gray-600">
                                    You have won{" "}
                                    <span className="font-bold">
                                        1 bag of rice
                                    </span>{" "}
                                    in our draw which took place on{" "}
                                    <span className="font-semibold">
                                        Feb 24, 2024
                                    </span>{" "}
                                    with your ticket number{" "}
                                    <span className="font-bold">
                                        123536
                                    </span>
                                    .
                                </p>

                                <p className="mt-4 text-sm text-gray-500">
                                    Kindly log in to your dashboard to
                                    specify your preferred mode of
                                    redemption. Thank you for your
                                    patronage.
                                </p>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="mt-6 text-gray-700 font-semibold">
                                            Ayoola Ayodele
                                        </p>
                                        <p className="text-gray-500">
                                            MD/CEO & Yeye Ajiroba
                                        </p>
                                    </div>

                                    <div>
                                        <div className="">
                                            <Image
                                                src={Barcode}
                                                alt="Barcode"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="bg-orange-600 text-white p-4 text-center mt-4">
                                <p>
                                    www.ajiroba.com • ajiroba@gmail.com •
                                    08123940496
                                </p>
                            </div>
                        </div> */}

                        <>
  <div
    className="bg-cover bg-center"
    style={{
      backgroundImage: "url('/ajirobabg.svg')",
      backgroundSize: "33.33%",
      backgroundPosition: "center",
      backgroundRepeat: "repeat-x",
    }}
  >
    {/* Close Button */}
    <div className="flex justify-end mb-4 px-4">
      <button
        onClick={() => setOpenWinningCard(false)}
        className="text-gray-500 hover:text-gray-800 focus:outline-none"
        aria-label="Close"
      >
        Close
      </button>
    </div>

    {/* Header Section */}
    <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8">
      <Link href={"/"} className="mb-4 md:mb-0">
        <Image src={Brand} alt="brand-logo" />
      </Link>

      <div className="text-center mb-4 md:mb-0">
        <p className="text-[#504D4D] text-sm">Ajiroba Auction</p>
        <h1 className="text-[#2A2A2A] font-semibold text-lg md:text-xl">Winning Advice</h1>
      </div>
    </div>

    {/* Background Header */}
    <div className="bg-gradient-to-r from-gray-900 to-orange-600 p-4 flex flex-col md:flex-row items-center justify-between px-4 md:px-8 text-center md:text-left">
      <div>
        <div className="text-[#FEEEAE] text-3xl md:text-5xl font-bold">Winning</div>
        <p className="text-base text-[#F6F6F6] font-mono">Advice</p>
      </div>
      <Image src={maskgroup} alt="Celebration" className="mt-4 md:mt-0" />
    </div>

    {/* Content */}
    <div className="px-4 md:px-8 py-4">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="text-sm text-gray-600 mb-4 md:mb-0">Date: Fri, March 1, 2024</div>
        <button className="bg-gray-200 text-[#E84526] px-4 py-2 rounded-lg shadow">
          Print
        </button>
      </div>

      <div className="text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Congratulations!</h2>
        <p className="text-lg font-semibold text-gray-700">Oloruntoba Ayodele</p>
      </div>

      <p className="mt-2 text-gray-600 text-sm md:text-base">
        You have won{" "}
        <span className="font-bold">1 bag of rice</span> in our draw which took place on{" "}
        <span className="font-semibold">Feb 24, 2024</span> with your ticket number{" "}
        <span className="font-bold">123536</span>.
      </p>

      <p className="mt-4 text-xs md:text-sm text-gray-500">
        Kindly log in to your dashboard to specify your preferred mode of redemption.
        Thank you for your patronage.
      </p>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-gray-700 font-semibold">Ayoola Ayodele</p>
          <p className="text-gray-500">MD/CEO & Yeye Ajiroba</p>
        </div>

        <div>
          <Image src={Barcode} alt="Barcode" width={50} height={50} />
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="bg-orange-600 text-white p-4 text-center mt-4 text-xs md:text-sm">
      <p>www.ajiroba.com • ajiroba@gmail.com • 08123940496</p>
    </div>
  </div>
</>
                    </>
                )}
            </CustomModal>
        </div>
    );
};

export { AuctionWinCardNew, AuctionWinCardClosed };
