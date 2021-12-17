FROM node:14

WORKDIR /usr/src/client-server

COPY package*.json ./

RUN npm install --only production

COPY . .

EXPOSE 5556

CMD ["node", "server.js"]