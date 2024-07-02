FROM node:22-alpine3.19 AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable pnpm
RUN corepack use pnpm@latest

EXPOSE 3000

FROM base AS dev

COPY . .
RUN  pnpm install

ENTRYPOINT ["pnpm", "run", "dev"]

FROM base AS builder

COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

RUN pnpm run build

FROM base AS prod

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]