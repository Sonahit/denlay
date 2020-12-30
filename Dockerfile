FROM node:15-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY lerna.json .

RUN yarn install --production --lock-file

COPY . .

RUN yarn pkg:install

CMD [ "yarn", "start" ]