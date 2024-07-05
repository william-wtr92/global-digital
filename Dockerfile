FROM node:20-alpine AS base
ARG APP_PORT=3000
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
EXPOSE ${APP_PORT}
RUN corepack enable

FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .
COPY .env.example .env

RUN pnpm run build

RUN rm .env

FROM base AS prod

ENV IS_BUILD=false

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/.next/standalone .
COPY --from=build /app/public public
COPY --from=build /app/.next/static .next/static

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown nextjs:nodejs .next

USER nextjs

CMD [ "pnpm", "start" ]
