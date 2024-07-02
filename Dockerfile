FROM node:22-alpine3.19 AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

FROM base AS dev

COPY . .
RUN  yarn install

ENTRYPOINT ["yarn", "run", "dev"]

FROM base AS builder

COPY . .
RUN  yarn install --omit=dev

RUN yarn run build

FROM base AS prod

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]