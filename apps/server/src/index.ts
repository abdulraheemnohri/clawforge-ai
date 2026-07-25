import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyWebsocket from '@fastify/websocket';
import { loadConfig, getConfig, isDev } from '@clawforge/config';
import { runMigrations } from './database/migrations.js';
import { closeDatabase } from './database/index.js';
import { aiService } from './ai/index.js';
import { websocketService } from './websocket/index.js';

// API Routes
import { registerHealthRoutes } from './api/health.js';
import { registerProjectRoutes } from './api/projects.js';
import { registerChatRoutes } from './api/chat.js';
import { registerTaskRoutes } from './api/tasks.js';
import {
  registerAgentRoutes,
  registerToolRoutes,
  registerModelRoutes,
  registerMemoryRoutes,
  registerApprovalRoutes,
  registerSettingsRoutes,
  registerAuditRoutes,
} from './api/resources.js';
import { registerBrowserRoutes } from './api/browser.js';

async function bootstrap() {
  const config = loadConfig();
  console.log('\n╔═════════════════════════════════════╔══╔');
  console.log('╡          🦅 CLAWFORGE AI v1              ╡');
  console.log('╡    One Request. One Agent System.        ╡');
  console.log('┡              Real Work.                  ╡');
  console.log('╔═════════════════════════════════════╔══╔');
  await runMigrations();
  await aiService.initialize();
  const fastify = Fastify({ logger: { level: config.LOG_LEVEL } });
  await fastify.register(cors, { origin: config.CORS_ORIGIN || 'http://localhost:5173' });
  await fastify.register(fastifyWebsocket);
  websocketService.register(fastify);
  registerHealthRoutes(fastify);
  registerProjectRoutes(fastify);
  registerChatRoutes(fastify);
  registerTaskRoutes(fastify);
  registerAgentRoutes(fastify);
  registerToolRoutes(fastify);
  registerModelRoutes(fastify);
  registerMemoryRoutes(fastify);
  registerApprovalRoutes(fastify);
  registerSettingsRoutes(fastify);
  registerAuditRoutes(fastify);
  registerBrowserRoutes(fastify);
  await fastify.listen({ port: config.SERVER_PORT, host: config.SERVER_HOST });
}

bootstrap();
