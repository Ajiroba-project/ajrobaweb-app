"use client";
import Link from "next/link";
import Brand from "../asset/logo.svg";
import Image from "next/image";
import { HeroSubText } from "../component/AuthHero";
import { DefaultButton } from "../component/Button";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useMutateData } from "@/hooks/useMutateData";
import { toast } from "react-toastify";
import { userOTPStore } from '@/store/store'

function Page() {
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const { set_user_Otp } = userOTPStore(state => ({
        set_user_Otp: state.set_user_Otp
    }))

    const handleInputChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const input = event.target.value;
        const numericValue = input.replace(/[^0-9]/g, '');
        const value = numericValue.slice(0, 1);

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        set_user_Otp(newOtp.join(''));

        event.target.value = value;

        if (index < 5 && value.length === 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleBackspace = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (index > 0 && event.keyCode === 8 && otp[index].length === 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        const isNumber = /^[0-9]$/.test(event.key);
        const isAllowedKey = allowedKeys.includes(event.key);

        if (!isNumber && !isAllowedKey) {
            event.preventDefault();
        }
    };

    const handleSuccess = (data: any) => {
        if (data.status === 200) {
            toast.success(`${data?.data?.message}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => router.push('/setnewpass')
            })
            setOtp(["", "", "", "", "", ""])
        } else if (data.status === 400) {
            toast.error(`${data?.data?.message}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setOtp(["", "", "", "", "", ""])
        } else {
            toast.error(`${'An Error Occured'}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setOtp(["", "", "", "", "", ""])
        }
    };

    const handleError = (error: any) => {
        toast.error(`${'An Error Occured'}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setOtp(["", "", "", "", "", ""])
    };

    const { mutate, status } = useMutateData(
        "signup",
        handleSuccess,
        handleError,
    );

    const handleVerify = () => {
        const Payload = {
            otp: otp?.join("")
        }
        mutate({
            url: "/api/verifyresetpasswordotp",
            payload: Payload
        });
    };

    const resendotp = () => {
        router.push('/resendpassotp')
    };

    return (
        <>
            <div className="px-4 content-container">
                <nav className="flex justify-center py-4 md:block md:px-7 lg:px-14">
                    <Link href={"/"}>
                        <Image src={Brand} alt="brand-logo" />
                    </Link>
                </nav>

                <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                    <HeroSubText
                        title="OTP Verification"
                        menu="Please provide the 6-digit security code sent to your e-mail address"
                    />

                    <div className="flex w-full max-w-md flex-col items-center px-2 pt-8 sm:px-4">
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={1}
                                    value={value}
                                    className="shadow border w-10 h-10 sm:w-12 sm:h-12 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                                    onChange={(e) => handleInputChange(index, e)}
                                    onKeyDown={(e) => {
                                        handleBackspace(index, e);
                                        handleKeyDown(e);
                                    }}
                                    ref={(el) => {
                                        if (el) {
                                            inputRefs.current[index] = el;
                                        }
                                    }}
                                />
                            ))}
                        </div>

                        <div className="flex w-full items-center justify-center mt-10">
                            <DefaultButton
                                type="submit"
                                className="rounded-lg w-full bg-[#FCDFD4] h-10 text-sm hover:bg-[#E84526] hover:text-white"
                                text={status === 'pending' ? 'loading...' : 'Verify'}
                                handleClick={() => handleVerify()}
                            />
                        </div>

                        <div className="flex items-center justify-center mt-4">
                            <nav className="flex gap-2">
                                <small className="text-base">Didn&apos;t get email?</small>
                                <small className="text-base">
                                    <button onClick={() => resendotp()} className="text-[#F25E26] text-sm">
                                        Click to resend
                                    </button>
                                </small>
                            </nav>
                        </div>

                        <div className="flex cursor-pointer items-center justify-center mt-4">
                            <nav onClick={() => router.back()} className="flex items-center gap-2">
                                <HiArrowLongLeft />
                                <small className="text-base">Back</small>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
