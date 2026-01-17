import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#0d1117] text-[#c9d1d9] antialiased">
          <header className="border-b border-[#30363d] bg-[#161b22] p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                {/* Logo Image */}
                <img src="/logo.png" alt="KRIYEX" className="h-8 w-8 rounded-md" />
                <span className="font-bold text-xl text-white tracking-tighter">KRIYEX</span>
              </div>
              
              <nav className="hidden md:flex gap-6 text-sm font-medium">
                <a href="/" className="hover:text-white">Marketplace</a>
                <a href="/list-agent" className="hover:text-white">List Agent</a>
              </nav>

              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="bg-[#238636] text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-[#2ea043]">
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
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
