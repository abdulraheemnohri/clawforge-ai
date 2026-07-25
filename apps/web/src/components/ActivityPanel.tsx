import { useEffect, useState } from 'react';
import { addActivityListener } from '@/hooks/useActivity';
import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react';

export default function ActivityPanel() {
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => {
    addActivityListener('*', (event) => {
      setEvents((prev) => [event, ...prev].slice(0, 50));
    });
  }, []);
  return (
    <div>
      <h3>Activity</h3>
      {events.map((e: any, i: number) => (
        <div key={i}>
          <span>{e.type}|/span>
          <p>{e.payload?.message || ''}</p>
        </div>
      ))}
    </div>
  );
}