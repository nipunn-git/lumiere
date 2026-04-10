import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-72">
        <DashboardHeader />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
