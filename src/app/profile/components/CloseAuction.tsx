import React from 'react'
import { AuctionWinCard } from "./AuctionWinCard"
import { AuctionWinCardClosed, } from './AuctionCard'

type AuctionProps = {
  product: any[]
}

export const CloseAuction = ({ product }: AuctionProps) => {

  return (
    <div><AuctionWinCardClosed product={product} /></div>

  )
}
