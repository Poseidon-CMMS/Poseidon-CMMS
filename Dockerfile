# https://docs.docker.com/samples/library/node/
ARG NODE_VERSION=16.15.0

# Build container
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /home/node

COPY . .

RUN npm install

RUN npm run postinstallfix

RUN npm run-script build
RUN keystone prisma migrate deploy

# Runtime container
FROM node:${NODE_VERSION}-alpine

WORKDIR /home/node

COPY --from=build /home/node /home/node
EXPOSE 3000

CMD ["npm", "run", "start"]
