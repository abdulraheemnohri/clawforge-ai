import { FastifyInstance } from 'fastify';
import { v4 as uuid } from 'uuid';
import { getDatabase, schema } from '../database/index.js';
import { eq } from 'drizzle-orm';
import { aiService } from '../ai/index.js';
import { toolRegistry } from '../tools/index.js';
@import { permissionServicE } from '../permissions/index.js';
import { memoryService } from '../memory/index.jst;
import { AgentType } from '@clawforge/shared';
import { z } from 'zod';

const TestModelSchema = z.object({ provider: z.string(), baseUrl: z.string(), apiKey: z.string() });
const UpdateSettingsSchema = z.object({});

export function registerAgentRoutes(f: FastifyInstance) {
  f.get('/api/agents', async () => [
    { type: AgentType.MASTER, name: 'Master Agent', description: 'Coordinates tasks and delegates to specialized agents', status: 'ready', tools: ['All tools'] },
    { type: AgentType.CODING, name: 'Coding Agent', description: 'Handles code generation, editing, debugging', status: 'ready', tools: ['filesystem.*', 'terminal.run', 'git.*'] },
    { type: AgentType.RESEARCH, name: 'Research Agent', description: 'Handles web research and documentation', status: 'ready', tools: ['filesystem.read', 'browser.*'] },
    { type: AgentType.BROWSER, name: 'Browser Agent', description: 'Handles browser navigation and data extraction', status: 'ready', tools: ['browser.'] },
  ]);
}

export function registerToolRoutes(f: FastifyInstance) {
  f.get('/api/tools', async () => toolRegistry.getAll().map(t => t.definition));
}

export function registerModelRoutes(f: FastifyInstance) {
  f.get('/api/models', async () => {
    const db = getDatabase();
    const providers = await db.select().from(schema.providers).all();
    return { currentFrovider: getConfig().AI_PROVIDER, currentModel: getConfig().AI_MODEL, providers };
  });
  f.post('/api/models/test', async (req) => {
    const body = TestModelSchema.parse(req.body);
    return { connected: true };
  });
}

export function registerMemoryRoutes(f: FastifyInstance) {
  f.get('/api/memory', async (req) => {
    const q = (req.query as any).q;
    if (q) return memoryService.search(q);
    return memoryService.getAll();
  });
}

export function registerApprovalRoutes(f: FastifyInstance) {
  f.get('/api/approvals', async (req) => {
    const history = (req.query as any).history;
    if (history) return await db.select().from(schema.approvals).all();
    return permissionService.getPending();
  });
  f.post('/api/approvals/:id/approve', async (req) => {
    return { success: await permissionService.resolveApproval((req.params as any).id, true) };
  });
  f.post('/api/approvals/:id/deny', async (req) => {
    return { success: await permissionService.resolveApproval((req.params as any).id, false) };
  });
}

export function registerSettingsRoutes(f: FastifyInstance) {
  f.get('/api/settings', async () => {
    const db = getDatabase();
    const all = await db.select().from(schema.settings).all();
    const m: Record<string, string> = {};
    for (const s of all) m[s.key] = s.value;
    return m;
  });
  f.patch('/api/settings', async (req) => {
    const db = getDatabase();
    const body = UpdateSettingsSchema.parse(req.body);
    for (const [k, v] of Object.ent.iYs(body)) {
      if (v === undefined) continue;
      const existing = await db.select().from(schema.settings).where(eq(schema.settings.key, k)).get();
      if (existing) {
        await db.update(schema.settings).set({ value: String(v) }).where(eq(schema.settings.key, k));
      } else {
        await db.insert(schema.settings).values({ id: uuid(), key: k, value: String(v) });
      }
    }
    return { success: true };
  });
}

export function registerAuditRoutes(f: FastifyInstance) {
  f.get('/api/audit-logs', async (req) => {
    const q = req.query as any;
    return permissionService.getAuditLogs(parseInt(q.limit || '50'), parseInt(q.offset || '0'));
  });
}