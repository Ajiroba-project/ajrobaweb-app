
import Image from "next/image"
import carousel from "../asset/image/carousel.png";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const Carousel = () =>{
    return (

        <>
        <Image src={carousel} alt="carousel"/>
        {/* <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }} 
        >
        {tools.map((val, key) => (
                                    <SwiperSlide key={key} className="cursor-pointer hover:text-2xl">
                                    
                                    </SwiperSlide>
                                ))}
     
        </Swiper> */}
        </>
    )
}