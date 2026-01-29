import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agenz.my"),
  title: {
    default: "AGENZ.MY | AI-Powered Marketing & Automation Agency",
    template: "%s | AGENZ.MY",
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
    "AGENZ.MY",
  ],
  authors: [{ name: "AGENZ.MY" }],
  creator: "AGENZ.MY",
  openGraph: {
    title: "AGENZ.MY | AI-Powered Marketing & Automation",
    description:
      "We engineer autonomous growth systems that acquire customers while you sleep.",
    url: "https://agenz.my",
    siteName: "AGENZ.MY",
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AGENZ.MY - AI-Powered Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AGENZ.MY | AI-Powered Marketing & Automation",
    description:
      "We engineer autonomous growth systems that acquire customers while you sleep.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
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
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Agenz.my",
              url: "https://www.agenz.my",
              logo: "https://www.agenz.my/images/logo3.png",
              sameAs: [
                "https://www.instagram.com/agenz_my/",
                "https://www.facebook.com/agenz.my",
                "https://www.tiktok.com/@agenz.my",
                "https://www.linkedin.com/company/agenz-my",
              ],
            }),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Agenz.my",
              url: "https://www.agenz.my",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.agenz.my/?s={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${poppins.variable} font-sans antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
