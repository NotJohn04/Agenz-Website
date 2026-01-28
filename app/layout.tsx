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
  metadataBase: new URL("https://agenz.my"),
  title: {
    default: "Agenz.my | AI-Powered Marketing & Automation Agency",
    template: "%s | Agenz.my",
  },
  description:
    "Revolutionizing customer acquisition with AI. We build autonomous growth systems that acquire customers while you sleep. Based in Malaysia.",
  keywords: [
    "AI marketing",
    "automation agency",
    "digital marketing Malaysia",
    "AI chatbot",
    "lead generation",
    "CRM integration",
    "social media management",
    "website development Malaysia",
  ],
  authors: [{ name: "Agenz.my" }],
  creator: "Agenz.my",
  openGraph: {
    title: "Agenz.my | AI-Powered Marketing & Automation",
    description:
      "We engineer autonomous growth systems that acquire customers while you sleep.",
    url: "https://agenz.my",
    siteName: "Agenz.my",
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Agenz.my - AI-Powered Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agenz.my | AI-Powered Marketing & Automation",
    description:
      "We engineer autonomous growth systems that acquire customers while you sleep.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
