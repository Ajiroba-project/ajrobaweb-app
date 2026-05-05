import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset wallet PIN",
  description: "Set a new wallet PIN using the link from your email.",
  robots: { index: false, follow: false },
};

export default function ResetPinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
