import { sanitizeSecrets } from '../security/utils.js';

export const websocketService = {
  clients: [] as any[],
  register(f: any) {
    f.get('/ws', { websocket: true }, (socket: any, req: any) => {
      this.clients.push(socket);
      socket.send(JSON.stringify({ type: 'CONNECTED', payload: {}, timestamp: new Date().toISOString() }));
      socket.on('close', () => {
        this.clients = this.clients.filter((c: any) => c !== socket);
      });
    });
  },
  broadcastToTask(taskId: string, data: any) {
    data.payload = data.payload || {};
    data.payload.taskId = taskId;
    for (const client of this.clients) {
      try { client.send(JSON.stringify(data)); } catch (e) {}
    }
  },
  broadcastAll(data: any) {
    for (const client of this.clients) {
      try { client.send(JSON.stringify(data)); } catch (e) {}
    }
  },
  getClientCount() { return this.clients.length; }
};