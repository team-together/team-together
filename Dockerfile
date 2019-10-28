FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

EXPOSE 8080

CMD ["node", "server.js"]