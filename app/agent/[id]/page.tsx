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
    <div className="min-h-screen bg-[#050505] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-gray-500 hover:text-cyan-400 text-sm mb-8 inline-block transition-colors">
          ← Back to Marketplace
        </Link>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
          <div className="md:flex">
            {/* Left Section */}
            <div className="md:w-1/2 p-12 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-500/10 to-transparent border-r border-white/5">
              <div className="relative group">
                <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <img src={agent.avatar} className="relative w-48 h-48 rounded-3xl object-cover border-2 border-white/10 shadow-2xl" />
              </div>
              <h1 className="mt-8 text-3xl font-black tracking-tighter text-white">{agent.name}</h1>
              <p className="text-cyan-500 font-mono text-sm uppercase tracking-widest mt-2">Certified Agent</p>
            </div>

            {/* Right Section with PayPal */}
            <div className="md:w-1/2 p-12 flex flex-col justify-between">
              <div>
                <p className="text-gray-400 leading-relaxed mb-8">{agent.desc}</p>
                <div className="bg-white/5 border border-white/5 p-6 rounded-2xl mb-8">
                  <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Price to Rent</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">${agent.price}</span>
                    <span className="text-gray-500 text-sm">/ month</span>
                  </div>
                </div>
              </div>

              {/* PayPal Form */}
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" className="w-full">
                <input type="hidden" name="cmd" value="_xclick" />
                <input type="hidden" name="business" value="rajatdatta099@gmail.com" />
                <input type="hidden" name="item_name" value={`KRIYEX Agent: ${agent.name}`} />
                <input type="hidden" name="amount" value={agent.price} />
                <input type="hidden" name="currency_code" value="USD" />
                <input type="hidden" name="return" value={`https://kriyex.kryv.network/success?agentId=${agent.id}`} />
                <input type="hidden" name="cancel_return" value={`https://kriyex.kryv.network/agent/${agent.id}`} />
                
                <button type="submit" className="w-full bg-white text-black py-5 rounded-2xl font-black text-lg hover:bg-cyan-400 transition-all shadow-[0_20px_40px_rgba(6,182,212,0.2)]">
                  Rent Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
