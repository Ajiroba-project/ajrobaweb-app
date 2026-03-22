"use client";
import Link from "next/link";
import Brand from "../asset/logo.svg";
import Verify_icon from "../asset/verify.svg";
import Image from "next/image";
import { HeroSubText } from "../component/AuthHero";
import { DefaultButton } from "../component/Button";
import { useRouter } from "next/navigation";

function Page() {
    const router = useRouter();

    const handleVerify = () => {
        router.push("/signin");
    };

    return (
        <>
            <div className="px-4 content-container">
                <nav className="Brand-logo flex justify-center py-4 md:block md:px-7 lg:px-14">
                    <Link href={"/"}>
                        <Image src={Brand} alt="brand-logo" />
                    </Link>
                </nav>

                <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                    <section className="flex justify-center items-center mb-4 mt-8">
                        <Image src={Verify_icon} alt="brand-logo" width={60} height={60} />
                    </section>

                    <HeroSubText
                        title="Password reset successful"
                        menu="You can login into your account with your new password"
                    />

                    <div className="flex w-full max-w-md flex-col items-center px-2 pt-4 sm:px-4">
                        <DefaultButton
                            type="submit"
                            className="rounded-lg w-full bg-[#FCDFD4] h-10 text-sm"
                            text="Continue to sign in"
                            handleClick={() => handleVerify()}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
