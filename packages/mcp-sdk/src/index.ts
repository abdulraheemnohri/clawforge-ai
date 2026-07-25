// MCP SDK — Model Context Protocol client for ClawForge

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

  addServer(config: MCPServerConfig) {
    this.servers.set(config.id, config);
    return config;
  }

  removeServer(id: string) { this.servers.delete(id); }

  listServers(): MCPServerConfig[] {
    return [...this.servers.values()];
  }

  getServer(id: string): MCPServerConfig | undefined {
    return this.servers.get(id);
  }

  enableServer(id: string) {
    const s = this.servers.get(id);
    if (s) s.enabled = true;
  }

  disableServer(id: string) {
    const s = this.servers.get(id);
    if (s) s.enabled = false;
  }

  registryTools(serverId: string, tools: MCPTool[]) {
    this.tools.set(serverId, tools);
  }

  listTools(serverId: string): MCPTool[] {
    return this.tools.get(serverId) || [];
  }

  allTools(): MCPTool[] {
    return [...this.tools.values()].flat();
  }
}

export const mcpManager = new MCPManager();
