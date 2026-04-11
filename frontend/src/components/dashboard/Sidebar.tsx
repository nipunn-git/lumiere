'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HeartPulse,
  LayoutDashboard,
  Users,
  GitMerge,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/cn';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/patients', label: 'Patient Registry', icon: Users },
  { href: '/matches', label: 'Match Queue', icon: GitMerge },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <aside className="w-[240px] h-screen bg-white border-r border-[#F0F0F0] flex flex-col fixed left-0 top-0 z-40">
      {/* Brand */}
      <div className="px-6 pt-6 pb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
          <HeartPulse size={16} className="text-white" />
        </div>
        <span className="text-[15px] font-bold tracking-tight text-black">Lumiere</span>
      </div>

      {/* Section label */}
      <div className="px-6 mb-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
          Workspace
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === '/patients' && pathname.startsWith('/patients'));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ease-in-out text-[14px] font-normal',
                isActive
                  ? 'bg-black text-white'
                  : 'text-neutral-600 hover:bg-neutral-100'
              )}
            >
              <Icon size={16} className={isActive ? 'text-white' : 'text-neutral-400'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-4 space-y-0.5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-all duration-150 text-[14px]"
        >
          <LogOut size={16} className="text-neutral-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
