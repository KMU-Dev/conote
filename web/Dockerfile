# Build Container
FROM node:14.17.5-alpine AS builder

WORKDIR /app

# Copy dependency specification file
COPY package.json yarn.lock tsconfig.json /app/

# Install dependincies
RUN yarn --version && yarn

# Copy public static files
COPY public/ /app/public

# Copy application file
COPY src/ /app/src/

# Build App
RUN yarn build

# Production Container
FROM node:14.18.2-alpine

LABEL maintainer="Chao Tzu-Hsien"

WORKDIR /app

# Yarn install serve
RUN npm i -g serve

# Create a group and user
RUN addgroup -S conote && adduser -S conote -G conote

# Change user for security and work for puppeteer
USER conote:conote

# Copy built Javascript from build container
COPY --from=builder --chown=conote /app/build /app

# Expose app running port
EXPOSE 5000

# Start app
ENTRYPOINT serve -s
