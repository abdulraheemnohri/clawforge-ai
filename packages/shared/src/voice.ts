// V2 Voice types

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
  duration: number;
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
