# ClawForge AI V2

**One Agent Core. Every Device. Real-World Actions.**

V2 extends the V1 Node.js Agent Server + Web platform into a complete multi-device AI agent ecosystem.

## Architecture

```
                 CLAWFORGE AI V2
                       │
     ┌─────────────────┼─────────────────┐
     │                 │                 │
  Windows            Android            CLI
  Tauri              Compose          Terminal
     │                 │                 │
     └─────────────────┼─────────────────┘
                       │
                      Web
                       │
                       ▼
              CLAWFORGE SERVER
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      AI Core       Agent Core      Voice
        │              │              │
     Models       Multi-Agent      Wake Word
        │              │              │
        ├──────────────┼──────────────┤
        │              │              │
      Tools          MCP           Skills     Plugins
        │              │              │
        └─────────────┼──────────────┘
                       │
                SECURITY LAYER
                       │
                Permission Engine
                       │
                  DATA LAYER
```

## Development Order

1. **V2.1** — Server protocol stabilization (this repo)
2. **V2.2** — Windows Tauri desktop app
3. **V2.3** — Production CLI
4. **V2.4** — Advanced agent runtime
5. **V2.5** — Voice and local wake word
6. **V2.6** — Android companion (Kotlin)
7. **V2.7** — Device pairing and secure remote
8. **V2.8** — MCP and Skills
9. **V2.9** — Automation and multi-agent workflows
10. **V2.10** — Production hardening and release

## New Packages

| Package | Purpose |
|---------|---------|
| `@clawforge/device-sdk` | Device pairing, identity, secure channels |
| `@clawforge/voice-sdk` | Wake word, STT, TTS, voice sessions |
| `@clawforge/skill-sdk` | Skill registry, instructions, workflows |
| `@clawforge/plugin-sdk` | Plugin lifecycle, permissions |
| `@clawforge/mcp-sdk` | MCP client, server management |
| `@clawforge/security` | Device identity, permission scopes, audit |

## New Apps

| App | Tech | Purpose |
|-----|------|---------|
| `apps/desktop` | Tauri 2 + React | Windows desktop application |
| `apps/cli` | Node.js + Commander | CLI interface |
| `apps/android` | Kotlin + Jetpack Compose | Android companion |
