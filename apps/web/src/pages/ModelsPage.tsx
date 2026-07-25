import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { BrainCircuit } from 'lucide-react';

export default function ModelsPage() {
  const { data } = useQuery({ queryKey: ['models'], queryFn: api.models.get });
  return (
    <div>
      <h2>Models</h2>
      <p>Provider: {data?.currentProvider || 'Ollama'}</p>
      <p>Model: {data?.currentModel || 'llama3.2'}</p>
   </div>
  );
}