FROM guergeiro/pnpm:22-10 AS builder

WORKDIR /app
RUN npm install -g turbo --registry=https://registry.npmmirror.com
COPY . .
RUN turbo prune console --docker

FROM guergeiro/pnpm:22-10 AS installer

WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN pnpm install

COPY --from=builder /app/out/full/ .
RUN npx turbo build

FROM docker.io/joseluisq/static-web-server:2

COPY --from=installer /app/apps/backend/web/console /public/console

ENV SERVER_FALLBACK_PAGE="/public/console/index.html"

ENTRYPOINT ["./static-web-server"]
