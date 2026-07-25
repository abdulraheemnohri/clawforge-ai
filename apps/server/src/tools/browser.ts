import { BaseTool, ToolDefinition, ToolCall, ToolResult } from '@clawforge/tool-sdk';
import { RiskLevel, ToolCategory } from '@clawforge/shared';
import { z } from 'zod';

export class BrowserOpenTool extends BaseTool {
  definition: ToolDefinition = {
    name: 'browser.open',
    description: 'Open a browser instance',
    category: ToolCategory.BROWSER,
    riskLevel: RiskLevel.LOW,
    parameters: z.object({
      url: z.string().optional(),
      headless: z.boolean().optional().default(true),
    }),
    requiresApproval: false,
  };
  async execute(call: ToolCall): Promise<ToolResult> {
    return {
      callId: call.id,
      success: true,
      output: JSON.stringify({ sessionId: `browser-${call.id}`, status: 'ready' }),
      duration: 0,
    };
  }
}

export class BrowserNavigateTool extends BaseTool {
  definition: ToolDefinition = {
    name: 'browser.navigate',
    description: 'Navigate to a URL',
    category: ToolCategory.BROWSER,
    riskLevel: RiskLevel.LOW,
    parameters: z.object({ sessionId: z.string(), url: z.string().url() }),
    requiresApproval: false,
  };
  async execute(call: ToolCall): Promise<ToolResult> {
    return { callId: call.id, success: true, output: `Navigated to ${call.arguments.url}`, duration: 0 };
  }
}