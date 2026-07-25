import { FastifyInstance } from 'fastify';
import { browserService } from '../browser/service.js';

export function registerBrowserRoutes(f: FastifyInstance) {
  f.post('/api/browser/sessions', async (req, reply) => {
    const body = req.body as any;
    const session = await browserService.createSession(body?.url);
    reply.code(201); return session;
  });
  f.post('/api/browser/navigate', async (req, reply) => {
    const body = req.body as any;
    const result = await browserService.navigate(body.sessionId, body.url);
    return result;
  });
}