"use client";
import { useState } from "react";

export default function BuyerDashboard() {
  const [key, setKey] = useState("");
  const [verified, setVerified] = useState(false);

  const verifyKey = () => {
    // Yahan hum database se key check karenge
    if (key.startsWith("KRYV-")) setVerified(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      {!verified ? (
        <div className="bg-[#161b22] p-8 rounded-2xl border border-[#30363d] text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Your Agent</h1>
          <input 
            type="text" 
            placeholder="Enter your Access Key" 
            className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white mb-4"
            onChange={(e) => setKey(e.target.value)}
          />
          <button onClick={verifyKey} className="w-full bg-[#238636] text-white py-3 rounded-lg font-bold">
            Verify & Enter
          </button>
        </div>
      ) : (
        <div className="text-white">
          <h1 className="text-3xl font-bold mb-6">Your Active Agents</h1>
          <div className="p-6 bg-[#161b22] border border-[#238636] rounded-xl">
            <p>Welcome! You can now interact with your rented agent here.</p>
            {/* Yahan hum Chat Interface ya Agent UI daalenge */}
          </div>
        </div>
      )}
    </div>
  );
}
