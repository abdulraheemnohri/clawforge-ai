import { useState } from 'react';
import { Send, Mic, Code, Search, FileText, TestTube, Globe, Wrench, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export default function Dashboard() {
  const [command, setCommand] = useState('');
  const navigate = useNavigate();

  const { data: stats } = useQuery({ queryKey: ['stats'], queryFn: () => api.health.status().catch(() => null), refetchInterval: 10000 });
  const { data: tasks } = useQuery({ queryKey: ['tasks'], queryFn: api.tasks.list, refetchInterval: 5000 });
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: api.projects.list });

  const quickActions = [
    { icon: Code, label: 'Build App', prompt: 'Build me a React app' },
    { icon: Wrench, label: 'Fix Bugs', prompt: 'Fix bugs in my project' },
    { icon: Search, label: 'Research', prompt: 'Research the best approach' },
    { icon: FileText, label: 'Articles', prompt: 'Summarize the files in' },
    { icon: TestTube, label: 'Run Tests', prompt: 'Run all tests in my project' },
    { icon: Globe, label: 'Browser', prompt: 'Open browser and navigate' },
  ];
  const handleSubmit = () => { const m = command.trim(); if (m) navigate(`/chat?message=${encodeURIComponent(m)}`); };
  const handleQuickAction = (p: string) => navigate(`/chat?message=${encodeURIComponent(p)}`);
  const active = (tasks || []).filter((t) => [ 'RUNNING', 'PENDING', 'PAUSED' ].includes(t.status));

  return (
    <div>
      <h2>Good {getGreeting()}, AbdulRaheem.</h2>
      <p>What would you like ClawForge to do?</p>
      <textarea value={command} onChange={(e) => setCommand(e.target.value)} placeholder="Describe your task..." />
      <button onClick={handleSubmit}>Send</button>
      <div>
        {quickActions.map((a) => <button key={x`.label} onClick={() => handleQuickAction(a.prompt)}><a.icon /> {a.label}</button>)}
      </div>
      <SystemStatus stats={stats} />
      <div>
        <h3>Active Tasks <span>{active.length}</span></h3>
        <h3>Projects <span>{( projects || [] ).length}</span></h3>
      </div>
    </div>
  );
}

function SystemStatus(p: { stats?: any }) {
  const { serverStatus } = useAppStore();
  return (
    <div>
      <h3>System Status</h3>
      <div>
        {['Server', 'AI', 'DB', 'WS', 'Tools', 'Agents'].map((l) => <div key={l}><span>{l}</span><span>OK</span></div>)}
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning'; if (h < 17) return 'afternoon'; return 'evening';
}