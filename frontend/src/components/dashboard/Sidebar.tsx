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
  LogOut,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/matches', label: 'Matches', icon: Search },
  { href: '/golden-record', label: 'Golden Record', icon: ShieldCheck },
  { href: '/communication', label: 'Communication', icon: MessageSquare, clinicianOnly: true },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setRole(localStorage.getItem('role') || 'doctor');
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved) setIsCollapsed(saved === 'true');
  }, []);

  const toggleSidebar = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem('sidebarCollapsed', String(next));
    window.dispatchEvent(new Event('sidebarToggle'));
  };

  const visibleNavItems = navItems.filter((item) => {
    if (role === 'patient') {
      return item.label !== 'Patients' && item.label !== 'Matches' && !item.clinicianOnly;
    }
    return true;
  });

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <motion.aside 
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className="h-screen bg-[#FBFBFD] border-r border-neutral-200/50 flex flex-col fixed left-0 top-0 z-40 overflow-hidden"
    >
      {/* Brand Header */}
      <div className={cn("mt-6 mb-10 transition-all duration-300 flex items-center shrink-0", isCollapsed ? "px-6 justify-center" : "px-8")}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-black flex items-center justify-center shadow-sm">
             <HeartPulse size={18} className="text-white" />
          </div>
          {!isCollapsed && (
             <span className="text-xl font-bold tracking-tight text-black">Lumiere</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5">
        {!isCollapsed && (
          <p className="px-5 mb-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Workspace</p>
        )}
        {visibleNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center px-4 py-2.5 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-white text-black shadow-sm ring-1 ring-neutral-200" 
                  : "text-neutral-500 hover:text-black hover:bg-neutral-100/50"
              )}
            >
              <div className={cn("flex items-center gap-3.5", isCollapsed && "justify-center w-full")}>
                <Icon size={18} className={cn(isActive ? "text-blue-600" : "text-neutral-400 group-hover:text-black")} />
                {!isCollapsed && (
                  <span className={cn("text-sm font-medium tracking-tight", isActive ? "font-semibold" : "")}>
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Utility Section */}
      <div className="p-3 mb-2 space-y-1">
        <button 
          onClick={toggleSidebar}
          className="flex items-center gap-4 w-full px-5 py-3 rounded-xl text-neutral-400 hover:text-black hover:bg-neutral-100/50 transition-all group"
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          {!isCollapsed && <span className="text-sm font-medium">Collapse</span>}
        </button>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 w-full px-5 py-3 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-50/50 transition-all group"
        >
          <LogOut size={18} />
          {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>

      {/* System Note - Minimal */}
      {!isCollapsed && (
        <div className="px-6 py-8">
           <div className="p-5 rounded-3xl bg-white border border-neutral-100 shadow-sm overflow-hidden relative group cursor-pointer">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                 <Plus size={24} className="group-hover:rotate-90 transition-transform duration-500" />
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-1">Status</p>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <p className="text-xs font-bold text-black">Precision Core Active</p>
              </div>
           </div>
        </div>
      )}
    </motion.aside>
  );
}
