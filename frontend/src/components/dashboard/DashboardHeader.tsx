'use client';

import { Bell, Search, User, ChevronDown, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';

interface DashboardHeaderProps {
  onRoleChange?: (role: string) => void;
}

export default function DashboardHeader({ onRoleChange }: DashboardHeaderProps) {
  const [role, setRole] = useState("Clinician");
  const [userName, setUserName] = useState("Dr. Aditya");
  const [showRoles, setShowRoles] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    const savedProfile = localStorage.getItem('userProfile');
    
    if (savedRole) {
      setRole(savedRole.charAt(0).toUpperCase() + savedRole.slice(1));
    }
    
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserName(profile.fullName || "User");
    }
  }, []);

  const roles = ["Clinician", "Scientist", "Admin"];

  const handleRoleSelect = (r: string) => {
    setRole(r);
    localStorage.setItem('role', r.toLowerCase());
    setShowRoles(false);
    if (onRoleChange) onRoleChange(r);
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <header className="h-14 bg-white/90 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-50 border-b border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
      {/* Left side empty space to balance flexbox */}
      <div className="flex-1 lg:flex hidden" />

      {/* Centered Search Bar */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] px-4">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-300 w-3.5 h-3.5 group-focus-within:text-black transition-colors" />
          <input 
            type="text" 
            placeholder="Search Intelligence..." 
            className="w-full pl-10 pr-4 py-1.5 rounded-xl bg-neutral-100/50 border-transparent focus:bg-white border focus:border-neutral-200 outline-none transition-all text-[12px] font-medium placeholder:text-neutral-400"
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end gap-5">
        <div className="hidden sm:flex items-center gap-1.5 p-1 bg-neutral-50 rounded-lg">
           <button className="px-2.5 py-0.5 text-[10px] font-bold text-black bg-white rounded shadow-sm border border-neutral-100">Live</button>
           <div className="px-2 flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-emerald-500" />
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest leading-none">Healthy</span>
           </div>
        </div>

        <button 
          onClick={() => alert('Notifications coming soon!')}
          className="relative p-2 rounded-lg hover:bg-neutral-50 transition-all text-neutral-300 hover:text-black"
        >
          <Bell size={16} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="h-5 w-px bg-neutral-100" />

        <div className="relative">
          <div 
            className="flex items-center gap-2.5 group cursor-pointer select-none"
            onClick={() => setShowRoles(!showRoles)}
          >
            <div className="text-right flex flex-col items-end">
              <span className="text-[12px] font-bold text-black leading-none">{userName}</span>
              <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest mt-0.5">{role}</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-neutral-100 border border-neutral-200/50 flex items-center justify-center overflow-hidden transition-all group-hover:border-black/20 ring-offset-2 hover:ring-2 hover:ring-neutral-100">
              <User size={14} className="text-neutral-500" />
            </div>
            <ChevronDown size={10} className={cn("text-neutral-300 group-hover:text-black transition-all", showRoles ? "rotate-180" : "")} />
          </div>

          {showRoles && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-neutral-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 text-[9px] font-black text-neutral-300 uppercase tracking-widest">Master Identity</div>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleSelect(r)}
                  className="w-full text-left px-4 py-2 text-[12px] font-bold text-neutral-500 hover:bg-neutral-50 hover:text-black transition-all flex items-center justify-between"
                >
                  {r}
                  {role === r && <Sparkles size={10} className="text-blue-500" />}
                </button>
              ))}
              <div className="border-t border-neutral-100 my-1.5" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-[12px] font-bold text-red-400 hover:bg-red-50 transition-all"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
