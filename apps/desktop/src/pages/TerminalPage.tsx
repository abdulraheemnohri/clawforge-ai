import { useState } from 'react';

export default function TerminalPage() {
  const [cmd, setCmd] = useState('');
  const [lines, setLines] = useState<string[]>([]);

  const run = async () => {
    if (!cmd.trim()) return;
    setLines(prev => [...prev, ` $ {cmd}`]);
    setCmd('');
    try {
      const r = await fetch('/api/terminal/run', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ command: cmd }) });
      const d = await r.json();
      setLines(prev => [...prev, d.output || d.error || 'Done']);
    } catch {
      setLines(prev => [...prev, 'Error connecting to server']);
    }
  };

  return (
    <div>
      <h2>Terminal</h2>
      <div className="glass rounded-xl p-3 h-64 overflow-y auto font-mono text-sm mb-4 scrollbar-thin">
        {lines.map((l, i) => <div key={i} className="py-0.5">{l}</div>)}
      </div>
      <div className="flex gap-2">
        <input value={cmd} onChange={(e) => setCmd(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); run(); } }}
          placeholder="$ command..."
          className="flex-1 bg-forge-900 border border-forge-800 rounded-xl p-2 text-white text-sm font-mono" />
        <button onClick={run} className="ph-4 bg-forge-500 rounded-xl text-white text-sm">Run</button>
      </div>
    </div>
  );
}