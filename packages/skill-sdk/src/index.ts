// Skill SDK — Load, validate, and run ClawForge skills

export interface SkillManifest {
  name: string;
  version: string;
  description: string;
  author: string;
  agentTypes: string[];
  recommendedTools: string[];
  instructionsFile: string;
}

export interface Skill {
  id: string;
  manifest: SkillManifest;
  instructions: string;
  tools: string[];
  workflows: string[];
  installed: boolean;
  enabled: boolean;
}

export class SkillRegistry {
  private skills = new Map<string, Skill>();

  register(skill: Skill) { this.skills.set(skill.id, skill); }

  list(): Skill[] { return [...this.skills.values()]; }

  get(id: string): Skill | undefined { return this.skills.get(id); }

  enable(id: string) { const s = this.skills.get(id); if (s) s.enabled = true; }

  disable(id: string) { const s = this.skills.get(id); if (s) s.enabled = false; }

  remove(id: string) { this.skills.delete(id); }
}

export const skillRegistry = new SkillRegistry();

// Default skills
export const DEFAULT_SKILLS: Skill[] = [
  {
    id: 'react-developer', manifest: { name: 'React Developer', version: '1.0.0', description: 'Expert in React, TSX, hooks', author: 'ClawForge', agentTypes: ['CODING'], recommendedTools: ['filesystem.*', 'terminal.run', 'git.*'], instructionsFile: 'instructions.md' },
    instructions: 'You are a senior React developer. Use TypeScript. Follow modern patterns: hooks, functional components, server components where applicable.',
    tools: ['filesystem.read', 'filesystem.write', 'filesystem.edit', 'terminal.run', 'git.status'], workflows: [], installed: true, enabled: false
  },
  {
    id: 'nodejs-developer', manifest: { name: 'Node.js Developer', version: '1.0.0', description: 'Backend Node.js specialist', author: 'ClawForge', agentTypes: ['CODING'], recommendedTools: ['filesystem.*', 'terminal.run', 'git.*'], instructionsFile: 'instructions.md' },
    instructions: 'You are a Node.js backend developer. Use TypeScript, ESM, fastify or express. Write tests.',
    tools: ['filesystem.read', 'filesystem.write', 'terminal.run', 'git.commit'], workflows: [], installed: true, enabled: false
  },
  {
    id: 'security-analyst', manifest: { name: 'Security Analyst', version: '1.0.0', description: 'Security review specialist', author: 'ClawForge', agentTypes: ['RESEARCH'], recommendedTools: ['filesystem.read', 'terminal.run'], instructionsFile: 'instructions.md' },
    instructions: 'You are a security analyst. Review code for vulnerabilities. Check dependencies. Suggest fixes.',
    tools: ['filesystem.read', 'terminal.run'], workflows: [], installed: true, enabled: false
  },
  {
    id: 'devops-engineer', manifest: { name: 'DevOps Engineer', version: '1.0.0', description: 'CI/CD & infrastructure', author: 'ClawForge', agentTypes: ['CODING', 'RESEARCH'], recommendedTools: ['terminal.run', 'git.*', 'filesystem.*'], instructionsFile: 'instructions.md' },
    instructions: 'You are a DevOps engineer. Manage CI/CD pipelines, Docker, infrastructure as code.',
    tools: ['terminal.run', 'git.status', 'git.commit', 'filesystem.read', 'filesystem.write'], workflows: [], installed: true, enabled: false
  },
];
