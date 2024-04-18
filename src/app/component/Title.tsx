
type TitleProps ={
    title:string
}

export const Title =({title}:TitleProps)=>{
    return (
        <>
        <div className="container py-4 mb-8">
                   <p className="text-center text-2xl font-bold">{title}</p>
                </div>
        </>
    )
}