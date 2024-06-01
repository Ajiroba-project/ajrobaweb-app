import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import RQProviders from '@/utils/provider'
import { Header } from '../component/Header'
import{Footer} from "../component/Footer"
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '900']
})

export const metadata: Metadata = {
  title: 'Ajiroba ',
  description: 'Your foremost consumer auction platform'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <RQProviders>
        <body className={`${poppins.className} `}>
            <header className='fixed w-full z-50'>
          <Header />
        </header>
          <main className='pt-[5vh]'>
              {children}
          </main>
        <Footer />
        </body>
      </RQProviders>
    </html>
  )
}
