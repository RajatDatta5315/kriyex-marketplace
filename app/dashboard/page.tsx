"use client";
import { useState } from "react";

export default function JarvisDashboard() {
  const [key, setKey] = useState("");
  const [verified, setVerified] = useState(false);
  const [apiKeys, setApiKeys] = useState({ groq: "", claude: "", openai: "" });

  const verifyKey = () => {
    if (key.startsWith("KRYV-")) setVerified(true);
    else alert("Invalid Command Key!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 selection:bg-cyan-500/30">
      {!verified ? (
        <div className="max-w-md mx-auto mt-32 bg-[#0A0A0A] border border-cyan-500/20 p-10 rounded-[2.5rem] text-center shadow-[0_0_100px_rgba(6,182,212,0.1)]">
          <div className="w-24 h-24 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full mx-auto mb-8 animate-spin flex items-center justify-center">
            <div className="w-16 h-16 bg-cyan-500/10 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-2xl font-black italic tracking-tighter mb-6 uppercase">Initialize Interface</h1>
          <input 
            type="text" placeholder="ENTER ACCESS KEY" 
            className="w-full bg-transparent border-b-2 border-white/10 p-4 text-center font-mono text-cyan-400 outline-none focus:border-cyan-500 transition-all mb-8"
            onChange={(e) => setKey(e.target.value)}
          />
          <button onClick={verifyKey} className="w-full bg-cyan-500 text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white transition-all">Execute Login</button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10">
          {/* Left Panel: Arc Reactor Identity */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-[3rem] text-center relative overflow-hidden">
               {/* Pulse Animation */}
              <div className="absolute inset-0 bg-cyan-500/5 animate-pulse"></div>
              <div className="relative z-10">
                <div className="w-40 h-40 rounded-full border-8 border-white/5 border-t-cyan-500 mx-auto mb-6 animate-[spin_10s_linear_infinite] flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                  <div className="w-28 h-28 bg-gradient-to-tr from-cyan-600 to-blue-400 rounded-full shadow-inner flex items-center justify-center">
                    <span className="text-4xl font-black text-black italic">KX</span>
                  </div>
                </div>
                <h2 className="text-xl font-black italic tracking-tighter">AGENT ONLINE</h2>
                <p className="text-gray-500 text-[10px] mt-2 tracking-[0.3em] font-mono">ENCRYPTED CONNECTION : ACTIVE</p>
              </div>
            </div>
            
            {/* API Key Plate */}
            <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Neural Config (API Keys)</h3>
              <input type="password" placeholder="GROQ API KEY" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs font-mono focus:border-cyan-500 outline-none" 
                onChange={(e) => setApiKeys({...apiKeys, groq: e.target.value})} />
              <input type="password" placeholder="CLAUDE API KEY" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs font-mono focus:border-cyan-500 outline-none" 
                onChange={(e) => setApiKeys({...apiKeys, claude: e.target.value})} />
              <button className="w-full bg-white text-black py-3 rounded-xl font-bold text-xs hover:bg-cyan-400 transition-all">Save Neural Path</button>
            </div>
          </div>

          {/* Right Panel: Terminal Data Stream */}
          <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-8 flex flex-col h-[700px] shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-[10px] font-mono text-gray-500">ROOT@KRIYEX_MARKETPLACE:~#</span>
            </div>
            <div className="flex-1 font-mono text-sm text-cyan-400/80 space-y-2 overflow-y-auto custom-scrollbar">
              <p>{">"} INITIALIZING BOOT SEQUENCE...</p>
              <p>{">"} CONNECTING TO REPOSITORY CORE...</p>
              <p>{">"} ANALYZING NEURAL SCHEMATICS...</p>
              <p className="text-white">{">"} ACCESS GRANTED. SYSTEM READY FOR INPUT.</p>
              <div className="pt-10">
                <p className="text-gray-600 italic">// Insert your brain key to start autonomous processing.</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <input type="text" placeholder="EXECUTE COMMAND..." className="flex-1 bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-cyan-500 font-mono text-xs" />
              <button className="bg-cyan-500 text-black px-10 rounded-2xl font-black uppercase text-xs">Run</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
