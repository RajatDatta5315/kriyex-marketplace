import { db } from "../../../lib/db";
import Link from "next/link";

export default async function AgentDetails({ params }: { params: { id: string } }) {
  const result = await db.execute({
    sql: "SELECT * FROM agents WHERE id = ?",
    args: [params.id],
  });

  const agent: any = result.rows[0];
  if (!agent) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500 font-mono text-sm">
      Agent not found.
    </div>
  );

  const isFree = parseFloat(agent.price) <= 0;

  return (
    <div className="min-h-screen bg-[#030303] py-16 px-4">
      <div className="max-w-3xl mx-auto">

        <Link href="/" className="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-white transition-colors mb-12 font-mono">
          <span>←</span> Back to Marketplace
        </Link>

        <div className="bg-[#060606] border border-white/5 rounded-2xl overflow-hidden">

          {/* Header band */}
          <div className="h-36 bg-gradient-to-br from-cyan-500/8 to-violet-500/6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#060606]/40" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          </div>

          <div className="px-8 pb-10">
            {/* Avatar + title */}
            <div className="flex items-end gap-6 -mt-12 mb-8">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/8 bg-[#0A0A0A] shadow-xl flex-shrink-0">
                <img
                  src={agent.avatar || `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${agent.id}`}
                  className="w-full h-full object-cover"
                  alt={agent.name}
                />
              </div>
              <div className="pb-1">
                <p className="text-[10px] font-mono tracking-widest text-cyan-500 uppercase mb-1">Verified Agent · KRIYEX</p>
                <h1 className="font-display text-2xl font-black tracking-tight text-white">{agent.name}</h1>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-lg">{agent.desc}</p>

            {/* Pricing block */}
            <div className="flex items-center justify-between p-5 bg-white/2 border border-white/5 rounded-xl mb-6">
              <div>
                <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-1">Monthly Rental</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-black text-white">${agent.price}</span>
                  <span className="text-gray-600 text-xs">/ month</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-gray-700 uppercase tracking-widest mb-1">Access Type</p>
                <p className="text-xs text-gray-400 font-semibold">KRYV Key</p>
              </div>
            </div>

            {/* CTA */}
            {isFree ? (
              <Link
                href={`/success?agentId=${agent.id}`}
                className="flex items-center justify-center gap-2 w-full bg-cyan-500 text-black py-4 rounded-xl font-black text-sm hover:bg-cyan-400 transition-all"
              >
                Get Free Trial →
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
                <button
                  type="submit"
                  className="w-full bg-white text-black py-4 rounded-xl font-black text-sm hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.12)]"
                >
                  Rent Now — ${agent.price}/mo
                </button>
              </form>
            )}

            <p className="text-center text-[10px] text-gray-700 font-mono mt-4">
              Secured by PayPal · Instant KRYV key delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
