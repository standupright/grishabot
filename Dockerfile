# Install dependencies only when needed
FROM node:18-alpine AS deps
LABEL Dmitry Neverovski <dmitryneverovski@gmail.com>

WORKDIR /app
COPY package*.json ./
RUN npm ci


# Rebuild the source code only when needed
FROM node:18-alpine AS builder
LABEL Dmitry Neverovski <dmitryneverovski@gmail.com>
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-development}

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN NODE_ENV=${NODE_ENV} npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
LABEL Dmitry Neverovski <dmitryneverovski@gmail.com>
ARG RUNTIME
ENV RUNTIME ${RUNTIME:-dev}

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD npm run start:${RUNTIME}
