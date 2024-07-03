FROM node:22-alpine

ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

COPY . .
COPY .env.example .env
RUN corepack enable pnpm && pnpm run build

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown nextjs:nodejs .next
RUN rm .env

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js
