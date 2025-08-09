FROM alpine:latest

WORKDIR /app
COPY dist/web ./web/
COPY dist/server ./server
COPY dist/config.yaml /etc/media-lib/

EXPOSE 1323

ENTRYPOINT [ "./server"]
