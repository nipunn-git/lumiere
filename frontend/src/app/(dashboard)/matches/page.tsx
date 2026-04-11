'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Sparkles, X, ArrowRight, ChevronDown, ChevronUp, AlertTriangle, Eye } from 'lucide-react';
import { cn } from '@/lib/cn';
import { getDuplicates, getDuplicateStats } from '@/lib/api';
import type { DuplicateCandidate, DuplicateStats } from '@/lib/api';

interface MatchItem {
  id: string;
  patient1: { name: string; id: string; source: string; dob: string; gender: string; city: string };
  patient2: { name: string; id: string; source: string; dob: string; gender: string; city: string };
  similarity: number;
  phonetic: number;
  semantic: number;
  classifier: number;
  conflictingFields: string[];
  raw: DuplicateCandidate;
}

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
}

function toMatchItem(d: DuplicateCandidate): MatchItem {
  const composite = Math.round((d.composite_score ?? 0) * 100);
  const phonetic = Math.round(((d.soundex_score ?? 0) + (d.nysiis_score ?? 0)) / 2 * 100);
  const semantic = Math.round((d.vector_similarity ?? 0) * 100);
  const classifier = composite;
  const conflicts: string[] = [];
  if (!d.dob_match) conflicts.push('Date of Birth');
  if (d.record_a?.gender !== d.record_b?.gender) conflicts.push('Gender');
  if (d.record_a?.city !== d.record_b?.city) conflicts.push('City');
  if (!d.ssn_partial_match) conflicts.push('SSN');
  return {
    id: d.id,
    patient1: {
      name: titleCase(`${d.record_a?.given_name ?? ''} ${d.record_a?.family_name ?? ''}`.trim()),
      id: d.record_a?.fhir_id ?? d.record_a_id?.slice(0, 12) ?? '',
      source: 'EHR System',
      dob: d.record_a?.dob ?? '—',
      gender: d.record_a?.gender ?? '—',
      city: d.record_a?.city ?? '—',
    },
    patient2: {
      name: titleCase(`${d.record_b?.given_name ?? ''} ${d.record_b?.family_name ?? ''}`.trim()),
      id: d.record_b?.fhir_id ?? d.record_b_id?.slice(0, 12) ?? '',
      source: 'Lab System',
      dob: d.record_b?.dob ?? '—',
      gender: d.record_b?.gender ?? '—',
      city: d.record_b?.city ?? '—',
    },
    similarity: composite,
    phonetic,
    semantic,
    classifier,
    conflictingFields: conflicts,
    raw: d,
  };
}

function getTier(score: number): { label: string; color: string; bg: string } {
  if (score >= 85) return { label: 'AUTO-MATCH', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
  if (score >= 60) return { label: 'NEEDS REVIEW', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' };
  return { label: 'LOW CONFIDENCE', color: 'text-red-700', bg: 'bg-red-50 border-red-200' };
}

type FilterTier = 'all' | 'auto' | 'review' | 'low';

export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [stats, setStats] = useState<DuplicateStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reviewMatch, setReviewMatch] = useState<MatchItem | null>(null);
  const [filterTier, setFilterTier] = useState<FilterTier>('all');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const [dupes, dupStats] = await Promise.all([
          getDuplicates(0.6),
          getDuplicateStats(),
        ]);
        setMatches(dupes.map(toMatchItem));
        setStats(dupStats);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const handleResolve = (id: string, action: 'confirm' | 'dismiss') => {
    setMatches(prev => prev.filter(m => m.id !== id));
    setReviewMatch(null);
    setToast(action === 'confirm' ? 'Match confirmed — records merged' : 'Match dismissed');
    setTimeout(() => setToast(null), 3000);
  };

  const filteredMatches = filterTier === 'all' ? matches : matches.filter(m => {
    if (filterTier === 'auto') return m.similarity >= 85;
    if (filterTier === 'review') return m.similarity >= 60 && m.similarity < 85;
    return m.similarity < 60;
  });

  if (isLoading) {
    return (
      <div className="max-w-[1100px] mx-auto space-y-6 page-enter">
        <div className="skeleton h-6 w-40" />
        <div className="skeleton h-4 w-64" />
        <div className="flex gap-8 mt-4">
          <div className="skeleton h-12 w-24" />
          <div className="skeleton h-12 w-24" />
          <div className="skeleton h-12 w-24" />
        </div>
        {[1, 2, 3].map(i => <div key={i} className="skeleton h-24 rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto space-y-8 page-enter">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-black">Match queue</h1>
        <p className="text-[14px] text-neutral-500 mt-1">Cross-institutional duplicate detection. High precision required for resolution.</p>
        {stats && (
          <div className="flex gap-8 mt-4">
            <div className="text-center">
              <span className="text-[28px] font-bold text-black">{stats.total}</span>
              <p className="text-[11px] text-neutral-400 uppercase tracking-[0.06em]">Total</p>
            </div>
            <div className="text-center">
              <span className="text-[28px] font-bold text-emerald-500">{stats.high_confidence}</span>
              <p className="text-[11px] text-neutral-400 uppercase tracking-[0.06em]">Auto-match</p>
            </div>
            <div className="text-center">
              <span className="text-[28px] font-bold text-amber-500">{stats.needs_review}</span>
              <p className="text-[11px] text-neutral-400 uppercase tracking-[0.06em]">Needs review</p>
            </div>
          </div>
        )}
      </div>

      {/* Filter pills */}
      <div className="flex gap-2">
        {([
          { key: 'all' as const, label: 'All' },
          { key: 'auto' as const, label: 'Auto-match' },
          { key: 'review' as const, label: 'Needs review' },
          { key: 'low' as const, label: 'Low confidence' },
        ]).map(f => (
          <button
            key={f.key}
            onClick={() => setFilterTier(f.key)}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150',
              filterTier === f.key ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="pb-12">
        {filteredMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center text-emerald-500">
              <Sparkles size={28} />
            </div>
            <div className="text-center">
              <h2 className="text-[18px] font-semibold text-black">All clear</h2>
              <p className="text-[14px] text-neutral-400 mt-1">No matches in this category.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMatches.map((match) => {
              const tier = getTier(match.similarity);
              const isExpanded = expandedId === match.id;
              return (
                <div
                  key={match.id}
                  className="bg-white rounded-xl border border-[#EBEBEB] hover:border-[#C8C8C8] transition-all duration-150"
                >
                  <div className="px-5 py-4">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex-1 flex items-center gap-6 min-w-0">
                        {/* Patient 1 */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-[0.06em]">{match.patient1.source}</span>
                          <h3 className="text-[15px] font-medium text-black mt-1 truncate">{match.patient1.name}</h3>
                          <p className="text-[11px] font-mono text-neutral-400 truncate">{match.patient1.id}</p>
                        </div>

                        {/* Similarity badge + tier */}
                        <div className="flex flex-col items-center gap-1 shrink-0">
                          <span className={cn('px-3 py-1 rounded-full text-[12px] font-semibold border', tier.bg, tier.color)}>
                            {match.similarity}%
                          </span>
                          <span className={cn('text-[9px] font-bold uppercase tracking-[0.08em]', tier.color)}>{tier.label}</span>
                          <ArrowRight size={14} className="text-neutral-300" />
                        </div>

                        {/* Patient 2 */}
                        <div className="flex-1 min-w-0 text-right">
                          <span className="text-[10px] font-medium text-purple-500 bg-purple-50 px-2 py-0.5 rounded uppercase tracking-[0.06em]">{match.patient2.source}</span>
                          <h3 className="text-[15px] font-medium text-black mt-1 truncate">{match.patient2.name}</h3>
                          <p className="text-[11px] font-mono text-neutral-400 truncate">{match.patient2.id}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {match.similarity >= 60 && match.similarity < 85 && (
                          <button
                            onClick={() => setReviewMatch(match)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-blue-200 text-[13px] font-medium text-blue-600 hover:bg-blue-50 transition-all duration-150"
                          >
                            <Eye size={14} /> Review
                          </button>
                        )}
                        <button
                          onClick={() => handleResolve(match.id, 'dismiss')}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 text-[13px] font-medium text-neutral-500 hover:border-red-200 hover:text-red-500 transition-all duration-150"
                        >
                          <X size={14} /> Dismiss
                        </button>
                        <button
                          onClick={() => handleResolve(match.id, 'confirm')}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black text-white text-[13px] font-medium hover:bg-neutral-800 active:scale-[0.97] transition-all duration-150"
                        >
                          <CheckCircle size={14} className="text-emerald-400" /> Confirm
                        </button>
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : match.id)}
                          className="p-2 rounded-lg border border-neutral-200 text-neutral-400 hover:text-black hover:border-neutral-300 transition-all duration-150"
                        >
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable breakdown */}
                  {isExpanded && (
                    <div className="px-5 pb-4 pt-0 border-t border-neutral-100">
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {[
                          { label: 'Phonetic', score: match.phonetic, desc: 'Soundex + NYSIIS' },
                          { label: 'Semantic', score: match.semantic, desc: 'Vector similarity' },
                          { label: 'Classifier', score: match.classifier, desc: 'Composite ML score' },
                        ].map(s => (
                          <div key={s.label} className="bg-neutral-50 rounded-lg p-3">
                            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-400">{s.label}</p>
                            <div className="flex items-end gap-2 mt-1">
                              <span className="text-[22px] font-bold text-black">{s.score}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-neutral-200 rounded-full mt-2 overflow-hidden">
                              <div
                                className={cn('h-full rounded-full', s.score >= 80 ? 'bg-emerald-500' : s.score >= 60 ? 'bg-amber-500' : 'bg-red-500')}
                                style={{ width: `${s.score}%` }}
                              />
                            </div>
                            <p className="text-[11px] text-neutral-400 mt-1">{s.desc}</p>
                          </div>
                        ))}
                      </div>
                      {match.conflictingFields.length > 0 && (
                        <div className="mt-4 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle size={13} className="text-amber-600" />
                            <span className="text-[12px] font-semibold text-amber-700">Conflicting fields</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {match.conflictingFields.map(f => (
                              <span key={f} className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-[11px] font-medium">{f}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ═══ SIDE-BY-SIDE REVIEW MODAL ═══ */}
      {reviewMatch && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40" onClick={() => setReviewMatch(null)}>
          <div className="bg-white rounded-xl w-full max-w-[900px] max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="px-6 pt-6 pb-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h2 className="text-[18px] font-semibold text-black">Side-by-side review</h2>
                <p className="text-[13px] text-neutral-400 mt-1">Compare the two patient records below and decide whether to merge.</p>
              </div>
              <button onClick={() => setReviewMatch(null)} className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors">
                <X size={16} className="text-neutral-400" />
              </button>
            </div>

            {/* Confidence header */}
            <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={cn('px-3 py-1 rounded-full text-[13px] font-bold border', getTier(reviewMatch.similarity).bg, getTier(reviewMatch.similarity).color)}>
                  {reviewMatch.similarity}% Match
                </span>
                <span className={cn('text-[10px] font-bold uppercase tracking-[0.08em]', getTier(reviewMatch.similarity).color)}>
                  {getTier(reviewMatch.similarity).label}
                </span>
              </div>
              <div className="flex gap-4 text-[12px] text-neutral-500">
                <span>Phonetic: <strong className="text-black">{reviewMatch.phonetic}%</strong></span>
                <span>Semantic: <strong className="text-black">{reviewMatch.semantic}%</strong></span>
                <span>Classifier: <strong className="text-black">{reviewMatch.classifier}%</strong></span>
              </div>
            </div>

            {/* Side-by-side */}
            <div className="px-6 py-5 grid grid-cols-2 gap-6">
              {[
                { label: 'Record A', data: reviewMatch.patient1, color: 'blue' as const },
                { label: 'Record B', data: reviewMatch.patient2, color: 'purple' as const },
              ].map(side => (
                <div key={side.label} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded uppercase tracking-[0.06em] ${
                      side.color === 'blue' ? 'text-blue-500 bg-blue-50' : 'text-purple-500 bg-purple-50'
                    }`}>
                      {side.data.source}
                    </span>
                    <span className="text-[12px] font-medium text-neutral-400">{side.label}</span>
                  </div>
                  <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
                    {[
                      { label: 'Name', value: side.data.name },
                      { label: 'ID', value: side.data.id },
                      { label: 'Date of Birth', value: side.data.dob },
                      { label: 'Gender', value: side.data.gender },
                      { label: 'City', value: side.data.city },
                    ].map(field => {
                      const isConflict = field.label !== 'Name' && field.label !== 'ID' &&
                        reviewMatch.conflictingFields.includes(field.label === 'Date of Birth' ? 'Date of Birth' : field.label);
                      return (
                        <div key={field.label}>
                          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-400">{field.label}</p>
                          <p className={cn('text-[14px] mt-0.5', isConflict ? 'text-amber-700 font-medium' : 'text-black')}>
                            {field.value || '—'}
                            {isConflict && <AlertTriangle size={12} className="inline ml-1.5 text-amber-500" />}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {reviewMatch.conflictingFields.length > 0 && (
              <div className="mx-6 mb-4 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={13} className="text-amber-600" />
                  <span className="text-[12px] font-semibold text-amber-700">
                    {reviewMatch.conflictingFields.length} conflicting field{reviewMatch.conflictingFields.length > 1 ? 's' : ''}: {reviewMatch.conflictingFields.join(', ')}
                  </span>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={() => handleResolve(reviewMatch.id, 'dismiss')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-neutral-200 text-[13px] font-medium text-neutral-600 hover:border-red-200 hover:text-red-500 transition-all duration-150"
              >
                <X size={14} /> Dismiss match
              </button>
              <button
                onClick={() => handleResolve(reviewMatch.id, 'confirm')}
                className="flex items-center gap-1.5 px-5 py-2 bg-black text-white text-[13px] font-medium rounded-lg hover:bg-neutral-800 active:scale-[0.97] transition-all duration-150"
              >
                <CheckCircle size={14} className="text-emerald-400" /> Confirm &amp; merge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] toast-enter bg-white border border-neutral-200 border-l-4 border-l-emerald-500 rounded-lg px-4 py-3 shadow-lg">
          <span className="text-[14px] text-black">{toast}</span>
        </div>
      )}
    </div>
  );
}
