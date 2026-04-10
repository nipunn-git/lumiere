'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HeartPulse, 
  LayoutDashboard, 
  Users, 
  Search, 
  ShieldCheck, 
  Settings, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/cn';

import { useState, useEffect } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/matches', label: 'Matches', icon: Search },
  { href: '/golden-record', label: 'Golden Record', icon: ShieldCheck },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem('role') || 'doctor');
  }, []);

  const visibleNavItems = navItems.filter((item) => {
    if (role === 'patient') {
      return item.label !== 'Patients' && item.label !== 'Matches';
    }
    return true;
  });

  return (
    <aside className="w-72 h-screen border-r border-neutral-100 bg-white flex flex-col fixed left-0 top-0 z-40">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-black p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tightest">Lumiere</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {visibleNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 active:scale-95",
                isActive 
                  ? "bg-neutral-900 text-white shadow-lg" 
                  : "text-neutral-500 hover:text-black hover:bg-neutral-50"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={cn(isActive ? "text-white" : "text-neutral-400 group-hover:text-black")} />
                <span className="font-semibold text-sm tracking-tight">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} className="text-neutral-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-100">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
          <LogOut size={20} />
          <span className="font-semibold text-sm tracking-tight">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
