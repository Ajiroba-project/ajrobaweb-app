
type ButtonProps = {
    text: string,
    handleClick: () => void;
    className: string;
    type: "submit" | "reset" | "button" | undefined
}


export const DefaultButton = ({ text, type, handleClick, className }: ButtonProps) => {
    return (
        <>
            <button className={className} type={type} onClick={handleClick}>
                {text}
            </button>

        </>
    )
}
export const PrimaryButton = ({ text, handleClick }: ButtonProps) => {
    return (
        <>
            <button className="bg-[#FCDFD4]" onClick={handleClick}>
                {text}
            </button>
        </>
    )
}

export const SecondaryButton = ({ text, handleClick }: ButtonProps) => {
    return (
        <>
            <button className="bg-transparent" onClick={handleClick}>
                {text}
            </button>

        </>
    )
}