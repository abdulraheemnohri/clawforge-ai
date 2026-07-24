# ğŸ¦… ClawForge AI â€” Architecture

## Overview

ClawForge AI v1 is a modular, local-first AI agent platform. It consists of a Node.js server (Fastify) and a React web application, connected via REST and WebSocket.

## Design Principles

1. **Server as Single Source of Truth**
2. **AI Never Directly Executes Commands**
3. **Modular Monolith**
4. **Local-First Security**

## Component Diagram

```
â”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œâ”œ+ŠR€€€€€€€€€€€€€€€€€€€±…İ½É”]•ˆ€€€€€€€€€€€€€€€€€€€ƒŠR+ŠR€€€€€€€€€€€€€€€€€€€I•…Ğ€¬Y¥Ñ”€€€€€€€€€€€€€€€€€€€€ƒŠR+ŠR€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€ƒŠR+ŠR€ƒŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRwŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRwŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRsŠRwŠRsŠRsŠRsŠRsŠRsŠRsŠRp+ŠR€M¥‘•‰…È€ƒŠR€A…•Ì€€ƒŠR€Ñ¥Ù¥ÑäA…¹•°€€ƒŠR+ŠR€€€€€€€€€€ƒŠR€€€€€€€€€ƒŠR€€¡I•…°µÑ¥µ”Ù•¹ÑÌ¤ƒŠR+ŠR…Í¡‰½…ÉƒŠR¡…Ğ€€€€ƒŠR€€€€€€€€€€€€€€€€€€€€€€ƒŠR+ŠR¡…Ğ€€€€ƒŠRQ…Í­Ì€€€ƒŠR€]•‰M½­•ĞƒŠOŠHM•ÉÙ•ÈƒŠR+ŠRQ…Í­Ì€€€ƒŠR•¹ÑÌ€€ƒŠR€€€€€€€€€€€€€€€€€€€€€€ƒŠR+ŠR•¹ÑÌ€€ƒŠRQ½½±Ì€€€ƒŠR€€€€€€€€€€€€€€€€€€€€€€ƒŠR+ŠR	É½İÍ•È€ƒŠR5½‘•±Ì€€ƒŠR€€€€€€€€€€€€€€€€€€€€€€€ƒŠR+ŠRQ•Éµ¥¹…°ƒŠR5•µ½Éä€€ƒŠR€€€€€€€€€€€€€€€€€€€€€€€ƒŠR+ŠR5•µ½Éä€€ƒŠRÁÁÉ½Ù…±ÏŠR€€€€€€€€€€€€€€€€€€€€€€€ƒŠR+ŠRM•ÑÑ¥¹ÌƒŠRM•ÑÑ¥¹ÌƒŠR€€€€€€€€€€€€€€€€€€€€€€€ƒŠR+ŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRSŠRb)IN)IN)IN)IN)IN)IN)IN)IN)IN)IN)IN)IN)Iˆ8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%9¦'8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥%8¥&```

## Agent Execution Flow

```
User Request
     |
 â–œ Intent Analysis (AI)
     |
 â–œ Create Plan (Planner)
     |
 â–œ Create Task
     |
For Each Step:
    |
 âœœâ”€â”€ AI Reasons About Step
 âœœâ”€â”€ AI Requests Tool Call
 âœœâ”€â”€ Zod Validation
 âœœâ”€â”€ Risk Classification
 âœœâ”€â”€ Permission Check
 âœœâ”€â”€ Approval if Needed
 âœœâ”€â”€ Tool Execution
 âœœâ”€â”€ Result â†’ AI
 âœœâ”€â”€ Verify Step
     |
 â–— Final Response to User
```

## Security Model

Tool Risk Levels: SAFE | LOW | MEDIUM | HIGH
Path Security: Agents only access approved workdirs
Authentication: Local-first with token generation

## Extensibility

- **New Tool**: Create class, register in index.ts, done
- **New AI Provider**: Implement AIProvider, register, done
- **New Agent**: Add enum, prompt, register, done

## Future Clients (V2+)

All future apps (WINDOWS, CLI, Android) are API clients of the same server.