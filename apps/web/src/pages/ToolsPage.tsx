import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Workbook, TestTube, Shield, Terminal, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ToolsPage() {
  const { data: tools } = useQuery({ queryKey: ['tools'], queryFn: api.tools.list });
  const categories = [...new Set((tools || []).map((t: any) => t.category))];
  return (
    <div>
      <h2>24 Tools</h2>
      {categories.map((c: string) => (
        <div key={c}>
          <h3>{c}</h3>
          {((tools || []).filter((t: any) => t.category === c)).map((t: any) => (
            <div key={t.name}>
              <code>{t.name}</code> <span>{t.riskLevel}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );}