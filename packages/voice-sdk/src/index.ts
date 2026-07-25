// Voice SDK — Wake word, STT, TTS, voice session management

export enum VoiceState {
  IDLE = 'IDLE',
  LISTENING = 'LISTENING',
  PROCESSING = 'PROCESSING',
  THINKING = 'THINKING',
  EXECUTING = 'EXECUTING',
  SPEAKING = 'SPEAKING',
  INTERRUPTED = 'INTERRUPTED',
  ERROR = 'ERROR',
}

export interface WakeWordConfig {
  words: string[];
  sensitivity: number;
  modelPath?: string;
}

export interface STTResult {
  text: string;
  confidence: number;
  duration: number; // ms
  language: string;
}

export interface TTSRequest {
  text: string;
  voice?: string;
  speed?: number;
}

export interface TTSResponse {
  audioBuffer: Buffer;
  format: string;
  duration: number;
}

export interface VoiceSession {
  id: string;
  state: VoiceState;
  startedAt: string;
  transcript: string;
  response: string;
}

export interface VoiceAdapter {
  name: string;
  wakeWord?: WakeWordProvider;
  stt?: STTProvider;
  tts?: TTSProvider;
}

export interface WakeWordProvider {
  name: string;
  wakeWords: string[];
  startListening(): void;
  stopListening(): void;
  onWakeWord(cb: (word: string) => void): void;
  isAvailable(): boolean;
}

export interface STTProvider {
  name: string;
  transcribe(audio: Buffer): Promise<STTResult>;
  isAvailable(): boolean;
}

export interface TTSProvider {
  name: string;
  synthesize(req: TTSRequest): Promise<TTSResponse>;
  isAvailable(): boolean;
}

export class VoiceService {
  private state = VoiceState.IDLE;
  private adapter: VoiceAdapter | null = null;
  private sessions = new Map<string, VoiceSession>();

  setAdapter(a: VoiceAdapter) { this.adapter = a; }

  getState(): VoiceState { return this.state; }

  setState(s: VoiceState) { this.state = s; }

  async transcribe(audio: Buffer): Promise<STTResult | null> {
    if (!this.adapter?.stt) return null;
    this.state = VoiceState.PROCESSING;
    const result = await this.adapter.stt.transcribe(audio);
    this.state = VoiceState.IDLE;
    return result;
  }

  async speak(text: string): Promise<TTSResponse | null> {
    if (!this.adapter?.tts) return null;
    this.state = VoiceState.SPEAKING;
    const result = await this.adapter.tts.synthesize({ text });
    this.state = VoiceState.IDLE;
    return result;
  }

  startWakeWord(cb: (word: string) => void): void {
    if (!this.adapter?.wakeWord) return;
    this.adapter.wakeWord.onWakeWord(cb);
    this.adapter.wakeWord.startListening();
    this.state = VoiceState.LISTENING;
  }

  stopWakeWord(): void {
    this.adapter?.wakeWord?.stopListening();
    this.state = VoiceState.IDLE;
  }

  isReady(): boolean {
    return this.adapter !== null;
  }
}

export const voiceService = new VoiceService();
