/**
 * Get the current base URL dynamically based on the environment
 * Works for both client-side and server-side rendering
 */
export function getBaseUrl(): string {
  // Check if we're on the client side
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // Server-side fallback
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // Default fallback for local development
  return 'http://localhost:3000';
}

/**
 * Generate a referral link with the current base URL
 */
export function generateReferralLink(referralCode: string): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/aff/${referralCode}`;
}
