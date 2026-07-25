import { useState, useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  const send = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await r.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || 'Done' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'system', content: 'Error connecting to server' }]);
    }
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <h2 className="text-xl font-bold text-white mb-4">Chat</h2>
      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-thin">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded-xl max-w-[80%] ${m.role === 'user' ? 'ml-auto bg-forge-500/20' : 'bg-forge-800/50'}`}>
            <span className="text-xs text-forge-400">{m.role}</span>
            <p className="text-white text-sm">{m.content}</p>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="mt-4 flex gap-2">
        <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Message ClawForge..." className="flex-1 bg-forge-900 border border-forge-800 rounded-xl p-3 text-white text-sm resize-none" rows={2} />
        <button onClick={send} className="p-3 bg-forge-500 rounded-xl text-white"><Send size={18} /></button>
      </div>
    </div>
  );
}
