import React from 'react'
import { AuctionWinCard } from './AuctionWinCard' 

type AuctionProps = {
  product: any[] 
}

export const OpenAuction = ({product}:AuctionProps) => {
  return (
    <div>
      <AuctionWinCard product={product}/>
    </div>
  )
}
