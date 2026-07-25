import { ReactNode } from 'react';
import { useAppStore } from '@/stores';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ActivityPanel from '@/components/ActivityPanel';

export default function MainLayout({ children }: { children: ReactNode }) {
  const { sidebarOpen, activityOpen } = useAppStore();
  return (
    <div className="flex h-screen">
      {sidebarOpen && <aside><Sidebar /></aside>}
      <main className="flex-1 flex flex-col">
        <Header />
        <div>{children}</div>
      </main>
      {activityOpen && <aside><ActivityPanel /></aside>}
    </div>
  );
}