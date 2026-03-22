"use client";
import Link from "next/link";
import Brand from "../asset/logo.svg";
import Image from "next/image";
import { HeroSubText } from "../component/AuthHero";
import { DefaultButton } from "../component/Button";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useMutateData } from "@/hooks/useMutateData";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Page() {



    const schema = yup.object().shape({
        otp: yup
            .array()
            .of(yup.string().length(1, "OTP must be exactly 1 character").matches(/\d/, "OTP must be a digit"))
            .required("All OTP fields are required"),
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            otp: ["", "", "", "", "", ""]
        }
    });


    const router = useRouter();
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

    useEffect(() => {
        // Focus the first input field when component mounts
        inputRefs.current[0]?.focus();
    }, []);

    const handleInputChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const input = event.target.value;
        
        // Only allow numbers (0-9)
        const numericValue = input.replace(/[^0-9]/g, '');
        
        // Take only the first character if multiple characters are entered
        const value = numericValue.slice(0, 1);
        
        // Update the form value
        setValue(`otp.${index}`, value);
        
        // Update the input field value to show only the numeric character
        event.target.value = value;

        // Move to next input if a valid number is entered
        if (index < 5 && value.length === 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        const isNumber = /^[0-9]$/.test(event.key);
        const isAllowedKey = allowedKeys.includes(event.key);
        if (!isNumber && !isAllowedKey) {
            event.preventDefault();
        }
        if (index > 0 && event.key === 'Backspace' && !event.currentTarget.value) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (
        index: number,
        event: React.ClipboardEvent<HTMLInputElement>,
    ) => {
        event.preventDefault();
        const pastedText = event.clipboardData.getData('text') || '';
        const digitsOnly = pastedText.replace(/\D/g, '');
        if (!digitsOnly) return;

        const maxLength = 6;
        const remainingSlots = maxLength - index;
        const toFill = digitsOnly.slice(0, remainingSlots);

        for (let offset = 0; offset < toFill.length; offset++) {
            const char = toFill[offset];
            const targetIndex = index + offset;
            setValue(`otp.${targetIndex}`, char);
            const inputEl = inputRefs.current[targetIndex];
            if (inputEl) {
                inputEl.value = char;
            }
        }

        const nextFocusIndex = Math.min(index + toFill.length, maxLength - 1);
        inputRefs.current[nextFocusIndex]?.focus();
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
                onClose: () => router.push('/verification')

            })


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

        } else {
            toast.error(`${'An Error Occurred'}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
    };

    const handleError = (error: any) => {
        toast.error(`${'An Error Occurred'}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });

    };

    const { mutate, status } = useMutateData(
        "signup",
        handleSuccess,
        handleError,
    );

    const handleVerify = () => {

        const Payload = {
            otp: inputRefs.current.map(el => el?.value).join("")
        }


        mutate({
            url: "/api/verifyaccount",
            payload: Payload
        });



    };

    const resendotp = () => {

        router.push('/resendotp')

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
                        menu="Please provide the 6-digit security code sents to your e-mail address"
                    />

                    <div className="flex w-full max-w-md flex-col items-center px-2 pt-8 sm:px-4">
                        <form className="flex w-full flex-col items-center" onSubmit={handleSubmit(handleVerify)}>
                            <div className="flex items-center justify-center gap-2 sm:gap-3">
                                {[...Array(6)].map((_, index) => (
                                    <input
                                        key={index}
                                        type="tel"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={1}
                                        className="shadow border w-10 h-10 sm:w-12 sm:h-12 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        onPaste={(e) => handlePaste(index, e)}
                                        {...register(`otp.${index}`)}
                                        ref={(el) => {
                                            if (el) {
                                                inputRefs.current[index] = el;
                                            }
                                        }}
                                        onChange={(e) => handleInputChange(index, e)}
                                    />
                                ))}
                            </div>
                            {errors.otp && <div className="text-red-500">{errors.otp.message}</div>}
                            <div className="flex w-full items-center justify-center mt-10">
                                <DefaultButton type="submit"
                                    className="w-full bg-[#FCDFD4] h-10 text-sm hover:bg-[#E84526] hover:text-white"
                                    text={status === 'pending' ? 'loading...' : 'Verify'}
                                />
                            </div>
                        </form>

                        <div className="flex justify-center items-center mt-4">
                            <nav className="flex gap-2">
                                <small className="text-base">Didn&apos;t get email?</small>
                                <small className="text-base">
                                    <button onClick={() => resendotp()} className="text-[#F25E26] text-sm">
                                        Click to resend
                                    </button>
                                </small>
                            </nav>
                        </div>

                        <div className="flex cursor-pointer justify-center items-center mt-4">
                            <nav onClick={() => router.back()} className="flex items-center gap-2">
                                <HiArrowLongLeft />
                                <small className="text-base">
                                    Back
                                </small>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
