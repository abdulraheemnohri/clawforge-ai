// ============================================================
// Global Stores: AppStore + ChatStore
// ============================================================

import { create } from 'zustand';

interface AppState {
  sidebarOpen: boolean;
  activityOpen: boolean;
  theme: 'dark' | 'light';
  currentProjectId: string | null;
  currentConversationId: string | null;
  currentTaskId: string | null;
  serverStatus: 'online' | 'offline' | 'connecting';
  setSidebarOpen: (open: boolean) => void;
  setActivityOpen: (open: boolean) => void;
  setTheme: (t: 'dark' | 'light') => void;
  setCurrentProject: (id: string | null) => void;
  setCurrentConversation: (id: string | null) => void;
  setCurrentTask: (id: string | null) => void;
  setServerStatus: (s: 'online' | 'offline' | 'connecting') => void;
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

export const useChatStore = create<any>((set) => ({
  messages: [],
  isStreaming: false,
  currentResponse: '',
  activeTaskId: null,
  addMessage: (msg: any) => set(s => ({ messages: [...s.messages, msg] })),
  setStreaming: (s) => set({ isStreaming: s }),
  clearChat: () => set({ messages: [], currentResponse: '', activeTaskId: null }),
  appendToResponse: (chunk: string) => set(s => ({ currentResponse: s.currentResponse + chunk })),
  setActiveTask: (id: string | null) => set({ activeTaskId: id }),
}));