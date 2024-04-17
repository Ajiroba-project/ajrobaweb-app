
type titleProp ={
    title:string
}
export const SubHeading =({title }:titleProp)=>{
    return (
        <>
        <div className="w-fit flex flex-col gap-2">
            <p className="font-semibold text-sm mx-2">{title}</p>
            <div className=" bg-[#F25E26]  h-1"></div>
            
        </div>
        </>
    )
}