# Stage 1: Install dependencies
FROM oven/bun:latest
WORKDIR /app

# Copy over the manifest files for caching
COPY bun.lockb .
COPY package.json .
COPY turbo.json .

# Copy package.json for each workspace (use this for cache optimization)
COPY apps/user-app/package.json apps/user-app/package.json
COPY apps/bank-webhook/package.json apps/bank-webhook/package.json
COPY packages/db/package.json packages/db/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/store/package.json packages/store/package.json
COPY packages/typescript-config/package.json packages/typescript-config/package.json
COPY packages/ui/package.json packages/ui/package.json

# Install dependencies using Bun
RUN bun install --no-cache

# Copy the entire repository
COPY . .

# Generate Prisma Client (if applicable)
RUN bun run db:generate

# Build the app
RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start-user-app"]
