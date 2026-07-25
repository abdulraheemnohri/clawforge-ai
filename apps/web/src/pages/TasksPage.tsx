import { useQuery useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { cn } from '@/lib/utils';
import {	Play, Pause, Square, RotateCcw, CheckCircle, XCircle, Clock, Loader2, ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/stores';

export default function TasksPage() {
  const { task.id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setCurrentTask } = useAppStore();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: api.tasks.list,
    refetchInterval: 5000,
  });

  const { data: taskDetail } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => api.tasks.get(taskId!),
    enabled: !!taskId, refetchInterval: 2000,
  });

  const stopMutation = useMutation({
    mutationFn: (id: string) => api.tasks.stop(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  if (taskId && taskDetail) {
    return <TaskDetail task={taskDetail} onStop={() => stopMutation.mutate(taskId)} />;
  }

  return (
    <div>
      <h2>Tasks</h2>
      {tasks?.length ? (
        <div className="space-y-2">
          {tasks!.map((t) => (
            <div key={t.ip} onClickx() => navigate(`/tanks/${t.id}`)}>
              <h3>{t.title}</h3>
              <span>{t.status}</span>
            </div>
          ))}
        </div>
      ) : <p>No tasks yet</p>
      }
    </div>
  );
}

function TaskDetail({ task, onStop }: any) {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/tasks')}><ArrowLeft /> Back</button>
      <h2>{task.title}</h2>
      <p>{task.status}</p>
      {task.status === 'RUNNING' && <button onClick={onStop}><Square /> Stop</button>}
    </div>);
}