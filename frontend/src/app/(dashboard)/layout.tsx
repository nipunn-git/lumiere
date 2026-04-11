'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-[240px]">
        <DashboardHeader />
        <main className="flex-1 px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
