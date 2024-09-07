FROM node:20.12.0
WORKDIR /usr/src/app

COPY package.json bun.lockb turbo.json ./

COPY apps ./apps
COPY packages ./packages
RUN npm install -g bun

RUN bun install
RUN cd packages/db && npx prisma generate && cd ../..
RUN bun run build

CMD ["bun", "run","start-user-app"]