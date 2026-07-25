import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const ConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  SERVER_HOST: z.string().default('127.0.0.1'),
  SERVER_PORT: z.coerce.number().default(3777),
  DATABASE_URL: z.string().default('./data/clawforge.db'),
  AI_PROVIDER: z.string().default('ollama'),
  AI_MODEL: z.string().default(''),
  OLLAMA_BASE_URL: z.string().url().default('http://127.0.0.1:11434'),
  OPENAI_BASE_URL: z.string().url().optional(),
  OPENAI_API_KEY: z.string().optional(),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  SESSION_SECRET: z.string().default('clawforge-default-secret-change-me'),
  ACCESS_TOKEN: z.string().optional(),
  MAX_ITERATIONS: z.coerce.number().default(50),
  MAX_RETRIES: z.coerce.number().default(3),
  WORKSPACE_ROOT: z.string().default('./workspaces'),
  ENABLE_CORS: z.boolean().default(true),
  CORS_ORIGIN: z.string().url().default('http://localhost:5173'),
});

let config: z.infer<typeof ConfigSchema> | null = null;

export function loadConfig() = ConfigSchema.parse(process.env);
export function getConfig() { config = config || loadConfig(); return config; }
export const isDev = () => getConfig().NODE_ENV === 'development';
export function getAllowedDirectories() { return [getConfig().WORKSPACE_ROOT]; }