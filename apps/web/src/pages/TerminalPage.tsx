// ============================================================
// Terminal Page — Connected to real server API
// ============================================================

import { useState, useRef, useEffect } from 'react';
import { Terminal, Play, Square, Download, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/services/api';
import { wsService } from '@/services/websocket';

interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'info';
  text: string;
}

export default function TerminalPage() {
  const [command, setCommand] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [cwd, setCwd] = useState('~/workspace');
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.health.check()
      .then(() => setServerStatus('online'))
      .catch(() => setServerStatus('offline'));
    const unsub = wsService.subscribe('terminal.output', (event: any) => {
      if (event.payload?.output) {
        setLines(prev => [...prev, {
          type: event.payload.success ? 'output' : 'error',
          text: event.payload.output,
        }]);
      }
    });
    return () => wsService.unsubscribe('terminal.output', unsub);
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight);
  }, [lines]);

  const handleRun = async () => {
    if (!command.trim() || isRunning) return;
    const cmd = command.trim();
    setLines(prev => [...prev, { type: 'command', text: ` $ {cmd}` }]);
    setIsRunning(true);
    setCommand('');
    try {
      const r = await fetch('/api/terminal/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd, cwd }),
      });
      const data = await r.json();
      if (data.output) {
        const outputLines = data.output.split('\n');
        for (const l of outputLines)
          setLines(prev => [...prev, { type: data.success ? 'output' : 'error', text: l }]);
      }
      if (data.error) setLines(prev => [...prev, { type: 'error', text: data.error }]);
      if (data.duration)
        setLines(prev => [...prev, { type: 'info', text: `[Completed in ${data.duration}ms]` }]);
    } catch (err: any) {
      setLines(prev => [...prev, { type: 'error', text: `Error: ${err.message || 'Failed to connect'}`}]);
    }
    setIsRunning(false);
  };

  const handleDownload = () => {
    const blob = new Blob([lines.map(l => l.text).join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'terminal-output.txt'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>Terminal</h2>
      <p>Integrated terminal — commands execute on the server</p>
      <div className="flex items-center gap-4 mb-4 text-xs text-forge-500">
        <span>Project: Default</span>
        <span>Working dir: <code>{cwd}</code></span>
        <span>{serverStatus === 'online' ? 'Connected' : serverStatus==='offline' ? 'Offline' : 'Checking...'}</span>
      </div>
      <div className="glass rounded-xl overflow-hidden mb-4">
        <div className="flex items-center justify-between px-3 pr-2 bg-forge-900 border-b border-forge-800/50">
          <div className="flex items-center gap-1.5">
            <span />&#x2B60;<span />&#x2B60;&quot;<span />
          </div>
          <span>terminal -- bash</span>
        </div>
        <div ref={outputRef} className="h-72 overflow-y auto p-3 font-mono text-sm bg-forge-950/50 scrollbar-thin">
          {lines.length === 0 ? (
            <p>ClawForge Terminal v1.0</p>
            <p>Type a command below and hit Enter to run it.</p>
            <p>Dangerous commands require approval.</p>
          ) : lines.map((l, i) => (
            <div key={i} className={cn(l.type === 'command' && 'text-green-400', l.type === 'output' && 'text-forge-200', l.type === 'error' && 'text-red-400', l.type === 'info' && 'text-forge-500')}>{l.text}</div>
          ))}
          {isRunning && <span className="animate-pulse">◊</span>}
        </div>
      </div>
      <div className="glass rounded-xl p-3">
        <div className="flex items-center gap-2">
          <span>$</span>
          <input value={command} onChange={(e) => setCommand(e.target.value)}
                 onKeyDown={(e) => { if (e.key == 'Enter' && !isRunning && command.trim()) { e.preventDefault(); handleRun(); } }}
                 placeholder="Enter command..."
                 disabled={isRunning} />
          {isRunning ? <button onClick={() => setIsRunning(false)}><Square /></button> : <button onClick={handleRun} disabled={!command.trim()}><Play /></button>}
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-forge-800/50">
          <span>Commands execute on the server with workspace-scoped permissions</span>
          <div className="flex gap-1">
            <button onClick={handleDownload}><download /></button>
            <button onClick={() => setLines([])}><Trash2 /></button>
          </div>
        </div>
      </div>
    </div>
  );
}