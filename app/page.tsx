import Link from "next/link";
import { db } from "../lib/db";

export const revalidate = 0;

const ECOSYSTEM = [
  { name: "DRYAPAPERHQ", url: "https://dryapaperhq.com", tag: "Store", desc: "Digital product & design asset store", icon: "⬡", color: "#06B6D4" },
  { name: "KRYV.NETWORK", url: "https://kryv.network", tag: "Social", desc: "The social layer of the KRYV ecosystem", icon: "◈", color: "#8B5CF6" },
  { name: "NEHIRA.SPACE", url: "https://nehira.space", tag: "Robo-AI", desc: "Nehira — AI consciousness & future robotic entity", icon: "⬟", color: "#EC4899" },
  { name: "VIGILIS", url: "https://vigilis.kryv.network", tag: "Security", desc: "AI false-conversation & hallucination detector", icon: "◉", color: "#F59E0B" },
  { name: "VELQA", url: "https://velqa.kryv.network", tag: "SEO", desc: "Geo-optimization engine for organic growth", icon: "⟁", color: "#10B981" },
  { name: "KRIYEX", url: "https://kriyex.kryv.network", tag: "Marketplace", desc: "List, sell & rent autonomous AI agents", icon: "⬢", color: "#06B6D4" },
  { name: "MINDEN", url: "https://minden.kryv.network", tag: "Autonomous", desc: "Autonomous business humanoid agent", icon: "◆", color: "#3B82F6" },
  { name: "RYDEN", url: "https://ryden.kryv.network", tag: "Autonomous", desc: "Autonomous social AGI operator", icon: "◇", color: "#6366F1" },
  { name: "⟁KMND", url: "https://kmnd.kryv.network", tag: "Finance", desc: "KRYVMIND — autonomous currency holder", icon: "▣", color: "#F59E0B" },
  { name: "DEVMASIHA", url: "https://devmasiha.kryv.network", tag: "Dev", desc: "Autonomous debug fixer & code healer", icon: "◑", color: "#EF4444" },
  { name: "RELYX", url: "https://relyx.kryv.network", tag: "Dev", desc: "Autonomous git transfer & deployment AGI", icon: "⟴", color: "#10B981" },
  { name: "VOKRYL", url: "https://vokryl.kryv.network", tag: "AI Core", desc: "Nehira's architectural structure & drone fleet", icon: "✦", color: "#EC4899" },
  { name: "NODEMELD", url: "https://nodemeld.kryv.network", tag: "Marketing", desc: "SaaS hunt, marketing SEO database engine", icon: "⬡", color: "#8B5CF6" },
  { name: "SOLAEQUI", url: "https://solaequi.kryv.network", tag: "Quantum", desc: "Quantum enhancement & computation layer", icon: "◈", color: "#06B6D4" },
  { name: "CORENAUTICS", url: "https://corenautics.kryv.network", tag: "NanoTech", desc: "Nano-technology research & development", icon: "⬟", color: "#3B82F6" },
  { name: "O.KRYV", url: "https://o.kryv.network", tag: "BioTech", desc: "Biotechnology frontier research node", icon: "○", color: "#10B981" },
  { name: "DECOYSENTINEL", url: "https://decoysentinel.kryv.network", tag: "Cyber", desc: "Cybersecurity & threat intelligence layer", icon: "◉", color: "#EF4444" },
  { name: "GEN", url: "https://gen.kryv.network", tag: "Builder", desc: "KRYVGEN — autonomous app builder", icon: "⟁", color: "#F59E0B" },
  { name: "MINDPAL", url: "https://mindpal.kryv.network", tag: "Productivity", desc: "AI-powered note-taking & knowledge base", icon: "◆", color: "#6366F1" },
  { name: "KRYVLAYER", url: "https://kryvlayer.kryv.network", tag: "SEO", desc: "Programmatic SEO & infinite landing pages", icon: "◇", color: "#8B5CF6" },
  { name: "ERA", url: "https://era.kryv.network", tag: "Gamified", desc: "Gamified debugging & developer learning", icon: "▣", color: "#EC4899" },
  { name: "MCP.KRYV", url: "https://mcp.kryv.network", tag: "Infra", desc: "Model Context Protocol servers hub", icon: "◑", color: "#06B6D4" },
  { name: "GENESIS", url: "https://genesis.kryv.network", tag: "Orchestration", desc: "Agentic orchestration & multi-agent runtime", icon: "⟴", color: "#3B82F6" },
  { name: "NEURAL", url: "https://neural.kryv.network", tag: "SLM", desc: "Synthetic pipeline — small language models", icon: "✦", color: "#10B981" },
];

export default async function HomePage() {
  const agents = await db.execute("SELECT * FROM agents ORDER BY id DESC");

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-cyan-500/20">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-600/8 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-[20%] w-[400px] h-[300px] bg-violet-600/6 blur-[120px] rounded-full pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/4 border border-white/8 rounded-full px-4 py-1.5 mb-10 text-xs font-mono text-gray-400 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          KRYV ECOSYSTEM · AUTONOMOUS AGE
        </div>

        <h1 className="font-display text-center text-[clamp(3rem,9vw,8rem)] font-black tracking-[-0.04em] leading-[0.9] mb-8">
          <span className="block text-white">KRIYEX</span>
          <span className="block bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            MARKETPLACE
          </span>
        </h1>

        <p className="text-gray-400 text-center text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light">
          The premier layer for AI agents. Rent, buy, and deploy autonomous intelligence — or monetize your own GitHub repositories as live AI agents.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/list-agent" className="group relative bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm hover:bg-cyan-400 transition-all duration-200 shadow-[0_1px_20px_rgba(255,255,255,0.12)]">
            List Your Agent
            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </Link>
          <Link href="/#marketplace" className="bg-white/4 border border-white/8 backdrop-blur-sm px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/8 hover:border-white/15 transition-all duration-200">
            Browse Agents
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-20 flex flex-wrap justify-center gap-10 text-center">
          {[["24+", "KRYV Products"], ["∞", "Agents Available"], ["100%", "On-Chain Keys"]].map(([val, label]) => (
            <div key={label}>
              <p className="font-display text-3xl font-black text-white">{val}</p>
              <p className="text-[10px] tracking-[0.2em] text-gray-600 uppercase mt-1 font-mono">{label}</p>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-700">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-gray-700" />
          <span className="text-[9px] tracking-[0.25em] font-mono uppercase">scroll</span>
        </div>
      </section>

      {/* ── AGENTS MARKETPLACE ── */}
      <section id="marketplace" className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-cyan-500 font-mono uppercase mb-3">Live Inventory</p>
            <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight">Featured Agents</h2>
          </div>
          <Link href="/list-agent" className="hidden md:flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
            Sell yours <span>↗</span>
          </Link>
        </div>

        {agents.rows.length === 0 ? (
          <div className="border border-dashed border-white/6 rounded-3xl py-24 text-center">
            <p className="text-gray-600 font-mono text-sm">No agents listed yet.</p>
            <Link href="/list-agent" className="mt-6 inline-block text-cyan-500 text-sm hover:underline">Be the first →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.rows.map((agent: any) => (
              <Link key={agent.id} href={`/agent/${agent.id}`} className="group relative bg-[#080808] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.06)] flex flex-col">
                <div className="h-44 bg-[#0D0D0D] overflow-hidden relative">
                  <img
                    src={agent.avatar || `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${agent.id}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    alt={agent.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-mono text-cyan-400 border border-white/8">
                    ${agent.price}<span className="text-gray-600">/mo</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-lg mb-1.5 group-hover:text-cyan-400 transition-colors tracking-tight">{agent.name}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed mb-5 flex-1 line-clamp-2">{agent.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-700 tracking-widest uppercase">Verified Agent</span>
                    <span className="text-xs text-cyan-500 group-hover:translate-x-1 transition-transform inline-block">Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── ECOSYSTEM ── */}
      <section id="ecosystem" className="border-t border-white/4 py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-xl">
            <p className="text-[10px] tracking-[0.3em] text-violet-400 font-mono uppercase mb-3">The KRYV Network</p>
            <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-4">Entire Ecosystem</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              KRIYEX is one node in a larger autonomous network. Every product, agent, and platform below is part of the KRYV universe — built for the age of synthetic intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {ECOSYSTEM.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#060606] border border-white/4 rounded-xl p-5 hover:border-white/12 hover:bg-[#0A0A0A] transition-all duration-200 flex flex-col gap-3 overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[50px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                  style={{ background: item.color }}
                />
                <div className="flex items-start justify-between">
                  <span className="text-2xl" style={{ color: item.color }}>{item.icon}</span>
                  <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full border"
                    style={{ color: item.color, borderColor: `${item.color}30`, background: `${item.color}10` }}>
                    {item.tag}
                  </span>
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-white tracking-tight mb-1 group-hover:text-white transition-colors">{item.name}</p>
                  <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-auto pt-2 border-t border-white/4">
                  <span className="text-[10px] font-mono text-gray-700 group-hover:text-gray-500 transition-colors">{item.url.replace("https://", "")}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-white/4 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.3em] text-gray-600 font-mono uppercase mb-3">Protocol</p>
            <h2 className="font-display text-3xl font-black tracking-tight">How KRIYEX Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Connect Repo", body: "Sign in and connect your GitHub repository in one click. KRIYEX handles all the infrastructure automatically." },
              { n: "02", title: "Set Your Price", body: "Define your rental price, upload an avatar, and write a description. Your agent card goes live instantly." },
              { n: "03", title: "Earn Revenue", body: "Buyers purchase access keys via PayPal. You receive payment directly — no middlemen, no delays." },
            ].map((s) => (
              <div key={s.n} className="bg-[#060606] border border-white/4 rounded-2xl p-8 relative overflow-hidden group hover:border-white/8 transition-all">
                <span className="font-display text-6xl font-black text-white/3 absolute top-4 right-6 select-none group-hover:text-white/5 transition-colors">{s.n}</span>
                <p className="text-cyan-500 font-mono text-xs tracking-widest uppercase mb-3">{s.n}</p>
                <h3 className="font-display font-bold text-lg mb-3 tracking-tight">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-white/4 py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-black tracking-tight">Frequently Asked</h2>
          </div>
          <div className="space-y-3">
            <FAQItem q="How do I get my access key?" a="After a successful PayPal transaction, you're redirected to a page with your unique KRYV access key. Save it — it activates your agent." />
            <FAQItem q="Can I list any GitHub repository?" a="Yes. Any repo can be listed as an agent. You simply select it from your connected GitHub account and add pricing and metadata." />
            <FAQItem q="What blockchain is KRIYEX built on?" a="KRIYEX currently uses Turso (libSQL) for key management. On-chain integration is part of the KRYV roadmap." />
            <FAQItem q="Is KRIYEX free to list on?" a="Listing is free. KRIYEX earns only when you earn — we take a small protocol fee on successful transactions." />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/4 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-display font-black text-xl tracking-tight mb-1">KRIYEX<span className="text-cyan-500">.</span></p>
            <p className="text-gray-600 text-xs">Part of the <a href="https://kryv.network" target="_blank" className="text-gray-500 hover:text-white transition-colors">KRYV Network</a></p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-gray-600">
            <a href="https://kryv.network" target="_blank" className="hover:text-white transition-colors">KRYV.NETWORK</a>
            <a href="https://nehira.space" target="_blank" className="hover:text-white transition-colors">NEHIRA.SPACE</a>
            <a href="https://dryapaperhq.com" target="_blank" className="hover:text-white transition-colors">DRYAPAPERHQ</a>
            <a href="https://minden.kryv.network" target="_blank" className="hover:text-white transition-colors">MINDEN</a>
            <a href="https://genesis.kryv.network" target="_blank" className="hover:text-white transition-colors">GENESIS</a>
          </div>
          <p className="text-gray-700 text-xs font-mono">© 2026 KRIYEX · Autonomous Age</p>
        </div>
      </footer>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="bg-[#060606] border border-white/4 p-6 rounded-xl hover:border-white/8 transition-all group">
      <h3 className="font-semibold text-sm text-white/80 mb-2 group-hover:text-white transition-colors">{q}</h3>
      <p className="text-gray-600 text-xs leading-relaxed">{a}</p>
    </div>
  );
}
