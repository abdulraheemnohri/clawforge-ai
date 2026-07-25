import { FastifyInstance } from 'fastify';
import { v4 as uuid } from 'uuid';
import { getDatabase, schema } from '../database/index.js';

export function registerChatRoutes(f: FastifyInstance) {
  f.post('/api/chat', async (req, reply) => {
    const body = req.body as any;
    reply.send({ response: 'ClawForge has received: ' + body.message.slice(0, 50) + '...' });
  });
}