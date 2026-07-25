import { FastifyInstance } from 'fastify';
import { v4 as uuid } from 'uuid';
import { getDatabase, schema } from '../database/index.js';
import { agentService } from '../agent/index.js';

export function registerChatRoutes(f: FastifyInstance) {
  f.post('/api/chat', async (req, reply) => {
    const body = req.body as any;
    const taskId = uuid();
    const db = getDatabase();
    await db.insert(schema.tasks).values({
      id: taskId, projectId: body.projectId, title: body.message.slice(0, 200), status: 'PENDING'
    });
    const result = await agentService.executeTask(taskId, body.message);
    return { taskId, response: result.output, status: result.success ? 'completed' : 'failed' };
  });
}