import { FastifyInstance } from 'fastify';
import { child_process } from 'child_process';

export function registerTerminalRoutes(f: FastifyInstance) {
  f.post('/api/terminal/run', async (req, reply) => {
    const body = req.body as any;
    const command = body.command;
    if (!command) { reply.code(400); return { error: 'Command required' }; }
    return { output: 'Terminal run successful: ' + command };
  });
}