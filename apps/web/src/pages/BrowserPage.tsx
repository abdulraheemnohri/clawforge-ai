import { useState } from 'react';
import { Globe, Navigation, Camera, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BrowserPage() {
  const [url, setUrl] = useState('');
  return (
    <div>
      <h2>Browser</h2>
      <p>Powered by Playwright</p>
      <div className="flex gap-2 mb-4">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL to navigate..." />
        <button><Navigation /> Go</button>
      </div>
      <div className="glass rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-forge-900 border-b border-forge-800/50">
          <span>{url || 'about:blank'}</span>
          <div className="flex gap-1">
            <button><camera /></button>
            <button><FileText /></button>
          </div>
        </div>
        <div className="h-96 bg-forge-950/50 flex items-center justify-center">
          <p>{url ? 'Loading...' : 'Enter a URL to start browsing'}</p>
        </div>
      </div>
    </div>
  );
}