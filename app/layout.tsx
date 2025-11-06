import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My NFT Gallery - Web3 NFT Collection",
  description: "Explore, collect, and mint NFTs on the blockchain. Built with Next.js 15, TypeScript, and wagmi.",
  keywords: ["NFT", "Web3", "Ethereum", "Blockchain", "Gallery", "Crypto", "Digital Art"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "My NFT Gallery",
    description: "Explore, collect, and mint NFTs on the blockchain",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}