import { z } from 'zod';
import { RiskLevel, ToolCategory } from '@clawforge/shared';
export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
  agentType: string;
  taskId: string;
}
export interface ToolResult {
  callId: string;
  success: boolean;
  output?: string;
  error?: string;
  duration: number;
}
export interface ToolDefinition {
  name: string;
  description: string;
  category: ToolCategory;
  riskLevel: RiskLevel;
  parameters: z.ZodSchema;
  requiresApproval: boolean;
}
export interface Tool {
  definition: ToolDefinition;
  execute(call: ToolCall): Promise<ToolResult>;
}
export class ToolRegistry {
  private tools = new Map();
  register(t: Tool) { this.tools.set(t.definition.name, t); }
  get(name: string) { return this.tools.get(name); }
  getAll() { return Array.from(this.tools.values()); }
  async execute(call: ToolCall) {
    const t = this.tools.get(call.name);
    if (!t) return { callId: call.id, success: false, error: 'UnKnown tool', duration: 0 };
    return t.execute(call);
  }
}