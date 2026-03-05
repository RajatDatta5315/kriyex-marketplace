"use client";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#030303]/80 border-b border-white/4 backdrop-blur-2xl" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5 group">
          <span className="font-display text-lg font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors duration-200">
            KRIYEX
          </span>
          <span className="text-cyan-500 font-black text-lg">.</span>
        </Link>

        {/* Nav */}
        <div className="hidden md:flex items-center gap-1">
          {[["/#marketplace", "Marketplace"], ["/#ecosystem", "Ecosystem"], ["/dashboard", "Dashboard"]].map(([href, label]) => (
            <Link key={href} href={href}
              className="text-xs font-medium text-gray-500 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/4">
              {label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-2">
          <SignedOut>
            <div className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-cyan-400 transition-all cursor-pointer">
              <SignInButton mode="modal" />
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-2">
              <Link href="/list-agent"
                className="text-xs font-bold text-cyan-400 border border-cyan-500/20 bg-cyan-500/6 px-4 py-1.5 rounded-full hover:bg-cyan-500/15 transition-all">
                + List
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>

      </div>
    </nav>
  );
}
