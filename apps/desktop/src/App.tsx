import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import ChatPage from './pages/ChatPage';
import TasksPage from './pages/TasksPage';
import TerminalPage from './pages/TerminalPage';
import DevicesPage from './pages/DevicesPage';
import SettingsPage from './pages/SettingsPage';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1 } } });

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/terminal" element={<TerminalPage />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </MainLayout>
      </MemoryRouter>
    </QueryClientProvider>
  );
}