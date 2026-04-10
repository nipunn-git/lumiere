'use client';

import { useState } from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';

export default function MatchesPage() {
  const [matches] = useState([
    {
      id: '1',
      nameA: 'John Emma',
      nameB: 'John E.',
      score: 96,
      fields: ['Name', 'DOB', 'Phone'],
    },
    {
      id: '2',
      nameA: 'Michael Wong',
      nameB: 'M. Wong',
      score: 88,
      fields: ['Name', 'MRN'],
    },
    {
      id: '3',
      nameA: 'Sarah Smith',
      nameB: 'S. Smith',
      score: 92,
      fields: ['Name', 'Address', 'Email'],
    },
  ]);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-semibold text-black mb-3 tracking-tight">
            Match Duplicates
          </h1>
          <p className="text-neutral-600 text-lg">
            AI-powered duplicate detection across all data sources
          </p>
        </div>

        <div className="space-y-6">
          {matches.map((match) => (
            <div
              key={match.id}
              className="group p-6 rounded-2xl bg-white border border-black/10 hover:border-black/25 backdrop-blur transition-all duration-300 hover:shadow-lg overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6 pb-6 border-b border-black/10">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-neutral-500 uppercase mb-2">Record A</p>
                    <p className="text-xl font-bold text-black">{match.nameA}</p>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-black">{match.score}%</span>
                      <p className="text-xs text-neutral-500">match</p>
                    </div>
                  </div>

                  <div className="flex-1 text-right md:text-right">
                    <p className="text-xs font-semibold text-neutral-500 uppercase mb-2">Record B</p>
                    <p className="text-xl font-bold text-black">{match.nameB}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold text-neutral-500 mb-3">Matched Fields:</p>
                  <div className="flex flex-wrap gap-2">
                    {match.fields.map((field) => (
                      <span
                        key={field}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-black/5 text-black border border-black/15"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2.5 rounded-lg bg-black text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-neutral-800">
                    <CheckCircle size={18} />
                    Confirm Merge
                  </button>
                  <button className="px-4 py-2.5 rounded-lg bg-white border border-black/20 text-black hover:bg-black/5 font-semibold transition-all duration-300">
                    Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {matches.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-lg">No pending matches found</p>
          </div>
        )}
      </div>
    </div>
  );
}
