"use client";
import Link from "next/link";
import Brand from "../asset/logo.svg";
import passwordlock from "../asset/passwordlock.svg";
import Image from "next/image";
import { HeroSubText } from "../component/AuthHero";
import { DefaultButton } from "../component/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useMutateData } from "@/hooks/usePutMutateData";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { userOTPStore } from '@/store/store'

function Page() {
    type dataProps = {
        password: string
        c_password: string
        otp?: string
    };

    const router = useRouter();

    const { user_otp } = userOTPStore(state => ({
        user_otp: state.user_otp
    }));

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const schema = yup.object().shape({
        password: yup
            .string()
            .required("Password is required")
            .min(6, "Can't be lesser than 6 digits"),
        c_password: yup
            .string().oneOf([yup.ref('password')], 'Passwords must match')
            .required("Password is required"),
    });

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
        resolver: yupResolver(schema),
        defaultValues: {
            password: "",
            c_password: "",
        },
    });

    const handleSuccess = (data: any) => {
        if (data.data.status === 201 || data.data.status === 'success') {
            toast.success(`${data?.data?.message}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => router.push('/signin')
            })
            reset();
        } else if (data.data.status === 400 || data.data.status === 409) {
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
    };

    const { mutate, status } = useMutateData(
        "signup",
        handleSuccess,
        handleError,
    );

    const sumbitForm = async (data: dataProps) => {
        const Payload = {
            password: data.password,
            otp: user_otp
        }
        mutate({
            url: "/api/newpass",
            payload: Payload,
        });
    };

    return (
        <div className="px-4 content-container">
            <nav className="flex justify-center py-4 md:block md:px-7 lg:px-14">
                <Link href={"/"}>
                    <Image src={Brand} alt="brand-logo" />
                </Link>
            </nav>

            <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                <HeroSubText
                    title="Set new password"
                    menu="Fill in the details with your preferred new password"
                />

                <section className="flex items-center justify-center mb-6 mt-6">
                    <Image
                        src={passwordlock}
                        alt="password-logo"
                        width={60}
                        height={60}
                    />
                </section>

                <div className="flex w-full justify-center">
                    <form
                        onSubmit={handleSubmit(sumbitForm)}
                        className="w-full max-w-md px-2 py-4 sm:px-4"
                    >
                        <div className="grid grid-cols-1 gap-6">
                            <div className="flex flex-col">
                                <label className="text-sm" htmlFor="password">
                                    New Password
                                </label>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                {...field}
                                                placeholder="*********"
                                                className="text-sm w-full h-auto p-2.5 pr-10 border rounded-lg font-Inter font-normal"
                                            />
                                            <button
                                                type="button"
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                onClick={() => setShowPassword(prev => !prev)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                                            >
                                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                            </button>
                                        </div>
                                    )}
                                />
                                <small>Minimum of 6 characters</small>
                                <div className="text-xs text-red-700">
                                    {errors?.password?.message}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm" htmlFor="c_password">
                                    Confirm Password
                                </label>
                                <Controller
                                    name="c_password"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                {...field}
                                                placeholder="*********"
                                                className="text-sm w-full h-auto p-2.5 pr-10 border rounded-lg font-Inter font-normal"
                                            />
                                            <button
                                                type="button"
                                                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                                onClick={() => setShowConfirmPassword(prev => !prev)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                                            >
                                                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                            </button>
                                        </div>
                                    )}
                                />
                                <small>Minimum of 6 characters</small>
                                <div className="text-xs text-red-700">
                                    {errors?.c_password?.message}
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-center mt-6">
                            <DefaultButton
                                type="submit"
                                className="rounded-lg w-full bg-[#FCDFD4] h-10 text-sm hover:bg-[#E84526] hover:text-white"
                                text={status === 'pending' ? 'loading...' : 'Reset Password'}
                            />
                        </div>
                    </form>
                </div>

                <div className="flex cursor-pointer items-center justify-center mt-4">
                    <nav onClick={() => router.push('/signin')} className="flex items-center gap-2">
                        <HiArrowLongLeft />
                        <small className="text-base">Back to login</small>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Page;
