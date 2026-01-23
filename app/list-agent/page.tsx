"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
// Path fix: Adjusting to relative path to avoid alias errors
import { supabase } from "../../lib/supabase"; 

export default function ListAgentPage() {
  const { isSignedIn } = useUser();
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ desc: "", price: "10", avatar: "" });
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => { if (isSignedIn) fetchRepos(); }, [isSignedIn]);

  async function fetchRepos() {
    const res = await fetch('/api/github/repos');
    const data = await res.json();
    if (Array.isArray(data)) setRepos(data);
    setLoading(false);
  }

  const handleFileUpload = async (e: any) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `agent-avatars/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setFormData({ ...formData, avatar: data.publicUrl });
      setStatus("✅ Avatar Ready!");
    } catch (error: any) {
      setStatus("❌ Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFinalList = async () => {
    if (!formData.avatar) return setStatus("⚠️ Please upload an avatar!");
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
      if (res.ok) window.location.href = "/";
    } catch (e) { setStatus("❌ Connection error"); }
  };

  if (selectedRepo) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-1">
        <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-2 text-center italic tracking-tight">Configure {selectedRepo.name}</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Set your agent's identity and pricing.</p>
          
          <div className="space-y-6">
            <div className="group relative flex flex-col items-center p-8 bg-white/5 border border-dashed border-white/20 rounded-3xl hover:border-cyan-500/50 transition-all">
              <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <div className="text-center">
                <p className="text-cyan-400 font-bold text-sm mb-1">Click to Upload Avatar</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">PNG, JPG up to 5MB</p>
              </div>
              {uploading && <div className="mt-4 animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-500"></div>}
              {formData.avatar && <img src={formData.avatar} className="mt-4 w-20 h-20 rounded-2xl border-2 border-cyan-500 object-cover shadow-[0_0_20px_rgba(6,182,212,0.3)]" />}
            </div>
            
            <textarea className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-cyan-500/50 transition-all h-28" 
              placeholder="What makes this agent special?" onChange={(e) => setFormData({...formData, desc: e.target.value})} />
            
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input type="number" className="w-full bg-white/5 border border-white/10 p-4 pl-8 rounded-2xl text-white outline-none focus:border-cyan-500/50" 
                value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
            </div>
            
            <p className="text-center text-xs font-medium text-cyan-500 animate-pulse">{status}</p>
            
            <div className="flex gap-3">
              <button onClick={() => setSelectedRepo(null)} className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-white/5 transition-all">Cancel</button>
              <button onClick={handleFinalList} className="flex-1 bg-white text-black py-4 rounded-2xl font-bold hover:bg-cyan-400 transition-all">List Now</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-white mb-2 tracking-tighter">SELECT REPOSITORY</h1>
      <p className="text-gray-500 mb-10">Choose a project to transform into a KRIYEX Agent.</p>
      <div className="grid gap-4">
        {loading ? <div className="py-20 text-center text-cyan-500 animate-pulse font-mono uppercase tracking-widest">Scanning GitHub...</div> : repos.map((repo: any) => (
          <div key={repo.id} className="flex justify-between items-center p-6 bg-[#0A0A0A] border border-white/5 rounded-3xl hover:border-cyan-500/30 transition-all group">
            <span className="text-white font-bold group-hover:text-cyan-400 transition-colors">{repo.name}</span>
            <button onClick={() => setSelectedRepo(repo)} className="bg-white/5 border border-white/10 px-6 py-2 rounded-full text-white text-xs font-bold hover:bg-white hover:text-black transition-all">Connect</button>
          </div>
        ))}
      </div>
    </div>
  );
}
