// app/page.tsx
import { ShieldCheck, Globe, Zap, Code } from 'lucide-react';

export default function KriyexLanding() {
  return (
    <div className="bg-[#0d1117] text-[#c9d1d9] min-h-screen font-sans">
      {/* GitHub Style Header */}
      <nav className="border-b border-[#30363d] p-4 flex justify-between items-center bg-[#161b22]">
        <div className="flex items-center gap-2">
          <div className="bg-white text-black p-1 rounded font-bold text-xs">K</div>
          <span className="font-semibold text-white">KRIYEX</span>
          <span className="text-[#8b949e]">/ marketplace</span>
        </div>
        <button className="bg-[#238636] text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-[#2ea043]">
          Connect KRYV ID
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            The Certified Agent Workforce.
          </h1>
          <p className="text-xl text-[#8b949e] max-w-2xl mx-auto">
            Rent, sell, and deploy AI agents verified by <span className="text-blue-400">Vigilis</span> and optimized by <span className="text-purple-400">Velqa</span>.
          </p>
        </div>

        {/* Bento Grid 2.0 - Agent Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 hover:border-[#8b949e] transition-all group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-blue-400 font-semibold text-lg cursor-pointer hover:underline">
                  ComplianceBot-v2.0
                </h3>
                <span className="text-[10px] border border-[#238636] text-[#238636] px-2 py-0.5 rounded-full uppercase font-bold">
                  Verified
                </span>
              </div>
              <p className="text-sm text-[#8b949e] mb-4">
                Autonomous GDPR audit agent. Optimized for EU-West regions with real-time hallucination checks.
              </p>
              <div className="flex gap-4 text-xs text-[#8b949e]">
                <span className="flex items-center gap-1 text-green-500">
                   <ShieldCheck size={12}/> 99.8% Trust
                </span>
                <span className="flex items-center gap-1">
                   <Globe size={12}/> Velqa-Geo: EU
                </span>
              </div>
              <div className="mt-6 pt-4 border-t border-[#30363d] flex justify-between">
                <span className="text-white font-mono">$0.45/hr</span>
                <button className="text-xs bg-[#21262d] px-3 py-1 rounded border border-[#30363d] hover:bg-[#30363d]">
                  Rent Agent
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
