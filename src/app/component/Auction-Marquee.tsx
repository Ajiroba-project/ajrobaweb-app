/* eslint-disable react/display-name */
import Marquee from 'react-fast-marquee'
import React, { memo } from 'react';
import { MarqueeSkeleton } from './LoadingSkeleton';

type Marqueeprop =  {
    info: string[]
    isLoading?: boolean
}

// export const AuctionMarquee = ({info}:Marqueeprop)=>{
//     return (
//         <>
//         <section>
//              <Marquee gradient={false}>
//                 {info?.map((val, index) => (
//                 <p key={index} className="mx-8">{val} &nbsp;&nbsp;&nbsp;</p>
//                 ))}
//              </Marquee>
//         </section>

//         </>
//         //  pauseOnHover={true}
//     )
// }


export const AuctionMarquee = memo(({ info, isLoading = false }:Marqueeprop) => {

      if (isLoading) {
    return <MarqueeSkeleton />
  }

      if (!info) {
    return null;
  }

  return (
    <section>
      <Marquee pauseOnHover={true} gradient={false}>
        {info.map((val: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
          <p key={index} className="mx-8">{val} &nbsp;&nbsp;&nbsp;</p>
        ))}
      </Marquee>
    </section>
  );
});

