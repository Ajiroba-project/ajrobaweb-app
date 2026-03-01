import { redirect } from 'next/navigation'

/**
 * Redirect old URL /auction-wins to /raffledraw-wins
 */
export default function AuctionWinsRedirect() {
  redirect('/raffledraw-wins')
}
