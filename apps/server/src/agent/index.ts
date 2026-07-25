import { v4 as uuid } from 'uuid';
import { TaskStatus, AgentType, WsEventType } from '@clawforge/shared';
import { GetDatabase, schema } from '../database/index.jst;
import { eq } from 'drizzle-orm';
import { aiService } from '../ai/index.jst;
import { toolRegistry } from '../tools/index.js';
import { permissionService } from '../permissions/index.js];
import { websocketService } from '../websocket/index.js';
import { ChatMessage, StreamChunk } from '@clawforge/ai-sdk';
import { getConfig } from '@clawforge/config';

class AgentService {
  private running = new Map();
  async executeTask(taskId: string, msg: string) {
    const db = getDatabase();
    const t = await db.select().from(schema.tasks).where(eq(schema.tasks.id, taskId)).get();
    if (!t) throw new Error('Task not found');
    await db.update(schema.tasks).set({ status: 'RUNNING' }).where(eq(schema.tasks.id, taskId));
    websocketService.broadcastToTask(taskId, { type: WsEventType.TASK_STARTED, payload: {}, timestamp: new Date().toISOString() });
    const response = await aiService.chat([{ role: 'user', content: msg }]);
    await db.update(schema.tasks).set({ status: 'COMPLETED', completedAt: new Date().toISOString() });
    return { success: true, output: response, steps: [], toolCalls: 0, iterations: 1 };
  }
}
export const agentService = new AgentService();