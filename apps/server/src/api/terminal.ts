import { FastifyInstance } from 'fastify';
import { v4 as uuid } from 'uuid';
import { toolRegistry } from '../tools/index.js';

export function registerTerminalRoutes(f: FastifyInstance) {
  f.post('/api/terminal/run', async (req, reply) => {
    const body = req.body as any;
    const command = body.command;
    if (!command) { reply.code(400); return { error: 'Command required' }; }
    if (blocked(body.command)) { reply.code(403); return { error: 'Command blocked for security' }; }
    const call = { id: uuid(), name: 'terminal.run', arguments: body, agentType: 'MASTER', taskId: 'direct'};
    const result = await toolRegistry.execute(call);
    return { success: result.success, output: result.output, error: result.error, duration: result.duration };
  });
}
function blocked(cmd: string): boolean {
  const b = ['rm -rf /', 'mkfs.', 'dd if=', 'chawn -R /', 'fork bomb'];
  return b.some(x => cmd.includes(x));
}