"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [key, setKey] = useState("Verifying payment...");
  const agentId = searchParams.get("agentId") || "1";

  useEffect(() => {
    async function verify() {
      const res = await fetch(`/api/purchase/verify?agentId=${agentId}`);
      const data = await res.json();
      if (data.key) setKey(data.key);
      else setKey("Error verifying payment.");
    }
    verify();
  }, [agentId]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#0A0A0A] border border-cyan-500/30 p-10 rounded-[2.5rem] text-center shadow-[0_0_50px_rgba(6,182,212,0.1)]">
        <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/20 text-cyan-500">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-3xl font-black mb-2 text-white">Payment Success!</h1>
        <p className="text-gray-500 text-sm mb-8">Deploying your agent to your dashboard.</p>
        
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
          <p className="text-[10px] text-gray-500 uppercase font-bold mb-2 tracking-widest">Access Key</p>
          <code className="text-2xl font-mono text-cyan-400 font-bold tracking-wider break-all">{key}</code>
        </div>
        
        <button onClick={() => window.location.href="/dashboard"} className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-cyan-400 transition-all">
          Open Dashboard
        </button>
      </div>
    </div>
  );
}
