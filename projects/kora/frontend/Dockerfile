FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies needed for node-gyp
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
COPY next.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY tsconfig*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy source files
COPY . .

# Build the Next.js app
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json

# Install only production dependencies
RUN npm install --production

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Start the app
CMD ["node", "server.js"]