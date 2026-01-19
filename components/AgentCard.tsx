"use client";
import { useState } from "react";

export default function AgentCard({ name, desc, price, avatar }: any) {
  const [expanded, setExpanded] = useState(false);
  const paypalEmail = process.env.NEXT_PUBLIC_PAYPAL_EMAIL || "rajatdatta099@gmail.com";

  return (
    <div className="w-full max-w-xl bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden mb-4 hover:border-[#8b949e] transition group">
      <div className="p-6 cursor-pointer flex justify-between items-center" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-4">
          {avatar ? (
            <img src={avatar} alt={name} className="h-12 w-12 rounded-lg object-cover border border-[#30363d]" />
          ) : (
            <div className="h-12 w-12 bg-[#238636]/20 rounded-lg flex items-center justify-center text-[#238636] font-bold">
              {name[0].toUpperCase()}
            </div>
          )}
          <div>
            <h3 className="text-white font-bold text-lg group-hover:text-[#2ea043] transition">{name}</h3>
            <p className="text-xs text-[#8b949e] truncate max-w-[200px]">{desc || "No description provided."}</p>
          </div>
        </div>
        <div className={`text-[#8b949e] transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</div>
      </div>
      
      {expanded && (
        <div className="px-6 pb-6 border-t border-[#30363d] pt-4 animate-in slide-in-from-top-2 duration-300">
          <div className="bg-[#0d1117] p-3 rounded-lg mb-4">
            <p className="text-sm text-[#c9d1d9] leading-relaxed">{desc}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white font-mono font-bold text-xl">${price} <span className="text-xs text-[#8b949e]">/ Access</span></span>
            
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
              <input type="hidden" name="cmd" value="_xclick" />
              <input type="hidden" name="business" value={paypalEmail} />
              <input type="hidden" name="item_name" value={`KRIYEX Agent: ${name}`} />
              <input type="hidden" name="amount" value={price} />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="return" value={`${process.env.NEXT_PUBLIC_BASE_URL}/success`} />
              <button type="submit" className="bg-[#f2ba36] text-[#003087] px-6 py-2 rounded-full font-extrabold text-sm hover:bg-[#e1aa25] transition shadow-lg shadow-yellow-900/20">
                Buy Access
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
