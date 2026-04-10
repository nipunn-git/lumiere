'use client';

import { 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  ArrowUpRight,
  Database,
  Search
} from 'lucide-react';
import { cn } from '@/lib/cn';

export default function DashboardOverview() {
  const stats = [
    { label: 'Total Patients', value: '48,294', change: '+2.4%', icon: Users },
    { label: 'Active Matches', value: '1,284', change: '+12.5%', icon: Sparkles },
    { label: 'Golden Records', value: '42,109', change: '+1.2%', icon: ShieldCheck },
    { label: 'Query Volume', value: '8.4K', change: '+5.7%', icon: Activity },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-black tracking-tight">System Overview</h1>
        <p className="text-neutral-500 font-medium">Welcome back, Dr. Aditya. Here&apos;s what&apos;s happening across Lumiere today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-neutral-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-neutral-50 text-neutral-400 group-hover:bg-black group-hover:text-white transition-all">
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">{stat.change}</span>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest leading-none">{stat.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-black">{stat.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-black tracking-tight">Recent Matches</h2>
            <button className="text-sm font-bold text-neutral-400 hover:text-black transition-colors flex items-center gap-1">
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          
          <div className="bg-white rounded-[32px] border border-neutral-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-50">
                  <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Patient</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Confidence</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {[
                  { name: 'Sarah Jenkins', id: 'PJ-9284', status: 'Pending', score: '98%', color: 'amber' },
                  { name: 'Michael Chen', id: 'PJ-1283', status: 'Merged', score: '94%', color: 'emerald' },
                  { name: 'Elena Rodriguez', id: 'PJ-4821', status: 'Review', score: '82%', color: 'blue' },
                  { name: 'David Smith', id: 'PJ-3102', status: 'Merged', score: '99%', color: 'emerald' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-neutral-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-black">{row.name}</span>
                        <span className="text-xs font-semibold text-neutral-400">{row.id}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={cn(
                        "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider",
                        row.color === 'emerald' ? "text-emerald-500 bg-emerald-50" :
                        row.color === 'amber' ? "text-amber-500 bg-amber-50" :
                        "text-blue-500 bg-blue-50"
                      )}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 w-16 bg-neutral-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-black rounded-full" 
                            style={{ width: row.score }}
                          />
                        </div>
                        <span className="text-xs font-bold text-black">{row.score}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <button className="text-xs font-bold text-neutral-400 group-hover:text-black transition-colors underline underline-offset-4">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-8">
          <div className="bg-black rounded-[32px] p-8 text-white space-y-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-500">
              <Database size={80} />
            </div>
            <div className="space-y-2 relative z-10">
              <h3 className="text-xl font-bold tracking-tight">Golden Record Index</h3>
              <p className="text-neutral-400 text-sm font-medium">System health is optimal. No fragmentation detected in last 24h.</p>
            </div>
            <button className="w-full py-4 rounded-2xl bg-white text-black font-bold text-sm tracking-tight relative z-10 hover:bg-neutral-100 transition-colors">
              Run Intelligence Audit
            </button>
          </div>

          <div className="bg-white rounded-[32px] p-8 border border-neutral-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-black tracking-tight">Quick Query</h3>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Ask Lumiere..." 
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-50 border border-transparent focus:bg-white focus:border-neutral-200 outline-none transition-all text-sm font-medium"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {['Completeness', 'Outliers', 'Merge Hist'].map((tag) => (
                <span key={tag} className="text-[10px] font-bold text-neutral-400 bg-neutral-50 px-2.5 py-1.5 rounded-lg border border-neutral-100 cursor-pointer hover:border-black hover:text-black transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
