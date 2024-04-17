import walletImg from "../asset/image/wallet.png"
import Image from "next/image"

type title = {
    text: string
}
export const HIW = () => {

    const Title = ({ text }: title) => (
        <h3 className="font-bold text-xl text-[#F25E26] py-2">{text}</h3>

    )

    return (
        <>
            <div className="flex items-center">
                <div className="flex flex-col gap-4 ">
                    <div className="w-[50%]">
                        <Title text={"Ticket"} />
                        <p>Credit your wallet to buy your ticket. your ticket allows you to bid for any product on auction.</p>
                    </div>
                    <div className="w-[50%]">
                        <Title text={"Raffle Draw"} />
                        <p>After allotted time frame, our live raffle draw begins where you can win the product you have put in for.</p>
                    </div>
                    <div className="w-[50%]">
                        <Title text={"Win"} />
                        <p>During the live raffle draw, the winner gets announced and the item will be delivered to your door step.</p>
                    </div>
                </div>
                <div>
                    <Image src={walletImg} alt="img" />
                </div>
            </div>
        </>
    )
}