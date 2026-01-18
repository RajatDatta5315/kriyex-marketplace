"use client";
import Link from "next/link";
import AgentCard from "../components/AgentCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className="text-center mb-16 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          The AI Agent <span className="text-[#238636]">Marketplace</span>
        </h1>
        <p className="text-[#8b949e] text-lg max-w-2xl mx-auto mb-8">
          Rent, Deploy, and Scale autonomous agents directly from GitHub. Powered by KRYV.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#explore" className="bg-[#238636] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#2ea043] text-center">
            Explore Agents
          </Link>
          <Link href="/list-agent" className="bg-[#21262d] border border-[#30363d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#30363d] text-center">
            List your Agent
          </Link>
        </div>
      </div>

      <div id="explore" className="w-full flex flex-col items-center gap-6 pb-20">
        <h2 className="text-xl font-bold text-white mb-4">Featured Agents</h2>
        <AgentCard name="Finance Audit Bot" desc="Analyze crypto wallets & transactions" price="12.00" />
        <AgentCard name="Social Sentinel" desc="KRYV social sentiment analysis" price="8.00" />
      </div>
    </div>
  );
}
