import { FastifyInstance } from 'fastify';
import { v4 as uuid } from 'uuid';
import { getDatabase, schema } from '../database/index.js';
import { eq } from 'drizzle-orm';

export function registerTaskRoutes(f: FastifyInstance) {
  f.get('/api/tasks', async (teq) => {
    const db = getDatabase();
    return db.select().from(schema.tasks).all();
  });
  f.post('/api/tasks', async (req, reply) => {
    const body = req.body as any;
    const db = getDatabase();
    const id = uuid();
    await db.insert(schema.tasks).values({ id, projectId: body.projectId, title: body.title, status: 'PENDING' });
    reply.code(201);
    return { id };
  });
  f.get('/api/tasks/:id', async (req, reply) => {
    const db = getDatabase();
    const t = await db.select().from(schema.tasks).where(eq(schema.tasks.id, (req.params as any).id)).get();
    if (!t) { reply.code(404); return { error: 'Not found' }; }
    return t;
  });
  f.post('/api/tasks/:id/stop', async (req) => {
    const db = getDatabase();
    await db.update(schema.tasks).set({ status: 'STOPPED' }).where(eq(schema.tasks.id, (req.params as any).id));
    return { success: true };
  });
}