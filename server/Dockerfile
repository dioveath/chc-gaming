FROM node:14

WORKDIR /usr/src/api-server

COPY package*.json ./

RUN npm install --only production

COPY . .

EXPOSE 5555

CMD ["node", "server.js"]