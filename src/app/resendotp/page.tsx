"use client";
import Link from "next/link";
import Brand from "../asset/logo.svg";
import passwordlock from "../asset/passwordlock.svg";
import Image from "next/image";
import { HeroSubText } from "../component/AuthHero";
import { DefaultButton } from "../component/Button";
import { useRouter } from "next/navigation";
import Input from "../component/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutateData } from "@/hooks/useMutateData";
import { toast } from "react-toastify";

function Page() {
    type dataProps = {
        email: string;
    };

    const router = useRouter();
    const schema = yup.object().shape({
        email: yup
            .string()
            .matches(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
                "Valid email is required",
            )
            .required("Email is required"),
    });

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
        resolver: yupResolver(schema),
    });

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
                onClose: () => router.push('/otpverification')
            })
            reset()
        } else if (data.status === 403 || data.status === 404) {
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
            reset()
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
            reset();
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
        reset();
    };

    const { mutate, status } = useMutateData(
        "resendotp",
        handleSuccess,
        handleError,
    );

    const sumbitForm = async (data: dataProps) => {
        mutate({
            url: "/api/resendotp",
            payload: data
        });
    };

    return (
        <div className="px-4 content-container">
            <nav className="flex justify-center py-4 md:block md:px-7 lg:px-14">
                <Link href={"/"}>
                    <Image src={Brand} alt="brand-logo" />
                </Link>
            </nav>

            <div className="flex flex-col items-center py-8 sm:py-12">
                <HeroSubText
                    title="Resend OTP"
                    menu="No worries! An OTP will be sent to reset your password"
                />

                <section className="flex items-center justify-center mb-8 mt-8">
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
                        className="w-full max-w-md px-2 py-6 sm:px-4"
                    >
                        <div className="mt-4 grid grid-cols-1 gap-6">
                            <div className="flex w-full flex-col">
                                <Input
                                    label="Email"
                                    type="text"
                                    name="email"
                                    placeholder="Enter Email Address"
                                    register={register}
                                    errors={errors.email}
                                />
                                <div className="text-xs text-red-700">
                                    {errors?.email?.message}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex w-full items-center justify-center">
                            <DefaultButton
                                type="submit"
                                className="h-10 w-full bg-[#FCDFD4] text-sm hover:bg-[#E84526] hover:text-white"
                                text={status === 'pending' ? 'loading...' : "Proceed"}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Page;
