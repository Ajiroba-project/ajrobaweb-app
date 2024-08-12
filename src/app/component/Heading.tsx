
type titleProp = {
    title: string
}
export const Heading = ({ title }: titleProp) => {
    return (
        <>
            <div className="">
                <p className="text-[#E84526] text-xl lg:text-2xl font-semibold font-Poppins">{title}</p>
            </div>
        </>
    )
}


export const HeadingText =({title}:titleProp)=>{
    return (
        <>
        <h1 className="font-semibold text-2xl font-Poppins">{title}</h1>

        </>
    )
}