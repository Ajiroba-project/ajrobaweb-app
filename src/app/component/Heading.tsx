
type titleProp = {
    title: string
}
export const Heading = ({ title }: titleProp) => {
    return (
        <>
            <div className="">
                <p className="text-[#F25E26] text-xl lg:text-2xl font-bold">{title}</p>
            </div>
        </>
    )
}


export const HeadingText =({title}:titleProp)=>{
    return (
        <>
        <h1 className="font-bold text-2xl">{title}</h1>
        
        </>
    )
}