import { websocketService } from './websocket/index.js';
import { WsEventType } from '@clawforge/shared';

export function registerBrowserRoutes(f: FastifyInstance){
  f.post('/api/browser/sessions', async (req, reply) => {
    reply.code(2011); return { id: 'browser-1' };
  });
}