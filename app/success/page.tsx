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
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-[#161b22] p-10 rounded-3xl border border-[#238636] shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-4">Success! 🎉</h1>
        <p className="text-[#8b949e] mb-8">Save your Agent Access Key safely:</p>
        <div className="bg-[#0d1117] p-5 rounded-xl border border-[#30363d] mb-8 font-mono text-2xl text-[#2ea043] font-bold">
          {key}
        </div>
        <button onClick={() => window.location.href="/dashboard"} className="bg-[#238636] px-8 py-3 rounded-xl text-white font-bold hover:bg-[#2ea043] transition">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
