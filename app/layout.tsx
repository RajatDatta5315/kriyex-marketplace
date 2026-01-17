import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'KRIYEX | AI Agent Marketplace',
  description: 'Deploy and Rent AI Agents from GitHub',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" />
        </head>
        <body className="bg-[#0d1117] text-[#c9d1d9] antialiased">
          <header className="border-b border-[#30363d] bg-[#161b22] px-4 py-3 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              
              <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-3">
                  <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded" />
                  <span className="font-bold text-xl text-white tracking-tighter">KRIYEX</span>
                </Link>
                
                <nav className="hidden md:flex gap-4 text-sm font-semibold">
                  <Link href="/" className="text-[#8b949e] hover:text-white transition">Explore</Link>
                  <Link href="/list-agent" className="text-[#8b949e] hover:text-white transition">List Agent</Link>
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="bg-[#238636] text-white px-4 py-1.5 rounded-md text-sm font-bold hover:bg-[#2ea043] transition">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                
                <SignedIn>
                  <Link href="/list-agent" className="mr-2 hidden sm:block text-xs border border-[#30363d] px-2 py-1 rounded text-[#8b949e] hover:border-[#8b949e]">
                    + New Agent
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto py-10 px-4">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
