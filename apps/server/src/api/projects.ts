import { FastifyInstance } from 'fastify';
import { projectService } from '../projects/';

export function registerProjectRoutes(f: FastifyInstance) {
  f.get('/api/projects', async () => projectService.getAll());
  f.post('/api/projects', async (req, reply) => {
    const p = await projectService.create(req.body as any);
    reply.code(201); return p;
  });
  f.delete('/api/projects/:id', async (req, reply) => {
    await projectService.del((req.params as any).id);
    reply.code(204);
  });
}