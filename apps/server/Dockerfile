FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY dist/index.js .

EXPOSE 1284

CMD ["node", "index.js"]