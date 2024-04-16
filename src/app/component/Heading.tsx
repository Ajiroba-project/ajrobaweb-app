
type titleProp ={
    title:string
}
export const Heading =({title }:titleProp)=>{
    return (
        <>
        <div className="">
            <p className="text-[#F25E26] text-2xl font-">{title}</p>
        </div>
        </>
    )
}