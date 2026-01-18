import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head><link rel="icon" href="/logo.png" /></head>
        <body className="bg-[#0d1117] text-[#c9d1d9] antialiased">
          <header className="border-b border-[#30363d] bg-[#161b22] px-4 py-3 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2">
                  <img src="/logo.png" alt="Logo" className="h-7 w-7" />
                  <span className="font-bold text-lg text-white tracking-tighter">KRIYEX</span>
                </Link>
                {/* Mobile & Desktop Nav */}
                <nav className="flex gap-3 text-xs md:text-sm font-semibold ml-2">
                  <Link href="/" className="text-[#8b949e] hover:text-white">Explore</Link>
                  <Link href="/list-agent" className="text-[#8b949e] hover:text-white">List Agent</Link>
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <SignedOut>
                  {/* Fixed Double Button: Single clean button */}
                  <SignInButton mode="modal">
                    <button className="bg-[#238636] text-white px-3 py-1.5 rounded-md text-xs font-bold">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto py-6 px-4">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
