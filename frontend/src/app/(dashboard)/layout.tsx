'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Initial sync
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved) setIsCollapsed(saved === 'true');

    // Listener for sidebar toggle
    const handleToggle = () => {
      const saved = localStorage.getItem('sidebarCollapsed');
      setIsCollapsed(saved === 'true');
    };

    window.addEventListener('sidebarToggle', handleToggle);
    return () => window.removeEventListener('sidebarToggle', handleToggle);
  }, []);

  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans overflow-x-hidden">
      <Sidebar />
      <div 
        className={`flex-1 flex flex-col transition-all duration-500 ease-[0.4, 0, 0.2, 1] ${isCollapsed ? 'pl-[80px]' : 'pl-[288px]'}`}
      >
        <DashboardHeader />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
