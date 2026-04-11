'use client';

import { Bell, Search, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DashboardHeader() {
  const [userName, setUserName] = useState('Dr. Parteek');

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserName(profile.fullName || 'Dr. Parteek');
    }
  }, []);

  return (
    <header className="h-[56px] bg-white px-6 flex items-center justify-between sticky top-0 z-50 border-b border-[#F0F0F0]">
      {/* Left spacer */}
      <div className="flex-1" />

      {/* Centered search */}
      <div className="w-full max-w-[400px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search patients, records..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-neutral-50 border border-transparent text-[14px] placeholder:text-neutral-400 outline-none transition-all focus:border-black focus:bg-white"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex-1 flex items-center justify-end gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-neutral-50 transition-all duration-150 text-neutral-400 hover:text-black">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
        </button>

        <div className="h-5 w-px bg-neutral-200" />

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[14px] font-medium text-black leading-none">{userName}</p>
            <p className="text-[10px] font-medium uppercase text-neutral-400 mt-0.5 tracking-wide">Doctor</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center">
            <User size={14} className="text-neutral-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
