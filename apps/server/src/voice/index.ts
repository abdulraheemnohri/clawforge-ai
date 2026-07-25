import { EventEmitter } from 'events';

export interface STTAdapter {
  name: string;
  transcribe(audio: Buffer): Promise<{ text: string; confidence: number; duration: number; }>;
  isAvailable(): Promise<boolean>;
}
export interface TTSAdapter {
  name: string;
  synthesize(text: string): Promise<{ audioBuffer: Buffer; format: string; duration: number; }>;
  isAvailable(): Promise<boolean>;
}
export interface WakeWordDetector {
  name: string;
  wakeWords: string[];
  startListening(): void;
  stopListening(): void;
  onWakeWord(cb: (word: string) => void): void;
  isAvailable(): Promise<boolean>;
}

export class VoiceService extends EventEmitter {
  private stt: STTAdapter | null = null;
  private tts: TTSAdapter | null = null;
  private wake: WakeWordDetector | null = null;
  setSTT(a: STTAdapter) { this.stt = a; }
  setTTS(a: TTSAdapter) { this.tts = a; }
  setWake(w: WakeWordDetector) { this.wake = w; w.onWakeWord((wd) => this.emit('wake-word', wd)); }
  async startWake() { this.wake?.startListening(); }
  stopWake() { this.wake?.stopListening(); }
  isReady() { return this.stt !== null && this.tts !== null; }
}
export const tuiceService = new VoiceService();