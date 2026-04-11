'use client';

import { FileText, Clock, File } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getGoldenRecord } from '@/lib/api';

export default function RecordsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const record = await getGoldenRecord('patient-1'); 
        setData(record);
      } catch (e) {
        console.error('Failed to load patient record', e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1100px] mx-auto space-y-8 page-enter">
        <div className="skeleton h-[300px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto space-y-8 page-enter">
      <div>
        <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-black">My Records</h1>
        <p className="text-[13px] text-neutral-500 mt-1">Access your consolidated medical history, labs, and documents.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white border border-[#EBEBEB] rounded-xl divide-y divide-neutral-50">
          {(!data?.visits || data.visits.length === 0) ? (
            <div className="py-16 flex flex-col items-center gap-3">
              <File size={24} className="text-neutral-300" />
              <p className="text-[13px] text-neutral-400">No records found</p>
            </div>
          ) : (
            data.visits.map((v: any, i: number) => (
              <div key={i} className="flex items-center justify-between px-6 py-5 hover:bg-neutral-50 transition-colors duration-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-neutral-100/80 text-black">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-black">{v.type}</h3>
                    <p className="text-[13px] text-neutral-500 mt-0.5">{v.provider}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[13px] text-neutral-400 flex items-center gap-1.5">
                    <Clock size={14} />
                    {new Date(v.date).toLocaleDateString()}
                  </span>
                  <button className="text-[13px] font-medium px-4 py-2 bg-neutral-100 text-black rounded-lg hover:bg-neutral-200 transition-colors">
                    View Document
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
