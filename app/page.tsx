import Link from "next/link";
import { db } from "../lib/db";

export const revalidate = 0;

export default async function HomePage() {
  const agents = await db.execute("SELECT * FROM agents ORDER BY id DESC");

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
      {/* Hero Section - Minden Style */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            KRIYEX Marketplace
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Kriyex is the premier AI Agent Marketplace designed for developers to monetize GitHub repositories. From automated trading bots to social media managers, explore high-performance agents ready to deploy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/list-agent" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              List Your Agent
            </Link>
            <Link href="/dashboard" className="bg-[#111] border border-white/10 px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-all">
              Buyer Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold mb-10 flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
          Featured Agents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.rows.map((agent: any) => (
            <div key={agent.id} className="group bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all hover:shadow-[0_0_40px_rgba(6,182,212,0.1)]">
              <div className="h-48 bg-[#111] relative">
                <img src={agent.avatar || "https://api.dicebear.com/7.x/bottts/svg"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-cyan-400 font-bold text-sm border border-white/10">
                  ${agent.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{agent.name}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">{agent.desc}</p>
                <Link href={`/agent/${agent.id}`} className="block w-full text-center bg-white/5 border border-white/10 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-all">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Reavion Style FAQ & Trust Section */}
      <section className="max-w-3xl mx-auto px-4 py-20 border-t border-white/5">
        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <FAQItem q="How do I get my access key?" a="Once your PayPal transaction is successful, you will be redirected to a success page containing your unique KRYV access key." />
          <FAQItem q="Is this good for beginners?" a="Yes! Kriyex handles the infrastructure. You just need to connect your repo or buy an existing agent key to start." />
          <FAQItem q="What is the best tool for AI monetization?" a="Kriyex provides the most streamlined path to turn code into a subscription-ready AI agent service." />
        </div>
      </section>

      <footer className="py-10 text-center text-gray-600 border-t border-white/5 text-sm">
        © 2026 KRIYEX Marketplace. Built for the Autonomous Age.
      </footer>
    </div>
  );
}

function FAQItem({ q, a }: { q: string, a: string }) {
  return (
    <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-all">
      <h3 className="font-bold mb-2 text-white/90">{q}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
    </div>
  );
}
