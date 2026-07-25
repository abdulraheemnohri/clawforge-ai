import { useState } from 'react';
import { Terminal, Play } from 'lucide-react';

export default function TerminalPage() {
  const [cmd, setCmd] = useState('');
  const [output, setOutput] = useState<[]>([]);
  return (
    <div>
      <h2>Terminal</h2>
      <input value={cmd} onChange={(e) => setCmd(e.target.value)} />
      <button><Play /> Run</button>
      <pre>{output.join('\n')}</pre>
    </div>
  );
}