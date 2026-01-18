"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AgentCard from "../components/AgentCard";

export default function Home() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch('/api/agents/get')
      .then(res => res.json())
      .then(data => setAgents(Array.isArray(data) ? data : []));
  }, []);

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
          <Link href="#explore" className="bg-[#238636] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#2ea043] text-center transition">
            Explore Agents
          </Link>
          <Link href="/list-agent" className="bg-[#21262d] border border-[#30363d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#30363d] text-center transition">
            List your Agent
          </Link>
        </div>
      </div>

      <div id="explore" className="w-full flex flex-col items-center gap-6 pb-20">
        <h2 className="text-xl font-bold text-white mb-4">Live Agents</h2>
        {agents.length > 0 ? (
          agents.map((agent: any) => (
            <AgentCard 
              key={agent.id} 
              name={agent.name} 
              desc={agent.repoUrl} 
              price={agent.price || "10.00"} 
            />
          ))
        ) : (
          <p className="text-[#8b949e]">No agents listed yet. Be the first!</p>
        )}
      </div>
    </div>
  );
}
