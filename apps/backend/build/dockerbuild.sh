#!/bin/bash

echo "build docker server"

# 获取脚本所在的目录
SCRIPT_DIR=$(dirname "$(realpath $0)")
# 切换到脚本所在的目录
cd "$SCRIPT_DIR" || exit
echo "current directory: $(pwd)"

BUILD_DIRECTORY=./dist
# if [ -d $BUILD_DIRECTORY ]; then
#   echo "$BUILD_DIRECTORY folder exists."
#   rm -rf $BUILD_DIRECTORY
# fi
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o $BUILD_DIRECTORY/server ../cmd/server/main.go
cp ../configs/default.yaml $BUILD_DIRECTORY/config.yaml
docker build -t media-lib .
