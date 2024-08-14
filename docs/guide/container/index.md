# BEPP container

![HEADER](/banner/bepp-docker-banner.png)

You can also use Bepp from a container to abstract it from your local environment. The web app, API, and CLI are available as images, and you can use any of them.

> The idea is to create a specific image in the future for building Safari extensions from a Linux environment. If you have ideas on how to implement this, please let us know [here]((https://github.com/pigeonposse/bepp/issues)).

## Images

- [DockerHub](https://hub.docker.com/r/pigeonposse/bepp)
- [Github Packages](https://github.com/pigeonposse/bepp/pkgs/container/bepp)

## Usage (Docker)

### APP

The `BEPP application` is a tool designed to simplify the process of packaging cross-platform extensions.

::: code-group
```bash [docker run]
docker run -d \
  --name bepp_app \
  -p 80:13128 \
  pigeonposse/bepp:latest-app

```
```bash [docker compose]
docker compose up -f docker-compose.yml -d
```
```yaml [docker-compose.yml]
services:          
  bepp_app:
    container_name: bepp_app
    image: pigeonposse/bepp:latest-app # or: ghcr.io/pigeonposse/bepp:latest-app
									   # or: ghcr.io/pigeonposse/bepp:latest
									   # or: pigeonposse/bepp:latest
    ports:
      - "80:13128/tcp"

```
:::

[Read more](../app/index.md)

### API

The `bepp API` is used by the bepp application, but it can be downloaded and used independently in your own project.

::: code-group
```bash [docker run]
docker run -d \
  --name bepp_api \
  -p 80:13129 \
  pigeonposse/bepp:latest-api

```
```bash [docker compose]
docker compose up -f docker-compose.yml -d
```
```yaml [docker-compose.yml]
services:          
  bepp_api:
    container_name: bepp_api
    image: pigeonposse/bepp:latest-api # or ghcr.io/pigeonposse/bepp:latest-api
    ports:
      - "80:13129/tcp"

```
:::

[Read more](../api/index.md)

### CLI

> Use only the **CLI**.

::: code-group
```bash [docker run]
docker run -d \
  --name bepp_cli \
  pigeonposse/bepp:latest-cli

```
```bash [docker compose]
docker compose up -f docker-compose.yml -d
```
```yaml [docker-compose.yml]
services:          
  bepp_cli:
    container_name: bepp_cli
    image: pigeonposse/bepp:latest-cli # or ghcr.io/pigeonposse/bepp:latest-cli

```
:::

[Read more](../lib/index.md)
