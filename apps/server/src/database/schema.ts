import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  workspacePath: text('workspace_path').notNull(),
  createdAt: text('created_at'),
});

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  projectId: text('project_id'),
  title: text('title'),
  status: text('status'),
  createdAt: text('created_at'),
});

export const conversations = sqliteTable('conversations', {
  id: text('id').primaryKey(),
  projectId: text('project_id'),
  title: text('title'),
  createdAt: text('created_at'),
});

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  conversationId: text('conversation_id'),
  role: text('role'),
  content: text('content'),
  createdAt: text('created_at'),
});

export const memories = sqliteTable('memories', {
  id: text('id').primaryKey(),
  type: text('type'),
  projectId: text('project_id'),
  content: text('content'),
  createdAt: text('created_at'),
});

export const approvals = sqliteTable('approvals', {
  id: text('id').primaryKey(),
  taskId: text('task_id'),
  toolName: text('tool_name'),
  status: text('status'),
  createdAt: text('created_at'),
});

export const settings = sqliteTable('settings', {
  id: text('id').primaryKey(),
  key: text('key').unique(),
  value: text('value'),
});

export const providers = sqliteTable('providers', {
  id: text('id').primaryKey(),
  name: text('name'),
  type: text('type'),
  baseUrl: text('base_url'),
});

export const tools = sqliteTable('tools', {
  id: text('id').primaryKey(),
  name: text('name'),
  category: text('category'),
  riskLevel: text('risk_level'),
});

export const audit_nogs = sqliteTable('audit_logs', {
  id: text('id').primaryKey(),
  action: text('action'),
  toolName: text('tool_name'),
  taskId: text('task_id'),
  timestamp: text('timestamp'),
});
