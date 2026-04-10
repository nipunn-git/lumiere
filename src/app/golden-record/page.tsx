'use client';

import { Star, Calendar, Droplet, Pill, Clock } from 'lucide-react';

export default function GoldenRecordPage() {
  const patient = {
    name: 'John Emma',
    dob: 'March 15, 1978',
    gender: 'Male',
    mrn: 'MRN-001-GR',
    bloodType: 'O+',
    trustScore: 94,
    medications: [
      { name: 'Lisinopril', dose: '10mg', frequency: 'Daily' },
      { name: 'Metformin', dose: '500mg', frequency: 'Twice Daily' },
    ],
    visits: [
      { date: '2024-01-15', type: 'Cardiology Checkup', notes: 'Normal' },
      { date: '2024-01-08', type: 'Lab Work', notes: 'All Clear' },
    ],
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-semibold text-black mb-3 tracking-tight">
            Golden Record
          </h1>
          <p className="text-neutral-600 text-lg">
            Complete unified patient profile with consolidated medical history
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-black/10 backdrop-blur overflow-hidden relative mb-8 shadow-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-black/5 rounded-full blur-3xl -z-10"></div>

          <div className="flex items-start gap-6 mb-8 pb-8 border-b border-black/10">
            <div className="w-20 h-20 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-white">JE</span>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-black">{patient.name}</h2>
              <div className="flex flex-wrap gap-4 mt-3 text-sm">
                <span className="flex items-center gap-2 text-neutral-600">
                  <Calendar size={16} className="text-black" />
                  {patient.dob}
                </span>
                <span className="flex items-center gap-2 text-neutral-600">
                  <Droplet size={16} className="text-black" />
                  Blood Type: {patient.bloodType}
                </span>
                <span className="font-mono text-black font-semibold">{patient.mrn}</span>
              </div>
            </div>
          </div>

          <div className="mb-8 p-6 rounded-xl bg-black/[0.02] border border-black/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-black" fill="currentColor" />
                <span className="font-semibold text-neutral-700">Trust Score</span>
              </div>
              <span className="text-3xl font-bold text-black">{patient.trustScore}</span>
            </div>
            <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black"
                style={{ width: `${patient.trustScore}%` }}
              ></div>
            </div>
            <p className="text-xs text-neutral-500 mt-3">Based on data consistency, recency, and source quality</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-black mb-4 text-lg">
                <Pill size={20} className="text-black" />
                Current Medications
              </h3>
              <div className="space-y-3">
                {patient.medications.map((med, i) => (
                  <div key={i} className="p-4 rounded-lg bg-black/[0.02] border border-black/10">
                    <p className="font-semibold text-black">{med.name}</p>
                    <div className="flex justify-between text-sm text-neutral-500 mt-2">
                      <span>{med.dose}</span>
                      <span>{med.frequency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-semibold text-black mb-4 text-lg">
                <Clock size={20} className="text-black" />
                Recent Visits
              </h3>
              <div className="space-y-3">
                {patient.visits.map((visit, i) => (
                  <div key={i} className="p-4 rounded-lg bg-black/[0.02] border border-black/10">
                    <p className="font-semibold text-black">{visit.type}</p>
                    <div className="flex justify-between text-sm text-neutral-500 mt-2">
                      <span>{visit.date}</span>
                      <span className="text-black">{visit.notes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 px-6 py-3 rounded-lg bg-black text-white font-semibold transition-all duration-300 hover:bg-neutral-800">
            Download Record
          </button>
          <button className="flex-1 px-6 py-3 rounded-lg border border-black text-black font-semibold hover:bg-black/5 transition-all duration-300">
            Export to EHR
          </button>
        </div>
      </div>
    </div>
  );
}
