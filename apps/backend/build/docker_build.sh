#!/bin/bash

echo "build docker server"

BUILD_DIRECTORY=./build/dist
# if [ -d $BUILD_DIRECTORY ]; then
#   echo "$BUILD_DIRECTORY folder exists."
#   rm -rf $BUILD_DIRECTORY
# fi
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o $BUILD_DIRECTORY/server ./cmd/server/main.go
cp -r ./configs/default.yaml $BUILD_DIRECTORY/config.yaml
docker build -t media-lib build/.
