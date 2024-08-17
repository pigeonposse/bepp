#!/bin/bash

action=""
custom_compose_file=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --up)
            action="up"
            shift
            ;;
        --down)
            action="down"
            shift
            ;;
        *)
            if [ -z "$dirname" ]; then
                dirname="$1"
            elif [ -z "$custom_compose_file" ]; then
                custom_compose_file="$1"
            fi
            shift
            ;;
    esac
done

if [ -z "$action" ] || [ -z "$dirname" ]; then
    echo 'RUN CONTAINERS FAST'
	echo
    echo 'Run the containers from the src directory of this package quickly and easily'
	echo
    echo "Usage: $0 {--up|--down} <dirname> [docker-compose-file].yml"
	echo
	echo "Example: $0 app --up"
    exit 0
fi


if [ -n "$custom_compose_file" ]; then
    compose_file="src/$custom_compose_file.yml"
else
    compose_file="src/$dirname/docker-compose.yml"
fi

command="docker compose -f $compose_file"


if [ "$action" == "up" ]; then
    command="$command up --build -d"
elif [ "$action" == "down" ]; then
    command="$command down"
else
    echo "Invalid action: $action"
    exit 1
fi

eval $command
