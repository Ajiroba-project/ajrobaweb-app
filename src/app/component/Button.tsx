
type ButtonProps={
    text:string,
    handleClick: ()=>{}
}


export const DefaultButton =({text, handleClick}:ButtonProps)=>{
    return (
        <>
        <button className="" onClick={handleClick}>
            {text}
        </button>
        
        </>
    )
}
export const PrimaryButton =({text, handleClick}:ButtonProps)=>{
    return (
        <>
        <button className="bg-[#FCDFD4]" onClick={handleClick}>
            {text}
        </button>
        </>
    )
}

export const SecondaryButton =({text, handleClick}:ButtonProps)=>{
    return (
        <>
        <button className="bg-transparent" onClick={handleClick}>
            {text}
        </button>
        
        </>
    )
}