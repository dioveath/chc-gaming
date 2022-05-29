FROM node:16

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install --only production

COPY . .

RUN apt-get -y update

RUN apt-get -y upgrade

RUN apt-get install -y ffmpeg

EXPOSE 80

CMD ["node", "server.js"]