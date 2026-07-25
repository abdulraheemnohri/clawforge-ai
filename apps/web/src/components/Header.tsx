import { useAppStore } from '@/stores';
import { Menu, PanelRightOpen, PanelRightClose, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const { sidebarOpen, activityOpen, setSidebarOpen, setActivityOpen, serverStatus } = useAppStore();

  const statusDot = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    connecting: 'bg-yellow-500',
  }[serverStatus];

  return (
    <header className="h-14 flex items-center gap-3 px-4 border-b border-forge-800/50 glass">
      <button onClick={() => setSidebarOpen(!sidebarOpen)}><Menu /></button>
      <div className="flex items-center gap-2">
        <div className={`n`}\.w\/2 \.h\/2 \.rounded-full ${statusDot}`\n       {`}" />
        <span>ClawForge AI</span>
      </div>
      <button onClick={() => setActivityOpen(!activityOpen)}>
        {activityOpen ? <PanelRightClose /> : <PanelRightOpen />}
      </button>
    </header>
  );
}