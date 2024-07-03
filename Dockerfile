FROM node:22-alpine3.19 AS base

ARG APP_PORT=3000
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE $APP_PORT

FROM base AS builder

RUN corepack enable pnpm
RUN corepack use pnpm@latest
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

RUN pnpm run build

FROM base AS prod

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]