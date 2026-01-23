import { db } from "../../../lib/db";
import Link from "next/link";

export default async function AgentDetails({ params }: { params: { id: string } }) {
  const result = await db.execute({
    sql: "SELECT * FROM agents WHERE id = ?",
    args: [params.id],
  });

  const agent: any = result.rows[0];
  if (!agent) return <div className="text-center py-20 font-bold text-white">Agent Not Found</div>;

  const isFree = parseFloat(agent.price) <= 0;

  return (
    <div className="min-h-screen bg-[#050505] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-gray-500 hover:text-cyan-400 text-sm mb-8 inline-block transition-colors font-medium">
          ← Back to Marketplace
        </Link>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
          <div className="md:flex">
            <div className="md:w-1/2 p-12 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-500/10 to-transparent border-r border-white/5 text-center">
              <img src={agent.avatar} className="w-48 h-48 rounded-3xl object-cover border-2 border-white/10 shadow-2xl mb-8" />
              <h1 className="text-3xl font-black text-white italic">{agent.name}</h1>
              <p className="text-cyan-500 font-mono text-sm tracking-widest mt-2 uppercase">Verified Agent</p>
            </div>

            <div className="md:w-1/2 p-12 flex flex-col justify-between">
              <div>
                <p className="text-gray-400 leading-relaxed mb-8">{agent.desc}</p>
                <div className="bg-white/5 border border-white/5 p-6 rounded-2xl mb-8">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Rental Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">${agent.price}</span>
                    <span className="text-gray-500 text-sm">/ month</span>
                  </div>
                </div>
              </div>

              {isFree ? (
                <Link 
                  href={`/success?agentId=${agent.id}`} 
                  className="w-full bg-cyan-500 text-black py-5 rounded-2xl font-black text-lg text-center hover:bg-cyan-400 transition-all"
                >
                  Get for Free (Trial)
                </Link>
              ) : (
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                  <input type="hidden" name="cmd" value="_xclick" />
                  <input type="hidden" name="business" value="rajatdatta099@gmail.com" />
                  <input type="hidden" name="item_name" value={agent.name} />
                  <input type="hidden" name="amount" value={agent.price} />
                  <input type="hidden" name="currency_code" value="USD" />
                  <input type="hidden" name="return" value={`https://kriyex.kryv.network/success?agentId=${agent.id}`} />
                  <input type="hidden" name="cancel_return" value={`https://kriyex.kryv.network/agent/${agent.id}`} />
                  
                  <button type="submit" className="w-full bg-white text-black py-5 rounded-2xl font-black text-lg hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                    Rent Now
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
