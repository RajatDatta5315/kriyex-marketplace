import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "KRIYEX | AI Agent Marketplace",
  description: "The premier marketplace for autonomous AI agents. Rent, buy, and monetize GitHub repositories as AI agents with KRIYEX.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "KRIYEX",
  },
  openGraph: {
    title: "KRIYEX | AI Agent Marketplace",
    description: "Rent · Buy · Deploy autonomous AI agents.",
    type: "website",
    url: "https://kriyex.kryv.network",
  },
  twitter: {
    card: "summary_large_image",
    title: "KRIYEX | AI Agent Marketplace",
    description: "Rent · Buy · Deploy autonomous AI agents.",
  },
};

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico?v=3" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="apple-touch-icon" href="/icons/icon-192.png" />
          <meta name="mobile-web-app-capable" content="yes" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "SoftwareApplication",
                "name": "KRIYEX AI Marketplace",
                "operatingSystem": "Web",
                "applicationCategory": "DeveloperApplication",
                "url": "https://kriyex.kryv.network",
              }),
            }}
          />
        </head>
        <body>
          <Navbar />
          <div className="pt-14">{children}</div>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js').catch(() => {});
                  });
                }
              `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
