FROM node:16

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install --only production

COPY . .

WORKDIR /usr/src/server/client

RUN npm install --only production

RUN npm run build

WORKDIR /usr/src/server

EXPOSE 80

CMD ["node", "server.js"]