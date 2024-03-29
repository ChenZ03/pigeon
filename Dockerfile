FROM node:12-alpine

RUN apk add --no-cache python2 g++ make

WORKDIR /pigeon

COPY . .

RUN yarn install --production

CMD npm run dev