
import type { Metadata } from 'next'
import { Poppins, Inter, Nunito_Sans } from 'next/font/google'
import './globals.css'
import RQProviders from '@/utils/provider'
import { Providers } from './providers'
// import { useExcludeHeader } from '@/hooks/useExcludeHeader'
// import { Header } from './component/Header'
// import { Footer } from './component/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '900'],

})

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '900'],
   display: "swap",
})



const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '900'],
   display: "swap",
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

        <body className={`${poppins.className} ${nunito.className} ${inter.className}`}>
          <Providers>
            {children}
          </Providers>
        </body>

      </RQProviders>
      {/* footer */}


    </html>
  );
}
