
type TitleProps ={
    title:string
}

export const Title =({title}:TitleProps)=>{
    return (
        <>
        <div className="container py-4 mb-8">
          <p className="text-center  2xl:text-[20px] lg:text-[20px] md:text-[20px] xl:text-[20px]  font-Poppins text-sm text-[#504D4D] foont-extrabold">{title}</p>
        </div>
        </>
    )
}