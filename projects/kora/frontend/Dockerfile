FROM node:18-alpine AS builder

WORKDIR /app

RUN mkdir -p /app/kora/frontend

COPY package.json /app/kora/frontend/
COPY . /app/kora/frontend/

# Build frontend
WORKDIR /app/kora/frontend
RUN npm install
RUN echo "Starting build..."
RUN npm run build
RUN echo "Build completed"
RUN ls -la .next/

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
COPY --from=builder /app/kora/frontend/tsconfig.json ./tsconfig.json
COPY --from=builder /app/kora/frontend/middleware.ts ./middleware.ts
COPY --from=builder /app/kora/frontend/next-env.d.ts ./next-env.d.ts

# Install only production dependencies
RUN npm install --omit=dev

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Expose port
EXPOSE 3000

# Use next start
CMD ["npm", "start"]