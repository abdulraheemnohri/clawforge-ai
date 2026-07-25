export enum RiskLevel { SAFE = 'SAFE', LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH' }
export enum TaskStatus { PENDING='PENDING', RUNNING='RUNNING', PAUSED='PAUSED', COMPLETED='COMPLETED', FAILED='FAILED', STOPPED='STOPPED' }
export enum AgentType { MASTER='MASTER', CODING='CODING', RESEARCH='RESEARCH', BROWSER='BROWSER' }
export enum ApprovalStatus { PENDING='PENDING', APPROVED='APPROVED', DENIED='DENIED' }
export enum MemoryType { CONVERSATION='conversation', PROJECT='project', PREFERENCE='preference', DECISION='decision' }
export const DEFAULT_SERVER_PORT = 3777;
export const MAX_AGENT_ITERATIONS = 50;
export const MAX_RETRIES = 3;