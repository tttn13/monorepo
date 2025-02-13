FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies needed for node-gyp and Prisma
RUN apk add --no-cache python3 make g++ openssl

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

# Install all dependencies (including devDependencies)
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Install production dependencies for Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma/

# Install production dependencies
RUN npm install --production
RUN npx prisma generate

# Copy built files
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=production

# Start the server
CMD ["npm", "start"]