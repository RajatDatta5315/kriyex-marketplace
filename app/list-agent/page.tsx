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
    setStatus("🚀 Listing on KRIYEX...");
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
      setStatus("✅ Agent Live!");
      setSelectedRepo(null);
    }
  };

  if (selectedRepo) {
    return (
      <div className="max-w-xl mx-auto bg-[#161b22] p-8 rounded-2xl border border-[#30363d]">
        <h2 className="text-2xl font-bold text-white mb-6">Setup {selectedRepo.name}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#8b949e] mb-2">Avatar URL</label>
            <input type="text" className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white" 
              placeholder="https://..." onChange={(e) => setFormData({...formData, avatar: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-[#8b949e] mb-2">Short Description</label>
            <textarea className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white" 
              onChange={(e) => setFormData({...formData, desc: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-[#8b949e] mb-2">Price ($ per hour)</label>
            <input type="number" className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white" 
              value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
          </div>
          <button onClick={handleFinalList} className="w-full bg-[#238636] text-white py-3 rounded-lg font-bold">List Agent</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-white mb-8">Select Repo</h1>
      <div className="grid gap-3">
        {loading ? <p>Loading...</p> : repos.map((repo: any) => (
          <div key={repo.id} className="flex justify-between items-center p-5 bg-[#161b22] border border-[#30363d] rounded-xl">
            <span className="text-white font-bold">{repo.name}</span>
            <button onClick={() => setSelectedRepo(repo)} className="bg-[#238636] px-4 py-2 rounded-lg text-white font-bold text-sm">Connect</button>
          </div>
        ))}
      </div>
    </div>
  );
}
