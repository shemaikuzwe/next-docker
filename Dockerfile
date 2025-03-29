FROM node:18-alpine 

WORKDIR /app


COPY package.json pnpm-lock.yaml  ./

RUN  corepack enable pnpm && pnpm i --frozen-lockfile

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma

RUN pnpm run  build

ENV NODE_ENV=production

CMD ["npm ", "start"]