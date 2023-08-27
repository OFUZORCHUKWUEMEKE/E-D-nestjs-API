FROM alpine:3.18

RUN apk update && apk add nodejs npm

COPY package.json ./

RUN npm install

COPY . .

RUN ["npm","run", "start:dev"]

EXPOSE 4000  