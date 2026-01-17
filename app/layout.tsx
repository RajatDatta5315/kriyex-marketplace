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
          {/* Favicon link (Manual safeguard) */}
          <link rel="icon" href="/logo.png" />
        </head>
        <body className="bg-[#0d1117] text-[#c9d1d9] antialiased">
          <header className="border-b border-[#30363d] bg-[#161b22] px-4 py-3">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              
              {/* Left Side: Logo & Nav */}
              <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
                  <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded" />
                  <span className="font-bold text-xl text-white tracking-tighter">KRIYEX</span>
                </Link>
                
                <nav className="hidden md:flex gap-4 text-sm font-semibold text-[#8b949e]">
                  <Link href="/" className="hover:text-white transition">Marketplace</Link>
                  <Link href="/list-agent" className="hover:text-white transition">List Agent</Link>
                </nav>
              </div>

              {/* Right Side: Auth */}
              <div className="flex items-center gap-3">
                <SignedOut>
                  {/* Sirf ek hi SignInButton rakha hai */}
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
                  <UserButton 
                    afterSignOutUrl="/" 
                    appearance={{
                      elements: {
                        avatarBox: "h-8 w-8"
                      }
                    }}
                  />
                </SignedIn>
              </div>

            </div>
          </header>

          <main className="max-w-7xl mx-auto py-6 px-4">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
