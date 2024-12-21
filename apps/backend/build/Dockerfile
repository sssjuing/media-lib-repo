FROM scratch

WORKDIR /app
COPY dist/h5 ./h5/
COPY dist/console ./console/
COPY dist/server ./server
COPY dist/config.yaml /etc/media-lib/

EXPOSE 1323

ENTRYPOINT [ "./server"]
