import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, ListTodo, Bot, Wrench, BrainCircuit, ShieldCheck, Memory, Globe, Terminal, Settings } from 'lucide-react';
import { useAppStore } from '@/stores';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/chat', icon: MessageSquare, label: 'Chat' },
  { to: '/tasks', icon: ListTodo, label: 'Tasks' },
  { to: '/agents', icon: Bot, label: 'Agents' },
  { to: '/browser', icon: Globe, label: 'Browser' },
  { to: '/terminal', icon: Terminal, label: 'Terminal' },
  { to: '/memory', icon: Memory, label: 'Memory' },
  { to: '/tools', icon: Wrench, label: 'Tools' },
  { to: '/models', icon: BrainCircuit, label: 'Models' },
  { to: '/approvals', icon: ShieldCheck, label: 'Approvals' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <nav>
      {navItems.map((item) => (
        <NavLink to={item.to} key={item.to} className={cn]>{ item.label }</item.icon }
      ))}
    </nav>
  );
}