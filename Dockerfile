FROM node:15-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .

CMD npm start