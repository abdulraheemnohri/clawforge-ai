// Security package — Device identity, permission scopes, audit

export enum PermissionScope {
  FILESYSTEM_READ = 'filesystem.read',
  FILESYSTEM_WRITE = 'filesystem.write',
  FILESYSTEM_DELETE = 'filesystem.delete',
  TERMINAL_EXECUTE = 'terminal.execute',
  GIT_READ = 'git.read',
  GIT_WRITE = 'git.write',
  BROWSER_CONTROL = 'browser.control',
  BROWSER_SCREENSHOT = 'browser.screenshot',
  NETWORK_ACCESS = 'network.access',
  MCP_EXECUTE = 'mcp.execute',
  AUTOMATION_RUN = 'automation.run',
  VOICE_LISTEN = 'voice.listen',
  DEVICE_CONTROL = 'device.control',
  PLUGIN_MANAGE = 'plugin.manage',
  SKILL_MANAGE = 'skill.manage',
}

export interface SecurityPolicy {
  deviceId: string;
  scopes: PermissionScope[];
  maxRisk: string;
  requireApproval: boolean;
  expiresAt?: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  deviceId: string;
  agentType: string;
  toolName?: string;
  result: string;
  target?: string;
}

export class SecurityManager {
  private policies = new Map<string, SecurityPolicy>();
  private auditLog: AuditEntry[] = [];

  setPolicy(deviceId: string, policy: SecurityPolicy) {
    this.policies.set(deviceId, policy);
  }

  getPolicy(deviceId: string): SecurityPolicy | undefined {
    return this.policies.get(deviceId);
  }

  hasScope(deviceId: string, scope: PermissionScope): boolean {
    const p = this.policies.get(deviceId);
    return p ? p.scopes.includes(scope) : false;
  }

  log(entry: AuditEntry) {
    this.auditLog.push(entry);
  }

  getAuditLog(limit = 50): AuditEntry[] {
    return this.auditLog.slice(-limit);
  }

  emergencyStop(): void {
    this.auditLog.push({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: 'EMERGENCY_STOP',
      deviceId: 'system',
      agentType: 'SYSTEM',
      toolName: 'security.emergency_stop',
      result: 'EXECUTED',
    });
  }
}

export const securityManager = new SecurityManager();
