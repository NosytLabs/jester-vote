import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TopJester - The Court of LOLCOWS | Streamer Rankings",
  description: "Vote for the biggest internet lolcows and jesters. Documenting the downfalls, drama, and dysfunction of online personalities. Community-driven rankings.",
  keywords: ["lolcow", "streamer rankings", "jester", "court of fools", "streaming drama", "DSP", "Wings of Redemption", "Ice Poseidon"],
  authors: [{ name: "TopJester" }],
  creator: "TopJester",
  publisher: "TopJester",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "TopJester - The Court of LOLCOWS",
    description: "Vote for the biggest internet lolcows and jesters. Community-driven rankings.",
    url: "https://topjester.com",
    siteName: "TopJester",
    images: [
      {
        url: "/og-image.png",
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
    title: "TopJester - The Court of LOLCOWS",
    description: "Vote for the biggest internet lolcows and jesters.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://topjester.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-[#0f0f1a] text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
