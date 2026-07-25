import { websocketService } from './websocket/index.js';
import { WsEventType } from '@clawforge/shared';

export const websocketService = {
  register(f: any) {
    f.get('/ws', { websocket: true }, (socket: any, req: any) => {
      socket.send(JSON.stringify({ message: 'Connected' }));
    });
  },
  broadcastToTask(taskId: string, data: any) {
    // WebSocket broadcast
},
  broadcastAll(data: any) {
    // Broadcast to all
  },
  getClientCount(): number { return 0; }
};