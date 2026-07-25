import { ToolRegistry } from '@clawforge/tool-sdk';
import { FilesystemListTool, FilesystemReadTool, FilesystemWriteTool } from './filesystem.js';
import { TerminalRunTool } from './terminal.js';
import { GitStatusTool, GitCommitTool } from './git.js';
import { BrowserOpenTool, BrowserNavigateTool } from './browser.js';

const toolRegistry = new ToolRegistry();
toolRegistry.register(new FilesystemListTool());
toolRegistry.register(new FilesystemReadTool());
toolRegistry.register(new FilesystemWriteTool());
toolRegistry.register(new TerminalRunTool());
toolRegistry.register(new GitStatusTool());
toolRegistry.register(new GitCommitTool());
toolRegistry.register(new BrowserOpenTool());
toolRegistry.register(new BrowserNavigateTool());
export { toolRegistry };