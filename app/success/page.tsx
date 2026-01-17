import { CheckCircle, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#161b22] border border-[#30363d] rounded-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-[#23863622] p-4 rounded-full">
            <CheckCircle size={48} className="text-[#238636]" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
        <p className="text-[#8b949e] mb-8">
          Aapka AI Agent ab deploy ho chuka hai aur KRIYEX infrastructure pe live hai.
        </p>
        
        <div className="bg-black rounded-lg p-4 mb-8 text-left font-mono text-sm border border-[#30363d]">
          <div className="text-[#8b949e] flex items-center gap-2 mb-2">
            <Terminal size={14} /> Status: <span className="text-green-400">Active</span>
          </div>
          <div className="text-[#8b949e]">Access Token: <span className="text-blue-400">KRYX_829...</span></div>
        </div>

        <Link href="/dashboard">
          <button className="w-full bg-[#238636] text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-[#2ea043]">
            Go to Agent Dashboard <ArrowRight size={18} />
          </button>
        </Link>
      </div>
    </div>
  );
}
