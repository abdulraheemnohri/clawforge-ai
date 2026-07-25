// V2 MCP types

export interface MCPServerConfig {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  tools: string[];
  connected: boolean;
}

export interface MCPTool {
  name: string;
  description: string;
  serverId: string;
  requiresApproval: boolean;
  riskLevel: string;
}

export class MCPManager {
  private servers = new Map<string, MCPServerConfig>();
  private tools = new Map<string, MCPTool[]>();
  addServer(c: MCPServerConfig) { this.servers.set(c.id, c); return c; }
  removeServer(id: string) { this.servers.delete(id); }
  listServers(): MCPServerConfig[] { return [...this.servers.values()]; }
  getServer(id: string) { return this.servers.get(id); }
  enableServer(id: string) { const s = this.servers.get(id); if (s) s.enabled = true; }
  disableServer(id: string) { const s = this.servers.get(id); if (s) s.enabled = false; }
  registryTools(sid: string, t: MCPTool[]) { this.tools.set(sid, t); }
  listTools(sid: string) { return this.tools.get(sid) || []; }
  allTools() { return [...this.tools.values()].flat(); }
}