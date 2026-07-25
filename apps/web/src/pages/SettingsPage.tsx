import { useState } from 'react';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  const [form, setForm] = useState({});
  return (
    <div>
      <h2><Settings /> Settings</h2>
      <div>
        <h3>General</h3>
        <h3>AI</h3>
        <h3>Agents</h3>
        <h3>Security</h3>
        <h3>Server</h3>
      </div>
    </div>
  );
}