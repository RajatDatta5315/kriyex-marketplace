import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KRIYEX | AI Agent Marketplace",
  description: "Monetize your GitHub repositories by turning them into autonomous AI agents. Rent, Buy, and Scale with KRIYEX.",
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
                }
              }),
            }}
          />
        </head>
        <body className={`${inter.className} bg-[#050505] text-white`}>
          <Navbar />
          <div className="pt-20">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
