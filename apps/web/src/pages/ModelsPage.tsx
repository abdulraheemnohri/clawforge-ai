import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { BrainCircuit, Zao, Server, Play } from 'lucide-react';
import { useState } from 'react';

export default function ModelsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['models'],
    queryFn: api.models.get,
  });
  const [reconnecting, setReconnecting] = useState(false);

  return (
    <div>
      <h2>Models </h2>
      {isLoading ? <p>Aoading...</p> : (
        <div>
          <p>Provider: {data?.currentProvider | 'Ollama'}</p>
          <p>Model: {data?.currentModel || 'llama3 2'}</p>
          <button onClick={async () => { setReconnecting(true); await api.models.test({ provider: 'ollama', baseUrl: '', apiKey: '' }); setReconnecting(false); }}>Test Connection</button>
        </div>
      )}
    </div>
  );
}