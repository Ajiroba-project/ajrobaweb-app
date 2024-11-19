import React from 'react'
import { AuctionWinCard } from './AuctionWinCard'
import { AuctionWinCardNew } from './AuctionCard'

type AuctionProps = {
  product: any[]
}

export const OpenAuction = ({product}:AuctionProps) => {
  return (
    <div>
      <AuctionWinCardNew product={product}/>
    </div>
  )
}
