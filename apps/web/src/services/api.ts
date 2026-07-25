// ============================================================
// API Service — Communicates with ClawForge Server
// ============================================================

const API_BASE = '/api';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

// --- Streaming Chat ---

export function streamChat(
  message: string,
  projectId?: string,
  conversationId?: string,
  onChunk?: (chunk: string) => void,
  onTaskCreated?: (taskId: string) => void,
  onTaskComplete?: (result: any) => void,
  onDone?: () => void,
  onError?: (error: string) => void
): AbortController {
  const controller = new AbortController();

  fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, projectId, conversationId }),
    signal: controller.signal,
  })
    .then(async (response) => {
      if (!response.ok) {
        onError?.(`HTTP ${response.status}`);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'chunk' && data.content) {
                onChunk?.(data.content);
              } else if (data.type === 'task_created') {
                onTaskCreated?.(data.taskId);
              } else if (data.type === 'task_complete') {
                onTaskComplete?.(data.result);
              } else if (data.type === 'done') {
                onDone?.();
              } else if (data.type === 'error') {
                onError?.(data.error);
              }
            } catch {
              // skip malformed
            }
          }
        }
      }
    })
    .catch((err) => {
      if (err.name !== 'AbortError') {
        onError?.(err.message);
      }
    });

  return controller;
}

// --- Projects ---

export const api = {
  projects: {
    list: () => request<any[]>('/projects'),
    get: (id: string) => request<any>(`/projects/${id}`),
    create: (data: any) =>
      request<any>('/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      request<any>(`/projects/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request(`/projects/${id}`, { method: 'DELETE' }),
  },

  conversations: {
    list: (projectId?: string) =>
      request<any[]>(
        `/conversations${projectId ? `?projectId=${projectId}` : ''}`
      ),
    get: (id: string) => request<any>(`/conversations/${id}`),
    create: (data: any) =>
      request<any>('/conversations', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  tasks: {
    list: (params?: string) => request<any[]>(`/tasks${params || ''}`),
    get: (id: string) => request<any>(`/tasks/${id}`),
    create: (data: any) =>
      request<any>('/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    stop: (id: string) =>
      request(`/tasks/${id}/stop`, { method: 'POST' }),
    pause: (id: string) =>
      request(`/tasks/${id}/pause`, { method: 'POST' }),
    resume: (id: string) =>
      request(`/tasks/${id}/resume`, { method: 'POST' }),
    retry: (id: string) =>
      request(`/tasks/${id}/retry`, { method: 'POST' }),
  },

  agents: {
    list: () => request<any[]>('/agents'),
  },

  tools: {
    list: () => request<any[]>('/tools'),
  },

  models: {
    get: () => request<any>('/models'),
    test: (data: any) =>
      request<any>('/models/test', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  memory: {
    list: (params?: string) => request<any[]>(`/memory${params || ''}`),
    create: (data: any) =>
      request<any>('/memory', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request(`/memory/${id}`, { method: 'DELETE' }),
  },

  approvals: {
    list: (history?: boolean) =>
      request<any[]>(`/approvals${history ? '?history=true' : ''}`),
    approve: (id: string) =>
      request(`/approvals/${id}/approve`, { method: 'POST' }),
    deny: (id: string) =>
      request(`/approvals/${id}/deny`, { method: 'POST' }),
  },

  settings: {
    get: () => request<Record<string, string>>('/settings'),
    update: (data: Record<string, any>) =>
      request('/settings', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  },

  auditLogs: {
    list: (params?: string) => request<any[]>(`/audit-logs${params || ''}`),
  },

  health: {
    check: () => request<{ status: string }>('/health'),
    status: () => request<any>('/status'),
  },
};
