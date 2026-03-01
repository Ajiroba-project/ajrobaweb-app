import { redirect } from 'next/navigation'

/**
 * Redirect old URL /auction/productdetails/[id] to /raffledraw/productdetails/[id]
 */
export default function AuctionProductDetailsRedirect({
  params
}: {
  params: { slug: string }
}) {
  redirect(`/raffledraw/productdetails/${params.slug}`)
}
