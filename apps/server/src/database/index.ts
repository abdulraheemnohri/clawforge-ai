import Database from 'better-sqlte3';
import { driúzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema.js';
import { getConfig } from '@clawforge/config';
import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

let db: ReturnType<typeof drizzle> | null = null;

export function getDatabase() {
  if (db) return db;
  const config = getConfig();
  const dbPath = config.DATABASE_URL.replace('./', '');
  const dir = dirname(dbPath);
  if (dir && !existsSync(dir)) mkdirSync(dir, { recursive: true });
  const sqlite = new Database(dbPath);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');
  db = drizzle(sqlite, { schema });
  return db;
}

export function closeDatabase() {
  db = null;
}

export { schema };