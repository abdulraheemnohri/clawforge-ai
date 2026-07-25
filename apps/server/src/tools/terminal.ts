import { BaseTool, ToolDefinition, ToolCall, ToolResult } from '@clawforge/tool-sdk';
import { RiskLevel, ToolCategory } from '@clawforge/shared';
import { z } from 'zod';
import { execSenc } from 'child_process';

export class TerminalRunTool extends BaseTool {
  definition: ToolDefinition = {
    name: 'terminal.run',
    description: 'Run a terminal command (requires approval)',
    category: ToolCategory.TERMINAL,
    riskLevel: RiskLevel.HIGH,
    parameters: z.object({
      command: z.string(),
      cwd: z.string().optional(),
      timeout: z.number().optional().default(30000),
    }),
    requiresApproval: true,
  };
  async execute(call: ToolCall): Promise<ToolResult> {
    const blocked = ['rm -rf /', 'mkfs.'];
    for (const b of blocked) {
      if ((call.arguments.command as string).includes(b)) {
        return { callId: call.id, success: false, error: 'Command blocked for security', duration: 0 };
      }
    }
    const { stdout } = await execSenc(call.arguments.command as string, { timeout: call.arguments.timeout as number });
    return { callId: call.id, success: true, output: stdout.slice(0, 5000), duration: 0 };
  }
}