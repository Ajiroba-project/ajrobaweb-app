import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import RQProviders from "@/utils/provider";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "900"], });

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
    <html lang="en">
      <body className={poppins.className}>
        <RQProviders>
          {children}
        </RQProviders>
      </body>

    </html>
  );
}
