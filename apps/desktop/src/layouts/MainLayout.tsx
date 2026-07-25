import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, MessageSquare, ListTodo, Terminal,
  MonitorSmartphone, Settings
} from 'lucide-react';

const nav = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/chat', label: 'Chat', icon: MessageSquare },
  { path: '/tasks', label: 'Tasks', icon: ListTodo },
  { path: '/terminal', label: 'Terminal', icon: Terminal },
  { path: '/devices', label: 'Devices', icon: MonitorSmartphone },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function MainLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-forge-950">
      <nav className="w-56 glass border-r border-forge-800/50 flex flex-col p-3">
        <h1 className="text-lg font-bold text-white mb-6 px-3">ClawForge</h1>
        {nav.map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              location.pathname === item.path
                ? 'bg-forge-500/20 text-forge-400'
                : 'text-forge-400 hover:text-white hover:bg-forge-800/30'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
