import React from 'react'
import { AuctionWinCard } from './AuctionWinCard'
import { AuctionWinCardNewOpen } from './AuctionCardOpen'

type AuctionProps = {
  product: any[]
}

export const OpenAuction = ({ product }: AuctionProps) => {
  return (
    <div>
      <AuctionWinCardNewOpen product={product} />
    </div>
  )
}
