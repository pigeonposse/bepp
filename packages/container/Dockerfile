FROM node:alpine

RUN apk add --no-cache git
RUN git clone https://github.com/pigeonposse/bepp.git /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g pnpm
RUN pnpm install --no-frozen-lockfile
RUN pnpm --filter @bepp/core build-container

EXPOSE 13128 13129
CMD ["pnpm", "start"]
