import type { Metadata } from 'next'
import { Poppins, Inter, Nunito_Sans } from 'next/font/google'
import './globals.css'
import RQProviders from '@/utils/provider'
import { Providers } from './providers'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalLoadingOverlay } from './component/Card'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className="light bg-white h-full">
      <RQProviders>
        <body className={`${poppins.className} ${nunitoSans.className} ${inter.className} `} >
          <ToastContainer closeOnClick limit={1} />
          <Providers>
            {children}
            <GlobalLoadingOverlay />
          </Providers>
        </body>
      </RQProviders>
    </html>
  );
}

