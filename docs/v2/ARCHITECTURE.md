# ClawForge AI V2 - Architecture Overview

## Principles

1. **Server is single source of truth** — Windows, Android, CLI, and Web are clients
2. **Never duplicate the agent runtime** — all clients talk to the same server
3. **Cross-device state synchronization** — a task started on one device is visible on all
4. **Security-first** —every tool call passes through the permission engine

## Protocol

All V2 clients use the same REST + WebSocket API. The V2 protocol adds:

### REST Endpoints

```
/api/devices           Device management
/api/devices/pair      Pair new device
/api/devices/:id/revoke Revoke device
/api/skills           List skills
/api/plugins          List plugins
/api/mcp/servers       MCP server management
/api/mcp/servers/:id/tools MCP tools
/api/automations     Automation management
/api/workflows        Visual workflows
/api/voice/sessions    Voice session management
/api/security/audit    Security audit log
/api/security/emergency-stop Emergency stop
/api/agents/:id/config Agent configuration
/api/models/router     Model routing configuration
```

### WebSocket Events

```
device.connected       Device came online
device.disconnected    Device went offline
voice.started          Voice session started
voice.listening        Currently listening
voice.transcribed      Speech transcribed
voice.speaking        TTS output started
automation.started     Automation triggered
automation.completed   Automation finished
mcp.connected          MCP server connected
mcp.disconnected       MCP server disconnected
```

## Development Order

1. **V2.1** — Server protocol stabilization
2. **V2.2** — Windows Tauri desktop app
3. **V2.3** — Production CLI
4. **V2.4** — Advanced agent runtime
5. **V2.5** — Voice and local wake word
6. **V2.6** — Android companion
7. **V2.7** — Device pairing and secure remote
8. **V2.8** — MCP and Skills
9. **V2.9** — Automation and multi-agent workflows
10. **V2.10** — Production hardening and release