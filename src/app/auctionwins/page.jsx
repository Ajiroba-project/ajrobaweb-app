import { redirect } from 'next/navigation'

/**
 * Redirect old URL /auctionwins?orderId=id to /raffledrawwins?orderId=id
 */
export default function AuctionwinsRedirect({ searchParams }) {
  const orderId = searchParams?.orderId ?? ''
  const query = orderId ? `?orderId=${orderId}` : ''
  redirect(`/raffledrawwins${query}`)
}
