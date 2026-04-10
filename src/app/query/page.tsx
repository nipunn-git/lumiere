'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function QueryPage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const suggestions = [
    'What medications is the patient currently on?',
    'When was the last cardiology visit?',
    'Summarize the patient medical history',
    'Are there any recent lab results?',
  ];

  const handleQuery = async () => {
    if (!query.trim()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse(
        'Based on the unified golden record, the patient is currently on Lisinopril 10mg daily and Metformin 500mg twice daily for diabetes management. The most recent cardiology checkup was on January 15, 2024, with normal results.'
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-semibold text-black mb-3 tracking-tight">
            Ask Lumiere
          </h1>
          <p className="text-neutral-600 text-lg">
            Query patient records in natural language powered by AI
          </p>
        </div>

        <div className="mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-black/10 opacity-20 rounded-xl blur-xl group-hover:opacity-35 transition-opacity"></div>
            <div className="relative p-6 rounded-xl bg-white border border-black/10 backdrop-blur shadow-sm">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleQuery();
                  }
                }}
                placeholder="e.g., What are the patient's current medications? When was the last visit?"
                className="w-full bg-transparent text-black placeholder-neutral-500 outline-none resize-none text-lg"
                rows={4}
              />
              <button
                onClick={handleQuery}
                disabled={loading || !query.trim()}
                className="absolute bottom-6 right-6 w-12 h-12 rounded-lg bg-black text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:bg-neutral-800"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {!response && (
          <div className="mb-12">
            <p className="text-neutral-500 text-sm font-semibold mb-4">Try asking:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setQuery(suggestion);
                  }}
                  className="p-4 text-left rounded-lg bg-white border border-black/10 text-neutral-700 hover:border-black/25 hover:text-black transition-all duration-300 hover:shadow-sm text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="p-8 rounded-xl bg-white border border-black/10 backdrop-blur">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
              <span className="text-neutral-700">Searching patient records...</span>
            </div>
          </div>
        )}

        {response && !loading && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border border-black/10 backdrop-blur">
              <p className="text-neutral-800 leading-relaxed text-lg">{response}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white border border-black/10">
                <p className="text-sm font-semibold text-neutral-500 mb-3">Confidence</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-black font-bold text-2xl">94%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-black" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white border border-black/10">
                <p className="text-sm font-semibold text-neutral-500 mb-3">Data Sources</p>
                <div className="space-y-2">
                  {['EHR System', 'Lab Database', 'Pharmacy Records'].map((source) => (
                    <div key={source} className="flex items-center gap-2 text-neutral-700 text-sm">
                      <span className="w-2 h-2 bg-black rounded-full"></span>
                      {source}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setQuery('');
                setResponse(null);
              }}
              className="w-full px-6 py-3 rounded-lg bg-white border border-black text-black font-semibold hover:bg-black/5 transition-all duration-300"
            >
              Ask Another Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
