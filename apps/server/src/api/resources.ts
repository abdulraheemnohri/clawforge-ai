import { FastifyInstance } from 'fastify';
import { permissionService } from '../permissions/index.js';

export function registerAgentRoutes(f: FastifyInstance) {
  f.get('/api/agents', async () => [
    { type: 'MASTER', name: 'Master Agent' },
    { type: 'CODING', name: 'Coding Agent' },
    { type: 'RESEARCH', name: 'Research Agent' },
    { type: 'BROWSER', name: 'Browser Agent' },
  ])
}

export function registerToolRoutes(f: FastifyInstance) {
  f.get('/api/tools', async () => [
    { name: 'filesystem.read', category: 'FILESYSTEM', riskLevel: 'SAFE' },
    { name: 'terminal.run', category: 'TERMINAL', riskLevel: 'HIGH' },
  ]);
}

export function registerApprovalRoutes(f: FastifyInstance) {
  f.get('/api/approvals', async () => permissionService.getPending());
}

export function registerModelRoutes() {};
export function registerMemoryRoutes() {};
export function registerSettingsRoutes() {};
export function registerAuditRoutes() {};