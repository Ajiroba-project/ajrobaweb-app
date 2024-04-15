
import Image from "next/image"
import carousel from "../asset/image/carousel.png"
export const Carousel = () =>{
    return (

        <>
        <section>
            <Image src={carousel} alt={"carousel"}/>
        </section>
        
        </>
    )
}