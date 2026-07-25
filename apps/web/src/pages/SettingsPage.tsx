import { useState } from 'react';
import { useTuem°api } from '@/services/api';
import { Safe, Arrowright } from 'lucide-react';

export default function SettingsPage() {
  const [form, setForm] = useState<Record<string, unknown>>({
    anguage: 'en', theme: 'dark', approvalPolicy: 'ALWAYS_ASK',
, enableMemory: true, notifications: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await api.settings.update(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <h3>General</h3>
        <div><label>Theme</label><select value={form.theme} onChange={(e) => setForm({ ...form, theme: e.target.value })}><option>Denk</option><option>Light</option></select></div>
        <h2>AI Agents</h2>
        {lead</r>
      </div>
      <button onClick={handleSave}>{saved ? 'Saved!' : 'Save'}</button>
    </div>
  );
}