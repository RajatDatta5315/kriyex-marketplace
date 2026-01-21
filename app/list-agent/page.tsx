"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase"; // Make sure lib/supabase.ts is ready

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
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `agent-avatars/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setFormData({ ...formData, avatar: data.publicUrl });
      setStatus("✅ Image Uploaded to Supabase!");
    } catch (error: any) {
      setStatus("❌ Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFinalList = async () => {
    if (!formData.avatar) return setStatus("⚠️ Upload avatar first!");
    setStatus("🚀 Deploying...");
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
  };

  if (selectedRepo) {
    return (
      <div className="max-w-xl mx-auto bg-[#161b22] p-6 rounded-2xl border border-[#30363d] mt-10 mx-4">
        <h2 className="text-xl font-bold text-white mb-6 text-center text-green-500">List {selectedRepo.name}</h2>
        <div className="space-y-4">
          <div className="flex flex-col items-center p-6 bg-[#0d1117] rounded-xl border border-dashed border-[#30363d]">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload}
              className="text-xs text-[#8b949e] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-500 cursor-pointer"
            />
            {uploading && <p className="text-xs text-yellow-500 mt-2">Uploading...</p>}
            {formData.avatar && <img src={formData.avatar} className="mt-4 w-16 h-16 rounded-full border-2 border-green-500 shadow-lg shadow-green-900/20" />}
          </div>
          
          <textarea className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white text-sm outline-none focus:border-green-500" 
            placeholder="Describe what your agent does..." onChange={(e) => setFormData({...formData, desc: e.target.value})} />
          
          <input type="number" className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white" 
            value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
          
          <p className="text-center text-xs font-bold text-yellow-500">{status}</p>
          <div className="flex gap-2">
            <button onClick={() => setSelectedRepo(null)} className="flex-1 bg-red-900/10 text-red-500 py-3 rounded-lg font-bold">Back</button>
            <button onClick={handleFinalList} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold active:scale-95 transition">List Agent</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">Connect Your Code</h1>
      {loading ? <p className="animate-pulse text-[#8b949e]">Scanning GitHub...</p> : repos.map((repo: any) => (
        <div key={repo.id} className="flex justify-between items-center p-4 bg-[#161b22] border border-[#30363d] rounded-xl mb-3 shadow-sm active:border-green-500">
          <span className="text-white font-bold text-sm truncate">{repo.name}</span>
          <button onClick={() => setSelectedRepo(repo)} className="bg-green-600 px-5 py-2 rounded-lg text-white text-xs font-bold shrink-0">Connect</button>
        </div>
      ))}
    </div>
  );
}
