import type { Metadata, Viewport } from 'next'
import { Poppins, Inter, Nunito_Sans } from 'next/font/google'
import './globals.css'
import RQProviders from '@/utils/provider'
import { Providers } from './providers'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalLoadingOverlay } from './component/Card'
import Script from 'next/script'
// import { useExcludeHeader } from '@/hooks/useExcludeHeader'
// import { Header } from './component/Header'
// import { Footer } from './component/Footer'


// Other imports and code remain the same...

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '900'],
  display: "swap", // Optional: Ensure consistency across all fonts
  style: ['normal', 'italic'],
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '900'],
  display: "swap",
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '900'],
  display: "swap",
  style: ['normal', 'italic'],
});

// Ensures proper scaling and touch targets on phones and tablets
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#F25E26',
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajiroba.ng';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ajiroba – Your Foremost Consumer Raffle Platform',
    template: '%s | Ajiroba',
  },
  description:
    'Ajiroba is your foremost consumer raffle platform. Participate in raffles, auctions, recharge airtime and data, and win great prizes. Secure, transparent, and easy to use.',
  keywords: [
    'Ajiroba',
    'raffle',
    'raffle draw',
    'consumer raffle',
    'Nigeria raffle',
    'auction',
    'recharge',
    'airtime',
    'data',
    'win prizes',
  ],
  authors: [{ name: 'Ajiroba', url: siteUrl }],
  creator: 'Ajiroba Technologies Ltd',
  publisher: 'Ajiroba Technologies Ltd',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: siteUrl,
    siteName: 'Ajiroba',
    title: 'Ajiroba – Your Foremost Consumer Raffle Platform',
    description:
      'Participate in raffles, auctions, recharge airtime and data, and win great prizes. Secure, transparent, and easy to use.',
    images: [
      {
        url: '/ajirobalogo.png',
        width: 1200,
        height: 630,
        alt: 'Ajiroba – Your Foremost Consumer Raffle Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajiroba – Your Foremost Consumer Raffle Platform',
    description:
      'Participate in raffles, auctions, recharge, and win great prizes. Secure and easy to use.',
    images: ['/ajirobalogo.png'],
  },
  formatDetection: { telephone: true, email: true },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className="light bg-white h-full">
      <RQProviders>
        <body className={` ${poppins.className} ${nunitoSans.className} ${inter.className} `} >
          <ToastContainer closeOnClick limit={1} />
          <Providers>
            {children}
            <GlobalLoadingOverlay />
            {/* Tawk chat: load after page is idle so mobile and low-network users get faster first paint */}
            {/* <Script id="tawk-to" strategy="lazyOnload">
              {`
                var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
                (function(){
                  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                  s1.async=true;
                  s1.src='https://embed.tawk.to/691531b9a714c8195ae9f22c/1j9tckfh1';
                  s1.charset='UTF-8';
                  s1.setAttribute('crossorigin','*');
                  s0.parentNode.insertBefore(s1,s0);
                })();
              `}
            </Script> */}
          </Providers>
        </body>
      </RQProviders>
    </html>
  );
}








