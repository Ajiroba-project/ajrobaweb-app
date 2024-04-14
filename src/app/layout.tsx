import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import {Header} from "./component/Header";
import {Footer} from "./component/Footer"
import "./globals.css";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "900"], });

export const metadata: Metadata = {
  title: "Ajirobi ",
  description: "Your foremost consumer auction platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header/>
        {children}
        <Footer/>
        </body>
      
    </html>
  );
}
