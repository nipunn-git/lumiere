'use client';

import { useState } from 'react';
import { Activity, FileText, Users, Plus, Filter, CornerDownRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

interface Patient {
  id: string;
  name: string;
  age: number;
  sources: number;
  precision: number;
  lastUpdate: string;
  status: 'Healthy' | 'Risk' | 'Critical';
}

const dummyPatients: Patient[] = [
  { id: 'MRN-001', name: 'John Emma', age: 45, sources: 3, precision: 92, lastUpdate: '2h ago', status: 'Healthy' },
  { id: 'MRN-002', name: 'Sarah Smith', age: 38, sources: 2, precision: 78, lastUpdate: '5h ago', status: 'Risk' },
  { id: 'MRN-003', name: 'Michael Wong', age: 52, sources: 4, precision: 95, lastUpdate: '1d ago', status: 'Healthy' },
  { id: 'MRN-004', name: 'Jennifer Lee', age: 41, sources: 3, precision: 85, lastUpdate: '2d ago', status: 'Healthy' },
];

export default function PatientsPage() {
  const [patients] = useState<Patient[]>(dummyPatients);

  return (
    <div className="max-w-[1200px] mx-auto space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-black tracking-tightest">Consolidated Registry</h1>
          <p className="text-neutral-400 font-bold text-base leading-tight">Unified patient directory across distributed institutional streams.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-100 text-[11px] font-black uppercase tracking-widest text-neutral-400 hover:text-black hover:border-black transition-all">
            <Filter size={14} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-black text-white text-[11px] font-black uppercase tracking-widest hover:shadow-xl transition-all active:scale-95">
            <Plus size={14} />
            Add Patients
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-20">
        {patients.map((patient, i) => (
          <div 
            key={patient.id}
            className="group relative bg-white p-8 rounded-[32px] border border-neutral-100 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all cursor-default"
          >
            <div className="flex flex-col items-center text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-200 group-hover:bg-neutral-900 group-hover:text-white transition-all duration-500">
                <Users size={24} />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-lg font-black text-black tracking-tight uppercase leading-none">{patient.name}</h3>
                <p className="text-[10px] font-bold text-neutral-200 tracking-widest">{patient.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-neutral-50">
                <div>
                   <p className="text-[8px] font-black text-neutral-300 uppercase tracking-widest">Age</p>
                   <p className="text-sm font-black text-black">{patient.age}</p>
                </div>
                <div>
                   <p className="text-[8px] font-black text-neutral-300 uppercase tracking-widest">Sources</p>
                   <p className="text-sm font-black text-black">{patient.sources}</p>
                </div>
              </div>

              <div className="w-full space-y-2">
                 <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest">
                    <span className="text-neutral-300">Precision</span>
                    <span className={patient.precision > 80 ? 'text-emerald-500' : 'text-amber-500'}>{patient.precision}%</span>
                 </div>
                 <div className="h-1 w-full bg-neutral-50 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        patient.precision > 80 ? "bg-black" : "bg-neutral-400"
                      )}
                      style={{ width: `${patient.precision}%` }}
                    />
                 </div>
              </div>

              <Link 
                href={`/patients/${patient.id}`}
                className="pt-4 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-neutral-300 group-hover:text-black transition-colors"
              >
                View Intelligence <CornerDownRight size={10} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
