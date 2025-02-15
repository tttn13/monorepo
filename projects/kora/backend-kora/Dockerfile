FROM node:18-alpine AS builder

WORKDIR /app
RUN mkdir -p /app/kora/backend-kora

COPY package.json /app/kora/backend-kora/
# COPY .env /app/kora/backend-kora/
COPY . /app/kora/backend-kora/
# Install dependencies needed for node-gyp and Prisma
RUN apk add --no-cache python3 make g++ openssl

# Build backend
WORKDIR /app/kora/backend-kora
RUN npm install
RUN npx prisma generate --schema=src/prisma/schema.prisma
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy package files and prisma schema
COPY --from=builder /app/kora/backend-kora/package*.json ./
# COPY --from=builder /app/kora/backend-kora/.env ./
COPY --from=builder /app/kora/backend-kora/src/prisma ./src/prisma/

# Install production dependencies
RUN npm install --omit=dev
RUN npx prisma generate --schema=src/prisma/schema.prisma

# Copy built files
COPY --from=builder /app/kora/backend-kora/dist ./dist

# Expose port
EXPOSE 3001

ENV NODE_ENV=production

CMD ["npm", "start"]