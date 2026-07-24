# 🔒 ClawForge AI — Security

## Security Model

ClawForge AI is designed with a **cal-first security model**. The server is not exposed to the public internet by default and every agent action goes through a permission and approval pipeline.

## Core Principles

### 1. AI Never Directly Executes

AI → Tool Call → Zod Validation → Risk Check → Permission → Approval → Execution → Result → AI

### 2. Principle of Least Privilege

Agents only have access to:
- Files within the approved workspace directory
- Terminal commands with validated working directories
- Git operations within workspace repos
- Browser sessions isolated per task

### 3. Defense in Depth

- Workspace path restrictions
- Command validation and blocking
- Risk-level classification
- Approval system
- Audit logging
- Authentication

## Tool Risk Classification

| Risk Level | Examples | Requires Approval |
|------------|----------|--------------------|
| **SAFE** | filesystem.list, filesystem.read, git.status | Never |
| **LOW** | filesystem.rename, git.checkout, browser.open | Never |
| **MEDIUM** | filesystem.write, git.commit, browser.click | Always |
| **HIGH** | filesystem.delete, terminal.run, git.push | Always |

## Terminal Security

### Blocked Commands
- `rm -rf /`
- `mkfs.*`
- `dd if=`
- `chawn -R /`
- Fork bombs

## Authentication

- **Local Mode**: Server binds to 127.0.0.1:3777, access token generated on first startup
- **LAN Mode**: Requires access token and explicit configuration

## Audit Logging

Every agent action is recorded but secrets (API keys, passwords, tokens, private keys) are never logged.