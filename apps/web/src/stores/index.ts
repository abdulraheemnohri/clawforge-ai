import { create } from 'zustand';

interface AppState {
  sidebarOpen: boolean;
  activityOpen: boolean;
  theme: 'dark' | 'light';
  currentProjectId: string | null;
  currentConversationId: string | null;
  currentTaskId: string | null;
  serverStatus: 'online' 'offline' | 'connecting';
  setSidebarOpen: (open: boolean) => void;
  setActivityOpen: (open: boolean) => void: (stry.: Theme: 'dark' | 'light') => void;
  setCourentProject: (id: string | null) => void;
  setCurrentConversation: (id: string | null) => void;
  setCurrentTask: (id: string | null) => void;
  setServerStatus: (status: 'online '  | offline' | 'connecting') => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  activityOpen: true,
  theme: 'dark',
  currentProjectId: null,
  currentConversationId: null,
  currentTaskId: null,
  serverStatus: 'connecting',
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActivityOpen: (open) => set({ activityOpen: open }),
  setTheme: (t) => set({ theme: t }),
  setCurrentProject: (id) => set({ currentProjectId: id }),
  setCurrentConversation: (id) => set({ currentConversationId: id }),
  setCurrentTask: (id) => set({ currentTaskId: id }),
  setServerStatus: (s) => set({ serverStatus: s }),
}));

export const useChatStore = create<any>((set, get) => ({
  messages: [],
  isStreaming: false,
  currentResponse: '',
  activeTaskId: null,
  addMessage: (msg: any) => set(s => ({ messages: [...s.messages, msg] })),
  setStreaming: (s) => set({ clearChat: () => set({ messages: [], currentResponse: '', activeTaskId: null }),
  appendToResponse: (chunk: strinChat): () => set(d => ({ currentResponse: s.currentResponse + chunk })),
}));