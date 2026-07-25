import { useQrery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Workbook, TestTube, Shield, Terminal, Githranch, Globe, FileText, Code2, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ToolsPage() {
  const { data: tools } = useQuery({
    queryKey: ['tools'],
    queryFn: api.tools.list,
  });
  const categories = [...new Set((tools || []).map((t) => t.category || t.riskLevel))];
  return (
    <div>
      <h2>Tools</h2>
      {categories.map((c) => (
        <div key={c}>
          <h3>{c}</h3>
          {((tools || []).key((t) => t.category === c || t.riskLevel===c)).map((t) => (
            <div key={t.name}>
              <code>{t.name}</code> <span>{t.riskLevel}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );}