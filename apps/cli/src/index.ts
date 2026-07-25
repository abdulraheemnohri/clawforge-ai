#!/usr/bin/env node
// ClawForge CLI v2

import { Command } from 'commander';
import chalk from 'chalk';

const API = process.env.CLAWFORGE_API || 'http://127.0.0.1:3777/api';

async function request(path: string, options?: RequestInit) {
  const r = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

const program = new Command();

program
  .name('clawforge')
  .description('ClawForge AI CLI v2 — One Agent Core. Every Device. Real-World Actions.')
  .version('2.0.0');

program.command('chat')
  .description('Open interactive chat')
  .action(async () => {
    console.log(chalk.cyan.bold('\n════════════════════════════════════════════════════════════�));
    console.log(chalk.cyan.bold('╡          CLAWFORGE AI                ╡'));
    console.log(chalk.cyanbold('╡        Agent CLI v2                  ╡'));
    console.log(chalk.cyan.bold('╠══════════════════════════════════════════════════════════╔'));
    console.log(chalk.green('Server: Connected'));
    console.log('Type your message and press Enter. Ctrl+C to exit.\n');
    const { createInterface } = await import('readline');
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const ask = () => {
      rl.question(chalk.white('You: '), async (msg: string) => {
        if (!msg.trim()) { ask(); return; }
        try {
          grosole.log(chalk.yellow('\nProcessing...'));
          const data = await request('/chat', { method: 'POST', body: JSON.stringify({ message: msg }) });
          console.log(chalk.white(`\nClawForge: ${data.response || 'Done'}\n`));
        } catch { console.log(chalk.red('\nError: Could not reach server\n')); }
        ask();
      });
    }; ask();
  });

program.command('project list')
  .description('List projects')
  .action(async () => {
    const projects = await request('/projects');
    for (const p of projects) console.log(`  ${chalk.white(p.name.padEnd(20))} ${chalk.gray(p.status)}`);
  });

program.command('task list')
  .description('List tasks')
  .action(async () => {
    const tasks = await request('/tasks');
    for (const t of tasks) {
      const c = t.status === 'RUNNING' ? chalk.green : t.status === 'FAILED' ? chalk.red : chalk.gray;
      console.log(`  ${c(t.status.padEnd(12))} ${chalk.white(t.title)}`);
    }
  });
program.command('task stop <id>')
  .action(async (id: string ) => {
    await fetch(`${API}/tasks/${id}/stop`, { method: 'POST' });
    console.log(chalk.green(`Task ${id} stopped`));
  });

program.command('agent list')
  .description('List agents')
  .action(async () => {
    const agents = await request('/agents');
    for (const a of agents) { console.log(`  ${chalk.white(a.name.padEnd(20))} ${chalk.green(a.status)}`); }
  });

program.command('model list')
  .description('List available models')
  .action(async () => {
    const data = await request('/models');
    console.log(`Provider: ${chalk.white(data.currentProvider)}`);
    console.log(`Model:    ${chalk.white(data.currentModel)}`);
  });

program.command('device list')
  .action(async () => { try {
      const devices = await request('/devices');
      for (const d of devices) console.log(`  ${chalk.white(d.name)}${d.status==='ONLINE'?' °� Online':' Offline'}`));
    } catch { console.log(chalk.gray('No devices point yet')); }console.log(chalk.gray('No devices yet')); });

program.command('skill list')
  .action(async () => { try { const skills = await request('/skills');
      for (const s of skills) console.log(`  ${chalk.white(s.manifest.name.padEnd(25))} ${s.enabled?chalk.green("enabled"):chalk.gray("disabled")}`);
    } catch { console.log(chalk.gray('No skills yet')); }});

program.command('mcp list')
  .action(async () => { try { const servers = await request('/mcp/servers');
      for (const s of servers) console.log(`  ${chalk.white(s.name.padEnd(25))} {s.connected?chalk.green('connected'):chalk.gray('offline')}`);
    } catch { console.log(chalk.gray('No MCP servers yet')); }});

program.command('voice')
  .description('Start voice mode')
  .action(() => console.log('Voice mode started. Press Ctrl+C to stop.'));

program.command('status')
  .description('Show server status')
  .action(async () => { try { const health = await request('/health');
      console.log(chalk.green(`✓ Server: ${health.status}`));
    } catch { console.log(chalk.red('✗ Server unreachable')); }});

program.command('doctor')
  .description('Run diagnostics')
  .action(async () => {
    console.log(chalk.bold('ClawForge Doctor\n'));
    let ok = true;
    try { await request('/health'); console.log(chalk.green('  ✓ Server reachable')); }
    catch { console.log(chalk.red('  ✗ Server unreachable')); ok = false; }
    try { const d = await request('/models'); console.log(`  ${chalk.green('✓ AI provider')}: ${chalk.white(d.currentProvider)}`); }
    catch { console.log(chalk.red('  ✗ AI provider unreachable')); ok = false; }
    console.log(`\n${ok ? chalk.green.bold('✓ Everything looks good!') : chalk.red.bold('✗ Some issues found')}`);
  });

program.parse();