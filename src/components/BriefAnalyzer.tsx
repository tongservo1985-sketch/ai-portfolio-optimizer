"use client";
import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface BriefAnalyzerProps {
  onAnalyze: () => void;
}

const BriefAnalyzer = ({ onAnalyze }: BriefAnalyzerProps) => {
  const [brief, setBrief] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    if (!brief) return;
    setIsLoading(true);
    // Simulate AI Processing
    setTimeout(() => {
      setIsLoading(false);
      onAnalyze();
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-300">
        Paste Job Description, Client Email, or Project Brief
      </label>
      <div className="relative">
        <textarea
          className="w-full h-40 bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
          placeholder="e.g. We are looking for a designer to help us rebrand our sustainable fashion startup. We need a minimalist aesthetic with earthy tones and experience in e-commerce UI..."
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
        />
        <div className="absolute bottom-4 right-4 text-xs text-slate-500">
          AI will extract: Style, Industry, Deliverables
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleGenerate}
          disabled={!brief || isLoading}
          className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-600/20"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              AI Analyzing Brief...
            </>
          ) : (
            <>
              <Search size={20} />
              Match Portfolio
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BriefAnalyzer;