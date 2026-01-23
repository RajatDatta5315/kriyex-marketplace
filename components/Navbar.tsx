"use client";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter text-white italic">
          KRIYEX<span className="text-cyan-500">.</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors">Marketplace</Link>
          <Link href="/dashboard" className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors">My Agents</Link>
          
          <div className="h-6 w-[1px] bg-white/10 mx-2 hidden md:block"></div>

          <SignedOut>
            <div className="bg-white text-black px-5 py-2 rounded-full text-xs font-bold hover:bg-cyan-400 transition-all cursor-pointer">
              <SignInButton mode="modal" />
            </div>
          </SignedOut>
          
          <SignedIn>
            <div className="flex items-center gap-4">
              <Link href="/list-agent" className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-5 py-2 rounded-full text-xs font-bold hover:bg-cyan-500/20 transition-all">
                + List Agent
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
