FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm -g install pnpm && pnpm install

COPY . .

EXPOSE 8080

RUN pnpm run build

CMD ["node", "dist/main.js"]