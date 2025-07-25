#!/bin/bash

ENVIRONMENT="$1"
IMAGE_NAME="sharma03deepak/todolist:latest"
CONTAINER_NAME="my-angular-app-$ENVIRONMENT"

echo "Deploying Angular app to environment: $ENVIRONMENT"

docker pull "$IMAGE_NAME"

docker stop "$CONTAINER_NAME" 2>/dev/null
docker rm "$CONTAINER_NAME" 2>/dev/null

case "$ENVIRONMENT" in
    "env1")
        PORT=8080
        ;;
    "env2")
        PORT=9000
        ;;
    *)
        echo "Unknown environment: $ENVIRONMENT"
        exit 1
        ;;
esac

docker run -d --name "$CONTAINER_NAME" -p "$PORT:80" "$IMAGE_NAME"

echo "Angular application deployed to $ENVIRONMENT on port $PORT"