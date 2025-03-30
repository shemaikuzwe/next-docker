FROM node:21-alpine AS base

# build

FROM base AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN  corepack enable pnpm && pnpm i --frozen-lockfile

COPY . .
# Env variables must be define at build time

ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate --schema=./prisma/schema.prisma


RUN pnpm run build

## runner

FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public
# make sure output is set to standalone in next.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./ 
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Env variables must be redefined at runtime
ENV NODE_ENV=production

ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}
ENV HOSTNAME=0.0.0.0

CMD node server.js