'use client';

import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DashboardHeaderProps {
  onRoleChange?: (role: string) => void;
}

export default function DashboardHeader({ onRoleChange }: DashboardHeaderProps) {
  const [role, setRole] = useState("Clinician");
  const [showRoles, setShowRoles] = useState(false);

  const roles = ["Clinician", "Scientist", "Admin"];

  const handleRoleSelect = (r: string) => {
    setRole(r);
    setShowRoles(false);
    if (onRoleChange) onRoleChange(r);
  };

  return (
    <header className="h-20 bg-white border-b border-neutral-100 px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 group-focus-within:text-black transition-colors" />
          <input 
            type="text" 
            placeholder="Search patients, records, or intelligence..." 
            className="w-full pl-12 pr-4 py-2.5 rounded-2xl bg-neutral-50 border border-transparent focus:bg-white focus:border-neutral-200 outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2.5 rounded-xl hover:bg-neutral-50 text-neutral-500 hover:text-black transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-neutral-100" />

        <div className="relative">
          <div 
            className="flex items-center gap-3 pl-2 group cursor-pointer"
            onClick={() => setShowRoles(!showRoles)}
          >
            <div className="text-right flex flex-col">
              <span className="text-sm font-bold text-black leading-none">Dr. Aditya</span>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">{role}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-black">
              <User size={20} className="text-neutral-500" />
            </div>
            <ChevronDown size={14} className="text-neutral-400 group-hover:text-black transition-colors" />
          </div>

          {showRoles && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-50 mb-1">Switch Role</div>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleSelect(r)}
                  className="w-full text-left px-4 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-black transition-all"
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
