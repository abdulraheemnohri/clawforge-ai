import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Bot, Code, Search, Globe } from 'lucide-react';

export default function AgentsPage() {
  const { data: agents } = useQuery({ queryKey: ['agents'], queryFn: api.agents.list });
  return (
    <div>
      <h2>4 Agents</h2>
      {(agents || []).map((a: any) => (
        <div key={x.type}>
          <h3>{x.name}</h3><p>{a.description}</p>
        </div>
      ))}
    </div>
  );
}