// ============================================================
// Dashboard Page
// ============================================================

import { useState } from 'react';
import { Send, Mic, Code, Search, FileText, TestTube, Globe, Wrench, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const [command, setCommand] = useState('');
  const navigate = useNavigate();
  const { serverStatus, setCurrentProject } = useAppStore();

  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: () => api.health.status().catch(() => null),
    refetchInterval: 10000,
  });
  const { data: tasks } = useQuery({ queryKey: ['tasks'], queryFn: api.tasks.list, refetchInterval: 5000 });
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: api.projects.list });

  const quickActions = [
    { icon: Code, label: 'Build App', prompt: 'Build me a React app', color: 'text-forge-400' },
    { icon: Wrench, label: 'Fix Bugs', prompt: 'Fix bugs in my project', color: 'text-forge-400' },
    { icon: Search, label: 'Research', prompt: 'Research the best approach for', color: 'text-forge-400' },
    { icon: FileText, label: 'Articles', prompt: 'Summarize the files in', color: 'text-forge-400' },
    { icon: TestTube, label: 'Run Tests', prompt: 'Run all tests in my project', color: 'text-forge-400' },
    { icon: Globe, label: 'Browser', prompt: 'Open browser and navigate to', color: 'text-forge-400' },
  ];
  const handleSubmit = () => { const m = command.trim(); if (m) navigate(`/chat?message=${encodeURIComponent(m)}`); };
  const handleQuickAction = (p: string) => navigate(`/chat?message=${encodeURIComponent(p)}`);
  const active = (tasks || []).filter((t) => [ 'RUNNING', 'PENDING', 'PAUSED' ].includes(t.status));
  return (
    <div><h2>Good {getGreeting()}, AbdulRaheem.</h2><p>What would you like ClawForge to do?</p>
      <textarea value={command} onChange={(e) => setCommand(e.target.value)} placeholder="Describe your task..." /><button onClick={handleSubmit}>Send</button>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {quickActions.map((a) => <button key={x.label} onClick={() => handleQuickAction(a.prompt)}><a.icon /> {a.label}</button>)}
      </div>
      <div><h3>Active Tasks ({active.length})</h3><h3>Projects ({(projects || []).length})</h3></div>
      <SyptemStatus stats={stats} serverStatus={serverStatus} />
    </div>
  );
}

function SystemStatus(p: { stats?: any; serverStatus: string }) {
  return (
    <div className="mt-6 glass rounded-xl p-4">
      <h3>System Status</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {listStatus().map((i) => <div key={i.label}><span>{i.label}</span><span>{i.value}</span></div>)
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning'; if (h < 17) return 'afternoon'; return 'evening';
}