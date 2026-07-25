type Listener = (event: any) => void;
const listeners = new Map<string, Set<Listener>>();

export function addActivityListener(type: string, listener: Listener) {
  if (!listeners.has(type)) listeners.set(type, new Set());
  listeners.get(type)!.add(listener);
  return () => listeners.get(type)?.delete(listener);
}

export function emitActivityEvent(event: any) {
  const type = event.type || 'unknown';
  listeners.get(type)?.forEach((l) => l(event));
  listeners.get('*')?.forEach((l) => l(event));
}