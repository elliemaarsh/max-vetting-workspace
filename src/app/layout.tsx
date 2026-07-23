import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

/**
 * Inter covers body + display until Satoshi files are available.
 * next/font sets --font-inter on the element that receives `inter.variable`.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MAX — AI Vetting Workspace",
  description: "Internal operations platform for influencer brand-safety vetting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
