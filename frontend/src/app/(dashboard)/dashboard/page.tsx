'use client';

import { 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  ArrowUpRight,
  Database,
  FileText,
  Calendar,
  Heart,
  ClipboardList,
  CheckCircle2,
  Zap,
  Waves,
  Plus,
  Fingerprint
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function DashboardOverview() {
  const [role, setRole] = useState("clinician");
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    const savedProfile = localStorage.getItem('userProfile');
    
    if (savedRole) setRole(savedRole);
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserName(profile.fullName || "User");
    }
  }, []);

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD]">
      {role === 'patient' ? (
        <PatientDashboard userName={userName} />
      ) : (
        <ClinicianDashboard userName={userName} navigateTo={navigateTo} />
      )}
    </div>
  );
}

function ClinicianDashboard({ userName, navigateTo }: { userName: string, navigateTo: (path: string) => void }) {
  const [liveStats, setLiveStats] = useState({ totalPatients: '0', activeMatches: '0', goldenRecords: '0' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [recRes, queueRes] = await Promise.all([
          fetch('http://localhost:3001/api/records'),
          fetch('http://localhost:3001/api/hitl/queue')
        ]);
        const records = await recRes.json();
        const queue = await queueRes.json();
        setLiveStats({
          totalPatients: records.length.toString(),
          activeMatches: queue.length.toString(),
          goldenRecords: records.length.toString()
        });
      } catch (e) {
        console.error('Stats fetch failed', e);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Patients', value: liveStats.totalPatients, change: '+2.4%', icon: Users, color: 'text-blue-500' },
    { label: 'Resolutions', value: liveStats.activeMatches, change: '+12.5%', icon: Sparkles, color: 'text-purple-500' },
    { label: 'Synthesized', value: liveStats.goldenRecords, change: '+1.2%', icon: ShieldCheck, color: 'text-emerald-500' },
    { label: 'Core Query', value: '8.4K', change: '+5.7%', icon: Activity, color: 'text-amber-500' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col space-y-1 px-4">
        <h1 className="text-3xl font-black text-black tracking-tightest">System Overview</h1>
        <p className="text-neutral-400 font-bold text-base">Morning, {userName.split(' ')[0] || 'Doctor'}. Intelligence streams are synchronized.</p>
      </div>

      {/* Stats - Refined Font Sizes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[24px] border border-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.03)] transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-neutral-50 transition-colors group-hover:bg-black group-hover:text-white", stat.color)}>
                <stat.icon size={16} />
              </div>
              <span className="text-[10px] font-black text-neutral-300 tracking-widest leading-none">{stat.change}</span>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-black tracking-tightest">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-4 pb-20">
        <div className="lg:col-span-12 space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-black tracking-tightest">Synthesized Delta</h2>
            <button 
              onClick={() => navigateTo('/matches')}
              className="text-[10px] font-black text-neutral-300 hover:text-black transition-colors flex items-center gap-1.5 uppercase tracking-widest"
            >
              Expand Stream <ArrowUpRight size={12} />
            </button>
          </div>
          
          <div className="bg-white rounded-[32px] border border-neutral-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50/50">
                  <th className="px-10 py-4 text-[10px] font-black text-neutral-300 uppercase tracking-widest">Master Identity</th>
                  <th className="px-10 py-4 text-[10px] font-black text-neutral-300 uppercase tracking-widest">State</th>
                  <th className="px-10 py-4 text-[10px] font-black text-neutral-300 uppercase tracking-widest">Precision</th>
                  <th className="px-10 py-4 text-[10px] font-black text-neutral-300 uppercase tracking-widest text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {[
                  { name: 'Sarah Jenkins', id: 'GR-9284', status: 'Pending', score: 98, color: 'blue' },
                  { name: 'Michael Chen', id: 'GR-1283', status: 'Resolved', score: 94, color: 'emerald' },
                  { name: 'Elena Rodriguez', id: 'GR-4821', status: 'Review', score: 82, color: 'amber' },
                  { name: 'David Smith', id: 'GR-3102', status: 'Resolved', score: 99, color: 'emerald' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-neutral-50 transition-all group cursor-default">
                    <td className="px-10 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-black tracking-tight group-hover:text-blue-500 transition-colors uppercase">{row.name}</span>
                        <span className="text-[9px] font-bold text-neutral-200 tracking-widest">{row.id}</span>
                      </div>
                    </td>
                    <td className="px-10 py-5">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-1 h-1 rounded-full", 
                          row.color === 'emerald' ? "bg-emerald-500" :
                          row.color === 'amber' ? "bg-amber-500" : "bg-blue-500"
                        )} />
                        <span className="text-[11px] font-bold text-neutral-400">{row.status}</span>
                      </div>
                    </td>
                    <td className="px-10 py-5 text-xs font-black text-black tracking-tight">{row.score}%</td>
                    <td className="px-10 py-5 text-right">
                      <button className="p-2 rounded-lg hover:bg-neutral-200 text-neutral-200 hover:text-black transition-all">
                        <Plus size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
             {[
               { label: 'Global Density', value: 'High', color: 'text-blue-500' },
               { label: 'Synthesis Latency', value: '0.4ms', color: 'text-emerald-500' },
               { label: 'Relay Status', value: 'Active', color: 'text-purple-500' }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center justify-center p-8 rounded-[32px] bg-white border border-neutral-100 shadow-sm text-center space-y-2">
                  <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest leading-none">{item.label}</p>
                  <p className={cn("text-xl font-black", item.color)}>{item.value}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PatientDashboard({ userName }: { userName: string }) {
  const stats = [
    { label: 'Artifacts', value: '12', icon: FileText, color: 'text-blue-600' },
    { label: 'Counsel', value: '03', icon: Calendar, color: 'text-purple-600' },
    { label: 'Vitals Score', value: '94', icon: Heart, color: 'text-rose-600' },
    { label: 'Schemas', value: '02', icon: ClipboardList, color: 'text-emerald-600' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-12 animate-in fade-in duration-1000 px-4">
      <div className="flex flex-col space-y-1 pt-4">
        <h1 className="text-3xl font-black text-black tracking-tightest">Personal Registry</h1>
        <p className="text-neutral-400 font-bold text-base uppercase tracking-tightest opacity-60">Welcome back, {userName.split(' ')[0] || 'Patient'}. Your records are synthesized.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[28px] border border-neutral-100 shadow-sm hover:shadow-md transition-all group">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-neutral-50 group-hover:bg-black group-hover:text-white transition-all mb-4", stat.color)}>
              <stat.icon size={16} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-black tracking-tightest">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-20">
        <div className="lg:col-span-8 space-y-6">
           <h2 className="text-xl font-black text-black tracking-tightest px-4">Event Sequence</h2>
           <div className="bg-white rounded-[40px] border border-neutral-100 p-8 space-y-8 shadow-sm">
             {[
               { title: 'Standard Pathology', provider: 'Metropolitan Hospital', date: '3m ago', sub: 'Comprehensive blood panel synthesized.' },
               { title: 'Identity Audit', provider: 'Lumiere AI', date: '2h ago', sub: 'Verified duplicate merge from Urgent Care source.' },
               { title: 'Cardiology Dispatch', provider: 'Main Clinic', date: '1d ago', sub: 'Echo-cardiogram results relaying to Master Record.' }
             ].map((item, i) => (
               <div key={i} className="flex gap-8 relative group">
                 <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full border-4 border-black bg-white z-10 transition-transform group-hover:scale-125 shadow-sm" />
                    {i !== 2 && <div className="absolute top-3 bottom-[-32px] w-0.5 bg-neutral-50" />}
                 </div>
                 <div className="space-y-1 content-start flex-1">
                    <p className="text-[9px] font-black text-neutral-200 uppercase tracking-widest">{item.date}</p>
                    <div className="p-6 rounded-[24px] bg-neutral-50 hover:bg-white transition-all border border-transparent hover:border-neutral-100 cursor-default">
                       <h4 className="text-base font-black text-black tracking-tight leading-none uppercase">{item.title}</h4>
                       <p className="text-[11px] font-bold text-neutral-400 italic mt-1">{item.provider}</p>
                       <p className="text-[11px] text-neutral-300 mt-2 font-medium leading-relaxed">{item.sub}</p>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-neutral-900 rounded-[40px] p-8 text-white space-y-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 group-hover:rotate-12 transition-transform duration-1000">
                 <Waves size={80} />
              </div>
              <h3 className="text-xl font-black tracking-tightest leading-tight relative z-10 uppercase">Intelligence Summary</h3>
              <p className="text-neutral-400 text-sm font-bold leading-relaxed relative z-10 opacity-80">Lumiere AI is processing your patterns. High sequence stability detected.</p>
              <button className="w-full py-4 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all relative z-10 border border-white shadow-xl">Review Patterns</button>
           </div>
           
           <div className="p-6 space-y-4">
              <h3 className="text-[10px] font-black text-neutral-200 uppercase tracking-widest px-2">Master Ledger Proof</h3>
              <div className="p-5 rounded-[24px] bg-white border border-neutral-100 flex items-center gap-4 shadow-sm group hover:border-black transition-colors">
                 <Fingerprint size={20} className="text-neutral-200 group-hover:text-black transition-colors" />
                 <div className="min-w-0">
                    <p className="text-[9px] font-black text-black uppercase tracking-widest leading-none mb-1">Identity Hash</p>
                    <p className="font-mono text-[9px] text-neutral-300 truncate opacity-60">0x3f...82e9112a4b</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
