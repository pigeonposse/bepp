FROM node:22-alpine3.20

ENV BEPP_VERSION=1.3.14

RUN npm install -g @bepp/bepp@${BEPP_VERSION}
RUN bepp --help

ENTRYPOINT ["tail", "-f", "/dev/null"]

# examples: 
# docker run -it bepp-image --version
