# Build React app
FROM node:lts-alpine AS webBuilder

WORKDIR /app

ENV INLINE_RUNTIME_CHUNK=false

COPY web/package.json web/yarn.lock web/tsconfig.json /app/

RUN yarn --version && yarn

COPY web/public/ /app/public

COPY web/src/ /app/src/

RUN yarn build

# Build NestJs app
FROM node:lts-alpine AS apiBuilder

WORKDIR /app

COPY api/package.json api/yarn.lock api/tsconfig.json api/nest-cli.json api/tsconfig.build.json api/prisma/ /app/

RUN yarn --version && yarn

RUN yarn prisma generate

COPY api/src/ /app/src/

RUN yarn build

# Production container
FROM node:lts-alpine

LABEL org.opencontainers.image.authors="Chao Tzu-Hsien"

WORKDIR /app

RUN addgroup -S conote && adduser -S conote -G conote

COPY --chown=conote api/package.json api/yarn.lock api/nest-cli.json api/prisma/ /app/

RUN chown -R conote:conote /app

USER conote:conote

RUN yarn --version && yarn --prod

RUN yarn prisma generate

# Copy default configuration
COPY api/config/ /app/config

COPY --from=webBuilder --chown=conote /app/build /app/client

# Copy built Javascript from apiBuild container
COPY --from=apiBuilder --chown=conote /app/dist /app/dist

EXPOSE 8080

ENTRYPOINT ["yarn", "start:prod"]
