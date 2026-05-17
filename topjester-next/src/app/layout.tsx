import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  metadataBase: new URL("http://192.168.2.221:3013"),
  title: "TopJester - The Court of FOOLS | Streamer Rankings",
  description: "Vote for the biggest internet lolcows and jesters. Documenting the downfalls, drama, and dysfunction of online personalities. Community-driven rankings.",
  keywords: ["lolcow", "streamer rankings", "jester", "court of fools", "streaming drama", "DSP", "Wings of Redemption", "Ice Poseidon"],
  authors: [{ name: "TopJester" }],
  creator: "TopJester",
  publisher: "TopJester",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "TopJester - The Court of FOOLS",
    description: "Vote for the biggest internet lolcows and jesters. Community-driven rankings.",
    url: "http://192.168.2.221:3013",
    siteName: "TopJester",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "TopJester - The Court of Fools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TopJester - The Court of FOOLS",
    description: "Vote for the biggest internet lolcows and jesters.",
    images: ["/og-image.svg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "http://192.168.2.221:3013",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "http://192.168.2.221:3013/#website",
        "url": "http://192.168.2.221:3013",
        "name": "TopJester",
        "description": "The Court of FOOLS - Community-driven streamer rankings",
        "publisher": {
          "@id": "http://192.168.2.221:3013/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "http://192.168.2.221:3013/#organization",
        "name": "TopJester",
        "url": "http://192.168.2.221:3013",
        "logo": {
          "@type": "ImageObject",
          "url": "https://topjester.com/icon.svg"
        },
        "sameAs": [
          "https://twitter.com/TopJester",
          "https://discord.gg/topjester"
        ]
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#0f0f1a] text-white min-h-screen flex flex-col">
        <ErrorBoundary>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
