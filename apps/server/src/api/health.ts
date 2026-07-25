import { FastifyInstance } from 'fastify';

export function registerHealthRoutes(fastify: FastifyInstance) {
  fastify.get('/api/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  }));

  fastify.get('/api/status', async () => ({
    status: 'running',
    uptime: process.uptime(),
    wsClients: websocketService.getClientCount(),
    toolsRegistered: toolRegistry.getAll().length,
    aiProvider: aiService.getProvider().name,
    memory: process.memoryUsage(),
  }));
}
