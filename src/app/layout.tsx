
import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'
import RQProviders from '@/utils/provider'
// import { useExcludeHeader } from '@/hooks/useExcludeHeader'
// import { Header } from './component/Header'
// import { Footer } from './component/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '900']
})


const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '900']
})

export const metadata: Metadata = {
  title: "Ajiroba ",
  description: "Your foremost consumer auction platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang='en'>
      <RQProviders>
        {/* header */}
        <body className={`${poppins.className} ${inter.className}`}>{children}</body>
      </RQProviders>
      {/* footer */}

    </html>
  );
}
