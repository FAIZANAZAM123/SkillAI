import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ICT Trading Challenge | Turn Knowledge Into A Process You Trust",
  description:
    "Join the 5-Day Live ICT Trading Challenge. Built by a trader who spent 9 years mastering ICT, left his 9-5, and now teaches the exact framework he uses.",
  keywords: "ICT trading, forex, futures, trading challenge, market structure, liquidity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: "#050505" }}
      >
        {children}
      </body>
    </html>
  );
}
