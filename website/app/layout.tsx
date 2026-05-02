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
  metadataBase: new URL('https://kicad-netlist-to-json.vercel.app'),
  title: {
    default: "KiCad Netlist to JSON Converter",
    template: "%s | KiCad Netlist to JSON",
  },
  description: "Convert KiCad netlist files (.xml, .net) to JSON format online. Fast, free, and easy to use. Perfect for PCB design automation and EDA workflows.",
  keywords: ["KiCad", "netlist", "converter", "JSON", "PCB", "EDA", "electronics", "EAGLE", "netlist converter"],
  authors: [{ name: "KiCad Netlist to JSON" }],
  creator: "KiCad Netlist to JSON",
  publisher: "KiCad Netlist to JSON",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kicad-netlist-to-json.vercel.app",
    siteName: "KiCad Netlist to JSON",
    title: "KiCad Netlist to JSON Converter",
    description: "Convert KiCad netlist files (.xml, .net) to JSON format online. Fast, free, and easy to use.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "KiCad Netlist to JSON Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KiCad Netlist to JSON Converter",
    description: "Convert KiCad netlist files to JSON format online. Fast, free, and easy to use.",
    images: ["/og-image.svg"],
    creator: "@kicad_netlist_json",
  },
  alternates: {
    canonical: "https://kicad-netlist-to-json.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          {children}
        </main>
        <footer className="py-4 text-center text-sm text-muted-foreground">
          <p>Built with kicad-netlist-to-json</p>
        </footer>
      </body>
    </html>
  );
}