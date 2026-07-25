type EventHandler = (event: any) => void;

class WsService {
  private ws: WebSocket | null = null;
  private handlers = new Map();

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    this.ws = new WebSocket(`${protocol}//${window.location.host}/ws`);
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handlers.forEach((handlers, channel) => {
          if (channel === '*' || channel === data.type) {
            handlers.forEach((h) => h(data));
          }
        });
      } catch {}
    };
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
  }

  subscribe(channel: string, handler: EventHandler) {
    if (!this.handlers.has(channel)) this.handlers.set(channel, new Set());
    this.handlers.get(channel)!.add(handler);
  }

  unsubscribe(channel: string, handler: EventHandler) {
    this.handlers.get(channel)?.delete(handler);
  }
}

export const wsService = new WsService();