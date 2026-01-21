"use client";
import { useState } from "react";

export default function BuyerDashboard() {
  const [key, setKey] = useState("");
  const [verified, setVerified] = useState(false);
  const [messages, setMessages] = useState([{ role: "agent", text: "Hello! I am your rented AI Agent. How can I assist you today?" }]);
  const [input, setInput] = useState("");

  const verifyKey = () => {
    // Basic frontend check for now
    if (key.startsWith("KRYV-")) {
      setVerified(true);
    } else {
      alert("Invalid Access Key!");
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    // Future: Add Groq API call here for agent response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "agent", text: "I have received your request. My brain (Groq) is being connected in Phase 2!" }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 min-h-screen">
      {!verified ? (
        <div className="bg-[#161b22] p-10 rounded-3xl border border-[#30363d] text-center shadow-2xl mt-10">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Buyer Access</h1>
          <p className="text-[#8b949e] mb-8">Enter the KRYV key you received after purchase.</p>
          <input 
            type="text" 
            placeholder="KRYV-XXXXXXXX" 
            className="w-full bg-[#0d1117] border border-[#30363d] p-4 rounded-xl text-white mb-6 text-center font-mono text-lg focus:border-green-500 outline-none transition"
            onChange={(e) => setKey(e.target.value)}
          />
          <button onClick={verifyKey} className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-green-900/20">
            Verify & Start Agent
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="flex justify-between items-center bg-[#161b22] p-6 rounded-2xl border border-[#30363d]">
            <div>
              <h1 className="text-2xl font-bold text-white">Active Agent Dashboard</h1>
              <p className="text-sm text-green-500">Status: Online & Rented</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#8b949e] block">Access Key</span>
              <code className="text-white text-xs bg-[#0d1117] px-2 py-1 rounded border border-[#30363d]">{key}</code>
            </div>
          </div>

          <div className="bg-[#161b22] rounded-2xl border border-[#30363d] h-[500px] flex flex-col shadow-xl">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-green-600 text-white rounded-tr-none' : 'bg-[#0d1117] text-[#c9d1d9] border border-[#30363d] rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-[#0d1117] border-t border-[#30363d] rounded-b-2xl flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Talk to your agent..." 
                className="flex-1 bg-[#161b22] border border-[#30363d] p-4 rounded-xl text-white outline-none focus:border-green-500" 
              />
              <button onClick={handleSend} className="bg-green-600 px-6 py-4 rounded-xl font-bold text-white hover:bg-green-500 transition">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
