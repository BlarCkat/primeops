import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import React from "react";
// import { AuthProvider } from "@/contexts/Auth.context";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: "--font-instrumentSans"
})

export const metadata: Metadata = {
  title: "Financial Literacy - Guli",
  description: "Bridging the literacy gap for the young Ghanaian",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable}`}
      >
        {/* <AuthProvider> */}
        {children}
        {/* </AuthProvider> */}
        <Analytics/>
      </body>
    </html>
  );
}


