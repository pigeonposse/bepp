FROM node:alpine

RUN apk add --no-cache git
RUN git clone https://github.com/pigeonposse/bepp.git .

RUN npm install -g pnpm

COPY bepp /usr/src/app

WORKDIR /usr/src/app

RUN pnpm install --no-frozen-lockfile
RUN pnpm core build:schema && pnpm core build:lib

EXPOSE 13128 13129
CMD ["pnpm", "start"]
