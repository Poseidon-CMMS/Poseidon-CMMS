# https://docs.docker.com/samples/library/node/
ARG NODE_VERSION=14.17.6

# Build container
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /home/node

ADD . /home/node
RUN npm install && npm i focus-trap@6.6.1 && npm build

# Runtime container
FROM node:${NODE_VERSION}-alpine

WORKDIR /home/node

COPY --from=build /home/node /home/node

EXPOSE 3000
CMD ["npm", "run", "dev"]
