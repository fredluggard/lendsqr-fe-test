import type { Metadata } from "next";
import "../styles/globals.scss";

import { Work_Sans, Roboto } from "next/font/google";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-work-sans",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Lendsqr - Loan Management System",
  description:
    "A comprehensive loan management system for financial institutions.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
