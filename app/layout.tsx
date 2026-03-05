import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "KRIYEX | AI Agent Marketplace",
  description: "The premier marketplace for autonomous AI agents. Rent, buy, and monetize GitHub repositories as AI agents with KRIYEX.",
  openGraph: {
    title: "KRIYEX | AI Agent Marketplace",
    description: "Rent · Buy · Deploy autonomous AI agents.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico?v=3" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "SoftwareApplication",
                "name": "KRIYEX AI Marketplace",
                "operatingSystem": "Web",
                "applicationCategory": "DeveloperApplication",
              }),
            }}
          />
        </head>
        <body>
          <Navbar />
          <div className="pt-16">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
