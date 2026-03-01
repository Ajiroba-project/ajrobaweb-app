import React from 'react'
import { PastAuctionCard } from './PastAuctionCard'

type AuctionProps = {
  product: any[]
}

export const PastAuction = ({ product }: AuctionProps) => {

  return (
    <div><PastAuctionCard product={product} /></div>

  )
}
