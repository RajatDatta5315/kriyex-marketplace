"use client";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [key, setKey] = useState("Generating...");

  useEffect(() => {
    // Yahan hum API hit karenge jo payment verify karke key generate karega
    setTimeout(() => {
      setKey("KRYV-" + Math.random().toString(36).substr(2, 9).toUpperCase());
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="bg-[#161b22] p-8 rounded-2xl border border-[#238636] max-w-md w-full">
        <h1 className="text-3xl font-bold text-white mb-4">Payment Successful! 🎉</h1>
        <p className="text-[#8b949e] mb-6">Your AI Agent is ready. Use the key below to access the dashboard.</p>
        
        <div className="bg-[#0d1117] p-4 rounded-lg border border-[#30363d] mb-6">
          <code className="text-[#2ea043] font-mono font-bold text-lg">{key}</code>
        </div>

        <button 
          onClick={() => window.location.href = "/dashboard"}
          className="w-full bg-[#238636] text-white py-3 rounded-lg font-bold hover:bg-[#2ea043]"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
