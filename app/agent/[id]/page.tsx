import { db } from "../../../lib/db";
import Link from "next/link";

export default async function AgentDetails({ params }: { params: { id: string } }) {
  const result = await db.execute({
    sql: "SELECT * FROM agents WHERE id = ?",
    args: [params.id],
  });

  const agent: any = result.rows[0];

  if (!agent) return <div className="text-center py-20">Agent Not Found</div>;

  return (
    <div className="min-h-screen bg-[#050505] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="text-gray-500 hover:text-cyan-400 text-sm mb-8 inline-block transition-colors">
          ← Back to Marketplace
        </Link>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
          <div className="md:flex">
            {/* Left: Avatar Section */}
            <div className="md:w-1/2 p-12 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-500/10 to-transparent border-r border-white/5">
              <div className="relative group">
                <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <img 
                  src={agent.avatar} 
                  className="relative w-48 h-48 rounded-3xl object-cover border-2 border-white/10 shadow-2xl" 
                />
              </div>
              <h1 className="mt-8 text-3xl font-black tracking-tighter text-white">{agent.name}</h1>
              <p className="text-cyan-500 font-mono text-sm uppercase tracking-widest mt-2">Active Agent</p>
            </div>

            {/* Right: Info Section */}
            <div className="md:w-1/2 p-12 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Description</span>
                  <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] text-gray-400 border border-white/10">Verified Code</span>
                </div>
                <p className="text-gray-400 leading-relaxed mb-8">
                  {agent.desc || "This autonomous agent is designed to handle complex workflows via its original GitHub repository. Optimized for performance and high uptime."}
                </p>

                <div className="bg-white/5 border border-white/5 p-6 rounded-2xl mb-8">
                  <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Rental Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">${agent.price}</span>
                    <span className="text-gray-500 text-sm">/ month</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* PayPal/Payment Button Integration */}
                <button className="w-full bg-white text-black py-5 rounded-2xl font-black text-lg hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  Access This Agent
                </button>
                <p className="text-[10px] text-center text-gray-600 uppercase tracking-tighter">
                  Secure transaction via PayPal • Instant Key Delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specs Footer */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl">
            <p className="text-[10px] text-gray-600 uppercase font-bold mb-1">Status</p>
            <p className="text-green-500 text-sm font-bold">Online</p>
          </div>
          <div className="bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl">
            <p className="text-[10px] text-gray-600 uppercase font-bold mb-1">Response</p>
            <p className="text-white text-sm font-bold">&lt; 200ms</p>
          </div>
          <div className="bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl">
            <p className="text-[10px] text-gray-600 uppercase font-bold mb-1">Version</p>
            <p className="text-white text-sm font-bold">v1.2.0</p>
          </div>
          <div className="bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl">
            <p className="text-[10px] text-gray-600 uppercase font-bold mb-1">Network</p>
            <p className="text-white text-sm font-bold">KRIYEX-9</p>
          </div>
        </div>
      </div>
    </div>
  );
}
