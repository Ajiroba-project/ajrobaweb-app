
type TitleProps ={
    title:string
}

export const Title =({title}:TitleProps)=>{
    return (
        <>
        <div className="container py-4 mb-8">
                   <p className="text-center text-base 2xl:text-[20px] lg:text-[20px] md:text-[20px] xl:text-[20px] font-semibold font-Poppins">{title}</p>
                </div>
        </>
    )
}