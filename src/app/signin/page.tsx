"use client";
import Link from "next/link";
import Brand from "../asset/logo.svg";
import Image from "next/image";
import AuthHero from "../component/AuthHero";
import { DefaultButton } from "../component/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../component/Input";
import { useRouter } from 'next/navigation'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { useMutateData } from "@/hooks/useMutateData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
    type dataProps = {

        email: string;

        password: string;

    };

    const router = useRouter()

    const schema = yup.object().shape({


        email: yup
            .string()
            .matches(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
                "Valid email is required",
            )
            .required("Email is required"),


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


    const handleSuccess = (data: any) => {

        console.log(data, 'datatta')


        if (data.status === 200) {

            toast.success(`${data?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => router.push('/')

            })
            reset();

        } else if (data.status === 403 || data.status === 404) {
            toast.error(`${data?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
            reset();
        } else {
            toast.error(`${'An Error Occured'}`, {
                position: "top-right",
                autoClose: 5000,
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
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        reset();

    };

    const { data, error, isError, isSuccess, mutate, status } = useMutateData(
        "signin",
        handleSuccess,
        handleError,
    );


    const sumbitForm = async (data: dataProps) => {
        mutate({
            url: "/api/signin",
            payload: data
        });
    };

    return (
        <>
            <div className="px-4 ">
                <ToastContainer closeOnClick />
                <nav className="Brand-logo  p-6 lg:px-14 px-7 lg:block xl:block 2xl:block md:block   flex justify-center ">
                    <Link href={"/"}>
                        <Image src={Brand} alt="brand-logo" />
                    </Link>
                </nav>

                <AuthHero
                    title="Welcome Back"
                    menu="Sign in to shop on Ajiroba"
                />

                <div className=" flex justify-center mb-20 ">
                    <form onSubmit={handleSubmit(sumbitForm)}>
                        <div className="grid xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 2xl:grid-cols-1 grid-cols-1 gap-8 px-3 mt-12">


                            <div className="flex flex-col">
                                <Input
                                    label="Email"
                                    type="text"
                                    name="email"
                                    placeholder="Email Address/Phone Number*"
                                    register={register}
                                    errors={errors.email}
                                />
                                <div className="text-xs text-red-700">
                                    {errors?.email?.message}
                                </div>
                            </div>


                            <div className="flex flex-col">
                                <Input
                                    label=" Password"
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
                            </div>




                        </div>
                        <div className="flex justify-center items-center mt-4">
                            <DefaultButton
                                type="submit"
                                className=" w-full bg-[#FCDFD4] h-10 text-sm"
                                text={status === 'pending' ? 'loading...' : "Sign in"}
                                handleClick={() => console.log("")}
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 justify-between items-center mt-4">
                            <div>
                                <input
                                    type="checkbox"
                                    id="agreement"
                                    value="true"
                                    className="mr-2 text-wdc-inactivebutton"
                                />
                                <span className="text-sm">
                                    Remember me

                                </span>
                            </div>
                            <div onClick={() => router.push('forgot-password')} >
                                <span className="cursor-pointer" >Forgot password?</span>
                            </div>
                        </div>

                        <div className="flex justify-center items-center mt-4">
                            <small className="text-base">
                                Don`t have an account?
                                <span onClick={() => router.push('/signup')} className="text-[#F25E26] text-sm  cursor-pointer "> Sign up</span>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Page;
