import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const siteUrl = "https://francescodelmonaco.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Francesco Delmonaco - Sviluppatore Web Full Stack",
    template: "%s | Francesco Delmonaco"
  },
  description: "Sviluppatore Web Full Stack a Brescia, specializzato in React.js, Next.js e Supabase. Portfolio con progetti innovativi e skills moderne.",
  keywords: [
    "Francesco Delmonaco",
    "Sviluppatore Web",
    "Full Stack Developer",
    "React.js",
    "Next.js",
    "Supabase",
    "TypeScript",
    "Brescia",
    "Portfolio",
    "Web Development",
    "Frontend Developer",
    "Backend Developer"
  ],
  authors: [{ name: "Francesco Delmonaco" }],
  creator: "Francesco Delmonaco",
  publisher: "Francesco Delmonaco",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    title: "Francesco Delmonaco - Sviluppatore Web Full Stack",
    description: "Sviluppatore Web Full Stack a Brescia, specializzato in React.js, Next.js e Supabase. Portfolio con progetti innovativi e skills moderne.",
    siteName: "Francesco Delmonaco Portfolio",
    images: [
      {
        url: "/og-image.png", // Crea questa immagine (1200x630px)
        width: 1200,
        height: 630,
        alt: "Francesco Delmonaco - Sviluppatore Web Full Stack",
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png", // Crea questa icona (180x180px)
  },
  manifest: "/favicon/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href={siteUrl} />
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
