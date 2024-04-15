import {SideMenu} from "./SideMenu";
import {Carousel} from "./Carousel"

export const Hero =()=>{
    return (
        <>
            <section className="flex  bg-[#F6F6F6]">
            
            <div className="p-12">
                <SideMenu/>
            </div>
            <div className="flex-auto">
                <Carousel/>
            </div>

            </section>
        </>
    )
}