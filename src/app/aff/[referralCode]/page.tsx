import ReferralRedirectClient from './ReferralRedirectClient'

type PageProps = {
  params: Promise<{ referralCode: string }>
}

/** Server Component: await `params` here (Next.js 15+). Client code receives plain strings. */
export default async function ReferralRedirectPage({ params }: PageProps) {
  const { referralCode } = await params
  return <ReferralRedirectClient referralCode={referralCode ?? ''} />
}
