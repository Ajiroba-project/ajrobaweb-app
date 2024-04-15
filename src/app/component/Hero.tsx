import {SideMenu} from "./SideMenu";
import {Carousel} from "./Carousel"

export const Hero =()=>{
    return (
        <>
            <section className="flex  h-fit bg-[#F6F6F6]">
            
            <div className=" p-12">
                <SideMenu/>
            </div>
            <div className="flex-1">
                <Carousel/>
            </div>

            </section>
        </>
    )
}