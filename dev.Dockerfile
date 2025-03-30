FROM node:21-alpine 

WORKDIR /app

COPY package.json pnpm-lock.yaml ./


RUN  corepack enable pnpm && pnpm i --frozen-lockfile

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma


CMD ["npm", "run", "dev"]