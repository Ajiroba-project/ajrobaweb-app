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
import Select from "../component/Select";
import { useRouter } from 'next/navigation'
import { useMutateData } from "@/hooks/useMutateData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {

    type dataProps = {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        referral?: string;
        address: string;
        state: string;
        lga: string;
        password: string;
        residential: string;
        gender: string;
    };
    const router = useRouter()

    const schema = yup.object().shape({
        first_name: yup.string().required("Full Name is required"),
        last_name: yup.string().required("Full Name is required"),
        email: yup
            .string()
            .matches(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
                "Valid email is required",
            )
            .required("Email is required"),
        phone: yup.string().required("Mobile number should be a string"),
        // referral: yup.string().required("referral should be a string"),
        address: yup.string().required("address should be a string"),
        state: yup.string().required("state should be a string"),
        lga: yup.string().required("lga should be a string"),
        password: yup
            .string()
            .required("Password is required")
            .min(6, "Can't be lesser than 6 digits"),
        residential: yup.string().required("residential should be a string"),
        gender: yup.string().required("Gender should be a string"),
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
        if (data.status === 201) {

            toast.success(`${data?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => router.push('/otpverification')

            })
            reset();

        } else if (data.status === 400 || data.status === 409) {
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
        "signup",
        handleSuccess,
        handleError,
    );


    const sumbitForm = (data: dataProps) => {
        // console.log(data, 'datatat')
        mutate({
            url: "/api/auth",
            payload: data
        });
    };


    return (
        <>
            <div className="px-4">
                <ToastContainer closeOnClick />
                <nav className="Brand-logo  p-6 lg:px-14 px-7 lg:block xl:block 2xl:block md:block   flex justify-center ">
                    <Link href={"/"}>
                        <Image src={Brand} alt="brand-logo" />
                    </Link>
                </nav>

                <AuthHero
                    title="Register"
                    menu="Start using our e-commerce for all your needs, buy a ticket and start winning through a raffle draw"
                />

                <div className=" flex justify-center mb-20 ">
                    <form onSubmit={handleSubmit(sumbitForm)}>
                        <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 2xl:grid-cols-2 grid-cols-1 gap-8 px-3 mt-12">
                            <div className="flex flex-col">
                                <Input
                                    label="First Name*"
                                    type="text"
                                    name="first_name"
                                    placeholder="Enter firstname"
                                    register={register}
                                    errors={errors.first_name}
                                />
                                <div className="text-xs text-red-700">
                                    {errors?.first_name?.message}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <Input
                                    label="Last Name*"
                                    type="text"
                                    name="last_name"
                                    placeholder="Enter lastname"
                                    register={register}
                                    errors={errors.first_name}
                                />
                                <div className="text-xs text-red-700">
                                    {errors?.last_name?.message}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <Input
                                    label="Email*"
                                    type="text"
                                    name="email"
                                    placeholder="Enter a valid email"
                                    register={register}
                                    errors={errors.email}
                                />
                                <div className="text-xs text-red-700">
                                    {errors?.email?.message}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <Input
                                    label="Phone Number*"
                                    type="text"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    register={register}
                                    errors={errors.phone}
                                />
                                <div className="text-xs text-red-700">
                                    {errors?.phone?.message}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <Input
                                    label=" Password*"
                                    type="text"
                                    name="password"
                                    placeholder="****"
                                    register={register}
                                    errors={errors.password}
                                />
                                <div className="text-xs text-red-700">
                                    {errors?.password?.message}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <Input
                                    label=" Referal code (Optional)"
                                    type="text"
                                    name="referral"
                                    placeholder="Referal code"
                                    register={register}
                                // errors={errors.referral}
                                />
                                <div className="text-xs text-red-700">


                                </div>
                            </div>

                            <div className="flex flex-col">
                                <Input
                                    label="Address"
                                    type="text"
                                    name="address"
                                    placeholder="Enter your Address"
                                    register={register}
                                    errors={errors.address}
                                />
                                <div className="text-xs text-red-700">
                                    {errors?.address?.message}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <Select
                                    label="State"
                                    name="state"
                                    options={[
                                        { value: "lagos", label: "Lagos" },
                                        { value: "abuja", label: "Abuja" },
                                    ]}
                                    register={register}
                                    errors={errors}
                                />
                            </div>

                            <div className="flex flex-col">
                                <Select
                                    label="(LGA)"
                                    name="lga"
                                    options={[{ value: "ikeja", label: "Ikeja" }]}
                                    register={register}
                                    errors={errors}
                                />
                            </div>

                            <div className="flex flex-col">
                                <Input
                                    label="  Residential Agency Number (Optional)"
                                    type="text"
                                    name="residential"
                                    placeholder="residential Number"
                                    register={register}
                                // errors={errors.referral}
                                />
                                <div className="text-xs text-red-700">
                                    {errors?.residential?.message}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="male"
                                        {...register("gender", { required: true })}
                                        value="true"
                                        className="mr-2 text-wdc-inactivebutton"
                                    />
                                    <label
                                        htmlFor="male"
                                        className="text-sm text-wdc-inactivebuttons"
                                    >
                                        Male
                                    </label>
                                </div>

                                <div className="flex items-center mb-0">
                                    <input
                                        type="radio"
                                        id="female"
                                        {...register("gender", { required: true })}
                                        value="false"
                                        className="mr-2 text-wdc-inactivebutton"
                                    />
                                    <label
                                        htmlFor="female"
                                        className="text-sm text-wdc-inactivebuttons"
                                    >
                                        Female
                                    </label>
                                </div>
                            </div>

                            <div></div>

                            <div className="text-xs text-red-700">
                                {errors?.gender?.message}
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-4">
                            <DefaultButton
                                type="submit"
                                className=" w-full bg-[#FCDFD4] h-10 text-sm"
                                text={status === 'pending' ? 'loading...' : "Create Account"}
                                handleClick={() => console.log("clcikeddd")}
                            />
                        </div>

                        <div className="flex justify-center items-center mt-4">
                            <input
                                type="checkbox"
                                id="agreement"
                                value="true"
                                className="mr-2 text-wdc-inactivebutton"
                            />
                            <span className="text-sm">
                                I agree with the{" "}
                                <small className="text-[#F25E26]"> Terms and Conditions</small>
                            </span>
                        </div>

                        <div className="flex justify-center items-center mt-4">
                            <small className="text-base">
                                Already have an account?
                                <span onClick={() => router.push('/signin')} className="text-[#F25E26] text-sm cursor-pointer "> Sign in</span>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Page;
