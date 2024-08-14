FROM node:22-alpine3.20

ENV BEPP_VERSION=1.3.13

RUN apk add --no-cache git
RUN git clone https://github.com/pigeonposse/bepp.git /usr/src/app && \
    cd /usr/src/app && \
    git checkout tags/${BEPP_VERSION}

WORKDIR /usr/src/app

RUN npm install -g pnpm
RUN pnpm install --no-frozen-lockfile
RUN pnpm --filter @bepp/core build-container

EXPOSE 13128

CMD ["pnpm", "start"]
