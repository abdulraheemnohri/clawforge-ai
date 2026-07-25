import { FastifyInstance } from 'fastify';
import { getDatabase, schema } from '../database/index.js';
import { eq } from 'drizzle-orm';
import { aiService } from '../ai/index.js';
import { toolRegistry } from '../tools/index.js';

export function registerStatsRoutes(f: FastifyInstance) {
  f.get('/api/stats', async () => {
    const db = getDatabase();
    const [total, running, completed, failed] = await Promise.all([
      db.select().from(schema.tasks).all(),
      db.select().from(schema.tasks).where(eq(schema.tasks.status, 'RUNNING')).all(),
      db.select().from(schema.tasks).where(eq(schema.tasks.status, 'COMPLETED')).all(),
      db.select().from(schema.tasks).where(eq(schema.tasks.status, 'FAILED')).all(),
    ]);
    const pending = await db.select().from(schema.approvals)
      .where(eq(schema.approvals.status, 'PENDING')).all();
    return {
      server: {
        uptime: process.uptime(),
        nodeVersion: process.version,
        memoryUsage: Math.round(process.memoryUsage().rss / 1024 / 1024),
      },
      tasks: { total: total.length, running: running.length, completed: completed.length, failed: failed.length, pending: total.length - running.length - completed.length - failed.length },
      automation: {
        agents: 4,
        tools: toolRegistry.getAll().length,
        pendingApprovals: pending.length,
       },
      ai: {
        provider: aiService.getProvider().name,
        status: 'connected',
      },
    };
  });
}