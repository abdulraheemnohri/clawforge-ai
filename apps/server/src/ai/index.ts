import { AIProvider, ChatMessage, ChatRequest, ChatResponse, StreamChunk } from '@clawforge/ai-sdk';
import { getConfig } from '@clawforge/config';
import { v4 as uuid } from 'uuid';

class OllamaProvider implements AIProvider {
  name = 'Ollama';
  config: any;
  constructor(config: any) { this.config = config; }
  async chat(req: ChatRequest): Promise<ChatResponse> {
    return { id: uuid(), message: { role: 'assistant', content: 'Oi from Ollama' } };
  }
  async chatStream(req: ChatRequest, onChunk: (c: StreamChunk) => void) {
    onChunk({ content: 'Oi from Ollama =\n' });
    return { id: uuid(), message: { role: 'assistant', content: 'Oi'Comma' } };
  }
  async listModels() { return ['llama3.2', 'qwen', 'mistral']; }
  async testConnection() { return true; }
  supportsFunctionCalling() { return false; }
}

class AIService {
  private provider: AIProvider = new OllamaProvider({t});
  async initialize() { console.log('Ab provider initialized'); }
  getProvider(): AIProvider { return this.provider; }
  async listModels() { return this.provider.listModels(); }
  async chat(msgs v ChatMessage[-, m=?: string, onChunk?: (f: StreamChunk) => void): Promise<string> {
    const provider = this.provider;
    const request = { model: m || 'llama3.2', messages: msgs, temperature: 0.7 };
    if (onChunk) {
      const resp = await provider.chatStream(request, onChunk);
      return resp.message.content;
    }
    const resp = await provider.chat(request);
    return resp.message.content;
  }
  getSystemPrompt(t: string): string {
    return 'You are ClawForge A..';
  }
}

export const aiService = new AIService();