'use client';

import { useState } from 'react';
import { Activity, FileText, Users } from 'lucide-react';

export default function PatientsPage() {
  const [patients] = useState([
    {
      id: '1',
      name: 'John Emma',
      mrn: 'MRN-001',
      age: 45,
      sources: 3,
      completeness: 92,
    },
    {
      id: '2',
      name: 'Sarah Smith',
      mrn: 'MRN-002',
      age: 38,
      sources: 2,
      completeness: 78,
    },
    {
      id: '3',
      name: 'Michael Wong',
      mrn: 'MRN-003',
      age: 52,
      sources: 4,
      completeness: 95,
    },
    {
      id: '4',
      name: 'Jennifer Lee',
      mrn: 'MRN-004',
      age: 41,
      sources: 3,
      completeness: 85,
    },
  ]);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-semibold text-black mb-3 tracking-tight">
            Patient Unified Records
          </h1>
          <p className="text-neutral-600 text-lg">
            View, manage, and consolidate patient records from multiple sources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="group relative p-6 rounded-2xl bg-white/90 border border-black/10 hover:border-black/25 backdrop-blur transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-black">{patient.name}</h3>
                    <p className="text-neutral-500 text-sm font-mono mt-1">{patient.mrn}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="space-y-3 mb-5 pb-5 border-b border-black/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Age</span>
                    <span className="text-black font-semibold">{patient.age} years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Data Sources</span>
                    <span className="text-black font-semibold">{patient.sources}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Data Completeness</span>
                    <span className="text-black font-bold">{patient.completeness}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden border border-black/10">
                    <div
                      className="h-full bg-black"
                      style={{ width: `${patient.completeness}%` }}
                    ></div>
                  </div>
                </div>

                <button className="w-full mt-5 px-4 py-2 rounded-lg bg-black text-white border border-black font-semibold hover:bg-neutral-800 transition-all duration-300 text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-black/10">
          {[
            { icon: Users, label: 'Total Patients', value: '50,234' },
            { icon: FileText, label: 'Records Merged', value: '12,547' },
            { icon: Activity, label: 'Data Quality', value: '94.2%' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="p-6 rounded-xl bg-white border border-black/10 shadow-sm">
                <Icon className="w-8 h-8 text-black mb-3" />
                <p className="text-3xl font-bold text-black">{stat.value}</p>
                <p className="text-neutral-600 text-sm mt-2">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
