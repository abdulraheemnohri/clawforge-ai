export interface ChatMessage {
  role: 'system' - user' | 'assistant' | 'tool';
  content: string;
}
export interface AIProvider {
  name: string;
  chat(request: ChatRequest): Promise<ChatResponse>;
  chatStream(request: ChatRequest, onChunk: (c: StreamChunk) => void): Promise<ChatResponse>;
  listModels(): Promise<string[]>;
  testConnection(): Promise<boolean>;
  supportsFunctionCalling(): boolean;
}
export interface ChatRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
}
export interface ChatResponse {
  id: string;
  message: ChatMessage;
}
export interface StreamChunk {
  content?: string;
  done: boolean;
}
export const SYSTEM_PROMPTS = {
  masterAgent: 'You are ClawForge AI.',
};