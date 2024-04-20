import Link from "next/link";
import Brand from '../asset/logo.svg'
import Image from "next/image";

function page() {
    return (
        <>
            <div>


                <nav className='Brand-logo  p-6 lg:px-14 px-7 lg:block xl:block 2xl:block md:block   flex justify-center '>
                    <Link href={"/"}>
                        <Image src={Brand} alt='brand-logo' />
                    </Link>
                </nav>


            </div>
        </>
    );
}

export default page;