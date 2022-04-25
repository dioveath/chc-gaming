FROM node:16

WORKDIR /usr/src/client-server

COPY package*.json ./

RUN npm install --only production

COPY . .

RUN npm run-script build

EXPOSE 5556

CMD ["node", "server.js"]