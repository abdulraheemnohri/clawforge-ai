import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Search, Memory, Trash2 } from 'lucide-react';

export default function MemoryPage() {
  const { data, isLoading } = useQuery({ queryKey: ['memory'], queryFn: () => api.memory.list() });
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h2>Memory</h2>
      {(data || []).map((m: any) => (
        <div key={m.id}>
          <span>{m.type}</span>
          <p>{`.content}</p>
        </div>
      ))}
    </div>
  );
}