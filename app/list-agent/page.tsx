"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function ListAgentPage() {
  const { isSignedIn } = useUser();
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ desc: "", price: "10", avatar: "" });
  const [status, setStatus] = useState("");

  useEffect(() => { if (isSignedIn) fetchRepos(); }, [isSignedIn]);

  async function fetchRepos() {
    const res = await fetch('/api/github/repos');
    const data = await res.json();
    if (Array.isArray(data)) setRepos(data);
    setLoading(false);
  }

  const handleFinalList = async () => {
    setStatus("🚀 Deploying to KRIYEX...");
    try {
      const res = await fetch('/api/agents/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: selectedRepo.name, 
          repoUrl: selectedRepo.html_url,
          desc: formData.desc,
          price: formData.price,
          avatar: formData.avatar
        })
      });
      if (res.ok) {
        setStatus("✅ Agent is now Live on Marketplace!");
        setSelectedRepo(null);
      } else {
        setStatus("❌ Error saving details.");
      }
    } catch (e) { setStatus("❌ Connection failed."); }
  };

  if (selectedRepo) {
    return (
      <div className="max-w-xl mx-auto bg-[#161b22] p-8 rounded-2xl border border-[#30363d] mt-10">
        <h2 className="text-2xl font-bold text-white mb-2">Configure {selectedRepo.name}</h2>
        <p className="text-[#8b949e] mb-6 text-sm">Fill in the details to list your agent.</p>
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#8b949e] uppercase mb-2">Avatar Image URL</label>
            <input type="text" className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white focus:border-[#238636] outline-none" 
              placeholder="https://imgur.com/your-image.png" onChange={(e) => setFormData({...formData, avatar: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#8b949e] uppercase mb-2">Description</label>
            <textarea className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white focus:border-[#238636] outline-none h-24" 
              placeholder="What does this agent do?" onChange={(e) => setFormData({...formData, desc: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#8b949e] uppercase mb-2">Price (USD)</label>
            <input type="number" className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white focus:border-[#238636] outline-none" 
              value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={() => setSelectedRepo(null)} className="flex-1 bg-[#21262d] text-white py-3 rounded-lg font-bold hover:bg-[#30363d]">Cancel</button>
            <button onClick={handleFinalList} className="flex-1 bg-[#238636] text-white py-3 rounded-lg font-bold hover:bg-[#2ea043]">List Agent</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Select Agent Repository</h1>
        <p className="text-[#8b949e]">Choose a repo to connect and monetize.</p>
      </div>
      {status && <div className="mb-6 p-4 bg-[#1c2128] border border-[#238636] text-[#238636] rounded-lg text-center font-bold">{status}</div>}
      <div className="grid gap-3">
        {loading ? <div className="text-center py-20 animate-pulse text-[#8b949e]">Fetching repositories...</div> : repos.map((repo: any) => (
          <div key={repo.id} className="flex justify-between items-center p-5 bg-[#161b22] border border-[#30363d] rounded-xl hover:border-[#8b949e] transition">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#238636]"></div>
              <span className="text-white font-bold">{repo.name}</span>
            </div>
            <button onClick={() => setSelectedRepo(repo)} className="bg-[#238636] px-6 py-2 rounded-lg text-white font-bold text-sm hover:bg-[#2ea043]">Connect</button>
          </div>
        ))}
      </div>
    </div>
  );
}
