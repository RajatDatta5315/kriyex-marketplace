"use client";
import { useState } from "react";

export default function AgentCard({ name, desc, price }: any) {
  const [expanded, setExpanded] = useState(false);
  const paypalUser = process.env.NEXT_PUBLIC_PAYPAL_USER || "rajatdatta"; 

  return (
    <div className="w-full max-w-xl bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden mb-4 hover:border-[#8b949e] transition">
      <div className="p-6 cursor-pointer flex justify-between items-center" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-[#238636]/20 rounded-lg flex items-center justify-center text-[#238636] font-bold">
            {name[0].toUpperCase()}
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{name}</h3>
            <p className="text-xs text-[#8b949e] truncate max-w-[200px]">{desc}</p>
          </div>
        </div>
        <div className={`text-[#8b949e] transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</div>
      </div>
      
      {expanded && (
        <div className="px-6 pb-6 border-t border-[#30363d] pt-4 animate-in fade-in duration-300">
          <p className="text-sm text-[#8b949e] mb-4">
            This agent is verified on KRIYEX. Access will be provided via private GitHub invitation after payment.
          </p>
          <div className="flex justify-between items-center">
            <span className="text-white font-mono font-bold">${price} / hour</span>
            <button 
              onClick={() => window.open(`https://www.paypal.com/paypalme/${paypalUser}/${price}`, '_blank')}
              className="bg-[#0070ba] text-white px-4 py-2 rounded-md font-bold text-sm hover:bg-[#005ea6] transition"
            >
              Rent with PayPal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
