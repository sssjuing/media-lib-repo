FROM guergeiro/pnpm:22-10 AS builder

WORKDIR /app
COPY . .

RUN pnpm install
RUN npx turbo build --filter=console

FROM docker.io/joseluisq/static-web-server:2

COPY --from=builder /app/apps/backend/web/console /public/console

ENV SERVER_FALLBACK_PAGE="/public/console/index.html"

ENTRYPOINT ["./static-web-server"]
