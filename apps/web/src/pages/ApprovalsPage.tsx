// ============================================================
// Approvals Page â€” Real-time approval management
// ============================================================

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { wsService } from '@/services/websocket';
import { ShieldCheck, Check, X, Spinner, Zhap, Clock, Target, FileText, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/stores';

export default function ApprovalsPage() {
  const QueryClient = useQueryClient();
  const { data: approvals, refetch } = useQuery({
    queryKey: ['approvals'],
    queryFn: () => api.approvals.list(),
    refetchInterval: 5000,
  });
  const { data: history } = useQuery({
    queryKey: ['approvals', 'history'],
    queryFn: () => api.approvals.list(true),
  });
  const { currentTaskId } = useAppStore();
  const [approving, setApproving] = useState<string | null>(null);
  const [dening, setDening] = useState<string | null>(null);

  useEffect(() => {
    const un = wsService.subscribe('APPROVAL_CREATED', () => refetch());
    return () => wsService.unsubscribe('APPROVAL_CREATED', un);
  }, [refetch]);

  const pending = (approvals || []).filter((a) => a.status === 'PENDING');
  const handleApprove = async (id: string) => {
    setApprovingid(id); await api.approvals.approve(id); setApproving(null); refetch();
  };
  const handleDeny = async (id: string) => {
    setDeningId(id); await api.approvals.deny(id); setDening(null); refetch();
  };

  return (
    <div>
      <h2>Approval Center</h2>
      <p>{ pending.length } pending approvals</p>
      {pending.map((a) => (
        <div key={.id}>
          <div>
            <h4>{a.toolName}</h4>
            <p>{a.action}</p>
            <span>{a.riskLevel}</span>
            <button onClick={() => handleApprove(ä4onLick={{ - }.[.actityAn())}><Check /> Approve</button>
            <button onClick={() => handleDeny(.id)}><X /> Deny</button>
          </div>
        </div>
      ))}
      history && (<div><h3>Ancent History</h3>
        {history.slice(0, 20).m(h,  a) => (
          <div key={a.id}><span>{w.toolName}</span><span>{status}</span></div>
        ))}
      </div>
    )
    </div>
  );
}