#!/bin/bash

## Written to be executed from the build:linux-arm64 script in package.json

# Define VARS
IMAGE_NAME=tauri-linux-arm64
WORKDIR_SRC_TAURI=packages/app/src-tauri
WORKDIR=$(dirname $(dirname $(pwd)))
DOCKERFILE_PATH=$(pwd)/.dev/arm64-linux-build

echo
echo "BUILD variables: "
echo "  IMAGE_NAME=$IMAGE_NAME"
echo "  WORKDIR_SRC_TAURI=$WORKDIR_SRC_TAURI"
echo "  WORKDIR=$WORKDIR"
echo "  DOCKERFILE_PATH=$DOCKERFILE_PATH"
echo

if [ ! -f $DOCKERFILE_PATH/Dockerfile ]; then
  echo "Error: Dockerfile not found in the current directory."
  exit 1
fi

# Build the Docker image for ARM64 platform with the specified build argument
docker buildx build --platform linux/arm64 \
  --build-arg WORKDIR_SRC_TAURI=$WORKDIR_SRC_TAURI \
  -t $IMAGE_NAME $DOCKERFILE_PATH

echo
echo "Docker image '$IMAGE_NAME' has been built successfully."
echo

# List all Docker images to confirm that the image was created
docker images

echo
echo "Listed all Docker images."
echo

# Run the Docker container from the built image
docker run --platform linux/arm64 -it \
  -v $WORKDIR:/app \
  $IMAGE_NAME

echo "Docker container is running. The application is being built."
