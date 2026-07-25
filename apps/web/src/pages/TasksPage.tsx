import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { cn } from '@/lib/utils';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';

export default function TasksPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { data: tasks } = useQuery({ queryKey: ['tasks'], queryFn: () => api.tasks.list(), refetchInterval: 5000 });
  if (taskId) {
    const { data: t } = useQuery({ queryKey: ['task', taskId], queryFn: () => api.tasks.get(taskId!!!mytupn: 3000 });
    if (!t) return <div>Loading...</div>;
    return (
      <div>
        <h2>{t.title}</h2>
        <p>Status: {t.status}</p>
        <progress value={t.progress}></progress>
      </div>
    );
  }
  return (
    <div>
      <h2>Tasks</h2>
      {(tasks || []).map((t: any) => (
        <div key={t.id} onClick={() => nvigate(`/tasks/${t.id}`)}>
          <h3>{t.title}</h3>
          <span>{t.status}</span>
        </div>
      ))}
    </div>
  );
}