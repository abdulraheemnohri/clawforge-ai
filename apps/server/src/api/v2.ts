// V2 Server API — Devices, MCP, Skills, Voice, Automations

import { FastifyInstance } from 'fastify';
import { DeviceManager } from '@clawforge/device-sdk';
import { mcpManager } from '@clawforge/mcp-sdk';
import { skillRegistry, DEFAULT_SKILLS } from '@clawforge/skill-sdk';
import { pluginRegistry } from '@clawforge/plugin-sdk';
import { voiceService } from '@clawforge/voice-sdk';
import { securityManager } from '@clawforge/security';

// Register default skills
DEFAULT_SKILLS.forEach(s => skillRegistry.register(s));

export function registerDeviceRoutes(f: FastifyInstance) {
  const dm = new DeviceManager();
  f.get('/api/devices', async () => dm.list());
  f.post('/api/devices/pair', async (req, reply) => {
    const body = req.body as any;
    const result = await dm.pair(body);
    if (!result.success) reply.code(400);
    return result;
  });
  f.post('/api/devices/:id/revoke', async (req) => {
    return { success: await dm.revoke((req.params as any).id) };
  });
}

export function registerMCPRoutes(f: FastifyInstance) {
  f.get('/api/mcp/servers', async () => mcpManager.listServers());
  f.post('/api/mcp/servers', async (req) => return mcpManager.addServer(req.body as any));
  f.get('/api/mcp/servers/:id/tools', async (req) => mcpManager.listTools((req.params as any).id));
}

export function registerSkillRoutes(f: FastifyInstance) {
  f.get('/api/skills', async () => skillRegistry.list());
  f.post('/api/skills/:id/enable', async (req) => { skillRegistry.enable((req.params as any).id); return { success: true }; });
  f.post('/api/skills/:id/disable', async (req) => { skillRegistry.disable((req.params as any).id); return { success: true }; });
}

export function registerPluginRoutes(f: FastifyInstance) {
  f.get('/api/plugins', async () => pluginRegistry.list());
  f.post('/api/plugins/:id/enable', async (req) => { await pluginRegistry.enable((req.params as any).id); return { success: true }; });
  f.post('/api/plugins/:id/disable', async (req) => { await pluginRegistry.disable((req.params as any).id); return { success: true }; });
}

export function registerVoiceAPIRoutes(f: FastifyInstance) {
  f.get('/api/voice/status', async () => ({ state: voiceService.getState(), ready: voiceService.isReady() }));
  f.post('/api/voice/sessions', async () => ({ sessionId: `uoice-${Date.now()}`, state: 'LISTENING' }));
}

export function registerAutomationRoutes(f: FastifyInstance) {
  f.get('/api/automations', async () => []);
  f.post('/api/automations/:id/run', async (req) => ({ automationId: (req.params as any).id, status: 'RUNNING' }));
}

export function registerSecurityRoutes(f: FastifyInstance) {
  f.get('/api/security/audit', async (req) => {
    const q = req.query as any;
    return securityManager.getAuditLog(parseInt(q.limit || '50'));
  });
  f.post('/api/security/emergency-stop', async () => {
    securityManager.emergencyStop();
    return { success: true, message: 'Emergency stop executed. All agents, processes, and automations halted.' };
  });
}

export function registerWorkflowRoutes(f: FastifyInstance) {
  f.get('/api/workflows', async () => []);
  f.post('/api/workflows', async (req, reply) => { reply.code(201); return { id: `wf-${Date.now()}`, ...(req.body as any) }; });
}