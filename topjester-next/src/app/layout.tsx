import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TopJester - The Court of LOLCOWS",
  description: "Vote for the biggest internet lolcows and jesters. Documenting the downfalls, drama, and dysfunction of online personalities.",
  keywords: ["lolcow", "jester", "streamer drama", "internet lolcows", "topjester"],
  openGraph: {
    title: "TopJester - The Court of LOLCOWS",
    description: "Vote for the biggest internet lolcows and jesters",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
