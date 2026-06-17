# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build Next.js app
RUN npm run build

# Runtime stage
FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Install production dependencies only
RUN npm ci --legacy-peer-deps --omit=dev

# Copy built Next.js app from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy Express server and other necessary files
COPY server.ts ./
COPY tsconfig.json ./
COPY Admin ./Admin
COPY lib ./lib
COPY components ./components
COPY screens ./screens
COPY app ./app

# Install tsx for runtime TypeScript execution
RUN npm install --legacy-peer-deps --omit=dev tsx

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the app
CMD ["npm", "start"]
