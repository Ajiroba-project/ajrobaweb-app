import Marquee from 'react-fast-marquee'

type Marqueeprop =  {
    info: string[]
}

export const AuctionMarquee = ({info}:Marqueeprop)=>{
    return (
        <>
        <section>
             <Marquee pauseOnHover={true} gradient={false}>
                {info.map((val, index) => (
                <p key={index} className="mx-8">{val} &nbsp;&nbsp;&nbsp;</p>
                ))}
             </Marquee>
        </section>
        
        </>
    )
}