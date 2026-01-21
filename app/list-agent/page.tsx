"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";

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
    if (!formData.avatar) return setStatus("⚠️ Please upload an avatar first!");
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
      }
    } catch (e) { setStatus("❌ Connection failed."); }
  };

  if (selectedRepo) {
    return (
      <div className="max-w-xl mx-auto bg-[#161b22] p-8 rounded-2xl border border-[#30363d] mt-10">
        <h2 className="text-2xl font-bold text-white mb-6">Setup {selectedRepo.name}</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-[#0d1117] rounded-xl border border-dashed border-[#30363d] flex flex-col items-center">
            <label className="text-xs font-bold text-[#8b949e] uppercase mb-4">Agent Avatar</label>
            <UploadButton<OurFileRouter, "imageUploader">
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setFormData({ ...formData, avatar: res[0].url });
                setStatus("✅ Image Uploaded!");
              }}
              onUploadError={(error: Error) => setStatus(`❌ Error: ${error.message}`)}
            />
            {formData.avatar && <img src={formData.avatar} className="mt-4 w-16 h-16 rounded-full border border-green-500" />}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8b949e] uppercase mb-2">Description</label>
            <textarea className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white focus:border-[#238636] outline-none h-24" 
              placeholder="What does this agent do?" onChange={(e) => setFormData({...formData, desc: e.target.value})} />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8b949e] uppercase mb-2">Price (USD)</label>
            <input type="number" className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white" 
              value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
          </div>

          <div className="flex gap-3">
            <button onClick={() => setSelectedRepo(null)} className="flex-1 bg-[#21262d] text-white py-3 rounded-lg font-bold">Cancel</button>
            <button onClick={handleFinalList} className="flex-1 bg-[#238636] text-white py-3 rounded-lg font-bold hover:bg-[#2ea043]">List Agent</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Select Agent Repository</h1>
      {status && <div className="mb-6 p-4 bg-[#1c2128] border border-[#238636] text-[#238636] rounded-lg text-center font-bold">{status}</div>}
      <div className="grid gap-3">
        {loading ? <p className="text-white">Loading...</p> : repos.map((repo: any) => (
          <div key={repo.id} className="flex justify-between items-center p-5 bg-[#161b22] border border-[#30363d] rounded-xl">
            <span className="text-white font-bold">{repo.name}</span>
            <button onClick={() => setSelectedRepo(repo)} className="bg-[#238636] px-6 py-2 rounded-lg text-white font-bold text-sm">Connect</button>
          </div>
        ))}
      </div>
    </div>
  );
}
