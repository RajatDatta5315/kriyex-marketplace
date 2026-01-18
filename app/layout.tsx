import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Header from '../components/Header'

export const metadata = {
  title: 'KRIYEX | AI Agent Marketplace',
  description: 'Deploy and Rent AI Agents from GitHub',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head><link rel="icon" href="/logo.png" /></head>
        <body className="bg-[#0d1117] text-[#c9d1d9] antialiased">
          <Header />
          <main className="max-w-7xl mx-auto py-6 px-4">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
