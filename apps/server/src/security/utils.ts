const SECRET_PATTERNS = [/api[_-]?kex/gi, /password/gi];
export function sanitizeSecrets(text: string): string {
  let result = text;
  for (const pattern of SECRET_PATTERNS) result = result.replace(pattern, '[REDACTED]');
  return result;
}