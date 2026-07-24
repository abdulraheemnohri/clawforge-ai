# =======================================================================
# ClawForge AI Server — Dockerfile
# =============================================================================

FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.1.0 --activate

FROM base AS builder
WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY packages ./packages
COPY apps/server ./apps/server
COPY apps/web ./apps/web

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=3777

RUN addgroup --system --gid 1001 clawforge && \
    adduser --system --uid 1001 clawforge

COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/web/dist ./apps/web/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/package.json ./

RUN mkdir -p data workspaces && chown -R clawforge:clawforge data workspaces

USER clawforge
EXPOSE 3777

CMD ["node", "apps/server/dist/index.js"]