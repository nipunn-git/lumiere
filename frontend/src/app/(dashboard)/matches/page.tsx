'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Sparkles, X, BrainCircuit, Info, Files, ArrowRight, CornerDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MatchItem {
  id: string;
  patient1: { name: string, id: string, source: string };
  patient2: { name: string, id: string, source: string };
  similarity: number;
  reasons: string[];
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/hitl/queue');
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFD]">
        <div className="w-6 h-6 border-2 border-neutral-100 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col space-y-1 px-4 text-center items-center">
        <h1 className="text-3xl font-black text-black tracking-tightest uppercase">Match Queue</h1>
        <p className="text-neutral-400 font-bold text-base max-w-2xl">Cross-institutional duplicate detection engine. High precision required for resolution.</p>
      </div>

      <div className="px-4 pb-20">
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-24 space-y-6">
            <div className="w-20 h-20 rounded-[32px] bg-white border border-neutral-50 shadow-sm flex items-center justify-center text-emerald-500">
              <Sparkles size={32} />
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-black tracking-tightest uppercase">Consensus Reached</h2>
              <p className="text-neutral-300 font-bold text-sm tracking-tight">All fragmented records have been synthesized into Golden Identities.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
             {matches.map((match) => (
                <div key={match.id} className="bg-white rounded-[32px] border border-neutral-100 p-8 shadow-sm hover:shadow-xl transition-all group">
                   <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                      <div className="flex-1 flex items-center justify-between w-full">
                         <div className="space-y-3">
                            <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-3 py-1 rounded-lg uppercase tracking-widest">{match.patient1.source}</span>
                            <h3 className="text-lg font-black text-black tracking-tight uppercase">{match.patient1.name}</h3>
                            <p className="text-[10px] font-bold text-neutral-300 tracking-widest">{match.patient1.id}</p>
                         </div>
                         <div className="flex flex-col items-center gap-2">
                            <div className="px-4 py-1.5 rounded-full bg-neutral-900 text-white text-[10px] font-black tracking-widest">
                               {match.similarity}% SYNC
                            </div>
                            <ArrowRight size={16} className="text-neutral-200" />
                         </div>
                         <div className="space-y-3 text-right">
                            <span className="text-[10px] font-black text-purple-500 bg-purple-50 px-3 py-1 rounded-lg uppercase tracking-widest">{match.patient2.source}</span>
                            <h3 className="text-lg font-black text-black tracking-tight uppercase">{match.patient2.name}</h3>
                            <p className="text-[10px] font-bold text-neutral-300 tracking-widest">{match.patient2.id}</p>
                         </div>
                      </div>

                      <div className="flex gap-3">
                         <button className="px-6 py-3 rounded-2xl border border-neutral-100 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-red-500 hover:border-red-100 transition-all flex items-center gap-2">
                            <X size={14} /> Refuse Sync
                         </button>
                         <button className="px-6 py-3 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-widest hover:shadow-2xl transition-all flex items-center gap-2">
                            <CheckCircle size={14} className="text-emerald-400" /> Confirm Synthesis
                         </button>
                      </div>
                   </div>
                </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
