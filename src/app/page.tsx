"use client";
import React, { useState } from 'react';
import BriefAnalyzer from '@/components/BriefAnalyzer';
import AssetCard from '@/components/AssetCard';
import { Plus, Sparkles, TrendingUp, Users } from 'lucide-react';

export default function Dashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockAssets = [
    { id: 1, title: 'EcoBrand Identity', type: 'Branding', tags: ['Minimalist', 'Green', 'SVG'], image: '/api/placeholder/400/300' },
    { id: 2, title: 'Fintech App UI', type: 'UI/UX', tags: ['Modern', 'Dark Mode', 'Finance'], image: '/api/placeholder/400/300' },
    { id: 3, title: 'Cyberpunk Posters', type: 'Illustration', tags: ['Brutalist', 'Neon', '3D'], image: '/api/placeholder/400/300' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">Welcome back, Alex.</h2>
          <p className="text-slate-400">The AI has analyzed 12 new job postings matching your profile today.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all">
          <Plus size={18} />
          Upload Work
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Assets" value="142" icon={<Database className="text-blue-400" />} trend="+4 this week" />
        <StatCard title="Bespoke Portfolios" value="28" icon={<Sparkles className="text-purple-400" />} trend="85% conversion" />
        <StatCard title="Profile Views" value="1.2k" icon={<TrendingUp className="text-emerald-400" />} trend="+12% vs last month" />
      </div>

      {/* Main Action: AI Brief Analyzer */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-400" size={20} />
            <h3 className="font-semibold text-lg">Generate Bespoke Portfolio</h3>
          </div>
          <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded uppercase font-bold tracking-wider">AI Powered</span>
        </div>
        <div className="p-8">
          <BriefAnalyzer onAnalyze={() => setIsAnalyzing(true)} />
        </div>
      </section>

      {/* Recent Assets / Vault Preview */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Your Recent Vault Assets</h3>
          <button className="text-indigo-400 hover:underline text-sm font-medium">View Repository</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockAssets.map((asset) => (
            <AssetCard key={asset.id} {...asset} />
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-4">
      <div className="flex justify-between items-start">
        <div className="p-2 bg-slate-800 rounded-lg">{icon}</div>
        <span className="text-xs font-medium text-slate-500 uppercase">{trend}</span>
      </div>
      <div>
        <p className="text-slate-400 text-sm">{title}</p>
        <h4 className="text-2xl font-bold">{value}</h4>
      </div>
    </div>
  );
}