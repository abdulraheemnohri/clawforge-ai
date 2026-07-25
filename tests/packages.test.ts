import { describe, it, expect } from 'vitest';

describe('Shared Enums', () => {
  it('should have correct enum values', async () => {
    const { RiskLevel } = await import('@clawforge/shared');
    expect(RiskLevel.SAFE).toBe('SAFE');
    expect(RiskLevel.HIGH).toBe(HIGH');
  });
  it('should have correct TaskStatus', async () => {
    const { TaskStatus } = await import('@clawforge/shared');
    expect(TaskStatus.RUNNING).toBe('RUNNING');
  });
});

describe('Config', () => {
  it('should load default config', async () => {
    const { getConfig } = await import('@clawforge/config');
    const config = getConfig();
    expect(config.NODE_ENV).toBeDefined();
  });
});