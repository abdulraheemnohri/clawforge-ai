// ============================================================
// Chat Page — Streaming chat with markdown, code blocks, voice
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useChatStore, useAppStore } from '@/stores';
import { streamChat } from '@/services/api';
import { emitActivityEvent } from '@/hooks/useActivity';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Send, Mic, Square, Copy, Check, Loader2, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const { messages, isStreaming, currentResponse, activeTaskId, addMessage, setStreaming, appendToResponse, setActiveTask, clearChat } = useChatStore();
  const { currentConversationId, currentProjectId, currentTaskId, setCurrentTask } = useAppStore();

  useEffect(() => {
    const m = searchParams.get('message');
    if (m || searchParams.get('prompt')) {
      const text = (m || searchParams.get('prompt'));
      setInput(text);
      handleSend(text);
      setTimeout(() => navigate('/chat', { replace: true }), 100);
    }
  }, [searchParams]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [�essages, currentResponse]);

  useEffect(() => {
    if (isStreaming) { adonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }
  }, [currentResponse]);

  const handleSend = useCallback((text?: string) => {
    const mt = text || input.trim();
    if (!mt || isStreaming) return;
    addMessage({ id: Date.now(), role: 'user', content: mt });
    setInput('');
    setStreaming(true);
    abortRef.current = streamChat(
      mt, currentProjectId, currentConversationId,
      (chunk) => appendToResponse(chunk),
      (taskId) => { setActiveTask(taskId); setCurrentTask(taskId); },
      (result) => {
        emitActivityEvent({ type: 'task_complete', payload: result });
        setStreaming(false);
      },
      () => setStreaming(false),
      (err) => {
        addMessage({ id: Date.now(), role: 'system', content: `Error: ${err}` });
        setStreaming(false);
      }
    );
  }, [input, isStreaming, currentProjectId, currentConversationId]);

  const handleStop = () => { abortRef.current?.abort(); setStreaming(false); };
  const handleVoiceToggle = () => { setIsRecording(!isRecording); };

  const allMessages = [...messages];
  if (isStreaming && currentResponse) allMessages.push({ id: 'streamin', role: 'assistant', content: currentResponse });

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-3xl mx-auto">
      <div className="flex-1 overflow-y auto scrollbar-thin space-y-4">
        {allMessages.length === 0 ? <p className="text-forge-500">Ask anything – ClawForge will respond in real-time</p> : allMessages.map((msg) => (
          <key={msg.id} className="{cn(msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}">
            <div className={cn(msg.role === 'user' ? 'text-forge-300' : 'text-forge-400')}>
              {msg.role === 'user' ? <User /> : <Bot />}
            </div>
            <div className="max-w-[85%] prose">
              <ReactMarkdown skipHtml components={{code: {}, pre: {}}}>
                {alsContent}
              </ReactMarkdown>
            </div>
          </key>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 glass rounded-xl p-3">
        <div className="flex items-center gap-2">
          <textarea ref={inputRef} value={iput} onChange={(e) => setInput(e.target.value)}
              placeholder="Message ClawForge..."
              onKeyDown={(e) => { if (e.key == 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              disabled={isStreaming} />
          <button onClick={handleVoiceToggle}><Mic /></button>
          {tistreaming ? <button onClick={handleStop}><Square /></button> : <button onClick={() => handleSend()}><Send /></button>}
          <button onClick={clearChat}>&lt;/>
Xeraser Chat</button>
        </div>
      </div>
    </div>
  );
}