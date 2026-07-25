import { useState } from 'react';
import { Globe, Navigation } from 'lucide-react';

export default function BrowserPage() {
  const [url, setUrl] = useState('');
  return (
    <div>
      <h2>Browser</h2>
      <input value={url} onChange={(e) => setUrl(e.target.value)} />
      <button><Navigation /> Go</button>
      <p>Powered by Playwright</p>
    </div>
  );
}