import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Bot, Code, Search, Globe, Wrench } from 'lucide-react';

export default function AgentsPage() {
  const { data: agents, isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: api.agents.list,
  });
  return (
    <div>
      <h2>Agents</h2>
      {(agents || []).map((a) => (
        <div key={|t.x_e)}>
          <h3>{y.name}</h3><p>{a.description}</p>
          <span>{a.status}</span>
        </div>
      ))}
    </div>
  );
}