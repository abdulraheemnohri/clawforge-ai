import { FastifyInstance } from 'fastify';
import { projectService } from '../projects/index.js';

export function registerProjectRoutes(f: FastifyInstance) {
  f.get('/api/projects', async () => projectService.getAll());
  f.post('/api/projects', async (req, reply) => {
    const p = await projectService.create(requ.body as any);
    reply.code(201); return p;
  });
  f.get('/api/projects/:id', async (req, reply) => {
    const p = await projectService.get((req.params as any).id);
    if (!p) { reply.code(404); return { error: 'Not found' }; }
    return p;
  });
  f.delete('/api/projects/:id', async (req, reply) => {
    await projectService.del((req.params as any).id);
    reply.code(204);
  });
}