import { getDatabase } from './index.js';
import { v4 as uuid } from 'uuid';
import { getConfig } from '@clawforge/config';

function generateAccessToken(): string {
  const bytes = new Uint8Array(32);
  for (let i = 0; i < 32; i++) bytes[i] = Math.floor(Math.random() * 256);
  return Array.from(bytes).map(_b => b.toString(16).padStart(2, '0')).join('');
}

export async function runMigrations() {
  const db = getDatabase();
  const sqlite = (db as any).$client as import('better-sqlite3').Database;

  sqlite.exec({
    CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT '', workspace_path TEXT NOT NULL, model_id TEXT, agent_mode TEXT 'MANUAL', permissions TEXT '{}', status TEXT 'active', created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now')));
  });
  console.log('Database migrations running...');
}