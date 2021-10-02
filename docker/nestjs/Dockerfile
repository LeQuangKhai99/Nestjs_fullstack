FROM node:14-alpine as base

RUN mkdir -p /usr/src/fullstack-app/backend
WORKDIR /usr/src/fullstack-app/backend
COPY . .
RUN npm install
RUN npm install -g @nestjs/cli
CMD [ "npm", "run", "start:dev" ]