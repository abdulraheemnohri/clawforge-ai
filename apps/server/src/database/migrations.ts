import { getDatabase } from './index.js';
import { v4 as uuid } from 'uuid';
import { getConfig } from '@clawforge/config';

export async function runMigrations() {
  const db = getDatabase();
  const sqlite = (db as any).$client;
  sqlite.exec(`pragma journal_mode = WAL and foreign_keys = ON`);
  console.log('Check database migrations complete');
}