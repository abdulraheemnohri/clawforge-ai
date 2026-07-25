import { getDatabase, schema } from './database/index.js';
import { v4 as uuid } from 'uuid';
import { eq } from 'drizzle-orm';
import { getConfig } from '@clawforge/config';
import { mkdir } from 'fs/promises';
import { resolve } from 'path';

class ProjectService {
  async create(d: { name: string; workspacePath: string }) {
    const db = getDatabase();
    const config = getConfig();
    const id = uuid();
    const path = resolve(config.WORKSPACE_ROOT, d.workspacePath);
    await mkdir(path, { recursive: true });
    await db.insert(schema.projects).values({ id, name: d.name, workspacePath: path });
    return this.get(id);
  }
  async get(id: string) {
    const db = getDatabase();
    return db.select().from(schema.projects).where(eq(schema.projects.id, id)).get();
  }
  async getAll() {
    const db = getDatabase();
    return db.select().from(schema.projects).all();
  }
  async del(id: string) {
    const db = getDatabase();
    await db.delete(schema.projects).where(eq(schema.projects.id, id));
  }
}
export const projectService = new ProjectService();