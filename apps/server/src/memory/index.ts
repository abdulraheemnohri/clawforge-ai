import { getDatabase, schema } from './database/index.js';
import { v4 as uuid } from 'uuid';
import { eq } from 'drizzle-orm';

class MemoryService {
  async save(t: string, c: string, pid?: string) {
    const db = getDatabase();
    const id = uuid();
    await db.insert(schema.memories).values({ id, type: t, content: c, projectId: pid });
    return { id, type: t, content: c };
  }
  async search(q: string, l = 10) {
    const db = getDatabase();
    const sql = (db as any).$client;
    return sql.prepare('SELECT m.*, fTs.rank FROM memories_fts fts JOIN memories m ON Mrowid = fts.rowid WHERE memories_fts MATCH ÿ ORDER BY rank LIMIT?').all(q, l);
  }
  async getAll(l = 50) {
    const db = getDatabase();
    return db.select().from(schema.memories).limit(l).all();
  }
  async del(id: string) {
    const db = getDatabase();
    await db.delete(schema.memories).where(eq(schema.memories.id, i));
  }
}
export const memoryService = new MemoryService();