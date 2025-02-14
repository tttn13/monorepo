FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies needed for node-gyp
RUN apk add --no-cache python3 make g++

# Copy the entire project
COPY . .

# Build shared types
WORKDIR /app/packages/shared-types
RUN npm install
RUN npm run build

# Build frontend
WORKDIR /app/kora/frontend
RUN npm install
RUN npm run build

# Print out .next directory contents for debugging
RUN echo "Contents of .next directory:" && ls -lR .next

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy entire .next directory
COPY --from=builder /app/kora/frontend/public ./public

# Copy standalone output
COPY --from=builder /app/kora/frontend/.next/standalone ./

# Copy static assets
COPY --from=builder /app/kora/frontend/.next/static ./.next/static

# Copy configuration files
COPY --from=builder /app/kora/frontend/package.json ./package.json
COPY --from=builder /app/kora/frontend/next.config.ts ./next.config.ts

# Copy shared types
COPY --from=builder /app/packages/shared-types ./packages/shared-types

# Install only production dependencies
RUN npm install --omit=dev
RUN echo "Contents of current directory:" && ls -la

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Expose port
EXPOSE 3000

# Use next start
CMD ["node", "./kora/frontend/server.js"]