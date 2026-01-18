"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center pt-10 pb-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          The AI Agent <span className="text-[#238636]">Marketplace</span>
        </h1>
        <p className="text-[#8b949e] text-lg max-w-2xl mx-auto mb-8">
          Rent, Deploy, and Scale autonomous agents directly from GitHub. Powered by KRYV.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="bg-[#238636] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#2ea043] transition text-center">
            Explore Agents
          </Link>
          <Link href="/list-agent" className="bg-[#21262d] border border-[#30363d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#30363d] transition text-center">
            List your Agent
          </Link>
        </div>
      </div>

      {/* Featured Agent Card (The one with the arrow) */}
      <div className="w-full max-w-xl bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
        <div 
          className="p-6 cursor-pointer flex justify-between items-center"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-500 font-bold">FA</div>
            <div>
              <h3 className="text-white font-bold text-lg">Finance Audit Bot</h3>
              <p className="text-xs text-[#8b949e]">Analyze crypto wallets & transactions</p>
            </div>
          </div>
          <div className={`text-[#8b949e] transition-transform ${expanded ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </div>

        {expanded && (
          <div className="px-6 pb-6 border-t border-[#30363d] pt-4 animate-in fade-in slide-in-from-top-2">
            <p className="text-sm text-[#8b949e] mb-4">
              This agent uses real-time KRYV social data to audit wallet addresses and flag suspicious activity. 
              Supports Ethereum, Solana, and KRYV Chain.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-white font-mono font-bold">$12.00 / hour</span>
              <button className="bg-white text-black px-4 py-2 rounded-md font-bold text-sm">Rent Now</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
