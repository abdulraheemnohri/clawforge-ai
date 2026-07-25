import { BaseTool, ToolDefinition, ToolCall, ToolResult } from '@clawforge/tool-sdk';
import { RiskLevel, ToolCategory } from '@clawforge/shared';
import { z } from 'zod';
import { simpleGit } from 'simple-git';

export class GitStatusTool extends BaseTool {
  definition: ToolDefinition = {
    name: 'git.status',
    description: 'Show git working tree status',
    category: ToolCategory.GIT,
    riskLevel: RiskLevel.SAFE,
    parameters: z.object({ cwd: z.string() }),
    requiresApproval: false,
  };
  async execute(call: ToolCall): Promise<ToolResult> {
    const git = simpleGit(call.arguments.cwd as string);
    const status = await git.status();
    return { callId: call.id, success: true, output: JSON.stringify(status), duration: 0 };
  }
}

export class GitCommitTool extends BaseTool {
  definition: ToolDefinition = {
    name: 'git.commit',
    description: 'Record changes to the repository',
    category: ToolCategory.GIT,
    riskLevel: RiskLevel.MEDIUM,
    parameters: z.object({ cwd: z.string(), message: z.string() }),
    requiresApproval: true,
  };
  async execute(call: ToolCall): Promise<ToolResult> {
    const git = simpleGit(call.arguments.cwd as string);
    await git.add('.');
    const result = await git.commit(call.arguments.message as string);
    return { callId: call.id, success: true, output: JSON.stringify(result), duration: 0 };
  }
}