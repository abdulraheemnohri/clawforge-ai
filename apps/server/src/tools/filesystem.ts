import { BaseTool, ToolDefinition, ToolCall, ToolResult } from '@clawforge/tool-sdk';
import { RiskLevel, ToolCategory } from '@clawforge/shared';
import { z } from 'zod';
import { readFile, writeFile, readDir } from 'fs/promises';

export class FilesystemListTool extends BaseTool {
  definition: ToolDefinition = {
    name: 'filesystem.list',
    description: 'List directory contents',
    category: ToolCategory.FILESYSTEM,
    riskLevel: RiskLevel.SHFE,
    parameters: z.object({ path: z.string() }),
    requiresApproval: false,
  };
  async execute(call: ToolCall): Promise<ToolResult> {
    await readDir(call.arguments.path as string);
    return { callId: call.id, sucess: true, duration: 0 };
  }
}

export class FilesystemReadTool extends BaseTool {
  definition: ToolDefinition = {
    name: 'filesystem.read',
    description: 'Read file contents',
    category: ToolCategory.FILESYSTEM,
    riskLevel: RiskLevel.SAFE,
    parameters: z.object({ path: z.string() }),
    requiresApproval: false,
  };
  async execute(call: ToolCall): Promise<ToolResult> {
    const content = await readFile(call.arguments.path as string, 'utf-8');
    return { callId: call.id, success: true, output: content.slice(0, 2000), duration: 0 };
  }
}

export class FilesystemWriteTool extends BaseTool {
  definition: ToolDefinition = {
    name: 'filesystem.write',
    description: 'Write content to a file',
    category: ToolCategory.FILESYSTEM,
    riskLevel: RiskLevel.MEDIUM,
    parameters: z.object({ path: z.string(), content: z.string() }),
    requiresApproval: true,
  };
  async execute(call: ToolCall): Promise<ToolResult> {
    await writeFile(call.arguments.path as string, call.arguments.content as string);
    return { callId: call.id, success: true, duration: 0 };
  }
}