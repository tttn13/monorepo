FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies needed for node-gyp and Prisma
RUN apk add --no-cache python3 make g++ openssl

# Copy the entire project
COPY . .

# Build shared types
WORKDIR /app/packages/shared-types
RUN npm install
RUN npm run build

# Build backend
WORKDIR /app/kora/backend-kora

# Install dependencies
RUN npm install

# Generate Prisma client with correct schema path
RUN npx prisma generate --schema=src/prisma/schema.prisma

# Build TypeScript
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Install production dependencies for Prisma
RUN apk add --no-cache openssl

# Copy package files and prisma schema
COPY --from=builder /app/kora/backend-kora/package*.json ./
COPY --from=builder /app/kora/backend-kora/src/prisma ./src/prisma/

# Copy shared types
COPY --from=builder /app/packages/shared-types ./packages/shared-types

# Install production dependencies
RUN npm install --omit=dev
RUN npx prisma generate --schema=src/prisma/schema.prisma

# Copy built files
COPY --from=builder /app/kora/backend-kora/dist ./dist

# Expose port
EXPOSE 3001

ENV NODE_ENV=production

CMD ["npm", "start"]