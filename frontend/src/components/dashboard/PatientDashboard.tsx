'use client';

import { Users, ShieldCheck, Activity, AlertTriangle, Info, X, FileText, Pill, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getGoldenRecord } from '@/lib/api';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function PatientDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('John Doe');

  const [alerts, setAlerts] = useState<{ id: string; type: 'info' | 'warning'; message: string; time: string; }[]>([
    { id: '1', type: 'info', message: 'New lab results from City Hospital have been added to your record.', time: '2h ago' },
  ]);

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setUserName(JSON.parse(profile).fullName || 'John Doe');
    }

    const loadData = async () => {
      try {
        const record = await getGoldenRecord('patient-1'); // Placeholder ID
        setData(record);
      } catch (e) {
        console.error('Failed to load patient record', e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const dismissAlert = (id: string) => setAlerts(prev => prev.filter(a => a.id !== id));

  if (loading) {
    return (
      <div className="max-w-[1100px] mx-auto space-y-8 page-enter">
        <div className="space-y-2">
          <div className="skeleton h-7 w-64" />
          <div className="skeleton h-4 w-48" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="skeleton h-[120px] rounded-xl" />)}
        </div>
        <div className="skeleton h-[300px] rounded-xl" />
      </div>
    );
  }

  const statCards = [
    { label: 'Trust Score', value: `${data?.trustScore || 94}%`, change: 'Unified', positive: true, icon: ShieldCheck },
    { label: 'Visits', value: data?.visits?.length || 0, change: 'Recorded', positive: true, icon: Activity },
    { label: 'Medications', value: data?.medications?.length || 0, change: 'Active', positive: true, icon: Pill },
    { label: 'Linked Sources', value: data?.sources?.length || 0, change: 'Synced', positive: true, icon: Users },
  ];

  return (
    <div className="max-w-[1100px] mx-auto space-y-8 page-enter">
      {/* Greeting */}
      <div>
        <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-black flex items-center gap-2">
          {getGreeting()}, {userName.split(' ')[0]}.
        </h1>
        <p className="text-[13px] text-neutral-500 mt-1">{formatDate()}</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white border border-[#EBEBEB] rounded-xl p-4 hover:border-[#C8C8C8] hover:-translate-y-0.5 transition-all duration-150 cursor-default"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon size={16} className="text-neutral-400" />
                <span className={`text-[11px] font-medium ${s.positive ? 'text-emerald-600' : 'text-blue-500'}`}>
                  {s.change}
                </span>
              </div>
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-400">{s.label}</p>
              <p className="text-[28px] font-bold text-black leading-tight">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Unified Timeline & Medications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Unified Timeline */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold text-black">Recent Activity</h2>
            <button 
              onClick={() => window.location.href = '/records'}
              className="text-[13px] font-medium text-neutral-500 hover:text-black transition-colors"
            >
              View full history →
            </button>
          </div>
          
          <div className="bg-white border border-[#EBEBEB] rounded-xl overflow-hidden divide-y divide-neutral-50">
            {(!data?.visits || data.visits.length === 0) ? (
              <div className="py-12 flex flex-col items-center gap-3">
                <Clock size={24} className="text-neutral-300" />
                <p className="text-[13px] text-neutral-400">No recent activity recorded</p>
              </div>
            ) : (
              data.visits.map((v: any, i: number) => (
                <div key={i} className="flex items-start gap-4 px-4 py-4 hover:bg-neutral-50 transition-colors duration-100">
                  <div className="mt-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-medium text-black">{v.type}</h3>
                    <p className="text-[13px] text-neutral-500 mt-0.5">{v.provider}</p>
                    {v.notes && <p className="text-[13px] text-neutral-400 mt-2 line-clamp-2">{v.notes}</p>}
                  </div>
                  <div className="ml-auto text-right shrink-0">
                    <span className="text-[12px] font-medium text-neutral-400 block mb-1">
                      {new Date(v.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    <button className="p-1.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors text-neutral-400">
                      <FileText size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Active Medications */}
        <div>
          <h2 className="text-[16px] font-semibold text-black mb-4">Active Medications</h2>
          <div className="bg-white border border-[#EBEBEB] rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50">
                  <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-400">Medication</th>
                  <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-400">Dose & Freq</th>
                  <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-400 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {(!data?.medications || data.medications.length === 0) ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-[13px] text-neutral-400">No active medications</td>
                  </tr>
                ) : (
                  data.medications.map((m: any, i: number) => (
                    <tr key={i} className="hover:bg-neutral-50 transition-colors duration-100">
                      <td className="px-4 py-4">
                        <span className="text-[14px] font-medium text-black">{m.name}</span>
                      </td>
                      <td className="px-4 py-4 text-[13px] text-neutral-500">
                        {m.dose} • {m.frequency}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-600">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Personal Info / Intelligence Alerts */}
      <div className="grid grid-cols-1 gap-4 pb-8">
        {/* Intelligence Alerts */}
        <div>
          <h2 className="text-[16px] font-semibold text-black mb-4">Notifications</h2>
          {alerts.length === 0 ? (
            <div className="bg-white border border-[#EBEBEB] rounded-xl py-12 flex flex-col items-center gap-2">
              <Info size={20} className="text-neutral-300" />
              <p className="text-[13px] text-neutral-400">You're all caught up</p>
            </div>
          ) : (
            <div className="space-y-2">
              {alerts.map((a) => (
                <div
                  key={a.id}
                  className={`bg-white border rounded-xl px-4 py-3 flex items-start gap-3 ${
                    a.type === 'warning' ? 'border-amber-200' : 'border-[#EBEBEB]'
                  }`}
                >
                  {a.type === 'warning' ? (
                    <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                  ) : (
                    <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-black">{a.message}</p>
                    <p className="text-[12px] text-neutral-400 mt-1">{a.time}</p>
                  </div>
                  <button
                    onClick={() => dismissAlert(a.id)}
                    className="text-neutral-300 hover:text-black transition-colors shrink-0"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
