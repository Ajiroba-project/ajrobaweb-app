import type { Metadata } from 'next'
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
            {/* Tawk chat loads its own fixed-position widget; className on Script has no layout effect.
                To align the widget with page content on wide screens, use the CSS in globals.css for #tawk-bubble-container. */}
            <Script id="tawk-to">
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
            </Script>
          </Providers>
        </body>
      </RQProviders>
    </html>
  );
}








