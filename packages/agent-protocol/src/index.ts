import { z } from 'zod';
export const ChatRequestSchema = z.object({
  message: z.string().min(1).max(32000),
  projectId: z.string().uuid().optional(),
  conversationId: z.string().uuid().optional(),
});
export const CreateProjectSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  workspacePath: z.string(),
});
export type ChatRequest = z.infer<typeof ChatRequestSchema>;