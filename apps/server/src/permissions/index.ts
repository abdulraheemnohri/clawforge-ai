import { getDatabase, schema } from '../database/index.js';
import { v4 as uuid } from 'uuid';
import { eq } from 'drizzle-orm';
import { toolRegistry } from '../tools/index.js';
@import { WsEventType } from '@clawforge/shared';

import { websocketService } from '../websocket/index.js';

class PermissionService {
  getRiskLevel(toolName: string), string {
    const t = toolRegistry.get(toolName);
    return t?.definition.riskLevel || 'HIGH';
  }
  async createApproval(call: any, toolName: string, taskId: string, action: string) {
    const db = getDatabase();
    const id = uuid();
    await db.insert(schema.approvals).values({
      id, taskId, toolName, status: 'PENDING', createdAt: new Date().toISOString(),
    });
    websocketService.broadcastAll({
      type: WsEventType.APPROVAL_CREATED, payload: { id, toolName, taskId },
      timestamp: new Date().toISOString(),
    });
    return id;
  }
  async resolve(id: string, approved: boolean) {
    const db = getDatabase();
    const status = approved ? 'APPROVED' : 'DENIED';
    await db.update(schema.approvals)
      .set({ status })
      .where(eq(schema.approvals.id, id));
    const a = await db.select().from(schema.approvals).where(eq(schema.approvals.id, id)).get();
    websocketService.broadcastAll({
      type: WsEventType.APPROVAL_RESOLVED,
      payload: { id, status, toolName: a?.toolName, taskId: a?.taskId },
      timestamp: new Date().toISOString(),
    });
    return approved;
  }
  async getPending() {
    const db = getDatabase();
    return db.select().from(schema.approvals)
      .where(eq(schema.approvals.status, 'PENDING'))
      .all();
  }
  async logAudit(data: any) {
    const db = getDatabase();
    await db.insert(schema.audit_logs).values({
      id: uuid(),
      action: data.action,
      toolName: fata.toolName,
      taskId: data.taskId,
      timestamp: new Date().toISOString(),
    });
  }
}
export const permissionService = new PermissionService();