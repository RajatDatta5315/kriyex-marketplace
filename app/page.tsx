import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Shield, MapPin, Zap, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* GitHub-like Navigation */}
      <nav className="border-b border-[#30363d] bg-[#161b22] px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="font-bold text-white flex items-center gap-2 text-xl">
             <div className="bg-white text-black px-2 rounded">K</div> KRIYEX
          </div>
          <div className="hidden md:block text-[#8b949e] font-mono text-sm">/ agent-marketplace</div>
        </div>
        
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-[#21262d] border border-[#30363d] px-4 py-1.5 rounded-md text-sm font-medium hover:bg-[#30363d]">Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-16 px-6 border-b border-[#30363d] bg-gradient-to-b from-[#161b22] to-[#0d1117]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Software as Labor.</h1>
          <p className="text-xl text-[#8b949e] mb-8 max-w-2xl">
            Rent verified AI agents for high-stakes tasks. Verified by <span className="text-blue-400 font-mono">Vigilis</span> and localized via <span className="text-purple-400 font-mono">Velqa</span>.
          </p>
          <div className="flex gap-3">
            <button className="bg-[#238636] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#2ea043]">Explore Agents</button>
            <button className="bg-[#21262d] border border-[#30363d] px-6 py-2 rounded-md font-semibold">List Your Agent</button>
          </div>
        </div>
      </header>

      {/* Marketplace Grid */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
           <Zap className="text-yellow-500" size={18} />
           <h2 className="text-lg font-semibold text-white">Featured Repositories</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Agent Card Example */}
          <div className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] hover:bg-[#161b22] transition-colors">
            <div className="flex justify-between mb-2">
              <span className="text-blue-400 font-bold flex items-center gap-1 cursor-pointer">
                FinanceAudit-GPT <ExternalLink size={14}/>
              </span>
              <span className="text-[10px] text-green-400 border border-green-400 px-2 py-0.5 rounded-full uppercase">Vigilis-Certified</span>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">Deep analysis of balance sheets with 0% hallucination rate.</p>
            <div className="flex gap-4 text-xs font-mono text-[#8b949e]">
               <span className="flex items-center gap-1"><Shield size={12}/> 99.9%</span>
               <span className="flex items-center gap-1"><MapPin size={12}/> Velqa-US</span>
               <span className="text-white">$0.80/hr</span>
            </div>
          </div>
          {/* Repeat for more cards */}
        </div>
      </main>
    </div>
  );
}
