FROM node:16

WORKDIR /usr/src/api-server

COPY package*.json ./

RUN npm install --only production

COPY . .

EXPOSE 5555

CMD ["node", "server.js"]