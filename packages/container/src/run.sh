#!/bin/bash

if [ "$1" == "up" ]; then
    docker compose -f "src/$2/docker-compose.yml" up --build -d
elif [ "$1" == "down" ]; then
    docker compose -f "src/$2/docker-compose.yml" down
else
    echo "Usage: $0 {up|down} <dirname>"
    exit 1
fi
