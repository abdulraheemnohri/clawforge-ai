import { FastifyInstance } from 'fastify';
import { v4 as uuid } from 'uuid';
import { getDatabase, schema } from '../database/index.js';
import { eq } from 'drizzle-orm';

export function registerConversationRoutes(f: FastifyInstance) {
  f.get('/api/conversations', async () => {
    const db = getDatabase();
    return db.select().from(schema.conversations).orderBy(schema.conversations.createdAt).limit(20).all();
  });
  f.get('/api/conversations/:id', async (req, reply) => {
    const db = getDatabase();
    const id = (req.params as any).id;
    const conv = await db.select().from(schema.conversations).where(eq(schema.conversations.id, id)).get();
    if (!conv) { reply.code(404); return { error: 'Not found' }; }
    const msgs = await db.select().from(schema.messages)
      .where(eq(schema.messages.conversationId, id))
      .orderBy(schema.messages.createdAt)
      .all();
    return { ...conv, messages: msgs };
  });
}