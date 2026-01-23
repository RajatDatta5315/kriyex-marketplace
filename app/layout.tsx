import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KRIYEX | The AI Agent Marketplace",
  description: "Monetize your GitHub repositories by turning them into autonomous AI agents. Rent, Buy, and Scale with KRIYEX.",
  keywords: "AI Agents, Monetize GitHub, AI Marketplace, Autonomous Code, Rent AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* GEO Optimized Product Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "SoftwareApplication",
                "name": "KRIYEX AI Marketplace",
                "operatingSystem": "Web",
                "applicationCategory": "DeveloperApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "10.00",
                  "priceCurrency": "USD"
                },
                "description": "KRIYEX is a high-performance marketplace where developers convert repositories into income-generating AI agents.",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "ratingCount": "120"
                }
              }),
            }}
          />
        </head>
        <body className={`${inter.className} bg-[#050505] text-white`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
