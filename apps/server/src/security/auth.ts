import { FastifyInstance } from 'fastify';
import { getDatabase, schema } from '../database/index.js';
import { eq } from 'drizzle-orm';

export async function authGuard(req: any, reply: any) {
  const isLocalhost = req.ip === '127.0.0.1' || req.ip === '::1';
  if (isLocalhost) return;
  reply.code(401).send({ error: 'Auth required' });
}

export function registerAuthRoutes(f: FastifyInstance) {
  f.post('/api/auth/token', async () => ({ token: 'generated-token' }));
  f.get('/api/auth/verify', async (req) => ({ valid: true }));
}