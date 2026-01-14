import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://francescodelmonaco.com"; // Aggiorna con il tuo dominio reale

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
