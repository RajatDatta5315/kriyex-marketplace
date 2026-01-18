"use client";
import { useState } from "react";

export default function AgentCard({ name, desc, price, id }: any) {
  const [expanded, setExpanded] = useState(false);

  const handleRent = async () => {
    // Ye Stripe Checkout API ko call karega
    window.location.href = "/api/checkout"; 
  };

  return (
    <div className="w-full max-w-xl bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden mb-4">
      <div className="p-6 cursor-pointer flex justify-between items-center" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500 font-bold">{name[0]}</div>
          <div>
            <h3 className="text-white font-bold text-lg">{name}</h3>
            <p className="text-xs text-[#8b949e]">{desc}</p>
          </div>
        </div>
        <div className={`text-[#8b949e] transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</div>
      </div>
      {expanded && (
        <div className="px-6 pb-6 border-t border-[#30363d] pt-4">
          <p className="text-sm text-[#8b949e] mb-4">KRYV Social-verified agent. High reliability for {name}.</p>
          <div className="flex justify-between items-center">
            <span className="text-white font-mono font-bold">${price} / hour</span>
            <button onClick={handleRent} className="bg-white text-black px-4 py-2 rounded-md font-bold text-sm hover:bg-gray-200">Rent Now</button>
          </div>
        </div>
      )}
    </div>
  );
}
