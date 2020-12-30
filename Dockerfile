FROM node:15-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY lerna.json .

RUN yarn install --production --lock-file

COPY . .

RUN yarn pkg:install

EXPOSE 3000 3001

CMD [ "yarn", "start" ]