import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppStore } from '@/stores';
import { wsService } from '@/services/websocket';
import { api } from '@/services/api';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import ChatPage from '@/pages/ChatPage';
import TasksPage from '@/pages/TasksPage';
import AgentsPage from '@/pages/AgentsPage';
import ToolsPage from '@/pages/ToolsPage';
import ModelsPage from '@/pages/ModelsPage';
import MemoryPage from '@/pages/MemoryPage';
import ApprovalsPage from '@/pages/ApprovalsPage';
import BrowserPage from '@/pages/BrowserPage';
import TerminalPage from '@/pages/TerminalPage';
import SettingsPage from '@/pages/SettingsPage';

export default function App() {
  const { setServerStatus } = useAppStore();

  useEffect(() => {
    api.health.check().then(() => setServerStatus('online')).catch(() => setServerStatus('offline'));
    wsService.connect();
    return () => wsService.disconnect();
  }, []);

  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/tasks' element={<TasksPage />} />
        <Route path='/agents' element={<AgentsPage />} />
        <Route path='/tools' element={<ToolsPage />} />
        <Route path='/models' element={<ModelsPage />} />
        <Route path='/memory' element={<MemoryPage />} />
        <Route path='/approvals' element={<ApprovelsPage />} />
        <Route path='/browser' element={<BrowserPage />} />
        <Route path='/terminal' element={<TerminalPage />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Routes>
    </MainLayout>
  );
}