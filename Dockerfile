FROM node:16

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install --only production

COPY . .

EXPOSE 80

CMD ["node", "server.js"]