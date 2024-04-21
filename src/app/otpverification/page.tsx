"use client";
import Link from "next/link";
import Brand from "../asset/logo.svg";
import Image from "next/image";
import AuthHero from "../component/AuthHero";
import { DefaultButton } from "../component/Button";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

function Page() {
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const handleInputChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newOtp = [...otp];
        newOtp[index] = event.target.value.slice(0, 1);
        setOtp(newOtp);
        if (index < 5 && newOtp[index].length === 1) {
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

    const handleVerify = () => {
        console.log(otp?.join(""), "sortedotp");
    };

    return (
        <>
            <div className="px-8">
                <nav className="Brand-logo  p-6 lg:px-14 px-7 lg:block xl:block 2xl:block md:block   flex justify-center ">
                    <Link href={"/"}>
                        <Image src={Brand} alt="brand-logo" />
                    </Link>
                </nav>

                <AuthHero
                    title="Register"
                    menu="Start using our e-commerce for all your needs, buy a ticket and start winning through a raffle draw"
                />

                <div className=" flex justify-center mb-20 mt-12 ">
                    <div className="flex flex-col">
                        <div className="flex  space-x-2 gap-4 items-center justify-center flex-wrap">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={value}
                                    className=" shadow border w-12 border-gray-300 px-2 h-10 rounded-md mx-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => handleInputChange(index, e)}
                                    onKeyDown={(e) => handleBackspace(index, e)}
                                    ref={(el) => {
                                        if (el) {
                                            inputRefs.current[index] = el;
                                        }
                                    }}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center items-center mt-12">
                            <DefaultButton
                                type="submit"
                                className=" w-full bg-[#FCDFD4] h-10 text-sm"
                                text="Verify"
                                handleClick={() => handleVerify()}
                            />
                        </div>

                        <div className="flex justify-center items-center mt-4">
                            <nav className="flex gap-2">
                                <small className="text-base">Didn’t get email?</small>
                                <small className="text-base">
                                    <Link href={"/"} className="text-[#F25E26] text-sm">
                                        Click to resend
                                    </Link>
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
